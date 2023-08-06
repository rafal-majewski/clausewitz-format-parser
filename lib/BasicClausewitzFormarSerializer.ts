import type {ClausewitzFormatObject} from "./ClausewitzFormatObject.js";
import type {ClausewitzFormatSerializer} from "./ClausewitzFormatSerializer.js";

type WhitespaceGenerator = (indentationLevel: number) => string;

type WhitespaceGeneratorIds =
	| "betweenItems"
	| "afterOpenBrace"
	| "beforeCloseBrace"
	| "betweenBracesInEmptyObject";

type WhitespaceGenerators = Record<WhitespaceGeneratorIds, WhitespaceGenerator>;

export class BasicClausewitzFormarSerializer implements ClausewitzFormatSerializer {
	private readonly whitespaceGenerators: Readonly<WhitespaceGenerators>;
	public constructor(whitespaceGenerators: WhitespaceGenerators) {
		this.whitespaceGenerators = whitespaceGenerators;
	}
	private recursivelySerializeObject(
		object: ClausewitzFormatObject,
		indentationLevel: number,
	): string {
		const result = object
			.map((item) => {
				if (typeof item === "string") {
					return item;
				}
				if (item.length === 0) {
					return `{${this.whitespaceGenerators.betweenBracesInEmptyObject(indentationLevel + 1)}}`;
				}
				return `{${this.whitespaceGenerators.afterOpenBrace(
					indentationLevel + 1,
				)}${this.recursivelySerializeObject(
					item,
					indentationLevel + 1,
				)}${this.whitespaceGenerators.beforeCloseBrace(indentationLevel + 1)}}`;
			})
			.join(this.whitespaceGenerators.betweenItems(indentationLevel));
		return result;
	}

	public serialize(clausewitzFormatObject: ClausewitzFormatObject): string {
		const indentationLevel = 0;
		const result = this.recursivelySerializeObject(clausewitzFormatObject, indentationLevel) + "\n";
		return result;
	}
}
