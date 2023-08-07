import * as fs from "fs/promises";
import * as path from "path";
import * as url from "url";
import {NearleyClausewitzFormatParser} from "./lib/NearleyClausewitzFormatParser.js";
import {BasicClausewitzFormarSerializer} from "./lib/BasicClausewitzFormarSerializer.js";

const heartsOfIronIVFocusTreeFileContents = await Promise.all(
	await fs
		.readdir(
			path.join(
				path.dirname(url.fileURLToPath(import.meta.url)),
				"test",
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
							"test",
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
const parser = new NearleyClausewitzFormatParser();
// const parsedFileContents = parser.parse(fileContents);
const serializer = new BasicClausewitzFormarSerializer({
	betweenItems: (indentationLevel) => "\n" + "\t".repeat(indentationLevel),
	afterOpenBrace: (indentationLevel) => "\n" + "\t".repeat(indentationLevel),
	beforeCloseBrace: (indentationLevel) => "\n" + "\t".repeat(indentationLevel - 1),
	betweenBracesInEmptyObject: () => "",
});
heartsOfIronIVFocusTreeFileContents.slice(20, 21).forEach(([fileName, fileContents]) => {
	console.log(fileName);
	const parsedFileContents = parser.parse(fileContents);
	const serializedFileContents = serializer.serialize(parsedFileContents);
	console.log(serializedFileContents);
});
