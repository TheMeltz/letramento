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
  setTimeout(() => {
    quizModal.classList.remove('hidden');
    quizModal.querySelector('.modal-content').classList.add('show');
    loadQuestion();
  }, 100);
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
  launchConfetti();

  setTimeout(() => {
    location.reload();
  }, 12000);
});


function launchConfetti() {
  const duration = 3 * 1000;
  const end = Date.now() + duration;

  (function frame() {
    confetti({
      particleCount: 5,
      angle: 60,
      spread: 55,
      origin: { x: 0 },
    });
    confetti({
      particleCount: 5,
      angle: 120,
      spread: 55,
      origin: { x: 1 },
    });

    if (Date.now() < end) {
      requestAnimationFrame(frame);
    }
  })();
}
