document.getElementById("formAdocao").addEventListener("submit", function (e){
    e.preventDefault();

    let nome = document.getElementById("nome").value;
    let email = document.getElementById("email").value;
    let moradia = document.getElementById("moradia").value;
    let quintal = document.querySelector('input[name="quintal"]:checked');

    if(nome.length < 3) return alert("Nome inválido");

    document.getElementById("resultado").innerHTML = "Cadastro realizado com sucesso!<br>" + "Nome: "
    + nome;
});