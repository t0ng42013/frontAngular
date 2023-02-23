import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { Router } from '@angular/router';
import { AuthService } from 'src/app/servicios/auth.service';


@Component({
    selector: 'app-login-modal',
    templateUrl: './login-modal.component.html',
    styleUrls: ['./login-modal.component.css']
})
export class LoginModalComponent implements OnInit {
    public form!: FormGroup;
    public loading = false;
    public error = '';

    constructor(
        private formBuilder: FormBuilder,
        private auth: AuthService,
        private router: Router,
    ) { }

    ngOnInit(): void {
        this.form = this.formBuilder.group({
            email: ['', [Validators.required, Validators.email]],
            password: ['', [Validators.required, Validators.minLength(4)]],
        });
    }

    get Email() {
        return this.form.get('email');
    }

    get Password() {
        return this.form.get('password');
    }

    public login() {
        if (this.form.valid) {
            this.loading = true;
            const creds: any= this.form.getRawValue();
            this.auth.login(creds).subscribe(
                () => {
                    this.loading = false;
                    this.router.navigate(['/']);
                    window.location.reload();
                },
                (error) => {
                    this.loading = false;
                    if (error.status === 401) {
                        this.error = 'El correo electrónico o la contraseña son incorrectos.';
                    } else {
                        this.error = 'Ha ocurrido un error al iniciar sesión. Inténtalo de nuevo más tarde.';
                    }
                },
            );
        }
    }
}
