const cartuchosInput = document.getElementById("cartuchos");
    const amostrasInput = document.getElementById("amostras");
    const blistersExtrasSelect = document.getElementById("blistersExtras");

    const totalBlisterSpan = document.getElementById("totalBlister");
    const totalComprimidosSpan = document.getElementById("totalComprimidos");

    function calcular() {
      const cartuchos = Number(cartuchosInput.value) || 0;
      const amostras = Number(amostrasInput.value) || 0;
      const blistersExtras = Number(blistersExtrasSelect.value);

      // (cartuchos + amostras) * 2 para converter em blisters
      const blisterBase = (cartuchos + amostras) * 1;
      
      // Soma a base com o adicional selecionado (0, 30 ou 90)
      const blisterFinal = blisterBase + blistersExtras;
      
      // Converte blisters totais para comprimidos (cada blister = 15 unidades)
      const comprimidos = blisterFinal * 15;

      totalBlisterSpan.textContent = blisterFinal;
      totalComprimidosSpan.textContent = comprimidos;

      // Salva no localStorage para a página de refugo ler
      localStorage.setItem("total_blisters", blisterFinal);
    }

    // Listeners para atualizar o cálculo em tempo real
    cartuchosInput.addEventListener("input", calcular);
    amostrasInput.addEventListener("input", calcular);
    blistersExtrasSelect.addEventListener("change", calcular);