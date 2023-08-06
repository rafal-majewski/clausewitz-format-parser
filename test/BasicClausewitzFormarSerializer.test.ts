import {describe, test, expect} from "vitest";
import {BasicClausewitzFormarSerializer} from "../lib/BasicClausewitzFormarSerializer.js";

describe("BasicClausewitzFormarSerializer", async () => {
	test.each([
		[[], "\n"],
		[["a"], "a\n"],
		[["a", "b"], "a\nb\n"],
		[[[]], "{}\n"],
	])("serialize(%p)", (clausewitzFormatObject, expected) => {
		const serializer = new BasicClausewitzFormarSerializer({
			betweenItems: () => "\n",
		});
		const actual = serializer.serialize(clausewitzFormatObject);
		expect(actual).toBe(expected);
	});
});
