window.addEventListener("load", () => {
	window.location.hash = '';
})

categoriesStartListener();
// productsStartListener();
initLocalStorage();
cartListener();
createSearchField();
window.addEventListener('hashchange', initRouting);

