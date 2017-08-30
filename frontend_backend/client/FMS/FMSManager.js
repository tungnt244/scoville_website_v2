import React, {Component} from 'react'
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import axios from 'axios'
import {api_url} from '../../config'
import {Redirect} from 'react-router-dom'
import {Grid, Row, Button} from 'react-bootstrap'

export default class FMSManager extends Component {

    constructor(props){
        super(props)
        this.state = {
            forms : [],
            shouldRedirect: false
        }
        let token = localStorage.getItem('token')
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
    }

    viewButton = (cell, row) => {
        return (
        <Button bsStyle="primary"
            onClick={ () => {
                this.setState({
                    shouldRedirect: true,
                    newUrl: '/admin/forms/' + row.id
                })
            } }
        >View</Button>
        );
    }

    deleteButton(cell, row) {
        return(
            <Button bsStyle="danger"
                onClick={()=>{
                   axios.delete(api_url+'/forms/recruitment/' + row.id).then(response => {
                       axios.get(api_url+'/forms/recruitment').then(response => {
                            this.setState({
                                forms: response.data
                            })
                        }).catch(error => {
                            console.log('error: ', error)
                        })
                   }).catch(err => {
                       console.log("err: ", err)
                   })
                }}
            >Delete</Button>
        )
    }

    componentDidMount(){
        axios.get(api_url+'/forms/recruitment').then(response => {
            this.setState({
                forms: response.data
            })
        }).catch(error => {
            console.log('error: ', error)
        })
    }

    dayFormat = (cell, row) => {
        let date = new Date(cell)
        let dateFormat = `${date.getDay()}-${date.getMonth()}-${date.getFullYear()}`
        return dateFormat
    }

    render(){
        if(this.state.shouldRedirect){
            return(
                <Redirect to={this.state.newUrl}/>
            )
        }
        let forms = this.state.forms
        return(
            <div className="container">
                <Grid>
                    <Row className="show-grid">
                        <h1>Manage Forms</h1>
                    </Row>
                </Grid>
                
                <BootstrapTable data={forms} search hover exportCSV>
                    <TableHeaderColumn width="5%" dataSort dataField="id" isKey={true} >ID</TableHeaderColumn> 
                    <TableHeaderColumn dataSort dataField="email" >Email</TableHeaderColumn>
                    <TableHeaderColumn dataSort dataField="position">Position</TableHeaderColumn>
                    <TableHeaderColumn dataSort dataField="status">Status</TableHeaderColumn>
                    <TableHeaderColumn dataSort dataField="created_at" dataFormat={this.dayFormat}>Created at</TableHeaderColumn>
                    <TableHeaderColumn width="10%" dataFormat={this.viewButton}>View</TableHeaderColumn>
                    <TableHeaderColumn width="10%" dataFormat={(cell, row) => this.deleteButton(cell, row)}>Delete</TableHeaderColumn>
                </BootstrapTable>
            </div>
        )
    }
}