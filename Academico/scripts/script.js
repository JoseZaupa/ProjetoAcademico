var tbody = document.querySelector('table tbody');
var aluno = {};
function Cadastrar(){
    var _nome = document.querySelector('#nome').value;
    var _sobrenome = document.querySelector('#sobrenome').value;
    var _telefone = document.querySelector('#telefone').value;
    var _ra = document.querySelector('#ra').value;
    
    
    aluno.nome = document.querySelector('#nome').value;
    aluno.sobrenome = document.querySelector('#sobrenome').value;
    aluno.telefone = document.querySelector('#telefone').value;
    aluno.ra = document.querySelector('#ra').value;
    
    if(aluno.id === undefined || aluno.id === 0){
        salvarEstudantes('POST', 0, aluno);
    }else{
        salvarEstudantes('PUT', aluno.id, aluno);
    }
    carregaEstudantes();
    $('#myModal').modal('hide')
}

function Cancelar(){
    var btnSalvar = document.querySelector('#btnSalvar');
    var titulo = document.querySelector('#tituloModal');
    document.querySelector('#nome').value = '';
    document.querySelector('#sobrenome').value = '';
    document.querySelector('#telefone').value = '';
    document.querySelector('#ra').value = '';
    btnSalvar.textContent = 'Cadastrar';
    titulo.textContent = 'Cadastrar Aluno';
    aluno = {};
    $('#myModal').modal('hide')
}

function NovoAluno() {
    var btnSalvar = document.querySelector('#btnSalvar');
    var titulo = document.querySelector('#tituloModal');
    document.querySelector('#nome').value = '';
    document.querySelector('#sobrenome').value = '';
    document.querySelector('#telefone').value = '';
    document.querySelector('#ra').value = '';
    btnSalvar.textContent = 'Cadastrar';
    titulo.textContent = 'Cadastrar Aluno';
    aluno = {};
    $('#myModal').modal('show')
}
function carregaEstudantes(){
    tbody.innerHTML = '';
    var xhr = new XMLHttpRequest();
    
    xhr.open(`GET`, `https://localhost:44326/api/Aluno/Recuperar`, true);
    xhr.setRequestHeader('Authorization', sessionStorage.getItem('token')); 
    
    xhr.onerror = function() {
        console.log('ERRO', xhr.readyState);
    }
    
    xhr.onreadystatechange = function(){
        if(this.readyState == 4){
            if(this.status == 200){
                var estudantes = JSON.parse(this.responseText);
                for(var indice in estudantes){
                    adicionaLinha(estudantes[indice]);
                } 
            }
            else if(this.status == 500){
                var erro = JSON.parse(this.responseText)
                console.log(erro.Message);
                console.log(erro.ExceptionMessage);
            }    
        }
        
    }
    
    xhr.send();
    
    
}
function salvarEstudantes(metodo, id, corpo){
    var xhr = new XMLHttpRequest();
    
    if(id === undefined || id === 0)
    id = '';
    
    xhr.open(metodo, `https://localhost:44326/api/Aluno/${id}`, false);
    
    if(corpo !== undefined)
    {
        xhr.setRequestHeader('content-type', 'application/json');
        xhr.send(JSON.stringify(corpo));
    }
    else
    {
        xhr.send();
    }
    
}
carregaEstudantes();

function editarEstudante(estudante){
    
    var btnSalvar = document.querySelector('#btnSalvar');
    var titulo = document.querySelector('#tituloModal');
    document.querySelector('#nome').value = estudante.nome;
    document.querySelector('#sobrenome').value = estudante.sobrenome;
    document.querySelector('#telefone').value = estudante.telefone;
    document.querySelector('#ra').value = estudante.ra;  
    
    btnSalvar.textContent = 'Salvar';
    btnCancelar.textContent = 'Cancelar';
    titulo.textContent = `Editar Aluno ${estudante.nome}`;
    
    aluno = estudante;
    
    console.log(estudante)
}
function excluirEstudante(id){
    var xhr = new XMLHttpRequest();
    xhr.open(`DELETE`, `https://localhost:44326/api/Aluno/${id}`, false);
    xhr.send();
    
}
function excluir(estudante){
    bootbox.confirm({
        message: `Tem certeza que deseja deletar o estudante ${estudante.nome}?"`,
        buttons: {
            confirm: {
                label: 'SIM',
                className: 'btn-success'
            },
            cancel: {
                label: 'NÃO',
                className: 'btn-danger'
            }
        },
        callback: function (result) {
            if(result){
                excluirEstudante(estudante.id);
                carregaEstudantes();
            }
        }
    });
    
}

function adicionaLinha(estudante){
    var trow = `<tr>
    <td>${estudante.nome}</td>
    <td>${estudante.sobrenome}</td>
    <td>${estudante.telefone}</td>
    <td>${estudante.ra}</td>
    <td>
    <button class="btn btn-info" data-toggle="modal" data-target="#myModal" onclick='editarEstudante(${JSON.stringify(estudante)})'>Editar</button>
    <button class="btn btn-danger" onclick='excluir(${JSON.stringify(estudante)})'>Excluir</button> </td>
    
    
    </tr>	
    `
    tbody.innerHTML += trow;
}