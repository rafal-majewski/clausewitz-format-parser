import type {ClausewitzFormatObject} from "./ClausewitzFormatObject.js";

export interface ClausewitzFormatParser {
	parse(text: string): ClausewitzFormatObject;
}
