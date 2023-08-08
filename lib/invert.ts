import type {ClausewitzFormatObject} from "./ClausewitzFormatObject.js";

type Focus = {
	id: string;
	position: FocusPosition;
	prerequisites: {anyOf: Focus[]}[];
	rest: ClausewitzFormatObject;
};

type FocusWithoutRelations = Omit<Focus, "prerequisites" | "position"> & {
	prerequisites: {anyOfIds: Focus["id"][]}[];
	position: FocusPositionWithoutRelations;
};

type FocusPosition = {
	x: number;
	y: number;
	relativeToFocuses: Focus[];
};

type FocusPositionWithoutRelations = Omit<FocusPosition, "relativeToFocuses"> & {
	relativeToFocusIds: Focus["id"][];
};

function extractPrerequisite(parsedPrerequisites: ClausewitzFormatObject): {
	anyOfIds: Focus["id"][];
} {
	const anyOfIds: Focus["id"][] = [];
	for (let i = 0; i < parsedPrerequisites.length; i += 3) {
		const v1 = parsedPrerequisites[i];
		const v2 = parsedPrerequisites[i + 1];
		const v3 = parsedPrerequisites[i + 2];
		if (v1 !== "focus") throw new Error(`Expected "focus" but got "${v1}"`);
		if (v2 !== "=") throw new Error(`Expected "=" after "focus" but got "${v2}"`);
		if (typeof v3 !== "string") throw new Error(`Expected string after "focus =" but got "${v3}"`);
		anyOfIds.push(v3);
	}
	return {anyOfIds};
}

function extractFocus(parsedFocus: ClausewitzFormatObject): FocusWithoutRelations {
	let id: null | string = null;
	let positionX: null | number = null;
	let positionY: null | number = null;
	const prerequisites: {anyOfIds: string[]}[] = [];
	const positionRelativeToFocusIds: Focus["id"][] = [];

	const toOmit = parsedFocus.map(() => false);
	for (let i = 0; i < parsedFocus.length; ++i) {
		const v1 = parsedFocus[i - 1];
		const v2 = parsedFocus[i];
		const v3 = parsedFocus[i + 1];
		const v4 = parsedFocus[i + 2];
		if (v1 === "=") continue;
		if (v2 === "id") {
			if (v3 !== "=") throw new Error(`Expected "=" after "id" but got "${v3}"`);
			if (typeof v4 !== "string") throw new Error(`Expected string after "id =" but got "${v4}"`);
			if (id !== null) throw new Error(`Found multiple "id" in focus`);
			id = v4;
			toOmit[i] = true;
			toOmit[i + 1] = true;
			toOmit[i + 2] = true;
		} else if (v2 === "x") {
			if (v3 !== "=") throw new Error(`Expected "=" after "x" but got "${v3}"`);
			if (typeof v4 !== "string") throw new Error(`Expected string after "x =" but got "${v4}"`);
			const parsedNumber = Number(v4);
			if (Number.isNaN(parsedNumber))
				throw new Error(`Expected number after "x =" but got "${v4}"`);
			if (positionX !== null) throw new Error(`Found multiple "x" in focus`);
			positionX = parsedNumber;
			toOmit[i] = true;
			toOmit[i + 1] = true;
			toOmit[i + 2] = true;
		} else if (v2 === "y") {
			if (v3 !== "=") throw new Error(`Expected "=" after "y" but got "${v3}"`);
			if (typeof v4 !== "string") throw new Error(`Expected string after "y =" but got "${v4}"`);
			const parsedNumber = Number(v4);
			if (Number.isNaN(parsedNumber))
				throw new Error(`Expected number after "y =" but got "${v4}"`);
			if (positionY !== null) throw new Error(`Found multiple "y" in focus`);
			positionY = parsedNumber;
			toOmit[i] = true;
			toOmit[i + 1] = true;
			toOmit[i + 2] = true;
		} else if (v2 === "relative_position_id") {
			if (v3 !== "=") throw new Error(`Expected "=" after "relative_position_id" but got "${v3}"`);
			if (typeof v4 !== "string")
				throw new Error(`Expected string after "relative_position_id =" but got "${v4}"`);
			positionRelativeToFocusIds.push(v4);
			toOmit[i] = true;
			toOmit[i + 1] = true;
			toOmit[i + 2] = true;
		} else if (v2 === "prerequisite") {
			if (v3 !== "=") throw new Error(`Expected "=" after "prerequisite" but got "${v3}"`);
			if (!Array.isArray(v4))
				throw new Error(`Expected array after "prerequisite =" but got "${v4}"`);
			prerequisites.push(extractPrerequisite(v4));
			toOmit[i] = true;
			toOmit[i + 1] = true;
			toOmit[i + 2] = true;
		}
	}
	if (id === null) throw new Error(`Missing "id" in focus`);
	if (positionX === null) throw new Error(`Missing "x" in focus`);
	if (positionY === null) throw new Error(`Missing "y" in focus`);
	const rest = parsedFocus.filter((_, i) => !toOmit[i]);
	const position = {x: positionX, y: positionY, relativeToFocusIds: positionRelativeToFocusIds};
	return {id, position, prerequisites, rest};
}

function invertFocusTree(parsedFocusTree: ClausewitzFormatObject): ClausewitzFormatObject {
	const focuses = new Map<Focus["id"], FocusWithoutRelations>();
	let toOmit = parsedFocusTree.map(() => false);
	for (let i = 0; i < parsedFocusTree.length; ++i) {
		const v1 = parsedFocusTree[i - 1];
		const v2 = parsedFocusTree[i];
		const v3 = parsedFocusTree[i + 1];
		const v4 = parsedFocusTree[i + 2];

		if (v1 === "=" || v2 !== "focus") continue;
		if (v3 !== "=") throw new Error(`Expected "=" after "focus" but got "${v3}"`);
		if (!Array.isArray(v4)) throw new Error(`Expected array after "focus =" but got "${v4}"`);

		const focus = extractFocus(v4);
		if (focuses.has(focus.id)) throw new Error(`Found multiple focuses with id "${focus.id}"`);
		focuses.set(focus.id, focus);
		toOmit[i] = true;
		toOmit[i + 1] = true;
		toOmit[i + 2] = true;
	}

	const invertedFocuses = parsedFocusTree.filter((_, i) => !toOmit[i]);
	return invertedFocuses;
}

export function invert(parsedFocusTreeFileContent: ClausewitzFormatObject): ClausewitzFormatObject {
	let focusTreeSearchResult: null | {
		focusTree: ClausewitzFormatObject;
		focusTreeKeyPosition: number;
		focusTreePosition: number;
	} = null;
	let toOmit = parsedFocusTreeFileContent.map(() => false);
	for (let i = 0; i < parsedFocusTreeFileContent.length; ++i) {
		const v1 = parsedFocusTreeFileContent[i - 1];
		const v2 = parsedFocusTreeFileContent[i];
		const v3 = parsedFocusTreeFileContent[i + 1];
		const v4 = parsedFocusTreeFileContent[i + 2];
		if (v1 === "=" || v2 !== "focus_tree") continue;
		if (v3 !== "=") throw new Error(`Expected "=" after "focus_tree" but got "${v3}"`);
		if (!Array.isArray(v4)) throw new Error(`Expected array after "focus_tree =" but got "${v4}"`);
		if (focusTreeSearchResult !== null) throw new Error(`Found multiple "focus_tree ="`);
		focusTreeSearchResult = {
			focusTree: v4,
			focusTreeKeyPosition: i,
			focusTreePosition: i + 2,
		};
		toOmit[i] = true;
		toOmit[i + 1] = true;
		toOmit[i + 2] = true;
	}
	if (focusTreeSearchResult === null) throw new Error(`Could not find ["focus_tree", "=", [...]]`);
	const invertedFocusTree = invertFocusTree(focusTreeSearchResult.focusTree);
	return [
		...parsedFocusTreeFileContent.filter((_, i) => !toOmit[i]),
		...["focus_tree", "=", invertedFocusTree],
	];
}
