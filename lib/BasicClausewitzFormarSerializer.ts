import type {ClausewitzFormatObject} from "./ClausewitzFormatObject.js";
import type {ClausewitzFormatSerializer} from "./ClausewitzFormatSerializer.js";

type WhitespaceGenerator = () => string;

type WhitespaceGeneratorIds = "betweenItems";

type WhitespaceGenerators = Record<WhitespaceGeneratorIds, WhitespaceGenerator>;

export class BasicClausewitzFormarSerializer implements ClausewitzFormatSerializer {
	private readonly whitespaceGenerators: Readonly<WhitespaceGenerators>;
	public constructor(whitespaceGenerators: WhitespaceGenerators) {
		this.whitespaceGenerators = whitespaceGenerators;
	}
	private recursivelySerializeObject(object: ClausewitzFormatObject): string {
		const result = object.map((item) => {
			if (typeof item === "string") {
				return item;
			}
			return `{${this.recursivelySerializeObject(item)}}`;
		});
		return result.join(this.whitespaceGenerators.betweenItems());
	}

	public serialize(clausewitzFormatObject: ClausewitzFormatObject): string {
		const result = this.recursivelySerializeObject(clausewitzFormatObject) + "\n";
		return result;
	}
}
