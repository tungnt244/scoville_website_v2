import React from  'react'

export default class MainImage extends React.Component{
    render(){
        return(
            <div>
                <div id="mainimage">
                  <video id="my-video" autoPlay="true" loop>
                    <source src="/images/video.mp4" type="video/mp4"/>
                  </video>
                </div>
            </div>
        )
    }
}
