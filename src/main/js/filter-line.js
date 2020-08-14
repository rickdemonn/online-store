const findYourProductListener = () => {
    $('#find-your-product-btn').click(function (e) {
        e.preventDefault();
        window.location.hash = '#search';
    })
};


const showSearchingPage = () => {
    $('#check-active').children().removeClass('active');
    $('#find-your-product-btn').parent().addClass('active');
    $('.section').removeClass('active');
    $('.search-page').addClass('active');
    $('#filters-apply-button').remove();
	$('.find-products-list .products-block').html('Please fill in the fields to search for products');
    searchFieldListeners();
};

const searchFieldListeners = () => {
    $('<button/>', {type: 'button', id: 'filters-apply-button', text: 'Apply Filter'})
        .addClass('button filter-button')
        .click(startSearching)
        .appendTo($('#filterProducts'));
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
            createBlockOfProducts(productArr, '.find-products-list .row');
        });
};
