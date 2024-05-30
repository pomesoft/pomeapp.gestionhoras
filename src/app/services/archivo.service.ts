import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

const base_url = environment.base_url;

@Injectable({
    providedIn: 'root'
})
export class ArchivoService {

    constructor() { }

    getURLBaseAdjunto(
        nombre: string = ''
    ): string {
        const apiUlr = `${base_url}`;
        let _extension = nombre.trim().toLowerCase().split(/\#|\?/)[0].split('.').pop();
        if (nombre == '' || _extension != 'pdf')
            return `${apiUlr.substring(0, apiUlr.length - 4)}assets/adjuntos/`;
        else
            return `${apiUlr}Comprobante/GetAdjunto?nombreArchivo=`;
    }


    public async actualizarFoto(
        archivo: File,
    ) {

        try {

            const url = `${base_url}/Operacion/Adjuntar`;
            const formData = new FormData();

            formData.append(archivo.name, archivo);

            const resp = await fetch(url, {
                method: 'POST',
                headers: {},
                body: formData
            });

            const data = await resp.json();

            if (data) {
                return data;
            } else {
                console.log(data.msg);
                return false;
            }

        } catch (error) {
            console.log(error);
            return false;
        }

    }



    descargar_to_CSV(data, filename = 'data', header = []) {

        let csvData = this.ConvertToCSV(data, header);
        console.log(csvData)
        let blob = new Blob(['\ufeff' + csvData], { type: 'text/csv;charset=utf-8;' });
        let dwldLink = document.createElement("a");
        let url = URL.createObjectURL(blob);
        let isSafariBrowser = navigator.userAgent.indexOf('Safari') != -1 && navigator.userAgent.indexOf('Chrome') == -1;
        if (isSafariBrowser) {  //if Safari open in new window to save file with random filename.
            dwldLink.setAttribute("target", "_blank");
        }
        dwldLink.setAttribute("href", url);
        dwldLink.setAttribute("download", filename + ".csv");
        dwldLink.style.visibility = "hidden";
        document.body.appendChild(dwldLink);
        dwldLink.click();
        document.body.removeChild(dwldLink);
    }

    ConvertToCSV(objArray, headerList) {
        let array = typeof objArray != 'object' ? JSON.parse(objArray) : objArray;
        let str = '';
        let row = '';

        for (let index in headerList) {
            row += headerList[index] + ',';
        }
        row = row.slice(0, -1);
        str += row + '\r\n';
        for (let i = 0; i < array.length; i++) {
            let line = '';
            for (let index in headerList) {
                let head = headerList[index];
                line += array[i][head] + ',';
            }
            str += line + '\r\n';
        }
        return str;
    }



}
