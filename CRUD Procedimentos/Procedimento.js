let procedimentos = []; // Lista de procedimentos
let editando = null; // Identificador para edição

// Função para salvar um novo procedimento ou editar existente
function salvarProcedimento() {
    const nome = document.getElementById('nome').value;
    const quantidadeAuxiliares = document.getElementById('quantidadeAuxiliares').value;
    const equipamentos = document.getElementById('equipamentos').value;
    const valorPadrao = document.getElementById('valorPadrao').value;
    const tipoSala = document.getElementById('tipoSala').value;
    const observacao = document.getElementById('observacao').value;

    if (!nome || !quantidadeAuxiliares || !valorPadrao || !tipoSala) {
        alert('Por favor, preencha todos os campos obrigatórios.');
        return;
    }

    if (editando !== null) {
        procedimentos[editando] = { nome, quantidadeAuxiliares, equipamentos, valorPadrao, tipoSala, observacao };
        editando = null;
    } else {
        procedimentos.push({ nome, quantidadeAuxiliares, equipamentos, valorPadrao, tipoSala, observacao });
    }

    document.getElementById('formProcedimento').reset();
    exibirProcedimentos();
}

// Função para exibir os procedimentos na tabela
function exibirProcedimentos(lista = procedimentos) {
    const tabela = document.getElementById('listaProcedimentos');
    tabela.innerHTML = '';

    lista.forEach((procedimento, index) => {
        const row = document.createElement('tr');

        row.innerHTML = `
            <td>${procedimento.nome}</td>
            <td>${procedimento.quantidadeAuxiliares}</td>
            <td>${procedimento.equipamentos}</td>
            <td>${procedimento.valorPadrao}</td>
            <td>${procedimento.tipoSala}</td>
            <td>${procedimento.observacao}</td>
            <td>
                <button class="editar" onclick="editarProcedimento(${index})">Editar</button>
                <button class="remover" onclick="removerProcedimento(${index})">Remover</button>
            </td>
        `;

        tabela.appendChild(row);
    });
}

// Função para editar procedimento
function editarProcedimento(index) {
    const procedimento = procedimentos[index];
    document.getElementById('nome').value = procedimento.nome;
    document.getElementById('quantidadeAuxiliares').value = procedimento.quantidadeAuxiliares;
    document.getElementById('equipamentos').value = procedimento.equipamentos;
    document.getElementById('valorPadrao').value = procedimento.valorPadrao;
    document.getElementById('tipoSala').value = procedimento.tipoSala;
    document.getElementById('observacao').value = procedimento.observacao;

    editando = index;
}

// Função para remover procedimento
function removerProcedimento(index) {
    procedimentos.splice(index, 1);
    exibirProcedimentos();
}

// Função para filtrar procedimentos
function filtrarProcedimentos() {
    const nome = document.getElementById('filtroNome').value.toLowerCase();

    const filtrados = procedimentos.filter(procedimento =>
        !nome || procedimento.nome.toLowerCase().includes(nome)
    );

    exibirProcedimentos(filtrados);
}

// Exibe os procedimentos iniciais ao carregar a página
exibirProcedimentos();
