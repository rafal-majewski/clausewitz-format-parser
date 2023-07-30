import nearley from "nearley";

export const clausewitzFormatNearleyCompiledRules: nearley.CompiledRules = {
	Lexer: undefined,
	ParserRules: [
		{
			"name": "CLAUSEWITZ_FORMAT",
			"symbols": ["OBJECT_CONTENT", "OPTIONAL_FINAL_COMMENT"],
			"postprocess": (d) => d[0],
		},
		{
			"name": "VALUE_SEQUENCE_SURROUNDED_BY_NOT_IMPORTANT",
			"symbols": ["OPTIONAL_NOT_IMPORTANT", "VALUE_SEQUENCE", "OPTIONAL_NOT_IMPORTANT"],
			"postprocess": (d) => d[1],
		},
		{"name": "VALUE_SEQUENCE", "symbols": ["VALUE"], "postprocess": (d) => [d[0]]},
		{"name": "VALUE_SEQUENCE", "symbols": ["VALUE_SEQUENCE_TAIL"], "postprocess": (d) => d[0]},
		{
			"name": "VALUE_SEQUENCE_TAIL",
			"symbols": ["VALUE", "AT_LEAST_ONE_NOT_IMPORTANT", "VALUE_SEQUENCE"],
			"postprocess": (d) => [d[0], ...d[2]],
		},
		{"name": "VALUE", "symbols": ["SCALAR"], "postprocess": (d) => d[0]},
		{"name": "VALUE", "symbols": ["OBJECT"], "postprocess": (d) => d[0]},
		{
			"name": "COMMENT_SEQUENCE_SURROUNDED_BY_WHITESPACE",
			"symbols": ["OPTIONAL_WHITESPACE", "COMMENT_SEQUENCE", "OPTIONAL_WHITESPACE"],
		},
		{"name": "COMMENT_SEQUENCE", "symbols": ["COMMENT_WITH_NEWLINE"]},
		{"name": "COMMENT_SEQUENCE", "symbols": ["COMMENT_SEQUENCE_TAIL"]},
		{
			"name": "COMMENT_SEQUENCE_TAIL",
			"symbols": ["COMMENT_WITH_NEWLINE", "OPTIONAL_WHITESPACE", "COMMENT_SEQUENCE"],
		},
		{"name": "AT_LEAST_ONE_WHITESPACE$ebnf$1", "symbols": [/[\s]/]},
		{
			"name": "AT_LEAST_ONE_WHITESPACE$ebnf$1",
			"symbols": ["AT_LEAST_ONE_WHITESPACE$ebnf$1", /[\s]/],
			"postprocess": function arrpush(d) {
				return d[0].concat([d[1]]);
			},
		},
		{"name": "AT_LEAST_ONE_WHITESPACE", "symbols": ["AT_LEAST_ONE_WHITESPACE$ebnf$1"]},
		{"name": "OPTIONAL_WHITESPACE$ebnf$1", "symbols": []},
		{
			"name": "OPTIONAL_WHITESPACE$ebnf$1",
			"symbols": ["OPTIONAL_WHITESPACE$ebnf$1", /[\s]/],
			"postprocess": function arrpush(d) {
				return d[0].concat([d[1]]);
			},
		},
		{"name": "OPTIONAL_WHITESPACE", "symbols": ["OPTIONAL_WHITESPACE$ebnf$1"]},
		{"name": "AT_LEAST_ONE_NOT_IMPORTANT", "symbols": ["AT_LEAST_ONE_WHITESPACE"]},
		{
			"name": "AT_LEAST_ONE_NOT_IMPORTANT",
			"symbols": ["COMMENT_SEQUENCE_SURROUNDED_BY_WHITESPACE"],
		},
		{"name": "OPTIONAL_NOT_IMPORTANT", "symbols": ["OPTIONAL_WHITESPACE"]},
		{"name": "OPTIONAL_NOT_IMPORTANT", "symbols": ["COMMENT_SEQUENCE_SURROUNDED_BY_WHITESPACE"]},
		{"name": "SCALAR$ebnf$1", "symbols": [/[^\s{}#]/]},
		{
			"name": "SCALAR$ebnf$1",
			"symbols": ["SCALAR$ebnf$1", /[^\s{}#]/],
			"postprocess": function arrpush(d) {
				return d[0].concat([d[1]]);
			},
		},
		{"name": "SCALAR", "symbols": ["SCALAR$ebnf$1"], "postprocess": (d) => d[0].join("")},
		{
			"name": "OBJECT",
			"symbols": [
				{"literal": "{"},
				"OPTIONAL_NOT_IMPORTANT",
				"OBJECT_CONTENT",
				"OPTIONAL_NOT_IMPORTANT",
				{"literal": "}"},
			],
			"postprocess": (d) => d[2],
		},
		{"name": "OBJECT_CONTENT", "symbols": []},
		{
			"name": "OBJECT_CONTENT",
			"symbols": ["VALUE_SEQUENCE_SURROUNDED_BY_NOT_IMPORTANT"],
			"postprocess": (d) => d[0],
		},
		{"name": "OPTIONAL_FINAL_COMMENT", "symbols": []},
		{"name": "OPTIONAL_FINAL_COMMENT", "symbols": ["COMMENT_WITHOUT_NEWLINE"]},
		{
			"name": "COMMENT_WITHOUT_NEWLINE",
			"symbols": [{"literal": "#"}, "ANYTHING_BUT_NEWLINE_OF_ANY_LENGTH"],
		},
		{"name": "COMMENT_WITH_NEWLINE", "symbols": ["COMMENT_WITHOUT_NEWLINE", {"literal": "\n"}]},
		{"name": "ANYTHING_BUT_NEWLINE_OF_ANY_LENGTH$ebnf$1", "symbols": []},
		{
			"name": "ANYTHING_BUT_NEWLINE_OF_ANY_LENGTH$ebnf$1",
			"symbols": ["ANYTHING_BUT_NEWLINE_OF_ANY_LENGTH$ebnf$1", /[^\n]/],
			"postprocess": function arrpush(d) {
				return d[0].concat([d[1]]);
			},
		},
		{
			"name": "ANYTHING_BUT_NEWLINE_OF_ANY_LENGTH",
			"symbols": ["ANYTHING_BUT_NEWLINE_OF_ANY_LENGTH$ebnf$1"],
			"postprocess": (d) => d[0].join(""),
		},
	],
	ParserStart: "CLAUSEWITZ_FORMAT",
};
