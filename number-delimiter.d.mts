export declare function setDefaultDelimiter(char: string): void;
export declare function setDefaultSeparator(char: any): void;
export declare function delimitNumber(input: any, { delimiter, separator }?: {
    delimiter?: string;
    separator?: string;
}): {
    result: string;
} | {
    result: string;
    floaters: string;
    sign: string;
    numbers: any[];
} | {
    result: string;
    floaters: string;
    numbers: any[];
    sign: string;
} | {
    result: string;
    floaters: string;
    sign: (string);
    numbers: any[];
};
