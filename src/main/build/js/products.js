const productsStartListener = () => {
    $('#products-btn').click(createProducts);
};

const createProducts = event => {
    event.preventDefault();
    $('section').removeClass('active');
    $('.all-products-page').addClass('active').html('');
    const productsBlock = $('<div/>', {id: 'products-block'}).appendTo($('.all-products-page'));
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
            .append($('<button/>', {type: 'button', text: 'Add to cart', 'data-id': id}).click(addProductToCart));
    })
};

const showProductsByCategory = event => {
    const categoryId = event.currentTarget.dataset.id;
    $('#categories-block').remove();
    const productsBlock = $('<div/>', {id: 'products-block'}).prependTo($('.all-products-page'));
    productsBlock.append($('<div/>').addClass('container'));
    fetch(productsUrl)
        .then(res => {
            return res.json();
        })
        .then(res => {
            let productsByCategory = [];
            res.find(product => {
               if(product.categoryId === categoryId) {
                   productsByCategory.push(product);
               }
            });
            createBlockOfProducts(productsByCategory);
        })
        .catch(reject => {
            console.log("Ups");
            console.log(reject);
        });
};