
export class Group {
    id: string; 
    nombre: string; 
    descripcion: string;
    dias: string;
    horarios: string;
    cupo: string;

    constructor(data) {
        this.id = data.id;
        this.nombre = data.nombre; 
        this.descripcion = data.descripcion;
        this.dias = data.dias;
        this.horarios = data.horarios;
        this.cupo = data.cupo;
    }

}