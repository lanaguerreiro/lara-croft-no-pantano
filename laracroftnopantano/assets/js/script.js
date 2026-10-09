const lara = document.querySelector('.lara');//Seleciona o elemento HTML com a classe "spider" e o armazena em uma constante.
const dinossauro = document.querySelector('.dinossauro');//Seleciona o elemento HTML com a classe "predio" e o armazena em uma constante.
var audiopassaro = new Audio('assets/aud/passaro.mp3');//Cria uma variável para guardar o áudio do pulo do spider.
var audiodinossauro = new Audio('assets/aud/dinossauro.mp3');//Cria uma variável para guardar o áudio da risada do duende.

//Cria a função repsonsável pelo pulo do spider.
const pular = () => {
    lara.classList.add('jump');//Adiciona a animação de pular ao spider.

    setTimeout(() => {
        lara.classList.remove('jump');//Remove a animação após 500ms para que o spider possa pular novamente.
}, 500);
}

//Cria um loop para verificar várias vezes se houve uma colisão entre o spider e o prédio em movimento.
const loop = setInterval (() => {
    const dinossauroPosition = dinossauro.offsetLeft;//Obtém a posição horizontal do prédio em relação à esquerda da tela.
    const laraPosition = +window.getComputedStyle(lara).bottom.replace('px','');//Obtém a altura do spider em relação ao chão.

    //Verifica se o spider bateu no prédio horizontalmente o verticalmente.
    if (dinossauroPosition > 0 && dinossauroPosition <= 120 && laraPosition < 80) {

        audiodinossauro.play();//Toca o áudio da risada do duende.
        dinossauro.style.animation = 'none';//Para a animação do prédio.
        dinossauro.style.left = `${dinossauroPosition}px`;//Mantém o prédio na posição onde ocorreu a colisão.

        lara.style.animation = 'none';//Para a animação do spider.
        lara.style.bottom = `${laraPosition}px`;//Mantém o spider na posição onde ocorreu a colisão.

        lara.src = ('assets/img/gameover.png');//Altera a imagem do spider para a imagem de game-over.
        lara.style.width = '300px';//Aumenta o tamanho da nova imagem.
        lara.style.marginLeft = '100px';//Ajusta o posicionamento da nova imagem do spider na tela.

        clearInterval(loop);//Interrompe o loop do jogo, parando as verificações de colisão.
    }
}, 10);//Executa o loop a cada 10 milissegundos.

//Cria um evento que verifica quando alguma tecla foi pressionada.
document.addEventListener('keydown', (event) => {
    //Verifica se a tecla pressionada foi a barra de espaço.
    if (event.code === 'Space') {
        //Executa o pulo do spider.
        pular();
        //Reproduz o áudio do pulo do spider.
        audiopassaro.play();
    }
});