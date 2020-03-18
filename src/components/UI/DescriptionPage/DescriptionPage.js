import React, { Component } from 'react';
import "./DescriptionPage.scss"

class DescriptionPage extends Component {
  constructor(props) {
    super(props)
    this.state = { data: this.props.data }
  }

  componentDidMount() {
    console.log(this.props)
  }

  render() {
    return <div classNale="form-grouping-half">
         <div className="form-grouping-half-restaurant-edit">
      <label className="input-label-half">Description</label>
      <label className="input-label-half">Description (fr)</label>
      <textarea
        value={this.props.data.description}
        placeholder="Description"
        onChange={(e) => this.props.setData({ description: e.target.value })}
        className="input-half" />
      <textarea
        value={this.state.data.description_fr}
        placeholder="Description (Fr)"
        onChange={(e) => this.props.setData({ description_fr: e.target.value })}
        className="input-half" />
        </div>
        <div className="form-grouping-half-restaurant-edit">
      <label className="input-label-half">Summary</label>
      <label className="input-label-half">Summary (fr)</label>
      <textarea
        value={this.props.data.summery}
        placeholder="Summary"
        onChange={(e) => this.props.setData({ summery: e.target.value })}
        className="input-half" />
      <textarea
        value={this.state.data.summery_fr}
        placeholder="Summary (Fr)"
        onChange={(e) => { this.setState({ data: { ...this.state.data, summery_fr: e.target.value } }); this.props.setData({ summery_fr: e.target.value }) }}
        className="input-half" />
    </div>
    </div>;
  }
}

export default DescriptionPage;
