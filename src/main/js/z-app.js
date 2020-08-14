window.addEventListener("load", () => {
	window.location.hash = '';
})

categoriesStartListener();
// productsStartListener();
initLocalStorage();
cartListener();
findYourProductListener();
window.addEventListener('hashchange', initRouting);

