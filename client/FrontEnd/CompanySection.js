import React from  'react'

export default class CompanySection extends React.Component{
    render(){
        return(
            <div>
                <div className="container-fluid" id="COMPANY-container" >
                <hr id="COMPANY"/>
                    <section>
                        <h2 className="text-center section-heading"><big>{`COMPANY`}</big></h2>
                    </section>
                    <div className="white-background">
                        <p className="text-center red-text">{`OUR MISSION`}</p>
                        <p className="company-text text-center">
                            世界に通用する人と事業を創り、</p>
                        <p className="company-text text-center">外貨獲得を通じて日本経済を牽引する
                        </p><br/>
                    </div>
                    <br/><br/>
                    <div className="white-background">
                        <h2 className="text-center red-text">{`OUR VISION`}</h2>
                        <p className="company-text text-center">
                            連続的事業創造を行い、</p>
<p className="company-text text-center">世界に通ずるプロダクトを創り続ける
                        </p>
                        <br/><br/>
                        <hr id="SERVICES"/>
                    </div>
                </div>
            </div>
               )
            }
}
