/**
My awesome module.
@param input Lorem ipsum.
@param postfix Lorem ipsum.
@example
```
const theModule = require("the-module")

theModule("unicorns")
//=> "unicorns & rainbows"
```
*/
declare function theModule(input: string, { postfix }: { postfix?: string }): string

export = theModule
