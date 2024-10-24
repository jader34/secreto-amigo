// Lista de participantes e seus códigos secretos
const participantes = [
  { nome: 'Leo kruga', codigo: '6969' },
  { nome: 'Brune mines', codigo: 'minecraft' },
  { nome: 'Pedro deivid', codigo: 'frango' },
  { nome: 'Bruno dal', codigo: 'gay' },
  { nome: 'amanda sheme', codigo: 'cuzin' },
  { nome: 'jader junio', codigo: 'foda' },
  { nome: 'kau rito', codigo: 'hitler' },
  { nome: 'matehus frança', codigo: 'dinheiro' },
  { nome: 'kameli', codigo: 'psico' },
  { nome: 'julia vais', codigo: '666' },
  { nome: 'loeza vebester', codigo: 'danca' },
  { nome: 'carol', codigo: 'legpress' },
  { nome: 'murilo peroba', codigo: 'beach' },
  { nome: 'neves', codigo: 'lindo' },
  { nome: 'mateus chimia', codigo: 'math' },
  { nome: 'gabreu freitas', codigo: 'vainessa' }
];

// Limite de tentativas
const maxTentativas = 3;
let tentativasRestantes = maxTentativas;

// Função para carregar o sorteio do arquivo JSON
function carregarSorteio() {
  return fetch('sorteio.json')
    .then(response => response.json())
    .catch(error => {
      console.error('Erro ao carregar o sorteio:', error);
      return [];
    });
}

// Função para carregar as sugestões de presente do arquivo JSON
function carregarSugestoes() {
  return fetch('sugestoes.json')
    .then(response => response.json())
    .catch(error => {
      console.error('Erro ao carregar sugestões:', error);
      return [];
    });
}

// Função para criar confetes com emojis a partir da posição do resultado
function criarConfetes() {
  const confettiCount = 120;
  const container = document.body;
  const emojis = ['🎉', '🎊', '🎈', '✨', '🎂', '🎁', '🍆', '🍑'];
  const resultadoTextoDiv = document.getElementById('resultadoTexto');  // Pega o elemento do texto de resultado

  const rect = resultadoTextoDiv.getBoundingClientRect();
  const centerX = (rect.left - 20) + rect.width / 2;
  const centerY = (rect.top - 20) + rect.height / 2;

  for (let i = 0; i < confettiCount; i++) {
    const confetti = document.createElement('div');
    confetti.classList.add('confetti');
    confetti.textContent = emojis[Math.floor(Math.random() * emojis.length)];

    confetti.style.left = `${centerX}px`;
    confetti.style.top = `${centerY}px`;

    confetti.style.setProperty('--x', (Math.random() * 2 - 1) * 30);
    confetti.style.setProperty('--y', (Math.random() * 2 - 1) * 30);

    container.appendChild(confetti);

    setTimeout(() => {
      confetti.remove();
    }, 4000);
  }
}

// Função de login e verificação do código
async function login() {
  const nomeSelecionado = document.getElementById('name').value;
  const codigoDigitado = document.getElementById('code').value;
  const resultadoTextoDiv = document.getElementById('resultadoTexto');  // Div para o texto do resultado
  const sugestoesDiv = document.getElementById('sugestoes');  // Div para as sugestões
  const resultadoDiv = document.getElementById('resultado');  // Contêiner principal

  // Oculta temporariamente o resultado para suavizar a transição
  resultadoDiv.classList.add('hidden');

  // Verifica se o nome foi selecionado
  if (!nomeSelecionado) {
    if (resultadoTextoDiv.textContent !== 'Por favor, selecione seu nome.') {
      resultadoTextoDiv.textContent = 'Por favor, selecione seu nome.';
    }
    resultadoDiv.classList.remove('hidden');
    resultadoDiv.classList.add('show');
    return;
  }

  // Verifica se o código foi digitado
  if (!codigoDigitado) {
    if (resultadoTextoDiv.textContent !== 'Por favor, insira seu código secreto.') {
      resultadoTextoDiv.textContent = 'Por favor, insira seu código secreto.';
    }
    resultadoDiv.classList.remove('hidden');
    resultadoDiv.classList.add('show');
    return;
  }

  // Verifica o limite de tentativas
  if (tentativasRestantes <= 0) {
    if (resultadoTextoDiv.textContent !== 'Você atingiu o limite de tentativas. Tente novamente mais tarde.') {
      resultadoTextoDiv.textContent = 'Você atingiu o limite de tentativas. Tente novamente mais tarde.';
    }
    resultadoDiv.classList.remove('hidden');
    resultadoDiv.classList.add('show');
    return;
  }

  const sorteio = await carregarSorteio();
  const participante = participantes.find(p => p.nome === nomeSelecionado);

  if (participante && participante.codigo === codigoDigitado) {
    const amigo = sorteio.find(p => p.nome === nomeSelecionado).amigo;
    if (resultadoTextoDiv.textContent !== `Você tirou: ${amigo}`) {
      resultadoTextoDiv.textContent = `Você tirou: ${amigo}`;
    }
    resultadoDiv.classList.remove('hidden');
    resultadoDiv.classList.add('show');

    // Chama a função para criar confetes a partir da posição do resultado
    criarConfetes();

    // Verifica se as sugestões já foram carregadas, para evitar duplicação
    if (sugestoesDiv.innerHTML === '') {
      // Carrega as sugestões de presentes e exibe
      const sugestoes = await carregarSugestoes();
      const sugestaoAmigo = sugestoes.find(p => p.nome === amigo);

      if (sugestaoAmigo) {
        const sugestoesList = document.createElement('ul');  // Cria uma lista de sugestões
        sugestaoAmigo.sugestoes.forEach(sugestao => {
          const item = document.createElement('li');

          if (sugestao.link) {
            // Se o link existir, cria um link clicável
            const link = document.createElement('a');
            link.textContent = sugestao.item;
            link.href = sugestao.link;
            link.target = '_blank';  // Abre o link em uma nova aba
            link.rel = 'noopener noreferrer';  // Segurança ao abrir links em nova aba
            item.appendChild(link);  // Adiciona o link ao item da lista
          } else {
            // Se o link não existir, exibe como texto simples
            item.textContent = sugestao.item;
          }

          sugestoesList.appendChild(item);  // Adiciona o item à lista de sugestões
        });
        sugestoesDiv.appendChild(sugestoesList);  // Exibe as sugestões abaixo do nome do amigo secreto
      }
    }

    // Reseta tentativas após sucesso
    tentativasRestantes = maxTentativas;
  } else {
    // Código secreto incorreto, reduz tentativas
    tentativasRestantes--;
    if (tentativasRestantes > 0) {
      resultadoTextoDiv.textContent = `Código secreto incorreto. Tentativas restantes: ${tentativasRestantes}`;
    } else {
      resultadoTextoDiv.textContent = 'Você atingiu o limite de tentativas. Tente novamente mais tarde.';
    }
    resultadoDiv.classList.remove('hidden');
    resultadoDiv.classList.add('show');
  }
}

// Seleciona o elemento <select>
const selectElement = document.getElementById('name');

// Adiciona um listener para o evento "change"
selectElement.addEventListener('change', function() {
  // Adiciona a classe 'changed' para disparar a animação
  selectElement.classList.add('changed');
  
  // Remove a classe 'changed' após a animação para permitir futuras animações
  setTimeout(() => {
    selectElement.classList.remove('changed');
  }, 500);  // A duração deve ser igual à duração da animação no CSS (0.5s)
});

// Seleciona o checkbox e o body
const checkbox = document.querySelector('.input__check');
const body = document.body;

// Verifica se o tema foi salvo no localStorage
const savedTheme = localStorage.getItem('theme');

// Se o tema escuro foi salvo, aplica-o
if (savedTheme === 'dark') {
  body.classList.add('dark-mode');
  checkbox.checked = true;  // Define o checkbox como marcado
}

// Alterna entre os temas claro e escuro ao clicar no switch
checkbox.addEventListener('change', function() {
  if (checkbox.checked) {
    body.classList.add('dark-mode');
    localStorage.setItem('theme', 'dark');  // Salva a preferência no localStorage
  } else {
    body.classList.remove('dark-mode');
    localStorage.setItem('theme', 'light');  // Salva a preferência no localStorage
  }
});
