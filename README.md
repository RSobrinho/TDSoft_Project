# Microsserviço Financeiro TDSOFT

Microsserviço desenvolvido para a disciplina TDSOFT do curso de Engenharia de Software da UFMS, este serviço tem como objetivo fornecer rotas de processamento de dados financeiros que atendam aos seguintes requisitos:

- Registros de pagamento e validação
- Lançamento de dívidas
- Manutenção do histórico do usuário

## 💻 Instalando o microserviço

### Requisitos

Para instalar o projeto e executar a serviço, você deve ter instalado em seu dispositivo:

- [Git](https://git-scm.com/downloads)
- [Node.js](https://nodejs.org)
- [Postman](https://www.postman.com)
- [VSCode](https://code.visualstudio.com) (Opcional)

### Instalação

Clone o projeto em uma pasta no seu dispositivo ou baixe uma cópia compactada e descompacte-a na pasta do seu dispositivo.

```
git clone https://github.com/RSobrinho/TDSoft_Project.git
```

Na pasta do projeto, abra um terminal e execute o seguinte comando:

```
npm install
```

O comando acima vai instalar todas as dependências necessárias do projeto.

## 🚀 Iniciando o Microsserviço

Depois de instalar todas as dependências, é hora de iniciar o servidor, então certifique-se de que seu terminal esteja acessando a pasta do projeto e inicie o servidor com o seguinte comando:

```
npm run dev
```

Este comando irá compilar automaticamente o código TypeScript para JavaScript e então executar a API

Se o terminal não apresentar nenhum erro, o serviço está pronta para ser usado.

## ☕ Usando o Microsserviço

Recomenda-se utilizar [POSTMAN](https://www.postman.com) para realizar as solicitações.

Agora no POSTMAN, utilize "[http://localhost:8080](http://localhost:8080) + rota" para realizar as requisições, para realizar as requisições, veja abaixo as rotas disponíveis.

## Rotas de Transação

### `POST` Registrar uma transação

```
localhost:8080/fin
```

Exemplo body:

```json
{
  "userId": "123",
  "paymentMethod": "pix",
  "paymentAction": "normal",
  "paymentValue": 20,
  "subscriptionId": null
}
```

_Valores aceitos no parametro paymentMethod_: "pix", "debit" ou "credit"

_Valores aceitos no parametro paymentAction_: "normal" ou "subscription"

_O parametro subscriptionId só deve ser passado caso deseja vincular a algum plano ou assinatura_

Exemplo resposta:

```json
{
  "status": "Success",
  "message": "Transaction saved successfully!",
  "newTransaction": {
    "_id": "a564d5f9-e5b7-440a-8892-0597355c97b6",
    "userId": "123",
    "paymentMethod": "pix",
    "paymentAction": "normal",
    "paymentValue": 20,
    "success": false,
    "subscriptionId": null
  }
}
```

### `GET` Listar histórico de Transações

_This route will return a list of users by query parameters_

```
localhost:3000/fin
```

_Parametros query aceitos_: userId, initialDate, finalDate, success, page, limit

_Os parametros initialDate e finalDate devem ser usados ao mesmo tempo_

Exemplo Resposta:

```json
{
  "transactions": [
    {
      "_id": "d4ce7112-6019-4a60-a8f6-fbc14f163003",
      "userId": "teste1",
      "paymentMethod": "pix",
      "paymentAction": "normal",
      "paymentValue": 10,
      "subscriptionId": null,
      "success": true,
      "createdAt": "2023-11-07T05:13:24.994Z"
    }
  ],
  "total": 1
}
```
