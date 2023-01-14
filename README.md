

## Format numbers
>
> Format numbers with commas or dots


### Installation

```shell
npm install number-delimiter
```


---

### Usage

#### With commonJs

```javascript
const {delimitNumber} = require("number-delimiter");
```

#### With ESM

```javascript
import {delimitNumber} from "to-ansi";
```

---

### Examples

#### Convert numbers into text-formatted numbers

```javascript
delimitNumber(11.124E5);
// => "1,112,400"

delimitNumber("12345.23");
// => "12,345.23"

delimitNumber(-9876543211.12)
// "-9,876,543,211.12" 

delimitNumber("-123456789");                                       // => "123,456,789"
delimitNumber("-12.34.56.789");                                    // => "-123,456,789"
delimitNumber("-123456789", {delimiter: ".", separator: ","});     // => "-123.456.789"
delimitNumber(-123456789.24, {delimiter: ".", separator: ","});    // => "-123.456.789,24"
delimitNumber(-123456789.24, {delimiter: ",", separator: "."});    // => "-123,456,789.24"

delimitNumber("-123456789,24", {delimiter: ",", separator: "."});  // => "-123,456,789.24"
delimitNumber("ABCDEGTH")   // => ""

delimitNumber("23456789012345678901234567890123456789012345678901234567890,655441456");
// => 23.456.789.012.345.678.901.234.567.890.123.456.789.012.345.678.901.234.567.890,655441456

delimitNumber(BigInt(Math.pow(2, 400)))
// => "2.582.249.878.086.908.589.655.919.172.003.011.874.329.705.792.829.223.512.830.659.356.540.647.622.016.841.194.629.645.353.280.137.831.435.903.171.972.747.493.376"
```

