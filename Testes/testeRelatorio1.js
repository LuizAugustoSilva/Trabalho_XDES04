const { Builder, By, until, WebDriver } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');

async function runTest() {
  let driver = await new Builder().forBrowser('chrome').setChromeOptions(new chrome.Options()).build();

  try {
    // Abrir a página HTML
    await driver.get('file:///C:/Users/User/Documents/Documentos Rodolfo/Matérias 2SEM UNIFEI/Engenharia de Software/Release 03/Relatorios/relatorio.html');
    
    // Esperar que o título da página seja carregado
    await driver.wait(until.titleIs('Relatórios - Sistema Odontológico'), 10000);

    // Verificar se o título da página está correto
    let title = await driver.getTitle();
    console.log('Título da página:', title);

    // Localizar os elementos do formulário
    let dataInicialInput = await driver.findElement(By.id('dataInicial'));
    let dataFinalInput = await driver.findElement(By.id('dataFinal'));
    let tipoProcedimentoSelect = await driver.findElement(By.id('tipoProcedimento'));

    // Limpar e preencher o formulário com a primeira faixa de datas (11/11/2024 - 13/11/2024)
    await dataInicialInput.clear();
    await dataFinalInput.clear();

    await dataInicialInput.sendKeys('11-11-2024');
    await dataFinalInput.sendKeys('13-11-2024');
    await tipoProcedimentoSelect.sendKeys('todos');

    // Verificar se os campos foram preenchidos corretamente
    let dataInicialValue = await dataInicialInput.getAttribute('value');
    let dataFinalValue = await dataFinalInput.getAttribute('value');
    let tipoProcedimentoValue = await tipoProcedimentoSelect.getAttribute('value');

    console.log('Primeira data Inicial:', dataInicialValue);
    console.log('Primeira data Final:', dataFinalValue);
    console.log('Primeiro Tipo de Procedimento:', tipoProcedimentoValue);

    // Clicar no botão "Gerar PDF" para essa faixa de datas
    let gerarPdfButton = await driver.findElement(By.className('btn-pdf'));
    await gerarPdfButton.click();
    console.log('Botão "Gerar PDF" clicado para a primeira faixa de datas.');

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

    // Agora, preencher com uma nova faixa de datas (caso precise testar outra faixa)
    await dataInicialInput.clear();
    await dataFinalInput.clear();

    await dataInicialInput.sendKeys('11-11-2024');
    await dataFinalInput.sendKeys('13-11-2024');
    await tipoProcedimentoSelect.sendKeys('limpeza');

    // Verificar se os campos foram preenchidos corretamente para a nova faixa
    dataInicialValue = await dataInicialInput.getAttribute('value');
    dataFinalValue = await dataFinalInput.getAttribute('value');
    tipoProcedimentoValue = await tipoProcedimentoSelect.getAttribute('value');

    console.log('Segunda data Inicial:', dataInicialValue);
    console.log('Segunda data Final:', dataFinalValue);
    console.log('Segundo Tipo de Procedimento:', tipoProcedimentoValue);

    // Clicar no botão "Gerar PDF" para essa segunda faixa de datas
    await gerarPdfButton.click();
    console.log('Botão "Gerar PDF" clicado para a segunda faixa de datas.');

    // Aguardar antes de finalizar o teste
    await driver.sleep(3000);

  } catch (err) {
    console.error('Erro durante o teste:', err);
  } finally {
    // Fechar o navegador
    await driver.quit();
  }
}

runTest();
