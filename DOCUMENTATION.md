# Documentação 

## --> Passo à passo do projeto

<br>

`` npm init ``

- Este comando serve para inicializar o projeto e criar o arquivo inicial do **packege.json**.

<br>

`` npm install typescript @types/node -D ``

- Para que o projeto possa rodar com tipagens do **TypeScript** e o **-D** indica que esta é uma dependência de desenvolvimento, pois quando for colocar o projeto no ar não precisaremos desta dependência. Antes de colocar no ar, todo o código será convertido de **TypeScript** para **JavaScript**. Pois está é uma tipagem estática que valida apenas no editor de código.

<br>

`` npx tsc --init ``

- Cria na raiz do nosso projeto o arquivo **tsconfig.json** onde estão as configurações do **TypeScript**.

- Depois entramos em **https://github.com/tsconfig/bases** apara pegar as configurações iniciais do arquivo **tsconfig.json** de acordo com a versão que estamos utilizando do **NodeJs**:

``` 
{
  "$schema": "https://json.schemastore.org/tsconfig",
  "_version": "20.1.0",

  "compilerOptions": {
    "lib": ["es2023"],
    "module": "node16",
    "target": "es2022",

    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "moduleResolution": "node16"
  },

  "include": ["src"]
} 
```

<br>

`` npm install tsx -D ``

- Para executar os arquivos .ts com o comando ``tsx watch --env-file .env src/server.ts`` e alteramos o **package.json** apara adicionar este comando como um script que vai rodar com ``npm run dev``

<br>

``npm install fastify``

- Para instalar o micro-framework de NodeJs que utilizamos para solicitações de API.

---

### --> Configurações de arquivos:

- Na sequência criamos a pasta **SRC** e o primeiro arquivo **server.ts** e configuramos:

```
import fastify from 'fastify'

const app = fastify()

app.get('/', () => {
  return "Hello World!"
})

app.listen({ port: 3333 }).then(() => {
  console.log("Runing API PineappleSoccer!");
})
```
- Assim a partir de agora quando rodarmos o comando ``npm run dev`` em nosso terminal será exibido: 

![terminal](/images/1.PNG)

e no browser na url: http://localhost:3333/ será exibido: 

![browser](/images/2.PNG)

---

### --> Configuração de Banco de Dados

- Vamos utilizar para a automação de nossos recursos de Banco de Dados (DB) a **OMR**: **PRISMA**

<br>

``npm install prisma -D``

- Com este comando instalamos o **PRISMA** como uma dependência de desenvolvimento.

``npx prisma init --datasource-provider SQLite``

- Com este comando configuramos o prisma de acordo com o banco que queremos utilizar. Neste caso utilizamos o **SQLite**. Caso futuramente precise alterar o banco, não é necessário grandes alterações no código graças ao **PRISMA.**

- Após o comando é criado na pasta raiz o arquivo **.env**, que possui um **DATABASE_URL=** o qual indica o caminho para o nosso banco de dados. Este arquivo é onde criamos nossas variáveis de ambiente. E a pasta do **prisma** com o arquivo **schema.prisma** onde criaremos nossas tabelas.

- Importante também instalar a extensão do **PRISMA** no **VSCODE**
 
- Dentro do arquivo **schema.prisma** criamos nossas tabelas: 

![table_user](/images/3.PNG)

``npx prisma migrate dev``

- Este comando fará uma varredura no arquivo schema.prisma buscando todas as alterações feitas, no caso a criação de uma nova tabela. Vai pedir para criarmos um nome para esta nova migração, como se fosse um commit e irá rodar automaticamente os comandos sql necessários para as alterações no banco.

- Assim será criado uma pasta **migrations** dentro da pasta **prisma** onde serão resgistradas todas as migrações realizadas (com os códigos sql necessários).

``npx prisma studio``

- Com este comando abrimos uma ferramente do prisma para visualizar nossas tabelas de bancos de dados no browser.

### --> Criando validações na 1° rota

``npm install zod``

- Usamos este comando para instalar a biblioteca **Zod**, apara configurarmos as validações de corpo de requisição dos nossos métodos.

### --> Primeira rota com validações feita no arquivo **server.ts** 

- Realizamos as configurações como demonstra a imagem à seguir:

![validações-primeira-rota](/images/4.PNG)

