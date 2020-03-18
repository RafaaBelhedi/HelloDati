import React, { Component } from 'react';
import './CategoryButton.scss'
import CategoryForm from '../../Form/CategoryForm'

class CategoryButton extends Component {
  constructor(props) {
    super(props)
    this.state = {
      display: false
    }
    this.toggle = this.toggle.bind(this)
  }



  toggle() {
    if (!this.state.display)
      this.setState({ display: true })
  }

  componentDidUpdate() {
    // if (this.state.display)
    //   dishContainer.className += " blur"
    // else
    //   dishContainer.className = dishContainer.className.replace(/blur/g, '')
  }

  render() {
    return <div className="category-container">
      <button onClick={this.toggle} className="category-button">
        <img src="/img/ui/edit.png" />
        Edit Categories
      </button>
      <CategoryForm id={this.props.id}categories={this.props.categories} update={this.props.update} turnOff={() => this.setState({ display: false })} style={{ display: this.state.display ? 'inline-block' : 'none' }}>

      </CategoryForm>
    </div>;
  }
}

export default CategoryButton;
