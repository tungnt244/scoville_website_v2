import React, {Component} from 'react'
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import axios from 'axios'
import {url} from '../../config'
import {Grid, Row, Button, Form, FormGroup, FormControl, Col, ControlLabel} from 'react-bootstrap'
import {Redirect} from 'react-router-dom'

export default class CMSManager extends Component {

    constructor(props){
        super(props)
        this.state = {
            articles : [],
            shouldRedirect: false,
        }
    }

    editButton = (cell, row) => {
        return (
        <Button bsStyle="primary"
            onClick={ () => {
                this.setState({
                    shouldRedirect: true,
                    newurl: '/admin/cms/editor/' + row.id
                })
            } }
        >Edit</Button>
        );
    }

    deleteButton(cell, row) {
        return(
            <Button bsStyle="danger"
                onClick={()=>{
                    axios.delete(url +'/cms/news/'+row.id).then(response => {
                        axios.get(url +'/cms/news/brief').then(response => {
                            this.setState({
                                articles: response.data
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
        let token = localStorage.getItem('token')
        axios.get(url +'/cms/news/brief', {
            headers: {
                'Content-Type': 'application/json', 
                'Authorization': token
            }
        }).then(response => {
            this.setState({
                articles: response.data
            })
        }).catch(error => {
            console.log('error: ', error)
        })
    }

    render(){
        let articles = this.state.articles
        if(this.state.shouldRedirect){
            return <Redirect to={this.state.newurl}/>
        }
        return(
            <div>
                <Grid>
                    <Row className="show-grid">
                        <h1>Manage Articles</h1>
                    </Row>
                    <Row className="show-grid">
                        <Button bsStyle="success" onClick={()=>{
                        this.setState({
                            shouldRedirect: true,
                            newurl: '/admin/cms/editor'
                        })
                        }}>Create</Button>
                    </Row>
                </Grid>
                
                <BootstrapTable data={articles} >
                    <TableHeaderColumn dataField="id" isKey={true} >Article ID</TableHeaderColumn> 
                    <TableHeaderColumn dataField="title" >Title</TableHeaderColumn>
                    <TableHeaderColumn dataField="description">Description</TableHeaderColumn>
                    <TableHeaderColumn dataFormat={this.editButton}>Edit</TableHeaderColumn>
                    <TableHeaderColumn dataFormat={(cell,row) => this.deleteButton(cell, row)}>Delete</TableHeaderColumn>
                </BootstrapTable>
            </div>
        )
    }
}