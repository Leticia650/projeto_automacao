 function calcular() {
        const produtoSelect = document.getElementById('produto');
        const blistersPorCartucho = parseInt(produtoSelect.value) || 0;
        
        const qtdCartuchos = parseInt(document.getElementById('qtdCartuchos').value) || 0;
        const amostraCartucho = parseInt(document.getElementById('amostraCartucho').value) || 0;
        const amostraBlister = parseInt(document.getElementById('amostraBlister').value) || 0;

        const panel = document.getElementById('panelResultados');
        const badge = document.getElementById('badgeInfo');

        if (blistersPorCartucho === 0 || (qtdCartuchos === 0 && amostraCartucho === 0 && amostraBlister === 0)) {
            panel.style.display = 'none';
            return;
        }

        panel.style.display = 'block';

        const totalCartuchos = qtdCartuchos + amostraCartucho;
        const totalBlisters = (totalCartuchos * blistersPorCartucho) + amostraBlister;

        badge.innerText = `Padrão: ${blistersPorCartucho} blister(s) por cartucho`;
        document.getElementById('resTotalCartuchos').innerText = totalCartuchos.toLocaleString('pt-BR');
        document.getElementById('resTotalBlisters').innerText = totalBlisters.toLocaleString('pt-BR');
    }

    function limpar() {
        document.getElementById('produto').value = "";
        document.getElementById('qtdCartuchos').value = "";
        document.getElementById('amostraCartucho').value = "";
        document.getElementById('amostraBlister').value = "";
        document.getElementById('panelResultados').style.display = 'none';
    }