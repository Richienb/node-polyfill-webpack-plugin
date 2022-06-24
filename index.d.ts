import { MergeExclusive } from "type-fest"
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

	interface Include {
		includeAliases?: readonly Alias[]
	}

	interface Exclude {
		excludeAliases?: readonly Alias[]
	}

	export type Options = MergeExclusive<Include, Exclude>
}

declare class NodePolyfillPlugin {
	constructor(options?: NodePolyfillPlugin.Options)

	apply(compiler: InstanceType<typeof Compiler>): void
}

export = NodePolyfillPlugin
