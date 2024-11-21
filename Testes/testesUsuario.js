const { Builder, By, until } = require('selenium-webdriver');
const assert = require('assert');

describe('Testes de Gestão de Usuários', function () {
    let driver;

    this.timeout(30000); // Aumenta o tempo limite para evitar erros de timeout

    before(async () => {
        driver = await new Builder().forBrowser('chrome').build();
        await driver.get('file:///C:/Users/Joao/Documents/Sistemas de Informacao - UNIFEI/XDES04/Trabalho_XDES04/CRUD Usuario/Usuario.html');
    });

    after(async () => {
        await driver.quit();
    });

    it('Deve adicionar um novo usuário', async () => {
        await driver.wait(until.elementLocated(By.id('nome')), 5000);
        await driver.findElement(By.id('nome')).sendKeys('Maria Oliveira');
        await driver.findElement(By.id('dataNascimento')).sendKeys('1995-05-15');
        await driver.findElement(By.id('endereco')).sendKeys('Rua Exemplo, 123');
        await driver.findElement(By.id('cpf')).sendKeys('987.654.321-00');
        await driver.findElement(By.id('telefone')).sendKeys('(21) 98765-4321');
        await driver.findElement(By.id('sexo')).sendKeys('Feminino');
        await driver.findElement(By.id('funcao')).sendKeys('Secretário(a)');
        await driver.findElement(By.id('senha')).sendKeys('senha123');
        await driver.findElement(By.id('btnSalvar')).click();

        // Espera a lista de usuários ser atualizada
        const userRow = await driver.wait(until.elementLocated(By.css('#listaUsuarios tr')), 5000);
        const userName = await userRow.findElement(By.xpath('./td[1]')).getText();

        assert(userName.includes('Maria Oliveira'), 'Usuário não foi adicionado corretamente');
    });

    it('Deve validar campos obrigatórios não preenchidos', async () => {
        await driver.findElement(By.id('nome')).clear(); // Limpa o campo nome
        await driver.findElement(By.id('dataNascimento')).clear(); // Limpa o campo data de nascimento
        await driver.findElement(By.id('btnSalvar')).click();

        const alert = await driver.wait(until.alertIsPresent(), 5000);
        const alertText = await alert.getText();
        await alert.accept();

        assert.strictEqual(alertText, 'Por favor, preencha todos os campos obrigatórios.', 'Validação de campos obrigatórios falhou');
    });

    it('Deve editar um usuário existente', async () => {
        const editButton = await driver.wait(until.elementLocated(By.css('.editar')), 5000);
        await editButton.click();

        const nomeInput = await driver.wait(until.elementLocated(By.id('nome')), 5000);
        await nomeInput.clear();
        await nomeInput.sendKeys('Maria Oliveira Editada');

        await driver.findElement(By.id('btnSalvar')).click();

        // Verifica se o nome foi atualizado na lista
        const updatedUserRow = await driver.wait(until.elementLocated(By.css('#listaUsuarios tr')), 5000);
        const updatedName = await updatedUserRow.findElement(By.xpath('./td[1]')).getText();

        assert(updatedName.includes('Maria Oliveira Editada'), 'Usuário não foi editado corretamente');
    });

    it('Deve remover um usuário da lista', async () => {
        const removeButton = await driver.wait(until.elementLocated(By.css('.remover')), 5000);
        await removeButton.click();

        // Confirma a remoção
        const alert = await driver.wait(until.alertIsPresent(), 5000);
        await alert.accept();

        // Verifica se a lista está vazia
        const userList = await driver.findElement(By.id('listaUsuarios')).getText();
        assert.strictEqual(userList.trim(), '', 'Usuário não foi removido corretamente');
    });

    it('Deve filtrar usuários por nome', async () => {
        const filtroNome = await driver.findElement(By.id('filtroNome'));
        await filtroNome.sendKeys('Maria');

        const filteredRows = await driver.findElements(By.css('#listaUsuarios tr'));
        assert(filteredRows.length > 0, 'Nenhum usuário foi filtrado por nome');
    });

    it('Deve filtrar usuários por CPF', async () => {
        const filtroCPF = await driver.findElement(By.id('filtroCPF'));
        await filtroCPF.sendKeys('987.654.321-00');

        const filteredRows = await driver.findElements(By.css('#listaUsuarios tr'));
        assert(filteredRows.length > 0, 'Nenhum usuário foi filtrado por CPF');
    });
});
