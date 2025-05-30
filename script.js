const video = document.getElementById('showroom-video');
  const modal = document.getElementById('quizModal');
  const quizTitle = document.getElementById('quizTitle');
  const quizQuestion = document.getElementById('quizQuestion');
  const quizOptions = document.getElementById('quizOptions');
  const erroSound = document.getElementById('erroSound');
  const modalContent = modal.querySelector('.modal-content');

const quizData = [
  {
    question: 'O letramento digital vai além do simples uso de dispositivos tecnológicos. Qual aspecto fundamental ele envolve?',
    options: [
      { text: 'A habilidade de usar redes sociais com frequência', correct: false },
      { text: 'A capacidade crítica de compreender, analisar e produzir informação digital', correct: true },
      { text: 'A rapidez para digitar textos no computador', correct: false }
    ]
  },
  {
    question: 'Sobre o letramento em Libras, qual das afirmativas descreve melhor seu papel social?',
    options: [
      { text: 'Apenas um conjunto de sinais para comunicação entre surdos', correct: false },
      { text: 'Um instrumento essencial para a inclusão social e o exercício da cidadania da comunidade surda', correct: true },
      { text: 'Um código que substitui a língua portuguesa no Brasil', correct: false }
    ]
  },
  {
    question: 'Quais desafios o letramento digital enfrenta no contexto da desigualdade social?',
    options: [
      { text: 'Falta de interesse das pessoas pelo uso da tecnologia', correct: false },
      { text: 'Acesso desigual a dispositivos, internet e capacitação crítica, o que amplia a exclusão digital', correct: true },
      { text: 'O excesso de informação que torna as pessoas mais inteligentes automaticamente', correct: false }
    ]
  },
  {
    question: 'Como a falta de letramento em Libras pode impactar a educação inclusiva no Brasil?',
    options: [
      { text: 'Não impacta, pois existem outras formas de comunicação', correct: false },
      { text: 'Dificulta o acesso à aprendizagem para alunos surdos, limitando sua participação e desenvolvimento', correct: true },
      { text: 'Só atrapalha professores que não dominam Libras', correct: false }
    ]
  },
  {
    question: 'Qual das alternativas melhor explica a relação entre letramento digital e a ética na internet?',
    options: [
      { text: 'Letramento digital é só aprender a usar a internet, a ética não importa', correct: false },
      { text: 'Letramento digital inclui entender o impacto das ações online, respeitar direitos e evitar práticas nocivas', correct: true },
      { text: 'Ética é um conceito separado da tecnologia e não influencia o letramento digital', correct: false }
    ]
  },
  {
    question: 'No contexto do letramento em Libras, o que significa o princípio da "bidirecionalidade"?',
    options: [
      { text: 'Que surdos e ouvintes devem aprender sinais diferentes', correct: false },
      { text: 'Que a comunicação deve ser eficiente tanto para surdos quanto para ouvintes, permitindo troca mútua', correct: true },
      { text: 'Que Libras só serve para comunicação entre surdos', correct: false }
    ]
  },
  {
    question: 'Por que o simples acesso à tecnologia não garante o letramento digital completo?',
    options: [
      { text: 'Porque o letramento digital depende também da capacidade crítica, ética e de produção de conteúdo digital', correct: true },
      { text: 'Porque usar dispositivos digitais é muito difícil para a maioria das pessoas', correct: false },
      { text: 'Porque a internet é cara e lenta', correct: false }
    ]
  },
  {
    question: 'Qual o papel da legislação brasileira para a promoção do letramento em Libras?',
    options: [
      { text: 'Não existe legislação específica sobre Libras no Brasil', correct: false },
      { text: 'Garantir o reconhecimento da Libras como língua oficial e promover sua inclusão em espaços educacionais e sociais', correct: true },
      { text: 'Impor o uso exclusivo da Libras em todas as instituições', correct: false }
    ]
  },
  {
    question: 'Como o letramento digital pode ajudar a combater a desinformação online?',
    options: [
      { text: 'Ensina a identificar fontes confiáveis, analisar conteúdos e evitar compartilhar notícias falsas', correct: true },
      { text: 'Ensina a postar o máximo de conteúdo possível para saturar as redes', correct: false },
      { text: 'Aumenta o uso de redes sociais para que todos fiquem informados', correct: false }
    ]
  },
  {
    question: 'O que é necessário para que o letramento em Libras seja eficaz em uma comunidade escolar?',
    options: [
      { text: 'Somente a contratação de intérpretes para surdos', correct: false },
      { text: 'Formação continuada de professores, adaptação de materiais e incentivo à cultura surda', correct: true },
      { text: 'Substituir todas as aulas pela comunicação em Libras', correct: false }
    ]
  }
];


  let currentQuestionIndex = 0;
  let score = 0;

  video.onended = () => {
    startQuiz();
  };

  function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    modal.style.display = 'flex';
    loadQuestion();
  }

  function loadQuestion() {
    const questionData = quizData[currentQuestionIndex];
    quizTitle.textContent = `Pergunta ${currentQuestionIndex + 1}`;
    quizQuestion.textContent = questionData.question;
    quizOptions.innerHTML = '';

    questionData.options.forEach((option) => {
      const btn = document.createElement('button');
      btn.textContent = option.text;
      btn.className = 'quiz-btn';
      btn.onclick = () => handleAnswer(option.correct);
      quizOptions.appendChild(btn);
    });
  }

  function handleAnswer(isCorrect) {
    if (isCorrect) {
      score++;
    } else {
      // Feedback visual e sonoro de erro
      erroSound.play();
      modalContent.classList.add('shake');
      modalContent.style.backgroundColor = '#ffdddd';
      setTimeout(() => {
        modalContent.classList.remove('shake');
        modalContent.style.backgroundColor = '';
      }, 300);
    }

    currentQuestionIndex++;

    if (currentQuestionIndex < quizData.length) {
      loadQuestion();
    } else {
      showResult();
    }
  }

  function showResult() {
    modalContent.innerHTML = `
      <h2>Resultado</h2>
      <p>Você acertou ${score} de ${quizData.length} perguntas.</p>
      <p>${getMedalMessage(score, quizData.length)}</p>
      <button id="closeBtn">Fechar</button>
    `;

    // Dispara confetes se ganhou medalha (50% ou mais)
    if (score / quizData.length >= 0.5) {
      confetti({
        particleCount: 150,
        spread: 70,
        origin: { y: 0.6 }
      });
    }

    const closeBtn = document.getElementById('closeBtn');
    closeBtn.onclick = () => {
      modal.style.display = 'none';
      resetQuiz();
    };
  }

  function getMedalMessage(score, total) {
    const percent = (score / total) * 100;
    if (percent === 100) return '🥇 Parabéns! Medalha de Ouro!';
    if (percent >= 70) return '🥈 Muito bem! Medalha de Prata!';
    if (percent >= 50) return '🥉 Você ganhou a Medalha de Bronze!';
    return '⚠️ Não ganhou medalha, mas continue tentando!';
  }

  function resetQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    // Recarregar pergunta para o próximo uso (opcional)
    loadQuestion();
  }
