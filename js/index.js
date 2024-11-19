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
        new Cl_prestamo(persona.cliente, persona.codigo, persona.prestamo, persona.meses)
    );
})

let listarPrestamos = (oficina, salida) => {
    salida.innerHTML = "";
    oficina.prestamos.forEach((prestamo) => {
        salida.innerHTML += `
            <br>Cliente: ${prestamo.cliente} - Código: ${prestamo.codigo} - 
            Préstamo: ${prestamo.prestamo} - Meses: ${prestamo.meses}
        `
    });
}

let salida1 = document.getElementById("salida1");
let salida2 = document.getElementById("salida2");
let opciones = document.getElementById("opciones");

salida1.innerHTML = `
<br>Seleccione una opción:
<br> 1 = Listar prestamos.
<br> 2 = Agregar prestamos.
<br> 3 = Eliminar prestamos.
<br> 4 = Modificar prestamos.
`;

opciones.onclick = () => {
    let opcion = +prompt("Ingrese su opción: ");
    switch (opcion) {
        case 1: 
            listarPrestamos(oficina, salida2);
            break;
    }
};
