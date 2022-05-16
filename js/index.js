class User {
  constructor(username, password) {
    this.username = username;
    this.password = password;
  }
}
let users = [];

let previousTab = null;

$(document).ready(function () {
  users.push(new User("k", "k"));
});

function goToLogin() {
  const loginTab = $(".loginTab");
  switchToTab(loginTab);
}

function goToRegister() {
  const registerTab = $(".registerTab");
  switchToTab(registerTab);
}
function goToWelcome() {
  const welcomeTab = $(".welcomeTab");
  switchToTab(welcomeTab);
}

function goToGame() {
  const gameTab = $(".gameTab");
  switchToTab(gameTab);
  StartGame();
}

function goToAbout() {
  previousTab = $(".tabContainer.activeTab");
  const aboutTab = $(".aboutTab");
  switchToTab(aboutTab);
  initAbout();
}

function goToSettings() {
  const settingsTab = $(".settingsTab");
  switchToTab(settingsTab);
}

function switchToTab(newTab) {
  previousTab = $(".tabContainer.activeTab");
  if (previousTab) {
    finishedGame();
  }
  previousTab = null;
  $(".tabContainer").removeClass("activeTab");
  $(newTab).addClass("activeTab");
}

function switchToPreviousTab() {
  if (previousTab == null) {
    goToWelcome();
  } else {
    switchToTab(previousTab);
    previousTab = null;
  }
}
