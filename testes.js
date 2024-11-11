const { Builder, By, Key, until } = require('selenium-webdriver');
const assert = require('assert');

describe('Teste de Cadastro de Pacientes', function() {
    this.timeout(10000);

    // Inicializa o driver antes dos testes
    before(async function() {
        driver = await new Builder().forBrowser('chrome').build();
    });

    // Encerra o driver após os testes
    after(async function() {
        await driver.quit();
    });

    it('Deve adicionar um novo paciente', async function() {
        await driver.get('file:///C:/Users/Joao/Documents/Sistemas de Informacao - UNIFEI/XDES04/Trabalho_XDES04-release1/index.html');

        // Preenche os campos obrigatórios
        await driver.findElement(By.id('nome')).sendKeys('João Silva');
        await driver.findElement(By.id('data_nascimento')).sendKeys('1990-01-01');
        await driver.findElement(By.id('cpf')).sendKeys('123.456.789-00');
        await driver.findElement(By.id('telefone')).sendKeys('(11) 98765-4321');
        await driver.findElement(By.id('sexo')).sendKeys('Masculino');
        await driver.findElement(By.id('incapaz')).sendKeys('Não');
        await driver.findElement(By.id('convenio')).sendKeys('Convênio A');
        await driver.findElement(By.css('button')).click();

        // Aguarda a renderização dos pacientes
        await driver.wait(until.elementLocated(By.id('patientList')), 1000);

        const patientList = await driver.findElement(By.id('patientList')).getText();
        assert(patientList.includes('João Silva'));
    });

    it('Deve validar campo obrigatório não preenchido', async function() {
        await driver.get('file:///C:/Users/Joao/Documents/Sistemas de Informacao - UNIFEI/XDES04/Trabalho_XDES04-release1/index.html');

        // Clica em "Adicionar Paciente" sem preencher todos os campos obrigatórios
        await driver.findElement(By.css('button')).click();

        const alertText = await driver.switchTo().alert().getText();
        assert.strictEqual(alertText, 'Preencha todos os campos obrigatórios.');
        await driver.switchTo().alert().accept();
    });

    it('Deve remover um paciente da lista', async function() {
        await driver.get('file:///C:/Users/Joao/Documents/Sistemas de Informacao - UNIFEI/XDES04/Trabalho_XDES04-release1/index.html');

        // Adiciona o paciente primeiro
        await driver.findElement(By.id('nome')).sendKeys('João Silva');
        await driver.findElement(By.id('data_nascimento')).sendKeys('1990-01-01');
        await driver.findElement(By.id('cpf')).sendKeys('123.456.789-00');
        await driver.findElement(By.id('telefone')).sendKeys('(11) 98765-4321');
        await driver.findElement(By.id('sexo')).sendKeys('Masculino');
        await driver.findElement(By.id('incapaz')).sendKeys('Não');
        await driver.findElement(By.id('convenio')).sendKeys('Convênio A');
        await driver.findElement(By.css('button')).click();

        await driver.wait(until.elementLocated(By.id('patientList')), 1000);

        // Remove o paciente
        const removeButton = await driver.findElement(By.xpath("//button[text()='Remover']"));
        await removeButton.click();
        await driver.switchTo().alert().accept();

        const patientList = await driver.findElement(By.id('patientList')).getText();
        assert(!patientList.includes('João Silva'));
    });
});
