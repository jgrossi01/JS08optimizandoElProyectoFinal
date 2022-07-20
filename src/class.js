import{ nextIndexOf } from "./main.js";

class Car {
    constructor (id, carModel, img, dayprice, passengers, fuel, transmission, abs){
        this.id = parseInt(id);
        this.name = carModel;
        this.img = img
        this.dayprice = parseInt(dayprice);
        this.passengers = parseInt(passengers);
        this.fuel = fuel;
        this.transmission = transmission;
        this.abs = abs;
    }
}

class Reservation {
    constructor (id, carname, quantity, rentedDays, dayPrice, total){
        this.id = parseInt(id);
        this.carname = carname;
        this.quantity = parseInt(quantity);
        this.renteddays = parseInt(rentedDays);
        this.dayprice = Number(dayPrice);
        this.total = Number(total); 
    }
}

// Clase 12. Operador logico OR si existe x || tal cosa
const arrayReservations = JSON.parse(localStorage.getItem('cart')) || [];

const arrayCars = [];
arrayCars.push(new Car (nextIndexOf(arrayCars),"Etios", "etios.png", 2000,4,"Nafta","Manual",false));
arrayCars.push(new Car (nextIndexOf(arrayCars),"Corolla", "corolla.png", 3000,5,"Nafta","Automatico",true));
arrayCars.push(new Car (nextIndexOf(arrayCars),"Hilux", "hilux.png", 4000,5,"Diesel","Manual",true));
console.log(arrayCars);

export{ Car,Reservation,arrayCars,arrayReservations };