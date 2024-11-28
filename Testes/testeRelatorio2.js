const { Builder, By, until, WebDriver } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');

async function runTest() {
  let driver = await new Builder().forBrowser('chrome').setChromeOptions(new chrome.Options()).build();

  try {
    // Abrir a página HTML
    await driver.get('file:///C:/Users/User/Documents/Documentos Rodolfo/Matérias 2SEM UNIFEI/Engenharia de Software/Release 03/Relatorios/relatorio1.html');
    
    // Aumentando o tempo de espera
    await driver.wait(until.titleIs('Relatório de Pacientes'), 20000);  // 20 segundos de espera

    // Verificar o título da página diretamente
    let title = await driver.getTitle();
    console.log('Título da página:', title); // Verifica o título real da página

    // Verificar se o título é o esperado
    if (title !== 'Relatório de Pacientes') {
      console.error('O título da página está incorreto. Esperado: "Relatório de Pacientes", mas foi: ' + title);
      return; // Encerra o teste se o título não for o esperado
    }

    // Localizar os elementos do formulário
    let dataInicialInput = await driver.findElement(By.id('dataInicial'));
    let dataFinalInput = await driver.findElement(By.id('dataFinal'));
    let tipoConvenioSelect = await driver.findElement(By.id('possuiConvenio'));

    // Limpar e preencher o formulário com uma faixa de datas
    await dataInicialInput.clear();
    await dataFinalInput.clear();

    await dataInicialInput.sendKeys('01-01-2024');
    await dataFinalInput.sendKeys('31-12-2024');
    await tipoConvenioSelect.sendKeys('Sim');

    // Verificar se os campos foram preenchidos corretamente
    let dataInicialValue = await dataInicialInput.getAttribute('value');
    let dataFinalValue = await dataFinalInput.getAttribute('value');
    let tipoConvenioValue = await tipoConvenioSelect.getAttribute('value');

    console.log('Data Inicial:', dataInicialValue);
    console.log('Data Final:', dataFinalValue);
    console.log('Convenio:', tipoConvenioValue);

    // Clicar no botão "Gerar PDF" para essa faixa de datas
    let gerarPdfButton = await driver.findElement(By.className('btn-pdf'));
    await gerarPdfButton.click();
    console.log('Botão "Gerar PDF" clicado.');

    // Aguardar para simular a geração do PDF
    await driver.sleep(3000);

    // Tratar o alerta
    try {
      // Esperar até que o alerta apareça
      await driver.wait(until.alertIsPresent(), 5000);
      let alert = await driver.switchTo().alert();
      console.log('Alerta encontrado:', await alert.getText());

      // Fechar o alerta
      await alert.accept();
      console.log('Alerta fechado.');
    } catch (alertError) {
      console.log('Nenhum alerta encontrado ou erro ao fechar alerta:', alertError);
    }

  } catch (err) {
    console.error('Erro durante o teste:', err);
  } finally {
    // Fechar o navegador
    await driver.quit();
  }
}

runTest();
