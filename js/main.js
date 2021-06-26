"use strict";
window.addEventListener("load", function () {
    var eventHandler = new Main();
    //lista de tipo para filtrar
    var filtroVehiculos = document.getElementById("filtroVehiculos");
    //Boton para abrir grilla de alta
    var btnAlta = document.getElementById("btnAlta");
    //lista de filtro (alta vehiculo)
    var tipoVehiculo = document.getElementById("tipoVehiculo");
    //boton aceptar (alta vehiculo)
    var btnAceptar = document.getElementById("btnAceptar");
    //boton cancelar (alta vehiculo)
    var btnCancelar = document.getElementById("btnCancelar");
    var btnCerrar = document.getElementById("btnCerrar");
    //boton calcular promedio
    var btnPromedio = document.getElementById("btnPromedio");
    filtroVehiculos.addEventListener("change", eventHandler);
    btnAlta.addEventListener("click", eventHandler);
    tipoVehiculo.addEventListener("change", eventHandler);
    btnAceptar.addEventListener("click", eventHandler);
    btnCancelar.addEventListener("click", eventHandler);
    btnCerrar.addEventListener("click", eventHandler);
    btnPromedio.addEventListener("click", eventHandler);
});
var Main = /** @class */ (function () {
    function Main() {
    }
    Main.prototype.handleEvent = function (ev) {
        var obj = ev.target;
        if (obj.id == "filtroVehiculos") {
            filtrarVehiculos(obj.value);
        }
        else if (obj.id == "btnAlta") {
            abrirGrilla();
        }
        else if (obj.id == "tipoVehiculo") {
            verTipos(obj.value);
        }
        else if (obj.id == "btnAceptar") {
            agregar();
        }
        else if (obj.id == "btnCancelar" || obj.id == "btnCerrar") {
            cerrarGrilla();
        }
        else if (obj.id == "btnPromedio") {
            calcularPromedios();
        }
        else if (obj.className == "botonEliminar") {
            eliminarGrilla(Number(obj.name));
        }
    };
    return Main;
}());
var vehiculos = new Array();
function filtrarVehiculos(tipoVehiculo) {
    if (tipoVehiculo == "Auto") {
        var filtrados = vehiculos.filter(function (item) { return item instanceof Auto; });
        agregarVehiculo(filtrados);
    }
    else if (tipoVehiculo == "Camioneta") {
        var filtrados = vehiculos.filter(function (item) { return item instanceof Camioneta; });
        agregarVehiculo(filtrados);
    }
    else {
        agregarVehiculo(vehiculos);
    }
}
function verTipos(tipoVehiculo) {
    if (tipoVehiculo == "Camioneta") {
        document.getElementById("contTipoCamioneta").hidden = false;
        document.getElementById("contTipoAuto").hidden = true;
    }
    else {
        document.getElementById("contTipoCamioneta").hidden = true;
        document.getElementById("contTipoAuto").hidden = false;
    }
}
function abrirGrilla() {
    verTipos(document.getElementById("tipoVehiculo").value);
    document.getElementById("contGrilla").style.display = "block";
    var contAgregar = document.getElementById("contGrilla");
    contAgregar.classList.add("formAlta");
}
function cerrarGrilla() {
    document.getElementById("contGrilla").style.display = "none";
    var contGrilla = document.getElementById("contGrilla");
    document.getElementById("contTipoCamioneta").hidden = true;
    document.getElementById("contTipoAuto").hidden = true;
    document.getElementById("idVehiculo").value = "";
    document.getElementById("marcaVehiculo").value = "";
    document.getElementById("modeloVehiculo").value = "";
    document.getElementById("precioVehiculo").value = "";
    document.getElementById("cantidadPuertas").value = "";
    contGrilla.classList.remove("formAlta");
}
function agregar() {
    var id;
    if (vehiculos.length == 0) {
        id = 1;
    }
    else {
        var auxVehiculos = vehiculos;
        id = auxVehiculos.reduce(function (max, item) {
            if (item.id >= max) {
                return item.id + 1;
            }
            return max;
        }, 0);
        if (id == 0) {
            id + 1;
        }
    }
    var marca = document.getElementById("marcaVehiculo").value;
    var modelo = document.getElementById("modeloVehiculo").value;
    var precio = document.getElementById("precioVehiculo").value;
    var tipoVehiculo = document.getElementById("tipoVehiculo").value;
    var tipoCamioneta = document.getElementById("tipoCamioneta").value;
    var puertas = document.getElementById("cantidadPuertas").value;
    if (tipoVehiculo === "Auto") {
        var auto = new Auto(id, marca, modelo, parseInt(precio), parseInt(puertas));
        vehiculos.push(auto);
    }
    else if (tipoVehiculo === "Camioneta") {
        var camioneta = new Camioneta(id, marca, modelo, parseInt(precio), (tipoCamioneta == "4X4"));
        vehiculos.push(camioneta);
    }
    agregarVehiculo(vehiculos);
    cerrarGrilla();
}
function calcularPromedios() {
    var auxVehiculos = vehiculos;
    var promedio = 0;
    if (auxVehiculos.length) {
        var total = auxVehiculos.reduce(function (acum, item) {
            return acum += item.precio;
        }, 0);
        promedio = total / auxVehiculos.length;
    }
    document.getElementById("promedioDePrecios").value = String(promedio);
}
function agregarVehiculo(vehiculos) {
    var marca = "";
    var modelo = "";
    var precio;
    var id;
    var detalle;
    var tipoVehiculo = "";
    var eventHandler = new Main();
    var tCuerpo = document.getElementById("tCuerpo");
    while (tCuerpo.rows.length > 0) {
        tCuerpo.removeChild(tCuerpo.childNodes[0]);
    }
    for (var _i = 0, vehiculos_1 = vehiculos; _i < vehiculos_1.length; _i++) {
        var item = vehiculos_1[_i];
        id = item.id;
        marca = item.marca;
        modelo = item.modelo;
        precio = item.precio;
        if (item instanceof Auto) {
            tipoVehiculo = "Auto";
            detalle = item.cantidadPuertas;
        }
        else if (item instanceof Camioneta) {
            tipoVehiculo = "Camioneta";
            if (item.cuatroXcuatro) {
                detalle = "4X4";
            }
            else {
                detalle = "Otras";
            }
        }
        var btnDel = document.createElement('input');
        btnDel.type = 'button';
        btnDel.className = 'botonEliminar';
        btnDel.value = "Eliminar";
        btnDel.name = String(vehiculos.indexOf(item));
        btnDel.addEventListener("click", eventHandler);
        var tr = document.createElement("tr");
        var td1 = document.createElement("td");
        var nodoTexto = document.createTextNode(id);
        td1.appendChild(nodoTexto);
        tr.appendChild(td1);
        var td2 = document.createElement("td");
        var nodoTexto = document.createTextNode(marca);
        td2.appendChild(nodoTexto);
        tr.appendChild(td2);
        var td3 = document.createElement("td");
        var nodoTexto = document.createTextNode(modelo);
        td3.appendChild(nodoTexto);
        tr.appendChild(td3);
        var td4 = document.createElement("td");
        var nodoTexto = document.createTextNode(precio);
        td4.appendChild(nodoTexto);
        tr.appendChild(td4);
        var td5 = document.createElement("td");
        var nodoTexto = document.createTextNode(tipoVehiculo);
        td5.appendChild(nodoTexto);
        tr.appendChild(td5);
        var td6 = document.createElement("td");
        var nodoTexto = document.createTextNode(detalle);
        td6.appendChild(nodoTexto);
        tr.appendChild(td6);
        var td7 = document.createElement("td");
        td7.appendChild(btnDel);
        tr.appendChild(td7);
        tCuerpo.appendChild(tr);
    }
}
function eliminarGrilla(id) {
    vehiculos.splice(id, 1);
    agregarVehiculo(vehiculos);
}
//No llego a aplicar los filtros de columnas visibles en tabla :c Lo sigo en el recu!
function modificarColumnas() {
    var tabla = document.getElementById("tabla");
}
