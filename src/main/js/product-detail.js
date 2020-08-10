const showProductDetail = () => {
	$('section').removeClass('active');
	$('.product-page').addClass('active');
	const addToCard = $('#add-to-cart-pd');

	const products = fetch(productsUrl)
			.then(res => res.json());

	const comments = fetch(commentsUrl)
			.then(res => res.json());

	Promise.all([products, comments]).then(([products, comments]) => {
		addToCard.unbind('click');
		products.forEach(product => {
			if (product.id === productIdForProductDetail) {
				createProductInfo(product);
			}
		});

		$('.review_list').children().remove();

		comments.forEach(comment => {
			if (comment.productId === productIdForProductDetail) {
				createProductComments(comment.comments)
			}
		})

		addToCard.click(prepareAddProductToCart);
		$('#add-a-review').click(addReview);
	});
}

const createProductInfo = product => {
	const {id, categoryId, brand, model, price, img, description} = product;
	const imgParent = $('.single-prd-item');
	$('#product-detail-img').remove();
	$(`<img src="${img}" id="product-detail-img">`, {id: 'product-detail-img'}).addClass('img-fluid').appendTo(imgParent);

	$('#brand-model').text(`${brand} ${model}`);
	$('#product-info-price').text(`${price} UAH`);
	$('#product-description').text(description);
	$('#add-to-cart-pd').attr('data-id', id);
}

const prepareAddProductToCart = event => {
	event.preventDefault();
	addProductToCart(event);
}

const createProductComments = comments => {
	const commentsParent = $('.review_list');
	comments.forEach(commentItem => {
		const {user, userImg, comment} = commentItem;
		$('<div/>').addClass('review_item').append($('<div/>').addClass('media')
				.append($('<div/>').addClass('d-flex')
						.append($('<img/>', {'src': userImg || 'img/product/review-3.png'}))
				)
				.append($('<div/>').addClass('d-flex')
						.append($('<h4/>', {text: user})))
		)
				.append($('<p>', {text: comment}))
				.appendTo(commentsParent)
	})
}

const addReview = () => {
	const name = $('#name-to-review');
	const comment = $('#textarea');

	if (name.val() && comment.val()) {
		name.parent().removeClass('error')
		comment.parent().removeClass('error')
		createProductComments([{user: name.val(), comment: comment.val()}]);
	}
	if (!name.val()) {
		name.parent().addClass('error');
	}
	if (!comment.val()) {
		comment.parent().addClass('error');
	}
}