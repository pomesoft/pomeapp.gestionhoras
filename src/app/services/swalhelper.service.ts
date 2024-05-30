import { Injectable } from '@angular/core';

import Swal from 'sweetalert2';

@Injectable({
    providedIn: 'root'
})
export class SwalhelperService {

    constructor() { }

    setSwalFireOk(
        mensaje: string = 'Los datos se actualizaron correctamente.'
    ) {
        Swal.fire('', mensaje, 'success');
    }


    setSwalFireError(
        mensaje: string = 'Ocurrió un error.'
    ) {
        Swal.fire({
            title: 'Error',
            text: mensaje,
            icon: 'error',
            showCloseButton: true,
            showCancelButton: false,
            focusConfirm: true,
            confirmButtonColor: "#DC3545",
            confirmButtonText: `<i class="fa fa-times"></i> Cerrar`,
        });
    }

    setSwalFireWarning(
        mensaje: string = 'Verifique los datos ingresados.'
    ) {
        Swal.fire({
            title: 'Alerta',
            text: mensaje,
            icon: 'warning',
            showCloseButton: true,
            showCancelButton: false,
            focusConfirm: true,
            confirmButtonColor: "#FFC107",
            confirmButtonText: `<i class="fa fa-times"></i> Cerrar`,
        });
    }
    setToastOK(
        titulo: string = 'Los datos se actualizaron correctamente.'
    ) {
        const Toast = Swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 2000,
            timerProgressBar: true,
        })
        Toast.fire({
            icon: 'success',
            title: titulo
        });
    }

    setToastError(
        err: any,
        titulo: string = 'Ocurrió un error.'
    ) {
        const Toast = Swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 2000,
            timerProgressBar: true,
        })
        Toast.fire({
            icon: 'error',
            title: titulo
        });
        console.log(err);
    }

    setToastWarning(
        titulo: string = 'Alerta.'
    ) {
        const Toast = Swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 2000,
            timerProgressBar: true,
        })
        Toast.fire({
            icon: 'warning',
            title: titulo
        });
    }
}
