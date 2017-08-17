import React from  'react'

export default class NewsSection extends React.Component{
    render(){
        return(
            <div>
                <hr id="NEWS"/>
                <div className="container bottom-padding" id="news-container">
                <div className="text-center">
                    <section>
                        <h2 className="section-heading" ><big>NEWS</big></h2>
                        <br/><br/>
                    </section>
                </div>
                <div>
                    <p className="date-text text-left ">2017.07.21</p>
                    <a href="" className="text-left blue-text">
                    {`AIを活用したタクシー配車アプリの実用実験を今夏に開始、早くも兆…`}</a>
                </div>
                <div>
                    <p className="date-text text-left">2017.06.21</p>
                    <a href="" className="text-left blue-text">
                    {`タローがコーポレートサイトのリニューアルを開始`}</a>
                </div>
                <div>
                    <p className="date-text text-left">2017.04.15</p>
                    <a href="" className="text-left blue-text">
                    {`AIを活用したタクシー配車アプリの実用実験を今夏に開始`}</a>
                </div>
                <div className="text-center">
                    <button className="btn button-news" href=""><span className="btn-word">see more</span></button>
                </div>
                    <br/><br/><br/><br/><hr id="ACCESS"/>
                </div>
            </div>
              )
            }
}