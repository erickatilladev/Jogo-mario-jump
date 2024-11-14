const mario = document.querySelector('.mario');
const pipe = document.querySelector('.pipe');
const pontuacaoElement = document.getElementById('pontuacao');
const recordeElement = document.getElementById('recorde');
const musica = document.getElementById('musica');
const gameOverLink = document.getElementById('game-over-link');
let pontuacao = 0;
let recorde = localStorage.getItem('recorde') || 0;
let jogoAtivo = true;

const jump = () => {
    if (!jogoAtivo) return;
    mario.classList.add('jump');
    setTimeout(() => {
        mario.classList.remove('jump');
    }, 500);
};

const updatePontuacao = () => {
    pontuacao++;
    pontuacaoElement.textContent = pontuacao;
};

const updateRecorde = () => {
    if (pontuacao > recorde) {
        recorde = pontuacao;
        localStorage.setItem('recorde', recorde);
    }
    recordeElement.textContent = recorde;
};

const stopJogo = () => {
    jogoAtivo = false;
    musica.pause();
    musica.currentTime = 0;
    clearInterval(loop);
    clearInterval(pontuacaoContinua);
    mario.src = "imagens/game-over.png";
    mario.style.width = '75px';
    mario.style.marginLeft = '50px';
    musicaperdeu.play();
    setTimeout(() => {
        window.location.href = "gameover.html";
    },5000);
};

const velocidadeanimacao = 1.5;

const loop = setInterval(() => {
    const pipePosition = pipe.offsetLeft;
    const marioPosition = +window.getComputedStyle(mario).bottom.replace('px', '');

    if (pipePosition <= 120 && pipePosition > 0 && marioPosition < 80) {
        pipe.style.animation = 'none';
        pipe.style.left = `${pipePosition}px`;

        mario.style.animation = 'none';
        mario.style.bottom = `${marioPosition}px`;

        mario.src = '/imagens/game-over.png';
        mario.style.width = '75px';
        mario.style.marginLeft = '50px';

        stopJogo();
        updateRecorde();
    } else if (pipePosition === 0) {
        updatePontuacao();
        updateRecorde();
    if (pontuacao % 10 ===0) {
        pipe.style.animationduration= `${velocidadeanimacao - 0.1}s`
    }
    }
}, 10);

const pontuacaoContinua = setInterval(() => {
    updatePontuacao();
    updateRecorde();
}, 1000);


document.addEventListener('keydown', jump);

window.addEventListener('load', () => {
    recordeElement.textContent = recorde;
    musica.play();
});
