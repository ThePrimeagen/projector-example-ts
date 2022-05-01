import cli from "command-line-args";

export type ProjectorOpts = {
    pwd?: string; // projector --pwd ...
    config?: string; // projector --config ...
    arguments?: string[];
}

export default function getArgs(): ProjectorOpts {
    return cli([
        { name: 'config', type: String },
        { name: 'pwd', type: String },
        { name: 'arguments', type: String, defaultOption: true, multiple: true },
    ]) as ProjectorOpts;
}

