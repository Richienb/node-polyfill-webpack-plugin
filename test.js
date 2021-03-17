const fs = require("fs")
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
			new NodePolyfillPlugin({
				exclude: ["console"]
			})
		]
	})

	const result = fs.readFileSync("./dist/main.js").toString()

	t.is(require("./dist/main"), "Hello World")

	// https://github.com/browserify/console-browserify/blob/master/index.js#L63
	t.is(result.includes("No such label: "), false)
})
