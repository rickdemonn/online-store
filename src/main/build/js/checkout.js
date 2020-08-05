const checkOutListener = () => {
	$('section').removeClass('active');
	$('.checkout_area').addClass('active');

	fillYourOrder();
}

const fillYourOrder = () => {
	const cart = JSON.parse(localStorage.getItem('cart'));
	let totalPrice = 0;

	fetch(productsUrl)
			.then(res => res.json())
			.then(res => {
				res.forEach(product => {
					cart.forEach(productInCart => {
						if (productInCart.productId === product.id) {
							createProductInOrder(product, productInCart.count);
							totalPrice += product.price * productInCart.count;
						}
					})
				});
				$('#total-in-order').text(`$ ${totalPrice}`);
			});
}

const createProductInOrder = (product, count) => {
	$('#order-products')
			.append($('<li/>')
					.append($('<div/>').addClass('product-in-order-card')
							.append($('<span/>', {text: product.brand}))
							.append($('<span/>', {text: ` x ${count}`}))
							.append($('<span/>', {text: ` $ ${count * product.price}`}))
					));
}