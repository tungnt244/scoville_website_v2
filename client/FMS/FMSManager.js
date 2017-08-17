import React, {Component} from 'react'
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import axios from 'axios'
import {api_url} from '../../config'
import {browserHistory} from 'react-router'
import {Grid, Row, Button, Form, FormGroup, FormControl, Col, ControlLabel} from 'react-bootstrap'

export default class FMSManager extends Component {

    constructor(props){
        super(props)
        this.state = {
            forms : []
        }
    }

    viewButton = (cell, row) => {
        return (
        <Button bsStyle="primary"
            onClick={ () => {
                browserHistory.push('/admin/forms/' + row.id)
            } }
        >View</Button>
        );
    }

    deleteButton(cell, row) {
        return(
            <Button bsStyle="danger"
                onClick={()=>{
                    axios.delete(api_url +'/users/'+row.ID).then(response => {
                        axios.get(url +'/users').then(response => {
                            this.setState({
                                users: response.data
                            })
                        }).catch(error => {
                            console.log('error: ', error)
                        })  
                    }).catch(error => {
                        console.log('error: ', error)
                    })
                }}
            >Delete</Button>
        )
    }

    componentDidMount(){
        axios.get(api_url +'/forms/recruitment').then(response => {
            console.log('data', response.data)
            this.setState({
                forms: response.data
            })
        }).catch(error => {
            console.log('error: ', error)
        })
    }

    render(){
        let forms = this.state.forms
        return(
            <div>
                <Grid>
                    <Row className="show-grid">
                        <h1>Manage Forms</h1>
                    </Row>
                    {/* <Row className="show-grid">
                        <Button bsStyle="success" onClick={()=>{
                        browserHistory.push('/admin/users/create')
                        }}>Create</Button>
                    </Row>
                    <Row className="show-grid">
                        <Button bsStyle="primary" onClick={()=>{
                        browserHistory.push('/admin/cms')
                        }}>CMS Manager</Button>
                    </Row> */}
                </Grid>
                
                <BootstrapTable data={forms} >
                    <TableHeaderColumn dataField="id" isKey={true} >Form ID</TableHeaderColumn> 
                    <TableHeaderColumn dataField="email" >Email</TableHeaderColumn>
                    <TableHeaderColumn dataField="position">Position</TableHeaderColumn>
                    <TableHeaderColumn dataField="status">Status</TableHeaderColumn>
                    <TableHeaderColumn dataField="CreatedAt">Created at</TableHeaderColumn>
                    <TableHeaderColumn dataFormat={this.viewButton}>View</TableHeaderColumn>
                    {/* <TableHeaderColumn dataFormat={this.editButton}>Edit</TableHeaderColumn> */}
                    {/* <TableHeaderColumn dataFormat={(cell,row) => this.deleteButton(cell, row)}>Delete</TableHeaderColumn> */}
                </BootstrapTable>
            </div>
        )
    }
}