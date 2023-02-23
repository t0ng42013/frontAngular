import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
    title = 'lga-Portfolio';
    constructor(private router: Router) {
        this.router.errorHandler = (error: any) => {
            this.router.navigate(['/404']); // redirige a la página 404
        }
    }
}
