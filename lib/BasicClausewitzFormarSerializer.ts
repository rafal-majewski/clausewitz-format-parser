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
	public serialize(clausewitzFormatObject: ClausewitzFormatObject): string {
		const result = clausewitzFormatObject.join(this.whitespaceGenerators.betweenItems()) + "\n";
		return result;
	}
}
