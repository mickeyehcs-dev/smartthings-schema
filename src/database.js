export async function getDevices(env) {
  const { results } = await env.DB.prepare(`
    SELECT
      id,
      name,
      type,
      state
    FROM devices
    ORDER BY name
  `).all();

  return results;
}

export async function getDevice(env, id) {
  return await env.DB.prepare(`
    SELECT
      id,
      name,
      type,
      state
    FROM devices
    WHERE id = ?
  `)
    .bind(id)
    .first();
}

export async function updateState(env, id, state) {
  await env.DB.prepare(`
    UPDATE devices
    SET state = ?
    WHERE id = ?
  `)
    .bind(state, id)
    .run();
}

export async function createDevice(env, id, name, type, state = "off") {
  await env.DB.prepare(`
    INSERT INTO devices
    (
      id,
      name,
      type,
      state
    )
    VALUES (?, ?, ?, ?)
  `)
    .bind(id, name, type, state)
    .run();
}

export async function deleteDevice(env, id) {
  await env.DB.prepare(`
    DELETE FROM devices
    WHERE id = ?
  `)
    .bind(id)
    .run();
}
