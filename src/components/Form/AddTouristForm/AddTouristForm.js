import React, { Component } from 'react';
import './AddTouristForm.scss'
import { callApi } from '../../../Helpers';
import { UserContext } from '../../Context'
import '../../../Config'
import * as firebase from 'firebase';
import Modal from 'react-awesome-modal';
class AddTouristForm extends Component {
	constructor(props, context) {
		super(props, context)
		this.state = {
			tourist: {
				hotel_id: this.context.hotel_id[0],
				check_in: (new Date().getFullYear()) + "-" + ((new Date().getMonth() + 1).length > 2 ? (new Date().getMonth() + 1) : '0' + (new Date().getMonth() + 1)) + "-" + (new Date().getDate().length > 2 ? new Date().getDate() : '0' + new Date().getDate()),

			},
			bornDate: "",
			alert_message: [],
			visible: '',
			rooms: [],
			tourists: [],
			disabled : false,

		}
		this.setData = this.setData.bind(this);
		this.send = this.send.bind(this);
		this.calculeAge = this.calculeAge.bind(this);

	}

	async componentDidMount() {
		let rooms = await callApi('/device_rooms/available', { hotel_id: this.context.hotel_id[0] }, 'GET');
		this.setState({ rooms: rooms.data });
		await callApi('tourists', { hotel_id: this.context.hotel_id[0] }).then(res=>{
			this.setState({ tourists: res.data});
			console.log(this.state.tourists,"reddfsgffd")
		})
		this.calculeAge();
	}
	setData(tourist) {
		this.setState({ tourist: { ...this.state.tourist, ...tourist } });
	}

	async send(e) {
		e.preventDefault()
		await this.setState({ alert_message: [] })

		if (document.forms["formAddGuest"]["first_name"].value) {
			if (!/[a-zA-Z]{1,10}/.test(this.state.tourist.first_name)) {
				this.setState({ alert_message: [...this.state.alert_message, "Invalid first name!"] })
			}
		} else if (document.forms["formAddGuest"]["first_name"].value == "") {
			await this.setState({ alert_message: [...this.state.alert_message, "Missing First Name!"] })
		}

		if (document.forms["formAddGuest"]["last_name"].value) {
			if (!/[a-zA-Z]{1,10}/.test(this.state.tourist.last_name)) {
				this.setState({ alert_message: [...this.state.alert_message, "Invalid Last name!"] })
				}}else if (document.forms["formAddGuest"]["last_name"].value == ""){
				  await this.setState({ alert_message: [...this.state.alert_message, "Missing Last Name!"] })
				}

				// if( document.forms["formAddGuest"]["phone_number"].value ){
				// 	if (!/^[0-9]*$/.test(this.state.tourist.phone_number)) {
				// 		this.setState({ alert_message: [...this.state.alert_message, "Invalid phone number!"] })
				// 	}}

					if( document.forms["formAddGuest"]["cin_number"].value ){
						if (!/^[0-9-A-Za-z]*$/.test(this.state.tourist.cin_number)) {
							this.setState({ alert_message: [...this.state.alert_message, "Invalid cin_number!"] })
						}}else if (document.forms["formAddGuest"]["cin_number"].value == ""){
						  await this.setState({ alert_message: [...this.state.alert_message, "Missing CIN Number!"] })
						}

						if( document.forms["formAddGuest"]["email"].value ){
							if (!/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/.test(this.state.tourist.email)) {

								this.setState({ alert_message: [...this.state.alert_message, "Invalid email!"] })
							}}else if (document.forms["formAddGuest"]["email"].value == ""){
							  await this.setState({ alert_message: [...this.state.alert_message, "Missing Email!"] })
							}
		
							if( document.forms["formAddGuest"]["check_in"].value ){
								if (!/\d{4}-\d{2}-\d{2}/.test(this.state.tourist.check_in)) {
								this.setState({ alert_message: [...this.state.alert_message, "Invalid check in format !"] })
								}}else if (document.forms["formAddGuest"]["check_in"].value == ""){
								  await this.setState({ alert_message: [...this.state.alert_message, "Missing check in date!"] })
								}


								if( document.forms["formAddGuest"]["check_out"].value ){
									if (!/\d{4}-\d{2}-\d{2}/.test(this.state.tourist.check_out)) {
									this.setState({ alert_message: [...this.state.alert_message, "Invalid check out format  !"] })
									}}else if (document.forms["formAddGuest"]["check_out"].value == ""){
									  await this.setState({ alert_message: [...this.state.alert_message, "Missing check Out Date!"] })
									}

									

								if( document.forms["formAddGuest"]["born"].value ){
									if (!/\d{4}-\d{2}-\d{2}/.test(this.state.tourist.born)) {
									this.setState({ alert_message: [...this.state.alert_message, "Invalid Born Date format  !"] })
									}}else if (document.forms["formAddGuest"]["born"].value == ""){
									  await this.setState({ alert_message: [...this.state.alert_message, "Missing Born Date!"] })
									} 


									if( document.forms["formAddGuest"]["phone_number"].value ){
										if (!/^[0-9]*$/.test(this.state.tourist.phone_number)) {
										this.setState({ alert_message: [...this.state.alert_message, " Phone number must be 8 number  !"] })
										}}else if (document.forms["formAddGuest"]["phone_number"].value == ""){
										  await this.setState({ alert_message: [...this.state.alert_message, "Missing Phone number!"] })
										} 


										if( document.forms["formAddGuest"]["city"].value ){
											if (!/[A-Za-z]/.test(this.state.tourist.city)) {
											this.setState({ alert_message: [...this.state.alert_message, "Invalid City Name !"] })
											}}
	
	       (
			(this.state.tourist.gender == undefined &&  await this.setState({ alert_message: [...this.state.alert_message, "Missing gender !"] }))
			||(this.state.tourist.country == undefined &&  await this.setState({ alert_message: [...this.state.alert_message, "Missing  country!"] }))
			||(this.state.tourist.room_id == undefined &&  await this.setState({ alert_message: [...this.state.alert_message, "attache guest to a room !"] }))
			)  
		
		if ((this.state.tourist.check_in > this.state.tourist.check_out)) {

			this.setState({ alert_message: [...this.state.alert_message, "check in date must be lower to check out date! "] })
		}

		 
			this.state.tourists.map(tourist => {
			
				return this.state.tourist.cin_number == tourist.cin_number && this.setState({ alert_message: [...this.state.alert_message, "CIN already registered!"] })
			})
			this.state.tourists.map(tourist => {
				return this.state.tourist.phone_number == tourist.phone_number && this.setState({ alert_message: [...this.state.alert_message, "Phone number already registered!"] })
			})
			this.state.tourists.map(tourist => {
				return this.state.tourist.email == tourist.email && this.setState({ alert_message: [...this.state.alert_message, "Email already registered!"] })
			})
		
console.log(this.state.room_id,"room_id")

		this.calculeAge(this.state.tourist.born)
		if (this.state.alert_message.length == 0) {
			await callApi('tourist', this.state.tourist, 'POST')
				.then(res => {
					this.setState({ visible: "success" })
					firebase
						.database()
						.ref("Tourists")
						.child(res.data[0].id)
						.set({
							nom: this.state.tourist.first_name + ' ' + this.state.tourist.last_name,
							id: res.data[0].id,
							hotel_id: this.context.hotel_id[0],
						});
					this.cancelForm();
					this.setState({ disabled: true})
				}).catch(error => { this.setState({ visible: "echec" }) })
		} else if (this.state.alert_message.length !== 0) {
			this.setState({ disabled: false})
			this.setState({ visible: "echec" });
		}

	}
	closeModal() {
		this.setState({
			visible: false
		});
	}
	onFocus(e) {
		e.currentTarget.type = "date";
	}
	onBlurout(e) {
		e.currentTarget.type = "text";
		e.currentTarget.placeholder = "check out Date";
	}
	onBlurin(e) {
		e.currentTarget.type = "text";
		e.currentTarget.placeholder = "check in Date";
	}
	onBlurborn(e) {
		e.currentTarget.type = "text";
		e.currentTarget.placeholder = "Born Date";
	}
	cancelForm = () => {
		this.myFormRef.reset();
	}
	calculeAge(e) {
		let birthdate = new Date(e);
		let cur = new Date();
		let diff = cur - birthdate; // This is the difference in milliseconds
		let age = Math.floor(diff / 31557600000); // Divide by 1000*60*60*24*365.25
		this.setData({ age: age })
	}

	render() {
		console.log((new Date().getMonth()).length, "osedlflsd")

		return <div className='tourist-form-add'>

			<div className="tourist-header">
				<div className="tourist_image"><img src="/img/ui/ajjouter_client.png" /></div>
				<div >Add Guest</div>
			</div>
			<div className="message-erreur" >
				{this.state.alert_message.map(x => <p>{x}</p>)}
			</div>
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
						<div>successfully added !</div>
						<button onClick={() => this.closeModal()} >X</button>
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
						<div>Reinsert information please !</div>
						<button onClick={() => this.closeModal()} >X</button>
					</div>
				</Modal>
				: null}
			<div className="tourist-inputs">
				<form ref={(el) => this.myFormRef = el} name="formAddGuest"   >
					<select name="prefix_name" onChange={(e) => this.setData({ prefix_name: e.target.value })}>
						<option selected disabled hidden>Choose prefix</option>
						<option value="Mr.">Mr.</option>
						<option value="Ms.">Ms.</option>
						<option value="Miss.">Miss.</option>
						<option value="Mrs.">Mrs.</option>
					</select>
					<input type="text" required placeholder="First Name" name="first_name" onChange={(e) => this.setData({ first_name: e.target.value })} />
					<input type="text" required placeholder="Last Name" name="last_name" onChange={(e) => this.setData({ last_name: e.target.value })} />


					<select name="gender" onChange={(e) => this.setData({ gender: e.target.value })} >
						<option selected disabled hidden>Gender</option>
						<option value="2">Female</option>
						<option value="1">Male</option>
						<option value="0">Other</option>
					</select>
					<input type="email" required placeholder="Email" name="email" onChange={(e) => this.setData({ email: e.target.value })} />
					<input type="text" onFocus={this.onFocus} onBlur={this.onBlurborn} required placeholder="Born" name="born" onChange={(e) => this.setData({ born: e.target.value })} />
					<input type="number" required placeholder="Phone number" name="phone_number" onChange={(e) => this.setData({ phone_number: e.target.value })} maxlength="9" pattern=".{0,8}" />
					<input type="text" required placeholder="CIN Number / Passport Number" name="cin_number" onChange={(e) => this.setData({ cin_number: e.target.value })} />
					{/* <input type="number"  required  placeholder="Passport Number" name="passport_number" onChange={(e)=>this.setData({passport_number: e.target.value})}  /> */}

					<select name="country" onChange={(e) => this.setData({ country: e.target.value })} >
						<option selected disabled hidden>Country</option>
						<option value="AF">Afghanistan</option>
						<option value="AX">Åland Islands</option>
						<option value="AL">Albania</option>
						<option value="DZ">Algeria</option>
						<option value="AS">American Samoa</option>
						<option value="AD">Andorra</option>
						<option value="AO">Angola</option>
						<option value="AI">Anguilla</option>
						<option value="AQ">Antarctica</option>
						<option value="AG">Antigua and Barbuda</option>
						<option value="AR">Argentina</option>
						<option value="AM">Armenia</option>
						<option value="AW">Aruba</option>
						<option value="AU">Australia</option>
						<option value="AT">Austria</option>
						<option value="AZ">Azerbaijan</option>
						<option value="BS">Bahamas</option>
						<option value="BH">Bahrain</option>
						<option value="BD">Bangladesh</option>
						<option value="BB">Barbados</option>
						<option value="BY">Belarus</option>
						<option value="BE">Belgium</option>
						<option value="BZ">Belize</option>
						<option value="BJ">Benin</option>
						<option value="BM">Bermuda</option>
						<option value="BT">Bhutan</option>
						<option value="BO">Bolivia, Plurinational State of</option>
						<option value="BQ">Bonaire, Sint Eustatius and Saba</option>
						<option value="BA">Bosnia and Herzegovina</option>
						<option value="BW">Botswana</option>
						<option value="BV">Bouvet Island</option>
						<option value="BR">Brazil</option>
						<option value="IO">British Indian Ocean Territory</option>
						<option value="BN">Brunei Darussalam</option>
						<option value="BG">Bulgaria</option>
						<option value="BF">Burkina Faso</option>
						<option value="BI">Burundi</option>
						<option value="KH">Cambodia</option>
						<option value="CM">Cameroon</option>
						<option value="CA">Canada</option>
						<option value="CV">Cape Verde</option>
						<option value="KY">Cayman Islands</option>
						<option value="CF">Central African Republic</option>
						<option value="TD">Chad</option>
						<option value="CL">Chile</option>
						<option value="CN">China</option>
						<option value="CX">Christmas Island</option>
						<option value="CC">Cocos (Keeling) Islands</option>
						<option value="CO">Colombia</option>
						<option value="KM">Comoros</option>
						<option value="CG">Congo</option>
						<option value="CD">Congo, the Democratic Republic of the</option>
						<option value="CK">Cook Islands</option>
						<option value="CR">Costa Rica</option>
						<option value="CI">Côte d'Ivoire</option>
						<option value="HR">Croatia</option>
						<option value="CU">Cuba</option>
						<option value="CW">Curaçao</option>
						<option value="CY">Cyprus</option>
						<option value="CZ">Czech Republic</option>
						<option value="DK">Denmark</option>
						<option value="DJ">Djibouti</option>
						<option value="DM">Dominica</option>
						<option value="DO">Dominican Republic</option>
						<option value="EC">Ecuador</option>
						<option value="EG">Egypt</option>
						<option value="SV">El Salvador</option>
						<option value="GQ">Equatorial Guinea</option>
						<option value="ER">Eritrea</option>
						<option value="EE">Estonia</option>
						<option value="ET">Ethiopia</option>
						<option value="FK">Falkland Islands (Malvinas)</option>
						<option value="FO">Faroe Islands</option>
						<option value="FJ">Fiji</option>
						<option value="FI">Finland</option>
						<option value="FR">France</option>
						<option value="GF">French Guiana</option>
						<option value="PF">French Polynesia</option>
						<option value="TF">French Southern Territories</option>
						<option value="GA">Gabon</option>
						<option value="GM">Gambia</option>
						<option value="GE">Georgia</option>
						<option value="DE">Germany</option>
						<option value="GH">Ghana</option>
						<option value="GI">Gibraltar</option>
						<option value="GR">Greece</option>
						<option value="GL">Greenland</option>
						<option value="GD">Grenada</option>
						<option value="GP">Guadeloupe</option>
						<option value="GU">Guam</option>
						<option value="GT">Guatemala</option>
						<option value="GG">Guernsey</option>
						<option value="GN">Guinea</option>
						<option value="GW">Guinea-Bissau</option>
						<option value="GY">Guyana</option>
						<option value="HT">Haiti</option>
						<option value="HM">Heard Island and McDonald Islands</option>
						<option value="VA">Holy See (Vatican City State)</option>
						<option value="HN">Honduras</option>
						<option value="HK">Hong Kong</option>
						<option value="HU">Hungary</option>
						<option value="IS">Iceland</option>
						<option value="IN">India</option>
						<option value="ID">Indonesia</option>
						<option value="IR">Iran, Islamic Republic of</option>
						<option value="IQ">Iraq</option>
						<option value="IE">Ireland</option>
						<option value="IM">Isle of Man</option>
						<option value="IL">Israel</option>
						<option value="IT">Italy</option>
						<option value="JM">Jamaica</option>
						<option value="JP">Japan</option>
						<option value="JE">Jersey</option>
						<option value="JO">Jordan</option>
						<option value="KZ">Kazakhstan</option>
						<option value="KE">Kenya</option>
						<option value="KI">Kiribati</option>
						<option value="KP">Korea, Democratic People's Republic of</option>
						<option value="KR">Korea, Republic of</option>
						<option value="KW">Kuwait</option>
						<option value="KG">Kyrgyzstan</option>
						<option value="LA">Lao People's Democratic Republic</option>
						<option value="LV">Latvia</option>
						<option value="LB">Lebanon</option>
						<option value="LS">Lesotho</option>
						<option value="LR">Liberia</option>
						<option value="LY">Libya</option>
						<option value="LI">Liechtenstein</option>
						<option value="LT">Lithuania</option>
						<option value="LU">Luxembourg</option>
						<option value="MO">Macao</option>
						<option value="MK">Macedonia, the former Yugoslav Republic of</option>
						<option value="MG">Madagascar</option>
						<option value="MW">Malawi</option>
						<option value="MY">Malaysia</option>
						<option value="MV">Maldives</option>
						<option value="ML">Mali</option>
						<option value="MT">Malta</option>
						<option value="MH">Marshall Islands</option>
						<option value="MQ">Martinique</option>
						<option value="MR">Mauritania</option>
						<option value="MU">Mauritius</option>
						<option value="YT">Mayotte</option>
						<option value="MX">Mexico</option>
						<option value="FM">Micronesia, Federated States of</option>
						<option value="MD">Moldova, Republic of</option>
						<option value="MC">Monaco</option>
						<option value="MN">Mongolia</option>
						<option value="ME">Montenegro</option>
						<option value="MS">Montserrat</option>
						<option value="MA">Morocco</option>
						<option value="MZ">Mozambique</option>
						<option value="MM">Myanmar</option>
						<option value="NA">Namibia</option>
						<option value="NR">Nauru</option>
						<option value="NP">Nepal</option>
						<option value="NL">Netherlands</option>
						<option value="NC">New Caledonia</option>
						<option value="NZ">New Zealand</option>
						<option value="NI">Nicaragua</option>
						<option value="NE">Niger</option>
						<option value="NG">Nigeria</option>
						<option value="NU">Niue</option>
						<option value="NF">Norfolk Island</option>
						<option value="MP">Northern Mariana Islands</option>
						<option value="NO">Norway</option>
						<option value="OM">Oman</option>
						<option value="PK">Pakistan</option>
						<option value="PW">Palau</option>
						<option value="PS">Palestinian Territory, Occupied</option>
						<option value="PA">Panama</option>
						<option value="PG">Papua New Guinea</option>
						<option value="PY">Paraguay</option>
						<option value="PE">Peru</option>
						<option value="PH">Philippines</option>
						<option value="PN">Pitcairn</option>
						<option value="PL">Poland</option>
						<option value="PT">Portugal</option>
						<option value="PR">Puerto Rico</option>
						<option value="QA">Qatar</option>
						<option value="RE">Réunion</option>
						<option value="RO">Romania</option>
						<option value="RU">Russian Federation</option>
						<option value="RW">Rwanda</option>
						<option value="BL">Saint Barthélemy</option>
						<option value="SH">Saint Helena, Ascension and Tristan da Cunha</option>
						<option value="KN">Saint Kitts and Nevis</option>
						<option value="LC">Saint Lucia</option>
						<option value="MF">Saint Martin (French part)</option>
						<option value="PM">Saint Pierre and Miquelon</option>
						<option value="VC">Saint Vincent and the Grenadines</option>
						<option value="WS">Samoa</option>
						<option value="SM">San Marino</option>
						<option value="ST">Sao Tome and Principe</option>
						<option value="SA">Saudi Arabia</option>
						<option value="SN">Senegal</option>
						<option value="RS">Serbia</option>
						<option value="SC">Seychelles</option>
						<option value="SL">Sierra Leone</option>
						<option value="SG">Singapore</option>
						<option value="SX">Sint Maarten (Dutch part)</option>
						<option value="SK">Slovakia</option>
						<option value="SI">Slovenia</option>
						<option value="SB">Solomon Islands</option>
						<option value="SO">Somalia</option>
						<option value="ZA">South Africa</option>
						<option value="GS">South Georgia and the South Sandwich Islands</option>
						<option value="SS">South Sudan</option>
						<option value="ES">Spain</option>
						<option value="LK">Sri Lanka</option>
						<option value="SD">Sudan</option>
						<option value="SR">Suriname</option>
						<option value="SJ">Svalbard and Jan Mayen</option>
						<option value="SZ">Swaziland</option>
						<option value="SE">Sweden</option>
						<option value="CH">Switzerland</option>
						<option value="SY">Syrian Arab Republic</option>
						<option value="TW">Taiwan, Province of China</option>
						<option value="TJ">Tajikistan</option>
						<option value="TZ">Tanzania, United Republic of</option>
						<option value="TH">Thailand</option>
						<option value="TL">Timor-Leste</option>
						<option value="TG">Togo</option>
						<option value="TK">Tokelau</option>
						<option value="TO">Tonga</option>
						<option value="TT">Trinidad and Tobago</option>
						<option value="TN">Tunisia</option>
						<option value="TR">Turkey</option>
						<option value="TM">Turkmenistan</option>
						<option value="TC">Turks and Caicos Islands</option>
						<option value="TV">Tuvalu</option>
						<option value="UG">Uganda</option>
						<option value="UA">Ukraine</option>
						<option value="AE">United Arab Emirates</option>
						<option value="GB">United Kingdom</option>
						<option value="US">United States</option>
						<option value="UM">United States Minor Outlying Islands</option>
						<option value="UY">Uruguay</option>
						<option value="UZ">Uzbekistan</option>
						<option value="VU">Vanuatu</option>
						<option value="VE">Venezuela, Bolivarian Republic of</option>
						<option value="VN">Viet Nam</option>
						<option value="VG">Virgin Islands, British</option>
						<option value="VI">Virgin Islands, U.S.</option>
						<option value="WF">Wallis and Futuna</option>
						<option value="EH">Western Sahara</option>
						<option value="YE">Yemen</option>
						<option value="ZM">Zambia</option>
						<option value="ZW">Zimbabwe</option>
					</select>
					<input type="text" required placeholder="City" name="city" onChange={(e) => this.setData({ city: e.target.value })} />
					<input type="number" required placeholder="Zip code" name="zip_code" onChange={(e) => this.setData({ zip_code: e.target.value })} />
					<input type="text" required placeholder="Address" name="address_1" onChange={(e) => this.setData({ address_1: e.target.value })} />
					<input type="text" onFocus={this.onFocus} onBlur={this.onBlurin} defaultValue={this.state.tourist.check_in} required placeholder="Check In" name="check_in" onChange={(e) => this.setData({ check_in: e.target.value })} />
					<input type="text" onFocus={this.onFocus} onBlur={this.onBlurout} required placeholder="Check Out" name="check_out" onChange={(e) => this.setData({ check_out: e.target.value })} />
					<select name="prefix_name" onChange={(e) => this.setData({ room_id: e.target.value })}>
						<option selected disabled hidden>Affect Guest to room</option>
						{this.state.rooms.filter(x => x.device.id !== null).map(x => (
							<option value={x.room.id}>{x.room.room_number} {x.stay.tourist.id !== null ? '(Occupied)' : ''}</option>
						))}
					</select>
					{this.state.disabled == false ? 
					<button onClick={this.send}>
						<img src="/img/ui/valid.png" />
						Confirm
          </button>: <button className="sendingData" onClick={()=>{window.location.reload()}}> Add New Guest</button>}
				</form>
			</div>

		</div>;

	}
}

AddTouristForm.contextType = UserContext

export default AddTouristForm;
