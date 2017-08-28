import React from  'react'

export default class CompanySection extends React.Component{
    render(){
        return(
            <div>
                <div className="container-fluid" id="COMPANY-container" >
                    <hr id="COMPANY"/>
                    <section>
                        <h2 className="text-center section-heading">
                            <big>{`COMPANY`}</big>
                        </h2>
                    </section>
                    <div className="row small-row">
                        <div className="text-left col-lg-6 col-md-6">
                            <span className="japanese-text">Our mission</span><hr className="red-line"/>
                            <p className="japanese-text">
                                世界に通用する<span className="red-text">人と事業</span>を創り、<br/>
                                外貨獲得を通じて日本経済を牽引する。<br/>
                            </p><br/>
                            <span className="japanese-text">Our vision</span><hr className="red-line"/>
                            <p className="japanese-text">
                                <span className="red-text">連続</span>的に事業創造を行い、<br/>
                                <span className="red-text">世界</span>に通じるプロダクトを創り続けます。<br/>
                            </p><br/><br/>
                        </div>
                        <div className="col-lg-6 col-md-6">
                            <img className="img-responsive imgcenter" src="/images/company.jpg"/>
                        </div>
                    </div>
                    <hr id="SERVICES"/>
                </div>
            </div>
        )
    }
}
