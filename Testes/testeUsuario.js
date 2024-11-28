const { Builder, By, until } = require('selenium-webdriver');

// Função para adicionar um atraso (em milissegundos)
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function executarTestes() {
    let driver = await new Builder().forBrowser('chrome').build();
    
    try {
        // Acesse a página do formulário
        await driver.get('file:///C:/Users/User/Documents/Documentos Rodolfo/Matérias 2SEM UNIFEI/Engenharia de Software/Release 03/CRUD Usuario/Usuario.html'); // Substitua pelo caminho completo do arquivo HTML
        
        // Teste: Preenchimento e salvamento do formulário
        await driver.findElement(By.id('nome')).sendKeys('João da Silva');
        await sleep(500); // Pausa de 0.5 segundos
        await driver.findElement(By.id('dataNascimento')).sendKeys('1990-05-15');
        await sleep(500); // Pausa de 0.5 segundos
        await driver.findElement(By.id('endereco')).sendKeys('Rua Exemplo, 123');
        await sleep(500); // Pausa de 0.5 segundos
        await driver.findElement(By.id('cpf')).sendKeys('123.456.789-00');
        await sleep(500); // Pausa de 0.5 segundos
        await driver.findElement(By.id('telefone')).sendKeys('(11) 98765-4321');
        await sleep(500); // Pausa de 0.5 segundos
        await driver.findElement(By.id('sexo')).sendKeys('Masculino');
        await sleep(500); // Pausa de 0.5 segundos
        await driver.findElement(By.id('funcao')).sendKeys('Administrador(a)');
        await sleep(500); // Pausa de 0.5 segundos
        await driver.findElement(By.id('senha')).sendKeys('senha123');
        await sleep(500); // Pausa de 0.5 segundos
        await driver.findElement(By.id('btnSalvar')).click();
        await sleep(1000); // Pausa de 1 segundo para observar o clique

        // Aguarde o usuário ser adicionado à tabela
        await driver.wait(until.elementLocated(By.xpath("//td[contains(text(),'João da Silva')]")), 5000);
        console.log('Teste 1: Salvamento do formulário - PASSOU');

        // Teste: Edição de um usuário
        await driver.findElement(By.xpath("//button[contains(text(),'Editar')]")).click();
        await sleep(500); // Pausa de 0.5 segundos
        let nomeField = await driver.findElement(By.id('nome'));
        await nomeField.clear();
        await sleep(500); // Pausa de 0.5 segundos
        await nomeField.sendKeys('João Editado');
        await sleep(500); // Pausa de 0.5 segundos
        await driver.findElement(By.id('btnSalvar')).click();
        await sleep(1000); // Pausa de 1 segundo para observar o clique

        // Aguarde o nome ser atualizado na tabela
        await driver.wait(until.elementLocated(By.xpath("//td[contains(text(),'João Editado')]")), 5000);
        console.log('Teste 2: Edição de usuário - PASSOU');

        // Teste: Remoção de um usuário
        await driver.findElement(By.xpath("//button[contains(text(),'Remover')]")).click();
        await sleep(1000); // Pausa de 1 segundo após o clique no botão Remover

        // Verifique se o usuário foi removido
        let tabela = await driver.findElement(By.id('listaUsuarios')).getText();
        await sleep(500); // Pausa de 0.5 segundos antes de verificar o texto
        if (!tabela.includes('João Editado')) {
            console.log('Teste 3: Remoção de usuário - PASSOU');
        } else {
            console.log('Teste 3: Remoção de usuário - FALHOU');
        }

        // Teste: Filtro por nome
        await driver.findElement(By.id('nome')).sendKeys('Maria Silva');
        await sleep(500); // Pausa de 0.5 segundos
        await driver.findElement(By.id('filtroNome')).sendKeys('Maria');
        await sleep(500); // Pausa de 0.5 segundos
        await driver.findElement(By.xpath("//button[contains(text(),'Filtrar')]")).click();
        await sleep(1000); // Pausa de 1 segundo após o clique no botão Filtrar

        // Aguarde o filtro aplicar
        await driver.wait(until.elementLocated(By.xpath("//td[contains(text(),'Maria Silva')]")), 5000);
        console.log('Teste 4: Filtro por nome - PASSOU');
    } finally {
        // Fecha o navegador
        await driver.quit();
    }
}

executarTestes();
