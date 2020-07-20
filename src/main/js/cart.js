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

const createModal = event => {
	const overlay = $('#overlay');
	const close = $('.modal_close, #overlay');
	const modal = $('.modal_div');
	event.preventDefault();

	overlay.fadeIn(400, () => { // пoсле oкoнчaния пoкaзывaния oверлэя
				$(modal).css('display', 'block').animate({opacity: 1, top: '50%'}, 200);
			});

	close.click(() => {
		modal.animate({opacity: 0, top: '45%'}, 200, // плaвнo прячем
						() => { // пoсле этoгo
							$(this).css('display', 'none');
							overlay.fadeOut(400); // прячем пoдлoжку
						}
				);
	})
}
