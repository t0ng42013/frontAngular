import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/servicios/auth.service';
import { ExperienciaService } from 'src/app/servicios/experiencia.service';

@Component({
    selector: 'app-exp',
    templateUrl: './exp.component.html',
    styleUrls: ['./exp.component.css']
})
export class ExpComponent implements OnInit {
    formexp!: FormGroup;
    experiencias: any[] = [];
    editData: any = {};
    isLoading = false;
    isLoggedIn = this.authService.getToken();

    constructor(
        private formBuilder: FormBuilder,
        private experienciaService: ExperienciaService,
        private authService: AuthService
    ) { }

    ngOnInit() {
        this.formexp = this.formBuilder.group({
            id: [''],
            nombre: ['', [Validators.required]],
            descripcion1: [''],
            descripcion2: [''],
            descripcion3: [''],
            descripcion4: ['']
        });

        this.loadExperiencia();
    }

    get Nombre() {
        return this.formexp.get('nombre');
    }
   
    async save() {
        if (!this.formexp.valid) {
            return;
        }

        this.isLoading = true;

        try {
            if (this.editData.id) {
                await this.experienciaService.editar(this.formexp.value).toPromise();
            } else {
                await this.experienciaService.crear(this.formexp.value).toPromise();
            }
            this.loadExperiencia();
            this.resetForm();
        } catch (error) {
            console.error(error);
        } finally {
            this.isLoading = false;
        }
    }

    loadExperiencia() {
        this.isLoading = true;

        this.experienciaService.lista().subscribe(res => {
            this.experiencias = res;        
            this.isLoading = false;
        });
    }

    async loadEditData(id: number) {
        this.isLoading = true;

        try {
            this.editData = await this.experienciaService.getUnaExp(id).toPromise();           
            this.formexp.patchValue(this.editData);
            console.log(this.editData);
        } catch (error) {
            console.error(error);
        } finally {
            this.isLoading = false;
        }
    }

    async deleteExperiencia(id: number) {
        this.isLoading = true;
        try {
            await this.experienciaService.borrar(id).toPromise();
            this.loadExperiencia();
        } catch (error) {
            console.error(error);
        } finally {
            this.isLoading = false;
        }
    }
    
    resetForm() {
        this.formexp.reset();
        this.editData = {};
    }
}
