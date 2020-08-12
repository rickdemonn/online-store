const productWasSuccessfullyPurchased = () => {
	$('section').removeClass('active');
	$('.order_details').addClass('active');

	$('#go-to-home').click(goHome);

	setOrderInfo();
	setBillingAddress();
	fillOrderDetails();

	clearLocalStorage();
	changeCountOfCardIcon(0);
}

const clearLocalStorage = () => {
	localStorage.setItem('cart', JSON.stringify([]));
}

const setOrderInfo = () => {
	$('#order-number').text(`: ${rand(10000, 99999)}`);
	$('#order-date').text(`: ${Date().toLocaleString().replace(/:\d{2}\s.*/, ' ')}`);
	$('#order-total').text(`: ${$('#total-in-order').text()}`);
	const payMethod = $('#f-option5').prop('checked') ? ': Check Payments' : ': PayPal';
	$('#order-paymethod').text(payMethod);
}

const setBillingAddress = () => {
	$('#order-street').text(`: ${$('#add1').val()}`);
	$('#order-city').text(`: ${$('#city').val()}`);
	$('#order-country').text(`: ${$('.country_select').val()}`);
	$('#order-zip').text(`: ${$('#zip').val()}`);
}

const fillOrderDetails = () => {
	const orderProducts = $('#order-products-bottom');
	orderProducts.children().remove();
	const productBlock = createProductBlock()
	orderProducts.append(productBlock);
}

const createProductBlock = () => {
	const productBlock = $('#order-products-bottom');
	$('#order-products').children().not(':first-child').each(function () {
		$('<tr/>').append($('<td>').append($('<p/>', {text: `${$(this).children().text()}`}))).appendTo(productBlock);
	});
	return productBlock;
}

const rand = (min, max) => {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

const goHome = event => {
	event.preventDefault();
	$('section').removeClass('active');
	$('.home-page').addClass('active');
}