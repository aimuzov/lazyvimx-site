import { reactive } from "vue";

// Общая шина контроллера и статуслайна: слоты layout'а стоят рядом,
// props между ними не протянуть.
export const vim = reactive({
	// NORMAL или COMMAND; VISUAL статуслайн выводит сам из выделения.
	mode: "NORMAL",
	// Набранное, но ещё не разрешённое — showcmd в правом углу.
	count: "",
	pending: "",
	// Строка сообщений, как у vim под статуслайном.
	message: "",
	// Шпаргалка по всем клавишам: её открывают и «?», и кнопка в полосе.
	sheet: false,
});

let timer = 0;

export function setMessage(text) {
	vim.message = text;

	clearTimeout(timer);
	timer = setTimeout(() => (vim.message = ""), 4000);
}

export function clearMessage() {
	clearTimeout(timer);
	vim.message = "";
}
