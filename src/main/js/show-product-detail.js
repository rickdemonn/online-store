const showProductDetail = () => {
	$('section').removeClass('active');
	$('.product-page').addClass('active');

	fetch(productsUrl)
			.then(res => res.json())
			.then(res => {
				res.forEach(product => {
					if(product.id === productIdForProductDetail) {
						createProductInfo(product);
					}
				})
			})
}

const createProductInfo = product => {
	const {id, categoryId, brand, model, price, img} = product;
	const imgParent = $('.single-prd-item');
	$('#product-detail-img').remove();
	$(`<img src="${img}" id="product-detail-img">`, {id: 'product-detail-img'}).addClass('img-fluid').appendTo(imgParent);

	$('#brand-model').text(`${brand} ${model}`);
	$('#product-info-price').text(`${price} UAH`);
}