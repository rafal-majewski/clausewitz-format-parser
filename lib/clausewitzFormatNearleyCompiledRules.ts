import nearley from "nearley";

export const clausewitzFormatNearleyCompiledRules: nearley.CompiledRules = {
	Lexer: undefined,
	ParserRules: [
		{"name": "CLAUSEWITZ_FORMAT", "symbols": ["OBJECT_CONTENT"], "postprocess": (d) => d[0]},
		{
			"name": "VALUE_SEQUENCE_SURROUNDED_BY_WHITESPACE",
			"symbols": ["OPTIONAL_WHITESPACE", "VALUE_SEQUENCE", "OPTIONAL_WHITESPACE"],
			"postprocess": (d) => d[1],
		},
		{"name": "VALUE_SEQUENCE", "symbols": ["VALUE"], "postprocess": (d) => [d[0]]},
		{"name": "VALUE_SEQUENCE", "symbols": ["VALUE_SEQUENCE_TAIL"], "postprocess": (d) => d[0]},
		{
			"name": "VALUE_SEQUENCE_TAIL",
			"symbols": ["VALUE", "AT_LEAST_ONE_WHITESPACE", "VALUE_SEQUENCE"],
			"postprocess": (d) => [d[0], ...d[2]],
		},
		{"name": "VALUE", "symbols": ["SCALAR"], "postprocess": (d) => d[0]},
		{"name": "VALUE", "symbols": ["OBJECT"], "postprocess": (d) => d[0]},
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
		{"name": "SCALAR$ebnf$1", "symbols": [/[^\s{}]/]},
		{
			"name": "SCALAR$ebnf$1",
			"symbols": ["SCALAR$ebnf$1", /[^\s{}]/],
			"postprocess": function arrpush(d) {
				return d[0].concat([d[1]]);
			},
		},
		{"name": "SCALAR", "symbols": ["SCALAR$ebnf$1"], "postprocess": (d) => d[0].join("")},
		{
			"name": "OBJECT",
			"symbols": [
				{"literal": "{"},
				"OPTIONAL_WHITESPACE",
				"OBJECT_CONTENT",
				"OPTIONAL_WHITESPACE",
				{"literal": "}"},
			],
			"postprocess": (d) => d[2],
		},
		{"name": "OBJECT_CONTENT", "symbols": [], "postprocess": () => []},
		{
			"name": "OBJECT_CONTENT",
			"symbols": ["VALUE_SEQUENCE_SURROUNDED_BY_WHITESPACE"],
			"postprocess": (d) => d[0],
		},
	],
	ParserStart: "CLAUSEWITZ_FORMAT",
};
