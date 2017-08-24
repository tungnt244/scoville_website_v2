import React, { Component } from 'react';
import TinyMCE from 'react-tinymce';
import {api_url} from '../../config';
import axios from 'axios';
import {Button, Form, FormGroup, FormControl, Col, ControlLabel} from 'react-bootstrap'
import {Redirect} from 'react-router-dom'
export default class CMSEditor extends Component {
  constructor(props){
    super(props)
    this.state = {
            email: '',
            oldPassword: '',
            newPassword: '',
            isEdit: false,
            shouldRedirect: false
        }
        let token = localStorage.getItem("token")
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`
    }

    componentDidMount(){
        if(this.props.params.id){
            this.setState({
                id: this.props.params.id,
                isEdit: true
            })
        }
    }

    saveUser = (e) => {
        if(this.state.isEdit){
        axios.put(api_url +'/users/' + this.state.id, {
            Email: this.state.email,
            Password: this.state.newPassword
        }).then(response => {
            this.setState({
                shouldRedirect: true
            })
        }).catch(error => {
            console.log('error: ', error)
        })
        }
        else{
        axios.post(api_url + '/users', {
            Email: this.state.email,
            Password: this.state.oldPassword
        }).then(response => {
            this.setState({
                shouldRedirect:true
            })
        }).catch(error => {
            alert(error.response.data)
            console.log('error: ', error.response)
        })
        }
    }

    changeEmail = (e) => {
        this.setState({
        email: e.target.value
        })
    }

    changeOldPassword = (e) => {
        this.setState({
            oldPassword: e.target.value
        })
    }

    changeNewPassword = (e) => {
        this.setState({
            newPassword: e.target.value
        })
    }

    render() {
        if(this.state.shouldRedirect){
            return(
                <Redirect to='/admin/users'/>
            )
        }
        return (
        <div className="user-manager">
            <Form horizontal>
                {!this.state.isEdit &&
                <FormGroup>
                    <Col componentClass={ControlLabel} sm={2}>
                    {'Email: '}
                    </Col>
                    <Col sm={6}>
                    <FormControl type="text" placeholder="Email@gmail.com" value={this.state.email} onChange={this.changeEmail}/>
                    </Col>
                </FormGroup>
                }
                <FormGroup>
                    <Col componentClass={ControlLabel} sm={2}>
                    {'Password: '}
                    </Col>
                    <Col sm={6}>
                    <FormControl type="password" placeholder="Password" value={this.state.oldPassword} onChange={this.changeOldPassword}/>
                    </Col>
                </FormGroup>
                {this.state.isEdit && 
                <FormGroup>
                    <Col componentClass={ControlLabel} sm={2}>
                    {'New Password: '}
                    </Col>
                    <Col sm={6}>
                    <FormControl type="password" placeholder="Password" value={this.state.newPassword} onChange={this.changeNewPassword}/>
                    </Col>
                </FormGroup>
                }
                <FormGroup id="save-button">
                    <Col componentClass={ControlLabel} sm={2}>
                    <Button bsStyle="success" onClick={this.saveUser}>Save</Button>
                    </Col>
                    <Col componentClass={ControlLabel} sm={2}>
                    <Button bsStyle="danger" onClick={()=>{this.setState({shouldRedirect: true})}}>Discard</Button>
                    </Col>
                </FormGroup>
            </Form> 
        </div>
        );
    }
}
