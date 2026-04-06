// Simulação de banco de dados para CPFs já cadastrados (Regra de Negócio)
const cpfsExistentes = ["12345678900", "11122233344"];

document.getElementById("formAdocao").addEventListener("submit", function (e) {
    e.preventDefault();

    // 1. Captura de todos os 12 campos
    let nome = document.getElementById("nome").value.trim();
    let email = document.getElementById("email").value.trim();
    let telefone = document.getElementById("tel").value.trim(); // Ajustado para o ID 'tel' do seu HTML
    let cpf = document.getElementById("cpf").value.trim().replace(/\D/g, ''); // Remove pontos e traços
    let idade = parseInt(document.getElementById("idade").value);
    let cidade = document.getElementById("cidade").value.trim();
    let moradia = document.getElementById("moradia").value;
    let quintalChecked = document.querySelector('input[name="quintal"]:checked');
    let jaTevePet = document.getElementById("petAnterior").value;
    let horasSozinho = parseInt(document.getElementById("horasSo").value);
    let motivo = document.getElementById("motivo").value.trim();
    let termo = document.getElementById("termo").checked;

    // --- VALIDAÇÕES TÉCNICAS ---
    if (nome.length < 3) return alert("O nome deve ter no mínimo 3 caracteres.");
    if (!email.includes("@")) return alert("Email inválido.");
    if (telefone.length < 8) return alert("Telefone deve ter no mínimo 8 dígitos.");
    if (cpf.length !== 11) return alert("CPF deve conter 11 dígitos.");
    if (isNaN(idade)) return alert("Idade é obrigatória.");
    if (cidade === "") return alert("Cidade é obrigatória.");
    if (!moradia) return alert("Selecione o tipo de moradia.");
    if (!quintalChecked) return alert("Informe se possui quintal.");
    if (!jaTevePet) return alert("Informe se já teve pet antes.");
    if (isNaN(horasSozinho)) return alert("Informe as horas que o animal ficará sozinho.");
    if (motivo.length < 10) return alert("O motivo deve ter pelo menos 10 caracteres.");
    if (!termo) return alert("Você precisa aceitar os termos de responsabilidade.");

    let valorQuintal = quintalChecked.value;

    // --- REGRAS DE NEGÓCIO (Obrigatórias) ---

    // Regra: Idade mínima 18 anos
    if (idade < 18) {
        alert("Adoção negada: O candidato deve ser maior de 18 anos.");
        return;
    }

    // Regra: CPF Duplicado
    if (cpfsExistentes.includes(cpf)) {
        alert("Este CPF já possui um cadastro de adoção em nosso sistema.");
        return;
    }

    // Regra: Coerência Apartamento vs Quintal
    if (moradia === "apartamento" && valorQuintal === "sim") {
        alert("Inconsistência: Apartamentos não podem possuir quintal externo neste formulário.");
        return;
    }

    // Regra: Moradia específica (Permissão/Segurança)
    if (moradia === "apartamento") {
        let permite = confirm("O condomínio do seu apartamento permite animais?");
        if (!permite) {
            alert("Adoção negada: O local de moradia não permite pets.");
            return;
        }
    } else if (moradia === "casa") {
        let seguro = confirm("O quintal da casa é totalmente seguro (muros e portões)?");
        if (!seguro) {
            alert("Atenção: A ONG exige quintais seguros para evitar fugas.");
        }
    }

    // Regra: Horas sozinho (> 8 horas)
    if (horasSozinho > 8) {
        let justificativa = prompt("O animal ficará mais de 8 horas sozinho. Por favor, forneça uma justificativa adicional:");
        if (!justificativa || justificativa.length < 10) {
            alert("Justificativa insuficiente. O animal não pode ficar tanto tempo sozinho sem um plano de cuidados.");
            return;
        }
    }

    // Regra: Candidato sem experiência prévia
    if (jaTevePet === "nao") {
        alert("Aviso: Como este é seu primeiro pet, a ONG realizará um acompanhamento pedagógico nas primeiras semanas.");
    }

    // Regra: Motivo genérico
    const motivosBanidos = ["quero", "porque sim", "legal", "me da", "queria"];
    if (motivosBanidos.includes(motivo.toLowerCase())) {
        alert("Por favor, descreva melhor o seu motivo. Respostas genéricas não são aceitas.");
        return;
    }

    // --- EXIBIÇÃO DOS DADOS (Pós-Validação) ---
    const resultado = document.getElementById("resultado");
    resultado.style.display = "block";
    resultado.innerHTML = `
        <div style="border: 2px solid #27ae60; padding: 15px; background: #f9f9f9; margin-top: 20px;">
            <h3 style="color: #27ae60;">Cadastro Realizado com Sucesso!</h3>
            <p><strong>Nome:</strong> ${nome}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>CPF:</strong> ${cpf}</p>
            <p><strong>Cidade:</strong> ${cidade}</p>
            <p><strong>Perfil:</strong> Moradia em ${moradia} (${valorQuintal === 'sim' ? 'com quintal' : 'sem quintal'}).</p>
            <p><strong>Motivo:</strong> ${motivo}</p>
            <p><em>Sua solicitação será analisada pela equipe da ONG em até 48 horas.</em></p>
        </div>
    `;

    // Opcional: Limpar formulário após sucesso
    // document.getElementById("formAdocao").reset();
});