/* 3. PRÉSTAMOS
|* Se desea llevar un control de los préstamos que
|* realiza una oficina. Se tiene por cada préstamo: nombre
|* del cliente, código del préstamo, monto y cantidad de
|* meses. Se requiere de un programa que permita el
|* registro de esta información, conociendo al principio de
|* la ejecución el monto disponible para préstamos y el
|* porcentaje de comisión mensual que se cobrará.
|* Estructuras de datos recomendadas
|*  Cl_oficina: montoCaja, porcComisionMensual
|*  Cl_prestamo: cliente, codigo, prestamo, meses
|* Primeros requerimientos
|*  Los datos entrada vienen en un archivo (con
|* import... ver anexo)
|*  Monto final disponible
|*  Clientes que pidieron por 2 meses
|*  Clientes que pidieron el préstamo mínimo
*/
import Cl_prestamo from "./Cl_prestamo.js";
import Cl_oficina from "./Cl_oficina.js";
import Dt_prestamos from "./Dt_prestamos.js";
import Dt_oficina from "./Dt_oficina.js";

let oficina = new Cl_oficina(Dt_oficina.montoDisponible, Dt_oficina.porcComisionMensual);

Dt_prestamos.forEach((persona) => {
    oficina.agregarPrestamo(
        persona.cliente, persona.codigo, persona.prestamo, persona.meses
    );
})

let listarPrestamos = (oficina, salida) => {
    salida.innerHTML = "";
    let salidaTab = `
    <br>
        <table>
            <tr>
                <th>Cliente</th>
                <th>Código</th>
                <th>Préstamo</th>
                <th>Meses</th>
                <th>Monto a pagar</th>
            </tr>
    `;
    if (oficina.prestamos.length > 0) {
        /*oficina.prestamos.forEach((prestamo) => {
            salida.innerHTML += `
                <br>Cliente: ${prestamo.cliente} - Código: ${prestamo.codigo} - 
                Préstamo: ${prestamo.prestamo} - Meses: ${prestamo.meses}
            `
        });*/
        oficina.prestamos.forEach((prestamo) => {
            salidaTab += `
                <tr>
                    <td>${prestamo.cliente}</td>
                    <td>${prestamo.codigo}</td>
                    <td>${prestamo.prestamo}</td>
                    <td>${prestamo.meses}</td>
                    <td>${prestamo.aPagar().toFixed(2)}</td>
                </tr>
            `;
        });
        salidaTab += `</table>`;
        salida.innerHTML += salidaTab;
    } else {
        salida.innerHTML += `No se han registrado clientes en la base de datos.`
    }
}

let agregarPrestamo = (oficina) => {
    let codigo = prompt("Ingrese el código del cliente: ");
    let cliente = prompt("Ingrese el nombre del cliente: ");
    let prestamo = prompt("Ingrese el monto del préstamo solicitado: ");
    let meses = prompt("Ingrese la cantidad de meses del préstamo: ");
    oficina.agregarPrestamo(cliente, codigo, prestamo, meses);
};

let eliminarPrestamo = (oficina, salida) => {
    salida.innerHTML = "";
    let codigo = prompt("Ingrese el código del cliente que desea eliminar: ");
    if (oficina.eliminarPrestamo(codigo))
        salida.innerHTML += `El cliente con código: ${codigo}, ha sido eliminado`;
    else
        salida.innerHTML += `No existe el cliente con el código especificado.`;
};

let modificarPrestamo = (oficina, salida) => {
    salida.innerHTML = "";
    let codigo = +prompt("Ingrese el código del cliente que desea modificar: ");
    let resultado = oficina.prestamos.filter((prestamo) => prestamo.codigo === codigo);

    if (resultado.length > 0) {
        let cliente = prompt("Ingrese el nuevo nombre del cliente: ");
        let prestamo = prompt("Ingrese el nuevo monto del préstamo solicitado: ");
        let meses = prompt("Ingrese la nueva cantidad de meses del préstamo: ");
        if(oficina.modificarPrestamo(codigo, cliente, prestamo, meses))
            salida.innerHTML += `Se ha modificado el cliente con código: ${codigo}`;
        else
            salida.innerHTML += `No se pudo modificar el cliente`;
    } else {
        salida.innerHTML += `No existe el cliente con el código especificado`;
    }
};

let mtoFinalDisp = (oficina, salida) => {
    salida.innerHTML = "";
    salida.innerHTML += `El monto final disponible es: ${oficina.mtoFinalDisp()}`;
};

let clientesDosMeses = (oficina, salida) => {
    salida.innerHTML = "";
    let resultado = oficina.clientesDosMeses();
    let salidaTab = `
    <br>
    <table>
            <tr>
                <th>Cliente</th>
                <th>Código</th>
                <th>Préstamo</th>
                <th>Monto a pagar</th>
            </tr>
    `;
    if (resultado.length > 0) {
        resultado.forEach((cliente) => {
            salidaTab += `
                <tr>
                    <td>${cliente.cliente}</td>
                    <td>${cliente.codigo}</td>
                    <td>${cliente.prestamo}</td>
                    <td>${cliente.aPagar().toFixed(2)}</td>
                </tr>
            `;
        });
        salidaTab += `</table>`;
        salida.innerHTML += salidaTab;
    } else {
        salida.innerHTML += `No hay ningun cliente que pidio por dos meses.`
    }
 
};

let clientesPrestamoMinimo = (oficina,salida)=> {
    salida.innerHTML = "";
    let resultado = oficina.clientesPrestamoMinimo();
    let salidaTab = `
    <br>
    <table>
            <tr>
                <th>Cliente</th>
                <th>Código</th>
                <th>Préstamo</th>
                <th>Meses</th>
                <th>Monto a pagar</th>
            </tr>
    `;
    if (resultado.length > 0) {
        resultado.forEach((cliente) => {
            salidaTab += `
                <tr>
                    <td>${cliente.cliente}</td>
                    <td>${cliente.codigo}</td>
                    <td>${cliente.prestamo}</td>
                    <td>${cliente.meses}</td>
                    <td>${cliente.aPagar().toFixed(2)}</td>
                </tr>
            `;
        });
        salidaTab += `</table>`;
        salida.innerHTML += salidaTab;
    } else {
        salida.innerHTML += `no hay clientes con prestamo minimo`
    }
 
};

let salida1 = document.getElementById("salida1");
let salida2 = document.getElementById("salida2");
let opciones = document.getElementById("opciones");

salida1.innerHTML = `
<br>Seleccione una opción:
<br> 1 = Listar prestamos.
<br> 2 = Agregar prestamo.
<br> 3 = Eliminar prestamo.
<br> 4 = Modificar prestamo.
<br> 5 = Mostrar Monto Final Disponible en caja.
<br> 6 = Mostrar clientes con 2 meses de pretamo.
<br> 7 = Mostrar clientes con el prestamo minimo.
`;

opciones.onclick = () => {
    let opcion = +prompt("Ingrese su opción: ");
    switch (opcion) {
        case 1: 
            listarPrestamos(oficina, salida2);
            break;
        case 2:
            agregarPrestamo(oficina);
            break;
        case 3:
            eliminarPrestamo(oficina, salida2);
            break;
        case 4:
            modificarPrestamo(oficina, salida2);
            break;
        case 5:
            mtoFinalDisp(oficina,salida2);
            break;
        case 6:
            clientesDosMeses(oficina,salida2);
            break;
        case 7:
            clientesPrestamoMinimo(oficina,salida2);
            break;
    }
};
