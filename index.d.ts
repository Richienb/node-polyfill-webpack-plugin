import { Compiler } from "webpack"

declare interface NodePolyfillPluginOptions {
	/**
	 * Specify aliases to skip adding.
	 */
	exclude?: string[]
}

declare class NodePolyfillPlugin {
	constructor(options: NodePolyfillPluginOptions)

	apply(compiler: InstanceType<typeof Compiler>): void
}

export = NodePolyfillPlugin
