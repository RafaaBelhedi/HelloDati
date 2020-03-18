import React, { Component } from 'react';
import './NavigationIndexes.scss'
import { notEqual } from 'assert';
class NavigationIndexes extends Component {
  constructor(props) {
    super(props)
    this.state = {
      arr: [...Array(this.props.count).keys()].map(x => x + 1),
      index: this.props.index
    }
  }
  render() {
    return <>
      {this.state.arr.map((x, i) => {
        let name = ''
        if(i==this.props.index)
          name='active'
        else if(i<this.props.index)
          name='done'
        name+=' navigation-index'
        return <>
          <div className={name}>
            {x}
          </div>
          <div className="line"></div>
        </>
      })}
    </>;
  }
}

export default NavigationIndexes;
