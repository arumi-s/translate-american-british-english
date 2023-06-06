export function everyLowerCase(text: string) {
	const length = text.length;
	for (let index = 0; index < length; index++) {
		const code = text.charCodeAt(index);
		if (code >= 65 && code <= 90) return false;
	}
	return true;
}

export function everyUpperCase(text: string) {
	const length = text.length;
	for (let index = 0; index < length; index++) {
		const code = text.charCodeAt(index);
		if (code >= 97 && code <= 122) return false;
	}
	return true;
}
