import {describe, test, expect} from "vitest";
import {BasicClausewitzFormarSerializer} from "../lib/BasicClausewitzFormarSerializer.js";

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
});
