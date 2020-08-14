const findYourProductListener = () => {
    $('#find-your-product-btn').click(function (e) {
        e.preventDefault();
        window.location.hash = '#search';
    })
};


const showSearchingPage = () => {
    $('.section').removeClass('active');
    $('.search-page').addClass('active');
	$('.find-products-list .products-block').html('Please fill in the fields to search for products');
    searchFieldListeners();
};

const searchFieldListeners = () => {
    $('#filters-apply-button').click(startSearching);
};

const startSearching = () => {
    const brandValue = $('#filter-field-brand').val() || '';
    const modelValue = $('#filter-field-model').val() || '';
    const fromValue = $('#filter-field-from').val() || 0;
    const toValue = $('#filter-field-to').val() || Number.MAX_VALUE;

    fetch(productsUrl)
        .then(res => res.json())
        .then(res => {
            const productArr = [];
            res.forEach(product => {
                if (product.brand.toLowerCase().startsWith(brandValue.toLowerCase())
					&& product.model.toLowerCase().startsWith(modelValue.toLowerCase())
					&& product.price >= fromValue
					&& product.price <= toValue) {

                    productArr.push(product);
                }
            });
            createBlockOfFindedProducts(productArr);
        });
};

const createBlockOfFindedProducts = products => {
	const parent = document.querySelector('.find-products-list .row');
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
	})
};