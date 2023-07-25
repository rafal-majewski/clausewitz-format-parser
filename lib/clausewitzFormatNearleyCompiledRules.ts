import nearley from "nearley";

export const clausewitzFormatNearleyCompiledRules: nearley.CompiledRules = {
	Lexer: undefined,
	ParserRules: [
		{"name": "CLAUSEWITZ_FORMAT", "symbols": [], "postprocess": () => []},
		{
			"name": "CLAUSEWITZ_FORMAT",
			"symbols": ["SCALAR_SEQUENCE_SURROUNDED_BY_WHITESPACE"],
			"postprocess": (d) => d[0],
		},
		{
			"name": "SCALAR_SEQUENCE_SURROUNDED_BY_WHITESPACE",
			"symbols": ["OPTIONAL_WHITESPACE", "SCALAR_SEQUENCE"],
			"postprocess": (d) => d[1],
		},
		{"name": "SCALAR_SEQUENCE", "symbols": ["SCALAR"], "postprocess": (d) => [d[0]]},
		{"name": "SCALAR_SEQUENCE", "symbols": ["SCALAR_SEQUENCE_TAIL"], "postprocess": (d) => d[0]},
		{
			"name": "SCALAR_SEQUENCE_TAIL",
			"symbols": ["SCALAR", "AT_LEAST_ONE_WHITESPACE", "SCALAR_SEQUENCE"],
			"postprocess": (d) => [d[0], ...d[2]],
		},
		{"name": "AT_LEAST_ONE_WHITESPACE$ebnf$1", "symbols": [/[\s]/]},
		{
			"name": "AT_LEAST_ONE_WHITESPACE$ebnf$1",
			"symbols": ["AT_LEAST_ONE_WHITESPACE$ebnf$1", /[\s]/],
			"postprocess": function arrpush(d) {
				return d[0].concat([d[1]]);
			},
		},
		{
			"name": "AT_LEAST_ONE_WHITESPACE",
			"symbols": ["AT_LEAST_ONE_WHITESPACE$ebnf$1"],
			"postprocess": (d) => d[0].join(""),
		},
		{"name": "OPTIONAL_WHITESPACE$ebnf$1", "symbols": []},
		{
			"name": "OPTIONAL_WHITESPACE$ebnf$1",
			"symbols": ["OPTIONAL_WHITESPACE$ebnf$1", /[\s]/],
			"postprocess": function arrpush(d) {
				return d[0].concat([d[1]]);
			},
		},
		{
			"name": "OPTIONAL_WHITESPACE",
			"symbols": ["OPTIONAL_WHITESPACE$ebnf$1"],
			"postprocess": (d) => d[0].join(""),
		},
		{"name": "SCALAR$ebnf$1", "symbols": [/[^\s]/]},
		{
			"name": "SCALAR$ebnf$1",
			"symbols": ["SCALAR$ebnf$1", /[^\s]/],
			"postprocess": function arrpush(d) {
				return d[0].concat([d[1]]);
			},
		},
		{"name": "SCALAR", "symbols": ["SCALAR$ebnf$1"], "postprocess": (d) => d[0].join("")},
	],
	ParserStart: "CLAUSEWITZ_FORMAT",
};
