const showProductDetail = () => {
	$('section').removeClass('active');
	$('.product-page').addClass('active');

	const products = fetch(productsUrl)
			.then(res => res.json());

	const comments = fetch(commentsUrl)
			.then(res => res.json());

	Promise.all([products, comments]).then(([products, comments]) => {
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

	$('#add-to-cart-pd').attr('data-id', id).click(addProductToCart);
}

const createProductComments = comments => {
	const commentsParent = $('.review_list');
	comments.forEach(commentItem => {
		const {user, userImg, comment} = commentItem;
		$('<div/>').addClass('review_item').append($('<div/>').addClass('media')
				.append($('<div/>').addClass('d-flex')
						.append($('<img/>', {'src': userImg}))
				)
				.append($('<div/>').addClass('d-flex')
						.append($('<h4/>', {text: user})))
		)
				.append($('<p>', {text: comment}))
				.appendTo(commentsParent)
	})

}