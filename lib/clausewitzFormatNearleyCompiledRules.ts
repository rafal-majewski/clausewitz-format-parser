import nearley from "nearley";
import moo from "moo";

const lexer = moo.compile({
	AT_LEAST_ONE_IGNORED_CHARACTER: {
		match:
			/(?:#[^\n]*\n(?:[\s]*(?:#[^\n]*\n))*[\s]*)|(?:[\s]+(?:#[^\n]*\n)?(?:[\s]*(?:#[^\n]*\n)?)*[\s]*)/,
		lineBreaks: true,
	},
	CURLY_BRACE_OPEN: "{",
	CURLY_BRACE_CLOSE: "}",
	SCALAR: /(?:[^\s{}#"]+)|(?:"[^"]*")/,
	FINAL_COMMENT: {match: /(?:#[^\n]*)/, lineBreaks: true},
});

export const clausewitzFormatNearleyCompiledRules: nearley.CompiledRules = {
	Lexer: lexer,
	ParserRules: [
		{
			"name": "CLAUSEWITZ_FORMAT$ebnf$1",
			"symbols": [{type: "FINAL_COMMENT"}],
			"postprocess": (d) => d[0],
		},
		{
			"name": "CLAUSEWITZ_FORMAT$ebnf$1",
			"symbols": [],
			"postprocess": () => null,
		},
		{
			"name": "CLAUSEWITZ_FORMAT",
			"symbols": ["OBJECT_CONTENT", "CLAUSEWITZ_FORMAT$ebnf$1"],
			"postprocess": (d) => d[0],
		},
		{
			"name": "VALUE_SEQUENCE_SURROUNDED_BY_NOT_IMPORTANT$ebnf$1",
			"symbols": [{type: "AT_LEAST_ONE_IGNORED_CHARACTER"}],
			"postprocess": (d) => d[0],
		},
		{
			"name": "VALUE_SEQUENCE_SURROUNDED_BY_NOT_IMPORTANT$ebnf$1",
			"symbols": [],
			"postprocess": () => null,
		},
		{
			"name": "VALUE_SEQUENCE_SURROUNDED_BY_NOT_IMPORTANT$ebnf$2",
			"symbols": [{type: "AT_LEAST_ONE_IGNORED_CHARACTER"}],
			"postprocess": (d) => d[0],
		},
		{
			"name": "VALUE_SEQUENCE_SURROUNDED_BY_NOT_IMPORTANT$ebnf$2",
			"symbols": [],
			"postprocess": () => null,
		},
		{
			"name": "VALUE_SEQUENCE_SURROUNDED_BY_NOT_IMPORTANT",
			"symbols": [
				"VALUE_SEQUENCE_SURROUNDED_BY_NOT_IMPORTANT$ebnf$1",
				"VALUE_SEQUENCE",
				"VALUE_SEQUENCE_SURROUNDED_BY_NOT_IMPORTANT$ebnf$2",
			],
			"postprocess": (d) => d[1],
		},
		{
			"name": "VALUE_SEQUENCE$ebnf$1",
			"symbols": ["VALUE_SEQUENCE_TAIL"],
			"postprocess": (d) => d[0],
		},
		{
			"name": "VALUE_SEQUENCE$ebnf$1",
			"symbols": [],
			"postprocess": () => null,
		},
		{
			"name": "VALUE_SEQUENCE",
			"symbols": ["VALUE", "VALUE_SEQUENCE$ebnf$1"],
			"postprocess": (d) => [d[0], ...(d[1] ?? [])],
		},
		{
			"name": "VALUE_SEQUENCE_TAIL$ebnf$1",
			"symbols": ["VALUE_SEQUENCE_TAIL"],
			"postprocess": (d) => d[0],
		},
		{
			"name": "VALUE_SEQUENCE_TAIL$ebnf$1",
			"symbols": [],
			"postprocess": () => null,
		},
		{
			"name": "VALUE_SEQUENCE_TAIL",
			"symbols": ["OBJECT", "VALUE_SEQUENCE_TAIL$ebnf$1"],
			"postprocess": (d) => [d[0], ...(d[1] ?? [])],
		},
		{
			"name": "VALUE_SEQUENCE_TAIL$ebnf$2",
			"symbols": ["VALUE_SEQUENCE_TAIL"],
			"postprocess": (d) => d[0],
		},
		{
			"name": "VALUE_SEQUENCE_TAIL$ebnf$2",
			"symbols": [],
			"postprocess": () => null,
		},
		{
			"name": "VALUE_SEQUENCE_TAIL",
			"symbols": [{type: "AT_LEAST_ONE_IGNORED_CHARACTER"}, "VALUE", "VALUE_SEQUENCE_TAIL$ebnf$2"],
			"postprocess": (d) => [d[1], ...(d[2] ?? [])],
		},
		{
			"name": "VALUE",
			"symbols": [{type: "SCALAR"}],
			"postprocess": (d) => d[0].value,
		},
		{"name": "VALUE", "symbols": ["OBJECT"], "postprocess": (d) => d[0]},
		{
			"name": "OBJECT",
			"symbols": [{type: "CURLY_BRACE_OPEN"}, "OBJECT_CONTENT", {type: "CURLY_BRACE_CLOSE"}],
			"postprocess": (d) => d[1],
		},
		{"name": "OBJECT_CONTENT", "symbols": []},
		{
			"name": "OBJECT_CONTENT",
			"symbols": ["VALUE_SEQUENCE_SURROUNDED_BY_NOT_IMPORTANT"],
			"postprocess": (d) => d[0],
		},
		{
			"name": "OBJECT_CONTENT",
			"symbols": [{type: "AT_LEAST_ONE_IGNORED_CHARACTER"}],
			"postprocess": () => [],
		},
	],
	ParserStart: "CLAUSEWITZ_FORMAT",
};
