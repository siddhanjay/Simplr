import React, { Component } from 'react';
import { Bar, Doughnut, Line, Pie, Polar, Radar } from 'react-chartjs-2';
import { Card, CardBody, CardColumns, CardHeader } from 'reactstrap';
import { CustomTooltips } from '@coreui/coreui-plugin-chartjs-custom-tooltips';



const bar = {
  labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July','August','September'],
  datasets: [
    {
      label: 'Monthly Expenditure',
      backgroundColor: 'rgba(255,99,132,0.2)',
      borderColor: 'rgba(255,99,132,1)',
      borderWidth: 1,
      hoverBackgroundColor: 'rgba(255,99,132,0.4)',
      hoverBorderColor: 'rgba(255,99,132,1)',
      data: [65, 59, 80, 81, 56, 55, 40, 70, 31],
    },
  ],
};


const pie = {
  labels: [
    'Rental',
    'Bills & Utilities',
    'Transportation',
    'Groceries'
  ],
  datasets: [
    {
      data: [200, 50, 100,80],
      backgroundColor: [
        '#FF6384',
        '#36A2EB',
        '#FFCE56',
        '#00cc66',
      ],
      hoverBackgroundColor: [
        '#FF6384',
        '#36A2EB',
        '#FFCE56',
        '#00cc66',
      ],
    }],
};

const options = {
  tooltips: {
    enabled: false,
    custom: CustomTooltips
  },
  maintainAspectRatio: false
}

class Charts extends Component {
  render() {
    return (
      <div className="animated fadeIn">
        <CardColumns className="cols-2">
       
          <Card>
            <CardHeader>
              Your Financial Overview
              <div className="card-header-actions">
                <a href="http://www.chartjs.org" className="card-header-action">
                </a>
              </div>
            </CardHeader>
            <CardBody>
              <div className="chart-wrapper">
                <Bar data={bar} options={options} />
              </div>
            </CardBody>
          </Card>
          <Card>
            <CardHeader>
              Categorical spending
              <div className="card-header-actions">
                <a href="http://www.chartjs.org" className="card-header-action">
                </a>
              </div>
            </CardHeader>
            <CardBody>
              <div className="chart-wrapper">
                <Pie data={pie} />
              </div>
            </CardBody>
          </Card>
        </CardColumns>
      </div>
    );
  }
}

export default Charts;
