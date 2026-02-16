function calcular() {
  const linha = document.querySelector("#tabela tbody tr");
  const inputs = linha.querySelectorAll("input");

  const recebida = Number(inputs[0].value) || 0;
  const requisitada = Number(inputs[1].value) || 0;
  const utilizado = Number(inputs[2].value) || 0;
  const devolvido = Number(inputs[3].value) || 0;

  // Total Recebido = Recebido + Requisitado
  const totalRecebido = recebida + requisitada;

  // Refugo = Total Recebido - Utilizado - Devolvido
  const refugo = totalRecebido - utilizado - devolvido;

  // Percentual de refugo
  const percentual = totalRecebido === 0
    ? 0
    : (refugo / totalRecebido) * 100;

  const limite = Number(linha.dataset.limite);

  linha.querySelector(".total-recebido").textContent = totalRecebido;
  linha.querySelector(".refugo").textContent = refugo;

  const campoPercentual = linha.querySelector(".percentual");
  campoPercentual.textContent = percentual.toFixed(2) + "%";

  campoPercentual.className =
    "percentual " + (percentual > limite ? "alerta" : "ok");
}

document.querySelectorAll("input").forEach(input =>
  input.addEventListener("input", calcular)
);

calcular();
