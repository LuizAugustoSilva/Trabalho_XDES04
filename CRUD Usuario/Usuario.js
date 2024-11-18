let usuarios = []; // Lista para armazenar usuários
let editando = null; // Identificador para edição

// Função para salvar um novo usuário ou editar existente
function salvarUsuario() {
    const nome = document.getElementById('nome').value;
    const dataNascimento = document.getElementById('dataNascimento').value;
    const endereco = document.getElementById('endereco').value;
    const cpf = document.getElementById('cpf').value;
    const telefone = document.getElementById('telefone').value;
    const sexo = document.getElementById('sexo').value;
    const funcao = document.getElementById('funcao').value;
    const senha = document.getElementById('senha').value;

    if (!nome || !dataNascimento || !cpf || !telefone || !sexo || !funcao || !senha) {
        alert('Por favor, preencha todos os campos obrigatórios.');
        return;
    }

    if (editando !== null) {
        usuarios[editando] = { nome, dataNascimento, endereco, cpf, telefone, sexo, funcao, senha };
        editando = null;
    } else {
        usuarios.push({ nome, dataNascimento, endereco, cpf, telefone, sexo, funcao, senha });
    }

    document.getElementById('formUsuario').reset();
    exibirUsuarios();
}

// Função para exibir usuários na tabela
function exibirUsuarios(lista = usuarios) {
    const tabela = document.getElementById('listaUsuarios');
    tabela.innerHTML = '';

    lista.forEach((usuario, index) => {
        const row = document.createElement('tr');

        row.innerHTML = `
            <td>${usuario.nome}</td>
            <td>${usuario.dataNascimento}</td>
            <td>${usuario.endereco}</td>
            <td>${usuario.cpf}</td>
            <td>${usuario.telefone}</td>
            <td>${usuario.sexo}</td>
            <td>${usuario.funcao}</td>
            <td>
                <button class="editar" onclick="editarUsuario(${index})">Editar</button>
                <button class="remover" onclick="removerUsuario(${index})">Remover</button>
            </td>
        `;

        tabela.appendChild(row);
    });
}

// Função para editar usuário
function editarUsuario(index) {
    const usuario = usuarios[index];
    document.getElementById('nome').value = usuario.nome;
    document.getElementById('dataNascimento').value = usuario.dataNascimento;
    document.getElementById('endereco').value = usuario.endereco;
    document.getElementById('cpf').value = usuario.cpf;
    document.getElementById('telefone').value = usuario.telefone;
    document.getElementById('sexo').value = usuario.sexo;
    document.getElementById('funcao').value = usuario.funcao;
    document.getElementById('senha').value = usuario.senha;

    editando = index;
}

// Função para remover usuário
function removerUsuario(index) {
    usuarios.splice(index, 1);
    exibirUsuarios();
}

// Função para filtrar usuários
function filtrarUsuarios() {
    const nome = document.getElementById('filtroNome').value.toLowerCase();
    const cpf = document.getElementById('filtroCPF').value;

    const filtrados = usuarios.filter(usuario => {
        return (
            (!nome || usuario.nome.toLowerCase().includes(nome)) &&
            (!cpf || usuario.cpf.includes(cpf))
        );
    });

    exibirUsuarios(filtrados);
}

// Exibe os usuários iniciais ao carregar a página
exibirUsuarios();
