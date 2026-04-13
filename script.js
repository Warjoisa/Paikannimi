let data = null;

async function lataaData() {
  const res = await fetch("./data.json");
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

// init
window.onload = async () => {
  await lataaData();
  generoi();
};

window.generoi = generoi;