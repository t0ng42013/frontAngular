import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Proyecto } from 'src/app/modelo/proyecto';
import { AuthService } from 'src/app/servicios/auth.service';
import { ProyectoService } from 'src/app/servicios/proyecto.service';

@Component({
  selector: 'app-proy-mob',
  templateUrl: './proy-mob.component.html',
  styleUrls: ['./proy-mob.component.css']
})
export class ProyMobComponent {
    public form!: FormGroup;
    proyectos: Proyecto[] = [];     
    editData: any = {};
    isLoading = false;
    isLoggedIn = this.auth.getToken();

    constructor(private formBuilder: FormBuilder, private proyectoService: ProyectoService, private auth: AuthService) { }

    ngOnInit(): void {
        this.form = this.formBuilder.group({
            id: [''],
            nombre: ['', Validators.required],
            descripcion: [''],
            imgUrl: [''],
            variableI: ['']
        });
        this.loadProyecto();
    }

    get Nombre() {
        return this.form.get('nombre');
    }

    async SaveEmployee() {
        if (!this.form.valid) {
            return;
        }

        this.isLoading = true;

        try {
            if (this.editData.id) {
                await this.proyectoService.editar(this.form.value).toPromise();
            } else {
                await this.proyectoService.crear(this.form.value).toPromise();
            }
            this.loadProyecto();
            this.resetForm();
        } catch (error) {
            console.error(error);
        } finally {
            this.isLoading = false;
        }
    }

    loadProyecto() {
        this.isLoading = true;

        this.proyectoService.lista().subscribe(res => {
            this.proyectos = res;
            this.isLoading = false;
        });
    }

    async loadEditData(id: any) {
        this.isLoading = true;

        try {
            this.editData = await this.proyectoService.getUna(id).toPromise();
            this.form.patchValue(this.editData);
            console.log(this.editData);
        } catch (error) {
            console.error(error);
        } finally {
            this.isLoading = false;
        }
    }

    async deleteProyecto(id: number) {
        this.isLoading = true;
        try {
            await this.proyectoService.borrar(id).toPromise();
            this.loadProyecto();
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


