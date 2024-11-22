// Lista simulada de consultas para demonstração
let consultas = [
    { id: 1, data: '2024-11-12', horaInicio: '08:00', horaTermino: '08:30', dentista: 'Dr. João', procedimento: 'Limpeza', sala: 'Sala 1', observacao: 'Nenhuma' },
    { id: 2, data: '2024-11-13', horaInicio: '09:00', horaTermino: '09:30', dentista: 'Dr. Ana', procedimento: 'Exame', sala: 'Sala 2', observacao: 'Paciente com histórico de cárie.' }
];

// Função para formatar a data
function formatarData(data) {
    return new Date(data).toLocaleDateString('pt-BR');
}

// Função para exibir a lista de consultas
function exibirConsultas() {
    let listaConsultas = document.getElementById('resultadoConsultas');
    listaConsultas.innerHTML = "";

    consultas.forEach(consulta => {
        let item = document.createElement('div');
        item.classList.add('consultaItem');
        
        item.innerHTML = `
            <div class="consulta-info">
                <p><i class="fas fa-calendar"></i> <strong>Data:</strong> ${formatarData(consulta.data)}</p>
                <p><i class="fas fa-clock"></i> <strong>Horário:</strong> ${consulta.horaInicio} - ${consulta.horaTermino}</p>
                <p><i class="fas fa-user-md"></i> <strong>Dentista:</strong> ${consulta.dentista}</p>
                <p><i class="fas fa-tooth"></i> <strong>Procedimento:</strong> ${consulta.procedimento}</p>
                <p><i class="fas fa-door-open"></i> <strong>Sala:</strong> ${consulta.sala}</p>
                ${consulta.observacao ? `<p><i class="fas fa-comment"></i> <strong>Observações:</strong> ${consulta.observacao}</p>` : ''}
            </div>
            <div class="consulta-actions">
                <button class="editar" onclick="editarConsulta(${consulta.id})">
                    <i class="fas fa-edit"></i> Editar
                </button>
                <button class="remover" onclick="removerConsulta(${consulta.id})">
                    <i class="fas fa-trash"></i> Remover
                </button>
            </div>
        `;
        listaConsultas.appendChild(item);
    });
}

// Função para inserir nova consulta
function inserirConsulta() {
    let data = document.getElementById('data').value;
    let horaInicio = document.getElementById('horaInicio').value;
    let horaTermino = document.getElementById('horaTermino').value;
    let dentista = document.getElementById('dentista').value;
    let procedimento = document.getElementById('procedimento').value;
    let sala = document.getElementById('sala').value;
    let observacao = document.getElementById('observacao').value;

    if (!data || !horaInicio || !horaTermino || !dentista || !procedimento || !sala) {
        alert("Por favor, preencha todos os campos obrigatórios.");
        return;
    }

    let novaConsulta = {
        id: consultas.length + 1,
        data,
        horaInicio,
        horaTermino,
        dentista,
        procedimento,
        sala,
        observacao
    };

    consultas.push(novaConsulta);
    document.getElementById('formConsulta').reset();
    exibirConsultas();
}

// Função para editar consulta
function editarConsulta(id) {
    let consulta = consultas.find(c => c.id === id);
    if (!consulta) return;

    document.getElementById('data').value = consulta.data;
    document.getElementById('horaInicio').value = consulta.horaInicio;
    document.getElementById('horaTermino').value = consulta.horaTermino;
    document.getElementById('dentista').value = consulta.dentista;
    document.getElementById('procedimento').value = consulta.procedimento;
    document.getElementById('sala').value = consulta.sala;
    document.getElementById('observacao').value = consulta.observacao;

    let button = document.querySelector('.btn-primary');
    button.innerHTML = '<i class="fas fa-save"></i> Alterar Consulta';
    button.onclick = () => alterarConsulta(id);

    // Scroll suave até o formulário
    document.getElementById('formulario').scrollIntoView({ behavior: 'smooth' });
}

// Função para alterar a consulta
function alterarConsulta(id) {
    let consulta = consultas.find(c => c.id === id);
    if (!consulta) return;

    consulta.data = document.getElementById('data').value;
    consulta.horaInicio = document.getElementById('horaInicio').value;
    consulta.horaTermino = document.getElementById('horaTermino').value;
    consulta.dentista = document.getElementById('dentista').value;
    consulta.procedimento = document.getElementById('procedimento').value;
    consulta.sala = document.getElementById('sala').value;
    consulta.observacao = document.getElementById('observacao').value;

    let button = document.querySelector('.btn-primary');
    button.innerHTML = '<i class="fas fa-save"></i> Salvar Consulta';
    button.onclick = inserirConsulta;

    document.getElementById('formConsulta').reset();
    exibirConsultas();
}

// Função para remover consulta
function removerConsulta(id) {
    if (confirm("Tem certeza que deseja remover esta consulta?")) {
        consultas = consultas.filter(c => c.id !== id);
        exibirConsultas();
    }
}

// Inicializa a exibição das consultas
exibirConsultas();