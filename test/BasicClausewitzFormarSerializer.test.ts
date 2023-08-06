import {describe, test, expect} from "vitest";
import {BasicClausewitzFormarSerializer} from "../lib/BasicClausewitzFormarSerializer.js";
import * as fs from "fs/promises";
import * as path from "path";
import * as url from "url";
import {NearleyClausewitzFormatParser} from "../lib/NearleyClausewitzFormatParser.js";

describe("BasicClausewitzFormarSerializer", async () => {
	test.each([
		[[], "\n"],
		[["a"], "a\n"],
		[["a", "b"], "a\nb\n"],
		[[[]], "{}\n"],
		[["a", ["b"]], "a\n{\n\tb\n}\n"],
		[["a", ["b", "c", ["d", [], "e"]]], "a\n{\n\tb\n\tc\n\t{\n\t\td\n\t\t{}\n\t\te\n\t}\n}\n"],
	])("serialize(%p)", (clausewitzFormatObject, expected) => {
		const serializer = new BasicClausewitzFormarSerializer({
			betweenItems: (indentationLevel) => "\n" + "\t".repeat(indentationLevel),
			afterOpenBrace: (indentationLevel) => "\n" + "\t".repeat(indentationLevel),
			beforeCloseBrace: (indentationLevel) => "\n" + "\t".repeat(indentationLevel - 1),
			betweenBracesInEmptyObject: () => "",
		});
		const actual = serializer.serialize(clausewitzFormatObject);
		expect(actual).toBe(expected);
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
			const parsedFileContents = parser.parse(fileContents);
			const serializer = new BasicClausewitzFormarSerializer({
				betweenItems: (indentationLevel) => "\n" + "\t".repeat(indentationLevel),
				afterOpenBrace: (indentationLevel) => "\n" + "\t".repeat(indentationLevel),
				beforeCloseBrace: (indentationLevel) => "\n" + "\t".repeat(indentationLevel - 1),
				betweenBracesInEmptyObject: () => "",
			});
			const serializedParsedFileContents = serializer.serialize(parsedFileContents);
			const parsedSerializedParsedFileContents = parser.parse(serializedParsedFileContents);

			expect(parsedSerializedParsedFileContents).toStrictEqual(parsedFileContents);
		},
	);
});
