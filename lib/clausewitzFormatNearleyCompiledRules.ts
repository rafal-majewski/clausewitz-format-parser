import nearley from "nearley";

export const clausewitzFormatNearleyCompiledRules: nearley.CompiledRules = {
	Lexer: undefined,
	ParserRules: [
		{"name": "CLAUSEWITZ_FORMAT", "symbols": []},
		{"name": "CLAUSEWITZ_FORMAT", "symbols": [/./]},
	],
	ParserStart: "CLAUSEWITZ_FORMAT",
};
