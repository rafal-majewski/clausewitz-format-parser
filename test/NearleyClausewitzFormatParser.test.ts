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
		["{ a }", [["a"]]],
		["{ a b }", [["a", "b"]]],
		["{a b}", [["a", "b"]]],
		["{ a } { b }", [["a"], ["b"]]],
		[" { a } { b } ", [["a"], ["b"]]],
		["c { a = { b } c {d {e} f} }", ["c", ["a", "=", ["b"], "c", ["d", ["e"], "f"]]]],
		["a = b #comment", ["a", "=", "b"]],
	])("parse(%p)", (text, expected) => {
		const parser = new NearleyClausewitzFormatParser();
		expect(parser.parse(text)).toEqual(expected);
	});
});
