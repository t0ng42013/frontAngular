import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/servicios/auth.service';
import { SkillService } from 'src/app/servicios/skill.service';

@Component({
    selector: 'app-habilidades',
    templateUrl: './habilidades.component.html',
    styleUrls: ['./habilidades.component.css']
})
export class HabilidadesComponent implements OnInit {
    form!: FormGroup;
    skills: any = [];
    editData: any = {};
    isLoading = false;
    isLoggedIn = this.auth.getToken();

    constructor(private skillService: SkillService,
        private formBuilder: FormBuilder,
        private auth: AuthService) { }

    ngOnInit(): void {
        this.form = this.formBuilder.group({
            id: [''],
            nombre: ['', Validators.required],
            porcentaje: ['', [Validators.required, Validators.min(1), Validators.max(100)]],
        });
        this.loadHabilidad();
    }
    //    trae los datos del input para los requierd
    get Nombre() {
        return this.form.get('nombre');
    }

    get Porcentaje() {
        return this.form.get('porcentaje');
    }
// metodos crud: guardar, editar, eliminar  y crear
    async saveHabilidad() {
        if (!this.form.valid) {
            return;
        }

        this.isLoading = true;

        try {
            if (this.editData.id) {
                await this.skillService.editar(this.form.value).toPromise();
            } else {
                await this.skillService.crear(this.form.value).toPromise();
            }
            this.loadHabilidad();
            this.resetForm();
        } catch (error) {
            console.error(error);
        } finally {
            this.isLoading = false;
        }
    }

    loadHabilidad() {
        this.isLoading = true;

        this.skillService.lista().subscribe(res => {
            this.skills = res;
            this.isLoading = false;
        });
    }

    async loadEditData(id: number) {
        this.isLoading = true;

        try {
            this.editData = await this.skillService.getUna(id).toPromise();
            this.editData.fechaCreacion = new Date();
            this.form.patchValue(this.editData);
        } catch (error) {
            console.error(error);
        } finally {
            this.isLoading = false;
        }
    }

    async deleteHabilidad(id: number) {
        this.isLoading = true;
        try {
            await this.skillService.borrar(id).toPromise();
            this.loadHabilidad();
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
