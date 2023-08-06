import type {ClausewitzFormatObject} from "./ClausewitzFormatObject.js";

export interface ClausewitzFormatSerializer {
	serialize: (object: ClausewitzFormatObject) => string;
}
