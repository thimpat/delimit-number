const convertStringToNumber = function (input, {delimiter = ".", separator = ","} = {})
{
    input = "" + input;
    let arr = input.split(delimiter);
    let str = arr.join("")
    str = str.replace(separator, ".");
    return str;
};


/**
 * Delimiters:
 * Commas: US, UK, Chine
 * Period: Germany, France, ...
 * @param input
 * @param delimiter
 * @param separator
 * @returns {{result: string}|boolean|{result: string, floaters: string, sign: (string), numbers: *[]}}
 */
const delimitNumber = function (input, {delimiter = ".", separator = ","} = {})
{
    try
    {
        let r = 0;
        let numbers = [];

        // Convert
        input = convertStringToNumber(input);

        // Convert to real number
        input = Number(input);

        let arr = (input + "").split(delimiter);

        let floaters = ""
        if (arr.length > 1)
        {
            floaters = separator + arr.pop();
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

        const result = sign + numbers.join(delimiter) + floaters;

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


module.exports.convertStringToNumber = convertStringToNumber;
module.exports.delimitNumber = delimitNumber;
