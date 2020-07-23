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
	const overlay = $('#overlay');
	const close = $('.modal_close, #overlay');
	const modal = $('.modal_div');
	event.preventDefault();

	overlay.fadeIn(400, () => {
		$(modal).css('display', 'block').animate({opacity: 1, top: '50%'}, 200);
	});

	fillCart();

	close.click(() => {
		modal.animate({opacity: 0, top: '45%'}, 200, () => {
					$(this).css('display', 'none');
					overlay.fadeOut(400);
				}
		);
	})


}

const fillCart = () => {
	const productsInCart = JSON.parse(localStorage.getItem('cart'));
	$('#modal-cart-block').text('');
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
				if (isEmptyCart) {
					$('<div/>', {text: 'Cart is empty'}).appendTo($('#modal-cart-block'));
				} else {
					$('<button/>', {
						type: 'button',
						text: 'place an order',
						id: 'place-an-order-btn'
					}).click(placeAnOrder).appendTo($('#modal-cart-block'));
				}
			});
}

const createBlockWithProductInCart = (product, count, productInCartNumber) => {
	const {id, brand, model, price, img} = product;
	const productCard = $('<div/>', {
		'data-id': id,
		'data-count': count,
		id: `product-block-${productInCartNumber}`
	}).addClass('product-in-cart-card').appendTo($('#modal-cart-block'));
	$(`<img src="${img}">`).addClass('img-in-cart').appendTo(productCard);
	$('<div>', {text: `${brand} ${model} `}).appendTo(productCard);
	$('<div>', {
		text: `Count x ${count}`,
		id: `product-block-count-${productInCartNumber}`,
		'data-count': count
	}).appendTo(productCard);
	$('<div>', {
		text: `Price is ${price * count}`,
		id: `product-block-price-${productInCartNumber}`,
		'data-price': price
	}).appendTo(productCard);
	$('<button/>', {type: 'button', text: '-'}).click(removeOneProductFromCart).appendTo(productCard);
	$('<button/>', {type: 'button', text: '+'}).click(addOneProductToCart).appendTo(productCard);
}

const removeOneProductFromCart = event => {
	const productInCartId = event.target.parentElement.getAttribute('id');
	const productInCartNumberInId = productInCartId.match(/\d/);
	const productBlock = $(`#${productInCartId}`);
	const productId = event.target.parentElement.dataset.id;

	const modalCartBlockSelector = $('#modal-cart-block');

	const priceSelector = `#product-block-price-${productInCartNumberInId[0]}`
	let price = parseInt($(priceSelector).attr('data-price'));

	const countSelector = `#product-block-count-${productInCartNumberInId[0]}`
	let count = parseInt($(countSelector).attr('data-count'));

	let cart = JSON.parse(localStorage.getItem('cart'));
	let newCart = [];
	if (count === 1) {
		productBlock.remove();
		cart.find(productInCart => {
			if (productInCart.productId !== productId && cart.length > 1) {
				newCart.push(productInCart);
				localStorage.setItem('cart', JSON.stringify(newCart));
			} else if (productInCart.productId === productId) {
				localStorage.setItem('cart', JSON.stringify(newCart));

				if (modalCartBlockSelector.children().length < 2) {
					$('#place-an-order-btn').remove();
					$('<div/>', {text: 'Cart is empty'}).appendTo(modalCartBlockSelector);
					changeCountOfCardIcon(0);
				}
			}
		});
	} else {
		cart.find(productInCart => {
			if (productInCart.productId === productId) {
				productInCart.count = --count;
				productBlock.attr('data-count', count);
				$(countSelector).attr('data-count', count);
				$(countSelector).text(`Count x ${count}`);
				$(priceSelector).text(`Price is ${price * count}`);
				localStorage.setItem('cart', JSON.stringify(cart));
			}
		});
	}
	changeCountOfCardIcon();
}

const addOneProductToCart = event => {
	//TODO
}

const placeAnOrder = event => {
	//TODO форма для заказа товаров из корзины с волидацией
}