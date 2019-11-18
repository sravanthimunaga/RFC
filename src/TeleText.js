import React from 'react';
import './App.css';
//Jquery is used for uploading the list of work items data in spread sheet
import $ from 'jquery';
//Used for alignments
import Grid from '@material-ui/core/Grid';
//Component used for editable table with some ket features
import MaterialTable from 'material-table';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';


//Parent component of my project

class TeleText extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            customerReview:[]
        };
    }

    componentDidMount() {
        this.customerReview()
    }


    customerReview() {
                var jqxhr = $.ajax({
                    url: "https://contentservice.teletextholidays.co.uk/GetJsonService.svc/GetAllPublishedReviews?limit=6&startIndex=0&reviewType=all",
                    method: "GET",
                    dataType: "json",
                    success: function (result) {
                      console.log(result)
                        console.log(result ,'revirewww')
                    }
                });
            }


    render() {
        return (
            //Main div
            <div className="App">
                <header className="teletext-header">
                    <Grid container>
                        <Grid item xs={4}>
                            <img src="https://resources.teletextholidays.co.uk/drupal/images/icons/teletext-holidays-logo.svg" className="App-logo"
                                 alt="Zen3" style={{height:"50px"}}/>
                        </Grid>
                        <Grid item xs={8}>
                            <div className="navbar">
                                <div className="dropdown">
                                    <button className="dropbtn">HOLIDAYS
                                        <i className="fa fa-caret-down"></i>
                                    </button>
                                    <div className="dropdown-content">
                                        <a href="#">Link 1</a>
                                        <a href="#">Link 2</a>
                                        <a href="#">Link 3</a>
                                    </div>
                                </div>
                                <a href="#home">CHEAP HOLIDAYS</a>
                                <a href="#news">ALL INCLUSIVE </a>
                                <a href="#news">LAST MINUTE </a>

                                <div className="dropdown">
                                    <button className="dropbtn">DESTINATIONS
                                        <i className="fa fa-caret-down"></i>
                                    </button>
                                    <div className="dropdown-content">
                                        <a href="#">Link 1</a>
                                        <a href="#">Link 2</a>
                                        <a href="#">Link 3</a>
                                    </div>
                                </div>
                                <a href="#news">BLOG</a>
                                <i className="fa fa-caret-down"></i>
                            </div>
                        </Grid>
                    </Grid>
                </header>
                <div className="sub-menu">
                    <Grid container>
                        <Grid item xs={4}>
                            <ul>
                                <li>  <img src="https://resources.teletextholidays.co.uk/drupal/images/live/atol-logo.svg" className="App-logo"
                                           alt="Zen3" style={{height:"20px",width:"20px"}}/>
                                    <span>ATOL protected</span></li>
                                <li style={{borderRight:"1px" }}>  <img src="https://resources.teletextholidays.co.uk/drupal/images/live/tta-logo.svg" className="App-logo"
                                           alt="Zen3" style={{height:"20px",width:"20px"}}/>
                                    <span>TTA Protected protected</span></li>
                            </ul>

                        </Grid>
                        <Grid item xs={8}>
                            <div className="navbar">
                                <ul>
                                    <li>
                                        <span style={{Color:"violet", fontSize:"18px"}}>call now to book your holiday</span></li>
                                    <li style={{borderRight:"1px" }}>
                                        <span style={{Color:"violet",fontSize:"18px"}}>0196 278 3685</span></li>
                                </ul>
                            </div>
                        </Grid>
                    </Grid>
                </div>
                <div className="banner">
                    <img src="https://resources.teletextholidays.co.uk/drupal/images/default-banners/hp/1970-header.png"></img>
                </div>
                <div className="main-sec">
                    <Grid container>
                        <Grid item xs={4} style={{textAlign:"right"}}>
                            <img src="https://resources.teletextholidays.co.uk/drupal/images/homepage/banners/v77/wintersun.jpg"></img>

                        </Grid>

                        <Grid item xs={4}>
                            <img src="https://resources.teletextholidays.co.uk/drupal/images/homepage/banners/v77/wintersun.jpg"></img>
                        </Grid>

                        <Grid item xs={4} style={{textAlign:"left"}}>
                            <img src="https://resources.teletextholidays.co.uk/drupal/images/homepage/banners/v77/wintersun.jpg"></img>
                        </Grid>
                    </Grid>
                </div>
                <div className="review">
                    <Grid container>
                        <Grid item xs={4} style={{textAlign:"right"}}>
                          <div className="card">
                              <p>customer 1</p>

                          </div>

                        </Grid>

                        <Grid item xs={4}>
                            <div className="card">
                                <p>customer 1</p>

                            </div>
                        </Grid>

                        <Grid item xs={4} style={{textAlign:"left"}}>
                            <p>customer 1</p>
                        </Grid>
                    </Grid>

                </div>
            </div>
        );
    }
}


export default TeleText;
