const blistersInput = document.getElementById("blisters");
const aluminioUtilizadoInput = document.getElementById("aluminioUtilizado");
const pvdcUtilizadoInput = document.getElementById("pvdcUtilizado");

const recebidoInput = document.getElementById("recebido");
const requisicaoInput = document.getElementById("requisicao");
const totalRecebidoInput = document.getElementById("totalRecebido");
const devolvidoInput = document.getElementById("devolvido");

const maiorRefugoSpan = document.getElementById("maiorRefugo");
const refugoAlSpan = document.getElementById("refugoAluminio");
const refugoPvdcSpan = document.getElementById("refugoPvdc");

function calcular() {
  const blisters = Number(blistersInput.value) || 0;

  // Utilização
  const aluminioUtilizado = blisters * 0.0005;
  const pvdcUtilizado = blisters * 0.0028;

  aluminioUtilizadoInput.value = aluminioUtilizado.toFixed(6);
  pvdcUtilizadoInput.value = pvdcUtilizado.toFixed(6);

  // Recebimento
  const recebido = Number(recebidoInput.value) || 0;
  const requisicao = Number(requisicaoInput.value) || 0;
  const devolvido = Number(devolvidoInput.value) || 0;

  const totalRecebido = recebido + requisicao;
  totalRecebidoInput.value = totalRecebido.toFixed(6);

  // Refugo base
  const refugoAlBase = totalRecebido - devolvido - aluminioUtilizado;
  const refugoPvdcBase = totalRecebido - devolvido - pvdcUtilizado;

  // Maior refugo
  const maiorRefugo = Math.max(refugoAlBase, refugoPvdcBase);
  maiorRefugoSpan.textContent = maiorRefugo.toFixed(6);

  // Primeira expressão
  const expressao = (maiorRefugo * 0.0028) / 0.0033;

  // Redistribuição
  let refugoPvdcFinal = (expressao * 0.0033) / 0.0028;
  let refugoAlFinal = (expressao * 0.0005) / 0.0033;

  // Ajuste de fechamento
  const soma = refugoPvdcFinal + refugoAlFinal;
  const diferenca = maiorRefugo - soma;
  refugoAlFinal += diferenca;

  refugoAlSpan.textContent = refugoAlFinal.toFixed(6);
  refugoPvdcSpan.textContent = refugoPvdcFinal.toFixed(6);
}

[
  blistersInput,
  recebidoInput,
  requisicaoInput,
  devolvidoInput
].forEach(el => el.addEventListener("input", calcular));