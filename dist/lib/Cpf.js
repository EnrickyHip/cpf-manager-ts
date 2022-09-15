"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const random_1 = require("./utils/random");
class Cpf {
    static generate() {
        let cpf;
        do {
            const cpfNumber = (0, random_1.random)(100000000, 999999999);
            cpf = cpfNumber.toString();
        } while (Cpf.isSequence(cpf));
        const firstDigit = Cpf.createDigit(cpf);
        const secondDigit = Cpf.createDigit(cpf + firstDigit); // o + concatena o first digit no fim da string
        return Cpf.format(cpf + firstDigit + secondDigit);
    }
    static validate(cpf) {
        const justNumbersRegex = /^\d{11}$/;
        if (!justNumbersRegex.test(cpf) && !Cpf.validateFormat(cpf)) {
            return false;
        }
        const cleanCpf = Cpf.cleanUp(cpf);
        if (cleanCpf.length !== 11)
            return false;
        if (Cpf.isSequence(cleanCpf))
            return false;
        const parcialCpf = cleanCpf.slice(0, -2);
        const firstDigit = Cpf.createDigit(parcialCpf);
        const secondDigit = Cpf.createDigit(parcialCpf + firstDigit); // o + concatena o first digit no fim da string
        const newCpf = parcialCpf + firstDigit + secondDigit;
        return newCpf === cleanCpf;
    }
    static validateFormat(cpf) {
        const regex = /^(\d{3})\.(\d{3})\.(\d{3})-(\d{2})$/;
        return regex.test(cpf);
    }
    static format(cpf) {
        const cleanCpf = cpf.replace(/\D+/g, "");
        return cleanCpf.replace(/^(\d{3})(\d{3})(\d{3})(\d{2})$/, "$1.$2.$3-$4"); //$1, $2, ... -> referem-se a cada parenteses do regex
    }
    static cleanUp(cpf) {
        return cpf.replace(/\D+/g, ""); //remove tudo que não é digito
    }
    static createDigit(parcialCpf) {
        const cpfArray = Array.from(parcialCpf);
        let multiplicator = cpfArray.length + 2;
        const cpfMultiplicateArray = cpfArray.map((number) => {
            multiplicator--;
            return Number(number) * multiplicator;
        });
        const total = cpfMultiplicateArray.reduce((ac, value) => value + ac);
        let digit = 11 - (total % 11);
        if (digit > 9)
            digit = 0;
        return String(digit);
    }
    static isSequence(cpf) {
        const sequence = cpf[0].repeat(cpf.length);
        return sequence === cpf;
    }
}
exports.default = Cpf;
//# sourceMappingURL=Cpf.js.map