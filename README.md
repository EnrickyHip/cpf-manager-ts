# CPF MANAGER
Gerador, validador e gerenciador de CPF's para JavaScript e TypeScript.

## Instalação

```shell
$ npm install cpf-manager
```

## Gere um CPF Válido

```js
const Cpf = require('cpf-manager');
const cpf = Cpf.generate();
console.log(cpf); // 147.001.216-29
```

## Valide um CPF

```js
const Cpf = require('cpf-manager');

const cpfValido = Cpf.validate('147.001.216-29');
console.log(cpfValido); // true

const cpfInvalido = Cpf.validate('111.111.111-11');
console.log(cpfInvalido); // false
```

## Formate um CPF

```js
const Cpf = require('cpf-manager');

const cpfFormatado = Cpf.format('14700121629');
console.log(cpfFormatado); // 147.001.216-29
```

## Valide o formato de um CPF

```js
const Cpf = require('cpf-manager');

const formatoValido = Cpf.validateFormat('147.001.216-29');
console.log(formatoValido); //true

const formatoInvalido = Cpf.validateFormat('147-001-216-29');
console.log(formatoInvalido); // false
```

## Limpe um CPF

```js
const Cpf = require('cpf-manager');

const cpfLimpo = Cpf.cleanUp('147.001.216-29');
console.log(cpfLimpo); // 14700121629
```
