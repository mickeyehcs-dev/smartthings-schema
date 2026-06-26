import { oauth } from "./oauth.js";
import { discovery } from "./discovery.js";
import { command } from "./command.js";
import { stateRefresh } from "./stateRefresh.js";
import { callback } from "./callback.js";

export async function router(request, env) {

  const url = new URL(request.url);

  switch (url.pathname) {

    case "/oauth/token":
      return oauth(request, env);

    case "/discovery":
      return discovery(request, env);

    case "/stateRefresh":
      return stateRefresh(request, env);

    case "/command":
      return command(request, env);

    case "/callback":
      return callback(request, env);

    default:
      return Response.json(
        {
          success: false,
          message: "Endpoint not found."
        },
        {
          status: 404
        }
      );

  }

}
