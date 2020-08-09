window.addEventListener("load", () => {
    window.location.hash = '';
})

categoriesStartListener();
// productsStartListener();
initLocalStorage();
cartListener();

window.addEventListener('hashchange', initRouting);

