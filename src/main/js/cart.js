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
		if(item.productId === productId){
			item.count++;
			isInAlreadyInCart = true;
		}
	})
	if (!isInAlreadyInCart){
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
	$('.ti-shopping-cart').click(createModal);
}

const createModal = () => {
	// $('<div/>', {id: 'cart-modal'})
}
