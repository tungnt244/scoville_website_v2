import React, { Component } from 'react';
import TinyMCE from 'react-tinymce';
import {api_url} from '../../config';
import axios from 'axios';
import {Redirect} from 'react-router-dom'
import {Button, Form, FormGroup, FormControl, Col, ControlLabel} from 'react-bootstrap'

export default class CMSEditor extends Component {
  constructor(props){
    super(props)
    this.state = {
      title: 'Title',
      content: '',
      avatar: 'http://animals.sandiegozoo.org/sites/default/files/2016-12/Wolf_ZN.jpg',
      description: 'Short description',
      isEdit: false,
      shouldRedirect: false
    }
    let token = localStorage.getItem('token')
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
  }

  componentDidMount(){
    if(this.props.match.params.id){
      axios.get(api_url +'/news/'+this.props.match.params.id).then(response => {
        let {content, description, id, picture, title} = response.data
        this.setState({
          id: id,
          title: title,
          content: content,
          avatar: picture,
          description: description,
          isEdit: true
        })
      }).catch(error => {
        console.log('error: ', error)
      })
    }
  }

  handleEditorChange = (e) => {
    this.setState({
      content: e.target.getContent()
    })
  }

  saveNews = (e) => {
    if(this.state.isEdit){
      axios.put(api_url +'/news/' + this.state.id, {
        Title: this.state.title,
        Content: this.state.content,
        Picture: this.state.avatar,
        Description: this.state.description
      }).then(response => {
        this.setState({
          shouldRedirect: true,
        })
      }).catch(error => {
        console.log('error: ', error)
      })
    }
    else{
      axios.post(api_url + '/news', {
        Title: this.state.title,
        Content: this.state.content,
        Picture: this.state.avatar,
        Description: this.state.description
      }).then(response => {
        this.setState({
          shouldRedirect: true
        })
      }).catch(error => {
        console.log('error: ', error)
      })
    }
  }

  changeTitle = (e) => {
    this.setState({
      title: e.target.value
    })
  }

  changeDescription = (e) => {
    this.setState({
      description: e.target.value
    })
  }

  changeAvatar = (e) => {
    this.setState({
      avatar: e.target.value
    })
  }

  getTinyMCE(content=""){
    return (
      <TinyMCE
        content={content}
        config={{
          plugins: 'link image code textcolor colorpicker',
          toolbar: 'undo redo | bold italic underline | fontselect fontsizeselect forecolor backcolor | alignleft aligncenter alignright | code | link image',
          width: '100%',
          height: 400,
          autoresize_min_height: 400,
          autoresize_max_height: 800,
        }}
        onChange={this.handleEditorChange}
      />
    )
  }

  render() {
    if(this.state.shouldRedirect){
      return <Redirect to='/admin/cms'/>
    }
    return (
      <div className="TinyMCE container user-manager">
        <Form horizontal>
          <FormGroup>
            <Col componentClass={ControlLabel} sm={2}>
              {'Title: '}
            </Col>
            <Col sm={6}>
              <FormControl type="text" placeholder="Email" value={this.state.title} onChange={this.changeTitle}/>
            </Col>
          </FormGroup>
          <FormGroup>
            <Col componentClass={ControlLabel} sm={2}>
              {'Description: '}
            </Col>
            <Col sm={6}>
              <FormControl type="text" placeholder="Description" value={this.state.description} onChange={this.changeDescription}/>
            </Col>
          </FormGroup>
          <FormGroup>
            <Col componentClass={ControlLabel} sm={2}>
              {'Picture: '}
            </Col>
            <Col sm={6}>
              <FormControl type="text" placeholder="Picture" value={this.state.avatar} onChange={this.changeAvatar}/>
            </Col>
          </FormGroup>
          <FormGroup>
            <Col componentClass={ControlLabel} sm={2}>
              <Button bsStyle="success" onClick={this.saveNews}>Save</Button>
            </Col>
            <Col componentClass={ControlLabel} sm={2}>
              <Button bsStyle="danger" onClick={()=>{this.setState({shouldRedirect: true})}}>Discard</Button>
            </Col>
          </FormGroup>
        </Form>
        {this.state.isEdit &&
          this.getTinyMCE(this.state.content)
        }{!this.state.isEdit && 
          this.getTinyMCE()
        } 
      </div>
    );
  }
}
