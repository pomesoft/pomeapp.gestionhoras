import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule, DecimalPipe } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


import {
    NgbModule,
    NgbTypeaheadModule,
    NgbNavModule,
    NgbCarouselModule,
    NgbModalModule,
    NgbActiveModal,
    NgbDateAdapter,
    NgbDateParserFormatter,
} from '@ng-bootstrap/ng-bootstrap';

import { PdfViewerComponent, PdfViewerModule } from 'ng2-pdf-viewer';
import { NgChartsModule  } from 'ng2-charts';

// Modulos
import { SharedModule } from '../shared/shared.module';
import { ComponentsModule } from '../components/components.module';

import { PipesModule } from '../pipes/pipes.module';


import { DashboardComponent } from './dashboard/dashboard.component';
import { PagesComponent } from './pages.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';

import { UsuariosComponent } from './usuarios/usuarios.component';

import { FiltrosComponent } from './filtros/filtros.component';
import { UsuarioComponent } from './usuario/usuario.component';

import { CustomAdapterService } from '../services/custom-adapter.service';
import { CustomDateParserFormatterService } from '../services/custom-date-parser-formatter.service';
import { TemplateComponent } from './template/template.component';
import { RegistrohorasComponent } from './registrohoras/registrohoras.component';
import { ReporteshorasComponent } from './reporteshoras/reporteshoras.component';
import { PlanningComponent } from './planning/planning.component';
import { ConfiguracionComponent } from './configuracion/configuracion.component';
import { RegistrohorasplanificadasComponent } from './registrohorasplanificadas/registrohorasplanificadas.component';
import { RegistrohorasmanualComponent } from './registrohorasmanual/registrohorasmanual.component';
import { ProfesionalesComponent } from './profesionales/profesionales.component';
import { ProfesionalComponent } from './profesional/profesional.component';
import { ClientesComponent } from './clientes/clientes.component';
import { ClienteComponent } from './cliente/cliente.component';
import { ProyectosComponent } from './proyectos/proyectos.component';
import { ProyectoComponent } from './proyecto/proyecto.component';
import { FuncionesComponent } from './funciones/funciones.component';
import { FuncionComponent } from './funcion/funcion.component';

@NgModule({
    declarations: [
        DashboardComponent,
        PagesComponent,
        AccountSettingsComponent,
        UsuariosComponent,
        FiltrosComponent,
        UsuarioComponent,
        TemplateComponent,
        RegistrohorasComponent,
        ReporteshorasComponent,
        PlanningComponent,
        ConfiguracionComponent,
        RegistrohorasplanificadasComponent,
        RegistrohorasmanualComponent,
        ProfesionalesComponent,
        ProfesionalComponent,
        ClientesComponent,
        ClienteComponent,
        ProyectosComponent,
        ProyectoComponent,
        FuncionesComponent,
        FuncionComponent,
    ],
    exports: [
        DashboardComponent,
        PagesComponent,
        AccountSettingsComponent,
    ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        SharedModule,
        RouterModule,
        ComponentsModule,
        PipesModule,
        DecimalPipe,
        NgbModule,
        NgbTypeaheadModule,
        NgbNavModule,
        NgbCarouselModule,
        NgbModalModule,
        PdfViewerModule,
        NgChartsModule,
    ],
    providers: [
        NgbActiveModal,
        PdfViewerComponent,
        { provide: NgbDateAdapter, useClass: CustomAdapterService },
        { provide: NgbDateParserFormatter, useClass: CustomDateParserFormatterService },
    ],
    schemas: [
        CUSTOM_ELEMENTS_SCHEMA
    ],
})
export class PagesModule { }
