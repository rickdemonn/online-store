const showPriceRange = (highestPrice, products) => {
    const form = document.forms.priceRange;
    form.innerHTML = '';

    const fromPrice = document.createElement('input');
    fromPrice.setAttribute('type', 'number');
    fromPrice.setAttribute('placeholder', `0 UAH`);
    fromPrice.setAttribute('min', `0`);
    fromPrice.setAttribute('value', ``);
    fromPrice.className = 'filter-price';

    const fromPriceLabel = document.createElement('label');
    fromPriceLabel.textContent = 'From: ';
    fromPriceLabel.appendChild(fromPrice);

    const toPrice = document.createElement('input');
    fromPrice.setAttribute('type', 'number');
    toPrice.setAttribute('placeholder', `${highestPrice} UAH`);
    toPrice.setAttribute('max', highestPrice);
    toPrice.setAttribute('value', ``);
    toPrice.className = 'filter-price';

    const toPriceLabel = document.createElement('label');
    toPriceLabel.textContent = 'To: ';
    toPriceLabel.appendChild(toPrice);

    if (document.querySelector('#price-apply-button')) {
        document.querySelector('#price-apply-button').remove();
    }

    const actionButton = document.createElement('button');
    actionButton.setAttribute('type', 'button');
    actionButton.classList.add('button', 'filter-button');
    actionButton.textContent = 'Apply price range';
    actionButton.setAttribute('id', 'price-apply-button');

    actionButton.addEventListener('click', () => {
        const userLowestPrice = parseInt(fromPrice.value) || 0;
        const userHighestPrice = parseInt(toPrice.value) || highestPrice;

        getProductsByPriceRange(userLowestPrice, userHighestPrice, products);
    });

    form.appendChild(fromPriceLabel);
    form.appendChild(toPriceLabel);
    form.parentElement.appendChild(actionButton);
}

const getProductsByPriceRange = function (userLowestPrice = 0, userHighestPrice, products) {
    const productsByPriceRange = [];
    products.forEach(product => {
        if (product.price <= userHighestPrice && product.price >= userLowestPrice) {
            productsByPriceRange.push(product);
        }
    })

    createBlockOfProducts(productsByPriceRange);
}