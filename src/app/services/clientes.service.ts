import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../environments/environment';

import { Cliente } from '../models/entity.models';
import { Observable, of } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ClientesService {

    private clientes: Cliente[];

    private base_url = environment.base_url;

    constructor(
        private http: HttpClient
    ) {

        this.clientes = [
            { Id: 1, Nombre: 'ADIUM PHARMA S.A.' },
            { Id: 2, Nombre: 'AJINOMOTO' },
            { Id: 3, Nombre: 'ALL.CAN' },
            { Id: 4, Nombre: 'ALPHA OMEGA ENGINEERING LTD' },
            { Id: 5, Nombre: 'AMGEN BIOTECNOLOGÍA DE ARGENTINA S.R.L' },
            { Id: 6, Nombre: 'ANADELIA S.A' },
            { Id: 7, Nombre: 'ASEVIATRIS' },
            { Id: 8, Nombre: 'ASTRAZENECA S.A.' },
            { Id: 9, Nombre: 'AYRTON SAUNDERS LTD' },
            { Id: 10, Nombre: 'BECTON DICKINSON ARGENTINA S.R.L' },
            { Id: 11, Nombre: 'BIOCOM BIOLOGICS LIMITED' },
            { Id: 12, Nombre: 'BIOMAPAS' },
            { Id: 13, Nombre: 'BIOMILL' },
            { Id: 14, Nombre: 'BIOSIDUS S.A' },
            { Id: 15, Nombre: 'BOEHRINGER INGELHEIM ANIMAL HEALTH S.A' },
            { Id: 16, Nombre: 'BOEHRINGER INGELHEIM S.A' },
            { Id: 17, Nombre: 'BRISTOL-MYERS SQUIBB' },
            { Id: 18, Nombre: 'CAMARA ARGENTINA DE ESPECIALIDADES MEDICINALES CAEME' },
            { Id: 19, Nombre: 'CATALENT ARGENTINA SOCIEDAD ANONIMA' },
            { Id: 20, Nombre: 'CONFIDENCE PHARMACEUTICAL RESEARCH' },
            { Id: 21, Nombre: 'DAIICHI SANKYO BRAZIL FARMACEUTICA LTDA' },
            { Id: 22, Nombre: 'DAXLEY ARGENTINA S.A' },
            { Id: 23, Nombre: 'DELTA BIOTECH S.A.' },
            { Id: 24, Nombre: 'DNDI DRUGS FOR NEGLECTED DISEASES INITIATIVE NORTH AMERICA INC' },
            { Id: 25, Nombre: 'ELC GROUP S.R.O' },
            { Id: 26, Nombre: 'ELEA PHOENIX S.A' },
            { Id: 27, Nombre: 'EUROFARMA ARGENTINA S.A.' },
            { Id: 28, Nombre: 'FERRING PRODUCTOS FARMACÉUTICOS SPA' },
            { Id: 29, Nombre: 'FIFARMA' },
            { Id: 30, Nombre: 'FIGUEROA IGNACIO' },
            { Id: 31, Nombre: 'FREIRE BOTNER IVAN' },
            { Id: 32, Nombre: 'FREYR INC' },
            { Id: 33, Nombre: 'G&L SCIENTIFIC LC-- ORBIS' },
            { Id: 34, Nombre: 'GALDERMA ARGENTINA S.A.' },
            { Id: 35, Nombre: 'GEMABIOTECH SAU - AMEGA BIOTECH S.A.' },
            { Id: 36, Nombre: 'GENZYME DE ARGENTINA S.A' },
            { Id: 37, Nombre: 'GLOBAL REGULATORY SERVICE' },
            { Id: 38, Nombre: 'GRUPO NNF' },
            { Id: 39, Nombre: 'GSK BIOPHARMA ARGENTINA S.A.' },
            { Id: 40, Nombre: 'INFINITY PHARMA S.A.' },
            { Id: 41, Nombre: 'INMUNOVA S.A.' },
            { Id: 42, Nombre: 'INNO THERAPY AMÉRICA, INC' },
            { Id: 43, Nombre: 'INNOVATIVE MEDICINES S.A' },
            { Id: 44, Nombre: 'IQVIA S.A' },
            { Id: 45, Nombre: 'LABORATORIO ALEF MEDICAL ARGENTINA S.A' },
            { Id: 46, Nombre: 'LABORATORIO DR GRAY S.A COM IND' },
            { Id: 47, Nombre: 'LABORATORIO FERRING ARGENTINA' },
            { Id: 48, Nombre: 'LABORATORIO SCHÄFER S.A.' },
            { Id: 49, Nombre: 'LABORATORIOS ANDRÓMACO' },
            { Id: 50, Nombre: 'LABORATORIOS BAGÓ' },
            { Id: 51, Nombre: 'LABORATORIOS SAVAL S.A' },
            { Id: 52, Nombre: 'LABORATORIOS TEMIS LOSTALO S.A' },
            { Id: 53, Nombre: 'LINEPHARMA INTERNATIONAL' },
            { Id: 54, Nombre: 'LUIS PASTOR' },
            { Id: 55, Nombre: 'MEDICINLIFE S.R.L' },
            { Id: 56, Nombre: 'MERZ ARGENTINA S.A' },
            { Id: 57, Nombre: 'MERZ PHARMACEUTICALS' },
            { Id: 58, Nombre: 'MONTE VERDE S.A' },
            { Id: 59, Nombre: 'MRS-REGINA' },
            { Id: 60, Nombre: 'MULTICARE PHARMA' },
            { Id: 61, Nombre: 'MYLAN IRELAND LIMITED -VIATRIS' },
            { Id: 62, Nombre: 'NESTLÉ ARGENTINA S.A.' },
            { Id: 63, Nombre: 'NOVARTIS ARGENTINA S.A' },
            { Id: 64, Nombre: 'NUTRAPHARM S.A' },
            { Id: 65, Nombre: 'OCTAPHARMA' },
            { Id: 66, Nombre: 'OM PHARMA' },
            { Id: 67, Nombre: 'OPELLA HEALTHCARE ARGENTINA S.A.U.' },
            { Id: 68, Nombre: 'ORTOPEDIA ITALIANA S.A.S' },
            { Id: 69, Nombre: 'PANALAB S.A. ARGENTINA' },
            { Id: 70, Nombre: 'PAULA MAROTTA Y GUADALUPE CASTILLO CAPITULO I SECCIÓN IV' },
            { Id: 71, Nombre: 'PHARMALEX FRANCIA' },
            { Id: 72, Nombre: 'PHARMALEX GMBH' },
            { Id: 73, Nombre: 'PHARMALEX UK' },
            { Id: 74, Nombre: 'PHARMALEX US CORPORATION' },
            { Id: 75, Nombre: 'PHARMEX ADVANCED LABORATORIES S.L' },
            { Id: 76, Nombre: 'RECORDATI RARE DISEASES COLOMBIA S.A.S- (“RRD”).' },
            { Id: 77, Nombre: 'RJR' },
            { Id: 78, Nombre: 'SAFETY ONE' },
            { Id: 79, Nombre: 'SANDOZ- CHILE' },
            { Id: 80, Nombre: 'SANOFI-AVENTIS ARGENTINA S.A' },
            { Id: 81, Nombre: 'SANTEN' },
            { Id: 82, Nombre: 'SERVICIOS DE PROPIEDAD INDUSTRIAL SPI S.A.S' },
            { Id: 83, Nombre: 'SERVIER ARGENTINA S.A' },
            { Id: 84, Nombre: 'SINERGIUM BIOTECH S.A' },
            { Id: 85, Nombre: 'SOLO IMPORTACION S.R.L' },
            { Id: 86, Nombre: 'TAKEDA PHARMA S.A.' },
            { Id: 87, Nombre: 'TUTEUR SACIFIA' },
            { Id: 88, Nombre: 'VALNEVA AUSTRIA GMBH' },
            { Id: 89, Nombre: 'VERU INC' },
            { Id: 90, Nombre: 'VIFOR PHARMA AMERICA LATINA S.A' },
        ];
    }

    listar(): Observable<Cliente[]> {
        return of(this.clientes);
    }

    obtener(id: number): Observable<Cliente> {
        return of(this.clientes.find(item => item.Id == id));
    }

    actualizar(
        data: Cliente
    ): Observable<Cliente> {
        // const url = `${this.base_url}Cliente`;
        // return this.http.post<Cliente>(url, data, this.headers);
        return this.obtener(data.Id);
    }

    eliminar(
        id: number
    ): Observable<Cliente> {
        //const url = `${base_url}Cliente/eliminar/${id}`;
        // return this.http.post<Cliente>(url, data, this.headers);
        return this.obtener(id);
    }
}
