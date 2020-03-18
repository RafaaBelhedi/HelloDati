import React, { Component } from 'react';
import { callApi , callApiWithBody} from '../../../Helpers';
import { UserContext } from '../../Context'
import './DishUpdateFormNew.scss'
import TimeField from 'react-simple-timefield';

import Modal from 'react-awesome-modal';


class OpenTimeModelEdit extends Component {
  constructor(props, context) {
    super(props, context)
    this.state = {
 opening_time: this.props.opening_time,
 opening_time_edit:{},
 day:this.props.day
    }
// this.handleChange = this.handleChange.bind(this)
  }


//  async handleChange(e) {
//     console.log('yrt')
//     const target = e.target;
//     const name = target.name;
//     const value = target.value;
 

//    await this.setState({
//       opening_time: {
//         ...this.state.opening_time,
  
//         [this.state.day]: [['1', name == '0' ? value : this.state.opening_time[this.state.day][0][1], name == '1' ? value : this.state.opening_time[this.state.day][0][2]],(name == '2' || name == '3')? ['1', name == '2' ? value : this.state.opening_time[this.state.day][1][1], name == '3' ? value : this.state.opening_time[this.state.day][1][2]]:['0']]


//       }
//     });

  
//     await  this.props.setData({ opening_time: JSON.stringify(this.state.opening_time) })

//     console.log('yyrt', this.state.opening_time)


//   }
 
  // async componentDidUpdate(prevProps) {
  //   if (this.state.opening_time !== prevState.opening_time) {
     
  //     await  this.props.setData({ opening_time: JSON.stringify(this.state.opening_time) })
  
  //   }
  // }

  render() {

    console.log('yyrtrr', JSON.stringify(this.state.opening_time))
console.log(this.state.day,"ggtggg day")
console.log(this.props.opening_time,"ggtggg props ")
console.log(JSON.stringify(this.state.opening_time),"ggtggg state ")




    return <div className="has-opening-time-edit">    
                            
							<Modal
								className="my-modal-Open-time"
                visible={this.props.visible}
								width="400"
               height="200"
								effect="fadeInUp"
							onClickAway={() => this.props.closeModal()}
							>
					 			<div className="edit-open-time">
  <div className="title-edit-time">Edit Shifts : {this.props.day == "Mon" && "Monday"|| this.props.day == "Tue" && "Tuesday" || this.props.day == "Wed" && "Wednesday" || this.props.day == "Thu" && "Thursday"|| this.props.day == "Fri" && "Friday"|| this.props.day == "Sat" && "Saturday" || this.props.day == "Sun" && "Sunday"}&nbsp; </div>
                                     <div className="edit-open-time-inputs">
                                         <p style={{fontWeight: 'bold'}}>Shift 1</p>
                                         <div className="opening_container-one"><p>Opening</p> <TimeField   className="input_shift"   name= "0"    onChange={this.props.handleChange} /> </div>
                                         <div className="opening_container-tow"><p>Clossing</p> <TimeField   className="input_shift" name= "1"    onChange={this.props.handleChange}/> </div>
                                       </div>
                                       <div className="edit-open-time-inputs">
                                         <p>Shift 2</p>
                                         <div className="opening_container-one"><p>Opening</p> <TimeField   className="input_shift"    name= "2"  onChange={this.props.handleChange} /> </div>
                                         <div className="opening_container-tow"><p>Clossing</p> <TimeField   className="input_shift"   name= "3"  onChange={this.props.handleChange}/> </div>
                                       </div>
                                       {/* <div className="insert-button-time" onClick={()=>{this.props.send().then(window.location.reload())}}> <p>Insert</p></div> */}
                                       {/* <div className="insert-button-time" onClick={this.props.send}> <p>Insert</p></div> */}
		{/* <p>{this.state.day}</p>	 */}
								</div>
							</Modal>
						    
 
    </div>;
  }
}
OpenTimeModelEdit.contextType = UserContext

export default OpenTimeModelEdit;
  