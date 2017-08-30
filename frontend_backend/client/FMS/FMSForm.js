import React, {Component} from 'react'
import {api_url} from '../../config'
import axios from 'axios'
import {DropdownButton, MenuItem, Button, Form, FormGroup, FormControl, Col, ControlLabel} from 'react-bootstrap'
import {Redirect} from 'react-router-dom'

const FORM_STATUS = {
    0 : 'Not Processed',
    1 : 'Processing',
    2 : 'Processed'
}

export default class FMSForm extends Component{
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
            axios.get(api_url +'/forms/recruitment/'+this.props.match.params.id).then(response => {
                let {id, email, self_pr, link_github, position, status, CreateAt} = response.data
                let status_key
                if(status == 'Not Processed')
                    status_key = 0
                else if(status == 'Processing')
                    status_key = 1
                else status_key = 2
                this.setState({
                    id: id,
                    email: email,
                    self_pr: self_pr,
                    link_github: link_github,
                    position: position,
                    status_key: status_key,
                    created_at: created_at,
                })
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

    saveForm (e){
        axios.put(api_url + '/forms/recruitment/' + this.state.id, {
            status: FORM_STATUS[this.state.status_key]
        }).then(response => {
            alert('Successful updated')
        }).catch(error => {
            console.log('error: ', error)
        })
    }

    render(){
        let form = this.state
        if(this.state.shouldRedirect){
            return(
                <Redirect to={this.state.newUrl}/>
            )
        }
        if(form){
            return(
                <div className="user-manager">
                    <Form horizontal>
                        <FormGroup>
                            <Col componentClass={ControlLabel} sm={2}>
                            {'Id: '}
                            </Col>
                            <Col sm={6}>
                            <FormControl type="text" placeholder="Id" value={form.id} readOnly={true}/>
                            </Col>
                        </FormGroup>
                        <FormGroup>
                            <Col componentClass={ControlLabel} sm={2}>
                            {'Email: '}
                            </Col>
                            <Col sm={6}>
                            <FormControl type="text" placeholder="Email" value={form.email} readOnly={true}/>
                            </Col>
                        </FormGroup>
                        <FormGroup>
                            <Col componentClass={ControlLabel} sm={2}>
                            {'Self presentation: '}
                            </Col>
                            <Col sm={6}>
                            <FormControl type="text" placeholder="Presentation" value={form.self_pr} readOnly={true}/>
                            </Col>
                        </FormGroup>
                        <FormGroup>
                            <Col componentClass={ControlLabel} sm={2}>
                            {"Github's link: "}
                            </Col>
                            <Col sm={6}>
                            <FormControl type="text" placeholder="Github's link" value={form.link_github} readOnly={true}/>
                            </Col>
                        </FormGroup>
                        <FormGroup>
                            <Col componentClass={ControlLabel} sm={2}>
                            {'Position: '}
                            </Col>
                            <Col sm={6}>
                            <FormControl type="text" placeholder="Position" value={form.position} readOnly={true}/>
                            </Col>
                        </FormGroup>
                        <FormGroup>
                            <Col componentClass={ControlLabel} sm={2}>
                            {'Status: '}
                            </Col>
                            <Col sm={6}>
                            <DropdownButton onSelect={(key, e) => {this.changeStatus(key,e)}} title={FORM_STATUS[form.status_key]} id="bg-nested-dropdown">
                                <MenuItem eventKey="0">Not processed</MenuItem>
                                <MenuItem eventKey="1">Processing</MenuItem>
                                <MenuItem eventKey="2">Processed</MenuItem>
                            </DropdownButton>
                            </Col>
                        </FormGroup>
                        <FormGroup>
                            <Col componentClass={ControlLabel} sm={2}>
                            <Button bsStyle="success" onClick={(e) => this.saveForm(e)}>Save</Button>
                            </Col>
                            <Col componentClass={ControlLabel} sm={2}>
                            <Button bsStyle="danger" onClick={() =>this.setState({
                                shouldRedirect: true,
                                newUrl: '/admin/forms'
                                })}>Back to FMS</Button>
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