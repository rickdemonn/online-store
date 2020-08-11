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

		checkCommentsFromLocalStorage(productIdForProductDetail);

		addToCard.click(prepareAddProductToCart);
		$('#add-a-review').click(addReview);
	});
}

const checkCommentsFromLocalStorage = productId => {
	const commentsFromLocal = JSON.parse(localStorage.getItem('comments'));
	if (commentsFromLocal) {
		commentsFromLocal.forEach(comment => {
			if (productId === comment.productId) {
				createProductComments(comment.comments);
			}
		})
	}
}

const createProductInfo = async product => {
	const {id, categoryId, brand, model, price, img, description} = product;
	const imgParent = $('.single-prd-item');
	$('#product-detail-img').remove();
	$(`<img src="${img}" id="product-detail-img">`, {id: 'product-detail-img'}).addClass('img-fluid').appendTo(imgParent);

	const categoryName = await getCategoryName(categoryId);
	$('#category-in-product').remove();
	$('.s_product_text').prepend($('<p/>', {text: `Category: ${categoryName}`, id: 'category-in-product'}));
	$('#brand-model').text(`${brand} ${model}`);
	$('#product-info-price').text(`${price} UAH`);
	$('#product-description').text(description);
	$('#add-to-cart-pd').attr('data-id', id);
}

const getCategoryName = async (categoryId) => {
	let categoryName;
	await fetch(categoriesUrl)
			.then(res => res.json())
			.then(res => {
				res.forEach(item => {
					if (categoryId === item.id) {
						categoryName = item.name;
					}
				})
			})
	return categoryName;
}

const prepareAddProductToCart = event => {
	event.preventDefault();
	const quantity = $('#sst').val();
	for (let i = 0; i < quantity; i++) {
		addProductToCart(event);
	}
}

const createProductComments = comments => {
	const commentsParent = $('.review_list');
	comments.forEach(commentItem => {
		const {user, userImg, comment} = commentItem;
		$('<div/>').addClass('review_item').append($('<div/>').addClass('media')
				.append($('<div/>').addClass('d-flex')
						.append($('<img/>', {'src': userImg || emptyProfileAvatar}))
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

	name.parent().removeClass('error');
	comment.parent().removeClass('error');

	if (isValidAddReview(name, comment)) {
		const productId = $('#add-to-cart-pd').attr('data-id');

		const userComment = [{id: "1", user: name.val(), userImg: emptyProfileAvatar, comment: comment.val()}];
		const userCommentsFromLocalStorage = JSON.parse(localStorage.getItem('comments'));

		const commentToLocal = [{id: rand(1, 1000), productId: productId, comments: userComment}]
		if (!userCommentsFromLocalStorage) {
			localStorage.setItem('comments', JSON.stringify(commentToLocal));
		} else {
			userCommentsFromLocalStorage.push(commentToLocal[0]);
			localStorage.setItem('comments', JSON.stringify(userCommentsFromLocalStorage));
		}

		createProductComments([{user: name.val(), comment: comment.val()}]);
		name.val('');
		comment.val('')
	}
}

const isValidAddReview = (name, comment) => {
	let isValid = true;
	const namePattern = /[A-Z]|[А-Я][a-z]|[а-я]{1,} [A-Z]|[А-Я][a-z]|[а-я]{1,}$/;
	if (!name.val()) {
		name.parent().addClass('error');
		isValid = false;
	}
	if (!comment.val()) {
		comment.parent().addClass('error');
		isValid = false;
	}
	if (!namePattern.test(name.val())) {
		name.parent().addClass('error');
		isValid = false;
	}
	return isValid;
}