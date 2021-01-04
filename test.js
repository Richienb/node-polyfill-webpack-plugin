const test = require("ava")
const webpack = require("p-webpack")
const NodePolyfillPlugin = require(".")

test("main", async t => {
	await webpack({
		entry: "./fixture",
		output: {
			library: {
				type: "commonjs-module"
			}
		},
		plugins: [
			new NodePolyfillPlugin()
		]
	})

	t.is(require("./dist/main"), "Hello World")
})
