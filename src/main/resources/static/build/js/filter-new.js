const getBrandsFilterByCategory = categoryId => {
    fetch(productsUrl)
        .then(res => {
            return res.json();
        })
        .then(res => {
            let brandsByCategory = [];
            res.find(product => {
                if (product.categoryId === categoryId) {
                    if (!brandsByCategory.includes(product.brand)) {
                        brandsByCategory.push(product.brand);
                    }
                }
            })
            showFilters(brandsByCategory, categoryId);
        })
        .catch(reject => {
            console.log("Oops");
            console.log(reject);
        });
}

const showFilters = (brands, categoryId) => {
    const parent = document.forms.brandFilters.querySelector('ul');
    parent.innerHTML = '';

    brands.forEach(brand => {
        const listItem = document.createElement('li');
        listItem.classList.add("filter-list");

        const checkbox = document.createElement('input');
        checkbox.setAttribute('type', 'checkbox');
        checkbox.setAttribute('name', 'brand');
        checkbox.setAttribute('id', `brand-${brand}`);
        checkbox.setAttribute('data-brand', brand);
        checkbox.classList.add('pixel-radio', 'pixel-checkbox');

        const label = document.createElement('label');
        label.setAttribute('for', `brand-${brand}`);
        label.textContent = brand;

        listItem.appendChild(checkbox);
        listItem.appendChild(label);

        parent.appendChild(listItem);
    })

    const applyButton = document.forms.brandFilters.querySelector('#filters-apply-button');
    applyButton.addEventListener('click', () => {
        showProductsByFilters(categoryId);
    });
}

const showProductsByFilters = categoryId => {
    const filtersContainer = document.forms.brandFilters.querySelector('ul');
    const checkedFilters = [];

    for (let i = 0; i < filtersContainer.children.length; i++) {
        const checkbox = filtersContainer.children[i].querySelector('input');
        if (checkbox.checked) {
            const brand = checkbox.getAttribute('data-brand');
            checkedFilters.push(brand);
        }
    }

    if (checkedFilters.length) {
        showProductsByCategory(categoryId, checkedFilters);
    } else {
        showProductsByCategory(categoryId);
    }
}