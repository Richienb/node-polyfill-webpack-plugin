const test = require("ava")
const theModule = require(".")

test("main", t => {
	t.throws(() => {
		theModule(123)
	}, {
		instanceOf: TypeError,
		message: "Expected a string, got number"
	})

	t.is(theModule("unicorns"), "unicorns & rainbows")
})
