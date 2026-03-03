function calcular() {
  // Configuração refinada conforme sua solicitação
  const regrasMateriais = {
    // ITENS COM 3 CASAS DECIMAIS
    "aluminio":   { casas: 3, unidade: " kg" },
    "pvdc":       { casas: 3, unidade: " kg" },
    "fita":       { casas: 3, unidade: " m" },
    "filme":      { casas: 3, unidade: " m" },
    "cola":       { casas: 3, unidade: " kg" },
    
    // ITENS SEM CASAS DECIMAIS (INTEIROS)
    "comprimido": { casas: 0, unidade: "" },
    "bula":       { casas: 0, unidade: " un" },
    "cartucho":   { casas: 0, unidade: " un" },
    "caixa":      { casas: 0, unidade: " un" },
    "etiqueta":   { casas: 0, unidade: " un" },
    "pallet":     { casas: 0, unidade: " un" },
    "cantoneira": { casas: 0, unidade: " un" }
  };

  document.querySelectorAll("#tabela tbody tr").forEach(linha => {
    const inputs = linha.querySelectorAll("input");
    
    // Captura o nome do material da primeira célula da linha
    const nomeItem = linha.cells[0].textContent.trim().toLowerCase();
    
    // Busca a regra específica ou usa 2 casas como padrão de segurança
    const regra = regrasMateriais[nomeItem] || { casas: 2, unidade: "" };

    const recebida    = Number(inputs[0].value) || 0;
    const requisitada = Number(inputs[1].value) || 0;
    const utilizado   = Number(inputs[2].value) || 0;
    const devolvido   = Number(inputs[3].value) || 0;

    const totalRecebido = recebida + requisitada;
    const refugo = totalRecebido - utilizado - devolvido;

    const limite = Number(linha.dataset.limite) || 0;
    const percentual = totalRecebido === 0 ? 0 : (refugo / totalRecebido) * 100;

    // Função interna para aplicar a formatação correta
    const formatarValor = (valor) => {
      return valor.toLocaleString('pt-BR', {
        minimumFractionDigits: regra.casas,
        maximumFractionDigits: regra.casas
      }) + regra.unidade;
    };

    // Atualiza as células na tela
    const totalCell = linha.querySelector(".total-recebido");
    totalCell.textContent = formatarValor(totalRecebido);

    const refugoCell = linha.querySelector(".refugo");
    refugoCell.textContent = formatarValor(refugo);

    const campoPercentual = linha.querySelector(".percentual");
    campoPercentual.textContent = percentual.toFixed(2) + "%";

    // Aplica a classe de alerta se ultrapassar o limite
    campoPercentual.className = "percentual " + (percentual > limite ? "alerta" : "ok");
  });
}

// Vincula o evento de digitação aos inputs
document.querySelectorAll("input").forEach(input =>
  input.addEventListener("input", calcular)
);

// Execução inicial
calcular();