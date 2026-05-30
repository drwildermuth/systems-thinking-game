// Board setup and editable game content.
const boardColors = [
  "blue", "green", "purple", "green", "blue", "purple", "red", "blue", "yellow",
  "purple", "blue", "purple", "blue", "blue", "yellow", "green", "blue", "blue",
  "green", "blue", "yellow", "green", "blue", "purple", "red", "blue", "yellow",
  "green", "blue", "purple", "red", "purple", "yellow", "blue", "blue", "purple",
  "red", "purple", "yellow", "green", "blue", "blue", "red", "yellow", "blue"
];

const defaultTokens = ["🛁", "🌡️", "🦋", "💻", "⚙️", "🏫"];
const defaultNames = ["Bathtub", "Thermostat", "Butterfly", "Computer", "Gear", "University"];
const dieFaces = ["", "⚀", "⚁", "⚂", "⚃", "⚄", "⚅"];

const blueCards = [
  { question: "Changing _______ has the least effect on the system", answer: "Elements" },
  { question: "What is the difference between a conglomeration and a system?", answer: "A conglomeration lacks interconnection, organization, and a purpose." },
  { question: "There are a bunch of chips on the floor. Is that a system? Why or why not?", answer: "No. At most, that is a conglomeration." },
  { question: "What is a dynamic equilibrium?", answer: "When the inflow is the same as the outflow." },
  { question: "In a university, what are the elements of the system?", answer: "Students, professors, staff members, administrators." },
  { question: "In a university, what would the flow be?", answer: "Admissions and graduation of students; hiring of faculty, administrators, and staff; employee departures, layoffs, or retirement." },
  { question: "Stocks change over time through the actions of a ______. (Meadows, 2008, p. 19).", answer: "Flow." },
  { question: "As long as the sum of all inflows exceeds the sum of all outflows, the level of the stock will _____ (rise or fall?) (Meadows, 2008, p. 22).", answer: "Rise." },
  { question: "Imagine that organization x is facing serious financial difficulties. Why can't it solve its problems quickly by, for example, firing employees?", answer: "Because stock has inherent momentum (Meadows, 2008, p. 23). It took time and multiple factors to cause the financial difficulties; just firing people will not address all these issues." },
  { question: "How can you provide an example of a feedback loop in a systemic problem?", answer: "Answers may vary. Facilitator note: Check the definition of a feedback loop on Meadows, p. 25." },
  { question: "Provide an example of inflow in a systemic problem.", answer: "Answers may vary. Facilitator note: Check the definition of flow on Meadows, p. 18." },
  { question: "Provide an example of stock in a systemic problem.", answer: "Answers may vary. Facilitator note: Check the definition of stock and flow on Meadows, p. 18." },
  { question: "Sarah Jones is trying to lose weight. Explain the systemic nature of her challenge considering the inherent momentum of a stock (Meadows, 2008, p. 23).", answer: "Answers may vary. Facilitator note: Check Meadows, 2008, p. 23, paragraph 2." },
  { question: "Provide an example of feedback in your case.", answer: "Answers may vary. Facilitator note: Check Meadows, 2008, p. 25, for a definition of feedback." },
  { question: "Explain how balancing feedback may prevent change in a system.", answer: "Answers may vary. Facilitator note: Check Meadows, 2008, p. 28, paragraph 3, for an explanation of balancing feedback." },
  { question: "Explain how reinforcing feedback can snowball a problem.", answer: "Answers may vary. Facilitator note: Check Meadows, p. 30, for explanations." }
];

const greenCards = [
  { question: "A stock does not have to be physical. What non-physical stocks might we consider in a university?", answer: "Answers may vary and could include good will, loyalty, employee engagement, quality." },
  { question: "Dynamic equilibrium means that there is still in and outflow but the stock does not change. How would you connect that concept to your case?", answer: "Answers may vary." },
  { question: "Sometimes, different subunits within a system have differentiated purposes, and those purposes may clash. Provide an example in your case.", answer: "Answers may vary." },
  { question: "The more anxious a student gets, the more they complain and the less they like the class; the more they complain, the more anxious I get, and the worse the class becomes. What type of loop does this exemplify?", answer: "A reinforcing feedback loop." },
  { question: "Because of feedback delays within complex systems, by the time a problem becomes apparent it may be unnecessarily difficult to solve (Meadows, 2008, p. 3). Explain this sentence.", answer: "Answers may vary." },
  { question: "You think that because you understand one that you must therefore understand two because one and one make two. But you must forget that you must also understand and. Explain this sentence.", answer: "Answers may vary." },
  { question: "Systems can be nested within systems. Different subsystems within a university may have different purposes. How might this problem impact your case?", answer: "Answers may vary." },
  { question: "A change in purpose changes a system profoundly, even if every element and interconnection remains the same (Meadows, 2008, p. 17). Are you sure of the main purpose of the system you are exploring? What is it? Might there be a hidden purpose? Might the purpose have changed over time?", answer: "Answers may vary." },
  { question: "Keeping sub-purposes and overall system purposes in harmony is an essential function of successful systems (Meadows, 2008, p. 16). How might a change agent within your case achieve that? Is it even possible?", answer: "Answers may vary." },
  { question: "The human mind seems to focus more easily on stocks than on flows. Might this situation be exemplified in your case? What are the inflow and the outflow in your example? How might we increase the stock by decreasing the outflow?", answer: "Answers may vary." },
  { question: "Stocks, especially large ones, respond to change, even sudden change, only by gradual filling and emptying (Meadows, 2008, p. 23). How does that statement connect to your case?", answer: "Answers may vary." },
  { question: "The presence of stocks allows inflows and outflows to be independent of each other and temporarily out of balance (Meadows, 2008, p. 25). Do you see that in your case? Can you think of examples of this phenomenon? Why is this beneficial? Why is it problematic?", answer: "Answers may vary." },
  { question: "Systems thinkers see the world as a collection of stocks along with the mechanisms for regulating the levels in the stocks by manipulating flows (Meadows, 2008, p. 25). Can you see your case this way? What are these mechanisms?", answer: "Answers may vary." },
  { question: "A balancing feedback loop opposes whatever direction of change is imposed on the system (Meadows, 2008, p. 28). Could that happen in your case? If so, how?", answer: "Answers may vary." }
];

// Session state for one shared classroom browser.
const state = {
  players: [],
  activeIndex: 0,
  gameStarted: false,
  waitingForNext: false,
  winner: null,
  log: [],
  usedCards: { blue: [], green: [] },
  drawPiles: { blue: [], green: [] },
  pendingCard: null
};

// Page elements used by the game controls.
const elements = {
  setupScreen: document.getElementById("setupScreen"),
  gameScreen: document.getElementById("gameScreen"),
  playerCount: document.getElementById("playerCount"),
  playerNameFields: document.getElementById("playerNameFields"),
  startGame: document.getElementById("startGame"),
  resetGame: document.getElementById("resetGame"),
  board: document.getElementById("board"),
  activePlayerLabel: document.getElementById("activePlayerLabel"),
  dieFace: document.getElementById("dieFace"),
  rollNumber: document.getElementById("rollNumber"),
  rollDie: document.getElementById("rollDie"),
  nextPlayer: document.getElementById("nextPlayer"),
  moveBackOne: document.getElementById("moveBackOne"),
  moveForwardOne: document.getElementById("moveForwardOne"),
  turnMessage: document.getElementById("turnMessage"),
  playerStatus: document.getElementById("playerStatus"),
  sessionLog: document.getElementById("sessionLog"),
  cardModal: document.getElementById("cardModal"),
  cardDeckLabel: document.getElementById("cardDeckLabel"),
  cardQuestion: document.getElementById("cardQuestion"),
  cardAnswer: document.getElementById("cardAnswer"),
  showAnswer: document.getElementById("showAnswer"),
  closeCard: document.getElementById("closeCard"),
  downloadSummary: document.getElementById("downloadSummary")
};

// Startup and event wiring.
function init() {
  renderNameFields();
  renderBoard();
  resetDecks();
  bindEvents();
}

function bindEvents() {
  elements.playerCount.addEventListener("change", renderNameFields);
  elements.startGame.addEventListener("click", startGame);
  elements.resetGame.addEventListener("click", resetGame);
  elements.rollDie.addEventListener("click", rollDie);
  elements.nextPlayer.addEventListener("click", nextPlayer);
  elements.moveBackOne.addEventListener("click", () => manualMove(-1));
  elements.moveForwardOne.addEventListener("click", () => manualMove(1));
  elements.showAnswer.addEventListener("click", showCardAnswer);
  elements.closeCard.addEventListener("click", closeCard);
  elements.downloadSummary.addEventListener("click", downloadSummary);
}

// Setup screen rendering.
function renderNameFields() {
  const count = Number(elements.playerCount.value);
  elements.playerNameFields.innerHTML = "";

  for (let i = 0; i < count; i += 1) {
    const row = document.createElement("div");
    row.className = "player-input-row";
    row.innerHTML = `
      <div class="token-preview" aria-label="${defaultNames[i]} token">${defaultTokens[i]}</div>
      <label>Player/team ${i + 1}
        <input type="text" value="Team ${i + 1}" data-player-name="${i}">
      </label>
    `;
    elements.playerNameFields.appendChild(row);
  }
}

// Game flow controls.
function startGame() {
  const names = [...document.querySelectorAll("[data-player-name]")].map((input, index) => {
    return input.value.trim() || `Team ${index + 1}`;
  });

  state.players = names.map((name, index) => ({
    name,
    token: defaultTokens[index],
    tokenName: defaultNames[index],
    position: 0
  }));
  state.activeIndex = 0;
  state.gameStarted = true;
  state.waitingForNext = false;
  state.winner = null;
  state.log = [];
  state.usedCards = { blue: [], green: [] };
  resetDecks();

  elements.setupScreen.classList.add("hidden");
  elements.gameScreen.classList.remove("hidden");
  elements.turnMessage.textContent = `${currentPlayer().token} ${currentPlayer().name} starts at Start.`;
  elements.rollDie.disabled = false;
  elements.nextPlayer.disabled = true;
  renderAll();
  addLog(`${currentPlayer().token} ${currentPlayer().name} begins the game.`);
}

function resetGame() {
  state.players = [];
  state.activeIndex = 0;
  state.gameStarted = false;
  state.waitingForNext = false;
  state.winner = null;
  state.log = [];
  state.usedCards = { blue: [], green: [] };
  resetDecks();
  elements.setupScreen.classList.remove("hidden");
  elements.gameScreen.classList.add("hidden");
  elements.dieFace.textContent = "⚀";
  elements.rollNumber.textContent = "Roll: -";
  renderNameFields();
  renderBoard();
}

// Turn resolution. A space effect is based only on the original landing space.
function rollDie() {
  if (!state.gameStarted || state.waitingForNext || state.winner) return;

  const player = currentPlayer();
  const roll = Math.floor(Math.random() * 6) + 1;
  const originalPosition = player.position;
  const landingPosition = clampPosition(originalPosition + roll);
  player.position = landingPosition;
  elements.dieFace.textContent = dieFaces[roll];
  elements.rollNumber.textContent = `Roll: ${roll}`;

  const details = {
    player,
    roll,
    originalPosition,
    landingPosition,
    landingText: describePosition(landingPosition),
    effect: "",
    cardText: "No card drawn",
    finalPosition: landingPosition
  };

  applyLandingEffect(details);
  renderAll();
}

function applyLandingEffect(details) {
  const color = boardColors[details.landingPosition - 1];
  const player = details.player;

  if (details.landingPosition === 45) {
    details.effect = "Final blue space: draw a blue card, then win.";
    details.cardText = drawCard("blue");
    state.winner = player;
    state.waitingForNext = true;
    showCard("blue");
    details.finalPosition = player.position;
    finishTurn(details, `${player.token} ${player.name} reached the final blue space. Complete the blue card to win.`);
    return;
  }

  if (color === "blue") {
    details.effect = "Blue: draw a blue card, then move forward 2.";
    details.cardText = drawCard("blue");
    player.position = clampPosition(player.position + 2);
    showCard("blue");
  } else if (color === "green") {
    details.effect = "Green: draw a green card, then move forward 4.";
    details.cardText = drawCard("green");
    player.position = clampPosition(player.position + 4);
    showCard("green");
  } else if (color === "red") {
    details.effect = "Red: move back 4.";
    player.position = clampPosition(player.position - 4);
  } else if (color === "yellow") {
    details.effect = "Yellow: move back 2.";
    player.position = clampPosition(player.position - 2);
  } else {
    details.effect = "Purple: safe space. No extra movement.";
  }

  details.finalPosition = player.position;
  const message = `${player.token} ${player.name} rolled ${details.roll}, landed on ${details.landingText}, and finished on ${describePosition(details.finalPosition)}.`;
  finishTurn(details, message);
}

function finishTurn(details, message) {
  state.waitingForNext = true;
  elements.rollDie.disabled = true;
  elements.nextPlayer.disabled = Boolean(state.winner || state.pendingCard);
  elements.turnMessage.textContent = message;
  addLog(`${details.player.name}: rolled ${details.roll}; landed on ${details.landingText}; ${details.effect}; ${details.cardText}; final position ${describePosition(details.finalPosition)}.`);
}

function nextPlayer() {
  if (!state.waitingForNext || state.winner) return;
  state.activeIndex = (state.activeIndex + 1) % state.players.length;
  state.waitingForNext = false;
  elements.rollDie.disabled = false;
  elements.nextPlayer.disabled = true;
  elements.turnMessage.textContent = `${currentPlayer().token} ${currentPlayer().name}'s turn.`;
  addLog(`${currentPlayer().token} ${currentPlayer().name}'s turn begins.`);
  renderAll();
}

function manualMove(step) {
  if (!state.gameStarted || state.winner) return;
  const player = currentPlayer();
  player.position = clampPosition(player.position + step);
  const direction = step > 0 ? "forward" : "back";
  elements.turnMessage.textContent = `${player.token} ${player.name} moved ${direction} 1 to ${describePosition(player.position)}.`;
  addLog(`Manual correction: ${player.name} moved ${direction} 1 to ${describePosition(player.position)}.`);
  renderAll();
}

// Card deck handling. Each draw pile is exhausted before reshuffling.
function drawCard(deckColor) {
  if (state.drawPiles[deckColor].length === 0) {
    state.drawPiles[deckColor] = shuffle(deckColor === "blue" ? blueCards : greenCards);
  }
  const card = state.drawPiles[deckColor].pop();
  state.usedCards[deckColor].push(card);
  state.pendingCard = { deckColor, card };
  return `${capitalize(deckColor)} card drawn: ${card.question}`;
}

function showCard(deckColor) {
  const pending = state.pendingCard;
  elements.cardDeckLabel.textContent = `${capitalize(deckColor)} deck`;
  elements.cardDeckLabel.className = `card-deck-label ${deckColor}`;
  elements.cardQuestion.textContent = pending.card.question;
  elements.cardAnswer.textContent = pending.card.answer;
  elements.cardAnswer.classList.add("hidden");
  elements.showAnswer.disabled = false;
  elements.cardModal.classList.remove("hidden");
}

function showCardAnswer() {
  elements.cardAnswer.classList.remove("hidden");
  elements.showAnswer.disabled = true;
}

function closeCard() {
  elements.cardModal.classList.add("hidden");
  if (state.winner) {
    elements.turnMessage.textContent = `${state.winner.token} ${state.winner.name} wins after completing the final blue card.`;
    addLog(`${state.winner.token} ${state.winner.name} wins the game.`);
  } else {
    state.pendingCard = null;
    elements.nextPlayer.disabled = false;
  }
  renderAll();
}

// Screen rendering.
function renderAll() {
  renderBoard();
  renderStatus();
  renderControls();
}

function renderBoard() {
  elements.board.innerHTML = "";
  const spaces = [{ type: "start", number: 0, label: "Start" }];
  boardColors.forEach((color, index) => {
    spaces.push({ type: color, number: index + 1, label: color });
  });
  spaces.push({ type: "finish", number: 46, label: "Finish" });

  spaces.forEach((space) => {
    const cell = document.createElement("div");
    const position = space.number === 46 ? 45 : space.number;
    const activeHere = state.gameStarted && currentPlayer().position === position && space.number !== 46;
    cell.className = `space ${space.type}${activeHere ? " active-space" : ""}`;

    cell.innerHTML = `
      <div>
        <div class="space-number">${space.number === 0 ? "Start" : space.number === 46 ? "Finish" : space.number}</div>
      </div>
      <div class="token-stack"></div>
    `;

    const stack = cell.querySelector(".token-stack");
    if (state.gameStarted && space.number !== 46) {
      state.players.filter((player) => player.position === position).forEach((player) => {
        const token = document.createElement("span");
        token.className = "board-token";
        token.title = player.name;
        token.textContent = player.token;
        stack.appendChild(token);
      });
    }

    elements.board.appendChild(cell);
  });
}

function renderStatus() {
  elements.playerStatus.innerHTML = "";
  state.players.forEach((player, index) => {
    const card = document.createElement("div");
    card.className = `player-card${index === state.activeIndex ? " current" : ""}`;
    card.innerHTML = `
      <div class="status-token">${player.token}</div>
      <div>
        <div class="status-name">${player.name}</div>
        <div class="status-position">${describePosition(player.position)}</div>
      </div>
    `;
    elements.playerStatus.appendChild(card);
  });
}

function renderControls() {
  if (!state.gameStarted) return;
  const player = currentPlayer();
  elements.activePlayerLabel.textContent = state.winner
    ? `${state.winner.token} ${state.winner.name} wins`
    : `Turn: ${player.token} ${player.name}`;
}

function addLog(message) {
  state.log.unshift({ message, time: new Date().toLocaleTimeString() });
  elements.sessionLog.innerHTML = "";
  state.log.forEach((entry) => {
    const item = document.createElement("li");
    item.textContent = `[${entry.time}] ${entry.message}`;
    elements.sessionLog.appendChild(item);
  });
}

// Optional session export for classroom records.
function downloadSummary() {
  const usedBlue = state.usedCards.blue.map((card, index) => `${index + 1}. ${card.question}`).join("\n") || "None";
  const usedGreen = state.usedCards.green.map((card, index) => `${index + 1}. ${card.question}`).join("\n") || "None";
  const logText = [...state.log].reverse().map((entry) => `[${entry.time}] ${entry.message}`).join("\n") || "No turns recorded.";
  const summary = [
    "Systems Thinking Board Game Session Summary",
    "",
    `Winner: ${state.winner ? state.winner.name : "No winner yet"}`,
    "",
    "Session log:",
    logText,
    "",
    "Used blue cards:",
    usedBlue,
    "",
    "Used green cards:",
    usedGreen
  ].join("\n");

  const blob = new Blob([summary], { type: "text/plain" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = "systems-thinking-game-session.txt";
  link.click();
  URL.revokeObjectURL(link.href);
}

function resetDecks() {
  state.drawPiles.blue = shuffle(blueCards);
  state.drawPiles.green = shuffle(greenCards);
}

function shuffle(cards) {
  const copy = [...cards];
  for (let i = copy.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function currentPlayer() {
  return state.players[state.activeIndex];
}

function clampPosition(position) {
  return Math.max(0, Math.min(45, position));
}

function describePosition(position) {
  if (position <= 0) return "Start";
  if (position === 45) return "space 45, final blue";
  return `space ${position}, ${boardColors[position - 1]}`;
}

function capitalize(word) {
  return word.charAt(0).toUpperCase() + word.slice(1);
}

init();
