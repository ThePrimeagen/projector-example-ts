import fs from "fs";
import opts from "./opts";
import config, { Operation } from "./config";

import Projector from "./projector";

async function run() {
    const cfg = config(opts());
    const projector = await Projector.fromConfig(cfg);

    switch (cfg.operation) {
    case Operation.Add:
        projector.setValue(cfg.arguments[0], cfg.arguments[1]);
        fs.writeFileSync(cfg.config, projector.toString());
        break;
    case Operation.Remove:
        projector.removeValue(cfg.arguments[0]);
        fs.writeFileSync(cfg.config, projector.toString());
        break;
    case Operation.Print:
        const value = projector.getValue(cfg.arguments[0]);
        if (value) {
            console.log(value);
        } else {
            console.error(`Key ${cfg.arguments[0]} does not exist`);
        }
        break;
    }
}

run();
