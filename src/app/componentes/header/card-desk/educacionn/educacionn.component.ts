import { Component,OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/servicios/auth.service';
import { EducacionService } from 'src/app/servicios/educacion.service';

@Component({
  selector: 'app-educacionn',
  templateUrl: './educacionn.component.html',
  styleUrls: ['./educacionn.component.css']
})
export class EducacionnComponent  implements OnInit{
    public form!: FormGroup;
    educacion: any = [];    
    editData: any = {};
    isLoading = false;
    isLoggedIn = this.auth.getToken();
   
    constructor(private formBuilder:FormBuilder,
        private educacionService: EducacionService,
        private auth: AuthService) { }
  
    ngOnInit(): void {
        this.form = this.formBuilder.group({
            id: [''],
            instituto: ['', Validators.required],
            inicio: [''],
            fin: [''],
            titulo: ['']
        });
        this.loadEducacion();
    }
//    trae los datos del input para los requierd
    get Instituto() {
        return this.form.get('instituto');
    }
// metodos crud: guardar, editar, eliminar  y crear
    async saveEducacion() {
        if (!this.form.valid) {
            return;
        }

        this.isLoading = true;

        try {
            if (this.editData.id) {
                await this.educacionService.editar(this.form.value).toPromise();
            } else {
                await this.educacionService.crear(this.form.value).toPromise();
            }
            this.loadEducacion();
            this.resetForm();
        } catch (error) {
            console.error(error);
        } finally {
            this.isLoading = false;
        }
    }

    loadEducacion() {
        this.isLoading = true;

        this.educacionService.lista().subscribe(res => {
            this.educacion = res;
            this.isLoading = false;
        });
    }

    async loadEditData(id: number) {
        this.isLoading = true;

        try {
            this.editData = await this.educacionService.getUna(id).toPromise();
            this.editData.fechaCreacion = new Date();
            this.form.patchValue(this.editData);
        } catch (error) {
            console.error(error);
        } finally {
            this.isLoading = false;
        }
    }

    async deleteEducacion(id: number) {
        this.isLoading = true;
        try {
            await this.educacionService.borrar(id).toPromise();
            this.loadEducacion();
        } catch (error) {
            console.error(error);
        } finally {
            this.isLoading = false;
        }
    }
    // borra datos del formulario
    resetForm() {
        this.form.reset();
        this.editData = {};
    }
}
