const { Builder, By, until } = require('selenium-webdriver');
const assert = require('assert');

describe('Testes de Gestão de Pacientes', function () {
    let driver;

    this.timeout(30000); // Aumenta o tempo limite para evitar erros de timeout

    before(async () => {
        driver = await new Builder().forBrowser('chrome').build();
        await driver.get('file:///C:/Users/Joao/Documents/Sistemas de Informacao - UNIFEI/XDES04/Trabalho_XDES04/CRUD Paciente/Paciente.html');
    });

    after(async () => {
        await driver.quit();
    });

    it('Deve adicionar um novo paciente', async () => {
        await driver.wait(until.elementLocated(By.id('nome')), 5000);
        await driver.findElement(By.id('nome')).sendKeys('João Silva');
        await driver.findElement(By.id('data_nascimento')).sendKeys('2000-01-01');
        await driver.findElement(By.id('cpf')).sendKeys('123.456.789-00');
        await driver.findElement(By.id('telefone')).sendKeys('(11) 98765-4321');
        await driver.findElement(By.id('sexo')).sendKeys('Masculino');
        await driver.findElement(By.id('incapaz')).sendKeys('Não');
        await driver.findElement(By.id('convenio')).sendKeys('Convênio A');
        await driver.findElement(By.css('.btn-primary')).click();

        // Espera a lista de pacientes ser atualizada
        const patientCard = await driver.wait(until.elementLocated(By.css('.patient-card')), 5000);
        const patientName = await patientCard.findElement(By.css('.patient-info p:nth-child(1)')).getText();

        assert(patientName.includes('João Silva'), 'Paciente não foi adicionado corretamente');
    });

    it('Deve validar campos obrigatórios não preenchidos', async () => {
        await driver.findElement(By.id('nome')).clear(); // Limpa o campo nome
        await driver.findElement(By.id('data_nascimento')).clear(); // Limpa o campo data de nascimento
        await driver.findElement(By.css('.btn-primary')).click();

        const alert = await driver.wait(until.alertIsPresent(), 5000);
        const alertText = await alert.getText();
        await alert.accept();

        assert.strictEqual(alertText, 'Por favor, preencha todos os campos obrigatórios.', 'Validação de campos obrigatórios falhou');
    });

    it('Deve editar um paciente existente', async () => {
        const editButton = await driver.wait(until.elementLocated(By.css('.btn-edit')), 5000);
        await editButton.click();

        const nomeInput = await driver.wait(until.elementLocated(By.id('nome')), 5000);
        await nomeInput.clear();
        await nomeInput.sendKeys('João Silva Editado');

        await driver.findElement(By.css('.btn-primary')).click();

        // Verifica se o nome foi atualizado na lista
        const updatedPatient = await driver.wait(until.elementLocated(By.css('.patient-card')), 5000);
        const updatedName = await updatedPatient.findElement(By.css('.patient-info p:nth-child(1)')).getText();

        assert(updatedName.includes('João Silva Editado'), 'Paciente não foi editado corretamente');
    });

    it('Deve remover um paciente da lista', async () => {
        const removeButton = await driver.wait(until.elementLocated(By.css('.btn-remove')), 5000);
        await removeButton.click();

        // Confirma a remoção
        const alert = await driver.wait(until.alertIsPresent(), 5000);
        await alert.accept();

        // Verifica se a lista está vazia
        const patientList = await driver.findElement(By.id('patientList')).getText();
        assert.strictEqual(patientList.trim(), '', 'Paciente não foi removido corretamente');
    });
});
