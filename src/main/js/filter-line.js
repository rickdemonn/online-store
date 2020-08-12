const filterStringPlace = document.forms.filterStringPlace;

const filterString = document.createElement("INPUT");
filterString.setAttribute("type", "text");
filterString.setAttribute("name", "filterString");
filterString.setAttribute("placeholder", "Search");
filterStringPlace.append(filterString);

filterString.addEventListener('keyup', function () {
    //if (!value) {return};
    if (event.keyCode === 13) {
        let str = this.value;
        const transformedStr = str.toLowerCase().indexOf(product.model.toLowerCase());

        fetch(productsUrl)
            .then(res => {
                return res.json();
            })
            .then(res => {
                let productsFilteredByString = [];
                res.find(product => {
                    if (transformedStr) {                   //https://learn.javascript.ru/regexp-methods
                        productsFilteredByString.push(product);
                    };
                });
                console.log(productsFilteredByString);
                createBlockOfProducts(productsFilteredByString);
                document.forms.filterStringPlace.value = '';
            })
    };
});
// res.find(product => {
//if(product.brand === this.value) {


//      <form name="filterStringPlace">
//       </form>
// <script src="js/filter-line.js"></script>

