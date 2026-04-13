let data = null;

async function lataaData() {
    const res = await fetch("data.json");
    data = await res.json();
}

function random(lista) {
    return lista[Math.floor(Math.random() * lista.length)];
}

function generoi() {
    if (!data) return;

    const käytäMonikkoa = Math.random() < 0.3;
    const alku = random(data.alkuosat);
    const loppu = käytäMonikkoa
        ? random(data.monikot)
        : random(data.loppuosat);

    const nimi = alku + loppu;
    document.getElementById("tulos").textContent = nimi;
}

function setupCopy() {
    const el = document.getElementById("tulos");

    el.addEventListener("click", async () => {
        const text = el.textContent;

        if (!text || text === "Paina nappia") return;

        try {
            await navigator.clipboard.writeText(text);

            el.classList.add("copied");

            setTimeout(() => {
                el.classList.remove("copied");
            }, 900);

        } catch (err) {
            console.error(err);
        }
    });
}

// init
window.onload = async () => {
    await lataaData();
    generoi();
    setupCopy();
};

window.generoi = generoi;
