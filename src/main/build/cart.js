'use strict';

var initLocalStorage = function initLocalStorage() {
	if (!localStorage.getItem('cart')) {
		localStorage.setItem('cart', JSON.stringify([]));
	}
	changeCountOfCardIcon();
};

var changeCountOfCardIcon = function changeCountOfCardIcon(count) {
	if (count === 0) {
		$('.nav-shop__circle').text('');
	} else if (count) {
		$('.nav-shop__circle').text(count);
	} else {
		var cart = JSON.parse(localStorage.getItem('cart'));
		var countOfAllProductsInCart = calculateCountOfAllProductsInCart(cart);
		if (countOfAllProductsInCart > 0) {
			changeCountOfCardIcon(countOfAllProductsInCart);
		}
	}
};

var addProductToCart = function addProductToCart(event) {
	var productId = event.currentTarget.dataset.id;

	var cart = JSON.parse(localStorage.getItem('cart'));

	var isInAlreadyInCart = false;
	cart.forEach(function (item) {
		if (item.productId === productId) {
			item.count++;
			isInAlreadyInCart = true;
		}
	});
	if (!isInAlreadyInCart) {
		cart.push({ productId: productId, count: 1 });
	}

	var countOfAllProductsInCart = calculateCountOfAllProductsInCart(cart);

	changeCountOfCardIcon(countOfAllProductsInCart);

	localStorage.setItem('cart', JSON.stringify(cart));
};

var calculateCountOfAllProductsInCart = function calculateCountOfAllProductsInCart(cart) {
	var count = 0;
	cart.forEach(function (item) {
		count += item.count;
	});
	return count;
};

var cartListener = function cartListener() {
	$('.ti-shopping-cart').click(showModalCart);
};

var showModalCart = function showModalCart(event) {
	var overlay = $('#overlay');
	var close = $('.modal_close, #overlay');
	var modal = $('.modal_div');
	event.preventDefault();

	overlay.fadeIn(400, function () {
		$(modal).css('display', 'block').animate({ opacity: 1, top: '50%' }, 200);
	});

	fillCart();

	close.click(function () {
		modal.animate({ opacity: 0, top: '45%' }, 200, function () {
			$(undefined).css('display', 'none');
			overlay.fadeOut(400);
		});
	});
};

var fillCart = function fillCart() {
	var productsInCart = JSON.parse(localStorage.getItem('cart'));
	$('#modal-cart-block').text('');
	fetch(productsUrl).then(function (res) {
		return res.json();
	}).then(function (res) {
		var isEmptyCart = true;
		var productInCartNumber = 1;
		res.forEach(function (product) {
			productsInCart.forEach(function (productInCart) {
				if (product.id === productInCart.productId) {
					isEmptyCart = false;
					createBlockWithProductInCart(product, productInCart.count, productInCartNumber++);
				}
			});
		});
		if (isEmptyCart) {
			$('<div/>', { text: 'Cart is empty' }).appendTo($('#modal-cart-block'));
		} else {
			$('<button/>', {
				type: 'button',
				text: 'place an order',
				id: 'place-an-order-btn'
			}).click(placeAnOrder).appendTo($('#modal-cart-block'));
		}
	});
};

var createBlockWithProductInCart = function createBlockWithProductInCart(product, count, productInCartNumber) {
	var id = product.id,
	    brand = product.brand,
	    model = product.model,
	    price = product.price,
	    img = product.img;

	var productCard = $('<div/>', {
		'data-id': id,
		'data-count': count,
		id: 'product-block-' + productInCartNumber
	}).addClass('product-in-cart-card').appendTo($('#modal-cart-block'));
	$('<img src="' + img + '">').addClass('img-in-cart').appendTo(productCard);
	$('<div>', { text: brand + ' ' + model + ' ' }).appendTo(productCard);
	$('<div>', {
		text: 'Count x ' + count,
		id: 'product-block-count-' + productInCartNumber,
		'data-count': count
	}).appendTo(productCard);
	$('<div>', {
		text: 'Price is ' + price * count,
		id: 'product-block-price-' + productInCartNumber,
		'data-price': price
	}).appendTo(productCard);
	$('<button/>', { type: 'button', text: '-' }).click(removeOneProductFromCart).appendTo(productCard);
	$('<button/>', { type: 'button', text: '+' }).click(addOneProductToCart).appendTo(productCard);
};

var removeOneProductFromCart = function removeOneProductFromCart(event) {
	var productInCartId = event.target.parentElement.getAttribute('id');
	var productInCartNumberInId = productInCartId.match(/\d/);
	var productBlock = $('#' + productInCartId);
	var productId = event.target.parentElement.dataset.id;

	var modalCartBlockSelector = $('#modal-cart-block');

	var priceSelector = '#product-block-price-' + productInCartNumberInId[0];
	var price = parseInt($(priceSelector).attr('data-price'));

	var countSelector = '#product-block-count-' + productInCartNumberInId[0];
	var count = parseInt($(countSelector).attr('data-count'));

	var cart = JSON.parse(localStorage.getItem('cart'));
	var newCart = [];
	if (count === 1) {
		productBlock.remove();
		cart.find(function (productInCart) {
			if (productInCart.productId !== productId && cart.length > 1) {
				newCart.push(productInCart);
				localStorage.setItem('cart', JSON.stringify(newCart));
			} else if (productInCart.productId === productId) {
				localStorage.setItem('cart', JSON.stringify(newCart));

				if (modalCartBlockSelector.children().length < 2) {
					$('#place-an-order-btn').remove();
					$('<div/>', { text: 'Cart is empty' }).appendTo(modalCartBlockSelector);
					changeCountOfCardIcon(0);
				}
			}
		});
	} else {
		cart.find(function (productInCart) {
			if (productInCart.productId === productId) {
				productInCart.count = --count;
				productBlock.attr('data-count', count);
				$(countSelector).attr('data-count', count);
				$(countSelector).text('Count x ' + count);
				$(priceSelector).text('Price is ' + price * count);
				localStorage.setItem('cart', JSON.stringify(cart));
			}
		});
	}
	changeCountOfCardIcon();
};

var addOneProductToCart = function addOneProductToCart(event) {
	var productInCartId = event.target.parentElement.getAttribute('id');
	var productInCartNumberInId = productInCartId.match(/\d/);
	var productBlock = $('#' + productInCartId);
	var productId = event.target.parentElement.dataset.id;

	var priceSelector = '#product-block-price-' + productInCartNumberInId[0];
	var price = parseInt($(priceSelector).attr('data-price'));

	var countSelector = '#product-block-count-' + productInCartNumberInId[0];
	var count = parseInt($(countSelector).attr('data-count'));

	var cart = JSON.parse(localStorage.getItem('cart'));

	cart.find(function (productInCart) {
		if (productInCart.productId === productId) {
			productInCart.count = ++count;
		}
	});

	productBlock.attr('data-count', count);
	$(countSelector).attr('data-count', count);
	$(countSelector).text('Count x ' + count);
	$(priceSelector).text('Price is ' + price * count);
	localStorage.setItem('cart', JSON.stringify(cart));
	changeCountOfCardIcon();
};

var placeAnOrder = function placeAnOrder(event) {
	//TODO форма для заказа товаров из корзины с волидацией
};