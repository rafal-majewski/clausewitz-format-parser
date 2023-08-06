export class ClausewitzFormatParserInvalidText extends Error {
	public readonly text: string;
	public constructor(text: string) {
		super(`Invalid text:\n${text}`);
		this.text = text;
	}
}
