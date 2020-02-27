const getChart = data => {
  return `<!DOCTYPE html>
<html>
  <head>
    <title>Report Summary</title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.9.3/Chart.min.css" integrity="sha256-aa0xaJgmK/X74WM224KMQeNQC2xYKwlAt08oZqjeF0E=" crossorigin="anonymous" />
    <script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.9.3/Chart.bundle.min.js" integrity="sha256-TQq84xX6vkwR0Qs1qH5ADkP+MvH0W+9E7TdHJsoIQiM=" crossorigin="anonymous"></script>
  </head>

  <body>
    <canvas id="myChart" width="800" height="400"></canvas>
    <canvas id="myChart2" width="800" height="400"></canvas>
    <script>
      const validLabel = ${data[0]};
      const validValues = ${data[1]};

      const invalidLabel = ${data[2]};
      const invalidValues = ${data[3]};

      var ctx = document.getElementById('myChart');
      var myChart = new Chart(ctx, {
        type: 'line',
        data: {
          labels: validLabel,
          datasets: [{
              label: 'Hourly installs (Valid)',
              data: validValues,
          }],
        },
      });

      var ctx2 = document.getElementById('myChart2');
      var myChart2 = new Chart(ctx2, {
        type: 'line',
        data: {
          labels: invalidLabel,
          datasets: [{
              label: 'Hourly installs (Invalid)',
              data: invalidValues,
          }],
        },
      });
    </script>
  </body>
</html>
`;
}

module.exports = {
  getChart
};
