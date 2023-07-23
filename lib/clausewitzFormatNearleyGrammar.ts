import nearley from "nearley";
import {clausewitzFormatNearleyCompiledRules} from "./clausewitzFormatNearleyCompiledRules.js";

export const clausewitzFormatNearleyGrammar = nearley.Grammar.fromCompiled(
	clausewitzFormatNearleyCompiledRules,
);
