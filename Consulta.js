// Lista simulada de consultas para demonstração
let consultas = [
    { id: 1, data: '2024-11-12', horaInicio: '08:00', horaTermino: '08:30', dentista: 'Dr. João', procedimento: 'Limpeza', sala: 'Sala 1', observacao: 'Nenhuma' },
    { id: 2, data: '2024-11-13', horaInicio: '09:00', horaTermino: '09:30', dentista: 'Dr. Ana', procedimento: 'Exame', sala: 'Sala 2', observacao: 'Paciente com histórico de cárie.' }
];

// Função para exibir a lista de consultas
function exibirConsultas() {
    let listaConsultas = document.getElementById('resultadoConsultas');
    listaConsultas.innerHTML = ""; // Limpa a lista antes de repovoar

    consultas.forEach(consulta => {
        let item = document.createElement('div');
        item.classList.add('consultaItem');
        item.innerHTML = `
            <p><strong>Data:</strong> ${consulta.data} <strong>Hora:</strong> ${consulta.horaInicio} - ${consulta.horaTermino}</p>
            <p><strong>Dentista:</strong> ${consulta.dentista}</p>
            <p><strong>Procedimento:</strong> ${consulta.procedimento}</p>
            <p><strong>Sala:</strong> ${consulta.sala}</p>
            <p><strong>Observações:</strong> ${consulta.observacao}</p>
            <button class="editar" onclick="editarConsulta(${consulta.id})">Editar</button>
            <button class="remover" onclick="removerConsulta(${consulta.id})">Remover</button>
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

    // Validação dos dados
    if (!data || !horaInicio || !horaTermino || !dentista || !procedimento || !sala) {
        alert("Todos os campos obrigatórios devem ser preenchidos.");
        return;
    }

    let novaConsulta = {
        id: consultas.length + 1,
        data: data,
        horaInicio: horaInicio,
        horaTermino: horaTermino,
        dentista: dentista,
        procedimento: procedimento,
        sala: sala,
        observacao: observacao
    };

    // Adicionando a nova consulta à lista
    consultas.push(novaConsulta);

    // Exibindo novamente as consultas
    exibirConsultas();
}

// Função para editar consulta
function editarConsulta(id) {
    let consulta = consultas.find(c => c.id === id);
    if (!consulta) return;

    // Preenchendo os campos de edição (por exemplo)
    document.getElementById('data').value = consulta.data;
    document.getElementById('horaInicio').value = consulta.horaInicio;
    document.getElementById('horaTermino').value = consulta.horaTermino;
    document.getElementById('dentista').value = consulta.dentista;
    document.getElementById('procedimento').value = consulta.procedimento;
    document.getElementById('sala').value = consulta.sala;
    document.getElementById('observacao').value = consulta.observacao;

    // Alterando o botão de inserção para edição
    let form = document.getElementById('formConsulta');
    let button = form.querySelector('button');
    button.innerHTML = "Alterar Consulta";
    button.setAttribute('onclick', `alterarConsulta(${id})`);
}

// Função para alterar a consulta
function alterarConsulta(id) {
    let data = document.getElementById('data').value;
    let horaInicio = document.getElementById('horaInicio').value;
    let horaTermino = document.getElementById('horaTermino').value;
    let dentista = document.getElementById('dentista').value;
    let procedimento = document.getElementById('procedimento').value;
    let sala = document.getElementById('sala').value;
    let observacao = document.getElementById('observacao').value;

    // Atualizando a consulta na lista
    let consulta = consultas.find(c => c.id === id);
    if (consulta) {
        consulta.data = data;
        consulta.horaInicio = horaInicio;
        consulta.horaTermino = horaTermino;
        consulta.dentista = dentista;
        consulta.procedimento = procedimento;
        consulta.sala = sala;
        consulta.observacao = observacao;

        // Exibindo novamente as consultas
        exibirConsultas();
    }

    // Resetando o formulário e botão
    let form = document.getElementById('formConsulta');
    form.reset();
    form.querySelector('button').innerHTML = "Inserir Consulta";
    form.querySelector('button').setAttribute('onclick', "inserirConsulta()");
}

// Função para remover consulta
function removerConsulta(id) {
    // Removendo a consulta
    consultas = consultas.filter(c => c.id !== id);

    // Exibindo novamente as consultas
    exibirConsultas();
}

// Chama a função para exibir as consultas ao carregar a página
exibirConsultas();
