// Раскладка меняет символ на клавише, но не саму клавишу: в ЙЦУКЕН под
// Slash приходит «.», под KeyJ — «о». Нажатие даёт двух кандидатов —
// символ раскладки и символ позиции, — а биндинг берёт того, кого знает.

// Позиции, которые не вывести из имени кода: [символ, символ с Shift].
const PUNCT = {
	Slash: ["/", "?"],
	Semicolon: [";", ":"],
	BracketLeft: ["[", "{"],
	BracketRight: ["]", "}"],
	Space: [" ", " "],
};

function qwertyChar(code, shift) {
	if (!code) return null;

	if (code.length === 4 && code.startsWith("Key")) {
		const letter = code[3];
		return shift ? letter.toUpperCase() : letter.toLowerCase();
	}

	// Цифры с Shift дают знаки препинания, свои в каждой раскладке, —
	// угадывать нечем, да и незачем: счётчик читает только цифры.
	if (code.length === 6 && code.startsWith("Digit")) return shift ? null : code[5];

	const pair = PUNCT[code];
	return pair ? pair[shift ? 1 : 0] : null;
}

export function keyCandidates(event) {
	const list = [];

	if (event.key && event.key.length === 1) list.push(event.key);

	const fromCode = qwertyChar(event.code, event.shiftKey);
	if (fromCode && fromCode !== list[0]) list.push(fromCode);

	return list;
}

// Та же проверка, что у VitePress: пока курсор в поле ввода, клавиши
// принадлежат полю, а не навигации.
export function isEditingContent(event) {
	const el = event.target;
	if (!el || !el.tagName) return false;

	return el.isContentEditable || el.tagName === "INPUT" || el.tagName === "SELECT" || el.tagName === "TEXTAREA";
}

// На тачскрине клавиатуры обычно нет, а есть — так хоткеи всё равно
// негде показать.
export function isTouchOnly() {
	return window.matchMedia("(hover: none)").matches;
}
