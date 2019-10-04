class Magica {
    constructor(investido, aporte, juros, jTipo, periodo, pTipo) {
        this.investido = Number(document.getElementById('investido').value)
        this.aporte = Number(document.getElementById('aporte').value)
        this.juros = Number(document.getElementById('juros').value)
        this.jTipo = document.getElementById('select-juro').value
        this.periodo = Number(document.getElementById('periodo').value)
        this.pTipo = document.getElementById('select-periodo').value
        // verificar o valor selecionado em juros e ajustar valor para calculo
        if (this.jTipo == 'mes') {
            this.juros = (this.juros / 100) + 1
        }
        if (this.jTipo == 'ano') {
            this.juros = ((this.juros / 12) / 100) + 1
        }
        // verificar o valor selecionado em periodo e ajustar valor para calculo
        if (this.pTipo == 'mes') {
            this.periodo
        }
        if (this.pTipo == 'ano') {
            this.periodo *= 12
        }
        this.tabela = document.getElementById('tabela')
    }
    // soma o valor aplicado mais juros
    calcularValor() {
        let resultado = this.investido
        for (let index = 0; index < this.periodo; index++) {
            resultado += this.aporte
            resultado *= this.juros
        }
        // imprimir resultado
        document.getElementById('resultado').innerHTML = resultado.toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL'
        })
    }
    // cria a tabela com os dados
    criarTabela() {
        // deleta a tabela
        while (this.tabela.hasChildNodes()) {
            this.tabela.removeChild(this.tabela.firstChild)
        }
        // criação da tabela e dados
        // cria o cabeçalho da tabela
        let tHeader = this.tabela.createTHead()
        let hRow = tHeader.insertRow()
        hRow.insertCell(0).innerHTML = 'Mês'
        hRow.insertCell(1).innerHTML = 'Dinheiro aplicado'
        hRow.insertCell(2).innerHTML = 'Juros'
        hRow.insertCell(3).innerHTML = 'Total'
        // cria e insere os dados na tabela
        let investido = this.investido
        let total = this.investido
        let mes = 0
        for (let index = 0; index < this.periodo; index++) {
            // calcula o valor investido
            investido += this.aporte
            // calcula o valor total
            total += this.aporte
            total *= this.juros
            // aumenta o valor de mês
            mes++
            // insere os dados na tabela
            // .toLocalString = ajusta o valor para a moeda BRL
            let row = this.tabela.insertRow()
            row.insertCell(0).innerHTML = mes
            row.insertCell(1).innerHTML = investido.toLocaleString('pt-BR', {
                style: 'currency',
                currency: 'BRL'
            })
            row.insertCell(2).innerHTML = (total - investido).toLocaleString('pt-BR', {
                style: 'currency',
                currency: 'BRL'
            })
            row.insertCell(3).innerHTML = total.toLocaleString('pt-BR', {
                style: 'currency',
                currency: 'BRL'
            })
        }
    }
    // cria o grafico com os dados
    criarGrafico() {
        // dados para o gráfico
        let gMes = []
        let gTotal = []
        let gInvestido = []
        let gJuros = []
        let investido = this.investido
        let total = this.investido
        let z = 1
        for (let index = 0; index < this.periodo; index++) {
            // calcula o valor investido
            investido += this.aporte
            // calcula o valor total
            total += this.aporte
            total *= this.juros
            // envia os dados para os Arrays
            gInvestido.push(investido.toFixed(2))
            gTotal.push(total.toFixed(2))
            gJuros.push((total - investido).toFixed(2))
            gMes.push(z)
            z++
        }
        // configuração do gráfico
        let config = {
            type: 'line',
            data: {
                labels: gMes,
                // grafico dinheiro investido + juros
                datasets: [{
                    label: 'Total',
                    data: gTotal,
                    backgroundColor: 'rgba(255, 99, 132, 0.0)',
                    borderColor: 'rgba(255, 2, 123, 1)'
                }, {
                    // grafico dinheiro investido
                    label: 'Dinheiro Investido',
                    data: gInvestido,
                    backgroundColor: 'rgba(255, 99, 132, 0.0)',
                    borderColor: 'rgba(2, 120, 255, 1)'
                }, {
                    // grafico juros
                    label: 'Juros',
                    data: gJuros,
                    backgroundColor: 'rgba(255, 99, 132, 0.0)',
                    borderColor: 'rgba(100, 200, 120, 1)',
                }]
            },
            options: {
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero: true
                        }
                    }]
                }
            }
        }
        // 
        let myChart = document.getElementById('myChart').getContext('2d')
        // evita que dois gráficos sejam exibidos
        if (window.myCharte != undefined) {
            window.myCharte.destroy()
        }
        // imprime o grafico
        window.myCharte = new Chart(myChart, config)
    }
}
// ^ final da Magica

function ameba() {
    let ameba = new Magica
    ameba.calcularValor()
    ameba.criarTabela()
    ameba.criarGrafico()
}

function mudarCor() {
    let inputCor = document.getElementById('corbg').value
    let bgCor = document.getElementById('bg')
    let string = `0px 0px 300px ${inputCor}`
    localStorage.setItem('cor', inputCor)
    bgCor.style.boxShadow = string
}

window.onload = name()

function name() {
    document.getElementById('corbg').value = localStorage.getItem('cor')
    let cor = localStorage.getItem('cor')
    let string2 = `0px 0px 300px ${cor}`
    document.getElementById('bg').style.boxShadow = string2
}