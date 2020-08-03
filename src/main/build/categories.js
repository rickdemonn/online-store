'use strict';

var categoriesStartListener = function categoriesStartListener() {
    $('#category-btn').click(createCategories);
    $('.button-hero').click(createCategories);
};

var createCategories = function createCategories(event) {
    event.preventDefault();
    $('.hero-banner').remove();
    $('#categories-block').remove();
    $('#products-block').remove();
    var categories = $('<div/>', { id: 'categories-block' }).prependTo($('.site-main'));
    categories.append($('<div/>').addClass('container'));
    fetch(categoriesUrl).then(function (res) {
        return res.json();
    }).then(function (res) {
        createBlockOfCategories(res);
    }).catch(function (reject) {
        console.log("Ups");
        console.log(reject);
    });
};

var createBlockOfCategories = function createBlockOfCategories(response) {
    response.forEach(function (categoryItem) {
        var id = categoryItem.id,
            name = categoryItem.name,
            description = categoryItem.description,
            img = categoryItem.img;

        var card = $('<div/>', { 'data-id': id }).addClass('category-card').click(showProductsByCategory).appendTo($('#categories-block > .container'));
        card.append($('<img>', { 'src': img })).append($('<div/>', { text: name })).append($('<div/>', { text: description }));
    });
};