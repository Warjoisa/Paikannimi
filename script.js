let data = null;
let valmis = false;

async function lataaData() {
  try {
    const res = await fetch("data.json", { cache: "no-store" });

    if (!res.ok) {
      throw new Error("Dataa ei voitu ladata");
    }

    data = await res.json();
    valmis = true;
  } catch (err) {
    console.error(err);
    document.getElementById("tulos").textContent = "Latausvirhe";
  }
}

function random(lista) {
  return lista[Math.floor(Math.random() * lista.length)];
}

function generoi() {
  const el = document.getElementById("tulos");

  if (!valmis || !data) {
    el.textContent = "Ladataan...";
    return;
  }

  const käytäMonikkoa = Math.random() < 0.3;

  const alku = random(data.alkuosat);
  const loppu = käytäMonikkoa
    ? random(data.monikot)
    : random(data.loppuosat);

  el.textContent = alku + loppu;
}

async function kopioi() {
  const el = document.getElementById("tulos");
  const teksti = el.innerText;

  if (!teksti || teksti === "Ladataan..." || teksti === "Latausvirhe") {
    return;
  }

  try {
    await navigator.clipboard.writeText(teksti);

    const alkuperainen = el.textContent;
    el.textContent = "Kopioitu!";

    setTimeout(() => {
      el.textContent = alkuperainen;
    }, 700);
  } catch {
    const range = document.createRange();
    range.selectNodeContents(el);

    const sel = window.getSelection();
    sel.removeAllRanges();
    sel.addRange(range);
  }
}

document.addEventListener("DOMContentLoaded", async () => {
  const tulos = document.getElementById("tulos");
  const nappi = document.querySelector("button");

  tulos.addEventListener("click", kopioi);

  if (nappi) {
    nappi.addEventListener("click", generoi);
  }

  await lataaData();

  generoi();
});

window.generoi = generoi;
