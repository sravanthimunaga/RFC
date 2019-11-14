import React from 'react';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import MaterialTable from 'material-table';
import Button from '@material-ui/core/Button';
import './App.css';


var getData = localStorage.getItem('data');
var finalData =[];
if(getData !== null && getData.length>0){
    finalData = JSON.parse(getData);
}


console.log(finalData,'finalData');
class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            columns: [
                { title: 'ID', field: 'ID', type: 'numeric'  },
                { title: 'WorkItem', field: 'WorkItem' , type:"text"},
                { title: 'Due Date', field: 'DueDate',type:"date"},
                { title: 'No:of Resources Needed', field: 'resourcesNeeded', type: 'numeric' },
                {
                    title: 'Work Item Status',
                    field: 'status',
                    lookup: { 4: 'OverDue',
                              5: 'Done' ,
                              6:'InProgress' },
                }
            ],
            data:finalData.length>0 ? finalData : []
        }
    }

  /*  componentWillMount(){
        if(this.state.data.length >0){
            this.setState({data : localStorage.getItem('data')})
        }

    }*/
    render() {
        console.log(finalData , 'finalll dataaa');
        return(
            <div className="App">
                <header className="App-header">
                  <img src="https://www.zen3.com/wp-content/uploads/2019/04/zen3-logo.png" className="App-logo" alt="Zen3" />
                </header>
                <div className="mainSub">
                    <div>
                        <Grid container >
                            <Grid item xs={4}>
                                <h4>List Of Work Items</h4>
                            </Grid>
                            <Grid item xs={8}>
                            <p>No of work items : {this.state.data.length}</p>
                            </Grid>
                        </Grid>
                    </div>
                    <div className="buttonMain">
                        <Button variant="contained" color="primary">
                            Upload to google spread sheet
                        </Button>
                    </div>
                <div className="table-comp">
                    <MaterialTable
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
                                        });
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
                                            });
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
                                        });
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
