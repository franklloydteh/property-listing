'use strict';

/**
 * A set of functions called "actions" for `myproperty`
 */

module.exports = {

  findMine: async (ctx, next) => {
    const user = ctx.state.user;

    // TODO: attach the filters from context
    const entries = await strapi.entityService.findMany('api::property.property', {
      filters: { owner: user.id }
    });

    ctx.body = {
      data: entries
    }
  }

};
