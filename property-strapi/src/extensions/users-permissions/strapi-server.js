module.exports = (plugin) => {
  plugin.controllers.user.updateMe = async (ctx) => {
    strapi.log.debug("test")
    if (!ctx.state.user || !ctx.state.user.id) {
      return ctx.response.status = 401;
    }
    // Extract only the fields that need to be updated from the request body
    const updatedUserData = {
      firstName: ctx.request.body.firstName,
      lastName: ctx.request.body.lastName,
      introduction: ctx.request.body.introduction,
      mobile: ctx.request.body.mobile,
      city: ctx.request.body.city,
      country: ctx.request.body.country,
    };
    try {
      await strapi.query('plugin::users-permissions.user').update({
        where: { id: ctx.state.user.id },
        data: updatedUserData,
      });
      ctx.response.status = 200;
    } catch (error) {
      console.error('Error updating user data:', error);
      ctx.response.status = 500;
    }
  };

  plugin.routes['content-api'].routes.push(
    {
      method: "PUT",
      path: "/user/me",
      handler: "user.updateMe",
      config: { prefix: "", policies: [] }
    });
  return plugin;
}
