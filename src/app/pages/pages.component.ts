import { Component, OnInit } from '@angular/core';

import { SettingsService } from '../services/settings.service';

declare function customInitFunctions();

@Component({
    selector: 'app-pages',
    templateUrl: './pages.component.html',
    styles: [
    ]
})
export class PagesComponent implements OnInit {

    active: string = 'top';
    year = new Date().getFullYear();

    constructor(private settingsService: SettingsService) { }

    ngOnInit(): void {
        customInitFunctions();
    }

}
