
export class Group {
    id: string; 
    nombre: string; 
    descripcion: string;
    dias: string;
    horarios: string;
    cupo: number;
    agendaGrupo: any[];

    constructor(data) {
        this.id = data.id;
        this.nombre = data.nombre; 
        this.descripcion = data.descripcion;
        this.dias = data.dias;
        this.horarios = data.horarios;
        this.cupo = data.cupo;
        this.agendaGrupo = data.agendaGrupo;
    }

}