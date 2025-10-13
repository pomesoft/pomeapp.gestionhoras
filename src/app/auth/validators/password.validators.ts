
export class PasswordValidators {

    static tieneMinimoCaracteres(password: string): boolean {
        const regex = /^.{10,}$/;
        return regex.test(password);
    }

    static tieneSimbolo(password: string): boolean {
        const regex = /[\W_]/;
        return regex.test(password);
    }

    static tieneNumero(password: string): boolean {
        const regex = /\d/;
        return regex.test(password);
    }

    static tieneMayuscula(password: string): boolean {
        const regex = /[A-Z]/;
        return regex.test(password);
    }

    static tieneMinuscula(password: string): boolean {
        const regex = /[a-z]/;
        return regex.test(password);
    }

    static evitarCaracteresComunes(password: string): boolean {
        const regex = /^[^ "<>'\s]+$/;
        return regex.test(password);
    }
}
