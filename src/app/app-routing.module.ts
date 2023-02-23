import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageNotFoundComponent } from './404/page-not-found/page-not-found.component';
import { AppComponent } from './app.component';
import { AuthGuard } from './helper/auth.guard';

const routes: Routes = [
    { path: '**', component: PageNotFoundComponent },
    {
        path: 'componentes',
        component: AppComponent,
        canActivate: [AuthGuard]
    },    
    
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
