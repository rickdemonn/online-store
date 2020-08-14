// const productsStartListener = () => {
//     $('#products-btn').click(createProducts);
// };

// const createProducts = event => {
//     event.preventDefault();
//     $('section').removeClass('active');
//     $('.all-products-page').addClass('active').html('');
//     const productsBlock = $('<div/>', {id: 'products-block'}).appendTo($('.all-products-page'));
//     productsBlock.append($('<div/>').addClass('container'));
//     fetch(productsUrl)
//         .then(res => {
//             return res.json();
//         })
//         .then(res => {
//             createBlockOfProducts(res);
//         })
//         .catch(reject => {
//             console.log("Ups");
//             console.log(reject);
//         });
// };

const createBlockOfProducts = (products, parentSelector = '.category-list .row') => {
	const parent = document.querySelector(parentSelector);
	parent.innerHTML = '';

	products.forEach(productItem => {
		const {id, categoryId, brand, model, price, img} = productItem;

		const card = document.createElement('div');
		card.classList.add("card", "card-product", "col-md-6", "col-lg-4");
		card.setAttribute('product-id', id);

		const image = document.createElement('img');
		image.setAttribute('src', img);
		image.style.height = '180px';

		const textContainer = document.createElement('div');
		textContainer.classList.add('card-body', 'text-center');

		const productName = document.createElement('h4');
		productName.className = 'brand-and-model';
		productName.textContent = `${brand} ${model}`;

		const productDescription = document.createElement('p');
		productDescription.className = 'card-product__price';
		productDescription.textContent = `${price} UAH`;

		card.appendChild(image);
		textContainer.appendChild(productName);
		textContainer.appendChild(productDescription);
		card.appendChild(textContainer);

		$('<button/>', {
			type: 'button',
			text: 'Add to cart',
			'data-id': id
		}).click(addProductToCart).addClass('button').appendTo(card);
		//
		card.addEventListener('click', function (e) {
			e.preventDefault();
			productIdForProductDetail = e.currentTarget.attributes['product-id'].value;
			window.location.hash = '#product-details';
		});
		parent.appendChild(card);

		// const card = $('<div/>', {
		//     'data-id': id,
		//     'category-id': categoryId
		// }).addClass('product-card').appendTo($('#products-block > .container'));
		// card.append($('<img>', {'src': img}))
		//     .append($('<div/>', {text: brand}))
		//     .append($('<div/>', {text: model}))
		//     .append($('<div/>', {text: `Price is: ${price}`}))
		//     .append($('<button/>', {type: 'button', text: 'Add to cart', 'data-id': id}).click(addProductToCart));
	})
};

const showProductsByCategory = (categoryId, filters) => {
	// const categoryId = category.querySelector('input').getAttribute('category-id');
	// $('#categories-block').remove();
	// const productsBlock = $('<div/>', {id: 'products-block'}).prependTo($('.all-products-page'));
	// productsBlock.append($('<div/>').addClass('container'));
	fetch(productsUrl)
			.then(res => {
				return res.json();
			})
			.then(res => {
				let highestPrice = 0;
				const productsByCategory = [];

				if (!filters) {
					res.find(product => {
						if (product.categoryId === categoryId) {
							productsByCategory.push(product);
	
							if (highestPrice < product.price) {
								highestPrice = product.price;
							}
						}
					});
				} else {
					res.find(product => {
						if (product.categoryId === categoryId) {
							filters.forEach(filter => { 
								if (product.brand === filter) {
									productsByCategory.push(product);

									if (highestPrice < product.price) {
										highestPrice = product.price;
									}
								}
							});
						}
					});
				}

				createBlockOfProducts(productsByCategory);
				showPriceRange(highestPrice, productsByCategory);
			})
			.catch(reject => {
				console.log("Oops");
				console.log(reject);
			});
};