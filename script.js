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
    { nome: 'gabreu freitas', codigo: 'vainessa'}
  ];
  
  // Função para carregar o sorteio do arquivo JSON
  function carregarSorteio() {
    return fetch('sorteio.json')
      .then(response => response.json())
      .catch(error => {
        console.error('Erro ao carregar o sorteio:', error);
        return [];
      });
  }
  
// Função para criar confetes com emojis a partir da posição do resultado
function criarConfetes() {
    const confettiCount = 30;  // Quantidade de confetes
    const container = document.body;  // Onde os confetes serão inseridos
    const emojis = ['🎉', '🎊', '🎈', '✨', '🎂', '🎁'];  // Emojis que serão usados
    const resultadoDiv = document.getElementById('resultado');  // Pega o elemento de resultado
  
    // Obtém a posição do resultado na tela
    const rect = resultadoDiv.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;  // Calcula a posição central do resultado (eixo X)
    const centerY = rect.top + rect.height / 2;  // Calcula a posição central do resultado (eixo Y)
  
    for (let i = 0; i < confettiCount; i++) {
      const confetti = document.createElement('div');
      confetti.classList.add('confetti');
      confetti.textContent = emojis[Math.floor(Math.random() * emojis.length)];  // Seleciona um emoji aleatório
  
      // Posiciona os confetes na posição central do resultado
      confetti.style.left = `${centerX}px`;
      confetti.style.top = `${centerY}px`;
  
      // Define valores aleatórios para a direção da explosão (x e y)
      confetti.style.setProperty('--x', (Math.random() * 2 - 1) * 30);  // Explosão horizontal (valor entre -30 e 30)
      confetti.style.setProperty('--y', (Math.random() * 2 - 1) * 30);  // Explosão vertical (valor entre -30 e 30)
  
      container.appendChild(confetti);
  
      // Remove o confete após a animação
      setTimeout(() => {
        confetti.remove();
      }, 2000);  // 2 segundos para garantir a remoção após a animação
    }
  }
  
  // Função de login e verificação do código
  async function login() {
    const nomeSelecionado = document.getElementById('name').value;
    const codigoDigitado = document.getElementById('code').value;
    const resultadoDiv = document.getElementById('resultado');
  
    // Limpa o estado anterior
    resultadoDiv.classList.remove('show');
  
    // Verifica se o usuário escolheu um nome
    if (!nomeSelecionado) {
      resultadoDiv.textContent = 'Por favor, selecione seu nome.';
      resultadoDiv.classList.add('show');
      return;
    }
  
    // Carrega o sorteio do arquivo JSON
    const sorteio = await carregarSorteio();
  
    // Encontra o participante com o nome selecionado
    const participante = participantes.find(p => p.nome === nomeSelecionado);
  
    // Verifica o código secreto
    if (participante && participante.codigo === codigoDigitado) {
      const amigo = sorteio.find(p => p.nome === nomeSelecionado).amigo;
      resultadoDiv.textContent = `Você tirou: ${amigo}`;
      resultadoDiv.classList.add('show');
      
      // Chama a função para criar confetes a partir da posição do resultado
      criarConfetes();
    } else {
      // Exibe "Código incorreto" com animação
      resultadoDiv.textContent = 'Código secreto incorreto. Tente novamente.';
      resultadoDiv.classList.add('show');
    }
  }