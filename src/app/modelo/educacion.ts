export class Educacion {
    id?: number;
    instituto: String;
    inicio: String;
    fin: String;
    titulo: String;

    constructor(instituto: String, inicio: String, fin: String, titulo: String) {

        this.instituto = instituto;
        this.inicio = inicio;
        this.fin = fin;
        this.titulo = titulo;
    }
}
