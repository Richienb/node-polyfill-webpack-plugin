import { Compiler } from "webpack"

declare namespace NodePolyfillPlugin {
	export type Alias =
        | "Buffer"
        | "console"
        | "process"
        | "assert"
        | "buffer"
        | "console"
        | "constants"
        | "crypto"
        | "domain"
        | "events"
        | "http"
        | "https"
        | "os"
        | "path"
        | "punycode"
        | "process"
        | "querystring"
        | "stream"
        | "_stream_duplex"
        | "_stream_passthrough"
        | "_stream_readable"
        | "_stream_transform"
        | "_stream_writable"
        | "string_decoder"
        | "sys"
        | "timers"
        | "tty"
        | "url"
        | "util"
        | "vm"
        | "zlib"

	export interface Options {
		/**
		Aliases to skip adding. Useful if you don't want a module like `console` to be polyfilled.
		*/
		excludeAliases?: readonly Alias[]
	}
}

declare class NodePolyfillPlugin {
	constructor(options?: NodePolyfillPlugin.Options)

	apply(compiler: InstanceType<typeof Compiler>): void
}

export = NodePolyfillPlugin
