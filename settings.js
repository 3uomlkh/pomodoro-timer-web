const workInput = document.getElementById("timer-minutes");
const breakInput = document.getElementById("break-minutes");
const saveBtn = document.querySelector(".btn-save");

const savedWork = localStorage.getItem("pomodoroMinutes");
const savedBreak = localStorage.getItem("breakMinutes");
if (savedWork) workInput.value = savedWork;
if (savedBreak) breakInput.value = savedBreak;

function isValid(input) {
  const val = Number(input.value);
  return input.value !== "" && val >= 5 && val <= 60 && val % 5 === 0;
}

function validateInputs() {
  saveBtn.disabled = !isValid(workInput) || !isValid(breakInput);
}

workInput.addEventListener("input", validateInputs);
breakInput.addEventListener("input", validateInputs);

function saveSettings() {
  if (!isValid(workInput) || !isValid(breakInput)) return;
  localStorage.setItem("pomodoroMinutes", Number(workInput.value));
  localStorage.setItem("breakMinutes", Number(breakInput.value));
  location.href = "index.html";
}
