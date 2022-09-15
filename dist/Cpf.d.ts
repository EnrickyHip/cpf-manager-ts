export default class Cpf {
    static generate(): string;
    static validate(cpf: string): boolean;
    static formatCpf(cpf: string): string;
    private static createDigit;
    private static validateString;
    private static isSequence;
}
