const test = require("ava")
const pathExists = require("path-exists")
const webpack = require("p-webpack")
const NodePolyfillPlugin = require(".")

test("main", async t => {
	await webpack({
		entry: "./fixture",
		plugins: [
			new NodePolyfillPlugin()
		]
	})

	t.true(await pathExists("dist/main.js"))
})
