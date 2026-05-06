const fishList = [
  {
    id: "guppy",
    name: "孔雀鱼",
    nameEn: "Guppy",
    type: "single",
    image: "./assets/fish/guppy.png",
    description: "小小一只，却总把尾巴撑得很认真。",
    descriptionEn: "Tiny, bright, and always swimming with a very serious tail."
  },
  {
    id: "betta",
    name: "斗鱼",
    nameEn: "Betta",
    type: "single",
    image: "./assets/fish/betta.png",
    description: "看起来有点骄傲，其实只是想把裙摆整理好。",
    descriptionEn: "It looks a little proud, but maybe it is just arranging its fins."
  },
  {
    id: "goldfish",
    name: "金鱼",
    nameEn: "Goldfish",
    type: "single",
    image: "./assets/fish/goldfish.png",
    description: "圆圆的，慢慢的，像把时间也一起游慢了。",
    descriptionEn: "Round and slow, as if it has learned how to soften time."
  },

  {
    id: "neon-tetra",
    name: "霓虹灯鱼",
    nameEn: "Neon Tetra",
    type: "group",
    image: "./assets/fish/neon-tetra.png",
    description: "身上那一道蓝光，像把夜晚偷偷装进了水里。",
    descriptionEn: "That blue glow looks like a quiet piece of night inside the water."
  },
  {
    id: "white-cloud",
    name: "白云金丝",
    nameEn: "White Cloud",
    type: "group",
    image: "./assets/fish/white-cloud.png",
    description: "名字里有云，游起来也真的轻轻的。",
    descriptionEn: "With cloud in its name, it really does swim like a small breeze."
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
const languageToggleBtn = document.getElementById("languageToggleBtn");
const inputMessage = document.getElementById("inputMessage");
const timerTip = document.getElementById("timerTip");
const focusAgainBtn = document.getElementById("focusAgainBtn");
const soundBtn = document.getElementById("soundBtn");
const shareBtn = document.getElementById("shareBtn");
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
const aquariumStage = document.getElementById("aquariumStage");
const aquariumEmptyState = document.getElementById("aquariumEmptyState");
const aquariumViewButtons = document.querySelectorAll(".aquarium-view-btn");
const aquariumMonthSelect = document.getElementById("aquariumMonthSelect");
const sessionsStatLabel = document.getElementById("sessionsStatLabel");
const minutesStatLabel = document.getElementById("minutesStatLabel");
const fishStatLabel = document.getElementById("fishStatLabel");
const speciesStatLabel = document.getElementById("speciesStatLabel");
const monthFilterLabel = document.getElementById("monthFilterLabel");
const historyTaskLabel = document.getElementById("historyTaskLabel");
const historyDateLabel = document.getElementById("historyDateLabel");
const historyTimeLabel = document.getElementById("historyTimeLabel");
const historyDurationLabel = document.getElementById("historyDurationLabel");
const TEST_DURATION_SECONDS = 5;
const translations = {
  zh: {
    htmlLang: "zh-CN",
    documentTitle: "认养一条鱼｜15分钟鱼缸",
    languageButton: "English",
    languageButtonAria: "Switch to English",
    welcomeTitle: "专注15分钟，认养一条鱼",
    enterApp: "开始认养",
    inputTitle: "设置本次专注",
    taskLabel: "本次专注目标",
    taskPlaceholder: "在此输入专注内容，例如看书、洗澡、小憩",
    timeText: "选择一段小鱼陪你的时间",
    durationAria: "选择专注时长",
    minuteShort: "分钟",
    start: "开始",
    timerControlsAria: "计时控制",
    pause: "暂停",
    resume: "继续",
    reset: "重置",
    rewardTitle: "恭喜你获得了一条鱼",
    placeFish: "放入鱼缸",
    focusAgain: "再次专注",
    soundAria: "声音开关",
    shareAria: "分享鱼缸",
    tankTitle: "我的专注鱼缸",
    statsAria: "专注统计",
    sessionsStat: "专注次数",
    minutesStat: "专注分钟",
    fishStat: "收集小鱼",
    speciesStat: "水族馆",
    fishUnit: "条",
    speciesUnit: "种",
    aquariumRangeAria: "切换鱼缸时间范围",
    aquariumStageAria: "水族馆中的小鱼",
    monthLabel: "月份",
    monthSelectAria: "选择月份",
    viewLabels: {
      today: "今日鱼缸",
      week: "本周鱼缸",
      month: "本月鱼缸",
      year: "本年鱼缸"
    },
    monthNames: [
      "1月", "2月", "3月", "4月", "5月", "6月",
      "7月", "8月", "9月", "10月", "11月", "12月"
    ],
    currentMonthView: (month) => `${month}鱼缸`,
    emptyAquarium: (viewLabel) => `${viewLabel}还很安静。完成一次专注后，小鱼会出现在这里。`,
    historyCloseAria: "关闭",
    historyLabel: "专注记录",
    historyTask: "专注内容",
    historyDate: "获得日期",
    historyTime: "获得时间",
    historyDuration: "专注时间",
    noRecord: "暂无记录",
    unknownFish: "未知小鱼",
    unknownFishDesc: "这条小鱼还没有留下简介。",
    historyButtonLabel: (fishName, task) => `查看${fishName}的专注记录${task ? `，来自 ${task}` : ""}`,
    durationValue: (minutes) => `${minutes} 分钟`,
    messages: {
      emptyTask: "先写下一件小小的事吧，只要一件就好。",
      running: "不用着急，小鱼正在安静地陪你游。",
      paused: "先停一下也没关系，小鱼会陪你等一会儿。",
      resumed: "欢迎回来，我们慢慢继续。",
      resetConfirm: "小鱼会先在这里等你。要重新开始这次专注吗？",
      resetDone: "没关系，准备好后再开始也很好。"
    }
  },
  en: {
    htmlLang: "en",
    documentTitle: "Daily Aquarium | 15-Minute Focus Tank",
    languageButton: "中文",
    languageButtonAria: "切换到中文",
    welcomeTitle: "Focus once, adopt a fish",
    enterApp: "Start Focus",
    inputTitle: "Set This Focus Session",
    taskLabel: "Focus goal",
    taskPlaceholder: "Enter one small goal, like reading, tidying, or resting",
    timeText: "Choose how long the fish will keep you company",
    durationAria: "Choose focus duration",
    minuteShort: "min",
    start: "Start",
    timerControlsAria: "Timer controls",
    pause: "Pause",
    resume: "Resume",
    reset: "Reset",
    rewardTitle: "You earned a fish",
    placeFish: "Place in Aquarium",
    focusAgain: "Focus Again",
    soundAria: "Sound toggle",
    shareAria: "Share aquarium",
    tankTitle: "My Focus Aquarium",
    statsAria: "Focus stats",
    sessionsStat: "Sessions",
    minutesStat: "Minutes",
    fishStat: "Fish",
    speciesStat: "Aquarium",
    fishUnit: "fish",
    speciesUnit: "species",
    aquariumRangeAria: "Switch aquarium time range",
    aquariumStageAria: "Fish in the aquarium",
    monthLabel: "Month",
    monthSelectAria: "Choose month",
    viewLabels: {
      today: "Today",
      week: "This Week",
      month: "This Month",
      year: "This Year"
    },
    monthNames: [
      "Jan", "Feb", "Mar", "Apr", "May", "Jun",
      "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
    ],
    currentMonthView: (month) => `${month} Aquarium`,
    emptyAquarium: (viewLabel) => `${viewLabel} is still quiet. Complete a focus session to add a fish here.`,
    historyCloseAria: "Close",
    historyLabel: "Focus Record",
    historyTask: "Focus goal",
    historyDate: "Date earned",
    historyTime: "Time earned",
    historyDuration: "Focus time",
    noRecord: "No record yet",
    unknownFish: "Unknown fish",
    unknownFishDesc: "This fish does not have a description yet.",
    historyButtonLabel: (fishName, task) => `View ${fishName}'s focus record${task ? ` from ${task}` : ""}`,
    durationValue: (minutes) => `${minutes} min`,
    messages: {
      emptyTask: "Write down one small thing first. Just one is enough.",
      running: "No rush. The fish is quietly swimming with you.",
      paused: "Taking a pause is okay. The fish will wait with you.",
      resumed: "Welcome back. Let's continue gently.",
      resetConfirm: "The fish will wait here. Restart this focus session?",
      resetDone: "That's okay. You can begin again when you're ready."
    }
  }
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
let aquariumFish = [];
let collectedFishIds = [];
let sessionHistory = [];
let hasClaimedToday = false;
let lastClaimDate = "";
let lastFocusedElement = null;
let aquariumViewMode = "today";
let selectedAquariumMonth = new Date().getMonth();
let currentLanguage = localStorage.getItem("dailyAquariumLanguage") || "zh";

if (!translations[currentLanguage]) {
  currentLanguage = "zh";
}

function getCopy() {
  return translations[currentLanguage] || translations.zh;
}

function getMessages() {
  return getCopy().messages;
}

function getFishName(fish) {
  return currentLanguage === "en" ? (fish.nameEn || fish.name) : fish.name;
}

function getFishDescription(fish) {
  return currentLanguage === "en" ? (fish.descriptionEn || fish.description) : fish.description;
}

function getFishDisplayText(entry) {
  const fish = fishList.find((item) => item.id === (entry.fishId || entry.id));

  if (fish) {
    return {
      name: getFishName(fish),
      description: getFishDescription(fish)
    };
  }

  return {
    name: entry.name || getCopy().unknownFish,
    description: entry.description || getCopy().unknownFishDesc
  };
}

function showPage(pageName) {
  Object.values(pages).forEach((page) => page.classList.remove("active"));
  pages[pageName].classList.add("active");
}

function setElementText(id, text) {
  const element = document.getElementById(id);
  if (element) {
    element.textContent = text;
  }
}

function applyLanguage() {
  const copy = getCopy();

  document.documentElement.lang = copy.htmlLang;
  document.title = copy.documentTitle;
  languageToggleBtn.textContent = copy.languageButton;
  languageToggleBtn.setAttribute("aria-label", copy.languageButtonAria);
  setElementText("welcomeTitle", copy.welcomeTitle);
  enterAppBtn.textContent = copy.enterApp;
  setElementText("inputTitle", copy.inputTitle);
  document.querySelector("label[for='taskInput']").textContent = copy.taskLabel;
  taskInput.placeholder = copy.taskPlaceholder;
  document.querySelector(".time-text").textContent = copy.timeText;
  document.querySelector(".duration-options").setAttribute("aria-label", copy.durationAria);
  durationButtons.forEach((button) => {
    button.textContent = `${button.dataset.duration}${copy.minuteShort}`;
  });
  startBtn.textContent = copy.start;
  document.querySelector(".timer-controls").setAttribute("aria-label", copy.timerControlsAria);
  pauseResumeBtn.textContent = timerState === "paused" ? copy.resume : copy.pause;
  resetBtn.textContent = copy.reset;
  timerTip.textContent = timerState === "paused" ? copy.messages.paused : copy.messages.running;
  setElementText("rewardFishName", currentRewardFish ? getFishName(currentRewardFish) : getFishName(fishList[0]));
  setElementText("rewardFishDesc", currentRewardFish ? getFishDescription(currentRewardFish) : getFishDescription(fishList[0]));
  document.querySelector(".reward-title").textContent = copy.rewardTitle;
  placeFishBtn.textContent = copy.placeFish;
  focusAgainBtn.textContent = copy.focusAgain;
  soundBtn.setAttribute("aria-label", copy.soundAria);
  shareBtn.setAttribute("aria-label", copy.shareAria);
  setElementText("tankTitle", copy.tankTitle);
  document.querySelector(".tank-stats").setAttribute("aria-label", copy.statsAria);
  sessionsStatLabel.textContent = copy.sessionsStat;
  minutesStatLabel.textContent = copy.minutesStat;
  fishStatLabel.textContent = copy.fishStat;
  speciesStatLabel.textContent = copy.speciesStat;
  document.querySelector(".aquarium-view-controls").setAttribute("aria-label", copy.aquariumRangeAria);
  aquariumStage.setAttribute("aria-label", copy.aquariumStageAria);
  aquariumViewButtons.forEach((button) => {
    button.textContent = copy.viewLabels[button.dataset.viewMode];
  });
  monthFilterLabel.textContent = copy.monthLabel;
  aquariumMonthSelect.setAttribute("aria-label", copy.monthSelectAria);
  setElementText("historyTaskLabel", copy.historyTask);
  setElementText("historyDateLabel", copy.historyDate);
  setElementText("historyTimeLabel", copy.historyTime);
  setElementText("historyDurationLabel", copy.historyDuration);
  document.querySelector(".history-label").textContent = copy.historyLabel;
  closeFishHistoryBtn.setAttribute("aria-label", copy.historyCloseAria);
  populateMonthFilter();
  renderTanks();
  renderTankStats();
}

languageToggleBtn.addEventListener("click", () => {
  currentLanguage = currentLanguage === "zh" ? "en" : "zh";
  localStorage.setItem("dailyAquariumLanguage", currentLanguage);
  inputMessage.textContent = "";
  timerTip.textContent = getMessages().running;
  applyLanguage();
});

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
    inputMessage.textContent = getMessages().emptyTask;
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
  timerTip.textContent = getMessages().running;
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
  timerTip.textContent = getMessages().running;
  timeLeft = selectedDurationSeconds;
  updateTimerDisplay();
  showPage("input");
});

aquariumViewButtons.forEach((button) => {
  button.addEventListener("click", () => {
    aquariumViewMode = button.dataset.viewMode;

    aquariumViewButtons.forEach((item) => {
      item.classList.remove("active");
      item.setAttribute("aria-pressed", "false");
    });

    button.classList.add("active");
    button.setAttribute("aria-pressed", "true");
    updateMonthFilterState();
    renderTanks();
    renderTankStats();
  });
});

aquariumMonthSelect.addEventListener("change", () => {
  selectedAquariumMonth = Number(aquariumMonthSelect.value);
  aquariumViewMode = "month";

  aquariumViewButtons.forEach((item) => {
    const isMonthButton = item.dataset.viewMode === "month";
    item.classList.toggle("active", isMonthButton);
    item.setAttribute("aria-pressed", String(isMonthButton));
  });

  updateMonthFilterState();
  renderTanks();
  renderTankStats();
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
    <img src="${currentRewardFish.image}" alt="${getFishName(currentRewardFish)}" class="reward-fish-img">
  `;
  rewardFishName.textContent = getFishName(currentRewardFish);
  rewardFishDesc.textContent = getFishDescription(currentRewardFish);
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
  const position = getAquariumFishPosition(aquariumFish.length);

  return {
    fishId: fish.id,
    name: fish.name,
    nameEn: fish.nameEn,
    type: fish.type,
    image: fish.image,
    description: fish.description,
    descriptionEn: fish.descriptionEn,
    sessionId: currentSessionRecord ? currentSessionRecord.id : "",
    earnedAt: currentSessionRecord ? currentSessionRecord.date : new Date().toISOString(),
    durationMinutes: currentSessionRecord ? currentSessionRecord.durationMinutes : selectedDurationMinutes,
    task: currentSessionRecord ? currentSessionRecord.task : currentTask,
    x: position.x,
    y: position.y,
    size: fish.type === "group" ? "small" : "medium",
    direction: position.direction
  };
}

function normalizeTankFishRecord(entry) {
  if (!entry) return null;

  const fish = fishList.find((item) => item.id === (entry.fishId || entry.id));
  const displayText = getFishDisplayText(entry);

  return {
    fishId: entry.fishId || entry.id,
    name: displayText.name,
    nameEn: entry.nameEn || (fish ? fish.nameEn : ""),
    type: entry.type || (fish ? fish.type : "single"),
    image: entry.image || (fish ? fish.image : ""),
    description: displayText.description,
    descriptionEn: entry.descriptionEn || (fish ? fish.descriptionEn : ""),
    sessionId: entry.sessionId || "",
    earnedAt: entry.earnedAt || entry.date || "",
    durationMinutes: entry.durationMinutes || "",
    task: entry.task || "",
    x: typeof entry.x === "number" ? entry.x : 50,
    y: typeof entry.y === "number" ? entry.y : 50,
    size: entry.size || (entry.type === "group" ? "small" : "medium"),
    direction: entry.direction || "right"
  };
}

function getTankFishLabel(entry) {
  const fish = normalizeTankFishRecord(entry);
  return getCopy().historyButtonLabel(fish.name, fish.task);
}

function getAquariumFishPosition(index) {
  const positions = [
    { x: 18, y: 34, direction: "right" },
    { x: 38, y: 58, direction: "left" },
    { x: 62, y: 28, direction: "right" },
    { x: 78, y: 50, direction: "left" },
    { x: 28, y: 72, direction: "right" },
    { x: 52, y: 42, direction: "left" },
    { x: 72, y: 74, direction: "right" },
    { x: 14, y: 56, direction: "left" },
    { x: 46, y: 78, direction: "right" },
    { x: 84, y: 30, direction: "left" },
    { x: 34, y: 26, direction: "right" },
    { x: 64, y: 62, direction: "left" }
  ];

  return positions[index % positions.length];
}

function placeFishIntoTank(fish) {
  aquariumFish.push(createTankFishRecord(fish));
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

function getStartOfWeek(date) {
  const start = new Date(date);
  const day = start.getDay();
  const diff = day === 0 ? -6 : 1 - day;
  start.setDate(start.getDate() + diff);
  start.setHours(0, 0, 0, 0);
  return start;
}

function isSameDay(date, compareDate) {
  return date.getFullYear() === compareDate.getFullYear()
    && date.getMonth() === compareDate.getMonth()
    && date.getDate() === compareDate.getDate();
}

function isFishInCurrentAquariumView(fish) {
  const earnedDate = new Date(fish.earnedAt);

  if (Number.isNaN(earnedDate.getTime())) {
    return false;
  }

  const now = new Date();

  if (aquariumViewMode === "today") {
    return isSameDay(earnedDate, now);
  }

  if (aquariumViewMode === "week") {
    const startOfWeek = getStartOfWeek(now);
    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(startOfWeek.getDate() + 7);
    return earnedDate >= startOfWeek && earnedDate < endOfWeek;
  }

  if (aquariumViewMode === "month") {
    return earnedDate.getFullYear() === now.getFullYear()
      && earnedDate.getMonth() === selectedAquariumMonth;
  }

  if (aquariumViewMode === "year") {
    return earnedDate.getFullYear() === now.getFullYear();
  }

  return true;
}

function getVisibleAquariumFish() {
  return aquariumFish
    .map((entry, originalIndex) => ({
      ...normalizeTankFishRecord(entry),
      originalIndex
    }))
    .filter(isFishInCurrentAquariumView);
}

function getAquariumViewLabel() {
  const copy = getCopy();
  const monthLabel = copy.monthNames[selectedAquariumMonth];
  const labels = {
    ...copy.viewLabels,
    month: copy.currentMonthView(monthLabel)
  };

  return labels[aquariumViewMode] || copy.viewLabels.today;
}

function updateMonthFilterState() {
  aquariumMonthSelect.disabled = aquariumViewMode !== "month";
}

function populateMonthFilter() {
  const monthNames = getCopy().monthNames;

  aquariumMonthSelect.innerHTML = monthNames.map((monthName, index) => {
    return `<option value="${index}">${monthName}</option>`;
  }).join("");
  aquariumMonthSelect.value = String(selectedAquariumMonth);
  updateMonthFilterState();
}

function resetDailyStatusIfNeeded() {
  const today = getTodayString();

  if (lastClaimDate !== today) {
    hasClaimedToday = false;
  }
}

function migrateTanksToAquariumFish() {
  if (aquariumFish.length > 0) return;

  const legacyFish = [
    ...tanks.small.filter(Boolean),
    ...tanks.large.flat().filter(Boolean)
  ];

  aquariumFish = legacyFish.map((entry, index) => {
    const fish = normalizeTankFishRecord(entry);
    const position = getAquariumFishPosition(index);
    return {
      ...fish,
      x: position.x,
      y: position.y,
      direction: position.direction
    };
  });
}

function renderTanks() {
  const fishRecords = getVisibleAquariumFish();

  aquariumEmptyState.hidden = fishRecords.length > 0;
  aquariumEmptyState.textContent = getCopy().emptyAquarium(getAquariumViewLabel());
  aquariumStage.querySelectorAll(".aquarium-fish").forEach((fishEl) => fishEl.remove());

  fishRecords.forEach((fish, index) => {
    const fishButton = document.createElement("button");
    fishButton.className = `aquarium-fish fish-history-trigger ${fish.size === "small" ? "aquarium-fish-small" : "aquarium-fish-medium"}`;
    fishButton.type = "button";
    fishButton.dataset.fishIndex = String(fish.originalIndex);
    fishButton.style.left = `${fish.x}%`;
    fishButton.style.top = `${fish.y}%`;
    fishButton.style.setProperty("--swim-delay", `${(index % 6) * 0.35}s`);
    fishButton.setAttribute("aria-label", getTankFishLabel(fish));

    if (fish.direction === "left") {
      fishButton.classList.add("swim-left");
    }

    fishButton.innerHTML = `<img src="${fish.image}" alt="${fish.name}" class="aquarium-fish-img">`;
    aquariumStage.appendChild(fishButton);
  });
}

function getAquariumFishCount() {
  return aquariumFish.length;
}

function getUniqueCollectedFishCount() {
  const uniqueIds = new Set(aquariumFish.map((fish) => normalizeTankFishRecord(fish).fishId));
  return uniqueIds.size;
}

function getTotalCollectedFishCount() {
  return getVisibleAquariumFish().length;
}

function getTodaySessions() {
  const today = getTodayString();

  return sessionHistory.filter((session) => {
    return getDateStringFromIso(session.date) === today;
  });
}

function renderTankStats() {
  const visibleFish = getVisibleAquariumFish();
  const visibleSessionIds = new Set(visibleFish.map((fish) => fish.sessionId));
  const visibleSessions = sessionHistory.filter((session) => {
    return visibleSessionIds.has(session.id);
  });
  const visibleMinutes = visibleSessions.reduce((total, session) => {
    return total + Number(session.durationMinutes || 0);
  }, 0);
  const visibleUniqueIds = new Set(visibleFish.map((fish) => fish.fishId));

  todaySessionsStat.textContent = String(visibleSessions.length);
  todayMinutesStat.textContent = String(visibleMinutes);
  totalFishStat.textContent = String(getTotalCollectedFishCount());
  tankCapacityStat.textContent = `${visibleUniqueIds.size}${getCopy().speciesUnit}`;
}

function getTankFishByTrigger(trigger) {
  const fishIndex = Number(trigger.dataset.fishIndex);
  return normalizeTankFishRecord(aquariumFish[fishIndex]);
}

function formatFishHistoryDate(earnedAt) {
  const copy = getCopy();

  if (!earnedAt) return { date: copy.noRecord, time: copy.noRecord };

  const date = new Date(earnedAt);

  if (Number.isNaN(date.getTime())) {
    return { date: copy.noRecord, time: copy.noRecord };
  }

  return {
    date: date.toLocaleDateString(copy.htmlLang),
    time: date.toLocaleTimeString(copy.htmlLang, {
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
  historyTask.textContent = fish.task || getCopy().noRecord;
  historyDate.textContent = history.date;
  historyTime.textContent = history.time;
  historyDuration.textContent = fish.durationMinutes ? getCopy().durationValue(fish.durationMinutes) : getCopy().noRecord;

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
  localStorage.setItem("aquariumFish", JSON.stringify(aquariumFish));
  localStorage.setItem("sessionHistory", JSON.stringify(sessionHistory));
  localStorage.setItem("hasClaimedToday", JSON.stringify(hasClaimedToday));
  localStorage.setItem("lastClaimDate", lastClaimDate);
}

function loadGameData() {
  const savedCollectedFishIds = localStorage.getItem("collectedFishIds");
  const savedTanks = localStorage.getItem("tanks");
  const savedAquariumFish = localStorage.getItem("aquariumFish");
  const savedSessionHistory = localStorage.getItem("sessionHistory");
  const savedHasClaimedToday = localStorage.getItem("hasClaimedToday");
  const savedLastClaimDate = localStorage.getItem("lastClaimDate");

  if (savedCollectedFishIds) {
    collectedFishIds = JSON.parse(savedCollectedFishIds);
  }

  if (savedTanks) {
    tanks = JSON.parse(savedTanks);
  }

  if (savedAquariumFish) {
    aquariumFish = JSON.parse(savedAquariumFish);
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
  pauseResumeBtn.textContent = getCopy().pause;
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
  pauseResumeBtn.textContent = getCopy().resume;
  timerTip.textContent = getMessages().paused;
}

function resumeTimer() {
  clearInterval(timerId);
  timerState = "running";
  pauseResumeBtn.textContent = getCopy().pause;
  timerTip.textContent = getMessages().resumed;
  runTimer();
}

function resetTimer() {
  if (!window.confirm(getMessages().resetConfirm)) {
    return;
  }

  clearInterval(timerId);
  timerState = "idle";
  timeLeft = selectedDurationSeconds;
  currentRewardFish = null;
  currentSessionRecord = null;
  pauseResumeBtn.textContent = getCopy().pause;
  timerTip.textContent = getMessages().running;
  inputMessage.textContent = getMessages().resetDone;
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
migrateTanksToAquariumFish();
applyLanguage();
saveGameData();

window.getDailyAquariumSessions = function () {
  return JSON.parse(localStorage.getItem("sessionHistory") || "[]");
};
