import React from  'react'

export default class Navbar extends React.Component{
    render(){
        return(
            <div>
                <div className="img-container">
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
                                <li ><a className="big-word text-right" href="">HOME/  </a></li>
                                <li ><a className="big-word text-right" href="#COMPANY">COMPANY/  </a></li>
                                <li ><a className="big-word text-right" href="#SERVICES">SERVICES/  </a></li>
                                <li ><a className="big-word text-right" href="#RECRUITMENT">RECRUITMENT/   </a></li>
                                <li ><a className="big-word text-right" href="#NEWS">NEWS/  </a></li>
                                <li ><a id="right-nav" className="big-word text-right" href="#ACCESS">ABOUT  </a></li>
                                <li id="li-button">
                                    <button type="button" id="contact-button" className="btn btn-danger" data-toggle="modal" data-target="#contact-form">
                                        <p id="contact-word">お問い合わせ</p>
                                    </button>
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>

                {/* <!-- end of navbar --> */}

                {/* <!-- CONTACT form --> */}
                    <div className="modal fade" id="contact-form" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                        <div className="modal-dialog" role="document">
                            <div className="modal-content">
                                <div className="modal-header">
                                  <h2 className="text-center modal-title" id="exampleModalLabel">Contact</h2>
                                  <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                  </button>
                                </div>
                                <div className="modal-body">
                                  <form action="" className="form-horizontal">
                            <div className="form-group">
                                <label for="user-name" className="contact-text">御社名</label>
                                <input type="text" id="user-name" className="form-control grey-form" placeholder="会社名を記入してください"/>
                            </div>
                            <div className="form-group">
                                <label for="user-email" className="contact-text">ご担当者名</label>
                                <input type="text" id="user-email" className="grey-form form-control" placeholder="ご担当者名を記入してください"/>
                            </div>
                            <div className="form-group">
                                <label for="user-phone-number" className="contact-text">メールアドレス</label>
                                <input type="text" id="user-phone-number" className="grey-form form-control" placeholder="mailアドレスを記入してください"/>
                            </div>
                            <div className="form-group">
                                <label for="user-phone-number" className="contact-text">電話番号</label>
                                <input type="text" id="user-phone-number" className="grey-form form-control" placeholder="電話番号を記入してください"/>
                            </div>
                            <div className="form-group">
                                <label for="user-message" className="contact-text">お問い合わせ内容</label>
                                <textarea name="user-message" id="user-message" className="grey-form form-control" cols="20" rows="7" placeholder="内容を記入してください"></textarea>
                            </div>
                        </form>
                                </div>
                                <div className="modal-footer">
                                  <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                                  <button type="button" className="btn btn-primary">Send message</button>
                                </div>
                            </div> 
                        </div>
                    </div>
            </div>
        )
    }
}