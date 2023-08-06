import type {ClausewitzFormatObject} from "./ClausewitzFormatObject.js";
import type {ClausewitzFormatSerializer} from "./ClausewitzFormatSerializer.js";

export class BasicClausewitzFormarSerializer implements ClausewitzFormatSerializer {
	public serialize(clausewitzFormatObject: ClausewitzFormatObject): string {
		const result = clausewitzFormatObject.join("") + "\n";
		return result;
	}
}
