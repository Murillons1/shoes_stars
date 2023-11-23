const endpoint = 'http://localhost:3000/grafic'

let qtde_array = []
let nome_array = []

fetch(endpoint, {

    method: "GET",
    headers: {
        'Content-Type':'application/json',
    }
})
// .then(resposta => console.log(resposta))
.then(resposta => resposta.json())
.then(dados => {
    console.log(dados)
    dados.forEach(valor => {
        nome_array.push(valor.nome)
        qtde_array.push(valor.quantidadeEstoque)
    })
})
console.log(nome_array)
console.log(qtde_array)

let grafic_barra = document.getElementById('grafic_barra')

grafic_barra.addEventListener('click', ()=>{

    let ctx = document.getElementById('grafico_barras')

    // Configuração do gráfico 
    // Chart.defaults.backgroundColor = '#abd8f5'
    Chart.defaults.borderColor = '#fff'
    Chart.defaults.color = '#fff'
    Chart.defaults.font.size = 26
    Chart.defaults.font.family = 'sans-serif'
    Chart.defaults.font.weight = 'bold'

    // https://www.chartjs.org/docs/latest/general/colors.html

    // const labels = ['Jan','Fev','Mar','Abr','Mai','Jun','Jul','Ago','Set','Out','Nov','Dez']
    const labels = nome_array
    const data = {
        labels,
        datasets: [{
            // data: [30, 25, 48, 37, 55, 68, 72, 43, 69, 85, 90, 52],
            data: qtde_array,
            label: 'Sneakers na Loja',
            fill: false,
            backgroundColor: '#F5F5F5',
            borderColor: '#40E0D0',
            borderWidth: 3,
            tension: 0.2
        }],
    }

    const config = {
      type: 'line',
      data,
      options: {
        plugins: {
          title: {
            color: 'white'
          },
          legend: {
            labels: {
              color: 'white' 
            }
          },
          tooltip: {
            bodyColor: 'white', 
            titleColor: 'white', 
            bodyFontColor: 'white', 
            titleFontColor: 'white' 
          }
        },
        scales: {
          x: {
            ticks: {
              color: 'white'
            }
          },
          y: {
              beginAtZero: true,
            ticks: {
              
              color: 'white'
            }
          }
        }
        },
    }

    const graph = new Chart(ctx, config)

})