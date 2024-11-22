let pacientes = [];

function addPaciente() {
    const nome = document.getElementById('nome').value;
    const dataNascimento = document.getElementById('data_nascimento').value;
    const endereco = document.getElementById('endereco').value;
    const cpf = document.getElementById('cpf').value;
    const telefone = document.getElementById('telefone').value;
    const sexo = document.getElementById('sexo').value;
    const incapaz = document.getElementById('incapaz').value;
    const convenio = document.getElementById('convenio').value;
    const observacao = document.getElementById('observacao').value;

    if (!nome || !dataNascimento || !cpf || !telefone || !sexo || !incapaz || !convenio) {
        alert("Por favor, preencha todos os campos obrigatórios.");
        return;
    }

    const paciente = { nome, dataNascimento, endereco, cpf, telefone, sexo, incapaz, convenio, observacao };
    pacientes.push(paciente);
    renderPatients();
    clearForm();
}

function renderPatients() {
    const patientList = document.getElementById('patientList');
    patientList.innerHTML = '';
    
    pacientes.forEach((paciente, index) => {
        const patientCard = document.createElement('div');
        patientCard.className = 'patient-card';
        
        const formattedDate = new Date(paciente.dataNascimento).toLocaleDateString('pt-BR');
        
        patientCard.innerHTML = `
            <div class="patient-info">
                <p><i class="fas fa-user"></i> <strong>Nome:</strong> ${paciente.nome}</p>
                <p><i class="fas fa-calendar"></i> <strong>Data de Nascimento:</strong> ${formattedDate}</p>
                <p><i class="fas fa-id-card"></i> <strong>CPF:</strong> ${paciente.cpf}</p>
                <p><i class="fas fa-phone"></i> <strong>Telefone:</strong> ${paciente.telefone}</p>
                <p><i class="fas fa-venus-mars"></i> <strong>Sexo:</strong> ${paciente.sexo}</p>
                <p><i class="fas fa-hospital"></i> <strong>Convênio:</strong> ${paciente.convenio}</p>
                ${paciente.observacao ? `<p><i class="fas fa-comment"></i> <strong>Observação:</strong> ${paciente.observacao}</p>` : ''}
            </div>
            <div class="patient-actions">
                <button class="btn-edit" onclick="editPaciente(${index})">
                    <i class="fas fa-edit"></i> Editar
                </button>
                <button class="btn-remove" onclick="removePaciente(${index})">
                    <i class="fas fa-trash"></i> Remover
                </button>
            </div>
        `;
        patientList.appendChild(patientCard);
    });
}

function clearForm() {
    document.getElementById('formPaciente').reset();
}

function editPaciente(index) {
    const paciente = pacientes[index];
    document.getElementById('nome').value = paciente.nome;
    document.getElementById('data_nascimento').value = paciente.dataNascimento;
    document.getElementById('endereco').value = paciente.endereco;
    document.getElementById('cpf').value = paciente.cpf;
    document.getElementById('telefone').value = paciente.telefone;
    document.getElementById('sexo').value = paciente.sexo;
    document.getElementById('incapaz').value = paciente.incapaz;
    document.getElementById('convenio').value = paciente.convenio;
    document.getElementById('observacao').value = paciente.observacao;

    pacientes.splice(index, 1);
    renderPatients();

    // Scroll to form
    document.querySelector('.container').scrollIntoView({ behavior: 'smooth' });
}

function removePaciente(index) {
    if (confirm("Tem certeza que deseja remover este paciente?")) {
        pacientes.splice(index, 1);
        renderPatients();
    }
}

// Inicializa a lista de pacientes
renderPatients();