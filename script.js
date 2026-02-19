
// =============================
// PEGAR ANO ATUAL
// =============================

let hoje = new Date();
let anoAtual = hoje.getFullYear();


// =============================
// DEFINIR DATAS FINAIS
// =============================

let objetivos = {
    "Frequentar academia": new Date(anoAtual, 11, 31, 23, 59, 59),
    "Frequentar natação": new Date(anoAtual, 11, 31, 23, 59, 59),
    "Pedalar Muito": new Date(anoAtual, 11, 31, 23, 59, 59),
    "Me Aposentar": new Date(anoAtual, 10, 13, 23, 59, 59)
};


// =============================
// SE DATA JÁ PASSOU → USA PRÓXIMO ANO
// =============================

for (let chave in objetivos) {
    if (hoje > objetivos[chave]) {
        objetivos[chave] = new Date(anoAtual + 1, 
            objetivos[chave].getMonth(), 
            objetivos[chave].getDate(), 
            23, 59, 59
        );
    }
}


// =============================
// ELEMENTOS
// =============================

const tabs = document.querySelectorAll(".tab");
const tituloObjetivo = document.getElementById("tituloObjetivo");

const diasEl = document.getElementById("dias");
const horasEl = document.getElementById("horas");
const minutosEl = document.getElementById("minutos");
const segundosEl = document.getElementById("segundos");

let objetivoAtual = "Frequentar academia";


// =============================
// TROCAR OBJETIVO
// =============================

tabs.forEach(tab => {
    tab.addEventListener("click", () => {

        tabs.forEach(t => t.classList.remove("active"));
        tab.classList.add("active");

        objetivoAtual = tab.dataset.objetivo;
        tituloObjetivo.textContent = objetivoAtual;

        atualizarContador();
    });
});


// =============================
// CONTAGEM REGRESSIVA
// =============================

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

    let dias = Math.floor(diferenca / (1000 * 60 * 60 * 24));
    let horas = Math.floor((diferenca / (1000 * 60 * 60)) % 24);
    let minutos = Math.floor((diferenca / (1000 * 60)) % 60);
    let segundos = Math.floor((diferenca / 1000) % 60);

    diasEl.textContent = dias;
    horasEl.textContent = horas;
    minutosEl.textContent = minutos;
    segundosEl.textContent = segundos;
}

setInterval(atualizarContador, 1000);
atualizarContador();
