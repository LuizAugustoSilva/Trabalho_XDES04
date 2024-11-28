// Função para filtrar consultas
function filtrarConsultas(dataInicial, dataFinal, tipoProcedimento) {
    // Verifica se a variável consultas existe
    if (typeof consultas === 'undefined') {
        console.error('A variável consultas não está definida');
        return [];
    }

    return consultas.filter(consulta => {
        const dataConsulta = new Date(consulta.data);
        const dataIni = new Date(dataInicial);
        const dataFim = new Date(dataFinal);
        
        // Ajusta as datas para ignorar o horário
        dataConsulta.setHours(0, 0, 0, 0);
        dataIni.setHours(0, 0, 0, 0);
        dataFim.setHours(0, 0, 0, 0);
        
        const dentroDoIntervalo = dataConsulta >= dataIni && dataConsulta <= dataFim;
        
        // Normaliza o tipo de procedimento para comparação
        const matchTipo = !tipoProcedimento || consulta.procedimento.toLowerCase().trim() === tipoProcedimento.toLowerCase().trim();
        
        // Depuração
        console.log('Consulta:', consulta.procedimento, 'Tipo:', tipoProcedimento, 'Match:', matchTipo);

        return dentroDoIntervalo && matchTipo;
    });
}

// Função para gerar relatório PDF
function gerarRelatorioPDF() {
    const dataInicial = document.getElementById('dataInicial').value;
    const dataFinal = document.getElementById('dataFinal').value;
    const tipoProcedimento = document.getElementById('tipoProcedimento').value;

    if (!dataInicial || !dataFinal) {
        alert('Por favor, preencha as datas inicial e final.');
        return;
    }

    const consultasFiltradas = filtrarConsultas(dataInicial, dataFinal, tipoProcedimento);
    
    if (consultasFiltradas.length === 0) {
        alert('Não foram encontradas consultas para o período selecionado.');
        return;
    }

    // Cria o documento PDF
    const doc = new jspdf.jsPDF();

    // Título do relatório
    doc.setFontSize(16);
    doc.text('Relatório de Consultas', 14, 20);

    // Informações do filtro
    doc.setFontSize(10);
    doc.text(`Período: ${formatarData(dataInicial)} a ${formatarData(dataFinal)}`, 14, 30);
    doc.text(`Tipo de Procedimento: ${tipoProcedimento || 'Todos'}`, 14, 35);

    // Tabela de consultas
    const headers = [['Data', 'Horário', 'Dentista', 'Procedimento', 'Sala']];
    const data = consultasFiltradas.map(consulta => [
        formatarData(consulta.data),
        `${consulta.horaInicio} - ${consulta.horaTermino}`,
        consulta.dentista,
        consulta.procedimento,
        consulta.sala
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
    doc.save('relatorio-consultas.pdf');
}

// Função para gerar relatório CSV
function gerarRelatorioCSV() {
    const dataInicial = document.getElementById('dataInicial').value;
    const dataFinal = document.getElementById('dataFinal').value;
    const tipoProcedimento = document.getElementById('tipoProcedimento').value;

    if (!dataInicial || !dataFinal) {
        alert('Por favor, preencha as datas inicial e final.');
        return;
    }

    const consultasFiltradas = filtrarConsultas(dataInicial, dataFinal, tipoProcedimento);

    if (consultasFiltradas.length === 0) {
        alert('Não foram encontradas consultas para o período selecionado.');
        return;
    }
    
    // Cabeçalho do CSV
    let csvContent = 'Data,Horário,Dentista,Procedimento,Sala,Observação\n';

    // Dados das consultas
    consultasFiltradas.forEach(consulta => {
        const row = [
            formatarData(consulta.data),
            `${consulta.horaInicio} - ${consulta.horaTermino}`,
            consulta.dentista,
            consulta.procedimento,
            consulta.sala,
            consulta.observacao || ''
        ].map(cell => `"${cell}"`).join(',');
        
        csvContent += row + '\n';
    });

    // Criar e baixar o arquivo CSV
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    
    link.setAttribute('href', url);
    link.setAttribute('download', 'relatorio-consultas.csv');
    link.style.visibility = 'hidden';
    
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

// Função auxiliar para formatar data
function formatarData(data) {
    return new Date(data).toLocaleDateString('pt-BR');
}