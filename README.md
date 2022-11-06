# Store manager
  Store manager é um projeto Back-end, onde coloca em prática o CRUD e o modelo de arquitetura de software MSC. A API construída é um sistema de gerenciamento de vendas no formato dropshipping em que será possível criar, visualizar, deletar e atualizar produtos e vendas.
  O Projeto Foi desenvolvido durante o Curso de desenvolvimento Web Full Stack na [Trybe](https://www.betrybe.com/)
 
 Na elaboração da API RESTful utilizou-se a arquitetura **Model-Service-Controller(MSC)**, com as seguintes ferramentas:

- [Node.JS](https://nodejs.org/en/)
- [Express](https://expressjs.com/pt-br/)
- [MySQL](https://www.mysql.com/)
- [Docker](https://www.docker.com/)

Para a elaboração dos testes unitários da aplicação, foi utilizado as seguintes ferramentas:
- [Mocha](https://mochajs.org/)
- [Chai](https://www.chaijs.com/)
- [Sinon](https://sinonjs.org/)

# Execução:

No seu Terminal Linux, inicie realizando o clone deste repositório com o seguinte comando:

    git clone git@github.com:gabrielsacht/Store-Manager.git

Navegue até a raíz do projeto.

    cd Store-Manager/
    
A Aplicação pode ser rodada localmente, ou atráves do Docker.

Para rodar localmente, você deve ter o Node instalado na sua máquina (16.14+) e o mysql-server.

Lembre-se de alterar as variáveis de ambiente caso a aplicação esteja enfrentando erros. Localmente você pode alterar as portas e suas credenciais no arquivo .env e se estiver rodando pelo docker, você pode alterar essas mesmas informações no arquivo docker-compose.yml, ambos localizados na raiz do projeto. 

<details>
   <summary><strong>Rodando localmente</strong></summary> 
  </br>
  
  Após seguir os dois passos iniciais execute o comando abaixo para instalar as dependências:

    npm install

  Renomeie o arquivo '.env-example' na raiz do projeto para '.env' e subtitua, caso necessário, as informações contidas nele com suas credenciais do mysql e as preferências (PORT e LOCALHOST).
  
  Faça login no banco de dados utilizando suas credencias. 
 
    mysql -u <seu-usuario> -p
    
  Execute os scripts <strong>migration.sql</strong> e <strong>seed.sql</strong> para a criação do banco <strong>Store Manager</strong>. Você pode fazer isso utilizando o mysql-workbench ou diretamente no terminal do mysql copiando os códigos contidos no arquivo migration.sql e seed.sql respectivamente.
  
  Inicie a aplicação rodando o seguinte comando:
    
    npm start
</details>
<details>
   <summary><strong>Rodando pelo Docker</strong></summary> 
  </br>
  
  Na raíz do projeto, utilize o seguinte comando para subir os containers do <strong>node</strong> e do <strong>banco de dados</strong>:

    docker-compose up -d
    
  Abra o terminal do container <strong>store_manager</strong> executando o comando:

     docker exec -it store_manager bash

  após entrar no terminal do container, execute o comando abaixo para instalar as dependências:

    npm install

    
 Para configurar o banco de dados será necessário entrar no terminal do container <strong>store_manager_db</strong>. No terminal da sua máquina local, utilize o seguinte comando:
  
    docker exec -it store_manager_db bash
    
 Faça login no banco de dados utilizando as credencias descritas no arquivo <strong>docker-compose.yaml</strong> (use 'root' e 'password' como padrão): 
 
    mysql -u root -p
 
 Execute os scripts <strong>migration.sql</strong> e <strong>seed.sql</strong> para a criação do banco <strong>Store Manager</strong>. Você pode fazer isso utilizando o mysql-workbench ou diretamente no terminal do mysql copiando os códigos contidos no arquivo migration.sql e seed.sql respectivamente.

Utilizando o terminal do container do <strong>store_manager</strong> realize o seguinte comando para iniciar a aplicação:
  
    npm start
    
</details>
   
# End-points para usar

Com a aplicação rodando você pode fazer requisições com os seguintes end-points (dica: utilize o thunder-client ou semelhante) :

<strong>GET</strong>:
- http://localhost:PORT/products  -  lista todos os produtos
- http://localhost:PORT/products/:id  -  lista um produto pelo id
- http://localhost:PORT/sales  -  lista todas as vendas
- http://localhost:PORT/sales/:id  -  lista uma venda pelo id
- http://localhost:PORT/products/search?q='PARAMETRO-DE-BUSCA'  -  lista um produto buscando pelo parametro de busca

<strong>POST</strong>:
- http://localhost:PORT/products    - cadastra um produto  <br>
    o corpo da requisição deve estar no seguinte formato:
  
  ```json
      {
        "name": "ProdutoX"
      }
  ```
  
- http://localhost:PORT/sales     - cadastra uma venda <br>
    o corpo da requisição deve estar no seguinte formato:
  
  ```json
  [
    {
      "productId": 1,
      "quantity": 1
    },
    {
      "productId": 2,
      "quantity": 5
    }
  ]
  ```

<strong>PUT</strong>:
- http://localhost:PORT/products/:id    - atualiza um produto  <br>
    o corpo da requisição deve estar no seguinte formato:
  
  ```json
      {
        "name": "ProdutoX"
      }
  ```
  
- http://localhost:PORT/sales/:id     -  atualiza uma venda <br>
    o corpo da requisição deve estar no seguinte formato:
  
  ```json
  [
    {
      "productId": 1,
      "quantity": 1
    },
    {
      "productId": 2,
      "quantity": 5
    }
  ]
  ```

 <strong>DELETE</strong>:
 - http://localhost:PORT/products/:id     -  deleta um produto
 - http://localhost:PORT/sales/:id      - deleta uma venda
