const languages = new Map ([
    ["INR" , "Indian rupee   (INR)                     "],
    ["DZD" , "Algerian dinar   (DZD)                     "],
    ["AUD" , "Australian dollar   (AUD)                     "],
    ["BHD" , "Bahrain dinar   (BHD)                     "],
    ["VEF" , "Bolivar Fuerte   (VEF)                     "],
    ["BWP" , "Botswana pula   (BWP)                     "],
    ["BRL" , "Brazilian real   (BRL)                     "],
    ["BND" ,"Brunei dollar   (BND)                     "],
    ["CAD" , "Canadian dollar   (CAD)                     "],
    ["CLP" , "Chilean peso   (CLP)                     "],
    ["CNY" , "Chinese yuan   (CNY)                     "],
    ["COP" , "Colombian peso   (COP)                     "],
    ["CZK" , "Czech koruna   (CZK)                     "],
    ["DKK" , "Danish krone   (DKK)                     "],
    ["EUR" , "Euro   (EUR)                     "],
    ["HUF" , "Hungarian forint   (HUF)                     "],
    ["ISK" , "Icelandic krona   (ISK)                     "],
    ["IDR" , "Indonesian rupiah   (IDR)                     "],
    ["IRR" , "Iranian rial   (IRR)                     "],
    ["ILS" , "Israeli New Shekel   (ILS)                     "],
    ["JPY" , "Japanese yen   (JPY)                     "],
    ["KZT" , "Kazakhstani tenge   (KZT)                     "],
    ["KRW" , "Korean won   (KRW)                     "],
    ["KWD" , "Kuwaiti dinar   (KWD)                     "],
    ["LYD" , "Libyan dinar   (LYD)                     "],
    ["MYR" , "Malaysian ringgit   (MYR)                     "],
    ["MUR" , "Mauritian rupee   (MUR)                     "],
    ["MXN" , "Mexican peso   (MXN)                     "],
    ["NPR" , "Nepalese rupee   (NPR)                     "],
    ["NZD" , "New Zealand dollar   (NZD)                     "],
    ["NOK" , "Norwegian krone   (NOK)                     "],
    ["OMR" , "Omani rial   (OMR)                     "],
    ["PKR" , "Pakistani rupee   (PKR)                     "],
    ["PEN" , "Peruvian sol   (PEN)                     "],
    ["PHP" , "Philippine peso   (PHP)                     "],
    ["PLN" , "Polish zloty   (PLN)                     "],
    ["QAR" , "Qatari riyal   (QAR)                     "],
    ["RUB" , "Russian ruble   (RUB)                     "],
    ["SAR" , "Saudi Arabian riyal   (SAR)                     "],
    ["SGD" , "Singapore dollar   (SGD)                     "],
    ["ZAR" , "South African rand   (ZAR)                     "],
    ["LKR" , "Sri Lankan rupee   (LKR)                     "],
    ["SEK" , "Swedish krona   (SEK)                     "],
    ["CHF" , "Swiss franc   (CHF)                     "],
    ["THB" , "Thai baht   (THB)                     "],
    ["TTD" , "Trinidadian dollar   (TTD)                     "],
    ["TND" , "Tunisian dinar   (TND)                     "],
    ["AED" , "U.A.E. dirham   (AED)                     "],
    ["GBP" , "U.K. pound   (GBP)                     "],
    ["USD" , "U.S. dollar   (USD)                     "],
    ["UYU" , "Uruguayan peso   (UYU)                     "]
])

var labels = []
var datapoints
var myChart
function SelectCountry(){
  const Country1 = document.getElementById('country1').value
  const Country2 = document.getElementById('country2').value
  let chartStatus = Chart.getChart("myChart"); 
    if (chartStatus != undefined) {
    chartStatus.destroy();
    }
  console.log(Country1)
  console.log(Country2)
  const chartData = './Final_Data.csv'
  dates = []
  usd = []
  inr = []
  d3.csv(chartData).then(function (datapoints) {
    for (i = 0; i < datapoints.length; i++) {
      dates.push(datapoints[i]["Date"])
      usd.push(datapoints[i][languages.get(Country1)])
      inr.push(datapoints[i][languages.get(Country2)] / datapoints[i][languages.get(Country1)])
    }
    
    // config 
  labels = dates
  const data = {
    labels: dates,
    datasets: [{
      label: 'Currency Comparision',
      data: inr,
      borderColor: 'rgb(75, 192, 192)',
      borderWidth: 1,
      pointRadius: 0,
      fill: false,
      tension: 0.1
    }]
  };

  const config = {
    type: 'line',
    data,
    options: {
      scales: {
        y: {
          beginAtZero: false
        }
      }
    }
  };
  // render init block
  myChart = new Chart(
    document.getElementById('myChart'),
    config
  );
  });
}



  function updateChart(range) {
    if(range == 3600)
    {
      range = labels.length
    }
    console.log(myChart.config.data.datasets[0].data)
    const rangeValue = labels.slice(labels.length - range , labels.length);
    myChart.config.data.labels = rangeValue;
    const ansValue = inr.slice(labels.length - range , labels.length)
    myChart.config.data.datasets[0].data = ansValue;
    myChart.update(myChart.config.data.datasets.data);
  }

  function filterUsingDate(){
    var startdate = document.getElementById('startdate').value
    var enddate = document.getElementById('enddate').value

    startdate = startdate.split("-").reverse().join("-");
    enddate = enddate.split("-").reverse().join("-");
    const startIndex = labels.indexOf(startdate)
    const endIndex = labels.indexOf(enddate)
    const rangeValue = labels.slice(startIndex , endIndex)
    myChart.config.data.labels = rangeValue;
    const ansValue = inr.slice(startIndex , endIndex)
    myChart.config.data.datasets[0].data = ansValue;
    // console.log(ansValue)
    myChart.update(myChart.config.data.datasets.data);

  }
