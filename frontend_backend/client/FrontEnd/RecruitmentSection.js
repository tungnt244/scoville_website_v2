import React from  'react';
import axios from 'axios';
import {api_url} from '../../config';

export default class RecruitmentSection extends React.Component{
  constructor(props) {
    super(props);
    this.state = {email: '',github: '',pr: '',color1:'white', bgColor1: '#ac241f', color2:'#ac241f', bgColor2: 'white', state1:'none',state2:'auto'};
    this.handleChangeEmail = this.handleChangeEmail.bind(this);
    this.handleChangeGithub = this.handleChangeGithub.bind(this);
    this.handleChangePr = this.handleChangePr.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleSubmit=(event) =>{
    event.stopPropagation()
    event.preventDefault()
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
        console.log('error: ', error.response);
      });
      this.setState({email: ''});
      this.setState({github: ''});
      this.setState({pr: ''});
  }
  changeColor1 = (event) => {
    this.setState({bgColor1:'#ac241f'});
    this.setState({bgColor2:'white'});
    this.setState({color1:'white'});
    this.setState({color2:'#ac241f'});
    this.setState({state1:'none'});
    this.setState({state2:'auto'});
  }
  changeColor2 = (event) => {
    this.setState({bgColor1:'white'});
    this.setState({bgColor2:'#ac241f'});
    this.setState({color1:'#ac241f'});
    this.setState({color2:'white'});
    this.setState({state1:'auto'});
    this.setState({state2:'none'});
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
            <div className="container">
              <div id="accordion">
                <div className="panel">
                  <div className="text-center">
                    <a onClick={this.changeColor1} style={{backgroundColor:this.state.bgColor1,color:this.state.color1,pointerEvents:this.state.state1}} className="toggle-content" data-toggle="collapse" data-parent="#accordion" href="#e-content">ENGINEER</a>
                    <a onClick={this.changeColor2} style={{backgroundColor:this.state.bgColor2,color:this.state.color2,pointerEvents:this.state.state2}} className="toggle-content" data-toggle="collapse" data-parent="#accordion" href="#s-content"> SALE </a>
                  </div>
                  <div id="e-content" className="panel-collapse collapse in">
                    <div className="gray-container">
                      <p className="text-center">求める人物像</p>
                      <p className="text-left japanese-text">
                        Scovilleでは事業領域と同様、<br/>
                        特定の領域に絞らずProfessionalを募集しています。<br/>
                        必須の能力は以下の２点です。<br/><br/><br/>
                        ・多国籍なプロと働くための日常会話レベルの英語力<br/>
                        ・高い問題発見能力と豊富な解決手段の装備<br/>
                      </p>
                    </div>
                    <div className="text-center">
                      <button type="button" id="apply-button" className="btn-danger btn big-recruit-1" data-toggle="modal" data-target="#apply-engineer">
                          ENTRY
                      </button>
                    </div>
                  </div>
                  <div id="s-content" className="panel-collapse collapse">
                    <div className="gray-container">
                      <p className="text-center">求める人物像</p>
                      <p className="text-left japanese-text">
                        Scovilleでは事業領域と同様、<br/>
                        特定の領域に絞らずProfessionalを募集しています。<br/>
                        必須の能力は以下の２点です。<br/><br/><br/>
                        ・様々な企業の採用課題を発見でき、解決策を提示することができる<br/>
                        ・社会的に価値の高い事業にコミットしたいという情熱がある<br/>
                      </p>
                    </div>
                    <div className="text-center">
                      <button type="button" id="apply-button" className="big-recruit-1 btn-danger btn" data-toggle="modal" data-target="#apply-sale">
                          ENTRY
                      </button>
                    </div>
                  </div>
                </div>
                <div>
                </div>
              </div> 
            </div>
        </div>
        {/* start of recruit form */}
        <div className="recruit-form modal fade" id="apply-engineer" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h2 className="modal-title text-center" id="exampleModalLabel">
                  Recruitment
                </h2>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <form onSubmit={this.handleSubmit}>
                  <div className="padding-popup form-group"><br/>
                    <input type="text" placeholder="メールアドレス" value={this.state.email} onChange={this.handleChangeEmail.bind(this)} className="form-control" id="email"/>
                  </div>
                  <div className="padding-popup form-group"><br/>
                    <input placeholder="Github account" type="text" value={this.state.github} onChange={this.handleChangeGithub.bind(this)} className="form-control" id="github"/>
                  </div>
                  <div className="padding-popup form-group"><br/>
                    <textarea cols="20" rows="10" placeholder="自己PR" value={this.state.pr} onChange={this.handleChangePr.bind(this)} className="padding-popup form-control" id="self-pr"></textarea>
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

        {/* next form */}
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
                    <input placeholder="メールアドレス" type="text" value={this.state.email} onChange={this.handleChangeEmail.bind(this)} className="form-control" id="email"/>
                  </div><br/>
                  <div className="padding-popup form-group">
                    <textarea cols="20" rows="10" placeholder="自己PR" value={this.state.pr} onChange={this.handleChangePr.bind(this)} className="padding-popup form-control" id="self-PR"></textarea>
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
        {/* end of recruit form */}
      </div>
    )
  }
}