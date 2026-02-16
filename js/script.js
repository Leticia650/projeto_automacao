function calcular() {
  document.querySelectorAll("#tabela tbody tr").forEach(linha => {

    const inputs = linha.querySelectorAll("input");

    const recebida = Number(inputs[0].value) || 0;
    const requisitada = Number(inputs[1].value) || 0;
    const utilizado = Number(inputs[2].value) || 0;
    const devolvido = Number(inputs[3].value) || 0;

    const totalRecebido = recebida + requisitada;
    const refugo = totalRecebido - utilizado - devolvido;

    const limite = Number(linha.dataset.limite);
    const percentual = totalRecebido === 0 ? 0 : (refugo / totalRecebido) * 100;

    // TOTAL RECEBIDO (com ou sem unidade)
    const totalCell = linha.querySelector(".total-recebido");
    const valorSpan = totalCell.querySelector(".valor");

    if (valorSpan) {
      valorSpan.textContent = totalRecebido.toFixed(2);
    } else {
      totalCell.textContent = totalRecebido;
    }

    // REFUGO
    linha.querySelector(".refugo").textContent = refugo.toFixed(2);

    // PERCENTUAL
    const campoPercentual = linha.querySelector(".percentual");
    campoPercentual.textContent = percentual.toFixed(2) + "%";

    campoPercentual.className =
      "percentual " + (percentual > limite ? "alerta" : "ok");
  });
}

document.querySelectorAll("input").forEach(input =>
  input.addEventListener("input", calcular)
);

calcular();
