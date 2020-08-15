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
	const productBlock = document.querySelector('#order-products-bottom');

	const products = document.querySelectorAll('#order-products')[0].children;

	for (let i = 1; i < products.length; i++) {
		const row = document.createElement('tr');

		for (let j = 0; j < products[i].children.length; j++) {
			const cell = document.createElement('td');
			cell.textContent = products[i].children[j].textContent;

			row.appendChild(cell);
		}

		productBlock.appendChild(row);
	}

	const row = document.createElement('tr');
	const total1 = document.createElement('td');
	const total2 = document.createElement('td');
	const total3 = document.createElement('td');
	const totalSum = document.querySelector('#total-in-order').textContent;

	total1.textContent = 'TOTAL'
	row.appendChild(total1);

	total2.textContent = ' '
	row.appendChild(total2);

	total3.textContent = totalSum;
	row.appendChild(total3);

	productBlock.appendChild(row);

	// $('#order-products').children().not(':first-child').each(function () {
	// 	$('<tr/>').append($('<td>').append($('<p/>', {text: `${$(this).children().text()}`}))).appendTo(productBlock);
	// });
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