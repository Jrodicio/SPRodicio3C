"use strict";
var Vehiculo = /** @class */ (function () {
    function Vehiculo(id, marca, modelo, precio) {
        this.id = id;
        this.marca = marca;
        this.modelo = modelo;
        this.precio = precio;
    }
    return Vehiculo;
}());
var MyClass = /** @class */ (function () {
    function MyClass() {
        this.msg = "evento!";
    }
    MyClass.prototype.handleEvent = function (evt) {
        alert(this.msg);
    };
    return MyClass;
}());
