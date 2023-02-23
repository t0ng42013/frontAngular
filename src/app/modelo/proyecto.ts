export class Proyecto {
    id?: number;
    nombre: string;
    descripcion: string;
    imgUrl: string;
    variableI: number;

    constructor(nombre: string, descripcion: string, imgUrl: string,variableI: number) {
        this.nombre = nombre;
        this.descripcion = descripcion;
        this.imgUrl = imgUrl;
        this.variableI = variableI;
        
    }
}
