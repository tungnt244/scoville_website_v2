import React, {Component} from 'react'
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import axios from 'axios'
import {api_url} from '../../config'
import {Grid, Row, Button} from 'react-bootstrap'
import {Redirect} from 'react-router-dom'

export default class CMSManager extends Component {

    constructor(props){
        super(props)
        this.state = {
            articles : [],
            shouldRedirect: false,
        }
        let token = localStorage.getItem('token')
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
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
                    axios.delete(api_url +'/news/'+row.id).then(response => {
                        axios.get(api_url +'/news/brief').then(response => {
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
    
    dayFormat = (cell, row) => {
        let date = new Date(cell)
        let dateFormat = `${date.getDay()}-${date.getMonth()}-${date.getFullYear()}`
        return dateFormat
    }

    componentDidMount(){
        
        axios.get(api_url +'/news/brief').then(response => {
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
            <div className="container">
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
                <br/>
                <BootstrapTable data={articles} search hover >
                    <TableHeaderColumn width="5%" dataField="id" isKey={true} dataSort>ID</TableHeaderColumn> 
                    <TableHeaderColumn dataSort dataField="title" dataSort>Title</TableHeaderColumn>
                    <TableHeaderColumn dataSort dataField="description">Description</TableHeaderColumn>
                    <TableHeaderColumn dataSort dataField="created_at" dataFormat={this.dayFormat}>Created at</TableHeaderColumn>
                    <TableHeaderColumn width="10%" dataFormat={this.editButton}>Edit</TableHeaderColumn>
                    <TableHeaderColumn width="10%" dataFormat={(cell,row) => this.deleteButton(cell, row)}>Delete</TableHeaderColumn>
                </BootstrapTable>
            </div>
        )
    }
}