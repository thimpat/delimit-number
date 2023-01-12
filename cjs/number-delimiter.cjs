const convertStringToNumber = function (input, {separator = ".", floatSeparator = ","} = {})
{
    input = "" + input;
    let arr = input.split(separator);
    let str = arr.join("")
    str = str.replace(floatSeparator, ".");
    return str;
};


/**
 * Commas: US, UK, Chine
 * Period: Germany, France, ...
 * @param input
 * @param separator
 * @param floatSeparator
 * @returns {{result: string}|boolean|{result: string, floaters: string, sign: (string), numbers: *[]}}
 */
const parseNumber = function (input, {separator = ".", floatSeparator = ","} = {})
{
    try
    {
        let r = 0;
        let numbers = [];

        // Convert
        input = convertStringToNumber(input);

        // Convert to real number
        input = Number(input);

        let arr = (input + "").split(separator);

        let floaters = ""
        if (arr.length > 1)
        {
            floaters = floatSeparator + arr.pop();
        }

        let sign = input >= 0 ? "" : "-";

        input = Math.floor(Math.abs(input));

        if (isNaN(input))
        {
            return {result: "Error"};
        }

        if (!input)
        {
            numbers.push(0);
        }

        while (input)
        {
            r = input - Math.floor(input / 1000) * 1000;

            if (input > 999)
            {
                numbers.unshift((r + "").padStart(3, "0"));
            }
            else
            {
                numbers.unshift(r);
            }
            input = Math.floor(input / 1000);
        }

        const result = sign + numbers.join(separator) + floaters;

        return {
            sign, numbers, floaters, result
        };
    }
    catch (e)
    {
        console.error({lid: 5144}, e.message);
    }

    return false;
};

let inputs = [
    11.124E5,
    77.77777,
    "123456789012345678901234567890",
    "12345,23",
    -9876543211.12,
    1.25,
    "5^8",
    "0005",
    0o1234,
    -0.25,
    -0,
    0xABCD,
    1234,
    "ARTMIS5",
    -123456789,
    10,
    100,
    10000,
    100000,
    123456789.542,
    123456789,
    987654321,
    12345,
    "12345.23",
    "1E10",
    "-213E8",
    5E4,
    0
]

for (let i = 0; i < inputs.length; ++i)
{
    const {result} = parseNumber(inputs[i]);
    console.log(result)
}


module.exports.convertStringToNumber = convertStringToNumber;
