const initLocalStorage = () => {
	if (!localStorage.getItem('cart')) {
		localStorage.setItem('cart', JSON.stringify([]));
	}
	changeCountOfCardIcon();
}

const changeCountOfCardIcon = count => {
	if (count === 0) {
		$('.nav-shop__circle').text('');
	} else if (count) {
		$('.nav-shop__circle').text(count);
	} else {
		const cart = JSON.parse(localStorage.getItem('cart'));
		let countOfAllProductsInCart = calculateCountOfAllProductsInCart(cart);
		if (countOfAllProductsInCart > 0) {
			changeCountOfCardIcon(countOfAllProductsInCart);
		}
	}
}

const addProductToCart = event => {
	const productId = event.currentTarget.dataset.id;

	const cart = JSON.parse(localStorage.getItem('cart'));

	let isInAlreadyInCart = false;
	cart.forEach(item => {
		if (item.productId === productId) {
			item.count++;
			isInAlreadyInCart = true;
		}
	})
	if (!isInAlreadyInCart) {
		cart.push({productId: productId, count: 1});
	}

	let countOfAllProductsInCart = calculateCountOfAllProductsInCart(cart);

	changeCountOfCardIcon(countOfAllProductsInCart);

	localStorage.setItem('cart', JSON.stringify(cart));
}

const calculateCountOfAllProductsInCart = (cart) => {
	let count = 0;
	cart.forEach(item => {
		count += item.count;
	});
	return count;
}

const cartListener = () => {
	$('.ti-shopping-cart').click(showModalCart);
}

const showModalCart = event => {
	$('section').removeClass('active');
	$('.cart_area').addClass('active');
	$('.table > tbody').html('');

	event.preventDefault();

	fillCart();

}

const fillCart = () => {
	const productsInCart = JSON.parse(localStorage.getItem('cart'));
	fetch(productsUrl)
			.then(res => res.json())
			.then(res => {
				let isEmptyCart = true;
				let productInCartNumber = 1;
				res.forEach(product => {
					productsInCart.forEach(productInCart => {
						if (product.id === productInCart.productId) {
							isEmptyCart = false;
							createBlockWithProductInCart(product, productInCart.count, productInCartNumber++);
						}
					})
				})
				if(isEmptyCart) {
					$('.table > tbody').append($('<div>', {text: 'Cart is Empty'}));
				} else {
					$('.table > tbody').append($('<div>', {id: 'btn-for-buy-form'}).addClass('custom-btn').click(checkOutListener)
							.append($('<a/>', {href: '#', text: 'Checkout'}).addClass('primary-btn')));
				}
			});
}

const createBlockWithProductInCart = (product, count, productInCartNumber) => {
	const {id, brand, model, price, img} = product;
	const parentTrOfProductInCart = $('<tr/>', {
		'data-productnum': productInCartNumber,
		'data-id': id,
		'data-price': price,
		'data-count': count,
		id: `product-in-cart-num-${productInCartNumber}`
	});
	const imgWithBrand = $('<td/>').appendTo(parentTrOfProductInCart);
	$(imgWithBrand).append($('<div/>').addClass('media')
			.append($('<div/>').addClass('d-flex'))
			.append($(`<img src="${img}">`).height(150).width(150))
			.append($('<div/>').addClass('media-body').append($('<p/>', {text: brand}))));

	const priceBlock = $('<td/>').appendTo(parentTrOfProductInCart);
	priceBlock.append($('<h5/>', {text: `$ ${price}`}).addClass('product-in-cart-price'));

	const countBlock = $('<td/>').appendTo(parentTrOfProductInCart);
	countBlock.append($('<div/>').addClass('product_count')
			.append($('<div/>', {
				'data-count': count,
				text: count
			}).addClass('product-in-cart-count').css('margin-top', '5px'))
			.append($('<button/>', {type: 'button', text: '-'}).addClass('product_count').click(removeOneProductFromCart))
			.append($('<button/>', {type: 'button', text: '+'}).addClass('product_count').click(addOneProductToCart)));

	const totalPriceBlock = $('<td/>').appendTo(parentTrOfProductInCart);
	totalPriceBlock.append($('<h5/>', {text: `$ ${price * count}`}).addClass('product-in-cart-price-total'));

	$('.table > tbody').prepend(parentTrOfProductInCart);
}

const removeOneProductFromCart = event => {
	const productInCartId = event.target.parentElement.parentElement.parentElement.dataset.id;
	let count = parseInt(event.target.parentElement.parentElement.parentElement.dataset.count);
	let productInNumber = event.target.parentElement.parentElement.parentElement.dataset.productnum;
	let price = event.target.parentElement.parentElement.parentElement.dataset.price;

	const productBlock = $(`#product-in-cart-num-${productInNumber}`);

	let cart = JSON.parse(localStorage.getItem('cart'));

	let newCart = [];
	if (count === 1) {
		productBlock.remove();
		cart.find(productInCart => {
					if (productInCart.productId !== productInCartId && cart.length > 1) {
						newCart.push(productInCart);
						localStorage.setItem('cart', JSON.stringify(newCart));
					} else if (productInCart.productId === productInCartId && cart.length < 2) {
						localStorage.setItem('cart', JSON.stringify(newCart));

						$('#btn-for-buy-form').remove();
						$('<div/>', {text: 'Cart is empty'}).appendTo($('.table > tbody'));
						changeCountOfCardIcon(0);
					}
				}
		);
	} else {
		cart.find(productInCart => {
			if (productInCart.productId === productInCartId) {
				productInCart.count = --count;
				$(`#product-in-cart-num-${productInNumber} .product-in-cart-count`).text(`${count}`);
				$(`#product-in-cart-num-${productInNumber} .product-in-cart-price-total`).text(`$ ${price * count}`);
				$(`#product-in-cart-num-${productInNumber}`).attr('data-count', count);
				localStorage.setItem('cart', JSON.stringify(cart));
			}
		});
	}
	changeCountOfCardIcon();
}

const addOneProductToCart = event => {
	const productInCartId = event.target.parentElement.parentElement.parentElement.dataset.id;
	let productInCartCount = parseInt(event.target.parentElement.parentElement.parentElement.dataset.count);
	let productInNumber = event.target.parentElement.parentElement.parentElement.dataset.productnum;
	let price = event.target.parentElement.parentElement.parentElement.dataset.price;

	let cart = JSON.parse(localStorage.getItem('cart'));

	cart.find(productInCart => {
		if (productInCart.productId === productInCartId) {
			productInCart.count = ++productInCartCount;
		}
	});

	localStorage.setItem('cart', JSON.stringify(cart));

	$(`#product-in-cart-num-${productInNumber} .product-in-cart-count`).text(`${productInCartCount}`);
	$(`#product-in-cart-num-${productInNumber} .product-in-cart-price-total`).text(`$ ${price * productInCartCount}`);
	$(`#product-in-cart-num-${productInNumber}`).attr('data-count', productInCartCount);
	changeCountOfCardIcon();
}