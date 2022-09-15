export default class Cpf {
    static generate(): string;
    static validate(cpf: string): boolean;
    static validateFormat(cpf: string): boolean;
    static format(cpf: string): string;
    static cleanUp(cpf: string): string;
    private static createDigit;
    private static isSequence;
}
