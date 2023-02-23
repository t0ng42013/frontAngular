export class Experiencia {
    id?: number;
    nombre: string;  
    descripcion1: string;
    descripcion2: string;
    descripcion3: string;
    descripcion4: string;

    constructor(nombre: string, descripcion1: string, descripcion2: string, descripcion3: string, descripcion4: string) {
        this.nombre = nombre;
        this.descripcion1 = descripcion1;
        this.descripcion2 = descripcion2;
        this.descripcion3 = descripcion3;
        this.descripcion4 = descripcion4;
    }

}
