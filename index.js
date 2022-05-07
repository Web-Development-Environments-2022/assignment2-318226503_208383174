class User {
  constructor(username, password) {
    this.username = username;
    this.password = password;
  }
}
let users = [];

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
  const registerTab = $(".welcomeTab");
  switchToTab(registerTab);
}

function goToGame() {
  const registerTab = $(".gameTab");
  switchToTab(registerTab);
  StartGame();
}

function goToAbout() {
  const registerTab = $(".aboutTab");
  switchToTab(registerTab);
}

function goToSettings() {
  const registerTab = $(".settingsTab");
  switchToTab(registerTab);
  // startSettings();
}

function switchToTab(newTab) {
  $(".tabContainer").removeClass("activeTab");
  $(newTab).addClass("activeTab");
  stopInterval();
}
