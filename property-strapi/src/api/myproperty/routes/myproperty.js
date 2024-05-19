module.exports = {
  routes: [
    {
     method: 'GET',
     path: '/properties/mine',
     handler: 'myproperty.findMine',
     config: {
       policies: [],
       middlewares: [],
     },
    },
  ],
};
