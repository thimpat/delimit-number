const OPTIONS = {
    DEFAULT_DELIMITER: ".",
    DEFAULT_SEPARATOR: ","
}

const JAVASCRIPT_SEPARATOR = ".";
const ERROR = "";

const setDefaultDelimiter = function (char)
{
    OPTIONS.DEFAULT_DELIMITER = char;
};

const setDefaultSeparator = function (char)
{
    OPTIONS.DEFAULT_SEPARATOR = char;
};

const convertToFinalResult = function ({
                                           sign = "",
                                           numbersSplitByThreeGroup = [],
                                           delimiter = OPTIONS.DEFAULT_DELIMITER,
                                           separator = OPTIONS.DEFAULT_SEPARATOR,
                                           floaters = ""
                                       } = {})
{
    floaters = floaters ? separator + floaters : "";
    const result = sign + numbersSplitByThreeGroup.join(delimiter) + floaters;
    return result
};

const convertRawStringToNumber = function (input, {
    delimiter = OPTIONS.DEFAULT_DELIMITER,
    separator = OPTIONS.DEFAULT_SEPARATOR
} = {})
{
    try
    {
        if (typeof input === "number")
        {
            return {input, success: true};
        }

        if (typeof input === "bigint")
        {
            input = input.toString();
        }

        if (typeof input === 'string' || input instanceof String)
        {
            input = input.trim();

            if (input.indexOf("E") > 0)
            {
                return {input: Number(input), success: true};
            }

            let left = input.split(separator)[0];

            if (left.startsWith("-"))
            {
                left = left.substring(1);
            }

            if (isNaN(left))
            {
                return {input, success: false};
            }

            if (Number(left) > Math.pow(2, 63))
            {
                return {input, success: false};
            }
        }

        if (!isNaN(input))
        {
            return {input, success: true};
        }

        input = "" + input;
        let arr = input.split(delimiter);
        let str = arr.join("")
        str = str.replace(separator, ".");
        return {input: Number(str), success: true};
    }
    catch (e)
    {
    }

    return {input, success: false};
};


/**
 * Format string
 * @param str
 * @param delimiter
 * @param separator
 * @returns {{result: string, floaters: string, sign: string, numbers: *[]}}
 */
const convertStringToDelimited = function (str, {
    delimiter = OPTIONS.DEFAULT_DELIMITER,
    separator = OPTIONS.DEFAULT_SEPARATOR
} = {})
{
    try
    {
        const numbersSplitByThreeGroup = [];
        let st = "";
        let sign = "";
        let floaters = "";

        if (str.indexOf(separator) > -1)
        {
            const arr = str.split(separator);
            floaters = arr[1];
            if (("" + Number(arr[1])).indexOf("E") === -1)
            {
                floaters = Number(arr[1]);
            }
            str = arr[0];
        }

        let arr = str.split("");
        const n = arr.length;
        let invalid = false;
        for (let i = n - 1; i >= 0; --i)
        {
            const digit = arr[i];
            if (digit === "-")
            {
                sign = "-";
                st && numbersSplitByThreeGroup.unshift(st);
                st = "";
                break;
            }

            if (digit === "")
            {
                st = "";
                invalid = true;
                break;
            }

            if (!/[0-9]/.test(digit))
            {
                st = "";
                invalid = true;
                break;
            }

            st = digit + st;
            if (!((n - i) % 3))
            {
                numbersSplitByThreeGroup.unshift(st);
                st = "";
            }
        }

        if (invalid)
        {
            return {
                result: "", numbers: [], sign: "", floaters: ""
            }
        }

        st && numbersSplitByThreeGroup.unshift(st);

        const result = convertToFinalResult({sign, delimiter, floaters, numbersSplitByThreeGroup, separator});

        return {
            sign, numbers: numbersSplitByThreeGroup, floaters, result
        };
    }
    catch (e)
    {
    }

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
const delimitNumber = function (input, {
    delimiter = OPTIONS.DEFAULT_DELIMITER,
    separator = OPTIONS.DEFAULT_SEPARATOR
} = {})
{
    try
    {
        let r = 0;
        let numbersSplitByThreeGroup = [];

        // Convert
        let success
        ({input, success} = convertRawStringToNumber(input));

        if (!success)
        {
            return convertStringToDelimited(input, {delimiter, separator});
        }

        let arr = (input + "").split(JAVASCRIPT_SEPARATOR);

        let floaters = ""
        if (arr.length > 1)
        {
            floaters = arr.pop();
        }

        let sign = input >= 0 ? "" : "-";

        input = Math.floor(Math.abs(input));

        if (isNaN(input))
        {
            return {result: ERROR};
        }

        if (!input)
        {
            numbersSplitByThreeGroup.push(0);
        }

        while (input)
        {
            r = input - Math.floor(input / 1000) * 1000;

            if (input > 999)
            {
                numbersSplitByThreeGroup.unshift((r + "").padStart(3, "0"));
            }
            else
            {
                numbersSplitByThreeGroup.unshift(r);
            }
            input = Math.floor(input / 1000);
        }

        const result = convertToFinalResult({sign, delimiter, floaters, numbersSplitByThreeGroup, separator});

        return {
            sign, numbers: numbersSplitByThreeGroup, floaters, result
        };
    }
    catch (e)
    {
        console.error(e);
    }

    return {
        result: false
    };
};


module.exports.setDefaultDelimiter = setDefaultDelimiter;
module.exports.setDefaultSeparator = setDefaultSeparator;

module.exports.convertStringToDelimited = convertStringToDelimited;
module.exports.convertStringToNumber = convertRawStringToNumber;
module.exports.delimitNumber = delimitNumber;
