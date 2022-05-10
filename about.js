// Get the modal
var modal = null;

// Get the button that opens the modal
// var btn = document.getElementById("myBtn");

// Get the <span> element that closes the modal

// When the user clicks on the button, open the modal
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
    // escape key maps to keycode `27`
    closeHandler();
  }
}

function modalWindowClicked(e) {
  if (e.target == modal) {
    closeHandler();
  }
}

// When the user clicks on <span> (x), close the modal

// When the user clicks anywhere outside of the modal, close it
// window.onclick = function (event) {
//   if (event.target == modal) {
//     modal.style.display = "none";
//   }
// };
