

var data = {
    labels: ['KW1','KW2','KW3','KD1','KD2','KD3','LJ1','LJ2','LJ3','PG1','PG2','PG3'],
      datasets: [{
        label: 'Gráfico de todos os Sneakers da loja ',
        data: [10,10,10,9,8,10,10,9.10,10,10,10,10],
        backgroundColor: '#F5F5F5',
        borderColor: '#40E0D0',
        borderWidth: 1,
        fill:true
  
      }
    ]
  };
  
  var options = {
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
    };
  

  var ctx = document.getElementById('grafico_area1').getContext('2d');
  var areaChart = new Chart(ctx, {
    type: 'line',
    data: data,
    options: options
  });
 