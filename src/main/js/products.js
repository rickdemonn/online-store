const productsStartListener = () => {
    $('#products-btn').click(createProducts);
};

const createProducts = event => {
    event.preventDefault();
    $('.hero-banner').remove();
    $('#categories-block').remove();
    $('#products-block').remove();
    const productsBlock = $('<div/>', {id: 'products-block'}).prependTo($('.site-main'));
    productsBlock.append($('<div/>').addClass('container'));
    fetch(productsUrl)
        .then(res => {
            return res.json();
        })
        .then(res => {
            createBlockOfProducts(res);
        })
        .catch(reject => {
            console.log("Ups");
            console.log(reject);
        });
};

const createBlockOfProducts = products => {
    products.forEach(productItem => {
        const {id, categoryId, brand, model, price, img} = productItem;
        const card = $('<div/>', {
            'data-id': id,
            'category-id': categoryId
        }).addClass('product-card').appendTo($('#products-block > .container'));
        card.append($('<img>', {'src': img}))
            .append($('<div/>', {text: brand}))
            .append($('<div/>', {text: model}))
            .append($('<div/>', {text: `Price is: ${price}`}))
            .append($('<div/>', {text: 'Add to cart'}).click(addProductToCart(id, categoryId)));
    })
};

const showProductsByCategory = event => {

};

const addProductToCart = (id, categoryId) => {
    //TODO add product to card in localstorage
};