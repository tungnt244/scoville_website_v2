import React from 'react'

export default class NavbarNews extends React.Component{

  render(){
    let url='/'
    let com = url+'#COMPANY'
    let ser = url+'#SERVICES'
    let rec = url+'#RECRUITMENT'
    let ne  = url +'#NEWS'
    let acc = url +'#ACCESS'
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
                      <li ><a className="news-big-word text-right" href={url}>HOME/ </a></li>
                      <li ><a className="news-big-word text-right" href={com}>COMPANY/ </a></li>
                      <li ><a className="news-big-word text-right" href={ser}>SERVICES/ </a></li>
                      <li ><a className="news-big-word text-right" href={rec}>RECRUITMENT/ </a></li>
                      <li ><a className="news-big-word text-right" href={ne}>NEWS/ </a></li>
                      <li ><a id="right-nav" className="news-big-word text-right" href={acc}>ABOUT</a></li>
                  </ul>
              </div>
          </div>
      </nav>
    )
  }
}