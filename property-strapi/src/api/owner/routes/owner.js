module.exports = {
  routes: [
    {
     method: 'GET',
     path: '/properties/:propertyId/owner',
     handler: 'owner.findByProperty',
     config: {
       policies: [],
       middlewares: [],
     },
    },
  ],
};
