import nearley from "nearley";

export const clausewitzFormatNearleyCompiledRules: nearley.CompiledRules = {
	Lexer: undefined,
	ParserRules: [
		{"name": "CLAUSEWITZ_FORMAT", "symbols": []},
		{"name": "CLAUSEWITZ_FORMAT", "symbols": ["NON_EMPTY_STRING"]},
		{"name": "NON_EMPTY_STRING$ebnf$1", "symbols": [/./]},
		{
			"name": "NON_EMPTY_STRING$ebnf$1",
			"symbols": ["NON_EMPTY_STRING$ebnf$1", /./],
			"postprocess": function arrpush(d) {
				return d[0].concat([d[1]]);
			},
		},
		{
			"name": "NON_EMPTY_STRING",
			"symbols": ["NON_EMPTY_STRING$ebnf$1"],
			"postprocess": (d) => d[0].join(""),
		},
	],
	ParserStart: "CLAUSEWITZ_FORMAT",
};
