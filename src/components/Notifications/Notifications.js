import React, { Component } from 'react';
import { callApiWithBody, callApi } from '../../Helpers';
import './Notifications.scss';
import ImageUploader from 'react-images-upload';
import Popup from 'reactjs-popup';
import { UserContext } from '../Context'
import Modal from 'react-awesome-modal';

class Notifications extends Component {
  constructor(props, context) {
    super(props, context)
    this.state = {
      "image_right_url": 'https://i.imgur.com/3uIohbn.jpg', "expandeble_text": "expanded textt", "sound": 'ripple',
      tourists: { stay: {} },
      gender: "",
      backAllColor: "#111f35",
      backColorMen: "#dfe7f2",
      backColorWomen: "#dfe7f2",
      color: "#fefefe",
      colorMen: "#111f35",
      colorWomen: "#111f35",
      //   age:{
      //   minAge:"",
      //   maxAge:"",
      //  } ,
      age: "",
      visible: "",


    }
    this.notify = this.notify.bind(this)
    this.upload = this.upload.bind(this)
    this.sendAllGuest = this.sendAllGuest.bind(this)
    this.sendMen = this.sendMen.bind(this)
    this.sendWomen = this.sendWomen.bind(this)
    this.sendWomen = this.sendWomen.bind(this)
    this.filterTouristAge = this.filterTouristAge.bind(this)
    this.filterTouristAge = this.filterTouristAge.bind(this)
  }

  async componentDidMount() {
    let tourists = await callApi('tourists', { hotel_id: this.context.hotel_id[0] })
    this.setState({ tourists: tourists.data });
    // console.log(this.state.tourists[0].stay.device_room.device.imei,"tertrfvxcx")

    // let p = new Promise((resolve,reject)=>{
    //   if(this.state.age.minAge && this.state.age.maxAge){
    //   resolve(this.state.age)
    //   }else{
    //   reject('failed')
    //   }
    //   })

    //   p.then((message)=>{
    //     this.filterTouristAge(message);
    //     console.log("this is"+message )
    //   }).catch((message)=>
    //   {console.log("this is"+message )})

  }
  async setAgeToZero(age) {
    await this.setState({ age: { ...this.state.age, ...age } });
    console.log(age, "toutou")
  }

  // componentDidUpdate(prevState){
  //   if (this.state.age.minAge !== prevState.age.minAge) {
  //     let p = new Promise((resolve,reject)=>{
  //       if(this.state.age.minAge && this.state.age.maxAge){
  //       resolve(this.state.age)
  //       }else{
  //       reject('failed')
  //       }
  //       })

  //       p.then((message)=>{
  //         this.filterTouristAge(message);
  //         console.log("this is"+message )
  //       }).catch((message)=>
  //       {console.log("this is"+message )})
  //   }

  // }

  async setAgeIntervalle(age) {
    await this.setState({ age: { ...this.state.age, ...age } });
  }

  async sendAllGuest() {
    let tourists = await callApi('tourists', { hotel_id: this.context.hotel_id[0] })
    this.setState({ tourists: tourists.data });
    // this.setState({ gender: "all" });
  }
  async sendMen() {
    let Alltourists = await callApi('tourists', { hotel_id: this.context.hotel_id[0] })
    let touristsMen = Alltourists.data.reduce((touristsMen, item) => {
      if (item.gender == 1) {
        touristsMen.push(item);
      }
      return touristsMen;

    }, []);
    this.setState({ tourists: touristsMen });
    // this.setState({ gender: "men" });
  }
  async sendWomen() {
    let Alltourists = await callApi('tourists', { hotel_id: this.context.hotel_id[0] })
    let touristsWomen = Alltourists.data.reduce((touristsWomen, item) => {
      if (item.gender == 2) {
        touristsWomen.push(item);
      }
      return touristsWomen;

    }, []);
    this.setState({ tourists: touristsWomen });
    // this.setState({ gender: "women" });
  }

  // async notify() {
  // var formdata = new FormData();
  // formdata.append("data",JSON.stringify({"title": this.state.title, "summery" : this.state.summery,"image": this.state.image,"promo" : this.state.promo}));
  // callApiWithBody('notif_hotels_devices?imei= '+356300100035512,formdata, 'POST').then(res=>{console.log(res,"work?")})
  // }

  async notify() {
    var formdata = new FormData();
    formdata.append("data", JSON.stringify({ "title": this.state.title, "summery": this.state.summery, "image": this.state.image, "promo": this.state.promo }));
    this.state.tourists.map(x => {
      callApiWithBody('notif_hotels_devices?imei= ' + x.stay.device_room.device.imei, formdata, 'POST').then(res => {
        // this.cancelForm();
        // this.setAgeToZero({minAge:""});
        // this.setAgeToZero({maxAge:""});
        this.setState({ age: "" })
        this.setState({ visible: "success" });


      }).catch(error => { this.setState({ visible: "echec" }) })
    })

  }

  async filterTouristAge(message) {

    let fields = message.split('/');
    let minAge = fields[1];
    let maxAge = fields[2];
    await callApi('tourists', { hotel_id: this.context.hotel_id[0] }).then(res => {
      let touristage = res.data.reduce((touristage, item) => {
        if (item.age > minAge && item.age < maxAge) {
          touristage.push(item);
        }
        return touristage;

      }, []);
      this.setState({ tourists: touristage });
    })
  }

  async upload(e) {
    let data = new FormData()
    data.append('image', document.getElementsByName('image')[0].files[0])
    let image = await callApiWithBody('upload', data, 'POST')
    this.setState({ image: image.image });
  }

  ellipsis(promo) {
    promo = String(promo);
    return promo.substring(0, 3);
  }
  // cancelForm = () => {
  // 	this.myFormRef.reset();
  // }
  closeModal = () => {
    this.setState({
      visible: false
    });
  }

  render() {

    let p = new Promise((resolve, reject) => {
      if (this.state.age) {
        resolve(this.state.age)
      } else {
        reject('failed')
      }
    })

    p.then((message) => {
      this.filterTouristAge(message);
    }).catch((message) => { console.log("this is" + message) })
    return <div><div className="container">

      {this.state.visible == "success" ?
        <Modal
          className="my-modal"
          visible={this.state.visible}
          width="400"
          height="300"
          effect="fadeInUp"
          onClickAway={() => this.closeModal()}
        >
          <div className="valide-modal">
            <img src="/img/ui/succes.png" style={{ width: "32", height: "32" }} />
            <div>notification has been sent !</div>
            {/* <button onClick={() => this.closeModal()} >X</button> */}
          </div>
        </Modal>
        : null}
      {this.state.visible == "echec" ?
        <Modal
          className="my-modal"
          visible={this.state.visible}
          width="400"
          height="300"
          effect="fadeInUp"
          onClickAway={() => this.closeModal()}
        >
          <div className="echec-modal">
            <img src="/img/ui/echec.png" style={{ width: "32", height: "32" }} />
            <div>notification was not sent!!</div>
            {/* <button onClick={() => this.closeModal()} >X</button> */}
          </div>
        </Modal>
        : null}
      {/* 
      {this.state.gender === "all" && (this.setState({backAllColor:"#111f35" ,backColorMen:"#dfe7f2",backColorWomen:"#dfe7f2"}))}
      {this.state.gender === "men" && (this.setState({backAllColor:"#dfe7f2" , backColorMen:"#111f35",backColorWomen:"#dfe7f2"}))}
      {this.state.gender === "women" && (this.setState({backAllColor:"#dfe7f2" ,backColorMen:"#dfe7f2",backColorWomen:"#111f35"}))} */}
      <div id="c15-phone">
        <p>Preview</p>
        <div className="preview">
          <div className="arrow-right" style={{ display: !this.state.image ? 'none' : '' }}></div>
          <div className="price">
            <span className="price">{this.state.price}<sup style={{ display: this.state.price ? 'inline' : 'none' }}>Dt</sup></span>
            <span className="promo" style={{ display: this.state.promo ? 'inline' : 'none' }}>
              {this.state.promo && this.state.promo.length > 3 ? this.ellipsis(this.state.promo) : this.state.promo}%</span>
          </div>
          <img src={this.state.image ? this.state.image : "/img/ui/no-photo.png"} style={{ borderLeft: !this.state.image ? '1px dashed gray' : '' }} alt="Preview Template" />
          <h2>{this.state.title}</h2>
          <p>{this.state.summery}</p>
        </div>
        <img src="/img/ui/c15pro.png" alt="mobile-phone" />
      </div>
      <div className="forms" style={{ width: "100%" }}>
        <div id="target-container">

          <div className="title-target">

            <p>TARGET</p>

          </div>

          <div className="body-target">
            <div className="gender_container">
              <div className="label_gender">
                <label>Gendre : {this.state.gender}</label>
              </div>
              <div className="gender_body">
                <div className="all" style={{ backgroundColor: this.state.backAllColor }} onClick={() => { this.sendAllGuest(); this.setState({ backAllColor: "#111f35", backColorMen: "#dfe7f2", backColorWomen: "#dfe7f2", color: "#fefefe", colorMen: "#111f35", colorWomen: "#111f35", gender: "All" }) }}><p style={{ color: this.state.color }}>All</p></div>
                <div className="men" style={{ backgroundColor: this.state.backColorMen }} onClick={() => { this.sendMen(); this.setState({ backAllColor: "#dfe7f2", backColorMen: "#111f35", backColorWomen: "#dfe7f2", color: "#111f35", colorMen: "#fefefe", colorWomen: "#111f35", gender: "Men" }) }}><p style={{ color: this.state.colorMen }}>Men</p></div>
                <div className="women" style={{ backgroundColor: this.state.backColorWomen }} onClick={() => { this.sendWomen(); this.setState({ backAllColor: "#dfe7f2", backColorMen: "#dfe7f2", backColorWomen: "#111f35", color: "#111f35", colorMen: "#111f35", colorWomen: "#fefefe", gender: "Women" }) }}><p style={{ color: this.state.colorWomen }}>Women</p></div>
              </div>
            </div>


            <div className="age_container">
              <div className="label_age">
                <label>Age :</label>
              </div>
              <div className="age_body">
                {/* <form  ref={(el) => this.myFormRef = el}> */}
                {/* <div className="min_age" ><input type="number" placeholder="18" value={this.state.minAge} onInput={e => this.setAgeIntervalle({ minAge: e.target.value })} /></div> 
          <div className="max_age"><input type="number" placeholder="65" value={this.state.maxAge}  onInput={e => this.setAgeIntervalle({ maxAge: e.target.value })} /></div> */}
                {/* </form> */}
                <select name="TrancheAge" onChange={(e) => this.setState({ age: e.target.value })} >
                  <option selected disabled hidden>Age range</option>
                  <option value="/7/13">7 ans -> 13 ans</option>
                  <option value="/14/17">14 ans -> 17 ans</option>
                  <option value="/18/25">18 ans -> 25 ans</option>
                  <option value="/25/35">25 ans -> 35 ans</option>

                </select>
              </div>
            </div>


          </div>

        </div>

        <div id="notification-container">

          <div className="title-notification">

            <p>NOTIFICATION</p>

          </div>

          <div className="body-notification">

            <p>Message Details</p>

            <div className="first-container">
              <div className="text-container">
                <div className="title" style={{ width: " 100%" }}>
                  <label for="title">
                    <p>Title*:</p>
                  </label>
                  <input onInput={e => this.setState({ title: e.target.value })} value={this.state.title} type="text" name="notification_title" id="title" style={{ width: " 80%" }} />


                </div>
                <div className="description" style={{ width: " 100%" }}>
                  <label for="description">
                    <p>Description*:</p>
                  </label>
                  <textarea onInput={e => this.setState({ summery: e.target.value })} name="notification_description" value={this.state.summery} id="description" style={{ width: " 80%" }}>{this.state.summery}</textarea>
                </div>
              </div>
              <div className="image-container">
                <p>Image:</p>
                <ImageUploader
                  fileContainerStyle={{ height: '152px', marginRight: '17px' }}
                  onChange={this.upload}
                  label={'Max file size: 2MB | Allowed formats: jpg, png'}
                  maxFileSize="2097152"
                  name="image"
                />
              </div>
            </div>

            <div className="second-container">
              <div className="price" style={{ width: " 100%" }}>
                <label for="price">
                  <p>Price:</p>
                </label>
                <input type="text" onInput={e => this.setState({ price: e.target.value })} value={this.state.price} name="notification_price" id="price" placeholder="DT" style={{ width: "85%" }} />
              </div>
              <div className="promo" style={{ width: " 100%" }}>
                <label for="promo">
                  <p>Promo:</p>
                </label>
                <input type="text" name="notification_promo" onInput={e1 => this.setState({ promo: e1.target.value })} value={this.state.promo} id="promo" placeholder="%" style={{ width: "100%" }} />
              </div>
            </div>
            <button onClick={this.notify} className="send-button" id="send-button">

              <div className="image"><img src="/img/ui/target.png" alt="target" /></div>

              <div className="text">Send</div>

            </button>
          </div>

        </div>
      </div>
    </div>
    </div>
  }



}

Notifications.contextType = UserContext

export default Notifications;
