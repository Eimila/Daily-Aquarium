const fishList = [
  {
    id: "guppy",
    name: "孔雀鱼",
    type: "single",
    image: "./assets/fish/guppy.png",
    description: "小小一只，却总把尾巴撑得很认真。"
  },
  {
    id: "betta",
    name: "斗鱼",
    type: "single",
    image: "./assets/fish/betta.png",
    description: "看起来有点骄傲，其实只是想把裙摆整理好。"
  },
  {
    id: "goldfish",
    name: "金鱼",
    type: "single",
    image: "./assets/fish/goldfish.png",
    description: "圆圆的，慢慢的，像把时间也一起游慢了。"
  },

  {
    id: "neon-tetra",
    name: "霓虹灯鱼",
    type: "group",
    image: "./assets/fish/neon-tetra.png",
    description: "身上那一道蓝光，像把夜晚偷偷装进了水里。"
  },
  {
    id: "white-cloud",
    name: "白云金丝",
    type: "group",
    image: "./assets/fish/white-cloud.png",
    description: "名字里有云，游起来也真的轻轻的。"
  }
];

const rewardFishImage = document.getElementById("rewardFishImage");
const rewardFishName = document.getElementById("rewardFishName");
const rewardFishDesc = document.getElementById("rewardFishDesc");
const placeFishBtn = document.getElementById("placeFishBtn");



const pages = {
  welcome: document.getElementById("page-welcome"),
  input: document.getElementById("page-input"),
  timer: document.getElementById("page-timer"),
  reward: document.getElementById("page-reward"),
  tank: document.getElementById("page-tank"),
};

const taskInput = document.getElementById("taskInput");
const startBtn = document.getElementById("startBtn");
const timerTaskText = document.getElementById("timerTaskText");
const timerDisplay = document.getElementById("timerDisplay");
const enterAppBtn = document.getElementById("enterAppBtn");
const inputMessage = document.getElementById("inputMessage");
const timerTip = document.getElementById("timerTip");
const focusAgainBtn = document.getElementById("focusAgainBtn");
const durationButtons = document.querySelectorAll(".duration-btn");
const pauseResumeBtn = document.getElementById("pauseResumeBtn");
const resetBtn = document.getElementById("resetBtn");
const fishHistoryModal = document.getElementById("fishHistoryModal");
const closeFishHistoryBtn = document.getElementById("closeFishHistoryBtn");
const fishHistoryTitle = document.getElementById("fishHistoryTitle");
const fishHistoryDesc = document.getElementById("fishHistoryDesc");
const historyTask = document.getElementById("historyTask");
const historyDate = document.getElementById("historyDate");
const historyTime = document.getElementById("historyTime");
const historyDuration = document.getElementById("historyDuration");
const todaySessionsStat = document.getElementById("todaySessionsStat");
const todayMinutesStat = document.getElementById("todayMinutesStat");
const totalFishStat = document.getElementById("totalFishStat");
const tankCapacityStat = document.getElementById("tankCapacityStat");
const TEST_DURATION_SECONDS = 5;
const focusMessages = {
  emptyTask: "先写下一件小小的事吧，只要一件就好。",
  running: "不用着急，小鱼正在安静地陪你游。",
  paused: "先停一下也没关系，小鱼会陪你等一会儿。",
  resumed: "欢迎回来，我们慢慢继续。",
  resetConfirm: "小鱼会先在这里等你。要重新开始这次专注吗？",
  resetDone: "没关系，准备好后再开始也很好。"
};

let currentTask = "";
let selectedDurationMinutes = 15;
let selectedDurationSeconds = TEST_DURATION_SECONDS;
let timeLeft = selectedDurationSeconds;
let timerId = null;
let timerState = "idle";
let currentRewardFish = null;
let currentSessionRecord = null;
let tanks = {
  small: [null, null, null, null, null, null],
  large: [[], [], []]
};
let collectedFishIds = [];
let sessionHistory = [];
let hasClaimedToday = false;
let lastClaimDate = "";
let lastFocusedElement = null;

function showPage(pageName) {
  Object.values(pages).forEach((page) => page.classList.remove("active"));
  pages[pageName].classList.add("active");
}

enterAppBtn.addEventListener("click", () => {
  showPage("input");
  taskInput.focus();
});

durationButtons.forEach((button) => {
  button.addEventListener("click", () => {
    selectedDurationMinutes = Number(button.dataset.duration);
    selectedDurationSeconds = TEST_DURATION_SECONDS;
    timeLeft = selectedDurationSeconds;

    durationButtons.forEach((item) => {
      item.classList.remove("active");
      item.setAttribute("aria-pressed", "false");
    });
    button.classList.add("active");
    button.setAttribute("aria-pressed", "true");
    updateTimerDisplay();
  });
});

startBtn.addEventListener("click", () => {
  const value = taskInput.value.trim();

  if (!value) {
    inputMessage.textContent = focusMessages.emptyTask;
    return;
  }

  //if (hasClaimedToday) {
  //  alert("今天已经认养过一条鱼啦，明天再来看看吧。");
  //  return;
  //}

  currentTask = value;
  currentRewardFish = null;
  currentSessionRecord = null;
  inputMessage.textContent = "";
  timerTip.textContent = focusMessages.running;
  timerTaskText.textContent = currentTask;
  timeLeft = selectedDurationSeconds;

  showPage("timer");
  startTimer();
});

pauseResumeBtn.addEventListener("click", () => {
  if (timerState === "running") {
    pauseTimer();
    return;
  }

  if (timerState === "paused") {
    resumeTimer();
  }
});

resetBtn.addEventListener("click", () => {
  resetTimer();
});

focusAgainBtn.addEventListener("click", () => {
  currentTask = "";
  currentRewardFish = null;
  currentSessionRecord = null;
  taskInput.value = "";
  inputMessage.textContent = "";
  timerTip.textContent = focusMessages.running;
  timeLeft = selectedDurationSeconds;
  updateTimerDisplay();
  showPage("input");
});

function getRandomFish() {
  const uncollectedFish = fishList.filter(
    (fish) => !collectedFishIds.includes(fish.id)
  );

  const sourceList = uncollectedFish.length > 0 ? uncollectedFish : fishList;

  const randomIndex = Math.floor(Math.random() * sourceList.length);
  return sourceList[randomIndex];
}

function showRewardFish() {
  currentRewardFish = getRandomFish();

  rewardFishImage.innerHTML = `
    <img src="${currentRewardFish.image}" alt="${currentRewardFish.name}" class="reward-fish-img">
  `;
  rewardFishName.textContent = currentRewardFish.name;
  rewardFishDesc.textContent = currentRewardFish.description;
}

function saveCompletedSession() {
  currentSessionRecord = {
    id: `${Date.now()}-${Math.random().toString(16).slice(2)}`,
    task: currentTask,
    durationMinutes: selectedDurationMinutes,
    date: new Date().toISOString(),
    fishId: currentRewardFish.id
  };

  sessionHistory.unshift(currentSessionRecord);
  sessionHistory = sessionHistory.slice(0, 50);
  saveGameData();
}

function createTankFishRecord(fish) {
  return {
    fishId: fish.id,
    name: fish.name,
    type: fish.type,
    image: fish.image,
    description: fish.description,
    sessionId: currentSessionRecord ? currentSessionRecord.id : "",
    earnedAt: currentSessionRecord ? currentSessionRecord.date : new Date().toISOString(),
    durationMinutes: currentSessionRecord ? currentSessionRecord.durationMinutes : selectedDurationMinutes,
    task: currentSessionRecord ? currentSessionRecord.task : currentTask
  };
}

function normalizeTankFishRecord(entry) {
  if (!entry) return null;

  const fish = fishList.find((item) => item.id === (entry.fishId || entry.id));

  return {
    fishId: entry.fishId || entry.id,
    name: entry.name || (fish ? fish.name : "未知小鱼"),
    type: entry.type || (fish ? fish.type : "single"),
    image: entry.image || (fish ? fish.image : ""),
    description: entry.description || (fish ? fish.description : "这条小鱼还没有留下简介。"),
    sessionId: entry.sessionId || "",
    earnedAt: entry.earnedAt || entry.date || "",
    durationMinutes: entry.durationMinutes || "",
    task: entry.task || ""
  };
}

function getTankFishLabel(entry) {
  const fish = normalizeTankFishRecord(entry);
  const taskText = fish.task ? `，来自 ${fish.task}` : "";
  return `查看${fish.name}的专注记录${taskText}`;
}

function placeFishIntoTank(fish) {
  const tankFishRecord = createTankFishRecord(fish);

  if (fish.type === "single") {
    for (let i = 0; i < tanks.small.length; i++) {
      if (tanks.small[i] === null) {
        tanks.small[i] = tankFishRecord;
        return;
      }
    }
  }

  if (fish.type === "group") {
    for (let i = 0; i < tanks.large.length; i++) {
      if (tanks.large[i].length === 0) {
        tanks.large[i] = [tankFishRecord, tankFishRecord, tankFishRecord];
        return;
      }
    }
  }
}

function getTodayString() {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function getDateStringFromIso(isoString) {
  const date = new Date(isoString);

  if (Number.isNaN(date.getTime())) {
    return "";
  }

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function resetDailyStatusIfNeeded() {
  const today = getTodayString();

  if (lastClaimDate !== today) {
    hasClaimedToday = false;
  }
}

function renderTanks() {
  for (let i = 0; i < tanks.small.length; i++) {
    const tankEl = document.getElementById(`small-tank-${i}`);
    const fish = normalizeTankFishRecord(tanks.small[i]);

    if (fish) {
      tankEl.innerHTML = `
        <button class="fish-single fish-history-trigger" type="button" data-tank-type="small" data-tank-index="${i}" aria-label="${getTankFishLabel(fish)}">
          <img src="${fish.image}" alt="${fish.name}" class="tank-fish-img single-img">
        </button>
      `;
    } else {
      tankEl.innerHTML = `<div class="tank-empty"></div>`;
    }
  }

  for (let i = 0; i < tanks.large.length; i++) {
    const tankEl = document.getElementById(`large-tank-${i}`);
    const fishGroup = tanks.large[i];

    if (fishGroup.length > 0) {
      tankEl.innerHTML = `
        <div class="fish-group">
          ${fishGroup.map((entry, fishIndex) => {
            const fish = normalizeTankFishRecord(entry);
            return `
            <button class="fish-group-item fish-history-trigger" type="button" data-tank-type="large" data-tank-index="${i}" data-fish-index="${fishIndex}" aria-label="${getTankFishLabel(fish)}">
              <img src="${fish.image}" alt="${fish.name}" class="tank-fish-img group-img">
            </button>
          `;
          }).join("")}
        </div>
      `;
    } else {
      tankEl.innerHTML = `<div class="tank-empty"></div>`;
    }
  }
}

function getTankCapacity() {
  return tanks.small.length + tanks.large.length;
}

function getFilledTankCount() {
  const filledSmallTanks = tanks.small.filter(Boolean).length;
  const filledLargeTanks = tanks.large.filter((fishGroup) => fishGroup.length > 0).length;
  return filledSmallTanks + filledLargeTanks;
}

function getTotalCollectedFishCount() {
  return getFilledTankCount();
}

function getTodaySessions() {
  const today = getTodayString();

  return sessionHistory.filter((session) => {
    return getDateStringFromIso(session.date) === today;
  });
}

function renderTankStats() {
  const todaySessions = getTodaySessions();
  const todayMinutes = todaySessions.reduce((total, session) => {
    return total + Number(session.durationMinutes || 0);
  }, 0);
  const filledTankCount = getFilledTankCount();

  todaySessionsStat.textContent = String(todaySessions.length);
  todayMinutesStat.textContent = String(todayMinutes);
  totalFishStat.textContent = String(getTotalCollectedFishCount());
  tankCapacityStat.textContent = `${filledTankCount}/${getTankCapacity()}`;
}

function getTankFishByTrigger(trigger) {
  const tankType = trigger.dataset.tankType;
  const tankIndex = Number(trigger.dataset.tankIndex);

  if (tankType === "small") {
    return normalizeTankFishRecord(tanks.small[tankIndex]);
  }

  if (tankType === "large") {
    const fishIndex = Number(trigger.dataset.fishIndex);
    return normalizeTankFishRecord(tanks.large[tankIndex][fishIndex]);
  }

  return null;
}

function formatFishHistoryDate(earnedAt) {
  if (!earnedAt) return { date: "暂无记录", time: "暂无记录" };

  const date = new Date(earnedAt);

  if (Number.isNaN(date.getTime())) {
    return { date: "暂无记录", time: "暂无记录" };
  }

  return {
    date: date.toLocaleDateString("zh-CN"),
    time: date.toLocaleTimeString("zh-CN", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit"
    })
  };
}

function showFishHistory(fish) {
  const history = formatFishHistoryDate(fish.earnedAt);

  lastFocusedElement = document.activeElement;
  fishHistoryTitle.textContent = fish.name;
  fishHistoryDesc.textContent = fish.description;
  historyTask.textContent = fish.task || "暂无记录";
  historyDate.textContent = history.date;
  historyTime.textContent = history.time;
  historyDuration.textContent = fish.durationMinutes ? `${fish.durationMinutes} 分钟` : "暂无记录";

  fishHistoryModal.classList.add("active");
  fishHistoryModal.setAttribute("aria-hidden", "false");
  closeFishHistoryBtn.focus();
}

function hideFishHistory() {
  fishHistoryModal.classList.remove("active");
  fishHistoryModal.setAttribute("aria-hidden", "true");

  if (lastFocusedElement) {
    lastFocusedElement.focus();
  }
}

function saveGameData() {
  localStorage.setItem("collectedFishIds", JSON.stringify(collectedFishIds));
  localStorage.setItem("tanks", JSON.stringify(tanks));
  localStorage.setItem("sessionHistory", JSON.stringify(sessionHistory));
  localStorage.setItem("hasClaimedToday", JSON.stringify(hasClaimedToday));
  localStorage.setItem("lastClaimDate", lastClaimDate);
}

function loadGameData() {
  const savedCollectedFishIds = localStorage.getItem("collectedFishIds");
  const savedTanks = localStorage.getItem("tanks");
  const savedSessionHistory = localStorage.getItem("sessionHistory");
  const savedHasClaimedToday = localStorage.getItem("hasClaimedToday");
  const savedLastClaimDate = localStorage.getItem("lastClaimDate");

  if (savedCollectedFishIds) {
    collectedFishIds = JSON.parse(savedCollectedFishIds);
  }

  if (savedTanks) {
    tanks = JSON.parse(savedTanks);
  }

  if (savedSessionHistory) {
    sessionHistory = JSON.parse(savedSessionHistory);
  }

  if (savedHasClaimedToday) {
    hasClaimedToday = JSON.parse(savedHasClaimedToday);
  }

  if (savedLastClaimDate) {
    lastClaimDate = savedLastClaimDate;
  }
}

function startTimer() {
  clearInterval(timerId);
  timerState = "running";
  pauseResumeBtn.textContent = "暂停";
  updateTimerDisplay();
  runTimer();
}

function runTimer() {
  timerId = setInterval(() => {
    timeLeft--;
    updateTimerDisplay();

    if (timeLeft <= 0) {
      completeTimer();
    }
  }, 1000);
}

function pauseTimer() {
  clearInterval(timerId);
  timerState = "paused";
  pauseResumeBtn.textContent = "继续";
  timerTip.textContent = focusMessages.paused;
}

function resumeTimer() {
  clearInterval(timerId);
  timerState = "running";
  pauseResumeBtn.textContent = "暂停";
  timerTip.textContent = focusMessages.resumed;
  runTimer();
}

function resetTimer() {
  if (!window.confirm(focusMessages.resetConfirm)) {
    return;
  }

  clearInterval(timerId);
  timerState = "idle";
  timeLeft = selectedDurationSeconds;
  currentRewardFish = null;
  currentSessionRecord = null;
  pauseResumeBtn.textContent = "暂停";
  timerTip.textContent = focusMessages.running;
  inputMessage.textContent = focusMessages.resetDone;
  updateTimerDisplay();
  showPage("input");
  taskInput.focus();
}

function completeTimer() {
  clearInterval(timerId);
  timerState = "completed";
  timeLeft = 0;
  updateTimerDisplay();
  showRewardFish();
  saveCompletedSession();
  showPage("reward");
  placeFishBtn.focus();
}

function updateTimerDisplay() {
  const minutes = String(Math.floor(timeLeft / 60)).padStart(2, "0");
  const seconds = String(timeLeft % 60).padStart(2, "0");
  timerDisplay.textContent = `${minutes}:${seconds}`;
}

pages.tank.addEventListener("click", (event) => {
  const trigger = event.target.closest(".fish-history-trigger");
  if (!trigger) return;

  const fish = getTankFishByTrigger(trigger);
  if (!fish) return;

  showFishHistory(fish);
});

closeFishHistoryBtn.addEventListener("click", () => {
  hideFishHistory();
});

fishHistoryModal.addEventListener("click", (event) => {
  if (event.target === fishHistoryModal) {
    hideFishHistory();
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && fishHistoryModal.classList.contains("active")) {
    hideFishHistory();
  }
});

function claimRewardFish() {
  if (!currentRewardFish) return;

  placeFishIntoTank(currentRewardFish);

  if (!collectedFishIds.includes(currentRewardFish.id)) {
    collectedFishIds.push(currentRewardFish.id);
  }

  //hasClaimedToday = true;
  //lastClaimDate = getTodayString();

  saveGameData();
  renderTanks();
  renderTankStats();
  showPage("tank");
  focusAgainBtn.focus();
}

placeFishBtn.addEventListener("click", claimRewardFish);

loadGameData();
resetDailyStatusIfNeeded();
timeLeft = selectedDurationSeconds;
renderTanks();
renderTankStats();
saveGameData();

window.getDailyAquariumSessions = function () {
  return JSON.parse(localStorage.getItem("sessionHistory") || "[]");
};
