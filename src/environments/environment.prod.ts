// src/environments/environment.prod.ts
export const environment = {
    production: true,
    login: 'http://localhost:8008/user/login',
    register: 'http://localhost:8008/user/register',
    forgot: 'http://localhost:8008/user/forgot',
    changePsd: 'http://localhost:8008/user/verify',

    //products
    products: 'http://localhost:8008/user/products',
    addCart:'http://localhost:8008/user/cart',
    getCart:'http://localhost:8008/user/getcart',
    deleteCartItem:'http://localhost:8008/user/cart',
    decrementItemCount:'http://localhost:8008/user/cart',
    deleteAllCartItems:'http://localhost:8008/user/cart',
    cancelOrder:'http://localhost:8008/user/order',
    placeOrder:'http://localhost:8008/user/createorder',

    //Order Details
    getOrder:'http://localhost:8008/user/getorder',
    getAddress:'http://localhost:8008/user/getaddress',


    contactAddress: 'http://localhost:8008/user/contact',
    DeliveryAddress: 'http://localhost:8008/user/address',
    contact:'http://localhost:8008/user/mail'
  };
  