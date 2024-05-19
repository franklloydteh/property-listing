'use strict';

/**
 * property controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::property.property', {

  async create(ctx) {
    const user = ctx.state.user;
    const myProperty = await super.create(ctx);
    return await strapi.entityService.update("api::property.property", myProperty.data.id, {
      data: {
        owner: user.id
      }
    });
  },


});
