import React from 'react'

export default class NavbarNews extends React.Component{

  render(){
    return(
      <nav className="navbar navbar-inverse" id="news-navbar">
          <div id="news-nav-container" className="container-fluid">
              <div>
                  <button type="button" className="navbar-toggle" data-toggle="collapse" data-target="#navbar-collapse">  
                      <span className="icon-bar"></span>
                      <span className="icon-bar"></span>
                      <span className="icon-bar"></span>
                  </button>
              </div>
              <a id="news-logo-container" className="navbar-brand scroll" >
                  <img className="img-responsive" id="news-logo" src="./images/logo2.png" title="" />
              </a>
              <div className="collapse navbar-collapse" id="news-navbar-collapse">
                  <ul className="nav navbar-nav navbar-right">
                      <li ><a className="news-big-word text-right" href="">HOME/  </a></li>
                      <li ><a className="news-big-word text-right" href="#COMPANY">COMPANY/  </a></li>
                      <li ><a className="news-big-word text-right" href="#SERVICES">SERVICES/  </a></li>
                      <li ><a className="news-big-word text-right" href="#RECRUITMENT">RECRUITMENT/   </a></li>
                      <li ><a className="news-big-word text-right" href="#NEWS">NEWS/  </a></li>
                      <li ><a id="right-nav" className="news-big-word text-right" href="#ACCESS">ABOUT  </a></li>
                  </ul>
              </div>
          </div>
      </nav>
    )
  }
}