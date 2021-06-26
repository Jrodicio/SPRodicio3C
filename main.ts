window.addEventListener("load", function (){

    let eventHandler: EventListenerObject = new Main();
    
    //lista de tipo para filtrar
    let filtroVehiculos = <HTMLElement> document.getElementById("filtroVehiculos");
    
    //Boton para abrir grilla de alta
    let btnAlta = <HTMLElement> document.getElementById("btnAlta");
    
    //lista de filtro (alta vehiculo)
    let tipoVehiculo = <HTMLElement> document.getElementById("tipoVehiculo");

    //boton aceptar (alta vehiculo)
    let btnAceptar = <HTMLElement> document.getElementById("btnAceptar");
    
    //boton cancelar (alta vehiculo)
    let btnCancelar = <HTMLElement> document.getElementById("btnCancelar");
    let btnCerrar = <HTMLElement> document.getElementById("btnCerrar");

    //boton calcular promedio
    let btnPromedio = <HTMLElement> document.getElementById("btnPromedio");

    filtroVehiculos.addEventListener("change", eventHandler);
    btnAlta.addEventListener("click", eventHandler);
    tipoVehiculo.addEventListener("change", eventHandler);
    btnAceptar.addEventListener("click", eventHandler);
    btnCancelar.addEventListener("click", eventHandler);
    btnCerrar.addEventListener("click", eventHandler);
    btnPromedio.addEventListener("click", eventHandler);

});


class Main implements EventListenerObject
{
    public handleEvent(ev:Event)
    {
        let obj:HTMLElement = <HTMLElement> ev.target;
        if(obj.id == "filtroVehiculos")
        {
            filtrarVehiculos((<HTMLInputElement>obj).value);
        }

        else if(obj.id == "btnAlta")
        {
            abrirGrilla();
        }

        else if(obj.id == "tipoVehiculo")
        {
            verTipos((<HTMLInputElement>obj).value);
        }

        else if(obj.id == "btnAceptar")
        {
            agregar();
        }

        else if(obj.id == "btnCancelar" || obj.id == "btnCerrar")
        {
            cerrarGrilla();
        }

        else if(obj.id == "btnPromedio")
        {
            calcularPromedios();
        }
        
        else if(obj.className == "botonEliminar")
        {
            eliminarGrilla(Number((<HTMLInputElement>obj).name));
        }
    }
}

let vehiculos: Array<Vehiculo> = new Array<Vehiculo>();

function filtrarVehiculos(tipoVehiculo:string){

    if (tipoVehiculo=="Auto")
    {    
        let filtrados = vehiculos.filter(item=> item instanceof Auto);
        agregarVehiculo(filtrados);
    }
    else if(tipoVehiculo == "Camioneta")
    {    
        let filtrados = vehiculos.filter(item=> item instanceof Camioneta);
        agregarVehiculo(filtrados);
    }
    else
    {
        agregarVehiculo(vehiculos);
    }
}

function verTipos(tipoVehiculo: string)
{

    if (tipoVehiculo == "Camioneta")
{

        (<HTMLInputElement>document.getElementById("contTipoCamioneta")).hidden = false;
        (<HTMLInputElement>document.getElementById("contTipoAuto")).hidden = true;
    }
    else {

        (<HTMLInputElement>document.getElementById("contTipoCamioneta")).hidden = true;
        (<HTMLInputElement>document.getElementById("contTipoAuto")).hidden = false;
    }
}


function abrirGrilla()
{

    verTipos((<HTMLInputElement>document.getElementById("tipoVehiculo")).value);

    (<HTMLInputElement>document.getElementById("contGrilla")).style.display = "block";

    let contAgregar: any = <HTMLInputElement>document.getElementById("contGrilla");
    contAgregar.classList.add("formAlta");
}

function cerrarGrilla()
{

    (<HTMLInputElement>document.getElementById("contGrilla")).style.display = "none";
    let contGrilla = (<HTMLInputElement>document.getElementById("contGrilla"));

    (<HTMLInputElement>document.getElementById("contTipoCamioneta")).hidden = true;
    (<HTMLInputElement>document.getElementById("contTipoAuto")).hidden = true;

    (<HTMLInputElement>document.getElementById("idVehiculo")).value = "";
    (<HTMLInputElement>document.getElementById("marcaVehiculo")).value = "";
    (<HTMLInputElement>document.getElementById("modeloVehiculo")).value = "";
    (<HTMLInputElement>document.getElementById("precioVehiculo")).value = "";
    (<HTMLInputElement>document.getElementById("cantidadPuertas")).value = "";
    
    contGrilla.classList.remove("formAlta");
    
}


function agregar()
{
    
    let id;
    if(vehiculos.length == 0)
    {
        id = 1;
    }
    else
    {
        let auxVehiculos = vehiculos;
        id = auxVehiculos.reduce(function (max, item)
        {
            if(item.id >= max) 
            {
                return item.id + 1;
            }
            return max;
        }, 0);
        if(id == 0)
        {
            id + 1;
        }
    }
    
    let marca = (<HTMLInputElement>document.getElementById("marcaVehiculo")).value;
    let modelo = (<HTMLInputElement>document.getElementById("modeloVehiculo")).value;
    let precio = (<HTMLInputElement>document.getElementById("precioVehiculo")).value;
    let tipoVehiculo = (<HTMLInputElement>document.getElementById("tipoVehiculo")).value;
    let tipoCamioneta = (<HTMLInputElement>document.getElementById("tipoCamioneta")).value;
    let puertas = (<HTMLInputElement>document.getElementById("cantidadPuertas")).value;
    
    
    if (tipoVehiculo === "Auto")
{
        let auto: Auto = new Auto(id, marca, modelo, parseInt(precio), parseInt(puertas));
        vehiculos.push(auto);
    }
    else if (tipoVehiculo === "Camioneta")
{
        let camioneta: Camioneta = new Camioneta(id, marca, modelo, parseInt(precio), (tipoCamioneta == "4X4"));
        vehiculos.push(camioneta);
    }
    
    agregarVehiculo(vehiculos);
    cerrarGrilla();
}

function calcularPromedios()
{
    let auxVehiculos = vehiculos;
    let promedio = 0
    
    if(auxVehiculos.length)
    {
        let total = auxVehiculos.reduce(function (acum, item)
        {
            return acum +=item.precio
        }, 0);
        promedio = total/auxVehiculos.length;
    }
    (<HTMLInputElement> document.getElementById("promedioDePrecios")).value = String(promedio);
}

function agregarVehiculo(vehiculos: Array<Vehiculo>)
{

    let marca: string = "";
    let modelo: string = "";
    let precio: any;
    let id: any;
    let detalle: any;
    let tipoVehiculo: string = "";
    let eventHandler: EventListenerObject = new Main();

    let tCuerpo: HTMLTableElement = <HTMLTableElement>document.getElementById("tCuerpo");

    while (tCuerpo.rows.length > 0)
    {
        tCuerpo.removeChild(tCuerpo.childNodes[0]);
    }

    for (const item of vehiculos)
    {

        id = item.id;
        marca = item.marca;
        modelo = item.modelo;
        precio = item.precio;

        if (item instanceof Auto)
        {
            tipoVehiculo = "Auto"
            detalle = item.cantidadPuertas;

        }

        else if (item instanceof Camioneta)
        {
            tipoVehiculo = "Camioneta"

            if (item.cuatroXcuatro)
            {

                detalle = "4X4";
            }
            else 
            {
                detalle = "Otras";
            }
        }
        
        let btnDel = document.createElement('input');
        btnDel.type = 'button';
        btnDel.className = 'botonEliminar';
        btnDel.value = "Eliminar";
        btnDel.name = String(vehiculos.indexOf(item));
        
        btnDel.addEventListener("click", eventHandler);

        let tr: HTMLTableRowElement = document.createElement("tr");

        let td1: HTMLTableDataCellElement = document.createElement("td");
        var nodoTexto = document.createTextNode(id);
        td1.appendChild(nodoTexto);
        tr.appendChild(td1);

        let td2: HTMLTableDataCellElement = document.createElement("td");
        var nodoTexto = document.createTextNode(marca);
        td2.appendChild(nodoTexto);
        tr.appendChild(td2);

        let td3: HTMLTableDataCellElement = document.createElement("td");
        var nodoTexto = document.createTextNode(modelo);
        td3.appendChild(nodoTexto);
        tr.appendChild(td3);

        let td4: HTMLTableDataCellElement = document.createElement("td");
        var nodoTexto = document.createTextNode(precio);
        td4.appendChild(nodoTexto);
        tr.appendChild(td4);

        let td5: HTMLTableDataCellElement = document.createElement("td");
        var nodoTexto = document.createTextNode(tipoVehiculo);
        td5.appendChild(nodoTexto);
        tr.appendChild(td5);

        let td6: HTMLTableDataCellElement = document.createElement("td");
        var nodoTexto = document.createTextNode(detalle);
        td6.appendChild(nodoTexto);
        tr.appendChild(td6);

        let td7: HTMLTableDataCellElement = document.createElement("td");
        td7.appendChild(btnDel);
        tr.appendChild(td7);

        tCuerpo.appendChild(tr);
    }
}

function eliminarGrilla(id: number)
{
    vehiculos.splice(id , 1);
    agregarVehiculo(vehiculos);
}

//No llego a aplicar los filtros de columnas visibles en tabla :c Lo sigo en el recu!
function modificarColumnas()
{
    let tabla: HTMLTableElement = (<HTMLTableElement> document.getElementById("tabla"));
}