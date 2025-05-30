const startModal = document.getElementById('startModal');
const startBtn = document.getElementById('startBtn');
const video = document.getElementById('videoPlayer');

const quizModal = document.getElementById('quizModal');
const quizQuestion = document.getElementById('quizQuestion');
const quizOptions = document.getElementById('quizOptions');
const nextBtn = document.getElementById('nextBtn');
const resultBtn = document.getElementById('resultBtn');
const quizResult = document.getElementById('quizResult');

const quizData = [
  {
    question: "O que é Letramento Digital?",
    options: [
      "Habilidade de usar dispositivos digitais",
      "Capacidade crítica e consciente de usar tecnologias",
      "Saber programar em várias linguagens",
      "Apenas navegar nas redes sociais"
    ],
    correct: 1
  },
  {
    question: "Qual a importância da Libras no contexto digital?",
    options: [
      "Facilitar comunicação entre surdos e ouvintes",
      "É só uma linguagem formal sem relação digital",
      "Serve apenas para traduções de textos",
      "Não tem importância significativa"
    ],
    correct: 0
  },
  {
    question: "Qual tecnologia ajuda na acessibilidade para surdos?",
    options: [
      "Reconhecimento de voz",
      "Libras em vídeos e legendas",
      "Realidade aumentada",
      "Computação em nuvem"
    ],
    correct: 1
  }
];

let currentQuestion = 0;
let score = 0;

startBtn.addEventListener('click', () => {
  startModal.classList.remove('show');
  startModal.classList.add('hidden');
  video.play();
});

video.addEventListener('ended', () => {
  quizModal.classList.remove('hidden');
  quizModal.querySelector('.modal-content').classList.add('show');
  loadQuestion();
});

function loadQuestion() {
  clearState();
  let q = quizData[currentQuestion];
  quizQuestion.textContent = q.question;
  q.options.forEach((opt, idx) => {
    let btn = document.createElement('button');
    btn.textContent = opt;
    btn.className = 'option-button';
    btn.addEventListener('click', () => selectOption(idx));
    quizOptions.appendChild(btn);
  });
}

function clearState() {
  quizOptions.innerHTML = '';
  nextBtn.classList.add('hidden');
  resultBtn.classList.add('hidden');
  quizResult.classList.add('hidden');
  quizResult.textContent = '';
}

function selectOption(selectedIndex) {
  let q = quizData[currentQuestion];
  const buttons = quizOptions.querySelectorAll('button');
  buttons.forEach((btn, i) => {
    btn.disabled = true;
    if (i === q.correct) {
      btn.style.backgroundColor = '#26a69a'; // green correct
      btn.style.color = '#fff';
    } else {
      btn.style.backgroundColor = '#b71c1c'; // red wrong
      btn.style.color = '#fff';
    }
  });

  if (selectedIndex === q.correct) score++;

  if (currentQuestion < quizData.length - 1) {
    nextBtn.classList.remove('hidden');
  } else {
    resultBtn.classList.remove('hidden');
  }
}

nextBtn.addEventListener('click', () => {
  currentQuestion++;
  loadQuestion();
});

resultBtn.addEventListener('click', () => {
  quizQuestion.textContent = "Seus resultados!"
  quizOptions.innerHTML = '';
  nextBtn.classList.add('hidden');
  resultBtn.classList.add('hidden');
  quizResult.classList.remove('hidden');
  quizResult.textContent = `Você acertou ${score} de ${quizData.length} perguntas!`;
  showConfetti();

  setTimeout(() => {
    location.reload();
  }, 12000);
});


function showConfetti() {
  const confettiCount = 100;
  const colors = ['#26a69a', '#007acc', '#ff6f61', '#ffd54f', '#ab47bc'];
  const confettiContainer = document.createElement('div');
  confettiContainer.style.position = 'fixed';
  confettiContainer.style.top = 0;
  confettiContainer.style.left = 0;
  confettiContainer.style.width = '100%';
  confettiContainer.style.height = '100%';
  confettiContainer.style.pointerEvents = 'none';
  confettiContainer.style.overflow = 'visible';
  confettiContainer.style.zIndex = 1500;
  document.body.appendChild(confettiContainer);

  for (let i = 0; i < confettiCount; i++) {
    const confetto = document.createElement('div');
    confetto.style.position = 'absolute';
    confetto.style.width = '8px';
    confetto.style.height = '8px';
    confetto.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
    confetto.style.left = Math.random() * window.innerWidth + 'px';
    confetto.style.top = '-10px';
    confetto.style.opacity = Math.random() + 0.5;
    confetto.style.borderRadius = '50%';
    confetto.style.transform = `rotate(${Math.random() * 360}deg)`;
    confettiContainer.appendChild(confetto);

    // Animação simples caindo com rotação
    confetto.animate([
      { transform: `translateY(0) rotate(0deg)` },
      { transform: `translateY(${window.innerHeight + 20}px) rotate(360deg)` }
    ], {
      duration: 3000 + Math.random() * 2000,
      iterations: 1,
      easing: 'ease-out',
      delay: Math.random() * 500
    });

    // Remove o confetto após a animação
    setTimeout(() => confetto.remove(), 5000);
  }

  // Remove o container após 6 segundos
  setTimeout(() => confettiContainer.remove(), 6000);
}
