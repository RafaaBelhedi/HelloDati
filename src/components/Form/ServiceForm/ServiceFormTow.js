import React, { Component } from 'react';
// import './SectionEitHotel.scss'



class ServiceFormTow extends Component {
  constructor(props) {
    console.log(props)
    super(props)
    this.state = { service: this.props.service }
  }


  render() {
    return <>

      <div className="form-grouping-half-hotel-edit">
        <label className="input-label-half-hotel-edit"> Content Manager</label>
        <label className="input-label-half-hotel-edit">Type</label>
        <input
          type="text"
          placeholder="content_manager"
          value={this.props.service.content_manager || ''}
          onChange={(e) => this.props.setData({ content_manager: e.target.value })}
          className="input-half-hotel-add" />


        <input
          type="text"
          placeholder="type"
          value={this.props.service.type || ''}
          onChange={(e) => this.props.setData({ type: e.target.value })}
          className="input-half-hotel-add" />
      </div>
      <div className="form-grouping-half-hotel-edit">
        <label className="input-label-half-hotel-edit"> State</label>
        <label className="input-label-half-hotel-edit">Title Color</label>
        <input
          type="text"
          placeholder="state"
          value={this.props.service.state || ''}
          onChange={(e) => this.props.setData({ state: e.target.value })}
          className="input-half-hotel-add" />



        <input
          type="text"
          placeholder="Title Color"
          value={this.props.service.title_color || ''}
          onChange={(e) => this.props.setData({ title_color: e.target.value })}
          className="input-half-hotel-add" />







      </div>
    </>;
  }
}

export default ServiceFormTow;
