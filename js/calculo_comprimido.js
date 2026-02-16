function calcular() {
    const barricas = document.querySelectorAll('.barrica');
    let somaBarricas = 0;

    barricas.forEach(input => {
      const valor = parseFloat(input.value);
      if (!isNaN(valor)) {
        somaBarricas += valor;
      }
    });

    const peso = parseFloat(document.getElementById('peso').value);
    const resultadoDiv = document.getElementById('resultado');

    if (somaBarricas === 0 || isNaN(peso) || peso <= 0) {
      resultadoDiv.innerText = 'Preencha pelo menos uma barrica e o peso do comprimido.';
      return;
    }

    const totalComprimidos = (somaBarricas / peso) * 100;

    resultadoDiv.innerText =
      `Total de comprimidos recebidos: ${totalComprimidos.toFixed(0)}`;
  }