const userName = document.querySelector('#user-name');
const takeUserNameBtn = document.querySelector('#take-user-name-btn');
const gameLog = document.querySelector('#game-log');
const welcomeMsg = document.querySelector("#welcome-msg");
const playerStats = document.querySelector("#player-stats");
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
		userNameLabel.style.display = 'none';
		userName.style.display = 'none';
		takeUserNameBtn.style.display = 'none';
		welcomeMsg.textContent = `Work done ${userName.value}! Adventure time!`;
		potionChestMonsterBtn.disabled = false;
		generateValue.disabled = true;
	}
});

const monsters = [
	'Dracula 🧛‍♂️',
	"Frankenstein's Monster 🧟‍♂️",
	'Werewolf 🐺',
	'Mummy 💀',
	'Zombie 🧟‍♀️',
	'Gargoyle 🗿',
	'Skeleton 💀',
	'Vampire 🧛‍♂️',
	'Ghost 👻',
	'Yeti 🐻',
];

function pickRandomElement(arr) {
	return arr[Math.floor(Math.random() * arr.length)];
}

let defaultHealth = 100;
// Promqna
let coins= 0;
// Promqna

let randomEvent;
const items = ['potion', 'chest', 'monster'];



potionChestMonsterBtn.addEventListener('click', () => {
	// adding if check for .value=""
	
	if (potionChestMonsterBtn.disabled === false) {
		potionChestMonsterBtn.disabled = true;
	} else{
		potionChestMonsterBtn.disabled = false;
		
	}
	generateValue.disabled = false;
	outputPotionChestMonster();
});
let currentHealth = defaultHealth;
generateValue.addEventListener('click', () => {
	if (generateValue.disabled === true) {
		generateValue.disabled === false;
	} else{
		generateValue.disabled = true;
	}
	potionChestMonsterBtn.disabled = false;
	outputPotionChestMonsterValues();
	// switch (randomEvent) {
	// 	case 0: //potion
	// 		let healthValue = Math.floor(Math.random() * 51);
	// 		if (healthValue === 0) {
	// 			console.log(`This potion is empty!`);
				
	// 		} else {
	// 			if (currentHealth + healthValue > 100) {
	// 				currentHealth = 100;
	// 				if (currentHealth === 100) {
	// 					console.log("You are at max health!");
	// 				} else{
	// 					console.log(`You gain ${healthValue}! You are at max health!`);
	// 				}
	// 			} else {
	// 				currentHealth += healthValue;
	// 				console.log(
	// 					`You healed by ${healthValue} and your health is ${currentHealth}!`
	// 				);
	// 			}
	// 		}
	// 		break;
	// 	case 1: //chest
	// 		let coinsInChest = Math.floor(Math.random() * 11);
	// 		if (coinsInChest === 0) {
	// 			console.log(`You found: ${coinsInChest} coins!`);
	// 			//Да се генерира от бутон
	// 			coins += coinsInChest;
	// 			console.log(`Total coins are: ${coins} coins!`);
	// 		} else {
	// 			//doubleOrNothing(coinsInChest);
	// 			console.log(`You found: ${coinsInChest} coins!`);
	// 			//Да се генерира от бутон
	// 			coins += coinsInChest;
	// 			console.log(`Total coins are: ${coins} coins!`);
	// 		}
	// 		break;
	// 	case 2: // monster
	// 		let randomMonster = pickRandomElement(monsters);
	// 		let monsterDmg = Math.floor(Math.random() * 41);
	// 		if (monsterDmg === 0) {
	// 			console.log(`The monster ${randomMonster} missed and you escape!`);
	// 		} else {
	// 			console.log(
	// 				`The monster ${randomMonster} take you ${monsterDmg} damage!`
	// 			);

	// 			currentHealth -= monsterDmg;
	// 			if (currentHealth > 0) { //This
	// 				console.log(`Your current health is ${currentHealth}!`);
	// 			}
	// 		}
	// 		break;
	// }
	if (currentHealth <= 0) { //This
		console.log(`${userName.value}, you lost the game! Your health is 0!`);
		node = document.createElement("li");
		textnode = document.createTextNode(`${userName.value}, you lost the game! Your health is 0!`);
		node.appendChild(textnode);
		gameLog.appendChild(node);
		let playerHealth = document.querySelector("#player-health");
		playerHealth.textContent = 0;
		welcomeMsg.textContent = `${userName.value}, you lost the game! Your health is 0!`;
		
		generateValue.style.display = 'none';
		potionChestMonsterBtn.style.display = 'none';
		newGameBtn.style.display = 'flex';
		// Promqna
		newGameBtn.style.display = 'flex';
		// Promqna
	}
});


//function thats picks one random element in array

//NewGameBtn functionality
newGameBtn.addEventListener('click', () => {
	
	console.log("The game will restart after 3 seconds!");
	node = document.createElement("li");
		textnode = document.createTextNode(`Hey, ${userName.value}. The game will restart after 3 seconds!`);
		node.appendChild(textnode);
		gameLog.appendChild(node);
	setTimeout(() => {
		location.reload();
	}, 3000);

})

//Double or nothing
// function doubleOrNothing(){
// 	console.log("Do you want to double your coins or lose it.")
// 	let dblOrNthng = Math.floor(Math.random()*2); // Or >= 0.5
// 	let bet = 0;
// 	if (dblOrNthng === 0) {
//   		return bet * 2;
// 	} else {
//   		return 0;
// 	}
// }
//console.log(doubleOrNothing(100));

// let node;
// let textnode;

let newNum = 0;

function outputPotionChestMonster(){
	let newRandomEvent = Math.floor(Math.random() * 3);
	newNum = newRandomEvent;
	randomEvent = newRandomEvent;
	let node;
	let textnode;
	switch (newRandomEvent) {
		case 0: //potion
			node = document.createElement("li");
			textnode = document.createTextNode(`Great, it's a ${items[0]}`);
			node.appendChild(textnode);
			gameLog.appendChild(node);
			break;
		case 1: //chest
			node = document.createElement("li");
			textnode = document.createTextNode(`Congrats, you won a  ${items[1]}`);
			node.appendChild(textnode);
			gameLog.appendChild(node);
			break;
		case 2: //monster
			node = document.createElement("li");
			textnode = document.createTextNode(`Unfortunately, it's a  ${items[2]}`);
			node.appendChild(textnode);
			gameLog.appendChild(node);
			break;
	}
	
}
function outputPotionChestMonsterValues() {
	// let newRandomEvent = Math.floor(Math.random() * 3);
	randomEvent = newNum;
	let node;
	let textnode;
	switch (randomEvent) {
		case 0: //potion
			let healthValue = Math.floor(Math.random() * 51);
			if (healthValue === 0) {
				console.log(`This potion is empty!`);
				node = document.createElement("li");
				textnode = document.createTextNode(`This potion is empty!`);
				node.appendChild(textnode);
				gameLog.appendChild(node);
				
			} else {
				if (currentHealth + healthValue > 100) {
						if ((currentHealth + healthValue) >= 100) {
							console.log(`You gain ${healthValue}! You are at max health!`);
							node = document.createElement("li");
							textnode = document.createTextNode(`You gain ${100 - currentHealth}! You are at max health!`);
							node.appendChild(textnode);
							gameLog.appendChild(node);
							currentHealth = 100;
						}
						let playerHealth = document.querySelector("#player-health");
						playerHealth.textContent = 100;
				} else {
					currentHealth += healthValue;
					console.log(`You healed by ${healthValue} and your health is ${currentHealth}!`);

					node = document.createElement("li");
					textnode = document.createTextNode(`You healed by ${healthValue}!`);
					node.appendChild(textnode);
					gameLog.appendChild(node);
					let playerHealth = document.querySelector("#player-health");
					playerHealth.textContent = `${currentHealth}`;
				}
			}
			break;
		case 1: //chest
			let coinsInChest = Math.floor(Math.random() * 11);
			if (coinsInChest === 0) {
				console.log(`You found: ${coinsInChest} coins!`);
				node = document.createElement("li");
				textnode = document.createTextNode(`The chest is empty!`);
				node.appendChild(textnode);
				gameLog.appendChild(node);

				//Да се генерира от бутон
				// coins += coinsInChest;
				// console.log(`Total coins are: ${coins} coins!`);
			} else {
				//doubleOrNothing(coinsInChest);
				console.log(`You found: ${coinsInChest} coins!`);
				node = document.createElement("li");
				textnode = document.createTextNode(`You found: ${coinsInChest} coins!`);
				node.appendChild(textnode);
				gameLog.appendChild(node);
				
				//Да се генерира от бутон
				// coins += coinsInChest;
				// console.log(`Total coins are: ${coins} coins!`);
			}
			break;
		case 2: // monster
			let randomMonster = pickRandomElement(monsters);
			let monsterDmg = Math.floor(Math.random() * 51 + 10); // 10 to 60
			if (monsterDmg === 0) {
				console.log(`The monster ${randomMonster} missed and you escape!`);
				
				node = document.createElement("li");
				textnode = document.createTextNode(`The monster ${randomMonster} missed and you escape!`);
				node.appendChild(textnode);
				gameLog.appendChild(node);
			
			} else {
				console.log(
					`The monster ${randomMonster} take you ${monsterDmg} damage!`
				);

				node = document.createElement("li");
				textnode = document.createTextNode(`The monster ${randomMonster} take you ${monsterDmg} damage!`);
				node.appendChild(textnode);
				gameLog.appendChild(node);

				currentHealth -= monsterDmg;
				if (currentHealth > 0) { //This
					console.log(`Your current health is ${currentHealth}!`);
					let playerHealth = document.querySelector("#player-health");
					playerHealth.textContent = `${currentHealth}`;
				}
			}
			break;
	}
}
