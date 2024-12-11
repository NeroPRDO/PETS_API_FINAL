# PETS_API_FINAL

# Petshop Mundo Vira-Lata 🌎🔁🗑

## Sobre o Projeto

Petshop Mundo Vira-Lata é uma aplicação web para gerenciamento de pets e tutores. O sistema permite cadastro e login de usuários, além de funcionalidades para gerenciar os dados dos pets. O projeto foi desenvolvido utilizando HTML, CSS, JavaScript, e um servidor Node.js com MongoDB para persistência dos dados.

## Tecnologias Utilizadas

- **Frontend:**
  - HTML5
  - CSS3
  - JavaScript (Vanilla JS)
- **Backend:**
  - Node.js
  - Express.js
  - MongoDB
  - Mongoose
- **Outras:**
  - JWT (JSON Web Tokens) para autenticação
  - bcrypt para hashing de senhas
  - CORS para segurança

---

## Funcionalidades

### Site
- **Página Inicial:**
  - Boas-vindas ao usuário.
  - Formulários de registro e login.
- **Seção de Gerenciamento de Pets:**
  - Cadastro de novos pets.
  - Listagem de pets cadastrados.
  - Edição e exclusão de dados dos pets.

### API
- **Endpoints Disponíveis:**
  - `POST /register` - Cadastro de usuários.
  - `POST /login` - Login de usuários e geração de tokens JWT.
  - `GET /pets` - Listagem de pets (autenticado).
  - `POST /pets` - Cadastro de um novo pet (autenticado).
  - `PUT /pets/:id` - Atualização de informações de um pet (autenticado).
  - `DELETE /pets/:id` - Exclusão de um pet (autenticado).

---

## Instruções de Instalação

### Pré-requisitos
- Node.js instalado na máquina.
- MongoDB Atlas configurado ou MongoDB local disponível.

### Passos
1. Clone este repositório:
   ```bash
   git clone https://github.com/NeroPRDO/PETS_API_FINAL
   ```

2. Acesse o diretório do projeto:
   ```bash
   cd End_Web
   ```

3. Instale as dependências:
   ```bash
   npm install express mongoose cors bcrypt jsonwebtoken
   ```

4. Configure o banco de dados MongoDB no arquivo `server.js`.

5. Inicie o servidor:

   ```bash
   node server.js
   ```
   uma mensagem dizendo "Connected to MongoDB" deve aparecer no terminal.
   lembre-se de conectar o mongo db no seu sistema.
   código playgrounddb:
                        use('petshopdb');
                        db.createCollection('users');
                        db.createCollection('pets');

  minha string: mongodb+srv://Pedro_Nero:Pedro_515@web-1.c5u5a.mongodb.net/


7. Abra o arquivo `index.html` no navegador para acessar o sistema.
       Ou abra http://localhost:3000

---

## Estrutura de Arquivos

```
End_Web/
├── public/
│   ├── index.html
│   ├── styles.css
│   ├── images/
│       ├── gatinhos.jpg
│       ├── paws.png
├── server.js
├── package-lock.json
├── package.json
└── README.md
```

---

## Contribuição

Contribuições são bem-vindas! Sinta-se à vontade para abrir issues ou enviar pull requests.

---

## Autores

- **Pedro Eduardo Dall' Agnol**
  - GitHub: [NeroPRDO](https://github.com/NeroPRDO)
- **Gabriela Harres Rodrigues**
  - Github: [GabrielaHarres](https://github.com/GabrielaHarres)

---

## Licença

Este projeto está licenciado sob a Licença MIT.
