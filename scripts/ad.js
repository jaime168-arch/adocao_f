// Simulação de banco de dados de CPFs já cadastrados
const cpfsCadastrados = ["12345678901", "98765432100"];

const form = document.getElementById('adoptionForm');
const tipoMoradia = document.getElementById('tipoMoradia');
const campoQuintal = document.getElementById('campoQuintal');
const campoExtraMoradia = document.getElementById('campoExtraMoradia');

// Lógica de campos dinâmicos e coerência
tipoMoradia.addEventListener('change', (e) => {
    const valor = e.target.value;
    const labelExtra = document.getElementById('labelExtraMoradia');
    
    if (valor === 'casa') {
        campoQuintal.classList.remove('hidden');
        campoExtraMoradia.classList.remove('hidden');
        labelExtra.innerText = "O quintal é seguro (muros/grades)?";
    } else if (valor === 'apartamento') {
        campoQuintal.classList.add('hidden');
        document.getElementById('possuiQuintal').value = "nao"; // Coerência: Apto não tem quintal
        campoExtraMoradia.classList.remove('hidden');
        labelExtra.innerText = "O condomínio permite animais?";
    } else {
        campoQuintal.classList.add('hidden');
        campoExtraMoradia.classList.add('hidden');
    }
});

form.addEventListener('submit', function(e) {
    e.preventDefault();

    // Captura de valores
    const dados = {
        nome: document.getElementById('nome').value,
        email: document.getElementById('email').value,
        telefone: document.getElementById('telefone').value,
        cpf: document.getElementById('cpf').value.replace(/\D/g, ''),
        idade: parseInt(document.getElementById('idade').value),
        cidade: document.getElementById('cidade').value,
        moradia: tipoMoradia.value,
        quintal: document.getElementById('possuiQuintal').value,
        tevePet: document.getElementById('tevePet').value,
        horas: parseInt(document.getElementById('horasSozinho').value),
        motivo: document.getElementById('motivo').value.toLowerCase(),
        termo: document.getElementById('termo').checked
    };

    // --- REGRAS DE VALIDAÇÃO E NEGÓCIO ---

    // 1. Idade
    if (dados.idade < 18) {
        alert("Apenas maiores de 18 anos podem adotar.");
        return;
    }

    // 2. CPF Duplicado
    if (cpfsCadastrados.includes(dados.cpf)) {
        alert("Este CPF já possui uma solicitação em andamento.");
        return;
    }

    // 3. Validação de Telefone
    if (dados.telefone.length < 8) {
        alert("Por favor, insira um telefone válido para contato.");
        return;
    }

    // 4. Motivos genéricos
    const motivosInvalidos = ["quero", "porque sim", "legal", "sempre quis"];
    if (motivosInvalidos.includes(dados.motivo.trim())) {
        alert("Por favor, descreva melhor o motivo da adoção. Evite respostas genéricas.");
        return;
    }

    // 5. Horas sozinho
    if (dados.horas > 8) {
        const justificativa = prompt("O animal ficará muito tempo sozinho. Por favor, forneça uma justificativa (Ex: Quem cuidará nesse período?):");
        if (!justificativa || justificativa.length < 5) {
            alert("O envio foi bloqueado devido à falta de justificativa para o tempo de solidão do animal.");
            return;
        }
        dados.justificativaHoras = justificativa;
    }

    // 6. Mensagem para novos tutores
    if (dados.tevePet === 'nao') {
        alert("Aviso: Como este será seu primeiro pet, a ONG realizará um acompanhamento especial nos primeiros meses!");
    }

    // 7. Termos
    if (!dados.termo) {
        alert("Você precisa aceitar os termos de responsabilidade.");
        return;
    }

    exibirResultado(dados);
});

function exibirResultado(dados) {
    form.classList.add('hidden');
    const resultDiv = document.getElementById('resultado');
    const dadosDiv = document.getElementById('dadosEnviados');
    resultDiv.classList.remove('hidden');

    dadosDiv.innerHTML = `
        <p><strong>Nome:</strong> ${dados.nome}</p>
        <p><strong>Status:</strong> <span style="color: green">Proposta enviada com sucesso!</span></p>
        <p><strong>Resumo:</strong> Mora em ${dados.moradia} e o animal ficará ${dados.horas}h sozinho.</p>
        <p>Aguarde nosso contato via ${dados.email} ou telefone.</p>
    `;
}