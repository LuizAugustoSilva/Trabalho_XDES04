const { Builder, By, until } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');

async function runTest() {
  let driver = await new Builder().forBrowser('chrome').setChromeOptions(new chrome.Options()).build();

  try {
    // Abrir a página HTML do relatório de pacientes
    await driver.get('file:///C:/Users/User/Documents/Documentos Rodolfo/Matérias 2SEM UNIFEI/Engenharia de Software/Release 03/Relatorios/relatorio1.html');
    
    // Aguardar até que o título da página seja carregado
    await driver.wait(until.titleIs('Relatório de Pacientes'), 5000);
    console.log('Título da página:', await driver.getTitle());
    
    // Verificar se os campos de data estão visíveis
    let dataInicial = await driver.findElement(By.id('dataInicial'));
    let dataFinal = await driver.findElement(By.id('dataFinal'));
    let possuiConvenio = await driver.findElement(By.id('possuiConvenio'));

    await driver.wait(until.elementIsVisible(dataInicial), 5000);
    await driver.wait(until.elementIsVisible(dataFinal), 5000);
    await driver.wait(until.elementIsVisible(possuiConvenio), 5000);

    console.log('Campos de data e convênio estão visíveis.');
    
    // Preencher o formulário
    await dataInicial.sendKeys('01-01-2023');
    await dataFinal.sendKeys('31-12-2024');
    await possuiConvenio.sendKeys('sim');
    console.log('Campos preenchidos.');
    
    // Verificar se o valor preenchido nos campos está correto
    let dataInicialValue = await dataInicial.getAttribute('value');
    let dataFinalValue = await dataFinal.getAttribute('value');
    let possuiConvenioValue = await possuiConvenio.getAttribute('value');
    
    console.log(`Data Inicial: ${dataInicialValue}`);
    console.log(`Data Final: ${dataFinalValue}`);
    console.log(`Possui Convênio: ${possuiConvenioValue}`);
    
    // Clicar no botão "Gerar PDF"
    let btnPdf = await driver.findElement(By.className('btn-pdf'));
    await btnPdf.click();
    console.log('Botão "Gerar PDF" clicado.');
    
    // Aguardar um tempo para simular a geração do PDF
    await driver.sleep(3000);
    
    // Verificar se o botão "Gerar PDF" está clicado (verificando a classe)
    let btnPdfClass = await btnPdf.getAttribute('class');
    console.log('Classe do botão após clique:', btnPdfClass);
    
    // Testar também o botão "Gerar CSV"
    let btnCsv = await driver.findElement(By.className('btn-csv'));
    await btnCsv.click();
    console.log('Botão "Gerar CSV" clicado.');

  } catch (err) {
    console.error('Erro durante o teste:', err);
  } finally {
    // Fechar o navegador
    await driver.quit();
  }
}

runTest();
