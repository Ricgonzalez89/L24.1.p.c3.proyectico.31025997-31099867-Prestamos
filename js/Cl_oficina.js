import Cl_prestamo from "./Cl_prestamo.js";

export default class Cl_oficina {
    constructor(montoDisponible, porcComisionMensual) {
        this.montoCaja = montoDisponible;
        this.porcComisionMensual = porcComisionMensual;
        this.prestamos = [];
    }

    set montoCaja(mC) {
        this._montoCaja = +mC;
    }

    set porcComisionMensual(pC) {
        this._porcComisionMensual = +pC;
    }

    get montoCaja() {
        return this._montoCaja;
    }

    get porcComisionMensual() {
        return this._porcComisionMensual;
    }

    agregarPrestamo(cliente, codigo, prestamo, meses) {
        let objeto = new Cl_prestamo(cliente, codigo, prestamo, meses, this.porcComisionMensual);
        this.prestamos.push(objeto);
    }

    eliminarPrestamo(codigo) { //retorna true o false si logra eliminar el prestamo
        codigo = +codigo;
        let indexPrestamo = -1;
        for (let i = 0; i < this.prestamos.length; i++) {
            if (this.prestamos[i].codigo === codigo)
                indexPrestamo = i;
        }
        if (indexPrestamo !== -1) 
            this.prestamos.splice(indexPrestamo, 1);
        return indexPrestamo !== -1;
    }

    modificarPrestamo(codigo, cliente, prestamo, meses) { 
        //retorna true o false si logra modificar el prestamo
        codigo = +codigo;
        let indexPrestamo = -1;
        for (let i = 0; i < this.prestamos.length; i++) {
            if (this.prestamos[i].codigo === codigo)
                indexPrestamo = i;
        }
        if (indexPrestamo !== -1)
            this.prestamos.splice(
            indexPrestamo, 1, new Cl_prestamo( cliente, codigo, prestamo, meses, this.porcComisionMensual)
            );
        return indexPrestamo !== -1;
    }

    prestamoMinimo() {
        let menorPrestamo = this.prestamos[0].prestamo;
        for (let i = 1; i < this.prestamos.length; i++) {
            if (this.prestamos[i].prestamo < menorPrestamo)
                menorPrestamo = this.prestamos[i].prestamo;
        }
        return menorPrestamo;
    }

    mtoFinalDisp() {
        this.prestamos.forEach((cliente) => {
            this.montoCaja -= cliente.prestamo;
        })
        return this.montoCaja;
    }

    clientesDosMeses() {
        let resultado = this.prestamos.filter((cliente) => cliente.meses === 2);
        return resultado;
    }

    clientesPrestamoMinimo() {
        let menorPrestamo = this.prestamoMinimo();
        let resultado = this.prestamos.filter((cliente) => cliente.prestamo === menorPrestamo);
        return resultado;
    }
}