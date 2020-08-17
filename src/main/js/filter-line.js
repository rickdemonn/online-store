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
    $('#filters-apply-button2').remove();
	$('.find-products-list .products-block').html('Please fill in the fields to search for products');
    searchFieldListeners();
};

const searchFieldListeners = () => {
    $('<button/>', {type: 'button', id: 'filters-apply-button2', text: 'Apply Filter'})
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
                if (product.brand.toLowerCase().includes(brandValue.toLowerCase())
					&& product.model.toLowerCase().includes(modelValue.toLowerCase())
					&& product.price >= fromValue
					&& product.price <= toValue) {

                    productArr.push(product);
                }
            });
            const productsBlockParentSelector = '.find-products-list .row';
            if(productArr.length < 1) {
                $(productsBlockParentSelector).children().remove();
                $('<div/>', {text: 'Nothing is found ¯\\_(ツ)_/¯'}).addClass('products-block').appendTo(productsBlockParentSelector);
            } else {
                createBlockOfProducts(productArr, productsBlockParentSelector);
            }
        });
};
