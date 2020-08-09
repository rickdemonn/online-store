const filterStringPlace = document.forms.filterStringPlace;

const filterString = document.createElement("INPUT");
  filterString.setAttribute("type", "text");
  filterString.setAttribute("name", "filterString");
  filterString.setAttribute("placeholder", "Search");
  filterStringPlace.append(filterString);

filterString.addEventListener('keyup', function (event) {
 const target = event.target;
 const name = target.getAttribute('name');
      if (event.keyCode === 13) {
       // можете делать все что угодно со значением текстового поля
       console.log (this.value);
       let str = this.value;
       console.log (str);

       fetch(productsUrl)
           .then(res => {
               return res.json();
           })
           .then(res => {
           let productsFilteredByString = [];
           res.find(product => {
           if(product.model.match(/str/) !== null) { //https://learn.javascript.ru/regexp-methods
           productsFilteredByString.push(product);
           }
           });
           console.log (productsFilteredByString);
           //createBlockOfProducts(productsFilteredByString);
           })
       };
   });
          // res.find(product => {
           //if(product.brand === this.value) {



          //      <form name="filterStringPlace">
         //       </form>
         // <script src="js/filter-line.js"></script>

