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
				excludeAliases: ["console"]
			})
		]
	})

	const result = fs.readFileSync("./dist/main.js").toString()

	t.is(require("./dist/main"), "Hello World")

	// https://github.com/browserify/console-browserify/blob/f7eefc7c908c29d2e94954e5c6c1098e8c1028b4/index.js#L63
	t.false(result.includes("No such label: "))
})
