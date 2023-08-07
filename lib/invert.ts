import type {ClausewitzFormatObject} from "./ClausewitzFormatObject.js";
import type {DeepReadonly} from "ts-essentials";

export function invert(
	parsedHoI4FocusTreeFileContent: DeepReadonly<ClausewitzFormatObject>,
): ClausewitzFormatObject {
	return JSON.parse(JSON.stringify(parsedHoI4FocusTreeFileContent));
}
