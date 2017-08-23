import React, {Component} from 'react'
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import axios from 'axios'
import {api_url} from '../../config'
import {browserHistory} from 'react-router'
import {Grid, Row, Button, Form, FormGroup, FormControl, Col, ControlLabel} from 'react-bootstrap'
import {Redirect} from 'react-router-dom'

export default class CMSManager extends Component {

    constructor(props){
        super(props)
        this.state = {
            users : [],
            shouldRedirect: false
        }
        let token = localStorage.getItem("token")
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}` 
    }

    editButton = (cell, row) => {
        return (
        <Button bsStyle="primary"
            onClick={ () => {
                this.setState({
                    shouldRedirect: true,
                    newurl: '/admin/users/' + row.ID
                })
            } }
        >Edit</Button>
        );
    }

    deleteButton(cell, row) {
        return(
            <Button bsStyle="danger"
                onClick={()=>{
                    axios.delete(api_url +'/users/'+row.ID).then(response => {
                        axios.get(api_url +'/users').then(response => {
                            this.setState({
                                users: response.data
                            })
                        }).catch(error => {
                            console.log('error: ', error.response.data)
                        })  
                    }).catch(error => {
                        console.log('error: ', error.response.data)
                    })
                }}
            >Delete</Button>
        )
    }

    componentDidMount(){
        axios.get(api_url +'/users').then(response => {
            this.setState({
                users: response.data
            })
        }).catch(error => {
            console.log('error: ', error.response.data)
        })
    }

    dayFormat = (cell, row) => {
        let date = new Date(cell)
        let dateFormat = `${date.getDay()}-${date.getMonth()}-${date.getFullYear()}`
        return dateFormat
    }

    render(){
        let users = this.state.users
        if(this.state.shouldRedirect){
            return <Redirect to={this.state.newurl}/>
        }
        return(
            <div>
                <Grid>
                    <Row className="show-grid">
                        <h1>Manage Users</h1>
                    </Row>
                    <Row className="show-grid">
                        <Button bsStyle="success" onClick={()=>{
                            this.setState({shouldRedirect: true, newurl: '/admin/users/create'})
                        }}>Create</Button>
                    </Row>
                    <Row>
                        <BootstrapTable data={users} search hover >
                            <TableHeaderColumn dataSort width="5%" dataField="ID" isKey={true} >ID</TableHeaderColumn> 
                            <TableHeaderColumn dataSort dataField="email" >Email</TableHeaderColumn>
                            <TableHeaderColumn dataSort dataField="CreatedAt" dataFormat={this.dayFormat}>Created at</TableHeaderColumn>
                            <TableHeaderColumn width="10%" dataFormat={this.editButton}>Edit</TableHeaderColumn>
                            <TableHeaderColumn width="10%" dataFormat={(cell,row) => this.deleteButton(cell, row)}>Delete</TableHeaderColumn>
                        </BootstrapTable>
                    </Row>
                </Grid>
            </div>
        )
    }
}