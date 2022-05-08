import fs from "fs";
import path from "path";
import { ProjectorConfig } from "./config";

const fsp = fs.promises;

export type ProjectorData = {
    // other data globals.
    //
    projector: {
        // path     -> { key : value }
        [key: string]: {[key: string]: string}
    }
}

export default class Projector {
    constructor(private pwd: string, private data: ProjectorData) { }

    getValue(key: string): string | undefined {
        // /foo/bar/baz
        // ../baz
        // ../bar
        // /foo
        // /
        // done
        //
        let currentPath = this.pwd;
        let result = undefined;
        console.log(this.data);
        while (true) {
            console.log(currentPath, this.data.projector[currentPath]);
            const value = this.data.projector[currentPath]?.[key];
            if (value) {
                result = value;
                break;
            }

            const nextPath = path.dirname(currentPath);
            if (nextPath === currentPath) {
                break;
            }
            currentPath = nextPath;
        }

        return result;
    }

    setValue(key: string, value: string): void {
        let values = this.data.projector[this.pwd];
        if (!values) {
            values = this.data.projector[this.pwd] = {};
        }

        values[key] = value;
    }

    removeValue(key: string): void {
        const values = this.data.projector[this.pwd];
        if (values) {
            delete values[key];
        }
    }

    toString(): string {
        return JSON.stringify(this.data);
    }

    static async fromConfig(config: ProjectorConfig): Promise<Projector> {
        const dirname = path.dirname(config.config);
        if (!fs.existsSync(dirname)) {
            await fsp.mkdir(dirname, { recursive: true });
        }
        if (!fs.existsSync(config.config)) {
            await fsp.writeFile(config.config, "{\"projector\": {}}");
        }

        const contents = await fsp.readFile(config.config)
        try {
            const data = JSON.parse(contents.toString());
            return new Projector(config.pwd, data);
        } catch (e) { }
        return Projector.empty(config.pwd);
    }

    static empty(pwd: string): Projector {
        return new Projector(pwd, {projector: {}});
    }
}

