const { Builder, By, until } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');

// Função para adicionar um atraso (em milissegundos)
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

(async function test() {
    let driver = await new Builder().forBrowser('chrome').setChromeOptions(new chrome.Options()).build();

    try {
        // Acesse o arquivo HTML
        await driver.get('file:///C:/Users/User/Documents/Documentos Rodolfo/Matérias 2SEM UNIFEI/Engenharia de Software/Release 03/CRUD Procedimentos/Procedimento.html');
        
        // Pausa para ver a página carregando
        await sleep(1000); // Pausa de 1 segundo
        
        // Preenchendo o formulário
        await driver.findElement(By.id('nome')).sendKeys('Procedimento Teste');
        await sleep(500); // Pausa de 0.5 segundos
        await driver.findElement(By.id('quantidadeAuxiliares')).sendKeys('2');
        await sleep(500); // Pausa de 0.5 segundos
        await driver.findElement(By.id('equipamentos')).sendKeys('Equipamento A, Equipamento B');
        await sleep(500); // Pausa de 0.5 segundos
        await driver.findElement(By.id('valorPadrao')).sendKeys('150');
        await sleep(500); // Pausa de 0.5 segundos
        await driver.findElement(By.id('tipoSala')).sendKeys('Sala 101');
        await sleep(500); // Pausa de 0.5 segundos
        await driver.findElement(By.id('observacao')).sendKeys('Observação de teste.');

        // Clicando no botão Salvar
        await driver.findElement(By.id('btnSalvar')).click();
        
        // Pausa para ver o clique no botão "Salvar"
        await sleep(1000); // Pausa de 1 segundo

        // Aguardando a tabela ser atualizada e exibindo o novo procedimento
        await driver.wait(until.elementLocated(By.css('#listaProcedimentos tr')), 5000);

        // Verificando se o procedimento foi adicionado à tabela
        let procedimentoAdicionado = await driver.findElement(By.xpath("//td[contains(text(), 'Procedimento Teste')]")).getText();

        if (procedimentoAdicionado === 'Procedimento Teste') {
            console.log('Teste passou! Procedimento foi adicionado corretamente.');
        } else {
            console.log('Teste falhou! Procedimento não foi encontrado.');
        }

    } catch (err) {
        console.log('Erro durante o teste: ', err);
    } finally {
        // Fechar o navegador após o teste
        await driver.quit();
    }
})();
