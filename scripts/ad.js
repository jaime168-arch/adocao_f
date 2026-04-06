// Simulação de banco de dados (CPFs já existentes)
const cpfsCadastrados = ["12345678901", "11122233344"];

const form = document.getElementById("formAdocao");
const selectMoradia = document.getElementById("moradia");
const secaoQuintal = document.getElementById("secaoQuintal");
const secaoApto = document.getElementById("secaoApto");

// Lógica de exibição condicional (Regra de Negócio: Coerência)
selectMoradia.addEventListener("change", function() {
    if (this.value === "casa") {
        secaoQuintal.classList.remove("hidden");
        secaoApto.classList.add("hidden");
    } else if (this.value === "apartamento") {
        secaoApto.classList.remove("hidden");
        secaoQuintal.classList.add("hidden");
    } else {
        secaoQuintal.classList.add("hidden");
        secaoApto.classList.add("hidden");
    }
});

form.addEventListener("submit", function (e) {
    e.preventDefault();

    // Captura de valores
    const nome = document.getElementById("nome").value;
    const email = document.getElementById("email").value;
    const cpf = document.getElementById("cpf").value.replace(/\D/g, ''); // Remove pontos/traços
    const idade = parseInt(document.getElementById("idade").value);
    const moradia = document.getElementById("moradia").value;
    const horas = parseInt(document.getElementById("horasSozinho").value);
    const motivo = document.getElementById("motivo").value;
    const tevePet = document.getElementById("tevePet").value;
    const aceitouTermo = document.getElementById("termo").checked;
    const quintalRadio = document.querySelector('input[name="quintal"]:checked');

    // --- REGRAS DE VALIDAÇÃO E NEGÓCIO ---

    // 1. Validar Nome
    if (nome.length < 3) return alert("Erro: O nome deve ter no mínimo 3 caracteres.");

    // 2. Validar CPF duplicado
    if (cpfsCadastrados.includes(cpf)) return alert("Erro: Este CPF já possui uma solicitação de adoção.");

    // 3. Regra de Idade (Bloqueio)
    if (idade < 18) return alert("Adoção bloqueada: É necessário ter 18 anos ou mais.");

    // 4. Regra de Horas (Alerta/Justificativa)
    if (horas > 8) {
        alert("Atenção: O animal passará muito tempo sozinho. Isso exigirá uma justificativa detalhada na entrevista presencial.");
    }

    // 5. Regra de Primeiro Pet
    if (tevePet === "nao") {
        alert("Observação: Como é seu primeiro pet, a ONG realizará um acompanhamento próximo para te auxiliar!");
    }

    // 6. Validar Motivo genérico
    const motivosGenericos = ["quero", "porque sim", "acho bonito", "legal"];
    if (motivosGenericos.includes(motivo.toLowerCase().trim()) || motivo.length < 10) {
        return alert("Erro: Por favor, forneça um motivo mais detalhado (mínimo 10 caracteres).");
    }

    // 7. Coerência de Moradia/Quintal
    if (moradia === "apartamento" && quintalRadio?.value === "sim") {
        return alert("Erro: Apartamentos não podem possuir quintal externo de terra/grama neste formulário.");
    }

    // 8. Aceite do Termo
    if (!aceitouTermo) return alert("Erro: Você deve aceitar o termo de responsabilidade.");

    // 9. Simulação de análise impulsiva
    if (motivo.toLowerCase().includes("hoje") || motivo.toLowerCase().includes("agora")) {
        alert("Alerta: A adoção deve ser uma decisão planejada, não impulsiva. Pense com calma!");
    }

    // EXIBIÇÃO DE RESULTADO SUCESSO
    const divResultado = document.getElementById("resultado");
    divResultado.style.display = "block";
    divResultado.innerHTML = `
        <h3>✅ Solicitação Enviada!</h3>
        <p><strong>Candidato:</strong> ${nome}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Situação:</strong> Aguardando análise da ONG para a cidade de ${document.getElementById("cidade").value}.</p>
    `;

    console.log("Dados capturados:", { nome, cpf, idade, moradia, horas, motivo });
});