'use strict';

/**
 * A set of functions called "actions" for `owner`
 */

module.exports = {
  findByProperty: async (ctx, next) => {
    try {
      const propertyId = ctx.params.propertyId;

      const property = await strapi.entityService.findOne('api::property.property', propertyId, {
        populate: { owner: true },
      });

      ctx.body = {
        data: {
          firstName: property.owner.firstName,
          lastName: property.owner.lastName
        }
      }

    } catch (err) {
      ctx.body = err;
    }
  }
};
