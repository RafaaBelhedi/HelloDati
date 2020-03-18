import React, { Component } from 'react';
import { callApi } from '../../Helpers';
import { UserContext } from '../Context';
import ServiceCard from '../UI/ServiceCard/ServiceCard';
import ReactSVG from 'react-svg'
import './Home.css';
import AddButton from '../UI/AddButton/AddButton';

class Services extends Component {

  constructor(props, context) {
    super(props, context)
    this.state = {
      services: [],
      check: false,
      redirect: false,
      postaccess: [],
      parent_id: 0
    }

    this.check = this.check.bind(this)
    this.delete = this.delete.bind(this)
  }

  delete(id) {
    this.setState({ services: this.state.services.filter(x => x.id != id) })
  }

  check() {
    this.setState({ check: !this.state.check })
  }

  async componentDidMount() {
    let post = await callApi("posts", {
      hotel_id: this.context.hotel_id[0],
      parent_id: null
    })
    let services = await callApi("posts", {
      hotel_id: this.context.hotel_id[0],
      parent_id: post.data[0].id
    });

    let parentID = await callApi('posts', { hotel_id: this.context.hotel_id[0] });
    this.setState({ parent_id: parentID.data[0].id });

    await this.setState({ services: services.data });
    let postaccess = await callApi('postaccess/' + this.context.user_id);
    await this.setState({ postaccess: postaccess.data });
  }
  render() {
    return (
      <div className="content">
        {(this.context.role == 3) ?
          <AddButton link="service" id={this.state.parent_id} return={window.location.href} services={this.state.services} style={{ width: ' 24%',/*minWidth:'450px',*/height: ' 130px', border: '1px dashed #7a8da1', marginLeft: '-2px' }}>
            <ReactSVG src="/img/restaurant/plus.svg" />
            <p>
              Add
        </p>
          </AddButton>
          : null}


        {this.context.role == 3 &&
          this.state.services.map((x, i) => {
            return (
              <ServiceCard service={x} id={x.id} check={x.state == 1} index={i} isSPost={false} />
            )
          })}
        {(this.state.services.length > 0 && this.context.role == 2) &&
          this.state.services.map((x, i) => (
            this.state.postaccess.map((y) => (

              ((x.id == y.post_id) && (y.authorized == 1)) && <ServiceCard service={x} id={x.id} check={x.state == 1} index={i} />

            ))))}

      </div>
    );
  }
}

Services.contextType = UserContext

export default Services;
