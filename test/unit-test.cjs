const chai = require("chai");
const expect = chai.expect;

/** to-esm-esm: remove **/
const {delimitNumber, setDefaultDelimiter, setDefaultSeparator} = require("../cjs/number-delimiter.cjs");
/** to-esm-esm: end-remove **/

/** to-esm-esm: add
import {delimitNumber, setDefaultDelimiter, setDefaultSeparator} from "../esm/number-delimiter.mjs";
 **/

describe("From the .cjs module", () =>
{
    describe("With default options", () =>
    {

        describe("#delimitNumber", () =>
        {
            it("should return a string delimited number when input is already formatted but with one period", function ()
            {
                const result = delimitNumber("12.345678,56");
                expect(result.result).to.equal("12.345.678,56");
            });

            it("should return a string delimited number when input is already badly formatted", function ()
            {
                const result = delimitNumber("123.45678,56");
                expect(result.result).to.equal("12.345.678,56");
            });

            it("should return a string delimited number when input is already very badly formatted", function ()
            {
                const result = delimitNumber("123.45.678,56");
                expect(result.result).to.equal("12.345.678,56");
            });

           it("should return a string delimited number when input is a very big number with comma", function ()
            {
                const result = delimitNumber("23456789012345678901234567890123456789012345678901234567890,655441456");
                expect(result.result).to.equal("23.456.789.012.345.678.901.234.567.890.123.456.789.012.345.678.901.234.567.890,655441456");
            });

            it("should return a string delimited number when input is a super big number", function ()
            {
                const result = delimitNumber("123456789012345678901234567890123456789012345678901234567890");
                expect(result.result).to.equal("123.456.789.012.345.678.901.234.567.890.123.456.789.012.345.678.901.234.567.890");
            });

            it("should return a string delimited number when input is a super big number with a comma with zeros", function ()
            {
                const result = delimitNumber("123456789012345678901234567890123456789012345678901234567890,0000");
                expect(result.result).to.equal("123.456.789.012.345.678.901.234.567.890.123.456.789.012.345.678.901.234.567.890");
            });

            it("should return a string delimited number when input is 2⁵⁵", function ()
            {
                const input = BigInt(Math.pow(2, 55));
                const result = delimitNumber(input);
                expect(result.result).to.equal("36.028.797.018.963.968");
            });

            it("should return a string delimited number when input is 2⁶⁴", function ()
            {
                const input = BigInt(Math.pow(2, 64));
                const result = delimitNumber(input);
                expect(result.result).to.equal("18.446.744.073.709.551.616");
            });

            it("should return a string delimited number when input 2⁶⁵", function ()
            {
                const input = BigInt(Math.pow(2, 65));
                const result = delimitNumber(input);
                expect(result.result).to.equal("36.893.488.147.419.103.232");
            });

            it("should return a string delimited number when input is a 2ⁱ⁰⁶ ", function ()
            {
                const input = BigInt(Math.pow(2, 106));
                const result = delimitNumber(input);
                expect(result.result).to.equal("81.129.638.414.606.681.695.789.005.144.064");
            });

            it("should return a string delimited number when input is 2ⁱ⁰⁷", function ()
            {
                const input = BigInt(Math.pow(2, 107));
                const result = delimitNumber(input);
                expect(result.result).to.equal("162.259.276.829.213.363.391.578.010.288.128");
            });

            it("should return a string delimited number when input is 2⁴⁰⁰", function ()
            {
                const input = BigInt(Math.pow(2, 400));
                const result = delimitNumber(input);
                expect(result.result).to.equal("2.582.249.878.086.908.589.655.919.172.003.011.874.329.705.792.829.223.512.830.659.356.540.647.622.016.841.194.629.645.353.280.137.831.435.903.171.972.747.493.376");
            });

            it("should return a string delimited number when input is an ", function ()
            {
                const input = 11.124E5;
                const result = delimitNumber(input);
                expect(result.result).to.equal("1.112.400");
            });

            it("should return a string delimited number when input is comma separated number", function ()
            {
                const input = 77.77777;
                const result = delimitNumber(input);
                expect(result.result).to.equal("77,77777");
            });

            it("should return a string delimited number when input is an ", function ()
            {
                const input = "12345,23";
                const result = delimitNumber(input);
                expect(result.result).to.equal("12.345,23");
            });

            it("should return a string delimited number when input is a negative number", function ()
            {
                const input = -9876543211.12;
                const result = delimitNumber(input);
                expect(result.result).to.equal("-9.876.543.211,12");
            });

            it("should return 0.25 when input is 0.25", function ()
            {
                const input = 0.25;
                const result = delimitNumber(input);
                expect(result.result).to.equal("0,25");
            });

            it("should return 1.25 when input is 1.25", function ()
            {
                const input = 1.25;
                const result = delimitNumber(input);
                expect(result.result).to.equal("1,25");
            });

            it("should return -0.25 when input is -0.25", function ()
            {
                const input = -0.25;
                const result = delimitNumber(input);
                expect(result.result).to.equal("-0,25");
            });

            it("should return -1.25 when input is -1,25", function ()
            {
                const input = -1.25;
                const result = delimitNumber(input);
                expect(result.result).to.equal("-1,25");
            });

            it("should return an error when input is not a number", function ()
            {
                const input = "ARTMIS5";
                const result = delimitNumber(input);
                expect(result.result).to.equal("");
            });

            it("should return an error when input is a string expression", function ()
            {
                const input = "5^8";
                const result = delimitNumber(input);
                expect(result.result).to.equal("");
            });

            it("should return 5 when input is a `0005`", function ()
            {
                const input = "0005";
                const result = delimitNumber(input);
                expect(result.result).to.equal("5");
            });

            it("should return a string delimited number when input is an octal", function ()
            {
                const input = 0o1234567;
                const result = delimitNumber(input);
                expect(result.result).to.equal("342.391");
            });

            it("should return a string delimited number when input is a hexadecimal number", function ()
            {
                const input = 0xABCD;
                const result = delimitNumber(input);
                expect(result.result).to.equal("43.981");
            });

            it("should return zero when input is zero", function ()
            {
                const input = 0;
                const result = delimitNumber(input);
                expect(result.result).to.equal("0");
            });

            it("should return zero when input is minus zero", function ()
            {
                const input = -0;
                const result = delimitNumber(input);
                expect(result.result).to.equal("0");
            });

            it("should return 10 when input is 10", function ()
            {
                const input = 10;
                const result = delimitNumber(input);
                expect(result.result).to.equal("10");
            });

            it("should return 100 when input is 100", function ()
            {
                const input = 100;
                const result = delimitNumber(input);
                expect(result.result).to.equal("100");
            });

            it("should return 1000 when input is 1000", function ()
            {
                const input = 1000;
                const result = delimitNumber(input);
                expect(result.result).to.equal("1.000");
            });

            it("should return 10000 when input is 10000", function ()
            {
                const input = 10000;
                const result = delimitNumber(input);
                expect(result.result).to.equal("10.000");
            });

            it("should return 10000 when input is 100000", function ()
            {
                const input = 100000;
                const result = delimitNumber(input);
                expect(result.result).to.equal("100.000");
            });

            it("should return a string delimited number when input is -213E8", function ()
            {
                const input = "-213E8";
                const result = delimitNumber(input);
                expect(result.result).to.equal("-21.300.000.000");
            });

            it("should return a string delimited number when input is 1E10", function ()
            {
                const input = "-213E8";
                const result = delimitNumber(input);
                expect(result.result).to.equal("-21.300.000.000");
            });

        });

    })

    describe("With modified options", () =>
    {
        before(() =>
        {
            setDefaultDelimiter(",");
            setDefaultSeparator(".");
        })

        describe("#delimitNumber", () =>
        {
            it("should return a string delimited number when input is a super big number with comma", function ()
            {
                const result = delimitNumber("23456789012345678901234567890123456789012345678901234567890.655441456");
                expect(result.result).to.equal("23,456,789,012,345,678,901,234,567,890,123,456,789,012,345,678,901,234,567,890.655441456");
            });

            it("should return a string delimited number when input is a super big number", function ()
            {
                const result = delimitNumber("123456789012345678901234567890123456789012345678901234567890");
                expect(result.result).to.equal("123,456,789,012,345,678,901,234,567,890,123,456,789,012,345,678,901,234,567,890");
            });

            it("should return a string delimited number when input is a super big number with a comma with zeros", function ()
            {
                const result = delimitNumber("123456789012345678901234567890123456789012345678901234567890.0000");
                expect(result.result).to.equal("123,456,789,012,345,678,901,234,567,890,123,456,789,012,345,678,901,234,567,890");
            });

            it("should return a string delimited number when input is 2⁵⁵", function ()
            {
                const input = BigInt(Math.pow(2, 55));
                const result = delimitNumber(input);
                expect(result.result).to.equal("36,028,797,018,963,968");
            });

            it("should return a string delimited number when input is 2⁶⁴", function ()
            {
                const input = BigInt(Math.pow(2, 64));
                const result = delimitNumber(input);
                expect(result.result).to.equal("18,446,744,073,709,551,616");
            });

            it("should return a string delimited number when input 2⁶⁵", function ()
            {
                const input = BigInt(Math.pow(2, 65));
                const result = delimitNumber(input);
                expect(result.result).to.equal("36,893,488,147,419,103,232");
            });

            it("should return a string delimited number when input is a 2ⁱ⁰⁶ ", function ()
            {
                const input = BigInt(Math.pow(2, 106));
                const result = delimitNumber(input);
                expect(result.result).to.equal("81,129,638,414,606,681,695,789,005,144,064");
            });

            it("should return a string delimited number when input is 2ⁱ⁰⁷", function ()
            {
                const input = BigInt(Math.pow(2, 107));
                const result = delimitNumber(input);
                expect(result.result).to.equal("162,259,276,829,213,363,391,578,010,288,128");
            });

            it("should return a string delimited number when input is 2⁴⁰⁰", function ()
            {
                const input = BigInt(Math.pow(2, 400));
                const result = delimitNumber(input);
                expect(result.result).to.equal("2,582,249,878,086,908,589,655,919,172,003,011,874,329,705,792,829,223,512,830,659,356,540,647,622,016,841,194,629,645,353,280,137,831,435,903,171,972,747,493,376");
            });

            it("should return a string delimited number when input is an exponent", function ()
            {
                const input = 11.124E5;
                const result = delimitNumber(input);
                expect(result.result).to.equal("1,112,400");
            });

            it("should return a string delimited number when input is comma separated number", function ()
            {
                const input = 77.77777;
                const result = delimitNumber(input);
                expect(result.result).to.equal("77.77777");
            });

            it("should return a string delimited number when input is an ", function ()
            {
                const input = "12345.23";
                const result = delimitNumber(input);
                expect(result.result).to.equal("12,345.23");
            });

            it("should return a string delimited number when input is a negative number", function ()
            {
                const input = -9876543211.12;
                const result = delimitNumber(input);
                expect(result.result).to.equal("-9,876,543,211.12");
            });

            it("should return 0.25 when input is 0.25", function ()
            {
                const input = 0.25;
                const result = delimitNumber(input);
                expect(result.result).to.equal("0.25");
            });

            it("should return 1.25 when input is 1.25", function ()
            {
                const input = 1.25;
                const result = delimitNumber(input);
                expect(result.result).to.equal("1.25");
            });

            it("should return -0.25 when input is -0.25", function ()
            {
                const input = -0.25;
                const result = delimitNumber(input);
                expect(result.result).to.equal("-0.25");
            });

            it("should return -1.25 when input is -1,25", function ()
            {
                const input = -1.25;
                const result = delimitNumber(input);
                expect(result.result).to.equal("-1.25");
            });

            it("should return an error when input is not a number", function ()
            {
                const input = "ARTMIS5";
                const result = delimitNumber(input);
                expect(result.result).to.equal("");
            });

            it("should return an error when input is a string expression", function ()
            {
                const input = "5^8";
                const result = delimitNumber(input);
                expect(result.result).to.equal("");
            });

            it("should return 5 when input is a `0005`", function ()
            {
                const input = "0005";
                const result = delimitNumber(input);
                expect(result.result).to.equal("5");
            });

            it("should return a string delimited number when input is an octal", function ()
            {
                const input = 0o1234567;
                const result = delimitNumber(input);
                expect(result.result).to.equal("342,391");
            });

            it("should return a string delimited number when input is a hexadecimal number", function ()
            {
                const input = 0xABCD;
                const result = delimitNumber(input);
                expect(result.result).to.equal("43,981");
            });

            it("should return zero when input is zero", function ()
            {
                const input = 0;
                const result = delimitNumber(input);
                expect(result.result).to.equal("0");
            });

            it("should return zero when input is minus zero", function ()
            {
                const input = -0;
                const result = delimitNumber(input);
                expect(result.result).to.equal("0");
            });

            it("should return 10 when input is 10", function ()
            {
                const input = 10;
                const result = delimitNumber(input);
                expect(result.result).to.equal("10");
            });

            it("should return 100 when input is 100", function ()
            {
                const input = 100;
                const result = delimitNumber(input);
                expect(result.result).to.equal("100");
            });

            it("should return 1000 when input is 1000", function ()
            {
                const input = 1000;
                const result = delimitNumber(input);
                expect(result.result).to.equal("1,000");
            });

            it("should return 10000 when input is 10000", function ()
            {
                const input = 10000;
                const result = delimitNumber(input);
                expect(result.result).to.equal("10,000");
            });

            it("should return 10000 when input is 100000", function ()
            {
                const input = 100000;
                const result = delimitNumber(input);
                expect(result.result).to.equal("100,000");
            });

            it("should return a string delimited number when input is -213E8", function ()
            {
                const input = "-213E8";
                const result = delimitNumber(input);
                expect(result.result).to.equal("-21,300,000,000");
            });

            it("should return a string delimited number when input is 1E10", function ()
            {
                const input = "-213E8";
                const result = delimitNumber(input);
                expect(result.result).to.equal("-21,300,000,000");
            });

        });

    })
});