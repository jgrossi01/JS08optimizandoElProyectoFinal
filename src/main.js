import { formValidate, clearMsj } from "./form.js";
import { createLi, loadCards, loadExistingValues } from "./content.js";
import { arrayCars, arrayReservations } from "./class.js";

window.addEventListener("DOMContentLoaded", (event) => {

  const daysInput = document.getElementById("daysInput");
  // Se puede usar document.querySelector('#daysInput')
  const quantityInput = document.getElementById("quantityInput");
  const bookingForm = document.getElementById("bookingForm");
  const clearFormBtn = document.getElementById("clearFormBtn");
  const rentItBtn = document.getElementsByClassName("rentItBtn");

  createLi();
  loadCards();
  loadExistingValues();

  // Carga en el formulario el vehiculo seleccionado en las cards y redirige arriba 
  Array.from(rentItBtn).forEach(function(element) {
    element.addEventListener('click', () => { 
      const id = element.parentElement.parentElement.parentElement.id;
      const target = arrayCars.find((model) => model.id === parseInt(id)); 
      createLi(target.name);
      bookingForm.scrollIntoView(true);
    });
  });

});

// Cuando se deja de escribir se guarda el nuevo valor en el storage
daysInput.addEventListener("keyup", () => {
  localStorage.setItem("daysInput", JSON.stringify(daysInput.value));
});

// Cuando se deja de escribir se guarda el nuevo valor en el storage
quantityInput.addEventListener("keyup", () => {
  localStorage.setItem("quantityInput", JSON.stringify(quantityInput.value));
});

// El boton limpiar quita los valores del campo y del storage
clearFormBtn.addEventListener("click", () => {
  localStorage.clear();
  bookingForm.reset();
  clearMsj(false,false);
  arrayReservations.length = 0;
  console.log(arrayReservations);
});

// Ejecutamos la validacion del forumlario al ser enviado
bookingForm.addEventListener("submit", formValidate);

function nextIndexOf(array) {
  return array.length + 1;
}

export { nextIndexOf };
