const { Builder, By, until } = require('selenium-webdriver');
const assert = require('assert');
const chrome = require('selenium-webdriver/chrome');
const path = require('path');

let driver;

before(async () => {
    // Inicializar o driver do Selenium
    const options = new chrome.Options();
    options.addArguments('headless');
    driver = await new Builder()
        .forBrowser('chrome')
        .setChromeOptions(options)
        .build();
    await driver.get('file://' + path.resolve(__dirname, 'procedimento.html'));
});

after(async () => {
    // Fechar o driver após os testes
    await driver.quit();
});

describe('Testes de Gestão de Procedimentos', () => {

    it('Deve adicionar um novo procedimento', async () => {
        await driver.findElement(By.id('nome')).sendKeys('Procedimento A');
        await driver.findElement(By.id('quantidadeAuxiliares')).sendKeys('3');
        await driver.findElement(By.id('equipamentos')).sendKeys('Equipamento 1');
        await driver.findElement(By.id('valorPadrao')).sendKeys('100');
        await driver.findElement(By.id('tipoSala')).sendKeys('Sala A');
        await driver.findElement(By.id('observacao')).sendKeys('Observação A');
        await driver.findElement(By.id('btnSalvar')).click();

        // Aguardar a tabela ser atualizada
        const procedimentos = await driver.findElements(By.css('#listaProcedimentos tr'));
        assert.strictEqual(procedimentos.length, 1, 'Deveria haver 1 procedimento na tabela');
    });

    it('Deve editar um procedimento existente', async () => {
        // Editar o primeiro procedimento
        await driver.findElement(By.css('.editar')).click();
        await driver.findElement(By.id('nome')).clear();
        await driver.findElement(By.id('nome')).sendKeys('Procedimento Editado');
        await driver.findElement(By.id('btnSalvar')).click();

        // Verificar se o procedimento foi editado na tabela
        const nomeProcedimento = await driver.findElement(By.css('#listaProcedimentos tr td:first-child')).getText();
        assert.strictEqual(nomeProcedimento, 'Procedimento Editado', 'O nome do procedimento não foi editado corretamente');
    });

    it('Deve remover um procedimento da lista', async () => {
        await driver.findElement(By.css('.remover')).click();

        // Aguardar a tabela ser atualizada
        const procedimentos = await driver.findElements(By.css('#listaProcedimentos tr'));
        assert.strictEqual(procedimentos.length, 0, 'A tabela deveria estar vazia após remover o procedimento');
    });

    it('Deve filtrar procedimentos por nome', async () => {
        // Adicionar um novo procedimento
        await driver.findElement(By.id('nome')).sendKeys('Procedimento Filtrado');
        await driver.findElement(By.id('quantidadeAuxiliares')).sendKeys('2');
        await driver.findElement(By.id('equipamentos')).sendKeys('Equipamento A');
        await driver.findElement(By.id('valorPadrao')).sendKeys('200');
        await driver.findElement(By.id('tipoSala')).sendKeys('Sala B');
        await driver.findElement(By.id('observacao')).sendKeys('Observação B');
        await driver.findElement(By.id('btnSalvar')).click();

        // Filtrar pelo nome
        await driver.findElement(By.id('filtroNome')).sendKeys('Filtrado');
        await driver.findElement(By.css('.filtros button')).click();

        // Verificar se o procedimento foi filtrado corretamente
        const procedimentos = await driver.findElements(By.css('#listaProcedimentos tr'));
        assert.strictEqual(procedimentos.length, 1, 'Deveria haver 1 procedimento filtrado');
    });

    it('Deve filtrar procedimentos por CPF', async () => {
        // Adicionar outro procedimento com CPF
        await driver.findElement(By.id('nome')).sendKeys('Procedimento CPF');
        await driver.findElement(By.id('quantidadeAuxiliares')).sendKeys('1');
        await driver.findElement(By.id('equipamentos')).sendKeys('Equipamento C');
        await driver.findElement(By.id('valorPadrao')).sendKeys('300');
        await driver.findElement(By.id('tipoSala')).sendKeys('Sala C');
        await driver.findElement(By.id('observacao')).sendKeys('Observação C');
        await driver.findElement(By.id('btnSalvar')).click();

        // Filtrar pelo CPF (No código original, não há CPF, então vamos adaptar para filtrar por nome)
        await driver.findElement(By.id('filtroNome')).sendKeys('CPF');
        await driver.findElement(By.css('.filtros button')).click();

        // Verificar se o procedimento foi filtrado
        const procedimentos = await driver.findElements(By.css('#listaProcedimentos tr'));
        assert.strictEqual(procedimentos.length, 1, 'Deveria haver 1 procedimento filtrado pelo nome "CPF"');
    });

});
