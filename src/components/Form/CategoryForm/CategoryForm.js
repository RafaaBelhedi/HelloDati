import React, { Component } from 'react';
import './CategoryForm.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck, faSpinner } from '@fortawesome/free-solid-svg-icons'
import { callApi, callApiWithBody } from '../../../Helpers';
import { UserContext } from '../../Context'

class CategoryForm extends Component {
  constructor(props, context) {
    super(props, context)
    this.state = {}

    this.setWrapperRef = this.setWrapperRef.bind(this);
    this.handleClickOutside = this.handleClickOutside.bind(this);
    this.add = this.add.bind(this);
    this.disable = this.disable.bind(this);
  }

  componentDidMount() {
    document.addEventListener('mousedown', this.handleClickOutside);
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClickOutside);
  }
  setWrapperRef(node) {
    this.wrapperRef = node;
  }

  handleClickOutside(event) {
    if (this.wrapperRef && !this.wrapperRef.contains(event.target)) {
      this.props.turnOff()
    }
  }

  async add() {
    this.setState({ loading: true })
    let data = new FormData()
    data.append('image', this.state.file)
    // data.append('title',this.state.name)

    let image = await callApiWithBody('upload', data, 'POST')
    this.setState({ image: image.image })

    let post = await callApi('post', { title: this.state.name, image: this.state.image, hotel_id: this.context.hotel_id[0], parent_id: this.props.id , type: 4, categories: '[NanCategories]', state: 1, content_manager: 1 }, 'POST').then(res=>{console.log(res,"catadd")})
    this.setState({ loading: false })
    this.props.update()
  }


  async disable(id) {
    await callApi('post/' + id, { state: 0 }, 'PUT')
    this.props.update()
  }

  render() {
    return <div ref={this.setWrapperRef} style={this.props.style} className="category-form">
      <div className="title-bar">Add Category (menu)</div>
      <div className="form-elements"><p>
        Category Name:
      </p>
        <input value={this.state.name} onInput={e => this.setState({ name: e.target.value })} placeholder="Ex: Dessert" />
        <p>
          Category Image:
      </p>
        <input type="file" onChange={e => this.setState({ file: e.target.files[0] })} placeholder="Ex: Dessert" />
        <div onClick={this.add} className="category-add">
          <span>+</span>
          <p>{this.state.loading ? 'Wait' : 'Add'}</p>
        </div>
        <div className="categories">
          {this.props.categories.map(x => <p>
            {x.title}
            <sup onClick={() => this.disable(x.id)}>X</sup>
          </p>)}
        </div>
      </div>
    </div>;
  }
}
CategoryForm.contextType = UserContext
export default CategoryForm;
