// utils/cart.js
export const getCart = () => {
    const cart = localStorage.getItem("cart");
    return cart ? JSON.parse(cart) : [];
  };
  
  export const saveCart = (cart) => {
    localStorage.setItem("cart", JSON.stringify(cart));
  };
  
  export const addToCart = (product) => {
    const cart = getCart();
    const existingProductIndex = cart.findIndex((item) => item.productName === product.productName);
    if (existingProductIndex !== -1) {
      // If product already exists, increase the quantity
      cart[existingProductIndex].quantity += product.quantity;
    } else {
      // If product doesn't exist, add it to the cart
      cart.push(product);
    }
    saveCart(cart);
  };