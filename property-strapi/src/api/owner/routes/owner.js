module.exports = {
  routes: [
    {
      method: 'GET',
      path: '/properties/mine',
      handler: 'owner.findMyProperties',
      config: {
        policies: [],
        middlewares: [],
      },
    },
    {
     method: 'GET',
     path: '/properties/:propertyId/owner',
     handler: 'owner.findByProperty',
     config: {
       policies: [],
       middlewares: [],
     },
    },
    {
      method: 'POST',
      path: '/properties/:propertyId/owner/message',
      handler: 'owner.messageForProperty',
      config: {
        policies: [],
        middlewares: [],
      },
    },
  ],
};
