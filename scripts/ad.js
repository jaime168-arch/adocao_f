document.getElementById("formAdocao").addEventListener("submit", function (e){
    e.preventDefault();

    let nome = document.getElementById("nome").value;
    let email = document.getElementById("email").value;
    let telefone = document.getElementById("tel").value;
    let idade = parseInt(document.getElementById("age")).value;
    let CPF = document.getElementById("cpf").value;
    let moradia = document.getElementById("moradia").value;
    let quintal = document.querySelector('input[name="quintal"]:checked');
    

    if(nome.length < 3){
    alert("Nome inválido");
    return;   
    } 

    if (idade < 18) {
        alert("Você tem que ter 18 para adotar ou até mais");
        return;
    }

    if (cpfCadastrado.includes(CPF)) {
        alert("Este CPF já possui uma solicitação no nosso sistema");
        return;
    }

    if (moradia === "apartamento" && quintal === "sim"){
        alert("Erro: apartamentos não possuem quintal externo")
        return;
    }

    if (horas > 8){
        const justifica = prompt("O animal fica mais de 8h sozinho. Como você lida com isso? (Justificativa obrigatória)")
        if (!justifica || justifica.length < 10){
            alert ("Adoção bloqueada: justificativa insuficiente")
            return;
        }
    }



   document.getElementById("resultado").innerHTML = "Cadastro realizado com sucesso!<br>" + "Nome: "
    + nome;
});