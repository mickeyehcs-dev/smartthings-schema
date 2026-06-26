import { getDevices } from "./database.js";
import { json } from "./utils.js";

export async function discovery(request, env) {

    const devices = await getDevices(env);

    const results = [];

    for (const device of devices) {

        results.push({

            externalDeviceId: device.id,

            friendlyName: device.name,

            manufacturerInfo: {
                manufacturerName: "Mickey",
                modelName: "Virtual Switch",
                hwVersion: "1.0",
                swVersion: "1.0"
            },

            deviceHandlerType: device.type,

            state: device.state

        });

    }

    return json({
        success: true,
        devices: results
    });

}
