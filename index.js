'use strict';
const stdLibBrowser = require('node-stdlib-browser');

// https://github.com/sindresorhus/filter-obj/blob/58086b537bb622166387216bfb7da6e8184996ba/index.js#L1-L25
function includeKeys(object, predicate) {
	const result = {};

	if (Array.isArray(predicate)) {
		for (const key of predicate) {
			result[key] = object[key];
		}
	} else {
		for (const key of Object.keys(object)) {
			const value = object[key];

			if (predicate(key, value, object)) {
				result[key] = value;
			}
		}
	}

	return result;
}

const defaultPolyfills = new Set([
	'assert',
	'buffer',
	'Buffer',
	'constants',
	'crypto',
	'events',
	'fs',
	'http',
	'https',
	'os',
	'path',
	'querystring',
	'stream',
	'string_decoder',
	'sys',
	'timers',
	'timers/promises',
	'tty',
	'url',
	'util',
	'vm',
	'zlib',
]);

function createAliasFilter({excludeAliases, onlyAliases, additionalAliases}) {
	if (onlyAliases.length > 0) {
		return object => includeKeys(object, onlyAliases);
	}

	if (additionalAliases.length > 0) {
		return object => includeKeys(object, key => (defaultPolyfills.has(key) && !excludeAliases.includes(key)) || additionalAliases.includes(key));
	}

	return object => includeKeys(object, key => defaultPolyfills.has(key) && !excludeAliases.includes(key));
}

function areItemsUnique(...iterables) {
	const seen = new Set();

	for (const iterable of iterables) {
		for (const item of iterable) {
			if (seen.has(item)) {
				return false;
			}

			seen.add(item);
		}
	}

	return true;
}

module.exports = class NodePolyfillPlugin {
	constructor(options = {}) {
		this.options = {
			excludeAliases: [],
			onlyAliases: [],
			additionalAliases: [],
			...options,
		};

		if (this.options.onlyAliases.length > 0) {
			if (this.options.excludeAliases.length > 0 || this.options.additionalAliases.length > 0) {
				throw new Error('onlyAliases is mutually exclusive with excludeAliases and additionalAliases');
			}
		} else if (!areItemsUnique(this.options.excludeAliases, this.options.additionalAliases)) {
			throw new Error('excludeAliases and additionalAliases must not include the same items');
		}
	}

	apply(compiler) {
		const filter = createAliasFilter(this.options);

		compiler.options.plugins.push(new compiler.webpack.ProvidePlugin(filter({
			Buffer: [stdLibBrowser.buffer, 'Buffer'],
			console: stdLibBrowser.console,
			process: stdLibBrowser.process,
		})));

		compiler.options.resolve.fallback = {
			...filter({
				assert: stdLibBrowser.assert,
				buffer: stdLibBrowser.buffer,
				console: stdLibBrowser.console,
				constants: stdLibBrowser.constants,
				crypto: stdLibBrowser.crypto,
				domain: stdLibBrowser.domain,
				events: stdLibBrowser.events,
				fs: false,
				http: stdLibBrowser.http,
				https: stdLibBrowser.https,
				os: stdLibBrowser.os,
				path: stdLibBrowser.path,
				punycode: stdLibBrowser.punycode,
				process: stdLibBrowser.process,
				querystring: stdLibBrowser.querystring,
				stream: stdLibBrowser.stream,
				/* eslint-disable camelcase */
				_stream_duplex: stdLibBrowser._stream_duplex,
				_stream_passthrough: stdLibBrowser._stream_passthrough,
				_stream_readable: stdLibBrowser._stream_readable,
				_stream_transform: stdLibBrowser._stream_transform,
				_stream_writable: stdLibBrowser._stream_writable,
				string_decoder: stdLibBrowser.string_decoder,
				/* eslint-enable camelcase */
				sys: stdLibBrowser.sys,
				timers: stdLibBrowser.timers,
				'timers/promises': stdLibBrowser['timers/promises'],
				tty: stdLibBrowser.tty,
				url: stdLibBrowser.url,
				util: stdLibBrowser.util,
				vm: stdLibBrowser.vm,
				zlib: stdLibBrowser.zlib,
			}),
			...compiler.options.resolve.fallback,
		};
	}
};
