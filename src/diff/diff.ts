/**
 * Modified From: https://github.com/kpdecker/jsdiff
 * @license BSD
 * Copyright (c) 2009-2015, Kevin Decker <kpdecker@gmail.com>
 */

import { Change, Path, Component } from './interface';

export function diff(o: string, n: string): Change[] {
	const oldString = o;
	const newString = n;

	const newLen = newString.length;
	const oldLen = oldString.length;
	let editLength = 1;
	const maxEditLength = newLen + oldLen;

	const bestPath: Path[] = [{ newPos: -1, components: [] }];

	// Seed editLength = 0, i.e. the content starts with the same values
	const oldPos = extractCommon(bestPath[0], newString, oldString, 0);
	if (bestPath[0].newPos + 1 >= newLen && oldPos + 1 >= oldLen) {
		// Identity per the equality and tokenizer
		return [{ newValue: newString, oldValue: oldString, added: false, removed: false }];
	}

	while (editLength <= maxEditLength) {
		// Checks all permutations of a given edit length for acceptance.
		for (let diagonalPath = -1 * editLength; diagonalPath <= editLength; diagonalPath += 2) {
			let basePath: Path;
			const addPath = bestPath[diagonalPath - 1];
			const removePath = bestPath[diagonalPath + 1];
			let oldPos = (removePath ? removePath.newPos : 0) - diagonalPath;
			if (addPath) {
				// No one else is going to attempt to use this value, clear it
				bestPath[diagonalPath - 1] = undefined!;
			}

			const canAdd = addPath && addPath.newPos + 1 < newLen;
			const canRemove = removePath && 0 <= oldPos && oldPos < oldLen;
			if (!canAdd && !canRemove) {
				// If this path is a terminal then prune
				bestPath[diagonalPath] = undefined!;
				continue;
			}

			// Select the diagonal that we want to branch from. We select the prior
			// path whose position in the new string is the farthest from the origin
			// and does not pass the bounds of the diff graph
			if (!canAdd || (canRemove && addPath.newPos < removePath.newPos)) {
				basePath = { newPos: removePath.newPos, components: removePath.components.slice(0) };
				pushComponent(basePath.components, false, true);
			} else {
				basePath = addPath; // No need to clone, we've pulled it from the list
				basePath.newPos++;
				pushComponent(basePath.components, true, false);
			}

			oldPos = extractCommon(basePath, newString, oldString, diagonalPath);

			// If we have hit the end of both strings, then we are done
			if (basePath.newPos + 1 >= newLen && oldPos + 1 >= oldLen) {
				return buildValues(basePath.components, newString, oldString);
			} else {
				// Otherwise track this path as a potential candidate and continue.
				bestPath[diagonalPath] = basePath;
			}
		}

		editLength++;
	}

	return [];
}

function pushComponent(components: Component[], added: boolean, removed: boolean) {
	const last = components[components.length - 1];
	const newCount = added ? 1 : 0;
	const oldCount = removed ? 1 : 0;

	if (last && last.added === added && last.removed === removed) {
		components[components.length - 1] = {
			newCount: last.newCount + newCount,
			oldCount: last.oldCount + oldCount,
			added,
			removed,
		};
	} else if (last && last.added && removed) {
		components[components.length - 1] = {
			newCount: last.newCount + newCount,
			oldCount: last.oldCount + oldCount,
			added: true,
			removed: true,
		};
	} else {
		components.push({
			newCount,
			oldCount,
			added,
			removed,
		});
	}
}

function extractCommon(basePath: Path, newString: string, oldString: string, diagonalPath: number) {
	const newLen = newString.length;
	const oldLen = oldString.length;
	let newPos = basePath.newPos;
	let oldPos = newPos - diagonalPath;
	let commonCount = 0;

	while (newPos + 1 < newLen && oldPos + 1 < oldLen && equals(newString.charAt(newPos + 1), oldString.charAt(oldPos + 1))) {
		newPos++;
		oldPos++;
		commonCount++;
	}

	if (commonCount) {
		basePath.components.push({
			newCount: commonCount,
			oldCount: commonCount,
			removed: false,
			added: false,
		});
	}

	basePath.newPos = newPos;
	return oldPos;
}

function equals(left: string, right: string) {
	return left === right || left.toLowerCase() === right.toLowerCase();
}

function buildValues(components: Component[], newString: string, oldString: string): Change[] {
	const changes: Change[] = [];
	let last: Change | undefined = undefined;
	let newPos = 0;
	let oldPos = 0;

	for (const component of components) {
		const change: Change = {
			newValue: newString.substring(newPos, newPos + component.newCount),
			oldValue: oldString.substring(oldPos, oldPos + component.oldCount),
			added: component.added,
			removed: component.removed,
		};

		changes.push(change);

		if (last) {
			if (last.oldValue.length) {
				const lastEnd = last.oldValue.charAt(last.oldValue.length - 1);
				while (change.oldValue.length && equals(lastEnd, change.oldValue[0])) {
					last.oldValue += change.oldValue.charAt(0);
					change.oldValue = change.oldValue.substring(1);
				}
			}
			if (last.newValue.length) {
				const lastEnd = last.newValue.charAt(last.newValue.length - 1);
				while (change.newValue.length && equals(lastEnd, change.newValue[0])) {
					last.newValue += change.newValue.charAt(0);
					change.newValue = change.newValue.substring(1);
				}
			}
		}

		newPos += component.newCount;
		oldPos += component.oldCount;
		last = change;
	}

	return changes;
}
