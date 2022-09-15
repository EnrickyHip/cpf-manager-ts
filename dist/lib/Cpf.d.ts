export default class Cpf {
    /**
     * Gera um CPF válido aleatório.
     * @returns O cpf no formato: 999.999.999-99.
     */
    static generate(): string;
    /**
     * Checa validade de um CPF.
     * @param cpf Cpf a ser validado. O CPF obrigatóriamente precisa estar no formato: 123.123.123-12 ou 12312312312. Mesmo que os dígitos sejam válido, caso a string não esteja nesses formatos, o retorno será falso.
     * @returns `true` se o CPF for válido ou `false` caso não seja.
     */
    static validate(cpf: string): boolean;
    /**
     * Checa se o formato enviado corresponde com o formato tradicional de CPF's: 999.999.999-99
     * @param cpf CPF a ser checado.
     * @returns `true` se o formato corresponder ou `false` caso não.
     */
    static validateFormat(cpf: string): boolean;
    /**
     * Formata um CPF no formato: 999.999.999-99.
     * @param cpf CPF a ser formatado. Esse parâmetro é extremamente livre, pois a função filtra tudo que não for dígito.
     * @returns O CPF formatado.
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
    static format(cpf: string): string;
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
    static cleanUp(cpf: string): string;
    private static createDigit;
    private static isSequence;
}
