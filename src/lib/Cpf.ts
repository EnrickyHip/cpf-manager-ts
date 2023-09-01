import { random } from "./utils/random";

export default class Cpf {
  static readonly regex = /^(\d{3})\.(\d{3})\.(\d{3})-(\d{2})$/;
  /**
   * Gera um CPF válido aleatório.
   * @returns O cpf no formato: 999.999.999-99.
   */

  static generate(): string {
    let cpf = "";

    do {
      for (let index = 0; index < 9; index++) {
        const randomNumber = random(0, 9);
        cpf += randomNumber.toString();
      }
    } while (Cpf.isSequence(cpf));

    const firstDigit = Cpf.createDigit(cpf);
    const secondDigit = Cpf.createDigit(cpf + firstDigit); // o + concatena o first digit no fim da string
    return Cpf.format(cpf + firstDigit + secondDigit) as string;
  }

  /**
   * Checa validade de um CPF.
   * @param cpf Cpf a ser validado. O CPF obrigatóriamente precisa estar no formato: 123.123.123-12 ou 12312312312. Mesmo que os dígitos sejam válido, caso a string não esteja nesses formatos, o retorno será falso.
   * @returns `true` se o CPF for válido ou `false` caso não seja.
   */

  static validate(cpf: string): boolean {
    const justNumbersRegex = /^\d{11}$/;
    if (!justNumbersRegex.test(cpf) && !Cpf.validateFormat(cpf)) {
      return false;
    }

    const cleanCpf = Cpf.cleanUp(cpf);
    if (cleanCpf.length !== 11) return false;
    if (Cpf.isSequence(cleanCpf)) return false;

    const parcialCpf = cleanCpf.slice(0, -2);
    const firstDigit = Cpf.createDigit(parcialCpf);
    const secondDigit = Cpf.createDigit(parcialCpf + firstDigit); // o + concatena o first digit no fim da string

    const newCpf = parcialCpf + firstDigit + secondDigit;
    return newCpf === cleanCpf;
  }

  /**
   * Checa se o formato enviado corresponde com o formato tradicional de CPF's: 999.999.999-99
   * @param cpf CPF a ser checado.
   * @returns `true` se o formato corresponder ou `false` caso não.
   */

  static validateFormat(cpf: string): boolean {
    return Cpf.regex.test(cpf);
  }

  /**
   * Formata um CPF no formato: 999.999.999-99.
   * @param cpf CPF a ser formatado. Esse parâmetro é extremamente livre, pois a função filtra tudo que não for dígito.
   * @returns O CPF formatado. Caso não seja possível formatar o cpf por não possuir a quantidade necessária de caracteres, o retorno será `null`
   * @example
   *
   * const cpfFormatado = Cpf.format('27303239456');
   * console.log(cpfFormatado);
   * //output: 273.032.394-56
   *
   * const cpfFormatado = Cpf.format('649.98136054');
   * console.log(cpfFormatado);
   * //output: 649.981.360-54
   *
   * const cpfFormatado = Cpf.format('652-809-610-43');
   * console.log(cpfFormatado);
   * //output: 652.809.610-43
   *
   * const cpfFormatado = Cpf.format('289 asasa88a  sassa7.56as002');
   * console.log(cpfFormatado);
   * //output: 289.887.560-02
   */

  static format(cpf: string) {
    const cleanCpf = Cpf.cleanUp(cpf);
    if (cleanCpf.length < 11) return null;
    return cleanCpf.replace(/^(\d{3})(\d{3})(\d{3})(\d{2})$/, "$1.$2.$3-$4"); //$1, $2, ... -> referem-se a cada parenteses do regex
  }

  /**
   * Remove todo tipo de caractere que não seja um dígito.
   * @param cpf Cpf a ser limpado.
   * @returns O CPF com apenas dígitos.
   *
   * @example
   *
   * const CPFLimpo = Cpf.cleanUp('123.123.123-12');
   * console.log(CPFLimpo);
   * //output: 12312312312
   */

  static cleanUp(cpf: string): string {
    return cpf.replace(/\D+/g, ""); //remove tudo que não é digito
  }

  private static createDigit(parcialCpf: string): string {
    const cpfArray = Array.from(parcialCpf);

    let total = 0;
    let multiplier = cpfArray.length + 1;

    for (const digit of cpfArray) {
      total += Number(digit) * multiplier;
      multiplier--;
    }

    let digit = 11 - (total % 11);
    if (digit > 9) digit = 0;
    return String(digit);
  }

  private static isSequence(cpf: string): boolean {
    const sequence = cpf[0].repeat(cpf.length);
    return sequence === cpf;
  }
}
