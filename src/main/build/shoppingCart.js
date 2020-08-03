"use strict";

var shoppingCart = [];

function buttonAddToCart(id, card) {
  var buttonAddToCart = document.createElement('input');
  buttonAddToCart.setAttribute("type", "button");
  buttonAddToCart.setAttribute("id", id);
  buttonAddToCart.setAttribute("value", "Add to Cart");
  card.append(buttonAddToCart);
  buttonAddToCart.addEventListener('click', function () {
    var newItemToCart = { id: id, quantity: 1 };
    shoppingCart.push(newItemToCart);
    //      renewSecondLine();
    console.log(shoppingCart);
  });
};