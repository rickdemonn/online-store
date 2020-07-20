const changeCountOfCardIcon = count => {
	if (count) {
		$('.nav-shop__circle').text(count);
	} else {
		const cart = JSON.parse(localStorage.getItem('cart'));
		if (cart.length > 0) {
			changeCountOfCardIcon(cart.length);
		}
	}
}

const addProductToCart = event => {
	const productId = event.currentTarget.dataset.id;

	if (!localStorage.getItem('cart')) {
		localStorage.setItem('cart', JSON.stringify([{productId: productId}]));
		changeCountOfCardIcon(1);
	} else {
		const cart = JSON.parse(localStorage.getItem('cart'));
		cart.push({productId: productId});
		changeCountOfCardIcon(cart.length);
		localStorage.setItem('cart', JSON.stringify(cart));
	}
}

const cartListener = () => {
	$('.ti-shopping-cart').click(createModal);
}

const createModal = () => {
	// $('<div/>')
}
