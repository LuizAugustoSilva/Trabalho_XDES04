// Exemplo de dados fictícios (em produção, substitua pela obtenção dinâmica dos dados)
const pacientes = [
    { nome: 'João Silva', dataCadastro: '2024-01-10', convenio: 'Sim', telefone: '(11) 1234-5678' },
    { nome: 'Maria Oliveira', dataCadastro: '2024-02-15', convenio: 'Não', telefone: '(21) 9876-5432' },
    { nome: 'Carlos Santos', dataCadastro: '2024-03-20', convenio: 'Sim', telefone: '(31) 4567-8910' }
];

// Função para filtrar pacientes
function filtrarPacientes(dataInicial, dataFinal, possuiConvenio) {
    return pacientes.filter(paciente => {
        const dataCadastro = new Date(paciente.dataCadastro);
        const dataIni = new Date(dataInicial);
        const dataFim = new Date(dataFinal);

        // Ajusta as datas para ignorar o horário
        dataCadastro.setHours(0, 0, 0, 0);
        dataIni.setHours(0, 0, 0, 0);
        dataFim.setHours(0, 0, 0, 0);

        const dentroDoIntervalo = dataCadastro >= dataIni && dataCadastro <= dataFim;
        const matchConvenio = !possuiConvenio || paciente.convenio.toLowerCase() === possuiConvenio.toLowerCase();

        return dentroDoIntervalo && matchConvenio;
    });
}

// Função para gerar relatório PDF
function gerarRelatorioPDF() {
    const dataInicial = document.getElementById('dataInicial').value;
    const dataFinal = document.getElementById('dataFinal').value;
    const possuiConvenio = document.getElementById('possuiConvenio').value;

    if (!dataInicial || !dataFinal) {
        alert('Por favor, preencha as datas inicial e final.');
        return;
    }

    const pacientesFiltrados = filtrarPacientes(dataInicial, dataFinal, possuiConvenio);

    if (pacientesFiltrados.length === 0) {
        alert('Não foram encontrados pacientes para o período selecionado.');
        return;
    }

    // Cria o documento PDF
    const doc = new jspdf.jsPDF();

    // Título do relatório
    doc.setFontSize(16);
    doc.text('Relatório de Pacientes', 14, 20);

    // Informações do filtro
    doc.setFontSize(10);
    doc.text(`Período: ${formatarData(dataInicial)} a ${formatarData(dataFinal)}`, 14, 30);
    doc.text(`Convênio: ${possuiConvenio || 'Todos'}`, 14, 35);

    // Tabela de pacientes
    const headers = [['Nome', 'Data de Cadastro', 'Convênio', 'Telefone']];
    const data = pacientesFiltrados.map(paciente => [
        paciente.nome,
        formatarData(paciente.dataCadastro),
        paciente.convenio,
        paciente.telefone
    ]);

    doc.autoTable({
        head: headers,
        body: data,
        startY: 40,
        theme: 'grid',
        styles: { fontSize: 8 },
        headStyles: { fillColor: [52, 73, 94] }
    });

    // Salvar o PDF
    doc.save('relatorio-pacientes.pdf');
}

// Função para gerar relatório CSV
function gerarRelatorioCSV() {
    const dataInicial = document.getElementById('dataInicial').value;
    const dataFinal = document.getElementById('dataFinal').value;
    const possuiConvenio = document.getElementById('possuiConvenio').value;

    if (!dataInicial || !dataFinal) {
        alert('Por favor, preencha as datas inicial e final.');
        return;
    }

    const pacientesFiltrados = filtrarPacientes(dataInicial, dataFinal, possuiConvenio);

    if (pacientesFiltrados.length === 0) {
        alert('Não foram encontrados pacientes para o período selecionado.');
        return;
    }

    // Cabeçalho do CSV
    let csvContent = 'Nome,Data de Cadastro,Convênio,Telefone\n';

    // Dados dos pacientes
    pacientesFiltrados.forEach(paciente => {
        const row = [
            paciente.nome,
            formatarData(paciente.dataCadastro),
            paciente.convenio,
            paciente.telefone
        ].map(cell => `"${cell}"`).join(',');

        csvContent += row + '\n';
    });

    // Criar e baixar o arquivo CSV
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);

    link.setAttribute('href', url);
    link.setAttribute('download', 'relatorio-pacientes.csv');
    link.style.visibility = 'hidden';

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

// Função auxiliar para formatar data
function formatarData(data) {
    return new Date(data).toLocaleDateString('pt-BR');
}
