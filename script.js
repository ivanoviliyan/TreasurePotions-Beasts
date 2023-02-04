import * as functionsModule from './functions.js';

const userName = document.querySelector('#user-name');
const takeUserNameBtn = document.querySelector('#take-user-name-btn');
const welcomeMsg = document.querySelector('#welcome-msg');
const playerStats = document.querySelector('#player-stats');
playerStats.style.display = 'none';
const userNameLabel = document.querySelector('#user-name-label');
const potionChestMonsterBtn = document.querySelector(
	'#potion-chest-monster-btn'
);
const alertPrompt = document.querySelector('#alert-prompt');
alertPrompt.style.display = 'none';
const newGameBtn = document.querySelector('#new-game-btn');
newGameBtn.style.display = 'none';
const generateValue = document.querySelector('#generate-value-btn');
potionChestMonsterBtn.disabled = true;
generateValue.disabled = true;
const score = document.querySelector('#score');
score.style.display = 'none';

let newNum = 0;
let defaultHealth = 100;
let currentHealth = defaultHealth;
let totalCoins = 0;
let chestCounter = 0;
let killsCounter = 0;
let scorePoints = 0;
let lifeCost = 25;
let counter = 1;
let randomEvent;
const items = ['potion', 'chest', 'monster'];
const monsters = [
	'Dracula 🧛‍♂️',
	'Frankenstein 🧟‍♂️',
	'Werewolf 🐺',
	'Mummy 💀',
	'Zombie 🧟‍♀️',
	'Gargoyle 🗿',
	'Skeleton 💀',
	'Vampire 🧛‍♂️',
	'Ghost 👻',
	'Yeti 🐻',
];

takeUserNameBtn.addEventListener('click', () => {
	if (userName.value === '') {
		alertPrompt.style.display = 'block';
		alertPrompt.textContent = 'Enter you username before playing the game!';
		setTimeout(() => {
			alertPrompt.style.display = 'none';
			alertPrompt.textContent = '';
		}, 2000);
	} else {
		playerStats.style.display = 'block';
		score.style.display = 'block';
		userNameLabel.style.display = 'none';
		userName.style.display = 'none';
		takeUserNameBtn.style.display = 'none';
		welcomeMsg.innerHTML = `Work done ${userName.value}! Adventure time!`;
		potionChestMonsterBtn.disabled = false;
		generateValue.disabled = true;
	}
});

document.addEventListener('keydown', (event) => {
	if (event.code === 'ArrowUp') {
		potionChestMonsterBtn.click();
	} else if (event.code === 'ArrowDown') {
		generateValue.click();
	} else if (event.code === 'Enter') {
		if (newGameBtn.style.display !== 'none') {
			newGameBtn.click();
		} else {
			takeUserNameBtn.click();
		}
	}
});

potionChestMonsterBtn.addEventListener('click', () => {
	if (potionChestMonsterBtn.disabled === false) {
		potionChestMonsterBtn.disabled = true;
	} else {
		potionChestMonsterBtn.disabled = false;
	}
	generateValue.disabled = false;
	outputPotionChestMonster();
});

generateValue.addEventListener('click', () => {
	if (generateValue.disabled === true) {
		generateValue.disabled === false;
	} else {
		generateValue.disabled = true;
	}
	potionChestMonsterBtn.disabled = false;
	outputPotionChestMonsterValues();

	if (currentHealth <= 0) {
		console.log(`${userName.value}, you lost the game! Your health is 0!`);
		welcomeMsg.innerHTML = `${userName.value}, you died! Your health is 0! <br>`;
		generateValue.style.display = 'none';
		potionChestMonsterBtn.style.display = 'none';
		newGameBtn.style.display = 'inline';
		newGameBtn.style.display = 'inllie';
		functionsModule.updateElementText('player-health', 0);
		generateValue.disabled = true;
		potionChestMonsterBtn.disabled = true;
		functionsModule.updateElementText('player-total-coins', totalCoins);
		if (totalCoins >= lifeCost) {
			counter++;
			welcomeMsg.innerHTML += `You have ${totalCoins} coins. Do you want a extra live for ${lifeCost} coins?<br>`;
			const buttonYes = document.createElement('button');
			buttonYes.textContent = 'YES';
			buttonYes.addEventListener('click', buttonYesLogic);
			document.addEventListener('keydown', (event) => {
				if (event.code === 'KeyY') {
					buttonYes.click();
					buttonYes.style.display = 'none';
					buttonYes.disabled = true;
					buttonNo.disabled = true;
				}
			});
			const buttonNo = document.createElement('button');
			buttonNo.textContent = 'NO';
			buttonNo.addEventListener('click', resetGame);
			document.addEventListener('keydown', (event) => {
				if (event.code === 'KeyN') {
					buttonNo.click();
					buttonNo.disabled = true;
				}
			});
			const parentElement = document.querySelector('#welcome-msg');
			parentElement.appendChild(buttonYes);
			parentElement.appendChild(buttonNo);
			functionsModule.updateElementText('player-total-coins', totalCoins);
		}
	}
});

function resetGame() {
	console.log('The game will restart after 3 seconds!');
	welcomeMsg.innerHTML = `Hey, ${userName.value}. The game will restart after 3 seconds!`;
	setTimeout(() => {
		location.reload();
	}, 3000);
}

function outputPotionChestMonster() {
	let newRandomEvent = Math.floor(Math.random() * 3);
	newNum = newRandomEvent;
	randomEvent = newRandomEvent;
	switch (newRandomEvent) {
		case 0: //potion
			functionsModule.updateGameLog(`Great, it's a ${items[0]}`);
			break;
		case 1: //chest
			functionsModule.updateGameLog(`Congrats, you won a ${items[1]}`);
			break;
		case 2: //monster
			functionsModule.updateGameLog(`Unfortunately, it's a ${items[2]}`);
			break;
	}
}
function outputPotionChestMonsterValues() {
	randomEvent = newNum;
	switch (randomEvent) {
		case 0: //potion
			let healthValue = Math.floor(Math.random() * 51);
			if (healthValue === 0) {
				console.log(`This potion is empty!`);
				functionsModule.updateGameLog(`This potion is empty!`);
			} else {
				if (currentHealth + healthValue > 100) {
					if (currentHealth + healthValue >= 100) {
						console.log(`You gain ${healthValue}! You are at max health!`);
						functionsModule.updateGameLog(
							`You gain ${100 - currentHealth}! You are at max health!`
						);
						currentHealth = 100;
					}
					functionsModule.updateElementText('player-health', 100);
				} else {
					currentHealth += healthValue;
					console.log(
						`You healed by ${healthValue} and your health is ${currentHealth}!`
					);
					functionsModule.updateGameLog(`You healed by ${healthValue}!`);
					functionsModule.updateElementText('player-health', currentHealth);
				}
			}
			break;
		case 1: //chest
			let coinsInChest = Math.floor(Math.random() * 11);
			totalCoins += coinsInChest;
			if (coinsInChest === 0) {
				console.log(`You found: ${coinsInChest} coins!`);
				functionsModule.updateGameLog(`The chest is empty!`);
				functionsModule.updateElementText('player-chests', chestCounter);
			} else {
				console.log(`You found: ${coinsInChest} coins!`);
				functionsModule.updateGameLog(`You found: ${coinsInChest} coins!`);
				chestCounter++;
				functionsModule.updateElementText('player-chests', chestCounter);
				functionsModule.updateElementText('player-total-coins', totalCoins);
			}
			break;
		case 2: // monsters
			let randomMonster = functionsModule.pickRandomElement(monsters);
			let monsterDmg = Math.floor(Math.random() * 51 + 10); // 10 to 60
			if (monsterDmg === 0) {
				console.log(`The monster ${randomMonster} missed and you escape!`);
				functionsModule.updateGameLog(
					`${randomMonster} missed and you dodge the attack!`
				);
				killsCounter++;
				functionsModule.updateElementText('player-monster-kills', killsCounter);
			} else {
				console.log(`${randomMonster} take you ${monsterDmg} damage!`);
				functionsModule.updateGameLog(
					`${randomMonster} take you ${monsterDmg} damage!`
				);
				currentHealth -= monsterDmg;
				killsCounter++;
				scorePoints += Math.floor(Math.random() * 5 + 1);
				functionsModule.updateElementText('score-span', scorePoints);
				functionsModule.updateElementText('player-monster-kills', killsCounter);
				if (currentHealth > 0) {
					console.log(`Your current health is ${currentHealth}!`);
					functionsModule.updateElementText('player-health', currentHealth);
				}
			}
			break;
	}
	const items = gameLog.getElementsByTagName('li');
	if (items.length >= 11) {
		while (gameLog.firstChild) {
			gameLog.removeChild(gameLog.firstChild);
		}
	}
}
function buttonYesLogic() {
	potionChestMonsterBtn.disabled = false;
	gameLog.innerHTML = '';
	if (totalCoins >= lifeCost) {
		totalCoins -= lifeCost;
		if (counter > 5) {
			lifeCost *= 2;
		}
		welcomeMsg.textContent = `${userName.value} you used extra life!`;
		functionsModule.updateElementText('player-total-coins', totalCoins);
		newGameBtn.style.display = 'none';
		generateValue.style.display = 'inline';
		potionChestMonsterBtn.style.display = 'inline';
		currentHealth = 100;
		functionsModule.updateElementText('player-health', currentHealth);
		functionsModule.updateElementText('player-total-coins', totalCoins);
	}
}

newGameBtn.addEventListener('click', resetGame);
