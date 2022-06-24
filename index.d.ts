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
		/**
                By default, the modules that were polyfilled in Webpack 4 are mirrored over. However, if you don't want a module like console to be polyfilled you can specify alises to be skipped here.
                */
		includeAliases?: readonly Alias[]
	}

	interface Exclude {
		/**
                By default, the modules that were polyfilled in Webpack 4 are mirrored over. However, you can choose to only include certain aliases. For example, you can only have `console` polyfilled.
                */
		excludeAliases?: readonly Alias[]
	}
	export type Options = MergeExclusive<Include, Exclude>
}

declare class NodePolyfillPlugin {
	constructor(options?: NodePolyfillPlugin.Options)

	apply(compiler: InstanceType<typeof Compiler>): void
}

export = NodePolyfillPlugin
