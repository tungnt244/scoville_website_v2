import React from  'react'
import {api_key} from '../../config'

export default class Map extends React.Component{
    render(){
        return(
        <div>
            <div id="map">
            </div>
            <script async defer src={"https://maps.googleapis.com/maps/api/js?key="+api_key+"&callback=initMap"}>
            </script>
        </div>
        )
    }
}