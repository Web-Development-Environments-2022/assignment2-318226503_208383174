var modal = null;

function initAbout() {
  if (modal == null) {
    modal = document.getElementById("myModal");
    modal.style.display = "block";

    span = document.getElementsByClassName("close")[0];
    span.onclick = closeHandler;
  }
  $(document).keyup(escPressedHandler);
  $(window).click(modalWindowClicked);
}

function disposeAbout() {
  $(document).unbind("keyup", escPressedHandler);
  $(window).unbind("click", modalWindowClicked);
  modal = null;
}

function closeHandler() {
  modal.style.display = "none";
  disposeAbout();
  switchToPreviousTab();
}

function escPressedHandler(e) {
  if (e.key === "Escape") {
    closeHandler();
  }
}

function modalWindowClicked(e) {
  if (e.target == modal) {
    closeHandler();
  }
}
