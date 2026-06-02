async function buscarCEP() { 
    const cep = document.getElementById('cep').value; 
    const resposta = await fetch(`/buscar_cep/${cep}`); 
    const dados = await resposta.json(); 
    document.getElementById('logradouro').value = dados.logradouro || ''; 
    document.getElementById('bairro').value = dados.bairro || ''; 
    document.getElementById('cidade').value = dados.localidade || ''; 
    document.getElementById('estado').value = dados.uf || ''; } 
async function salvarEndereco() { 
    const dados = { cep: document.getElementById('cep').value,
         logradouro: document.getElementById('logradouro').value, 
         bairro: document.getElementById('bairro').value, 
         cidade: document.getElementById('cidade').value, 
         estado: document.getElementById('estado').value } 
const resposta = await fetch('/adicionar', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(dados) }) 
const resultado = await resposta.json() 
alert(resultado.mensagem) 
window.location.reload()}