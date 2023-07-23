import nearley from "nearley";
import type {ClausewitzFormatParser} from "./ClausewitzFormatParser.js";
import type {ClausewitzFormatObject} from "./ClausewitzFormatObject.js";
import {ClausewitzFormatParserInvalidText} from "./ClausewitzFormatParserInvalidText.js";
import {clausewitzFormatNearleyGrammar} from "./clausewitzFormatNearleyGrammar.js";

export class NearleyClausewitzFormatParser implements ClausewitzFormatParser {
	public constructor() {}

	public parse(text: string): ClausewitzFormatObject {
		const parser = new nearley.Parser(clausewitzFormatNearleyGrammar);
		parser.feed(text);
		const result = parser.results[0];
		if (result === undefined) {
			throw new ClausewitzFormatParserInvalidText(text);
		}
		return result;
	}
}
