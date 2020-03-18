import React, { Component } from 'react';
import { Route, Switch } from "react-router-dom";
import Home from '../Service'
import Devices from '../Devices'
import Tourists from '../Tourists'
import Employees from '../Employees'
import Statistics from '../Statistics'
import ServiceContainer from '../ServiceContainer/ServiceContainer';
import Restaurant from '../Services/Restaurant/Restaurant';
import './Routes.css'
import CategoryContainer from '../Services/Restaurant/CategoryContainer/CategoryContainer';
import DishForm from '../Form/DishForm';
import AddDishOrDrinkForm from '../Form/AddDishOrDrinkForm';
import DeviceForm from '../Form/DeviceForm'
import TouristForm from '../Form/TouristFormjs'
import RestaurantForm from '../Form/RestaurantForm'
import Notifications from '../Notifications'
import DishUpdateForm from '../Form/DishUpdateForm/DishUpdateForm';
import EditDishOrDrinkForm from '../Form/EditDishOrDrinkForm/EditDishOrDrinkForm';
import History from '../History';
import Presentation from '../Presentation';
import AddExtraPost from '../Form/AddExtraPost'
import AddTouristForm from '../Form/AddTouristForm'
import AddRoomForm from '../Form/AddRoomForm'
import EmployeeForm from '../Form/EmployeeForm'
import UpdateExtraPost from '../Form/UpdateExtraPost'
import EmployeeEditForm from '../Form/EmployeeEditForm'
import Rooms from '../Rooms'
import RoomForm from '../Form/RoomForm'
import ExtraPosts from '../ExtraPosts/ExtraPosts';
import Hotels from '../Hotels'
import HotelForm from '../Form/HotelForm'
import EmployeeHistory from '../EmployeeHistory'
import AddHotel from '../Form/AddHotelForm/AddHotelForm'
import AddDevice from '../Form/AddDeviceForm/AddDeviceForm'
import Chats from '../Chats/Chats'
import AddService from '../Form/AddServiceForm/AddService'
import ServiceForm from '../Form/ServiceForm/ServiceForm'
import OrdersR from '../OrdersReservations/OrdersR'
import RestaurantFormNew from '../Form/RestaurantForm/RestaurantFormNew'
import Concierge from '../../components/Concierge/Concierge'
import { callApi } from '../../Helpers'
import { UserContext } from '../Context'
class Routes extends Component {
  constructor(props, context) {
    super(props)
    this.state = {
      sideaccess: []
    }
  }
  async componentDidMount() {
    if (this.context.role === 2) {
      let sideaccess = await callApi('sideaccess/' + this.context.user_id)
      this.setState({ sideaccess: sideaccess.data[0] })
    }
  }
  render() {
    return (
      <div className="main-container">
        <Switch>
          <Route path="/" exact component={Presentation} />

          <Route path="/service" exact component={Home} />

          {this.context.role == 3 && <Route path="/devices" exact component={Devices} />}
          {this.context.role == 2 && this.state.sideaccess.devices == 1 && <Route path="/devices" exact component={Devices} />}

          {this.context.role == 3 && <Route path="/guest" exact component={Tourists} />}
          {this.context.role == 2 && this.state.sideaccess.guests == 1 && <Route path="/guest" exact component={Tourists} />}

          {this.context.role == 3 && <Route path="/employees" exact component={Employees} />}
          {this.context.role == 2 && this.state.sideaccess.employees == 1 && <Route path="/employees" exact component={Employees} />}

          <Route path="/employee/history/:id" exact component={EmployeeHistory} />

          {this.context.role == 3 && <Route path="/statistics" exact component={Statistics} />}
          {this.context.role == 2 && this.state.sideaccess.statistics == 1 && <Route path="/statistics" exact component={Statistics} />}

          {this.context.role == 3 && <Route path="/rooms" exact component={Rooms} />}
          {this.context.role == 2 && this.state.sideaccess.rooms == 1 && <Route path="/rooms" exact component={Rooms} />}

          <Route path="/demandes" exact component={Concierge} />
          <Route path="/hotels" exact component={Hotels} />
          <Route path="/add/service/:id" exact component={AddService} />
          <Route path="/service/:id" component={ServiceContainer} />
          {/* <Route path="/restaurant/edit/:id" component={DishUpdateForm} /> */}
          <Route path="/restaurant/edit/:id" render={(props) => <DishUpdateForm {...props} themeColor='#a560f6' isMeeting={false} isDish={false} hasPromo="false" />} />

          <Route path="/restaurant/:id" component={Restaurant} />
          <Route path="/category/:id" component={CategoryContainer} />
          <Route path="/add/dish/:id" render={(props) => <AddDishOrDrinkForm {...props} hasPromo="true" hasOpenTime="false" />} />
          <Route path="/add/wellbeing/:id" render={(props) => <DishForm {...props} themeColor='#68a55f' hasPromo="true" hasOpenTime="true" />} />
          <Route path="/add/leisure/:id" render={(props) => <DishForm {...props} themeColor='#f36e64' hasPromo="true" hasOpenTime="true" />} />
          <Route path="/add/events/:id" render={(props) => <DishForm {...props} themeColor='#a560f6' hasPromo="true" hasOpenTime="true" />} />
          <Route path="/add/concierges/:id" render={(props) => <DishForm {...props} themeColor='#a560f6' hasPromo="false" hasOpenTime="false" />} />

          <Route path="/add/gallery/:id" component={DishForm} />
          <Route path="/add/restaurant/:id" render={(props) => <RestaurantForm {...props} hasPromo="false" hasOpenTime="true" />} />

          {/* <Route path="/add/nes" component={RestaurantFormNew} /> */}

          {this.context.role == 3 && <Route path="/add/employee" component={EmployeeForm} />}
          {this.context.role == 2 && this.state.sideaccess.employees == 1 && <Route path="/add/employee" component={EmployeeForm} />}

          <Route path="/add/meetings/:id" render={(props) => <DishForm {...props} themeColor='#947e6a' hasPromo="false" hasOpenTime="true" />} />
          {this.context.role == 3 && <Route path="/add/device" component={AddDevice} />}
          {this.context.role == 3 && <Route path="/add/guest" component={AddTouristForm} />}
          {this.context.role == 2 && this.state.sideaccess.guests == 1 && <Route path="/add/guest" component={AddTouristForm} />}

          {this.context.role == 3 && <Route path="/add/room" component={AddRoomForm} />}
          {this.context.role == 2 && this.state.sideaccess.rooms == 1 && <Route path="/add/room" component={AddRoomForm} />}

          <Route path="/add/hotel" component={AddHotel} />
          <Route path="/edit/service/:id" component={ServiceForm} />
          <Route path="/edit/device/:id" component={DeviceForm} />
          <Route path="/edit/guest/:id" component={TouristForm} />
          <Route path="/edit/room/:id" component={RoomForm} />
          <Route path="/edit/hotel/:id" component={HotelForm} />
          <Route path="/emlpoyee/edit/:id" component={EmployeeEditForm} />
          <Route path="/dish/edit/:id" render={(props) => <EditDishOrDrinkForm {...props} themeColor='#4bd2bb' isDish={true} hasPromo="true" />} />
          <Route path="/event/edit/:id" render={(props) => <DishUpdateForm {...props} themeColor='#a560f6' isMeeting={false} isDish={false} hasPromo="true" />} />
          <Route path="/concierge/edit/:id" render={(props) => <DishUpdateForm {...props} themeColor='#a560f6' isMeeting={false} isDish={true} hasPromo="false" />} />

          <Route path="/meeting/edit/:id" render={(props) => <DishUpdateForm {...props} themeColor='#947e6a' isMeeting={true} isDish={false} hasPromo="false" />} />
          <Route path="/leisure/edit/:id" render={(props) => <DishUpdateForm {...props} themeColor='#f36e64' isMeeting={false} isDish={false} hasPromo="true" />} />
          <Route path="/wellbeing/edit/:id" render={(props) => <DishUpdateForm {...props} themeColor='#68a55f' isMeeting={false} isDish={false} hasPromo="true" />} />

          {this.context.role == 3 && <Route path="/notifications" component={Notifications} />}
          {this.context.role == 2 && this.state.sideaccess.notifications == 1 && <Route path="/notifications" component={Notifications} />}

          {this.context.role == 3 && <Route path="/history" component={History} />}
          {this.context.role == 2 && this.state.sideaccess.history == 1 && <Route path="/history" component={History} />}

          {this.context.role == 3 && <Route path="/orders" component={OrdersR} />}
          {this.context.role == 2 && this.state.sideaccess.orders_reservations == 1 && <Route path="/orders" component={OrdersR} />}

          {this.context.role == 3 && <Route path="/chat" component={Chats} />}
          {this.context.role == 2 && this.state.sideaccess.chat == 1 && <Route path="/chat" component={Chats} />}
          <Route path="/extra/edit/:id" component={UpdateExtraPost} />
          {/* <Route path="/gallery/edit/:id" component={DishUpdateForm} /> */}
          {/* <Route path="/add/hotel" component={AddHotelForm}/> */}
          <Route path="/add/extra/:id" component={AddExtraPost} />
          {/* <Route path="/add/tourist" component={AddTourist} /> */}
          {/* <Route path="/add/device" component={AddDeviceForm}/> */}
          {/* <Route path="/add/restaurant/:id" component={RestaurantForm} /> */}
          {/* <Route path="/add/dish/:id" component={DishForm} /> */}
          <Route path="/extra/:id" exact component={ExtraPosts} />

        </Switch>

      </div>
    );
  }
}
Routes.contextType = UserContext

export default Routes;
