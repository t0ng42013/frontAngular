import { Component } from '@angular/core';
import { AuthService } from 'src/app/servicios/auth.service';

@Component({
  selector: 'app-nav-login',
  templateUrl: './nav-login.component.html',
  styleUrls: ['./nav-login.component.css']
})
export class NavLoginComponent {
    
    constructor(private auth:AuthService){}
    cerrar() {
        localStorage.clear();
        window.location.reload();
    }

    isLoggedIn = this.auth.getToken();
//    funcion para el constraste
    isHighContrast = false;

    toggleContrast() {
        this.isHighContrast = !this.isHighContrast;
        document.body.classList.toggle('high-contrast', this.isHighContrast);
    }
}
