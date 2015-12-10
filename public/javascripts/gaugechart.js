(function () {
  google.load('visualization', '1', {'packages':['corechart', 'gauge']});
  google.setOnLoadCallback(startListening);

  function drawChart(phData) {
      var chartData = [];

      // Create the data table.
      var data = new google.visualization.DataTable();
      data.addColumn('string', 'Topping');
      data.addColumn('number', 'Slices');
      data.addRows([
          ['GPM', phData.point]
      ]);

      // Set chart options
      var options = {'title':'How Much Pizza I Ate Last Night',
          //'width':400,
          'height':300,
          redFrom: 80, redTo: 100,
          yellowFrom:60, yellowTo: 80,
          minorTicks: 5
      };

      //create and draw the chart from DIV
      var chart = new google.visualization.Gauge(document.getElementById('gaugeChart'));
      chart.draw(data, options);
  }

  // Listen for new data
  function startListening() {
    window.app.onSocketEvent('data::ph', function (data) {
      drawChart(data);
    });
  }
})();
