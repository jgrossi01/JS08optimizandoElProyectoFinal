import { nextIndexOf } from "./main.js";
import { arrayCars, Reservation } from "./class.js";



let finalQty;
let finalTotal;
let arrayReservations = [];
let voucherReturn;
let totalDiscount;

const msjBox = document.getElementById("msj");
const msjMsj = document.getElementById("msjmsj");
const msjFinal = document.getElementById("msjfinal");

const errorMsjBox = document.getElementById("errormsj");
const errorMsjMsj = document.getElementById("errormsjmsj");
const errorMsjFinal = document.getElementById("errormsjfinal");

function formValidate(event) {
  event.preventDefault();

  let modelInput = document.getElementById("modelInput").value;
  let quantityInput = document.getElementById("quantityInput").value;
  let daysInput = document.getElementById("daysInput").value;
  let voucher = document.getElementById("voucherInput").value;

  const errors = [];
  let reserveThis;

  if (modelInput) {
    modelInput = modelInput.toLowerCase();
    reserveThis = arrayCars.find(
      (model) => model.name.toLowerCase() === modelInput
    );

    if (!reserveThis) {
      errors.push("No encontramos el modelo solicitado");
    }
  }

  if (!quantityInput || isNaN(quantityInput) || quantityInput < 1) {
    errors.push(`Ingrese una cantidad de vehiculos valida.`);
  }

  if (!daysInput || isNaN(daysInput) || daysInput < 1) {
    errors.push(`Ingrese una cantidad de días válida.`);
  }

  if (voucher) {
    voucherReturn = applyVoucher(voucher);
    if (!voucherReturn) {
      clearMsj();
      errors.push(`No encontramos el cupón ingresado.`);
    }
  }

  if (errors.length === 0) {
    let name = reserveThis.name;
    let dayprice = reserveThis.dayprice;
    let total = Number(reserveThis.dayprice) * daysInput * quantityInput;

    saveThis(name, quantityInput, daysInput, dayprice, total);


  } else {
    errors.forEach((e) => addErrorMsj(e, true));
  }
}

function saveThis(name, quantityInput, daysInput, dayprice, total) {
  localStorage.setItem("quantityInput", JSON.stringify(quantityInput));
  localStorage.setItem("daysInput", JSON.stringify(daysInput));

  let id = nextIndexOf(arrayReservations);
  arrayReservations.push(
    new Reservation(id, name, quantityInput, daysInput, dayprice, total)
  );
  //console.log("Se agregó a tu carrito " +quantityInput + " " + name + " por " + daysInput + " días. Total parcial: $" + total);
  
  updateCart();

  //console.log(arrayReservations);
  localStorage.setItem("cart", JSON.stringify(arrayReservations));



  localStorage.setItem("finalQty", JSON.stringify(finalQty));
  localStorage.setItem("finalTotal", JSON.stringify(finalTotal));

 
  // Quita el cartel de errores si habia
  clearMsj(true);
}

function applyVoucher(voucherCode) {
  switch (voucherCode) {
    case "bariloche":
      totalDiscount = finalTotal - Number(finalTotal) * 0.1;
      return `Se le aplicó el descuento "bariloche" del 10% sobre $${finalTotal}. Su monto a pagar es de $${totalDiscount}`;
    case "rentit2022":
      totalDiscount = finalTotal - Number(finalTotal) * 0.15;
      return `Se le aplicó el descuento "rentit" del 15% sobre $${finalTotal}. Su monto a pagar es de $${totalDiscount}`;
    default:
      return false;
  }
}

function addErrorMsj(msj, final = null) {
  if (errorMsjBox.classList.contains("hidden")) {
    errorMsjBox.classList.remove("hidden");
  }

  if (final) {
    errorMsjFinal.innerHTML = "<p>" + msj + "</p>";
  } else {
    errorMsjMsj.innerHTML += "<p>" + msj + "</p>";
  }
}

function addMsj(msj, final = null) {
  if (msjBox.classList.contains("hidden")) {
    msjBox.classList.remove("hidden");
  }

  if (final) {
    msjFinal.innerHTML = "<p>" + msj + "</p>";
  } else {
    msjMsj.innerHTML += "<p>" + msj + "</p>";
  }
}

function clearMsj(error = null) {
  let destiny;
  if (error) {
    destiny = errorMsjFinal;
  } else {
    destiny = msjFinal;
  }
  destiny.innerHTML = "";
  destiny.innerHTML = "";
  destiny.parentElement.classList.add("hidden");
}

function updateCart (){
    clearMsj();
    // Recuperar y mostrar carrito si existe
    const storageCart = JSON.parse(localStorage.getItem("cart"));
    //const daysInput = document.getElementById("daysInput");
    if(storageCart) {
        arrayReservations = Array.from(storageCart);

        console.log(storageCart);
        //Items en el carrito
        Array.from(storageCart).forEach(function(element) {
            //console.log(element.carname);
            
            const itemTotal = Number(element.dayprice) * Number(element.renteddays);
            addMsj(element.quantity + "x " + element.carname +" por " + element.renteddays + " días. Total item: $" + itemTotal, false);
        });

        finalQty = arrayReservations.reduce((a, b) => a + b["quantity"], 0);
        finalTotal = arrayReservations.reduce((a, b) => a + b["total"], 0);

        //Mensaje final
        if (voucherReturn) {
          addMsj(voucherReturn, true);
        } else {
          addMsj("Reservó correctamente " + finalQty + " vehiculos por un total de $" + finalTotal,true);
        }

        
    }
}

export { formValidate, addMsj, clearMsj, updateCart, arrayReservations };
