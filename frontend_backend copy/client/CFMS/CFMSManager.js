import React, {Component} from 'react'
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import axios from 'axios'
import {api_url} from '../../config'
import {Redirect} from 'react-router-dom'
import {Grid, Row, Button, Form, FormGroup, FormControl, Col, ControlLabel} from 'react-bootstrap'

const CONTACT_API_URL = api_url+'/forms/contact'

export default class CFMSManager extends Component {

    constructor(props){
        super(props)
        this.state = {
            contacts : [],
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
                    newUrl: '/admin/contacts/' + row.id
                })
            } }
        >View</Button>
        );
    }

    deleteButton(cell, row) {
        return(
            <Button bsStyle="danger"
                onClick={()=>{
                   axios.delete(CONTACT_API_URL +'/'+ row.id).then(response => {
                       axios.get(CONTACT_API_URL).then(response => {
                            this.setState({
                                contacts: response.data
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
        axios.get(CONTACT_API_URL).then(response => {
            let date = new Date(response.data[0].created_at)
            this.setState({
                contacts: response.data
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
        let contacts = this.state.contacts
        return(
            <div className="container">
                <Grid>
                    <Row className="show-grid">
                        <h1>Manage Contact</h1>
                    </Row>
                </Grid>
                
                <BootstrapTable data={contacts} search hover exportCSV>
                    <TableHeaderColumn width="5%" dataSort dataField="id" isKey={true} >ID</TableHeaderColumn> 
                    <TableHeaderColumn dataSort dataField="company_name" >Company</TableHeaderColumn>
                    <TableHeaderColumn dataSort dataField="staff_name">Staff</TableHeaderColumn>
                    <TableHeaderColumn dataSort dataField="status">Status</TableHeaderColumn>
                    <TableHeaderColumn dataSort dataField="created_at" dataFormat={this.dayFormat}>Created at</TableHeaderColumn>
                    <TableHeaderColumn width="10%" dataFormat={this.viewButton}>View</TableHeaderColumn>
                    <TableHeaderColumn width="10%" dataFormat={(cell, row) => this.deleteButton(cell, row)}>Delete</TableHeaderColumn>
                </BootstrapTable>
            </div>
        )
    }
}