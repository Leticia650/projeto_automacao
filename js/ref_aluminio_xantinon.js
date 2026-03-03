 function arredondar(num) {
        return Number(Math.round(num + "e3") + "e-3").toFixed(3);
    }

    function executarCalculos() {
        const blisters = parseFloat(document.getElementById('qtdBlisters').value) || 0;
        const recAlu = parseFloat(document.getElementById('recAlu').value) || 0;
        const devAlu = parseFloat(document.getElementById('devAlu').value) || 0;
        const recPvdc = parseFloat(document.getElementById('recPvdc').value) || 0;
        const devPvdc = parseFloat(document.getElementById('devPvdc').value) || 0;

        const panel = document.getElementById('panelResultados');

        if (blisters <= 0) {
            panel.style.display = 'none';
            return;
        }
        panel.style.display = 'block';

        const utilAluPadrao = blisters * 0.0005;
        const utilPvdcPadrao = blisters * 0.0028;

        document.getElementById('utilAluPadrao').value = arredondar(utilAluPadrao);
        document.getElementById('utilPvdcPadrao').value = arredondar(utilPvdcPadrao);

        const refAluInic = recAlu - utilAluPadrao - devAlu;
        const refPvdcInic = recPvdc - utilPvdcPadrao - devPvdc;

        const somaRefugos = refAluInic + refPvdcInic;
        document.getElementById('somaRefugosIniciais').innerText = `Soma Total dos Refugos: ${arredondar(somaRefugos)} kg`;

        const novoRefAlu = (somaRefugos * 0.0005) / 0.0033;
        const novoRefPvdc = (somaRefugos * 0.0028) / 0.0033;

        const novoUtilAlu = recAlu - devAlu - novoRefAlu;
        const novoUtilPvdc = recPvdc - devPvdc - novoRefPvdc;

        document.getElementById('resRefAlu').innerText = arredondar(novoRefAlu) + " kg";
        document.getElementById('resUtilAlu').innerText = arredondar(novoUtilAlu) + " kg";
        document.getElementById('resRefPvdc').innerText = arredondar(novoRefPvdc) + " kg";
        document.getElementById('resUtilPvdc').innerText = arredondar(novoUtilPvdc) + " kg";
    }

    function limparFormulario() {
        // Reseta o formulário e o campo de blisters
        document.getElementById('calcForm').reset();
        document.getElementById('qtdBlisters').value = "";
        
        // Limpa os campos de leitura fixa
        document.getElementById('utilAluPadrao').value = "0.000";
        document.getElementById('utilPvdcPadrao').value = "0.000";
        
        // Esconde o painel de resultados
        document.getElementById('panelResultados').style.display = 'none';
    }