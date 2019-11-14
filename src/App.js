import React from 'react';
import './App.css';
import $ from 'jquery';
import Grid from '@material-ui/core/Grid';
import MaterialTable from 'material-table';
import Button from '@material-ui/core/Button';
import Chart from 'chart.js';

let getData = localStorage.getItem('data');
var finalData =[];
if(getData !== null && getData.length>0){
    finalData = JSON.parse(getData);
}

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            columns: [
                { title: 'ID', field: 'ID', type: 'numeric'  },
                { title: 'WorkItem', field: 'WorkItem' , type:"text"},
                { title: 'Due Date', field: 'DueDate',type:"date"},
                { title: 'Resources Needed', field: 'resourcesNeeded', type: 'numeric' },
                { title: 'Work Item Status', field: 'status', lookup: { OverDue: 'OverDue', Done: 'Done',InProgress:'InProgress'},
                }
            ],
            data:finalData.length>0 ? finalData : []
        }
    }

    componentDidMount(){
        this.drowChart();
    }

    drowChart() {
        if(this.state.data.length>0){
            let OverDue =[];
            let Done =[];
            let InProgress =[];
            this.state.data.filter(a=> a.status === "OverDue" ? OverDue.push(a):'');
            this.state.data.filter(a=> a.status === "Done" ? Done.push(a):'');
            this.state.data.filter(a=> a.status === "InProgress" ? InProgress.push(a):'');
            var ctx = document.getElementById('chart1').getContext('2d');
            Chart.defaults.global.tooltips.enabled = true;
            window.chart = new Chart(ctx, {
                // The type of chart we want to create
                type: 'pie',
                responsive: true,
                showTooltips: true,
                data :{
                    datasets: [{
                        data: [OverDue.length, Done.length, InProgress.length],
                        backgroundColor: [
                            "#FF6384",
                            "#00E1E1",
                            "#6384FF"
                        ],
                    }],
                    // These labels appear in the legend and in the tooltips when hovering different arcs
                    labels: [
                        'overDue',
                        'Done',
                        'InProgress'
                    ]
                }
            });
        }

    }
    upload(e){
       this.state.data.map(excel => {
              let excelData= {
                  ID: excel.ID,
                  WorkItem: excel.WorkItem,
                  DueDate: excel.DueDate,
                  resourcesNeeded: excel.resourcesNeeded,
                  status: excel.status
              };
               let url = 'https://script.google.com/macros/s/AKfycbz92LEtB-nZW7Dw5YQQwMRELq9VpKRCYFkGuZF89qirUiLnzFlw/exec'
               $.fn.serializeObject = function () {
                   var o = {};
                   var a = this.serializeArray();
                   $.each(a, function () {
                       if (o[this.name]) {
                           if (!o[this.name].push) {
                               o[this.name] = [o[this.name]];
                           }
                           o[this.name].push(this.value || '');
                       } else {
                           o[this.name] = this.value || '';
                       }
                   });
                   return o;
               };
               e.preventDefault();
               var jqxhr = $.ajax({
                   url: url,
                   method: "GET",
                   dataType: "json",
                   data:excelData,
                   success: function (result) {
                       window.open("https://docs.google.com/spreadsheets/d/1rFdDPwzVQQuO-juMp5SBqxfenN_cFXUt8mkY7KmEt34/edit#gid=0")
                   }
               });
           }
       )


    }
    render() {
        return(
            <div className="App">
                <header className="App-header">
                  <img src="https://www.zen3.com/wp-content/uploads/2019/04/zen3-logo.png" className="App-logo" alt="Zen3" />
                </header>
                <div className="margin-5">
                    <div style={{maxWidth:'300px', margin:'auto'}} >
                        <h4>Work Status Metrics</h4>
                        {this.state.data.length>0 ?
                            <canvas id={"chart1"} width="300" height="190"/>:<p>No Data</p>
                        }

                    </div>
                </div>
                <div className="mainSub">
                    <div>
                        <Grid container>
                            <Grid item xs={4}>
                                <h4>List Of Work Items</h4>
                            </Grid>
                            <Grid item xs={8}>
                            <p>No of work items : {this.state.data.length}</p>
                            </Grid>
                        </Grid>
                    </div>
                    <div className="buttonMain" >
                        <Button variant="contained" color="primary" onClick={(e)=>{this.state.data.length > 0 ? this.upload(e) : alert('No Data to upload')}} >
                            Upload to google spread sheet
                        </Button>
                    </div>
                <div className="table-comp">
                    <MaterialTable
                        style={{width:'100%'}}
                        title=""
                        columns={this.state.columns}
                        data={this.state.data}
                        editable={{
                            onRowAdd: newData =>
                                new Promise(resolve => {
                                    setTimeout(() => {
                                        resolve();
                                        this.setState(prevState => {
                                            const data = [...prevState.data];
                                            data.push(newData);
                                            localStorage.setItem('data',JSON.stringify(data));
                                            return { ...prevState, data };
                                        },()=>this.drowChart());
                                    }, 600);
                                }),
                            onRowUpdate: (newData, oldData) =>
                                new Promise(resolve => {
                                    setTimeout(() => {
                                        resolve();
                                        if (oldData) {
                                            this.setState(prevState => {
                                                const data = [...prevState.data];
                                                data[data.indexOf(oldData)] = newData;
                                                localStorage.setItem('data',JSON.stringify(data));
                                                return { ...prevState, data };
                                            },()=>this.drowChart());
                                        }
                                    }, 600);
                                }),
                            onRowDelete: oldData =>
                                new Promise(resolve => {
                                    setTimeout(() => {
                                        resolve();
                                        this.setState(prevState => {
                                            const data = [...prevState.data];
                                            data.splice(data.indexOf(oldData), 1);
                                            localStorage.setItem('data',JSON.stringify(data));
                                            return { ...prevState, data };
                                        },()=>this.drowChart());
                                    }, 600);
                                }),
                        }}
                    />
                </div>
             </div>
          </div>
    );}
    }




export default App;
