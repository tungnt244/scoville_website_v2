import React from  'react'
import axios from 'axios';
import {api_url} from '../../config';

export default class Navbar extends React.Component{
    constructor(props) {
      super(props);
      this.state = {company: '',staff: '',email: '', number: '', description: ''};
      this.handleChangeCompanyName = this.handleChangeCompanyName.bind(this);
      this.handleChangeStaffName = this.handleChangeStaffName.bind(this);
      this.handleChangeEmail = this.handleChangeEmail.bind(this);
      this.handleChangeNumber = this.handleChangeNumber.bind(this);
      this.handleChangeDescription = this.handleChangeDescription.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleSubmit(event) {
      console.log(this.state.company);
      axios.post(api_url + '/forms/contact', {
          company_name: this.state.company,
          staff_name: this.state.staff,
          email_address: this.state.email,
          phone_number: this.state.number,
          description_of_contact: this.state.description,
      })
        .then(function (response) {
          console.log(response);
          alert('thank you for contacting us');
        })
        .catch(function (error) {
          console.log(error);
        });
        this.setState({company: '', staff:'', email:'', number:'', description:''});
    }
      handleChangeCompanyName(event) {
        this.setState({company: event.target.value});
      }
      handleChangeStaffName(event) {
        this.setState({staff: event.target.value});
      }
      handleChangeEmail(event) {
        this.setState({email: event.target.value});
      }
      handleChangeNumber(event) {
        this.setState({number: event.target.value});
      }
      handleChangeDescription(event) {
        this.setState({description: event.target.value});
      }
    render(){
        return(
            <div>
                <div>
                    <img className="img-responsive" id="mainimage" src="/images/mainpic.png" alt="cannot load image" />
                </div>
                <nav className="navbar navbar-inverse" id="my-navbar">
                    <div id="nav-container" className="container-fluid">
                        <div>
                            <button type="button" className="navbar-toggle" data-toggle="collapse" data-target="#navbar-collapse">  
                                <span className="icon-bar"></span>
                                <span className="icon-bar"></span>
                                <span className="icon-bar"></span>
                            </button>
                        </div>
                        <a id="logo-container" className="navbar-brand scroll" >
                            <img className="img-responsive" id="logo" src="./images/logo.png" title="" />
                        </a>
                        <div className="collapse navbar-collapse" id="navbar-collapse">
                            <ul className="nav navbar-nav navbar-right">
                                <li ><a className="big-word text-right" href="">HOME/ </a></li>
                                <li ><a className="big-word text-right" href="#COMPANY">COMPANY/ </a></li>
                                <li ><a className="big-word text-right" href="#SERVICES">SERVICES/ </a></li>
                                <li ><a className="big-word text-right" href="#RECRUITMENT">RECRUITMENT/ </a></li>
                                <li ><a className="big-word text-right" href="#NEWS">NEWS/ </a></li>
                                <li ><a id="right-nav" className="big-word text-right" href="#ACCESS">ABOUT</a></li>
                                <li id="li-button">
                                    <button type="button" id="contact-button" className="btn btn-danger" data-toggle="modal" data-target="#contact-form">
                                        <p id="contact-word">
                                          お問い合わせ
                                        </p>
                                    </button>
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>
                {/* <!-- end of navbar --> */}

                {/* <!-- CONTACT form --> */}
                <div className="modal fade" id="contact-form" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                              <h2 className="text-center modal-title" id="exampleModalLabel">Contact</h2>
                              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                              </button>
                            </div>
                            <div className="modal-body">
                              <form action="" className="form-horizontal" onSubmit={this.handleSubmit}>
                                <div className="form-group">
                                    <label className="contact-text">
                                      御社名
                                    </label>
                                    <input type="text" id="company-name" value={this.state.company} onChange={this.handleChangeCompanyName} className="form-control grey-form" placeholder="会社名を記入してください"/>
                                </div>
                                <div className="form-group">
                                    <label className="contact-text">
                                      ご担当者名
                                    </label>
                                    <input type="text" id="staff-name" value={this.state.staff} onChange={this.handleChangeStaffName} className="grey-form form-control" placeholder="ご担当者名を記入してください"/>
                                </div>
                                <div className="form-group">
                                    <label className="contact-text">
                                      メールアドレス
                                    </label>
                                    <input type="text" id="email-address" value={this.state.email} onChange={this.handleChangeEmail} className="grey-form form-control" placeholder="mailアドレスを記入してください"/>
                                </div>
                                <div className="form-group">
                                    <label className="contact-text">
                                      電話番号
                                    </label>
                                    <input type="text" id="phone-number" value={this.state.number} onChange={this.handleChangeNumber} className="grey-form form-control" placeholder="電話番号を記入してください"/>
                                </div>
                                <div className="form-group">
                                    <label className="contact-text">
                                      お問い合わせ内容
                                    </label>
                                    <textarea name="user-message" id="description-of-contact" value={this.state.description} onChange={this.handleChangeDescription} className="grey-form form-control" cols="20" rows="7" placeholder="内容を記入してください">
                                    </textarea>
                                </div>
                                <div className="modal-footer">
                                  <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                                  <button type="submit" className="btn btn-primary">Send message</button>
                                </div>
                              </form>
                            </div>
                        </div> 
                    </div>
                </div>
            </div>
        )
    }
}