const gameLog = document.querySelector('#game-log');
export function updateElementText(elementId, textValue) {
	const element = document.querySelector(`#${elementId}`);
	element.textContent = `${textValue}`;
}
export function updateGameLog(text) {
	const element = document.createElement('li');
	const textnode = document.createTextNode(`${text}`);
	element.appendChild(textnode);
	gameLog.appendChild(element);
}
export function pickRandomElement(arr) {
	return arr[Math.floor(Math.random() * arr.length)];
}
