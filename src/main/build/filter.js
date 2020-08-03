'use strict';

// я создал глобальные переменные с сылкой на продукты
// для получения продуктов используй:
var filterForm = document.forms.filterForm;
var productsForOutput = { category: [], brand: [], model: [], price: [] };

fetch(productsUrl).then(function (res) {
    return res.json();
}).then(function (res) {
    // в res у тебя уже будет весь масив продуктов который ты ниже написал
    var productsCategoryIdSelect = res.reduce(function (acc, elem) {
        return acc.add(elem.categoryId);
    }, new Set());
    var productsBrandSelect = res.reduce(function (acc, elem) {
        return acc.add(elem.brand);
    }, new Set());
    var productsModelSelect = res.reduce(function (acc, elem) {
        return acc.add(elem.model);
    }, new Set());
    var productsPriceSelect = res.reduce(function (acc, elem) {
        return acc.add(elem.price);
    }, new Set());

    filterFormCreate1(productsCategoryIdSelect, productsBrandSelect, productsModelSelect, productsPriceSelect);

    filterForm.addEventListener('click', function (event) {
        var target = event.target;
        var key = target.getAttribute('name');
        var value = target.getAttribute('value');

        if (target.checked = true) {
            productsForOutput.key.push(value);
            console.log(key);
            console.log(value);
            console.log(productsForOutput);
        } else if (target.checked != true) {
            alert("here we will delete not nesessary");
        }
    });
});

function filterFormCreate1(productsCategoryIdSelect, productsBrandSelect, productsModelSelect, productsPriceSelect) {
    //функция вывода checkbox уникальных значени одного ключа (без повторений)
    //filterForm.innerHTML='';

    productsCategoryIdSelect.forEach(function (item) {
        var optionItemElement = document.createElement('input');
        optionItemElement.setAttribute("type", "checkbox");
        optionItemElement.setAttribute("name", "category");
        optionItemElement.setAttribute("value", item);
        var p = document.createElement("span");
        p.innerHTML = item + ": ";
        var br = document.createElement("br");
        filterForm.appendChild(p);
        filterForm.appendChild(optionItemElement);
        filterForm.appendChild(br);
    });

    productsBrandSelect.forEach(function (item) {
        var optionItemElement = document.createElement('input');
        optionItemElement.setAttribute("type", "checkbox");
        optionItemElement.setAttribute("name", "brand");
        optionItemElement.setAttribute("value", item);
        var p = document.createElement("span");
        p.innerHTML = item + ": ";
        var br = document.createElement("br");
        filterForm.appendChild(p);
        filterForm.appendChild(optionItemElement);
        filterForm.appendChild(br);
    });

    productsModelSelect.forEach(function (item) {
        var optionItemElement = document.createElement('input');
        optionItemElement.setAttribute("type", "checkbox");
        optionItemElement.setAttribute("name", "model");
        optionItemElement.setAttribute("value", item);
        var p = document.createElement("span");
        p.innerHTML = item + ": ";
        var br = document.createElement("br");
        filterForm.appendChild(p);
        filterForm.appendChild(optionItemElement);
        filterForm.appendChild(br);
    });

    productsPriceSelect.forEach(function (item) {
        var optionItemElement = document.createElement('input');
        optionItemElement.setAttribute("type", "checkbox");
        optionItemElement.setAttribute("name", "price");
        optionItemElement.setAttribute("value", item);
        var p = document.createElement("span");
        p.innerHTML = item + ": ";
        var br = document.createElement("br");
        filterForm.appendChild(p);
        filterForm.appendChild(optionItemElement);
        filterForm.appendChild(br);
    });
};

//   filterForm.hidden = true;

//showSelect(key);

/*
function showSelect(key) {
};

// For checkboxes
const selectedLanguages = [];

for (let i = 0; i < form.elements.languages.length; i++) {
 if (form.elements.languages[i].checked) {
   selectedLanguages.push(form.elements.languages[i].value)
 }
}
console.log(selectedLanguages);
*/