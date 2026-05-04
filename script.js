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

let currentTask = "";
let timeLeft = 10; 
let timerId = null;
let currentRewardFish = null;
let tanks = {
  small: [null, null, null, null, null, null],
  large: [[], [], []]
};
let collectedFishIds = [];
let hasClaimedToday = false;
let lastClaimDate = "";

function showPage(pageName) {
  Object.values(pages).forEach((page) => page.classList.remove("active"));
  pages[pageName].classList.add("active");
}

pages.welcome.addEventListener("click", () => {
  showPage("input");
});

startBtn.addEventListener("click", () => {
  const value = taskInput.value.trim();

  if (!value) {
    alert("请先输入一个目标");
    return;
  }

  //if (hasClaimedToday) {
  //  alert("今天已经认养过一条鱼啦，明天再来看看吧。");
  //  return;
  //}

  currentTask = value;
  timerTaskText.textContent = currentTask;
  timeLeft = 10; // 测试阶段先用 10 秒，正式版改回 15 * 60

  showPage("timer");
  startTimer();
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

function placeFishIntoTank(fish) {
  if (fish.type === "single") {
    for (let i = 0; i < tanks.small.length; i++) {
      if (tanks.small[i] === null) {
        tanks.small[i] = fish;
        return;
      }
    }
  }

  if (fish.type === "group") {
    for (let i = 0; i < tanks.large.length; i++) {
      if (tanks.large[i].length === 0) {
        tanks.large[i] = [fish, fish, fish];
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

function resetDailyStatusIfNeeded() {
  const today = getTodayString();

  if (lastClaimDate !== today) {
    hasClaimedToday = false;
  }
}

function renderTanks() {
  for (let i = 0; i < tanks.small.length; i++) {
    const tankEl = document.getElementById(`small-tank-${i}`);
    const fish = tanks.small[i];

    if (fish) {
      tankEl.innerHTML = `
        <div class="fish-single">
          <img src="${fish.image}" alt="${fish.name}" class="tank-fish-img single-img">
        </div>
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
          ${fishGroup.map(f => `
            <span class="fish-group-item">
              <img src="${f.image}" alt="${f.name}" class="tank-fish-img group-img">
            </span>
          `).join("")}
        </div>
      `;
    } else {
      tankEl.innerHTML = `<div class="tank-empty"></div>`;
    }
  }
}

function saveGameData() {
  localStorage.setItem("collectedFishIds", JSON.stringify(collectedFishIds));
  localStorage.setItem("tanks", JSON.stringify(tanks));
  localStorage.setItem("hasClaimedToday", JSON.stringify(hasClaimedToday));
  localStorage.setItem("lastClaimDate", lastClaimDate);
}

function loadGameData() {
  const savedCollectedFishIds = localStorage.getItem("collectedFishIds");
  const savedTanks = localStorage.getItem("tanks");
  const savedHasClaimedToday = localStorage.getItem("hasClaimedToday");
  const savedLastClaimDate = localStorage.getItem("lastClaimDate");

  if (savedCollectedFishIds) {
    collectedFishIds = JSON.parse(savedCollectedFishIds);
  }

  if (savedTanks) {
    tanks = JSON.parse(savedTanks);
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
  updateTimerDisplay();

  timerId = setInterval(() => {
    timeLeft--;
    updateTimerDisplay();

    if (timeLeft <= 0) {
      clearInterval(timerId);
      showRewardFish();
      showPage("reward");
    }
  }, 1000);
}

function updateTimerDisplay() {
  const minutes = String(Math.floor(timeLeft / 60)).padStart(2, "0");
  const seconds = String(timeLeft % 60).padStart(2, "0");
  timerDisplay.textContent = `${minutes}:${seconds}`;
}

pages.reward.addEventListener("click", () => {
  if (!currentRewardFish) return;

  placeFishIntoTank(currentRewardFish);

  if (!collectedFishIds.includes(currentRewardFish.id)) {
    collectedFishIds.push(currentRewardFish.id);
  }

  //hasClaimedToday = true;
  //lastClaimDate = getTodayString();

  saveGameData();
  renderTanks();
  showPage("tank");
});

loadGameData();
resetDailyStatusIfNeeded();
renderTanks();
saveGameData();

localStorage.removeItem("hasClaimedToday");
localStorage.removeItem("lastClaimDate");

localStorage.clear();