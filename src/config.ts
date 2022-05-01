import path from "path";
import { ProjectorOpts } from "./opts";

export enum Operation {
    Print,
    Add,
    Remove
}

export type Projector = {
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

export default function projector(opts: ProjectorOpts): Projector {
    return {
        pwd: opts.pwd || process.cwd(),
        config: opts.config || getConfig(),
        operation: getOperation(opts.arguments),
        arguments: getTerms(opts.arguments),
    };
}
