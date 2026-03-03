function arredondar(num) {
        // Arredonda respeitando: se a 4ª casa >= 5, sobe para a 3ª casa.
        return Number(Math.round(num + "e3") + "e-3").toFixed(3);
    }

    function executarCalculos() {
        const blisters = parseFloat(document.getElementById('qtdBlisters').value) || 0;
        const recAlu = parseFloat(document.getElementById('recAlu').value) || 0;
        const devAlu = parseFloat(document.getElementById('devAlu').value) || 0;
        const recAluAlu = parseFloat(document.getElementById('recAluAlu').value) || 0;
        const devAluAlu = parseFloat(document.getElementById('devAluAlu').value) || 0;

        const panel = document.getElementById('panelResultados');

        if (blisters <= 0) {
            panel.style.display = 'none';
            return;
        }
        panel.style.display = 'block';

        // 1. Cálculos de Utilizado Padrão (Fatores Novos)
        const utilAluPadrao = blisters * 0.0005;
        const utilAluAluPadrao = blisters * 0.0022;

        document.getElementById('utilAluPadrao').value = arredondar(utilAluPadrao);
        document.getElementById('utilAluAluPadrao').value = arredondar(utilAluAluPadrao);

        // 2. Cálculo dos Refugos Iniciais
        const refAluInic = recAlu - utilAluPadrao - devAlu;
        const refAluAluInic = recAluAlu - utilAluAluPadrao - devAluAlu;

        // 3. Soma dos Refugos
        const somaRefugos = refAluInic + refAluAluInic;
        document.getElementById('somaRefugosIniciais').innerText = `Soma Total de Refugos: ${arredondar(somaRefugos)} kg`;

        // 4. Novos Refugos Proporcionais (Base 0.0027)
        const novoRefAlu = (somaRefugos * 0.0005) / 0.0027;
        const novoRefAluAlu = (somaRefugos * 0.0022) / 0.0027;

        // 5. Novos Utilizados
        const novoUtilAlu = recAlu - devAlu - novoRefAlu;
        const novoUtilAluAlu = recAluAlu - devAluAlu - novoRefAluAlu;

        // Exibição Final
        document.getElementById('resRefAlu').innerText = arredondar(novoRefAlu) + " kg";
        document.getElementById('resUtilAlu').innerText = arredondar(novoUtilAlu) + " kg";
        document.getElementById('resRefAluAlu').innerText = arredondar(novoRefAluAlu) + " kg";
        document.getElementById('resUtilAluAlu').innerText = arredondar(novoUtilAluAlu) + " kg";
    }

    function limparFormulario() {
        document.getElementById('calcForm').reset();
        document.getElementById('qtdBlisters').value = "";
        document.getElementById('utilAluPadrao').value = "0.000";
        document.getElementById('utilAluAluPadrao').value = "0.000";
        document.getElementById('panelResultados').style.display = 'none';
    }