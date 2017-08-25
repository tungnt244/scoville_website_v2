import React, {Component} from 'react'
import {api_url} from '../../config'
import axios from 'axios'
import {Grid, Row, DropdownButton, MenuItem, Button, Form, FormGroup, FormControl, Col, ControlLabel} from 'react-bootstrap'
import {Redirect} from 'react-router-dom'

const CONTACT_STATUS = {
    0 : 'Not Processed',
    1 : 'Processing',
    2 : 'Processed'
}

const CONTACT_API_URL = api_url+'/forms/contact'

export default class CFMSForm extends Component{
    constructor(props){
        super(props)
        this.state = {
            shouldRedirect: false
        }
        let token = localStorage.getItem("token")
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
    }

    componentDidMount(){
        if(this.props.match.params.id){
            axios.get(CONTACT_API_URL + '/'+this.props.match.params.id).then(response => {
                let {id, company_name, staff_name, email_address, phone_number, description_of_contact, status, created_at} = response.data
                let status_key
                if(status == 'Not Processed')
                    status_key = 0
                else if(status == 'Processing')
                    status_key = 1
                else status_key = 2
                this.setState({id, company_name, staff_name, email_address, phone_number, description_of_contact, status, created_at,status_key})
            }).catch(error => {
                console.log('error: ', error)
            })
        }
    }
    
    changeStatus(key, e){
        this.setState({
            status_key: key
        })  
    }

    saveContact (e){
        axios.put(CONTACT_API_URL + '/' + this.state.id, {
            status: CONTACT_STATUS[this.state.status_key]
        }).then(response => {
            alert('Successful updated')
            console.log('response', response)
        }).catch(error => {
            console.log('error: ', error)
        })
    }

    render(){
        let contact = this.state
        if(this.state.shouldRedirect){
            return(
                <Redirect to={this.state.newUrl}/>
            )
        }
        if(contact){
            return(
                <div className="user-manager">
                    <Form horizontal>
                        <FormGroup>
                            <Col componentClass={ControlLabel} sm={2}>
                            {'Id: '}
                            </Col>
                            <Col sm={6}>
                            <FormControl type="text" placeholder="Id" value={contact.id} readOnly={true}/>
                            </Col>
                        </FormGroup>
                        <FormGroup>
                            <Col componentClass={ControlLabel} sm={2}>
                            {'Company: '}
                            </Col>
                            <Col sm={6}>
                            <FormControl type="text" placeholder="Company" value={contact.company_name} readOnly={true}/>
                            </Col>
                        </FormGroup>
                        <FormGroup>
                            <Col componentClass={ControlLabel} sm={2}>
                            {'Name: '}
                            </Col>
                            <Col sm={6}>
                            <FormControl type="text" placeholder="Name" value={contact.staff_name} readOnly={true}/>
                            </Col>
                        </FormGroup>
                        <FormGroup>
                            <Col componentClass={ControlLabel} sm={2}>
                            {"Email address: "}
                            </Col>
                            <Col sm={6}>
                            <FormControl type="text" placeholder="Email address" value={contact.email_address} readOnly={true}/>
                            </Col>
                        </FormGroup>
                        <FormGroup>
                            <Col componentClass={ControlLabel} sm={2}>
                            {'Phone: '}
                            </Col>
                            <Col sm={6}>
                            <FormControl type="text" placeholder="Phone" value={contact.phone_number} readOnly={true}/>
                            </Col>
                        </FormGroup>
                        <FormGroup>
                            <Col componentClass={ControlLabel} sm={2}>
                            {'Description: '}
                            </Col>
                            <Col sm={6}>
                            <FormControl type="text" placeholder="Description" value={contact.description_of_contact} readOnly={true}/>
                            </Col>
                        </FormGroup>
                        <FormGroup>
                            <Col componentClass={ControlLabel} sm={2}>
                            {'Created at: '}
                            </Col>
                            <Col sm={6}>
                            <FormControl type="text" placeholder="Created at" value={contact.created_at} readOnly={true}/>
                            </Col>
                        </FormGroup>
                        <FormGroup>
                            <Col componentClass={ControlLabel} sm={2}>
                            {'Status: '}
                            </Col>
                            <Col sm={6}>
                            <DropdownButton onSelect={(key, e) => {this.changeStatus(key,e)}} title={CONTACT_STATUS[contact.status_key]} id="bg-nested-dropdown">
                                <MenuItem eventKey="0">Not processed</MenuItem>
                                <MenuItem eventKey="1">Processing</MenuItem>
                                <MenuItem eventKey="2">Processed</MenuItem>
                            </DropdownButton>
                            </Col>
                        </FormGroup>
                        <FormGroup>
                            <Col componentClass={ControlLabel} sm={2}>
                            <Button bsStyle="success" onClick={(e) => this.saveContact(e)}>Save</Button>
                            </Col>
                            <Col componentClass={ControlLabel} sm={2}>
                            <Button bsStyle="danger" onClick={() =>this.setState({
                                shouldRedirect: true,
                                newUrl: '/admin/contacts'
                                })}>Discard</Button>
                            </Col>
                        </FormGroup>
                    </Form>
                </div>
            )}
        else{
            return(<div>wait a minute</div>)
        }
    }
}