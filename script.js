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
    { nome: 'mateus chimia', codigo: 'math' }
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
    } else {
      // Exibe "Código incorreto" com animação
      resultadoDiv.textContent = 'Código secreto incorreto. Tente novamente.';
      resultadoDiv.classList.add('show');
    }
  }