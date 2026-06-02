const savedWork = localStorage.getItem("pomodoroMinutes");
const savedBreak = localStorage.getItem("breakMinutes");
const WORK_SECONDS = (savedWork ? Number(savedWork) : 25) * 60;
const BREAK_SECONDS = (savedBreak ? Number(savedBreak) : 5) * 60;

let mode = "work";
let remaining = WORK_SECONDS;
let intervalId = null;
let completedCount = 0;

const container = document.querySelector(".container");
const timeEl = document.querySelector(".time");
const modeLabel = document.getElementById("mode-label");
const progressEl = document.getElementById("progress");
const countInput = document.getElementById("pomodoro-count");

updateDisplay();
updateModeUI();

function formatTime(seconds) {
  const m = String(Math.floor(seconds / 60)).padStart(2, "0");
  const s = String(seconds % 60).padStart(2, "0");
  return `${m}:${s}`;
}

function updateDisplay() {
  timeEl.textContent = formatTime(remaining);
}

function updateModeUI() {
  const targetCount = Number(countInput.value) || 1;
  const sessionNum = mode === "work" ? completedCount + 1 : completedCount;

  if (mode === "break") {
    container.classList.add("break-mode");
    modeLabel.textContent = "휴식";
  } else {
    container.classList.remove("break-mode");
    modeLabel.textContent = "집중";
  }
  progressEl.textContent = `${sessionNum} / ${targetCount}`;
}

function startTimer() {
  if (intervalId !== null) return;
  intervalId = setInterval(() => {
    if (remaining <= 0) {
      clearInterval(intervalId);
      intervalId = null;
      onTimerEnd();
      return;
    }
    remaining--;
    updateDisplay();
  }, 1000);
}

function onTimerEnd() {
  const targetCount = Number(countInput.value) || 1;

  if (mode === "work") {
    completedCount++;
    if (completedCount >= targetCount) {
      completedCount = 0;
      mode = "work";
      remaining = WORK_SECONDS;
      updateDisplay();
      updateModeUI();
      return;
    }
    mode = "break";
    remaining = BREAK_SECONDS;
  } else {
    mode = "work";
    remaining = WORK_SECONDS;
  }
  updateDisplay();
  updateModeUI();
  startTimer();
}

function stopTimer() {
  clearInterval(intervalId);
  intervalId = null;
}

function resetTimer() {
  stopTimer();
  mode = "work";
  remaining = WORK_SECONDS;
  completedCount = 0;
  updateDisplay();
  updateModeUI();
}
