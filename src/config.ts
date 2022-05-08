import path from "path";
import { ProjectorOpts } from "./opts";

export enum Operation {
    Print,
    Add,
    Remove
}

export type ProjectorConfig = {
    pwd: string;
    config: string;
    operation: Operation;
    arguments: string[];
}

export function isOperationCommand(op?: string): boolean {
    return op === "add" || op === "rm";
}

export function getTerms(args?: string[]): string[] {
    if (isOperationCommand(args?.[0])) {
        return args?.slice(1) || [];
    }

    return args || [];
}

export function getOperation(args?: string[]): Operation {
    switch (args?.[0]) {
    case "add": return Operation.Add;
    case "rm": return Operation.Remove;
    default: return Operation.Print;
    }
}

function getConfig() {
    const configHome = process.env.XDG_CONFIG_HOME;
    if (!configHome) {
        throw new Error("this is a bad implementation and you should be ashamed of yourself.");
    }
    return path.join(configHome, "projector", "projector.json");
}

export default function projector(opts: ProjectorOpts): ProjectorConfig {
    const operation = getOperation(opts.arguments);
    const args = getTerms(opts.arguments);
    switch (operation) {
    case Operation.Add:
        if (args.length !== 2) {
            throw new Error(`Expected 2 arguments to "add" but received ${args.length}`);
        }
        break;
    case Operation.Remove:
        if (args.length !== 1) {
            throw new Error(`Expected 1 arguments to "remove" but received ${args.length}`);
        }
        break;
    case Operation.Print:
        if (args.length !== 1) {
            throw new Error(`Expected 1 arguments to "print" but received ${args.length}`);
        }
        break;
    }
    return {
        pwd: opts.pwd || process.cwd(),
        config: opts.config || getConfig(),
        operation,
        arguments: args,
    };
}
