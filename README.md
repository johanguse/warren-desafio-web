# Desafio Warren - Web

Todas as informações sobre o desafio pode ser encontradas no link <https://github.com/warrenbrasil/desafio-warren-web>

Link para demo: <https://warren-desafio-web.netlify.app/>

## Sobre o desafio

Este desafio consistia em implementar uma tela de lista de transações apresentando os principais dados relacionado a cada uma delas e ao clicar em uma transação será exibido um modal contendo os detalhes desta transação. O desafio deverá conter as seguintes funcionalidades:

- [x] Lista de transações agrupada por data
- [x] Filtro por título
- [x] Filtro por status
- [x] Modal contendo os detalhes da transação


### Tecnologias

- Vue2 com Cli
- TypeScript
- Less
- Axios
- Jest

Na escolha da tecnologia foi em conta os requisitos da Warren, portanto eu usei o mais próximo possivel do que foi pedido.

## Instalação das dependências

### Pré-requisitos

Para a utilização da aplicação são necessários alguns softwares, listados abaixo:

- [git](https://git-scm.com/): Utilizado para clonar o repositório do projeto.
- [npm](https://www.npmjs.com/) ou [yarn](https://yarnpkg.com/): Gerenciador de pacotes para a instalação automática das dependências do projeto
- [Node.js](https://nodejs.org/en/): Runtime para utilizar o gerenciador de pacotes e necessário para rodar a aplicação.
- [Vue Cli](https://cli.vuejs.org/guide/installation.html) - Vue CLI aims to be the standard tooling baseline for the Vue ecosystem.

### Instalação

Passos para a instalação do projeto:

1. Clonar repositório:

   Utilizando HTTPS:

   ```sh
   git clone https://github.com/johanguse/warren-desafio-web.git
   ```

2. Navegue para pasta do projeto:

   ```sh
   cd warren-desafio-web
   ```

3. Instalar os pacotes necessários:
   
   Utilizando yarn (dentro da pasta do projeto):

   ```sh
   yarn
   ```

   Utilizando npm (dentro da pasta do projeto):

   ```sh
   npm install
   ```

## Utilização

> Obs: Altere o comando de **yarn** para **npm run**, caso esteja utilizando o _npm_ ao invés do _yarn_ como gerenciador de pacotes.

O projeto possui 3 comandos de _script_ para rodar o projeto:

Para iniciar o projeto em modo de desenvolvimento utilize:

```sh
yarn serve
```

Para fazer o _build_ do projeto com os arquivos para produção e otimizados utilize:
```sh
yarn build
```

Para rodar os testes presentes no projeto utilize:

```sh
yarn test:unit
```

## To-Do

Algumas coisas que ainda precisam ser implementadas ou alteradas no projeto:

- [ ] Criação de mais testes unitários (Jest)
- [ ] Criação de testes E2E (Cypress)
