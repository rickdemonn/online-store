const initLocalStorage = () => {
	if (!localStorage.getItem('cart')) {
		localStorage.setItem('cart', JSON.stringify([]));
	}
	changeCountOfCardIcon();
}

const changeCountOfCardIcon = count => {
	if (count) {
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
				res.forEach(product => {
					productsInCart.forEach(productInCart => {
						if(product.id === productInCart.productId) {
							isEmptyCart = false;
							createBlockWithProductInCart(product, productInCart.count);
						}
					})
				})
				if(isEmptyCart) {
					$('<div/>', {text: 'Cart is empty'}).appendTo($('#modal-cart-block'));
				} else {
					$('<button/>', {
						type: 'button',
						text: 'place an order'
					}).click(placeAnOrder).appendTo($('#modal-cart-block'));
				}
			});
}

const createBlockWithProductInCart = (product, count) => {
	const { productId, brand, model, price, img } = product;
	const productCard = $('<div/>', {'data-id': productId}).addClass('product-in-cart-card').appendTo($('#modal-cart-block'));
	$(`<img src="${img}">`).addClass('img-in-cart').appendTo(productCard);
	$('<div>',{text: `${brand} ${model} `}).appendTo(productCard);
	$('<div>',{text: `Count x ${count}`}).appendTo(productCard);
	$('<div>',{text: `Price is ${price * count}`}).appendTo(productCard);
	$('<button/>',{type: 'button', text: '-'}).click(removeOneProductFromCart).appendTo(productCard);
	$('<button/>',{type: 'button', text: '+'}).click(addOneProductToCart).appendTo(productCard);
}

const removeOneProductFromCart = event => {
	//TODO
}

const addOneProductToCart = event => {
	//TODO
}

const placeAnOrder = event => {
	//TODO форма для заказа товаров из корзины с волидацией
}