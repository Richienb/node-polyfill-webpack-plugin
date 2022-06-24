const fs = require("fs")
const test = require("ava")
const webpack = require("p-webpack")
const NodePolyfillPlugin = require(".")

test.serial("main", async t => {
	await webpack({
		entry: "./fixture",
		output: {
			library: {
				type: "commonjs-module"
			}
		},
		plugins: [
			new NodePolyfillPlugin({
				excludeAliases: ["console"]
			})
		]
	})

	t.is(require("./dist/main.js"), "Hello World")

	// https://github.com/browserify/console-browserify/blob/f7eefc7c908c29d2e94954e5c6c1098e8c1028b4/index.js#L63
	t.false(fs.readFileSync("./dist/main.js").toString().includes("No such label: "))

	// https://github.com/feross/buffer/blob/master/index.js#L80
	t.true(fs.readFileSync("./dist/main.js").toString().includes("is invalid for option \"size\""))
})

test.serial("includeAliases", async t => {
	await webpack({
		entry: "./fixture",
		output: {
			library: {
				type: "commonjs-module"
			}
		},
		plugins: [
			new NodePolyfillPlugin({
				includeAliases: ["console"]
			})
		]
	})

	t.is(require("./dist/main.js"), "Hello World")

	// https://github.com/browserify/console-browserify/blob/f7eefc7c908c29d2e94954e5c6c1098e8c1028b4/index.js#L63
	t.true(fs.readFileSync("./dist/main.js").toString().includes("No such label: "))

	// https://github.com/feross/buffer/blob/master/index.js#L80
	t.false(fs.readFileSync("./dist/main.js").toString().includes("is invalid for option \"size\""))
})

test("includeAliases and excludeAliases used at the same time", t => {
	t.throws(() => new NodePolyfillPlugin({
		includeAliases: ["console"],
		excludeAliases: ["crypto"]
	}), { instanceOf: Error })
})
