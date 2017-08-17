import React from  'react'

export default class AccessSection extends React.Component{
    render(){
        return(
            <div>
                <div className="container-fluid" id="ACCESS-container">    
                <div className="text-center">
                    <section>
                        <h2 className="section-heading" id="ACCESS-heading" ><big>ABOUT</big></h2>
                    </section>
                </div>
                <div className="modal-body row">
                    <div className="col-md-5 col-sm-5 no-padding">
                        <div className="row padding-top">
                            <div className="access-1 text-right col-md-4 col-sm-4 col-xs-4">
                               <p>社名</p>
                            </div>
                            <div className="access-2 text-left col-md-8 col-sm-8 col-xs-8">
                                <p>株式会社Scoville</p>
                            </div>
                        </div>
                        <div className="row">
                            <div className="access-1 text-right col-md-4 col-sm-4 col-xs-4">
                                <p>所在地</p>
                            </div>
                            <div className="access-2 text-left col-md-8 col-sm-8 col-xs-8">
                                <div>〒153-0051<br/>
                                東京都目黒区上目黒<br/>
                                1-1-5第二育良ビル3階</div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="access-1 text-right col-md-4 col-sm-4 col-xs-4">
                                <p>設立</p>
                            </div>
                            <div className="access-2 text-left col-md-8 col-sm-8 col-xs-8">
                                <p>2014年8月6日</p>
                            </div>
                        </div>
                        <div className="row">
                            <div className="access-1 text-right col-md-4 col-sm-4 col-xs-4">
                                <p>代表取締役</p>
                            </div>
                            <div className="access-2 text-left col-md-8 col-sm-8 col-xs-8">
                                <p>出谷昌裕</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-7 col-sm-7 no-padding">
                    <img className="img-responsive imgcenter" src="/images/map.png"/>
                    </div>
                </div><br/><br/>
                <div className="access-2 text-center">Copyright Scoville All Rights Reserved</div>
                </div>
            </div>
              )
            }
}