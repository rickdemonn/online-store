const filterForm = document.forms.filterForm;
let productsForOutput = {brand:[]}; //создание объекта

fetch(productsUrl)
    .then(res => {
        return res.json();
    })
    .then(res => {
    let productsBrandSelect = res.reduce((acc,elem)=>acc.add(elem.brand), new Set());

    filterFormCreate1 (productsBrandSelect);

    filterForm.addEventListener('click', function (event) {
    const target = event.target;
    const key = target.getAttribute('name');
    const value = target.getAttribute('value');

    if(target.checked===true)
      {
       console.log(key); // выводит
       console.log(value); // выводит
       productsForOutput[key].push(value); //Uncaught TypeError: Cannot read property 'push' of undefined
       console.log(productsForOutput);  // выводит
       } else if (target.checked!==true) {
       alert("here we will delete not nesessary");
    }
           });
         });

function filterFormCreate1(productsBrandSelect) {  //функция вывода checkbox уникальных значени одного ключа (без повторений)
        //filterForm.innerHTML='';

               productsBrandSelect.forEach(function(item) {
               const optionItemElement = document.createElement ('input');
               optionItemElement.setAttribute("type", "checkbox");
               optionItemElement.setAttribute("name", "brand");
               optionItemElement.setAttribute("value", item);
               let p =document.createElement("span");
               p.innerHTML = item + ": ";
               let br =document.createElement("br");
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