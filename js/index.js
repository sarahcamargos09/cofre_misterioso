
const cofres = document.querySelectorAll(".cofre");
const mensagem = document.getElementById("mensagem");
const tentativasTexto = document.getElementById("tentativas");
const vitoriasTexto = document.getElementById("vitorias");
const jogarNovamente = document.getElementById("jogarNovamente");
const zerar = document.getElementById("zerar");

let cofrePremiado;
let tentativas = 0;
let vitorias = 0;
let rodadaFinalizada = false;

// Sorteia o cofre que contém o prêmio.
function sortearCofre() {
    cofrePremiado = Math.floor(Math.random() * 3) + 1;
}

// Abre o cofre escolhido pelo jogador.
function abrirCofre(numeroEscolhido) {
    if (rodadaFinalizada) {
        return;
    }

    rodadaFinalizada = true;
    tentativas++;

    mensagem.textContent = `Você abriu o cofre ${numeroEscolhido}!`;

    // Mostra o resultado e colore os cofres.
    cofres.forEach(function(cofre) {
        const numero = Number(cofre.dataset.cofre);

        cofre.disabled = true;

        if (numero === cofrePremiado) {
            cofre.classList.add("premiado");
            cofre.querySelector(".emoji").textContent = "💰";
        } else {
            cofre.classList.add("vazio");
            cofre.querySelector(".emoji").textContent = "📦";
        }
    });

    if (numeroEscolhido === cofrePremiado) {
        vitorias++;
        mensagem.textContent =
            `🎉 Parabéns! Você abriu o cofre ${numeroEscolhido} e encontrou o tesouro!`;
    } else {
        mensagem.textContent =
            `😢 O cofre ${numeroEscolhido} está vazio! ` +
            `O tesouro estava no cofre ${cofrePremiado}.`;
    }

    atualizarPlacar();
}

// Atualiza os contadores da tela.
function atualizarPlacar() {
    tentativasTexto.textContent = tentativas;
    vitoriasTexto.textContent = vitorias;
}

// Adiciona o evento de clique a cada cofre.
cofres.forEach(function(cofre) {
    cofre.addEventListener("click", function() {
        const numero = Number(cofre.dataset.cofre);
        abrirCofre(numero);
    });
});

// Começa uma nova rodada sem zerar os totais.
jogarNovamente.addEventListener("click", function() {
    sortearCofre();
    rodadaFinalizada = false;

    mensagem.textContent =
        "Novo tesouro escondido! Escolha um dos cofres.";

    cofres.forEach(function(cofre) {
        cofre.disabled = false;
        cofre.classList.remove("premiado", "vazio");
        cofre.querySelector(".emoji").textContent = "🎁";
    });
});

// Zera os contadores e inicia uma nova rodada.
zerar.addEventListener("click", function() {
    tentativas = 0;
    vitorias = 0;

    atualizarPlacar();
    sortearCofre();
    rodadaFinalizada = false;

    mensagem.textContent =
        "Contadores zerados! Escolha um dos cofres.";

    cofres.forEach(function(cofre) {
        cofre.disabled = false;
        cofre.classList.remove("premiado", "vazio");
        cofre.querySelector(".emoji").textContent = "🎁";
    });
});

// Prepara a primeira rodada.
sortearCofre();
