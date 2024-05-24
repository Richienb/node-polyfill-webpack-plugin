const {promises: fs} = require('node:fs');
const test = require('ava');
const webpack = require('p-webpack');
const NodePolyfillPlugin = require('./index.js');

test('main', async t => {
	await webpack({
		entry: './fixture',
		output: {
			library: {
				type: 'commonjs-module',
			},
			filename: '1.js',
		},
		plugins: [
			new NodePolyfillPlugin({
				additionalAliases: ['assert', 'buffer'],
				// ExcludeAliases: ['console'],
			}),
		],
	});

	t.is(require('./dist/1.js'), 'Hello World');

	const output = await fs.readFile('./dist/1.js', {encoding: 'utf8'});

	// https://github.com/browserify/console-browserify/blob/f7eefc7c908c29d2e94954e5c6c1098e8c1028b4/index.js#L63
	t.false(output.includes('No such label: '));

	// https://github.com/feross/buffer/blob/5857e295f4d37e3ad02c3abcbf7e8e5ef51f3be6/index.js#L101
	t.true(output.includes('is invalid for option "size"'));
});

test('includeAliases', async t => {
	await webpack({
		entry: './fixture',
		output: {
			library: {
				type: 'commonjs-module',
			},
			filename: '2.js',
		},
		plugins: [
			new NodePolyfillPlugin({
				additionalAliases: ['console', 'assert'],
				excludeAliases: ['buffer', 'Buffer'],
			}),
		],
	});

	t.is(require('./dist/2.js'), 'Hello World');

	const output = await fs.readFile('./dist/2.js', {encoding: 'utf8'});

	// https://github.com/browserify/console-browserify/blob/f7eefc7c908c29d2e94954e5c6c1098e8c1028b4/index.js#L63
	t.true(output.includes('No such label: '));

	// https://github.com/feross/buffer/blob/master/index.js#L80
	t.false(output.includes('is invalid for option "size"'));
});

test('onlyAliases and excludeAliases used at the same time', t => {
	t.throws(() => new NodePolyfillPlugin({
		onlyAliases: ['console'],
		excludeAliases: ['crypto'],
	}), {instanceOf: Error});
});
