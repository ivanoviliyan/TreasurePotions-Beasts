const userName = document.querySelector('#user-name');
const takeUserNameBtn = document.querySelector('#take-user-name-btn');
const gameLog = document.querySelector('#game-log');
const userNameLabel = document.querySelector('#user-name-label');
const potionChestMonsterBtn = document.querySelector(
	'#potion-chest-monster-btn'
);
const alertPrompt = document.querySelector('#alert-prompt');
alertPrompt.style.display = 'none';
const newGameBtn = document.querySelector('#new-game-btn');
newGameBtn.style.display = 'none';

const generateValue = document.querySelector('#generate-value-btn');


takeUserNameBtn.addEventListener('click', () => {
	if (userName.value === '') {
		alertPrompt.style.display = 'block';
		alertPrompt.textContent = 'Manqk ti ibesh li sa? Napishi si imeto!';
		setTimeout(() => {
			alertPrompt.style.display = 'none';
			alertPrompt.textContent = '';
		}, 2000);
	} else {
		userNameLabel.style.display = 'none';
		userName.style.display = 'none';
		takeUserNameBtn.style.display = 'none';
	}
	console.log(`Work done ${userName.value}`);
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
	// adding if check for .value="";
	if (userName.value === '') {
		console.log(`Enter you username before playing the game!`);
	} else{
		let newRandomEvent = Math.floor(Math.random() * 3);
	randomEvent = newRandomEvent;
	switch (newRandomEvent) {
		case 0:
			//console.log(items[0]); //potion
			console.log(`Great, it's a ${items[0]}!`);
			break;
		case 1:
			//console.log(items[1]); //chest
			console.log(`Congrats, you won a ${items[1]}!`);
			break;
		case 2:
			//console.log(items[2]); //monster
			console.log(`Unfortunately, it's a ${items[2]}!`);
			break;
	}
	}
});
let currentHealth = defaultHealth;
generateValue.addEventListener('click', () => {
	switch (randomEvent) {
		case 0: //potion
			let healthValue = Math.floor(Math.random() * 51);
			if (healthValue === 0) {
				console.log(`This potion is empty ${healthValue}`);
			} else {
				if (currentHealth + healthValue > 100) {
					currentHealth = 100;
					console.log(`You are at max health!`);
				} else {
					currentHealth += healthValue;
					console.log(
						`You healed by ${healthValue} and your health is ${currentHealth}!`
					);
				}
			}
			break;
		case 1: //chest
			let coinsInChest = Math.floor(Math.random() * 11);
			if (coinsInChest === 0) {
				//Tvoq red|console.log(`This chest is empty ${coinsInChest}`);
				console.log(`You generated: ${coinsInChest} coins!`);
				coins += coinsInChest;
				console.log(`Total coins are: ${coins} coins!`);
			} else {
				doubleOrNothing(coinsInChest);
				console.log(`You generated: ${coinsInChest} coins!`);
				coins += coinsInChest;
				console.log(`Total coins are: ${coins} coins!`);
			}
			break;
		case 2: // monster
			let randomMonster = pickRandomElement(monsters);
			let monsterDmg = Math.floor(Math.random() * 41);
			if (monsterDmg === 0) {
				console.log(`The monster ${randomMonster} missed and you escape!`);
			} else {
				console.log(
					`The monster ${randomMonster} take you ${monsterDmg} damage!`
				);

				currentHealth -= monsterDmg;
				if (currentHealth > 0) { //This
					console.log(`Your current health is ${currentHealth}!`);
				}
			}
			break;
	}
	if (currentHealth <= 0) { //This
		console.log(`${userName.value}, you lost the game! Your health is 0!`);
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
	setTimeout(() => {
		location.reload();
	}, 3000);
})
//Double or nothing
function doubleOrNothing(){
	let dblOrNthng = Math.floor(Math.random()*2); // Or >= 0.5
	if (dblOrNthng === 0) {
  		return bet * 2;
	} else {
  		return 0;
	}
}
//console.log(doubleOrNothing(100));