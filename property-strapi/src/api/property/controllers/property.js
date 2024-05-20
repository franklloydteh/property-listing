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

  async update(ctx) {
    const user = ctx.state.user;
    const propertyId = ctx.params.id;

    const property = await strapi.entityService.findOne('api::property.property', propertyId, {
      populate: { owner: true },
    });

    if (property.owner.id === user.id) {
      return super.update(ctx);
    } else {
      return ctx.response.status = 401;
    }
  },

  async delete(ctx) {
    const user = ctx.state.user;
    const propertyId = ctx.params.id;

    const property = await strapi.entityService.findOne('api::property.property', propertyId, {
      populate: { owner: true },
    });

    strapi.log.debug('user ' +user.id )
    strapi.log.debug('owner '+ property.owner.id)

    if (property.owner.id === user.id) {
      return super.delete(ctx);
    } else {
      return ctx.response.status = 401;
    }
  },

});
