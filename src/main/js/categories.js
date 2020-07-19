const categoriesStartListener = () => {
    $('#category-btn').click(createCategories);
    $('.button-hero').click(createCategories);
};

const createCategories = event => {
    event.preventDefault();
    $('.hero-banner').remove();
    $('#categories-block').remove();
    $('#products-block').remove();
    const categories = $('<div/>', {id: 'categories-block'}).prependTo($('.site-main'));
    categories.append($('<div/>').addClass('container'));
    fetch(categoriesUrl)
        .then(res => {
            return res.json();
        })
        .then(res => {
            createBlockOfCategories(res);
        })
        .catch(reject => {
            console.log("Ups");
            console.log(reject);
        });
};

const createBlockOfCategories = (response) => {
    response.forEach(categoryItem => {
        const {id, name, description, img} = categoryItem;
        const card = $('<div/>', {'data-id': id}).addClass('category-card').click(showProductsByCategory).appendTo($('#categories-block > .container'));
        card.append($('<img>',{'src': img}))
            .append($('<div/>', {text: name}))
            .append(($('<div/>', {text: description})));
    })
};