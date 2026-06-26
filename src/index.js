import { router } from "./router.js";

export default {
  async fetch(request, env, ctx) {
    try {
      return await router(request, env);
    } catch (err) {
      console.error(err);

      return Response.json(
        {
          success: false,
          error: err.message
        },
        {
          status: 500
        }
      );
    }
  }
};
