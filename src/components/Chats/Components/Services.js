import React, { Component } from 'react';
import ReactSVG from 'react-svg'


class Services extends Component {
    constructor(props){
    super(props);
    this.state = {
      users:{...this.props.users},
   
    }
  }
  render() {

    console.log(this.props.users.id,"message")
    return (

       <div className="serviceContainerImage">
              <div className="serviceContainerImage">
  
   <ReactSVG
              src="/img/chat/roomService.svg"
              className="svgIconService"
              onClick={(e)=>{this.props.setId({
                id:"OX0pReHXfXUTq1XnOnTSX7moiGp2",
                username:"Room Service",
                imageURL:""
               
               });this.props.context.setData(	{sender:"0",message:"",time:"",receiver:"",hotel_id:"",isseen:""} )}} 
            
            />

<ReactSVG
              src="/img/chat/restaurant.svg"
              className="svgIconService"
              onClick={(e)=>{this.props.setId({
                id:"lIZmNj75abRwLDO69sCgq5eZBkC2",
                username:"Restaurant",
                imageURL:""
               
               });this.props.context.setData(	{sender:"0",message:"",time:"",receiver:"",hotel_id:"",isseen:""} )}} 
            />
  <ReactSVG
              src="/img/chat/maintenance.svg"
              className="svgIconService"
              onClick={(e)=>{this.props.setId({
                id:"e7NsTkSI4icHXC6c4iygbStk2Ja2",
                username:"Maintenance",
                imageURL:""
               
               });this.props.context.setData(	{sender:"0",message:"",time:"",receiver:"",hotel_id:"",isseen:""} )}} 
            />
           
            </div>
</div>
    );
  }

}

export default Services;