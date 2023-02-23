import { Component,OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Proyecto } from 'src/app/modelo/proyecto';
import { AuthService } from 'src/app/servicios/auth.service';
import { ProyectoService } from 'src/app/servicios/proyecto.service';
// import { PortfolioService } from 'src/app/servicios/portfolio.service';

@Component({
  selector: 'app-proyect',
  templateUrl: './proyect.component.html',
  styleUrls: ['./proyect.component.css']
})
export class ProyectComponent implements OnInit {
    public form!: FormGroup;
    proyectos: Proyecto[] = [];
    id?: number;
    saveresponse: any;
    editdata: any;
    isLoggedIn = this.auth.getToken();

    constructor(private proyectoService: ProyectoService, private formBuilder: FormBuilder, private auth: AuthService){}
   
    ngOnInit(): void {
        this.form = this.formBuilder.group({
            id: [''],
            nombre: ['', Validators.required],
            descripcion: [''],
            imgUrl: [''],
            variableI:['']
        });
        this.lista();        
    }
    get Nombre() {
        return this.form.get('nombre');
    }
    
    SaveEmployee() {
        if (this.form.value.id) {
            this.proyectoService.editar(this.form.getRawValue()).subscribe(result => {
                this.saveresponse = result;
                this.ngOnInit();
            }, err => console.log(err)
            );
        } else {
            this.proyectoService.crear(this.form.getRawValue()).subscribe(res => {
                this.ngOnInit();
            },
                err => console.log(err));
        }
    }

    loadedit(id: any) {
        this.proyectoService.getUna(id).subscribe(result => {
            this.editdata = result;
            this.form.patchValue(result)           
        })

    }

    lista() {
        this.proyectoService.lista().subscribe(
            data => {
                this.proyectos = data;             
            },
            err => console.log(err)
        );
    }
    eliminar(id: number) {
        this.proyectoService.borrar(id).subscribe(res => { this.ngOnInit(); },
            err => console.log(err)
        );
    }
}
