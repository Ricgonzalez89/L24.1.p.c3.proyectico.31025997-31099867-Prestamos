export default class Cl_prestamo {
    constructor(cliente,codigo,prestamo,meses){
        this.cliente=cliente;
        this.codigo=codigo;
        this.prestamo=prestamo;
        this.meses=meses;
    }
    set cliente (cli){
        this._cliente=cli;
    }
    get cliente(){
        return this._cliente;
    }
    set codigo(co){
        this._codigo=+co;
    }
    get codigo(){
        return this._codigo;
    }
    set prestamo(pre){
        this._prestamo=+pre;
    }
    get prestamo(){
        return this._prestamo;
    }
    set meses(me){
        this._meses=+me;
    }
    get meses(){
        return this._meses;
    }
}