// Caricamento della pagina
window.onload = function () {

  // Identificare gli elementi nel DOM
  const buttonProceed = document.getElementById("proceed");
  const checkBox = document.getElementById("promise");
  buttonProceed.disabled = true;

  // Clicca o no
  checkBox.addEventListener("change", function () {
    if (checkBox.checked === true) {
      buttonProceed.disabled = false;
    } else {
      buttonProceed.disabled = true;
    }
  })
}