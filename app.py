from flask import Flask, render_template, request, jsonify 
from flask_sqlalchemy import SQLAlchemy 
import requests 

app = Flask(__name__) 

app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///database.db' 
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)
class Endereco(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    cep = db.Column(db.String(10))
    logradouro = db.Column(db.String(100))
    bairro = db.Column(db.String(100))
    cidade = db.Column(db.String(100))
    estado = db.Column(db.String(10))

with app.app_context(): 
    db.create_all()

@app.route('/') 
def index(): 
    enderecos = Endereco.query.all() 
    return render_template('index.html', enderecos=enderecos)

@app.route('/buscar_cep/<cep>') 
def buscar_cep(cep): 
    url = f'https://viacep.com.br/ws/{cep}/json/' 
    resposta = requests.get(url) 
    dados = resposta.json() 
    return jsonify(dados)
@app.route('/adicionar', methods=['POST']) 
def adicionar(): 
    dados = request.json 
    novo = Endereco( 
        cep=dados['cep'], 
        logradouro=dados['logradouro'], 
        bairro=dados['bairro'], 
        cidade=dados['cidade'], 
        estado=dados['estado'] 
    )

    db.session.add(novo) 
    db.session.commit() 

    return jsonify({'mensagem': 'Endereço adicionado com sucesso'})

@app.route('/editar/<int:id>', methods=['PUT']) 
def editar(id): 
    endereco = Endereco.query.get(id)
    if not endereco: 
        return jsonify({'erro': 'Endereço não encontrado'}) 
    dados = request.json 
    endereco.cep = dados['cep'] 
    endereco.logradouro = dados['logradouro'] 
    endereco.bairro = dados['bairro'] 
    endereco.cidade = dados['cidade'] 
    endereco.estado = dados['estado'] 
    db.session.commit() 
    return jsonify({'mensagem': 'Endereço atualizado'})

@app.route('/deletar/<int:id>', methods=['DELETE']) 
def deletar(id): 
    endereco = Endereco.query.get(id) 
    if not endereco: 
        return jsonify({'erro': 'Endereço não encontrado'}) 
    db.session.delete(endereco) 
    db.session.commit() 
    return jsonify({'mensagem': 'Endereço removido'})

if __name__ == '__main__': 
    app.run(debug=True)