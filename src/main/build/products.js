'use strict';

var productsStartListener = function productsStartListener() {
    $('#products-btn').click(createProducts);
};

var createProducts = function createProducts(event) {
    event.preventDefault();
    $('.hero-banner').remove();
    $('#categories-block').remove();
    $('#products-block').remove();
    var productsBlock = $('<div/>', { id: 'products-block' }).prependTo($('.site-main'));
    productsBlock.append($('<div/>').addClass('container'));
    fetch(productsUrl).then(function (res) {
        return res.json();
    }).then(function (res) {
        createBlockOfProducts(res);
    }).catch(function (reject) {
        console.log("Ups");
        console.log(reject);
    });
};

var createBlockOfProducts = function createBlockOfProducts(products) {
    products.forEach(function (productItem) {
        var id = productItem.id,
            categoryId = productItem.categoryId,
            brand = productItem.brand,
            model = productItem.model,
            price = productItem.price,
            img = productItem.img;

        var card = $('<div/>', {
            'data-id': id,
            'category-id': categoryId
        }).addClass('product-card').appendTo($('#products-block > .container'));
        card.append($('<img>', { 'src': img })).append($('<div/>', { text: brand })).append($('<div/>', { text: model })).append($('<div/>', { text: 'Price is: ' + price })).append($('<button/>', { type: 'button', text: 'Add to cart', 'data-id': id }).click(addProductToCart));
    });
};

var showProductsByCategory = function showProductsByCategory(event) {
    var categoryId = event.currentTarget.dataset.id;
    $('#categories-block').remove();
    var productsBlock = $('<div/>', { id: 'products-block' }).prependTo($('.site-main'));
    productsBlock.append($('<div/>').addClass('container'));
    fetch(productsUrl).then(function (res) {
        return res.json();
    }).then(function (res) {
        var productsByCategory = [];
        res.find(function (product) {
            if (product.categoryId === categoryId) {
                productsByCategory.push(product);
            }
        });
        createBlockOfProducts(productsByCategory);
    }).catch(function (reject) {
        console.log("Ups");
        console.log(reject);
    });
};