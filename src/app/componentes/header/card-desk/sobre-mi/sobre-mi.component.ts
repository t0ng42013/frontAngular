import { Component,OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/servicios/auth.service';
import { PersonaService } from 'src/app/servicios/persona.service';

@Component({
  selector: 'app-sobre-mi',
  templateUrl: './sobre-mi.component.html',
  styleUrls: ['./sobre-mi.component.css']
})
export class SobreMiComponent implements OnInit {
    form!: FormGroup;
    personas: any[] = [];
    editData: any = {};
    isLoading = false;
    isLoggedIn = this.authService.getToken();
    
    constructor(
        private formBuilder: FormBuilder,
        private personaService: PersonaService,
        private authService: AuthService
    ) { }

    ngOnInit() {
        this.form = this.formBuilder.group({
            id: [''],
            nombre: ['', Validators.required],
            apellido: ['',Validators.required],
            domicilio: [''],
            titulo: [''],
            sobreMi: [''],
            url: [''],
            fechaCreacion: ['']
        });

        this.loadPersonas();
    }
    //    trae los datos del input para los requierd
    get Nombre() {
        return this.form.get('nombre');
    }
    get Apellido() {
        return this.form.get('apellido');
    }
// metodos crud: guardar, editar, eliminar  y crear
    async savePersona() {
        if (!this.form.valid) {
            return;
        }

        this.isLoading = true;

        try {
            if (this.editData.id) {
                await this.personaService.editar(this.form.value).toPromise();
            } else {
                await this.personaService.crear(this.form.value).toPromise();
            }
            this.loadPersonas();
            this.resetForm();
        } catch (error) {
            console.error(error);
        } finally {
            this.isLoading = false;
        }
    }

    loadPersonas() {
        this.isLoading = true;

        this.personaService.lista().subscribe(res => {
            this.personas = res;           
            this.isLoading = false;
        });
    }

    async loadEditData(id: number) {
        this.isLoading = true;

        try {
            this.editData = await this.personaService.getUna(id).toPromise();
            this.editData.fechaCreacion = new Date();
            this.form.patchValue(this.editData);
        } catch (error) {
            console.error(error);
        } finally {
            this.isLoading = false;
        }
    }

    async deletePersona(id: number) {
        this.isLoading = true;
        try {
            await this.personaService.borrar(id).toPromise();
            this.loadPersonas();
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
