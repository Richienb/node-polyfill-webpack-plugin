import {type MergeExclusive} from 'type-fest';
import {type Compiler} from 'webpack';

declare namespace NodePolyfillPlugin {
	export type Alias =
		| 'assert'
		| 'buffer'
		| 'Buffer'
		| 'console'
		| 'constants'
		| 'crypto'
		| 'domain'
		| 'events'
		| 'fs'
		| 'http'
		| 'https'
		| 'os'
		| 'path'
		| 'process'
		| 'punycode'
		| 'querystring'
		| 'stream'
		| '_stream_duplex'
		| '_stream_passthrough'
		| '_stream_readable'
		| '_stream_transform'
		| '_stream_writable'
		| 'string_decoder'
		| 'sys'
		| 'timers'
		| 'tty'
		| 'url'
		| 'util'
		| 'vm'
		| 'zlib';

	export type OnlyAliasesOptions = {
		/**
		You can choose to only include certain aliases, ignoring the defaults. For example, you can have only `console` polyfilled.
		*/
		onlyAliases?: readonly Alias[];
	};

	export type AdditionalExcludeAliasesOptions = {
		/**
		You can choose to add certain aliases to the list of polyfilled modules. For example, you can choose to polyfill `console`.
		*/
		additionalAliases?: readonly Alias[];

		/**
		If you don't want a module to be polyfilled, you can specify aliases to be skipped here.
		*/
		excludeAliases?: readonly Alias[];
	};

	export type Options = MergeExclusive<OnlyAliasesOptions, AdditionalExcludeAliasesOptions>;
}

declare class NodePolyfillPlugin {
	constructor(options?: NodePolyfillPlugin.Options);

	apply(compiler: InstanceType<typeof Compiler>): void;
}

export = NodePolyfillPlugin;
