import { Component,OnInit } from '@angular/core';
import {  FormBuilder,Validators, FormGroup} from '@angular/forms';
import { AuthService } from 'src/app/servicios/auth.service';
import { CursoService } from 'src/app/servicios/curso.service';

@Component({
  selector: 'app-cursos',
    templateUrl: './cursos.component.html',
    styleUrls: ['./cursos.component.css']
})
export class CursosComponent implements OnInit {
    public form! :FormGroup;    
    cursos: any = [];
    editData: any = {};
    isLoading = false;
    isLoggedIn = this.auth.getToken();

    constructor(private cursoService: CursoService,
        private formBuilder: FormBuilder,        
        private auth: AuthService) { }
   
    ngOnInit(): void {
        this.form = this.formBuilder.group({
            id: [''],
            instituto: ['',Validators.required],
            inicio: [''],
            fin: [''],
            titulo:['']
        });
        this.loadCursos();
    }
       //    trae los datos del input para los requierd
    get Instituto() {
        return this.form.get('instituto');
    }
// metodos crud: guardar, editar, eliminar  y crear
    async saveCurso() {
        if (!this.form.valid) {
            return;
        }

        this.isLoading = true;

        try {
            if (this.editData.id) {
                await this.cursoService.editar(this.form.value).toPromise();
            } else {
                await this.cursoService.crear(this.form.value).toPromise();
            }
            this.loadCursos();
            this.resetForm();
        } catch (error) {
            console.error(error);
        } finally {
            this.isLoading = false;
        }
    }

    loadCursos() {
        this.isLoading = true;

        this.cursoService.lista().subscribe(res => {
            this.cursos = res;
            this.isLoading = false;
        });
    }

    async loadEditData(id: number) {
        this.isLoading = true;

        try {
            this.editData = await this.cursoService.getUna(id).toPromise();
            this.editData.fechaCreacion = new Date();
            this.form.patchValue(this.editData);
        } catch (error) {
            console.error(error);
        } finally {
            this.isLoading = false;
        }
    }

    async deleteCurso(id: number) {
        this.isLoading = true;
        try {
            await this.cursoService.borrar(id).toPromise();
            this.loadCursos();
        } catch (error) {
            console.error(error);
        } finally {
            this.isLoading = false;
        }
    }

    resetForm() {
        this.form.reset();
        this.editData = {};
    }    
}
