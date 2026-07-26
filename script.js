// Initial Stats
let gold = 500;
let population = 100;
let food = 400;
let army = 30;
let happiness = 70;
let year = 1;

const seaList = [
  "Dolphin", "Whale", "Shark", "Octopus", "Squid", "Jellyfish", "Sea Turtle", "Seal", 
  "Sea Lion", "Walrus", "Starfish", "Seahorse", "Crab", "Lobster", "Shrimp", "Clam", 
  "Oyster", "Mussel", "Scallop", "Sea Urchin", "Sea Cucumber", "Eel", "Stingray", 
  "Manta Ray", "Swordfish", "Tuna", "Salmon", "Clownfish", "Angelfish", "Parrotfish", 
  "Pufferfish", "Moray Eel", "Barracuda", "Blue Tang", "Lionfish", "Grouper", "Cod", 
  "Halibut", "Flounder", "Anchovy", "Sardine", "Herring", "Mackerel", "Flying Fish", 
  "Sea Snake", "Sea Anemone", "Coral", "Krill", "Barnacle", "Spiny Lobster"
];

const unscrambleWords = [
  "apple", "grape", "peach", "melon", "mango", "berry", "lemon", "olive", "guava", "chili",
  "table", "chair", "couch", "shelf", "clock", "brush", "plate", "spoon", "glass", "knife",
  "tiger", "zebra", "horse", "sheep", "goose", "eagle", "snake", "whale", "shark", "otter"
];

// Helper: Pause execution for a specified duration in milliseconds
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// Slowprint implementation for web log
async function slowprint(text, speed = 20) {
  const logWin = document.getElementById("log-window");
  const line = document.createElement("div");
  logWin.appendChild(line);

  for (let i = 0; i < text.length; i++) {
    line.textContent += text[i];
    logWin.scrollTop = logWin.scrollHeight;
    await sleep(speed);
  }
}

function log(text) {
  const logWin = document.getElementById("log-window");
  logWin.innerText += text + "\n";
  logWin.scrollTop = logWin.scrollHeight;
}

function logSeparator() {
  log("\n==================================================");
}

function updateStats() {
  document.getElementById("stat-year").innerText = year;
  document.getElementById("stat-gold").innerText = Math.round(gold);
  document.getElementById("stat-food").innerText = Math.round(food);
  document.getElementById("stat-pop").innerText = Math.round(population);
  document.getElementById("stat-army").innerText = Math.round(army);
  document.getElementById("stat-happy").innerText = Math.round(happiness);
}

// Start sequence
async function initGame() {
  await slowprint("🏰 Welcome to HSK'S CASTLE 🏰", 40);
  await slowprint("Survive 25 years and build the greatest kingdom ever!\n", 30);
  updateStats();
}
initGame();

async function handleChoice(action) {
  toggleActionButtons(false); // Disable main choice buttons during processing
  logSeparator();
  await slowprint(`🌅 YEAR ${year} CHOICE:`);

  if (action === 1) {
    let oldGold = gold, oldPop = population, oldHappy = happiness;
    gold += Math.round(population * 2);
    population = Math.round(population * 0.95);
    happiness = Math.round(happiness * 0.78);
    
    await slowprint(`💰 Collected ${gold - oldGold} gold in taxes.`);
    await slowprint(`👥 ${oldPop - population} citizens left your kingdom.`);
    await slowprint(`😊 Happiness decreased by ${oldHappy - happiness}.`);
  } else if (action === 2) {
    let oldGold = gold, oldPop = population;
    food += 350;
    population = Math.round(population * 1.12);
    gold -= 200;

    await slowprint(`🍖 Purchased food supplies!`);
    await slowprint(`👥 Population increased by ${population - oldPop}.`);
    await slowprint(`💰 Spent ${oldGold - gold} gold.`);
  } else if (action === 3) {
    let oldArmy = army, oldGold = gold, oldHappy = happiness;
    army = Math.round(army * 1.5);
    gold = Math.round(gold * 0.8);
    happiness += 10;

    await slowprint(`⚔️ Army grew by ${army - oldArmy} soldiers.`);
    await slowprint(`💰 Spent ${oldGold - gold} gold.`);
    await slowprint(`😊 Happiness increased by ${happiness - oldHappy}.`);
  } else if (action === 4) {
    let oldPop = population, oldGold = gold, oldHappy = happiness;
    population = population >= 100 ? Math.round(population * 1.8) : population + 60;
    gold = Math.round(gold * 0.7);
    happiness += 30;

    await slowprint(`🏠 Population increased by ${population - oldPop}.`);
    await slowprint(`💰 Spent ${oldGold - gold} gold.`);
    await slowprint(`😊 Happiness increased by ${happiness - oldHappy}.`);
  } else if (action === 5) {
    let oldHappy = happiness;
    happiness = happiness <= 80 ? Math.round(happiness + 60) : Math.round(happiness * 1.8);
    gold -= 150;

    await slowprint(`🎉 Held a legendary festival!`);
    await slowprint(`😊 Happiness increased by ${happiness - oldHappy}.`);
    await slowprint(`💰 Spent 150 gold.`);
  }

  await applyMigrationAndFood();
  updateStats();

  if (checkGameOver()) return;

  if (year % 3 === 0) {
    await triggerRandomEvent();
  } else {
    advanceYear();
    toggleActionButtons(true);
  }
}

async function applyMigrationAndFood() {
  let popRand = Math.floor(Math.random() * 2) + 1;
  if (popRand === 1) {
    let mig = Math.floor(Math.random() * (population * 0.33)) + 1;
    population += mig;
    await slowprint(`👥 ${mig} citizens migrated in.`);
  } else {
    let mig = Math.floor(Math.random() * (population * 0.25)) + 1;
    population -= mig;
    await slowprint(`👥 ${mig} citizens migrated away.`);
  }

  let foodConsumed = Math.round(population / 2);
  food -= foodConsumed;
  await slowprint(`🍖 Food supplies reduced by ${foodConsumed}.`);
}

function advanceYear() {
  year++;
  if (year > 25) {
    logSeparator();
    slowprint("🏰 25 YEARS HAVE PASSED! YOU SURVIVED AND REIGNED SUPREME!");
    document.getElementById("action-panel").classList.add("hidden");
  } else {
    updateStats();
  }
}

function checkGameOver() {
  if (gold <= 0 || population <= 0 || food <= 0 || army <= 0 || happiness <= 0) {
    logSeparator();
    slowprint("☠️ YOUR KINGDOM HAS FALLEN! One of your vital resources reached zero.");
    document.getElementById("action-panel").classList.add("hidden");
    return true;
  }
  return false;
}

// Generic Prompt Helper using async promises
function asyncPrompt(message) {
  return new Promise((resolve) => {
    setTimeout(() => {
      let res = prompt(message);
      resolve(res);
    }, 50);
  });
}

// -------------------------------------------------------------
// RANDOM EVENTS WITH TIME LIMITS & SLOWPRINT
// -------------------------------------------------------------

async function triggerRandomEvent() {
  const eventId = Math.floor(Math.random() * 4) + 1;
  logSeparator();

  if (eventId === 1) {
    await slowprint("☠️ ZOMBIE APOCALYPSE!");
    await slowprint("Zombies are attacking! Solve 6 math problems in 40 seconds!");
    
    let score = 0;
    let startTime = Date.now();
    let timeLimit = 40 * 1000;

    while ((Date.now() - startTime) < timeLimit && score < 6) {
      let a = Math.floor(Math.random() * 333) + 1;
      let b = Math.floor(Math.random() * 333) + 1;
      let remainingSeconds = Math.ceil((timeLimit - (Date.now() - startTime)) / 1000);
      
      let answer = await asyncPrompt(`[${remainingSeconds}s remaining] Solve: ${a} + ${b}`);
      if ((Date.now() - startTime) >= timeLimit) break;

      if (parseInt(answer, 10) === a + b) {
        score++;
        log("✅ Correct!");
      } else {
        log("❌ Wrong!");
      }
    }

    if (score >= 6) {
      await slowprint("⚔️ Your army successfully defeated the zombies!");
    } else {
      await slowprint("☠️ Time ran out or missed answers! The zombies breached the walls!");
      happiness -= 60; population -= 100; food -= 100; army -= 15;
    }

  } else if (eventId === 2) {
    await slowprint("⛏️ GOLD MINE FOUND!");
    let choice = await asyncPrompt("The Mango Tree offers a challenge! Choose difficulty:\n1 = Easy (1-3)\n2 = Hard (1-33)");

    if (choice === "1") {
      let target = Math.floor(Math.random() * 3) + 1;
      let guess = parseInt(await asyncPrompt("Guess a number between 1 and 3:"), 10);
      if (guess === target) {
        await slowprint("🥭 Mango Tree blessing! Resources multiplied!");
        gold *= 3; happiness *= 1.5; army *= 1.5;
      } else {
        await slowprint("The Mango Tree was unimpressed...");
      }
    } else {
      let target = Math.floor(Math.random() * 33) + 1;
      let guess = parseInt(await asyncPrompt("Guess a number between 1 and 33:"), 10);
      if (guess === target) {
        await slowprint("🌟 LEGENDARY DISCOVERY! Resources heavily boosted!");
        gold *= 33; food *= 33; population *= 33; happiness *= 33; army *= 33;
      } else {
        await slowprint("The magic vanished...");
      }
    }

  } else if (eventId === 3) {
    await slowprint("🌊 SHIPWRECK DISASTER!");
    await slowprint("Name 15 unique sea animals/objects in 45 seconds to save the crew!");

    let score = 0;
    let usedAnswers = [];
    let startTime = Date.now();
    let timeLimit = 45 * 1000;

    while ((Date.now() - startTime) < timeLimit && score < 15) {
      let remainingSeconds = Math.ceil((timeLimit - (Date.now() - startTime)) / 1000);
      let input = await asyncPrompt(`[${remainingSeconds}s remaining | ${score}/15 points] Enter sea item:`);
      
      if (!input || (Date.now() - startTime) >= timeLimit) break;
      
      let item = input.trim();
      let match = seaList.find(s => s.toLowerCase() === item.toLowerCase());

      if (match && !usedAnswers.includes(match.toLowerCase())) {
        score++;
        usedAnswers.push(match.toLowerCase());
        log(`✅ Valid! (${score}/15)`);
      } else if (usedAnswers.includes(item.toLowerCase())) {
        log("⚠️ Already used!");
      } else {
        log("❌ Invalid sea item!");
      }
    }

    if (score >= 15) {
      await slowprint("🚢 AMAZING! You repaired the ship and saved everyone.");
      happiness += 20;
    } else {
      await slowprint("💀 Time ran out... the ship sank.");
      population -= 100; happiness -= 60; food -= 100; gold -= 333;
    }

  } else if (eventId === 4) {
    await slowprint("🥭 TRAPPED IN A MANGO HOLE!");
    await slowprint("Unscramble 8 words within 60 seconds to escape!");

    let score = 0;
    let startTime = Date.now();
    let timeLimit = 60 * 1000;

    while ((Date.now() - startTime) < timeLimit && score < 8) {
      let target = unscrambleWords[Math.floor(Math.random() * unscrambleWords.length)];
      let scrambled = target.split('').sort(() => 0.5 - Math.random()).join('');
      let remainingSeconds = Math.ceil((timeLimit - (Date.now() - startTime)) / 1000);

      let guess = await asyncPrompt(`[${remainingSeconds}s remaining | ${score}/8 solved] Unscramble: ${scrambled}`);
      if (!guess || (Date.now() - startTime) >= timeLimit) break;

      if (guess.trim().toLowerCase() === target) {
        score++;
        log("🎉 Word solved!");
      } else {
        log("❌ Wrong word!");
      }
    }

    if (score >= 8) {
      await slowprint("🎉 You successfully escaped!");
    } else {
      await slowprint("Uh oh! Failed to escape in time.");
      food -= 75; population -= 30; gold -= 50; army -= 60; happiness -= 15;
    }
  }

  updateStats();
  if (!checkGameOver()) {
    advanceYear();
    toggleActionButtons(true);
  }
}

function toggleActionButtons(enable) {
  const buttons = document.querySelectorAll("#action-panel button");
  buttons.forEach(btn => btn.disabled = !enable);
}
