import { Compiler } from "webpack"

declare class NodePolyfillPlugin {
	apply(compiler: InstanceType<typeof Compiler>): void
}

export = NodePolyfillPlugin
