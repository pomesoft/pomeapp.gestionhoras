import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { DecimalPipe, HashLocationStrategy, LocationStrategy } from '@angular/common';
import {
    NgbModule,
    NgbTypeaheadModule,
    NgbCarouselModule,
    NgbModalModule,
    NgbCollapseModule,
} from '@ng-bootstrap/ng-bootstrap';



import { PdfViewerModule, PdfViewerComponent } from 'ng2-pdf-viewer';
import { NgChartsModule  } from 'ng2-charts';

// Redux
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { appReducers } from './store/app.reducers';


// Modulos
import { AppRoutingModule } from './app-routing.module';
import { PagesModule } from './pages/pages.module';
import { AuthModule } from './auth/auth.module';



import { EffectsArray } from './store/effects';

import { AppComponent } from './app.component';
import { NopagefoundComponent } from './nopagefound/nopagefound.component';



@NgModule({
    declarations: [
        AppComponent,
        NopagefoundComponent,
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        PagesModule,
        StoreModule.forRoot(appReducers),
        EffectsModule.forRoot(EffectsArray),
        AuthModule,
        NgbModule,
        NgbTypeaheadModule,
        NgbCarouselModule,
        NgbModalModule,
        NgbCollapseModule,
        PdfViewerModule,
        NgChartsModule ,
    ],
    providers: [
        { provide: LocationStrategy, useClass: HashLocationStrategy },
        DecimalPipe,
        PdfViewerComponent,
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }

