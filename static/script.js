async function buscarCEP() {
    const cep = document.getElementById('cep').value;

    const resposta = await fetch(`/buscar_cep/${cep}`);
    const dados = await resposta.json();

    document.getElementById('logradouro').value = dados.logradouro || '';
    document.getElementById('bairro').value = dados.bairro || '';
    document.getElementById('cidade').value = dados.localidade || '';
    document.getElementById('estado').value = dados.uf || '';
}

function preencherEdicao(id, cep, logradouro, bairro, cidade, estado) {
    document.getElementById('cep').value = cep;
    document.getElementById('logradouro').value = logradouro;
    document.getElementById('bairro').value = bairro;
    document.getElementById('cidade').value = cidade;
    document.getElementById('estado').value = estado;

    document.getElementById('salvarBtn').setAttribute('data-id', id);
}

async function salvarEndereco() {
    const id = document.getElementById('salvarBtn').getAttribute('data-id');

    const dados = {
        cep: document.getElementById('cep').value,
        logradouro: document.getElementById('logradouro').value,
        bairro: document.getElementById('bairro').value,
        cidade: document.getElementById('cidade').value,
        estado: document.getElementById('estado').value
    };

    let url = '/adicionar';
    let metodo = 'POST';

    if (id) {
        url = `/editar/${id}`;
        metodo = 'PUT';
    }

    const resposta = await fetch(url, {
        method: metodo,
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(dados)
    });

    const resultado = await resposta.json();

    alert(resultado.mensagem || resultado.erro);

    window.location.reload();
}

async function deletarEndereco(id) {
    if (!confirm('Deseja realmente excluir este endereço?')) {
        return;
    }

    const resposta = await fetch(`/deletar/${id}`, {
        method: 'DELETE'
    });

    const resultado = await resposta.json();

    alert(resultado.mensagem || resultado.erro);

    window.location.reload();
}