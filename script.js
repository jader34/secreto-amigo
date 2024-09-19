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
  
  // Função para embaralhar a lista de participantes e sortear
  function sortearAmigoSecreto() {
    let amigos = [...participantes]; // Cria uma cópia da lista de participantes
    let sorteio = [];
  
    // Embaralha a lista
    amigos.sort(() => Math.random() - 0.5);
  
    // Faz o sorteio garantindo que ninguém tire a si mesmo
    for (let i = 0; i < participantes.length; i++) {
      let amigo;
      do {
        amigo = amigos[Math.floor(Math.random() * amigos.length)];
      } while (amigo.nome === participantes[i].nome || sorteio.some(s => s.amigo === amigo.nome));
  
      sorteio.push({ nome: participantes[i].nome, amigo: amigo.nome });
    }
  
    return sorteio;
  }
  
  const sorteio = sortearAmigoSecreto();
  
  // Função de login e verificação do código
  function login() {
    const nomeSelecionado = document.getElementById('name').value;
    const codigoDigitado = document.getElementById('code').value;
    const resultadoDiv = document.getElementById('resultado');
  
    // Verifica se o usuário escolheu um nome
    if (!nomeSelecionado) {
      resultadoDiv.textContent = 'Por favor, selecione seu nome.';
      return;
    }
  
    // Encontra o participante com o nome selecionado
    const participante = participantes.find(p => p.nome === nomeSelecionado);
  
    // Verifica o código secreto
    if (participante && participante.codigo === codigoDigitado) {
      const amigo = sorteio.find(p => p.nome === nomeSelecionado).amigo;
      resultadoDiv.textContent = `Você tirou: ${amigo}`;
    } else {
      resultadoDiv.textContent = 'Código secreto incorreto. Tente novamente.';
    }
  }