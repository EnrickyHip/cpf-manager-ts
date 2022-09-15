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
        return Cpf.formatCpf(cpf + firstDigit + secondDigit);
    }
    static validate(cpf) {
        const cleanCpf = cpf.replace(/\D+/g, "");
        if (!Cpf.validateString(cleanCpf))
            return false;
        const parcialCpf = cleanCpf.slice(0, -2);
        const firstDigit = Cpf.createDigit(parcialCpf);
        const secondDigit = Cpf.createDigit(parcialCpf + firstDigit); // o + concatena o first digit no fim da string
        const newCpf = parcialCpf + firstDigit + secondDigit;
        return newCpf === cleanCpf;
    }
    static formatCpf(cpf) {
        return cpf.replace(/^(\d{3})(\d{3})(\d{3})(\d{2})$/, "$1.$2.$3-$4"); //$1, $2, ... -> referem-se a cada parenteses do regex
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
    static validateString(cpf) {
        if (cpf.length !== 11)
            return false;
        if (Cpf.isSequence(cpf))
            return false;
        return true;
    }
    static isSequence(cpf) {
        const sequence = cpf[0].repeat(cpf.length);
        return sequence === cpf;
    }
}
exports.default = Cpf;
//# sourceMappingURL=Cpf.js.map