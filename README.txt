Pré-requisitos: 
Antes de começar, certifique-se de que você tenha instalado em seu sistema:
.NET SDK 6; 
Node.js (inclui o npm);
SQL Server; 

Passo 1: Configurar a string de conexão
1 - Abra a pasta "Sistema Vendas" e em seguida a pasta "backend"; 
2 - Abra o solução clicando no arquivo "Api_Vendas.sln";
3 - Dentro dos arquivos do projeto acesso o arquivo "appsettings.json"; 
4 - No objeto de chave valor "DefaultConnection" informe a string de conexão da sua máquina local. IMPORTANTE: mantenha o nome do campo Database da string como "Database=BdVendas";
5 - Salve o projeto; 

Passo 2: Aplicando a migration
1 - Acesse o seu terminal até a pasta "\Sistema Vendas\backend\Api_Vendas", caso esteja no Visual Studio selecione a opção Ferramentas -> Linha de comando -> Prompt de comando; 
2 - Digite o seguinte comando "dotnet ef", caso apareça as informações do EntityFrameWork Core significa que o EF Tools está instalado corretamente e pode seguir para o próximo passo; 
3 - Digite o seguine comando "dotnet ef database update" para aplicar o script de migração do banco de dados;
4 - Caso tudo funcione, seu banco de dados "BdVendas" será criado.

Passo 3: Insert na tabela de itens
1 - Abra o SQLServer; 
2 - Abra o script localizado na pasta "Sistema Vendas\ScriptInsertTable.sql"; 
3 - Execute esse script e os produtos serão adicionados na tabela de itens.

Passo 4: Executar o backend
1 - Execute o projeto da API em "Sistema Vendas\backend"; 
Visual Studio: Abra a solução e clique no icone de iniciar na parte superior da IDE; 
VS Code: Abra a pasta "Sistema Vendas\backend\Api_Vendas" pelo seu terminal e digite o comando "dotnet run"; 
2 - Verifique se o servidor local está rodando na porta 7121 "localhost:7121", pois o frontend faz as requisições nessa porta.

Passo 5: Instalar as dependências do frontend
1 - Abra a pasta "Sistema Vendas\frontend" pelo terminal e digite o seguinte comando "npm install", esse comando irá instalar todas as dependências via Node; 

Passo 6: Executar o frontend
1 - Abra a pasta "Sistema Vendas\frontend" pelo terminal e digite o comando "npm run dev", um link de servidor local será gerado, acesso o mesmo. 

Com esses passos realizados o sistema estará rodando!