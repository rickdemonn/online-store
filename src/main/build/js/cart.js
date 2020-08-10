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
	event.stopPropagation()
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
	$('.cart_area').addClass('modal-window');
	document.querySelector('body .modal-shadow').style.display = 'block';
	$('.table > tbody').html('');

	event.preventDefault();

	fillCart();

	const closeButton = document.querySelector('.close-button');
	closeButton.addEventListener('click', hideModalCart);
}

const hideModalCart = () => {
	$('.cart_area').removeClass('modal-window');
	document.querySelector('body .modal-shadow').style.display = 'none';
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
					const row = document.createElement('tr');
					const cell = document.createElement('td');
					cell.className = 'empty-cart-message';
					cell.textContent = 'Cart is Empty';
					cell.setAttribute('colspan', '4');
					row.appendChild(cell);
					$('.table > tbody').append(row);
				} else {
					const row = document.createElement('tr');
                    const cell = document.createElement('td');
                    cell.setAttribute('colspan', '4');
                    cell.style.textAlign = 'center';

                    const purchaseBtn = document.createElement('button');
                    purchaseBtn.setAttribute('type', 'button');
                    purchaseBtn.setAttribute('id', 'btn-for-buy-form');
                    purchaseBtn.textContent = 'Checkout';
                    purchaseBtn.className = 'button';
                    purchaseBtn.addEventListener('click', function() {
						window.location.hash = '#checkout';
					});

                    cell.append(purchaseBtn);
                    row.appendChild(cell);
					document.querySelector('.table > tbody').appendChild(row);
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
			.append($('<div/>').addClass('cart-product-image-container')
			.append($(`<img src="${img}">`).addClass('cart-product-image')))
			.append($('<div/>').addClass('media-body').append($('<p/>', {text: `${brand} ${model}`}))));

	const priceBlock = $('<td/>').appendTo(parentTrOfProductInCart);
	priceBlock.append($('<h5/>', {text: `${price} UAH`}).addClass('product-in-cart-price'));

	const countBlock = $('<td/>').appendTo(parentTrOfProductInCart);
	countBlock.append($('<div/>').addClass('product_count')
			.append($('<button/>', {type: 'button', text: '-'}).addClass('product_count').click(removeOneProductFromCart))
			.append($('<div/>', {
				'data-count': count,
				text: count
			}).addClass('product-in-cart-count').css('margin-top', '5px'))
			.append($('<button/>', {type: 'button', text: '+'}).addClass('product_count').click(addOneProductToCart)));

	const totalPriceBlock = $('<td/>').appendTo(parentTrOfProductInCart);
	totalPriceBlock.append($('<h5/>', {text: `${price * count} UAH`}).addClass('product-in-cart-price-total'));

	const deleteProductBlock = $('<td/>').appendTo(parentTrOfProductInCart);
	deleteProductBlock.append($('<div/>').addClass('product-delete').click(deleteProductFromCart));

	$('.table > tbody').prepend(parentTrOfProductInCart);
}

const deleteProductFromCart = event => {
	const productInCartId = event.target.parentElement.parentElement.dataset.id;
	let productInNumber = event.target.parentElement.parentElement.dataset.productnum;

	const productBlock = $(`#product-in-cart-num-${productInNumber}`);

	let cart = JSON.parse(localStorage.getItem('cart'));

	let newCart = [];

	productBlock.remove();
		cart.find(productInCart => {
					if (productInCart.productId !== productInCartId && cart.length > 1) {
						newCart.push(productInCart);
						localStorage.setItem('cart', JSON.stringify(newCart));
						changeCountOfCardIcon();
					} else if (productInCart.productId === productInCartId && cart.length < 2) {
						localStorage.setItem('cart', JSON.stringify(newCart));

						$('#btn-for-buy-form').remove();
						$('<div/>', {text: 'Cart is empty'}).appendTo($('.table > tbody'));
						changeCountOfCardIcon(0);
					}
				}
		);
}

const removeOneProductFromCart = event => {
	const productInCartId = event.target.parentElement.parentElement.parentElement.dataset.id;
	let count = parseInt(event.target.parentElement.parentElement.parentElement.dataset.count);
	let productInNumber = event.target.parentElement.parentElement.parentElement.dataset.productnum;
	let price = event.target.parentElement.parentElement.parentElement.dataset.price;

	const productBlock = $(`#product-in-cart-num-${productInNumber}`);

	let cart = JSON.parse(localStorage.getItem('cart'));

	// let newCart = [];
	if (count === 1) {
		return
		// productBlock.remove();
		// cart.find(productInCart => {
		// 			if (productInCart.productId !== productInCartId && cart.length > 1) {
		// 				newCart.push(productInCart);
		// 				localStorage.setItem('cart', JSON.stringify(newCart));
		// 			} else if (productInCart.productId === productInCartId && cart.length < 2) {
		// 				localStorage.setItem('cart', JSON.stringify(newCart));

		// 				$('#btn-for-buy-form').remove();
		// 				$('<div/>', {text: 'Cart is empty'}).appendTo($('.table > tbody'));
		// 				changeCountOfCardIcon(0);
		// 			}
		// 		}
		// );
	} else {
		cart.find(productInCart => {
			if (productInCart.productId === productInCartId) {
				productInCart.count = --count;
				$(`#product-in-cart-num-${productInNumber} .product-in-cart-count`).text(`${count}`);
				$(`#product-in-cart-num-${productInNumber} .product-in-cart-price-total`).text(`${price * count} UAH`);
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
	$(`#product-in-cart-num-${productInNumber} .product-in-cart-price-total`).text(`${price * productInCartCount} UAH`);
	$(`#product-in-cart-num-${productInNumber}`).attr('data-count', productInCartCount);
	changeCountOfCardIcon();
}