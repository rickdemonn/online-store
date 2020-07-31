// я создал глобальные переменные с сылкой на продукты
// для получения продуктов используй:
/*
fetch(productsUrl)
    .then(res => {
        return res.json();
    })
    .then(res => {
        // в res у тебя уже будет весь масив продуктов который ты ниже написал
        res.reduce((acc,elem)=>acc.add(elem.categoryId), new Set());
        // и т.д.
    });

*/
const filterForm = document.forms.filterForm;
 //   filterForm.hidden = true;
const productsUrl1 = [                              // в эту переменную необходимо внести products.json как массив объектов
                       {
                         "id": "1",
                         "categoryId": "1",
                         "brand": "Apple",
                         "model": "Iphone XR",
                         "price": 30000,
                         "img": "images/smart-phones/iphonexr.jpg"
                       },
                       {
                         "id": "2",
                         "categoryId": "1",
                         "brand": "Samsung",
                         "model": "Galaxy x10",
                         "price": 20000,
                         "img": "images/smart-phones/galaxy10.jpg"
                       },
                       {
                         "id": "3",
                         "categoryId": "2",
                         "brand": "Apple",
                         "model": "Mac Book Air",
                         "price": 35000,
                         "img": "images/laptops/macbookair.jpg"
                       },
                       {
                         "id": "4",
                         "categoryId": "2",
                         "brand": "Dell",
                         "model": "G3 15",
                         "price": 26000,
                         "img": "images/laptops/dellg315.jpg"
                       },
                       {
                         "id": "5",
                         "categoryId": "3",
                         "brand": "Ford",
                         "model": "Mustang",
                         "price": 300000,
                         "img": "images/auto/ford-mustang.jpg"
                       },
                       {
                         "id": "6",
                         "categoryId": "3",
                         "brand": "Yamaha",
                         "model": "R1",
                         "price": 200000,
                         "img": "images/auto/r1.jpg"
                       },
                       {
                         "id": "7",
                         "categoryId": "4",
                         "brand": "Lev Tolstoy",
                         "model": "War and Peace",
                         "price": 137,
                         "img": "images/books/war.jpg"
                       },
                       {
                         "id": "8",
                         "categoryId": "4",
                         "brand": "Jack London",
                         "model": "White fang",
                         "price": 150,
                         "img": "images/books/white-fang.jpg"
                       },
                       {
                         "id": "9",
                         "categoryId": "5",
                         "brand": "Lego",
                         "model": "City",
                         "price": 500,
                         "img": "images/toys/lego-city.jpg"
                       },
                       {
                         "id": "10",
                         "categoryId": "5",
                         "brand": "Nikelodeon",
                         "model": "Sponge Bob",
                         "price": 700,
                         "img": "images/toys/sponge-bob.jpg"
                       }
                     ]
//в этих переменных содержаться отсортированные массивы где есть один раз, все значения, одного ключа всех объектов
  let productsCategoryIdSelect = productsUrl1.reduce((acc,elem)=>acc.add(elem.categoryId), new Set());
  let productsBrandSelect = productsUrl1.reduce((acc,elem)=>acc.add(elem.brand), new Set());
  let productsModelSelect = productsUrl1.reduce((acc,elem)=>acc.add(elem.model), new Set());
  let productsPriceSelect = productsUrl1.reduce((acc,elem)=>acc.add(elem.price), new Set());

function filterFormCreate1() {  //функция вывода checkbox уникальных значени одного ключа (без повторений)
 //filterForm.innerHTML='';

        productsCategoryIdSelect.forEach(function(item) {
        const optionItemElement = document.createElement ('input');
        optionItemElement.setAttribute("type", "checkbox");
        optionItemElement.setAttribute("name", "price");
        optionItemElement.setAttribute("value", item);
        let p =document.createElement("span");
        p.innerHTML = item + ": ";
        let br =document.createElement("br");
        filterForm.appendChild(p);
        filterForm.appendChild(optionItemElement);
        filterForm.appendChild(br);
         });

        productsBrandSelect.forEach(function(item) {
        const optionItemElement = document.createElement ('input');
        optionItemElement.setAttribute("type", "checkbox");
        optionItemElement.setAttribute("name", "price");
        optionItemElement.setAttribute("value", item);
        let p =document.createElement("span");
        p.innerHTML = item + ": ";
        let br =document.createElement("br");
        filterForm.appendChild(p);
        filterForm.appendChild(optionItemElement);
        filterForm.appendChild(br);
         });

        productsModelSelect.forEach(function(item) {
        const optionItemElement = document.createElement ('input');
        optionItemElement.setAttribute("type", "checkbox");
        optionItemElement.setAttribute("name", "price");
        optionItemElement.setAttribute("value", item);
        let p =document.createElement("span");
        p.innerHTML = item + ": ";
        let br =document.createElement("br");
        filterForm.appendChild(p);
        filterForm.appendChild(optionItemElement);
        filterForm.appendChild(br);
         });

        productsPriceSelect.forEach(function(item) {
        const optionItemElement = document.createElement ('input');
        optionItemElement.setAttribute("type", "checkbox");
        optionItemElement.setAttribute("name", "price");
        optionItemElement.setAttribute("value", item);
        let p =document.createElement("span");
        p.innerHTML = item + ": ";
        let br =document.createElement("br");
        filterForm.appendChild(p);
        filterForm.appendChild(optionItemElement);
        filterForm.appendChild(br);
         });
 };

/*
 filterForm.addEventListener('click', function (event) {
  const target = event.target;
  const key = target.getAttribute('data-key');
  console.log(target.getAttribute('data-key'));
  showSelect(key);
 });
}
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