function initRouting() {
    switch (location.hash) {
        case '':
            $('.section').removeClass('active');
            $('.home-page').addClass('active');
            break;
        case '#categories':
            history.pushState('Categories', 'Categories', location.href);
            createCategories();
            break;
        case '#product-details':
            break;
        case '#checkout':
            history.pushState('Checkout', 'Checkout', location.href);
            checkOutListener();
            break;
        case '#order-confirmation':
            break;
    }
}