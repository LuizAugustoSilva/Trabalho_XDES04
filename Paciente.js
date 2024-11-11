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
        alert("Preencha todos os campos obrigatórios.");
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
        const patientItem = document.createElement('div');
        patientItem.innerHTML = `
            <p><strong>Nome:</strong> ${paciente.nome}</p>
            <p><strong>CPF:</strong> ${paciente.cpf}</p>
            <p><strong>Telefone:</strong> ${paciente.telefone}</p>
            <button onclick="editPaciente(${index})">Editar</button>
            <button onclick="removePaciente(${index})">Remover</button>
            <hr>
        `;
        patientList.appendChild(patientItem);
    });
}

function clearForm() {
    document.getElementById('nome').value = '';
    document.getElementById('data_nascimento').value = '';
    document.getElementById('endereco').value = '';
    document.getElementById('cpf').value = '';
    document.getElementById('telefone').value = '';
    document.getElementById('sexo').value = '';
    document.getElementById('incapaz').value = '';
    document.getElementById('convenio').value = '';
    document.getElementById('observacao').value = '';
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
}

function removePaciente(index) {
    if (confirm("Deseja realmente remover este paciente?")) {
        pacientes.splice(index, 1);
        renderPatients();
    }
}
