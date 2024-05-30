import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

// import { Store } from '@ngrx/store';
// import { cargarClientes } from './store/actions';
// import { AppState } from './store/app.reducers';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit  {
    title = 'connect@app';

    constructor(
        //private store: Store<AppState>,
        private router: Router,
        private modalService: NgbModal,
    ) { }
    
    public ngOnInit() {
        if (window.location.protocol != 'https:' && window.location.hostname != 'localhost') {
            window.location.href = 'https://' + window.location.hostname + window.location.pathname + window.location.hash;
        }

        //this.store.dispatch(cargarClientes());
    }
}
