'use strict';
function createAliasFilter({includeAliases, excludeAliases}) {
	if (includeAliases.length > 0) {
		return object => {
			const filtered = {};
			for (const key of Object.keys(object)) {
				if (includeAliases.includes(key)) {
					filtered[key] = object[key];
				}
			}

			return filtered;
		};
	}

	return object => {
		const filtered = {};
		for (const key of Object.keys(object)) {
			if (!excludeAliases.includes(key)) {
				filtered[key] = object[key];
			}
		}

		return filtered;
	};
}

module.exports = class NodePolyfillPlugin {
	constructor(options = {}) {
		this.options = {
			excludeAliases: [],
			includeAliases: [],
			...options
		};

		if (this.options.includeAliases.length > 0 && this.options.excludeAliases.length > 0) {
			throw new Error('excludeAliases and includeAliases are mutually exclusive');
		}
	}

	apply(compiler) {
		const filter = createAliasFilter(this.options);

		compiler.options.plugins.push(new compiler.webpack.ProvidePlugin(filter({
			Buffer: [require.resolve('buffer/'), 'Buffer'],
			console: require.resolve('console-browserify'),
			process: require.resolve('process/browser')
		})));

		compiler.options.resolve.fallback = {
			...filter({
				assert: require.resolve('assert/'),
				buffer: require.resolve('buffer/'),
				console: require.resolve('console-browserify'),
				constants: require.resolve('constants-browserify'),
				crypto: require.resolve('crypto-browserify'),
				domain: require.resolve('domain-browser'),
				events: require.resolve('events/'),
				http: require.resolve('stream-http'),
				https: require.resolve('https-browserify'),
				os: require.resolve('os-browserify/browser'),
				path: require.resolve('path-browserify'),
				punycode: require.resolve('punycode/'),
				process: require.resolve('process/browser'),
				querystring: require.resolve('querystring-es3'),
				stream: require.resolve('stream-browserify'),
				/* eslint-disable camelcase */
				_stream_duplex: require.resolve('readable-stream/lib/_stream_duplex'),
				_stream_passthrough: require.resolve('readable-stream/lib/_stream_passthrough'),
				_stream_readable: require.resolve('readable-stream/lib/_stream_readable'),
				_stream_transform: require.resolve('readable-stream/lib/_stream_transform'),
				_stream_writable: require.resolve('readable-stream/lib/_stream_writable'),
				string_decoder: require.resolve('string_decoder/'),
				/* eslint-enable camelcase */
				sys: require.resolve('util/'),
				timers: require.resolve('timers-browserify'),
				tty: require.resolve('tty-browserify'),
				url: require.resolve('url/'),
				util: require.resolve('util/'),
				vm: require.resolve('vm-browserify'),
				zlib: require.resolve('browserify-zlib')
			}),
			...compiler.options.resolve.fallback
		};
	}
};
