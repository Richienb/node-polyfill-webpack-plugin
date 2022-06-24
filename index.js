"use strict"
const { ProvidePlugin } = require("webpack")
const filterObject = require("filter-obj")

const filterObjectKeys = (includeAliases, excludeAliases) => {
	const isInclude = includeAliases.length > 0
	const keys = isInclude ? includeAliases : excludeAliases
	return object => filterObject(object, key => keys.includes(key) === isInclude)
}

module.exports = class NodePolyfillPlugin {
	constructor(options = {}) {
		this.options = {
			excludeAliases: [],
			includeAliases: [],
			...options
		}

		if (this.options.includeAliases.length > 0 && this.options.excludeAliases.length > 0) {
			throw new Error("excludeAliases and includeAliases are mutually exclusive!")
		}
	}

	apply(compiler) {
		const filterFunc = filterObjectKeys(this.options.includeAliases, this.options.excludeAliases)

		compiler.options.plugins.push(new ProvidePlugin(filterFunc({
			Buffer: [require.resolve("buffer/"), "Buffer"],
			console: require.resolve("console-browserify"),
			process: require.resolve("process/browser")
		})))

		compiler.options.resolve.fallback = {
			...filterFunc({
				assert: require.resolve("assert/"),
				buffer: require.resolve("buffer/"),
				console: require.resolve("console-browserify"),
				constants: require.resolve("constants-browserify"),
				crypto: require.resolve("crypto-browserify"),
				domain: require.resolve("domain-browser"),
				events: require.resolve("events/"),
				http: require.resolve("stream-http"),
				https: require.resolve("https-browserify"),
				os: require.resolve("os-browserify/browser"),
				path: require.resolve("path-browserify"),
				punycode: require.resolve("punycode/"),
				process: require.resolve("process/browser"),
				querystring: require.resolve("querystring-es3"),
				stream: require.resolve("stream-browserify"),
				/* eslint-disable camelcase */
				_stream_duplex: require.resolve("readable-stream/lib/_stream_duplex"),
				_stream_passthrough: require.resolve("readable-stream/lib/_stream_passthrough"),
				_stream_readable: require.resolve("readable-stream/lib/_stream_readable"),
				_stream_transform: require.resolve("readable-stream/lib/_stream_transform"),
				_stream_writable: require.resolve("readable-stream/lib/_stream_writable"),
				string_decoder: require.resolve("string_decoder/"),
				/* eslint-enable camelcase */
				sys: require.resolve("util/"),
				timers: require.resolve("timers-browserify"),
				tty: require.resolve("tty-browserify"),
				url: require.resolve("url/"),
				util: require.resolve("util/"),
				vm: require.resolve("vm-browserify"),
				zlib: require.resolve("browserify-zlib")
			}),
			...compiler.options.resolve.fallback
		}
	}
}
