const categoriesStartListener = () => {
    $('#category-btn').click(createCategories);
    $('.button-hero').click(createCategories);
};

// const createCategories = event => {
//     event.preventDefault();
//     $('.hero-banner').remove();
//     $('#categories-block').remove();
//     $('#products-block').remove();
//     const categories = $('<div/>', {id: 'categories-block'}).prependTo($('.site-main'));
//     categories.append($('<div/>').addClass('container'));
//     fetch(categoriesUrl)
//         .then(res => {
//             return res.json();
//         })
//         .then(res => {
//             createBlockOfCategories(res);
//         })
//         .catch(reject => {
//             console.log("Ups");
//             console.log(reject);
//         });
// };

const createCategories = event => {
    event.preventDefault();

    $('.hero-banner').removeClass('active');
    $('.category-page').addClass('active');

    const categories = document.querySelector('.category-list');
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
        const parent = document.querySelector('.category-list .row');
        
        const {id, name, description, img} = categoryItem;
        const card = document.createElement('div');
        card.classList.add("card", "card-product", "col-md-6", "col-lg-4");

        const image = document.createElement('img');
        image.setAttribute('src', img);

        const textContainer = document.createElement('div');
        textContainer.classList.add('card-body', 'text-center');

        const productName = document.createElement('h4');
        productName.textContent = name;

        const productDescription = document.createElement('p');
        productDescription.className = 'card-product__price';
        productDescription.textContent = description;

        card.appendChild(image);
        textContainer.appendChild(productName);
        textContainer.appendChild(productDescription);
        card.appendChild(textContainer);

        card.addEventListener('click', showProductsByCategory)

        parent.appendChild(card);
        
        // $('<div/>', {'data-id': id}).addClass('card').addClass('card-product').click(showProductsByCategory).appendTo($('.category-list'));
        // card.append($('<img>',{'src': img}).addClass('card-img'))
        //     .append($('<div/>', {text: name}))
        //     .append(($('<div/>', {text: description})));
    })
};