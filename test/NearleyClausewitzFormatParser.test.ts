import {describe, test, expect} from "vitest";
import {NearleyClausewitzFormatParser} from "../lib/NearleyClausewitzFormatParser.js";
import * as fs from "fs/promises";
import * as path from "path";
import * as url from "url";

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
		["a ={} b", ["a", "=", [], "b"]],
		["{} {}", [[], []]],
		["{}{}", [[], []]],
		[`a = "b"`, ["a", "=", `"b"`]],
		[`a = "b c"`, ["a", "=", `"b c"`]],
		[`a = "b\\"c"`, ["a", "=", `"b\\"c"`]],
		[`a="b"`, [`a="b"`]],
	])("parse(%p)", (text, expected) => {
		const parser = new NearleyClausewitzFormatParser();
		expect(parser.parse(text)).toEqual(expected);
	});

	const heartsOfIronIVFocusTreeFileContents = await Promise.all(
		await fs
			.readdir(
				path.join(
					path.dirname(url.fileURLToPath(import.meta.url)),
					"data",
					"hearts_of_iron_iv_focus_trees",
				),
			)
			.then((fileNames) =>
				fileNames.map((fileName) =>
					fs
						.readFile(
							path.join(
								path.dirname(url.fileURLToPath(import.meta.url)),
								"data",
								"hearts_of_iron_iv_focus_trees",
								fileName,
							),
							"utf8",
						)
						.then((fileContents) => [fileName, fileContents] as const),
				),
			),
	);
	test.each(heartsOfIronIVFocusTreeFileContents)(
		`parse HoI4 focus tree file "%p"`,
		async (fileName, fileContents) => {
			const parser = new NearleyClausewitzFormatParser();
			parser.parse(fileContents);
		},
	);
});
