 function arredondar(num) {
        return Number(Math.round(num + "e3") + "e-3").toFixed(3);
    }

    function executarCalculos() {
        const blisters = parseFloat(document.getElementById('qtdBlisters').value) || 0;
        const panel = document.getElementById('outputPanel');
        
        if (blisters <= 0) {
            panel.style.display = 'none';
            return;
        }
        panel.style.display = 'block';

        // Lógica Alumínio
        const recAlu = parseFloat(document.getElementById('recAlu').value) || 0;
        const devAlu = parseFloat(document.getElementById('devAlu').value) || 0;
        const utilAluPadrao = blisters * 0.0005;
        document.getElementById('utilAlu').value = arredondar(utilAluPadrao);
        const refugoAlu = recAlu - devAlu - utilAluPadrao;
        document.getElementById('alertAlu').style.display = refugoAlu < 0 ? 'block' : 'none';

        // Lógica PVDC
        const recPvdc = parseFloat(document.getElementById('recPvdc').value) || 0;
        const devPvdc = parseFloat(document.getElementById('devPvdc').value) || 0;
        const utilPvdcPadrao = blisters * 0.0028;
        document.getElementById('utilPvdc').value = arredondar(utilPvdcPadrao);
        const refugoPvdc = recPvdc - devPvdc - utilPvdcPadrao;
        document.getElementById('alertPvdc').style.display = refugoPvdc < 0 ? 'block' : 'none';

        // Cálculo do Maior Refugo (Garantindo positivo conforme conversa anterior)
        const maiorRefugo = Math.max(refugoAlu, refugoPvdc, 0);
        
        // Fórmulas solicitadas
        const P = (maiorRefugo * 0.0028) / 0.0033;
        const A = (maiorRefugo * 0.0005) / 0.0033;

        document.getElementById('displayCalculosBase').innerHTML = `
            Maior Refugo identificado: <span class="highlight-value">${arredondar(maiorRefugo)}</span><br>
            Alumínio Alvo (A): <span class="highlight-value">${arredondar(A)}</span> | 
            PVDC Alvo (P): <span class="highlight-value">${arredondar(P)}</span><br>
            Soma A+P: <span class="highlight-value">${arredondar(A + P)}</span>
        `;

        // Lógica de quanto acrescentar/retirar
        // Para Alumínio: Refugo_Atual + Ajuste = A
        const difAlu = A - refugoAlu;
        const difPvdc = P - refugoPvdc;

        gerarSugestao('ajusteAluInfo', difAlu);
        gerarSugestao('ajustePvdcInfo', difPvdc);
    }

    function gerarSugestao(id, diferenca) {
        const elemento = document.getElementById(id);
        if (Math.abs(diferenca) < 0.0001) {
            elemento.innerHTML = "✅ Valor já está correto.";
            return;
        }

        if (diferenca > 0) {
            // Refugo atual está menor que o alvo, precisa tirar da devolução ou diminuir o utilizado
            // Mas conforme solicitado: "acrescentar no utilizado ou tirar da devolução"
            elemento.innerHTML = `
                • Acrescentar <b style="color:red">${arredondar(diferenca)}</b> no Utilizado<br>
                • OU Retirar <b style="color:red">${arredondar(diferenca)}</b> da Devolução.
            `;
        } else {
            // Refugo atual está maior que o alvo
            elemento.innerHTML = `
                • Somar <b>${arredondar(Math.abs(diferenca))}</b> no Utilizado<br>
                • OU Subtrair <b>${arredondar(Math.abs(diferenca))}</b> da Devolução.
            `;
        }
    }

    // Executa assim que a página carrega
window.onload = function() {
    // 1. Tenta buscar o valor salvo na memória do navegador
    const valorSalvo = localStorage.getItem("total_blisters");

    if (valorSalvo) {
        // 2. Preenche o campo de blisters automaticamente
        const inputBlisters = document.getElementById('qtdBlisters');
        inputBlisters.value = valorSalvo;

        // 3. Dispara os cálculos automaticamente para não precisar digitar
        executarCalculos();
    }
};