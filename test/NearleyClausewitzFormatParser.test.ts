import {describe, test, expect} from "vitest";
import {NearleyClausewitzFormatParser} from "../lib/NearleyClausewitzFormatParser.js";

describe("NearleyClausewitzFormatParser", () => {
	test.each([
		["", []],
		["a", ["a"]],
		["abc", ["abc"]],
	])("parse(%p)", (text, expected) => {
		const parser = new NearleyClausewitzFormatParser();
		expect(parser.parse(text)).toEqual(expected);
	});
});
