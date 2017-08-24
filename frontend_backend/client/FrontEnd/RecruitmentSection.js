import React from  'react';
import axios from 'axios';
import {api_url} from '../../config';

export default class RecruitmentSection extends React.Component{
  constructor(props) {
    super(props);
    this.state = {email: '',github: '',pr: ''};
    this.handleChangeEmail = this.handleChangeEmail.bind(this);
    this.handleChangeGithub = this.handleChangeGithub.bind(this);
    this.handleChangePr = this.handleChangePr.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleSubmit=(event) =>{
    console.log('in handle submit')
    axios.post(api_url + '/forms/recruitment', {
        email: this.state.email,
        self_pr: this.state.pr,
        link_github: this.state.github,
    })
    .then(function (response) {
      console.log('response', response);
      alert('your form has been successfully submitted');
    })
    .catch(function (error) {
      console.log('error: ', error);
    });
    this.setState({email: ''});
    this.setState({github: ''});
    this.setState({pr: ''});
  }
  handleChangeEmail(event) {
    this.setState({email: event.target.value});
  }
  handleChangeGithub(event) {
    this.setState({github: event.target.value});
  }
  handleChangePr(event) {
    this.setState({pr: event.target.value});
  }
  render(){
    return(
      <div>
        <div className="container-fluid" id="RECRUITMENT-container" >
          <section>
              <h2 className="text-center section-heading"><big>{`RECRUIT`}</big></h2>
          </section><br/><br/><br/><br/><br/>
          <div className="row small-row">
            <div id="equal-height-1" className="white-col col-lg-5 col-md-5">
                <img className="img-responsive imgcenter" src="/images/recruit_engineer.png"/>
                <p className="big-recruit japanese-text text-center">エンジニア</p>
            </div>
            <p className="recruit-text">
              問題発見解決能力に長けていること。
            </p>
            <div className="text-center">
              <button type="button" id="apply-button" className="btn-danger btn big-recruit-1" data-toggle="modal" data-target="#apply-engineer">
                エントリー
              </button>
            </div>
            <div className="recruit-form modal fade" id="apply-engineer" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
              <div className="modal-dialog" role="document">
                <div className="modal-content">
                  <div className="modal-header">
                    <h2 className="modal-title text-center" id="exampleModalLabel">Recruitment</h2>
                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                      <span aria-hidden="true">&times;</span>
                    </button>
                  </div>
                  <div className="modal-body">
                    <form onSubmit={this.handleSubmit}>
                      <div className="padding-popup form-group"><br/>
                        <input type="text" placeholder="メールアドレス" value={this.state.email} onChange={this.handleChangeEmail} className="form-control" id="email"/>
                      </div>
                      <div className="padding-popup form-group"><br/>
                        <input placeholder="Github account" type="text" value={this.state.github} onChange={this.handleChangeGithub} className="form-control" id="github"/>
                      </div>
                      <div className="padding-popup form-group"><br/>
                        <textarea cols="20" rows="10" placeholder="自己PR" value={this.state.pr} onChange={this.handleChangePr} className="padding-popup form-control" id="self-pr"></textarea>
                      </div>
                      <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                        <button type="submit" className="btn btn-primary">送信</button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div id="equal-height" className="white-col col-lg-5 col-md-5">
          <img className="img-responsive imgcenter" src="/images/recruit_sale.png"/>
          <p className="big-recruit japanese-text text-center">
            営業
          </p>
          <p className="recruit-text">
            お客様の課題は何かをしっかり把握することができ、それに対して適切なアドバイスを行なえる者。
          </p>
          <div className="text-center">
            <button type="button" id="apply-button" className="big-recruit-1 btn-danger btn" data-toggle="modal" data-target="#apply-sale">
                エントリー
            </button>
          </div>
          <div className="recruit-form modal fade " id="apply-sale" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h2 className="modal-title text-center" id="exampleModalLabel">Recruitment</h2>
                  <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div className="modal-body">
                  <form>
                    <div className="padding-popup form-group">
                      <input placeholder="メールアドレス" type="text" value={this.state.email} onChange={this.handleChangeEmail} className="form-control" id="email"/>
                    </div><br/>
                    <div className="padding-popup form-group">
                      <textarea cols="20" rows="10" placeholder="自己PR" value={this.state.pr} onChange={this.handleChangePr} className="padding-popup form-control" id="self-PR"></textarea>
                    </div>
                    <div className="modal-footer">
                      <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                      <button type="button" className="btn btn-primary" onClick={this.handleSubmit}>送信</button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}