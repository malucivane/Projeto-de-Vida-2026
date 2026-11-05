
// ======================================
// DATAS DOS OBJETIVOS
// ======================================

let hoje = new Date();
let anoAtual = hoje.getFullYear();

let objetivos = {
    "Frequentar academia": new Date(anoAtual, 11, 31, 23, 59, 59),
    "Frequentar natação": new Date(anoAtual, 11, 31, 23, 59, 59),
    "Pedalar Muito": new Date(anoAtual, 11, 31, 23, 59, 59),
    "Me Aposentar": new Date(2026, 10, 13, 23, 59, 59)
};

// ======================================
// ELEMENTOS DA PÁGINA
// ======================================

const tabs = document.querySelectorAll(".tab");
const tituloObjetivo = document.getElementById("tituloObjetivo");

const contadorRegressivo = document.getElementById("contadorRegressivo");
const painelAposentadoria = document.getElementById("painelAposentadoria");

const diasEl = document.getElementById("dias");
const horasEl = document.getElementById("horas");
const minutosEl = document.getElementById("minutos");
const segundosEl = document.getElementById("segundos");

let objetivoAtual = "Frequentar academia";

// ======================================
// ELEMENTOS DA CONQUISTA
// ======================================

const protocolo = document.getElementById("numeroProtocolo");
const botaoLargada = document.getElementById("botaoLargada");
const botaoStop = document.getElementById("botaoStop");
const mensagemStatus = document.getElementById("mensagemStatus");
const mensagemFinal = document.getElementById("mensagemFinal");

const diasConquista = document.getElementById("diasConquista");
const horasConquista = document.getElementById("horasConquista");
const minutosConquista = document.getElementById("minutosConquista");
const segundosConquista = document.getElementById("segundosConquista");

// ======================================
// GUARDAR DADOS DA CONTAGEM
// ======================================

let conquista = JSON.parse(
    localStorage.getItem("protocoloFelicidade")
) || {
    protocolo: "",
    inicio: null,
    fim: null
};

protocolo.value = conquista.protocolo;

// ======================================
// FORMATAR TEMPO
// ======================================

function atualizarTempoConquista() {

    if (!conquista.inicio) return;

    let inicio = new Date(conquista.inicio);
    let fim = conquista.fim
        ? new Date(conquista.fim)
        : new Date();

    let diferenca = Math.max(0, fim - inicio);

    let dias = Math.floor(diferenca / 86400000);
    let horas = Math.floor((diferenca % 86400000) / 3600000);
    let minutos = Math.floor((diferenca % 3600000) / 60000);
    let segundos = Math.floor((diferenca % 60000) / 1000);

    diasConquista.textContent = dias;
    horasConquista.textContent = horas;
    minutosConquista.textContent = minutos;
    segundosConquista.textContent = segundos;
}

// ======================================
// SALVAR DADOS
// ======================================

function salvarConquista() {
    localStorage.setItem(
        "protocoloFelicidade",
        JSON.stringify(conquista)
    );
}

// ======================================
// BOTÃO FOI DADA A LARGADA
// ======================================

botaoLargada.addEventListener("click", () => {

    if (!protocolo.value.trim()) {
        alert("Digite primeiro o número do protocolo!");
        return;
    }

    if (conquista.inicio) {
        alert("A contagem já foi iniciada!");
        return;
    }

    conquista.protocolo = protocolo.value.trim();
    conquista.inicio = new Date().toISOString();
    conquista.fim = null;

    salvarConquista();

    protocolo.disabled = true;
    botaoLargada.disabled = true;
    botaoStop.disabled = false;

    mensagemStatus.textContent =
        "🏁 LARGADA OFICIAL! Protocolo nº " + conquista.protocolo;

    atualizarTempoConquista();
});

// ======================================
// BOTÃO STOP
// ======================================

botaoStop.addEventListener("click", () => {

    if (!conquista.inicio || conquista.fim) return;

    if (!confirm("Tem certeza que deseja encerrar a contagem?")) {
        return;
    }

    conquista.fim = new Date().toISOString();

    salvarConquista();

    botaoStop.disabled = true;

    mensagemStatus.textContent = "🏆 MISSÃO CUMPRIDA!";

    mensagemFinal.textContent =
        "A liberdade tem data e hora! ❤️";

    atualizarTempoConquista();
});

// ======================================
// RESTAURAR CONTAGEM AO ABRIR A PÁGINA
// ======================================

function restaurarConquista() {

    if (conquista.inicio) {

        protocolo.disabled = true;
        botaoLargada.disabled = true;

        mensagemStatus.textContent =
            "🏁 Protocolo nº " + conquista.protocolo;

        if (conquista.fim) {
            botaoStop.disabled = true;
            mensagemStatus.textContent = "🏆 MISSÃO CUMPRIDA!";
            mensagemFinal.textContent =
                "A liberdade tem data e hora! ❤️";
        } else {
            botaoStop.disabled = false;
            mensagemStatus.textContent =
                "🏁 CONTAGEM EM ANDAMENTO!";
        }

        atualizarTempoConquista();

    } else {
        botaoStop.disabled = true;
    }
}

// ======================================
// CONTADOR REGRESSIVO ORIGINAL
// ======================================

function atualizarContador() {

    let agora = new Date();
    let dataFinal = objetivos[objetivoAtual];

    let diferenca = dataFinal - agora;

    if (diferenca <= 0) {
        diasEl.textContent = "0";
        horasEl.textContent = "0";
        minutosEl.textContent = "0";
        segundosEl.textContent = "0";
        return;
    }

    diasEl.textContent = Math.floor(diferenca / 86400000);
    horasEl.textContent = Math.floor((diferenca / 3600000) % 24);
    minutosEl.textContent = Math.floor((diferenca / 60000) % 60);
    segundosEl.textContent = Math.floor((diferenca / 1000) % 60);
}

// ======================================
// TROCAR ABAS
// ======================================

tabs.forEach(tab => {

    tab.addEventListener("click", () => {

        tabs.forEach(t => t.classList.remove("active"));
        tab.classList.add("active");

        objetivoAtual = tab.dataset.objetivo;

        tituloObjetivo.textContent = objetivoAtual;

        if (objetivoAtual === "Me Aposentar") {
            contadorRegressivo.style.display = "none";
            painelAposentadoria.style.display = "block";
        } else {
            contadorRegressivo.style.display = "block";
            painelAposentadoria.style.display = "none";
            atualizarContador();
        }
    });
});

// ======================================
// INICIAR RELÓGIOS
// ======================================

restaurarConquista();

setInterval(() => {
    atualizarContador();
    atualizarTempoConquista();
}, 1000);

atualizarContador();
