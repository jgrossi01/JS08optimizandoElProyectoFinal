import { arrayCars, arrayReservations} from "./class.js";
import { addMsj } from "./form.js";


function createLi(selected = null) {
  const selection = document.getElementById("modelInput");
  selection.innerHTML = '';
  for (const car of arrayCars) {
    // Clase 12. Desestructuracion de datos.
    const { name } = car;
    // CLase 12. Operador ternario ? IF : ELSE
    selected === name ? selection.innerHTML += `<option selected>${name}</option>` : selection.innerHTML += `<option>${name}</option>`;
  }
}

function removeContent() {
  let content = document.getElementById("cards");
  content.innerHTML = "";
}

function loadCards() {
  removeContent();
  let destination = document.getElementById("cards");
  for (const car of arrayCars) {
    // Clase 12. operadores avanzados, simplificacion de codigo
    // en vez de car.id luego usaremos id.
    const {id,img,name,passengers,fuel,transmission} = car;
    const card = document.createElement("section");
    card.classList.add("text-gray-600");
    card.classList.add("body-font");

    card.innerHTML = `
                            <div class="container max-w-7xl my-10 mx-auto px-4 sm:px-6 lg:px-8 card" id="${id}">
                                
                                <div class="p-5 flex items-center mx-auto bg-white border-b border-gray-200 rounded-lg sm:flex-row flex-col min-width-360">
                                    <!-- Imagen principal tarjeta -->
                                    <div class="w-80 h-auto pr-10 pr-0 sm:pr-10 sm:w-60 inline-flex items-center justify-center flex-shrink-0">
                                        <img src="/public/img/${img}"/>
                                    </div>
                                    
                                    <!-- Caracteristicas del vehiculo -->
                                    <div class="flex-grow sm:text-left text-center mt-6 sm:mt-0">
                                        <h1 class="text-black text-2xl title-font font-bold mb-2">${name}</h1>
                                        <div class="inline-flex space-x-2">
                                            <img src="https://img.icons8.com/external-those-icons-lineal-color-those-icons/24/undefined/external-speedometer-cars-components-those-icons-lineal-color-those-icons.png" class="inline-flex "/>
                                            <p> Kilometraje ilimitado</p>
                                        </div>
                                        <div class="py-4 characteristics">
                                            <div class=" inline-block mr-2">
                                                <div class="flex pr-2 h-full items-center space-x-2">
                                                    <img src="https://img.icons8.com/external-those-icons-lineal-color-those-icons/24/undefined/external-safety-seat-cars-components-those-icons-lineal-color-those-icons.png"/>
                                                    <p class="title-font font-medium">${passengers}</p>
                                                </div>
                                            </div>
                                            <div class="inline-block mr-2">
                                                <div class="flex  pr-2 h-full items-center space-x-2">
                                                    <img src="https://img.icons8.com/external-those-icons-lineal-color-those-icons/24/undefined/external-fuel-cars-components-those-icons-lineal-color-those-icons.png"/>
                                                    <p class="title-font font-medium">${fuel}</p>
                                                </div>
                                            </div>
                                            <div class="inline-block mr-2">
                                                <div class="flex  pr-2 h-full items-center space-x-2">
                                                    <img src="https://img.icons8.com/external-those-icons-lineal-color-those-icons/24/undefined/external-gearshift-cars-components-those-icons-lineal-color-those-icons-3.png"/>
                                                    <p class="title-font font-medium">${transmission}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="sm:text-right text-center ml-0 mt-6 sm:mt-0 space-x-2 w-15 max-w-sm">
                                        <button type="button" class="rentItBtn w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-cyan-500 text-base font-medium text-white hover:bg-cyan-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-200 sm:ml-3 sm:w-auto sm:text-sm">Alquilar</button>
                                        <a class="mt-3 text-indigo-500 inline-flex items-center">Mas info
                                            <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-4 h-4 ml-2" viewBox="0 0 24 24">
                                                <path d="M5 12h14M12 5l7 7-7 7"></path>
                                            </svg>
                                            </a>
                                    </div>

                                </div>
                            </div>
                            `;
    destination.appendChild(card);
  }

  //Agregamos la caracteristica ABS si corresponde

  let cards = document.getElementsByClassName("card");
  for (let card of cards) {
    for (let car of arrayCars) {
      if (card.id == car.id && car.abs == true) {
        const characteristics = card.querySelector(".characteristics");
        characteristics.innerHTML += `
                                        <div class="inline-block mr-2">
                                            <div class="flex pr-2 h-full items-center space-x-2">
                                                <img src="https://img.icons8.com/external-those-icons-lineal-color-those-icons/24/undefined/external-abs-cars-components-those-icons-lineal-color-those-icons.png"/>
                                                <p class="title-font font-medium">ABS</p>
                                            </div>
                                        </div>
                                        `;
      }
    }
  }
}

function loadExistingValues (){
    const storageQuantity = JSON.parse(localStorage.getItem("quantityInput"));
    const storageDays = JSON.parse(localStorage.getItem("daysInput"));
    const storageFinalQuantity = JSON.parse( localStorage.getItem("finalQty"));
    const storageFinalTotal = JSON.parse( localStorage.getItem("finalTotal"));

    const quantityInput = document.getElementById("quantityInput");
    const daysInput = document.getElementById("daysInput");

    if(storageQuantity) {quantityInput.value = storageQuantity};
    if(storageDays) {daysInput.value = storageDays};

    if(arrayReservations.length > 0) { 
        
        Array.from(arrayReservations).forEach(function(element) {
            
            addMsj(`Se agregó a tu carrito ${element.quantity} ${element.carname} por ${element.renteddays} días. Total parcial: ${element.total}`,false);
            addMsj(`Reservó correctamente ${storageFinalQuantity} vehiculos por un total de \$${storageFinalTotal}`,true);
        })
    }
    console.log(arrayReservations);

}

export { createLi, removeContent, loadCards, loadExistingValues };
