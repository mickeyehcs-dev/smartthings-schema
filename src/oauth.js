import { json, body, uuid } from "./utils.js";

export async function oauth(request, env) {

    const data = await body(request);

    const grantType = data.grant_type;

    switch (grantType) {

        case "client_credentials":
            return clientCredentials(env);

        case "refresh_token":
            return refreshToken(env, data.refresh_token);

        default:
            return json({
                error: "unsupported_grant_type"
            }, 400);

    }

}

async function clientCredentials(env) {

    const accessToken = uuid();
    const refreshToken = uuid();

    const expiresIn = 3600;

    await env.DB.prepare(`
        INSERT INTO oauth_tokens
        (
            access_token,
            refresh_token,
            expires_at
        )
        VALUES
        (?, ?, ?)
    `)
    .bind(
        accessToken,
        refreshToken,
        Math.floor(Date.now()/1000) + expiresIn
    )
    .run();

    return json({
        token_type: "Bearer",
        access_token: accessToken,
        refresh_token: refreshToken,
        expires_in: expiresIn
    });

}

async function refreshToken(env, token) {

    const row = await env.DB.prepare(`
        SELECT *
        FROM oauth_tokens
        WHERE refresh_token = ?
    `)
    .bind(token)
    .first();

    if (!row) {
        return json({
            error: "invalid_refresh_token"
        }, 401);
    }

    const accessToken = uuid();
    const expiresIn = 3600;

    await env.DB.prepare(`
        UPDATE oauth_tokens
        SET
            access_token = ?,
            expires_at = ?
        WHERE refresh_token = ?
    `)
    .bind(
        accessToken,
        Math.floor(Date.now()/1000)+expiresIn,
        token
    )
    .run();

    return json({
        token_type: "Bearer",
        access_token: accessToken,
        refresh_token: token,
        expires_in: expiresIn
    });

}
