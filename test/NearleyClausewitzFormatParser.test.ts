import {describe, test, expect} from "vitest";
import {NearleyClausewitzFormatParser} from "../lib/NearleyClausewitzFormatParser.js";

describe("NearleyClausewitzFormatParser", () => {
	test.each([
		["", []],
		["a", ["a"]],
		["abc", ["abc"]],
		["a b", ["a", "b"]],
		[" a", ["a"]],
		["a ", ["a"]],
		["a = b", ["a", "=", "b"]],
	])("parse(%p)", (text, expected) => {
		const parser = new NearleyClausewitzFormatParser();
		expect(parser.parse(text)).toEqual(expected);
	});
});
