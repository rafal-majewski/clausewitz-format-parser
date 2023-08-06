import {describe, test, expect} from "vitest";
import {BasicClausewitzFormarSerializer} from "../lib/BasicClausewitzFormarSerializer.js";

describe("BasicClausewitzFormarSerializer", async () => {
	test.each([[[], "\n"]])("serialize(%p)", (clausewitzFormatObject, expected) => {
		const serializer = new BasicClausewitzFormarSerializer();
		const actual = serializer.serialize(clausewitzFormatObject);
		expect(actual).toBe(expected);
	});
});
