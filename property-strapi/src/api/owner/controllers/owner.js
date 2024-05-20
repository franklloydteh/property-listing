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
  },

  messageForProperty: async (ctx, next) => {
    try {
      const propertyId = ctx.params.propertyId;

      if (!ctx.state.user || !ctx.state.user.id) {
        return ctx.response.status = 401;
      }

      const property = await strapi.entityService.findOne('api::property.property', propertyId, {
        populate: { owner: true },
      });

      await strapi.plugins['email'].services.email.send({
        to: property.owner.email,
        from: "info@franklloydteh.com",
        subject: "Message from Realista",
        html: `
        <p>From : ${ctx.state.user.firstName} ${ctx.state.user.lastName}</p>
        <p>Property : ${property.category} in ${property.street} ${property.city}</p>
        <p>Message : ${ctx.request.body.message}</p>
        `
      });

      ctx.body = {
        message: "Message Sent"
      }

    } catch (err) {
      ctx.body = err;
    }
  }
};
