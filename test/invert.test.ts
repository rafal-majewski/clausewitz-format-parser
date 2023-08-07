import {describe, test, expect} from "vitest";
import * as fs from "fs/promises";
import * as path from "path";
import * as url from "url";
import {invert} from "../lib/invert.js";

describe("invert", async () => {
	const cases = await Promise.all(
		await fs
			.readdir(path.join(path.dirname(url.fileURLToPath(import.meta.url)), "data", "invert"))
			.then((testCaseNames) =>
				testCaseNames.map((testCaseName) =>
					Promise.all([
						fs
							.readFile(
								path.join(
									path.dirname(url.fileURLToPath(import.meta.url)),
									"data",
									"invert",
									testCaseName,
									"input.json",
								),
								"utf8",
							)
							.then((fileContent) => JSON.parse(fileContent)),
						fs

							.readFile(
								path.join(
									path.dirname(url.fileURLToPath(import.meta.url)),
									"data",
									"invert",
									testCaseName,
									"expected_output.json",
								),
								"utf8",
							)
							.then((fileContent) => JSON.parse(fileContent)),
					]).then(([input, expectedOutput]) => [testCaseName, input, expectedOutput] as const),
				),
			),
	);

	test.each(cases)("invert: %p", (testCaseName, input, expectedOutput) => {
		const actualOutput = invert(input);
		expect(actualOutput).toStrictEqual(expectedOutput);
	});
});
