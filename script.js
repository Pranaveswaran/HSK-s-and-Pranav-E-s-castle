// Initial Stats
let gold = 500;
let population = 100;
let food = 400;
let army = 30;
let happiness = 70;
let year = 1;

const seaList = ["Dolphin", "Whale", "Shark", "Octopus", "Squid", "Jellyfish", "Sea Turtle", "Seal", "Sea Lion", "Walrus", "Starfish", "Seahorse", "Crab", "Lobster", "Shrimp", "Clam", "Oyster", "Mussel", "Scallop", "Sea Urchin", "Sea Cucumber", "Eel", "Stingray", "Manta Ray", "Swordfish", "Tuna", "Salmon", "Clownfish", "Angelfish", "Parrotfish", "Pufferfish", "Moray Eel", "Barracuda", "Blue Tang", "Lionfish", "Grouper", "Cod", "Halibut", "Flounder", "Anchovy", "Sardine", "Herring", "Mackerel", "Flying Fish", "Sea Snake", "Sea Anemone", "Coral", "Krill", "Barnacle", "Spiny Lobster"];

const unscrambleWords = ["apple", "grape", "peach", "melon", "mango", "berry", "lemon", "olive", "guava", "chili", "table", "chair", "couch", "shelf", "clock", "brush", "plate", "spoon", "glass", "knife", "tiger", "zebra", "horse", "sheep", "goose", "eagle", "snake", "whale", "shark", "otter"];

function log(text) {
  const logWin = document.getElementById("log-window");
  logWin.innerText += text + "\n";
  logWin.scrollTop = logWin.scrollHeight;
}

function updateStats() {
  document.getElementById("stat-year").innerText = year;
  document.getElementById("stat-gold").innerText = Math.round(gold);
  document.getElementById("stat-food").innerText = Math.round(food);
  document.getElementById("stat-pop").innerText = Math.round(population);
  document.getElementById("stat-army").innerText = Math.round(army);
  document.getElementById("stat-happy").innerText = Math.round(happiness);
}

function logSeparator() {
  log("\n==================================================");
}

// Initial Greeting
log("🏰 Welcome to HSK'S CASTLE 🏰");
log("Survive 25 years and build the greatest kingdom ever!\n");
updateStats();

function handleChoice(action) {
  logSeparator();
  log(`🌅 YEAR ${year} CHOICE:`);

  if (action === 1) {
    gold += Math.round(population * 2);
    population = Math.round(population * 0.95);
    happiness = Math.round(happiness * 0.78);
    log(`💰 Total Gold: ${gold}`);
    log(`👥 Total Population: ${population}`);
    log(`😊 Total Happiness: ${happiness}`);
  } else if (action === 2) {
    food += 350;
    population = Math.round(population * 1.12);
    gold -= 200;
    log(`🍖 Purchased food supplies! Total Food: ${food}`);
    log(`👥 Total Population: ${population}`);
    log(`💰 Total Gold: ${gold}`);
  } else if (action === 3) {
    army = Math.round(army * 1.5);
    gold = Math.round(gold * 0.8);
    happiness += 10;
    log(`⚔️ Total Army: ${army}`);
    log(`💰 Total Gold: ${gold}`);
    log(`😊 Total Happiness: ${happiness}`);
  } else if (action === 4) {
    population = population >= 100 ? Math.round(population * 1.8) : population + 60;
    gold = Math.round(gold * 0.7);
    happiness += 30;
    log(`🏠 Total Population: ${population}`);
    log(`💰 Total Gold: ${gold}`);
    log(`😊 Total Happiness: ${happiness}`);
  } else if (action === 5) {
    happiness = happiness <= 80 ? Math.round(happiness + 60) : Math.round(happiness * 1.8);
    gold -= 150;
    log(`🎉 Held a legendary festival!`);
    log(`😊 Total Happiness: ${happiness}`);
    log(`💰 Total Gold: ${gold}`);
  }

  // End-of-year calculations
  applyMigrationAndFood();
  updateStats();

  if (checkGameOver()) return;

  // Trigger Special Events every 3 years
  if (year % 3 === 0) {
    triggerRandomEvent();
  } else {
    advanceYear();
  }
}

function applyMigrationAndFood() {
  let popRand = Math.floor(Math.random() * 2) + 1;
  if (popRand === 1) {
    let mig = Math.floor(Math.random() * (population * 0.33)) + 1;
    population += mig;
    log(`👥 Population migrated in. Total Population: ${population}`);
  } else {
    let mig = Math.floor(Math.random() * (population * 0.25)) + 1;
    population -= mig;
    log(`👥 Population migrated away. Total Population: ${population}`);
  }

  // Reduced food consumption rate from (population / 2) to (population / 10)
  food = Math.round(food - population / 10);
  log(`🍖 Current Food remaining: ${food}`);
}

function advanceYear() {
  year++;
  if (year > 25) {
    logSeparator();
    log("🏰 25 YEARS HAVE PASSED! YOU SURVIVED AND REIGNED SUPREME!");
    document.getElementById("action-panel").classList.add("hidden");
  } else {
    updateStats();
  }
}

function checkGameOver() {
  if (gold <= 0 || population <= 0 || food <= 0 || army <= 0 || happiness <= 0) {
    logSeparator();
    log("☠️ YOUR KINGDOM HAS FALLEN! One of your resources reached zero.");
    document.getElementById("action-panel").classList.add("hidden");
    return true;
  }
  return false;
}

function triggerRandomEvent() {
  const eventId = Math.floor(Math.random() * 4) + 1;
  logSeparator();

  if (eventId === 1) {
    log("☠️ ZOMBIE APOCALYPSE!");
    log("Zombies attack! Defend your kingdom by solving math problems using the event box below.");
    let score = 0;
    for (let i = 0; i < 4; i++) {
      let a = Math.floor(Math.random() * 100) + 1;
      let b = Math.floor(Math.random() * 100) + 1;
      let ans = parseInt(prompt(`ZOMBIE ATTACK! Solve: ${a} + ${b}`), 10);
      if (ans === a + b) score++;
    }
    if (score >= 3) {
      log("⚔️ Your army successfully defeated the zombies!");
    } else {
      log("☠️ The zombies breached the walls! Major damage taken.");
      happiness -= 40; population -= 50; food -= 50; army -= 10;
      log(`📊 Current Stats -> Pop: ${population}, Army: ${army}, Food: ${food}, Happiness: ${happiness}`);
    }
  } else if (eventId === 2) {
    log("⛏️ GOLD MINE FOUND!");
    let choice = prompt("Choose difficulty (1 = Easy, 2 = Hard):");
    if (choice === "1") {
      let target = Math.floor(Math.random() * 3) + 1;
      let guess = parseInt(prompt("Guess a number between 1 and 3:"), 10);
      if (guess === target) {
        log("🥭 Mango Tree blessing! Resources multiplied!");
        gold *= 2; happiness *= 1.2;
        log(`💰 Total Gold: ${gold}, 😊 Total Happiness: ${happiness}`);
      } else {
        log("The Mango Tree was unimpressed...");
      }
    } else {
      let target = Math.floor(Math.random() * 10) + 1;
      let guess = parseInt(prompt("Guess a number between 1 and 10:"), 10);
      if (guess === target) {
        log("🌟 LEGENDARY DISCOVERY! Resources heavily boosted!");
        gold *= 5; food *= 3;
        log(`💰 Total Gold: ${gold}, 🍖 Total Food: ${food}`);
      } else {
        log("The magic vanished...");
      }
    }
  } else if (eventId === 3) {
    log("🌊 SHIPWRECK DISASTER!");
    let item = prompt("Name a valid sea animal or item to help save the crew:").trim();
    if (seaList.map(s => s.toLowerCase()).includes(item.toLowerCase())) {
      log("🚢 Excellent knowledge! You saved the crew.");
      happiness += 20;
      log(`😊 Total Happiness: ${happiness}`);
    } else {
      log("💀 The ship sank... lost population and gold.");
      population -= 40; gold -= 100;
      log(`👥 Total Population: ${population}, 💰 Total Gold: ${gold}`);
    }
  } else if (eventId === 4) {
    log("🥭 TRAPPED IN A MANGO HOLE!");
    let target = unscrambleWords[Math.floor(Math.random() * unscrambleWords.length)];
    let scrambled = target.split('').sort(() => 0.5 - Math.random()).join('');
    let guess = prompt(`Unscramble this word to escape: ${scrambled}`);
    if (guess && guess.toLowerCase() === target) {
      log("🎉 You escaped safely!");
    } else {
      log("Uh oh! Failed to escape. Resources lost.");
      food -= 50; population -= 20;
      log(`🍖 Total Food: ${food}, 👥 Total Population: ${population}`);
    }
  }

  updateStats();
  if (!checkGameOver()) {
    advanceYear();
  }
}
