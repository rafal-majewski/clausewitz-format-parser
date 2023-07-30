import {describe, test, expect} from "vitest";
import {NearleyClausewitzFormatParser} from "../lib/NearleyClausewitzFormatParser.js";

describe("NearleyClausewitzFormatParser", async () => {
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
		["a = b #comment\n", ["a", "=", "b"]],
		["a = b #comment\n\n", ["a", "=", "b"]],
		["a #comment\n= b", ["a", "=", "b"]],
		["a#comment\n= b", ["a", "=", "b"]],
		["#comment\na = b", ["a", "=", "b"]],
		["a = #comment\n#comment\nb", ["a", "=", "b"]],
	])("parse(%p)", (text, expected) => {
		const parser = new NearleyClausewitzFormatParser();
		expect(parser.parse(text)).toEqual(expected);
	});
});
