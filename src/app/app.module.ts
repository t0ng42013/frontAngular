import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './componentes/header/header.component';
import { MainComponent } from './componentes/main/main.component';
import { FooterComponent } from './componentes/footer/footer.component';
import { ParallaxComponent } from './componentes/header/parallax/parallax.component';
import { NavLoginComponent } from './componentes/header/nav-login/nav-login.component';
import { RedesComponent } from './componentes/header/redes/redes.component';
import { CardMobileComponent } from './componentes/header/card-mobile/card-mobile.component';
import { CardDeskComponent } from './componentes/header/card-desk/card-desk.component';
import { NavMainComponent } from './componentes/main/nav-main/nav-main.component';
import { NavMainMobileComponent } from './componentes/main/nav-main-mobile/nav-main-mobile.component';
import { ProyectComponent } from './componentes/main/proyect/proyect.component';
import { SvgInicioComponent } from './componentes/header/svg-inicio/svg-inicio.component';
import { SvgEndComponent } from './componentes/main/svg-end/svg-end.component';
import { AuthInterceptor } from './helper/auth.interceptor';
import { SobreMiComponent } from './componentes/header/card-desk/sobre-mi/sobre-mi.component';
import { ExpComponent } from './componentes/header/card-desk/exp/exp.component';
import { EducacionnComponent } from './componentes/header/card-desk/educacionn/educacionn.component';
import { CursosComponent } from './componentes/header/card-desk/cursos/cursos.component';
import { HabilidadesComponent } from './componentes/header/card-desk/habilidades/habilidades.component';
import { AboutMobComponent } from './componentes/header/card-mobile/about-mob/about-mob.component';
import { ExpMobComponent } from './componentes/header/card-mobile/exp-mob/exp-mob.component';
import { EduMobComponent } from './componentes/header/card-mobile/edu-mob/edu-mob.component';
import { SkillMobComponent } from './componentes/header/card-mobile/skill-mob/skill-mob.component';
import { ProyMobComponent } from './componentes/header/card-mobile/proy-mob/proy-mob.component';
import { CursosMobComponent } from './componentes/header/card-mobile/cursos-mob/cursos-mob.component';
import { LoginModalComponent } from './modales/login-modal/login-modal.component';
import { PageNotFoundComponent } from './404/page-not-found/page-not-found.component';



@NgModule({
  declarations: [
        AppComponent,
        HeaderComponent,
        MainComponent,
        FooterComponent,     
        ParallaxComponent,
        NavLoginComponent,
        RedesComponent,
        CardDeskComponent,
        CardMobileComponent,
        NavMainComponent,
        NavMainMobileComponent,
        ProyectComponent,
        SvgInicioComponent,
        SvgEndComponent,
        SobreMiComponent,
        ExpComponent,
        EducacionnComponent,
        CursosComponent,
        HabilidadesComponent,
        AboutMobComponent,
        ExpMobComponent,
        EduMobComponent,
        SkillMobComponent,
        ProyMobComponent,
        CursosMobComponent,
        LoginModalComponent,
        PageNotFoundComponent
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        //servicio
        HttpClientModule,
        FormsModule,
        ReactiveFormsModule        
    ],   
    providers: [
        {
            provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true
        }
    ],
  bootstrap: [AppComponent]
})
export class AppModule { }
