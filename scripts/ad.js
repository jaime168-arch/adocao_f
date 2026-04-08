document.getElementById("formAdocao").addEventListener("submit", function (e){
    e.preventDefault();

    let nome = document.getElementById("nome").value;
    let email = document.getElementById("email").value;
    let telefone = document.getElementById("telefone").value;
    let CPF = document.getElementById("cpf").value;
    let moradia = document.getElementById("moradia").value;
    let quintal = document.querySelector('input[name="quintal"]:checked');
    

    if(nome.length < 3) return alert("Nome inválido");
    if (idade < 18){
        alert("Você tem que ter 18 para adotar ou até mais");
        return 0;
    }

    

    document.getElementById("resultado").innerHTML = "Cadastro realizado com sucesso!<br>" + "Nome: "
    + nome;
});