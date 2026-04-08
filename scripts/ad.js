document.getElementById("formAdocao").addEventListener("submit", function (e) {
    e.preventDefault();
    
    
    const cpfCadastrado = ["123.456.789-00", "000.111.222-33"];
    const nome = document.getElementById("nome").value;
    const email = document.getElementById("email").value;
    const telefone = document.getElementById("tel").value;
    const cpf = document.getElementById("cpf").value;
    const moradia = document.getElementById("moradia").value;
    const idade = parseInt(document.getElementById("age").value);
    const horas = parseInt(document.getElementById("horasSo").value);
    const quintalElemento = document.querySelector('input[name="quintal"]:checked');
    const quintal = quintalElemento ? quintalElemento.value : "nao";

    if (nome.length < 3) {
        alert("Nome inválido. Digite seu nome completo.");
        return;
    }


    if (isNaN(idade) || idade < 18) {
        alert("Você precisa ter 18 anos ou mais para adotar.");
        return;
    }

  
    if (cpfCadastrado.includes(cpf)) {
        alert("Este CPF já possui uma solicitação no nosso sistema.");
        return;
    }

    
    if (moradia === "apartamento" && quintal === "sim") {
        alert("Erro: Apartamentos padrão não possuem quintal externo.");
        return;
    }

    
    if (horas > 8) {
        const justifica = prompt("O animal ficaria mais de 8h sozinho. Como você pretende lidar com isso? (Justificativa obrigatória)");
        
        if (!justifica || justifica.length < 10) {
            alert("Adoção bloqueada: Justificativa insuficiente ou não informada.");
            return;
        }
    }


    const resultadoDiv = document.getElementById("resultado");
    resultadoDiv.style.color = "#adff2f"; 
    resultadoDiv.innerHTML = `<h3>✅ Cadastro realizado com sucesso!</h3>
                              <p><strong>Nome:</strong> ${nome}</p>
                              <p>Nossa equipe entrará em contato em breve.</p>`;

});