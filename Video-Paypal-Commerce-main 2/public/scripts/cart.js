const cartItems = {};

function addToCart(item) {
  console.log("adding to cart...");
  console.log(cartItems);

  if (cartItems[item.id]) {
    cartItems[item.id].count++;
  } else {
    cartItems[item.id] = {
      count: 1,
      data: item,
    };
  }
}

function removeFromCart(itemId) {
  if (cartItems[itemId]) {
    if (cartItems[itemId] > 0) {
      cartItems[itemId].count--;
    } else {
      delete cartItems[itemId];
    }
  }
}

function displayCart() {
  console.log(cartItems);
}



/**
 * Sends a post request to the server 
 * if the post request (which saves the cart) responds with "true"
 * then we redirect the client to the checkout page
 */
// note: need to change the customer id later for the logged in customer's id
async function postCartToServer() {
  var success = await fetch("/checkout", {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify({ customerId: 1, cart: cartItems }),
  });1

  if (success) 
    window.location.replace('/checkout/1')
}
