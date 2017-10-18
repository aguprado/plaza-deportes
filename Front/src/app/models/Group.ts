
export class Group {
    id: string; 
    nombre: string; 
    descripcion: string;
    fechahora: string;
    cupos: string;
    disponibles: string;

    constructor(data) {
        this.id = data.id;
        this.nombre = data.nombre; 
        this.descripcion = data.descripcion;
        this.fechahora = data.fechahora;
        this.cupos = data.cupos;
        this.disponibles = data.disponibles;
    }

}