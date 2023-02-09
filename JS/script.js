import * as functionsModule from './functions.js';

const userName = document.querySelector('#user-name');
const submitBtn = document.querySelector('#take-user-name-btn');
const gameLog = document.querySelector('#game-log');
const playerStats = document.querySelector('#player-stats');
playerStats.className = 'hidden';
const potionChestMonsterBtn = document.querySelector(
  '#potion-chest-monster-btn'
);
const alertPrompt = document.querySelector('#alert-prompt');
const newGameBtn = document.querySelector('#new-game-btn');
newGameBtn.style.display = 'none';
const generateValue = document.querySelector('#generate-value-btn');
potionChestMonsterBtn.disabled = true;
generateValue.disabled = true;
const score = document.querySelector('#score');
score.style.display = 'none';

const gameLogUI = document.querySelector('#game-log-ui');
gameLogUI.className = 'hidden';

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
const items = ['🧪', '💼', '👾'];
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
let buttonPressCounter = 0;

const submitContainer = document.querySelector('#submitContainer');
const mainButtonsContainer = document.querySelector('#main-buttons-container');
const alertPromptContainer = document.querySelector('#alert-prompt-container');
const playerStatsContainer = document.querySelector('#player-stats-container');
const gameLogContainer = document.querySelector('#game-log-container');
const newGameContainer = document.querySelector('#new-game-container');

mainButtonsContainer.style.display = 'none';
alertPromptContainer.style.display = 'none';
playerStatsContainer.style.display = 'none';
gameLogContainer.style.display = 'none';
newGameContainer.style.display = 'none';

submitBtn.addEventListener('click', () => {
  if (userName.value === '') {
    alertPromptContainer.style.display = 'flex';
    alertPrompt.style.display = 'flex';
    alertPrompt.textContent = 'Enter you username before playing the game!';
    setTimeout(() => {
      alertPromptContainer.style.display = 'none';
    }, 2000);
  } else {
    alertPrompt.textContent = `Work done🥳, ${userName.value}! Adventure✨ time!`;
    playerStats.className = 'flex flex-col gap-2 sm:flex-row sm:gap-6';
    score.style.display = 'flex';
    userName.style.display = 'none';
    submitBtn.style.display = 'none';
    potionChestMonsterBtn.disabled = false;
    generateValue.disabled = true;
    mainButtonsContainer.style.display = 'flex';
    alertPromptContainer.style.display = 'flex';
    playerStatsContainer.style.display = 'flex';
    submitContainer.style.display = 'none';
    setTimeout(() => {
      alertPromptContainer.style.display = 'none';
    }, 2000);
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
      submitBtn.click();
    }
  }
});

potionChestMonsterBtn.addEventListener('click', () => {
  gameLogUI.className =
    'shadow-2xl bg-slate-500 text-2xl sm:text-4xl w-full flex items-center rounded justify-center py-2 font-bold text-white';
  if (potionChestMonsterBtn.disabled === false) {
    potionChestMonsterBtn.disabled = true;
  } else {
    potionChestMonsterBtn.disabled = false;
  }
  generateValue.disabled = false;
  outputPotionChestMonster();
  buttonPressCounter++;
  gameLogContainer.style.display = 'flex';
});

generateValue.addEventListener('click', () => {
  if (buttonPressCounter > 4) {
    buttonPressCounter = 0;
    while (gameLog.firstChild) {
      gameLog.removeChild(gameLog.firstChild);
    }
  }
  if (generateValue.disabled === true) {
    generateValue.disabled === false;
  } else {
    generateValue.disabled = true;
  }
  potionChestMonsterBtn.disabled = false;
  outputPotionChestMonsterValues();

  if (currentHealth <= 0) {
    mainButtonsContainer.style.display = 'none';
    newGameContainer.style.display = 'flex';
    newGameBtn.disabled = false;
    console.log(`${userName.value}, you lost the game! Your ❤️ is 0!`);

    alertPromptContainer.style.display = 'flex';

    alertPrompt.textContent = `${userName.value}, you are ☠️! Your ❤️ is 0!`;

    generateValue.style.display = 'none';
    potionChestMonsterBtn.style.display = 'none';
    newGameBtn.style.display = 'inline';
    functionsModule.updateElementText('player-health', 0);
    generateValue.disabled = true;
    potionChestMonsterBtn.disabled = true;
    if (totalCoins >= lifeCost) {
      newGameBtn.disabled = true;
      submitBtn.disabled = true;
      newGameBtn.style.display = 'none';
      counter++;
      alertPrompt.innerHTML += `You have ${totalCoins}💸. Do you want a extra ❤️ for ${lifeCost}💸?<br>`;
      newGameContainer.style.display = 'none';
      if (counter >= 5) {
        alertPrompt.innerHTML +=
          'Every time after your fifth ☠️ your life cost +10🪙 for extra ❤️!<br>';
      }
      const buttonNo = document.createElement('button');
      buttonNo.textContent = 'NO';
      buttonNo.className =
        'text-xl sm:text-3xl bg-red-500 hover:bg-red-800 text-white font-bold py-2 px-4 border-b-4 border-red-700 hover:border-red-900 rounded';
      buttonNo.addEventListener('click', () => {
        gameLogUI.className = 'hidden';
        playerStatsContainer.style.display = 'none';
        gameLogContainer.style.display = 'none';
        console.log('The game will restart after 3 seconds!');
        alertPrompt.innerHTML = `Hey, ${userName.value}. The game will restart after 3 seconds!`;
        const alertPromptDiv = document.querySelector('#alert-prompt-div');
        buttonYes.style.display = 'none';
        buttonYes.disabled = true;
        alertPromptDiv.removeChild(buttonNo);
        potionChestMonsterBtn.disabled = false;
        alertPromptContainer.style.display = 'flex';
        setTimeout(() => {
          location.reload();
        }, 3000);
      });
      document.addEventListener('keydown', (event) => {
        if (event.code === 'KeyN') {
          const alertPromptDiv = document.querySelector('#alert-prompt-div');
          buttonNo.click();
          buttonNo.disabled = true;
          alertPromptDiv.removeChild(buttonNo);
          alertPromptDiv.removeChild(buttonYes);
        }
      });
      const buttonYes = document.createElement('button');
      buttonYes.textContent = 'YES';
      buttonYes.className =
        'text-xl sm:text-3xl bg-green-500 hover:bg-green-800 text-white font-bold py-2 px-4 border-b-4 border-green-700 hover:border-green-900 rounded';
      buttonYes.addEventListener('click', () => {
        mainButtonsContainer.style.display = 'flex';
        gameLogContainer.style.display = 'none';
        const alertPromptDiv = document.querySelector('#alert-prompt-div');
        buttonYes.style.display = 'none';
        buttonYes.disabled = true;
        alertPromptDiv.removeChild(buttonNo);
        potionChestMonsterBtn.disabled = false;
        gameLog.innerHTML = '';
        if (totalCoins >= lifeCost) {
          totalCoins -= lifeCost;
          if (counter > 5) {
            lifeCost += 10;
          }

          alertPrompt.textContent = `${userName.value}, you used extra ❤️!`;
          functionsModule.updateElementText('player-total-coins', totalCoins);
          newGameBtn.style.display = 'none';
          generateValue.style.display = 'inline';
          potionChestMonsterBtn.style.display = 'inline';
          currentHealth = 100;
          functionsModule.updateElementText('player-health', currentHealth);
          functionsModule.updateElementText('player-total-coins', totalCoins);
        }
      });
      document.addEventListener('keydown', (event) => {
        if (event.code === 'KeyY') {
          buttonYes.click();
        }
      });

      const parentElement = document.querySelector('#alert-prompt-div');
      parentElement.appendChild(buttonYes);
      parentElement.appendChild(buttonNo);
      functionsModule.updateElementText('player-total-coins', totalCoins);
    }
  }
});

function resetGame() {
  gameLogUI.className = 'hidden';
  playerStatsContainer.style.display = 'none';
  gameLogContainer.style.display = 'none';
  newGameContainer.style.display = 'none';
  console.log('The game will restart after 3 seconds!');
  alertPrompt.innerHTML = `Hey, ${userName.value}. The game will restart after 3 seconds!`;
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
      functionsModule.updateGameLog(`Great, it's a ${items[0]}!`);
      break;
    case 1: //chest
      functionsModule.updateGameLog(`Congrats, you won a ${items[1]}!`);
      break;
    case 2: //monster
      functionsModule.updateGameLog(`Unfortunately, it's a ${items[2]}!`);
      break;
  }
}
function outputPotionChestMonsterValues() {
  randomEvent = newNum;
  switch (randomEvent) {
    case 0: //potion
      let healthValue = Math.floor(Math.random() * 26);
      if (healthValue === 0) {
        console.log(`This 🧪 is empty!`);
        functionsModule.updateGameLog(`This 🧪 is empty!`);
      } else {
        if (currentHealth + healthValue > 100) {
          if (currentHealth + healthValue >= 100) {
            console.log(`You gain ${healthValue}! You are at max ❤️!`);
            functionsModule.updateGameLog(
              `You gain ${100 - currentHealth}! You are at max ❤️!`
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
        console.log(`You found: ${coinsInChest}💸!`);
        functionsModule.updateGameLog(`The 💼 is empty!`);
        functionsModule.updateElementText('player-chests', chestCounter);
      } else {
        console.log(`You found: ${coinsInChest}💸!`);
        functionsModule.updateGameLog(`You found: ${coinsInChest}💸!`);
        chestCounter++;
        functionsModule.updateElementText('player-chests', chestCounter);
        functionsModule.updateElementText('player-total-coins', totalCoins);
      }
      break;
    case 2: // monsters
      let randomMonster = functionsModule.pickRandomElement(monsters);
      let monsterDmg = Math.floor(Math.random() * 56); // 0 to 40
      if (monsterDmg === 0) {
        console.log(`The beast ${randomMonster} missed and you escape!`);
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
        scorePoints += Math.floor(Math.random() * 7 + 1);
        functionsModule.updateElementText('score-span', scorePoints);
        functionsModule.updateElementText('player-monster-kills', killsCounter);
        if (currentHealth > 0) {
          console.log(`Your current health is ${currentHealth}!`);
          functionsModule.updateElementText('player-health', currentHealth);
        }
      }
      break;
  }
}
newGameBtn.addEventListener('click', resetGame);

const redirectBtn = document.querySelector('#redirect-btn');
redirectBtn.addEventListener('click', function () {
  setTimeout(() => {
    window.open('https://github.com/oldbasic/TreasurePotions-Beasts', '_blank');
  }, 1000);
});
