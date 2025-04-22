module.exports = {
    routes: [
      {
        method: 'POST',
        path: '/orders',
        handler: 'order.checkout',
      },
    ],
  };
  