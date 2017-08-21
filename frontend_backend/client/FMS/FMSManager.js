import React, {Component} from 'react'
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import axios from 'axios'
import {url} from '../../config'
import {Redirect} from 'react-router-dom'
import {Grid, Row, Button, Form, FormGroup, FormControl, Col, ControlLabel} from 'react-bootstrap'

export default class FMSManager extends Component {

    constructor(props){
        super(props)
        this.state = {
            forms : [],
            shouldRedirect: false
        }
        let token = localStorage.getItem('token')
        axios.defaults.headers.common['Authorization'] = token
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
                   axios.delete(url+'/forms/recruitment/' + row.id).then(response => {
                       axios.get(url+'/forms/recruitment').then(response => {
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
        axios.get(url+'/forms/recruitment').then(response => {
            this.setState({
                forms: response.data
            })
        }).catch(error => {
            console.log('error: ', error)
        })
    }

    render(){
        if(this.state.shouldRedirect){
            return(
                <Redirect to={this.state.newUrl}/>
            )
        }
        let forms = this.state.forms
        return(
            <div>
                <Grid>
                    <Row className="show-grid">
                        <h1>Manage Forms</h1>
                    </Row>
                </Grid>
                
                <BootstrapTable data={forms} >
                    <TableHeaderColumn dataField="id" isKey={true} >Form ID</TableHeaderColumn> 
                    <TableHeaderColumn dataField="email" >Email</TableHeaderColumn>
                    <TableHeaderColumn dataField="position">Position</TableHeaderColumn>
                    <TableHeaderColumn dataField="status">Status</TableHeaderColumn>
                    <TableHeaderColumn dataField="created_at">Created at</TableHeaderColumn>
                    <TableHeaderColumn dataFormat={this.viewButton}>View</TableHeaderColumn>
                    <TableHeaderColumn dataFormat={(cell, row) => this.deleteButton(cell, row)}>Delete</TableHeaderColumn>
                </BootstrapTable>
            </div>
        )
    }
}