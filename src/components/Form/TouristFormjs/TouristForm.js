import React, { Component } from 'react';
import './TouristForm.scss'
import { callApi } from '../../../Helpers';
import { UserContext } from '../../Context'
import Modal from 'react-awesome-modal';

class TouristForm extends Component {
	constructor(props, context) {
		super(props, context)
		this.state = {
			tourist: {},
			visible: '',
			alert_message: [],
			rooms: [],
			room_id: 0


		}
		this.send = this.send.bind(this)
		this.setData = this.setData.bind(this)
	}
	async componentDidMount() {
		let tourist = await callApi('tourist/' + this.props.match.params.id)
		this.setState({ tourist: tourist.data[0] });
		let rooms = await callApi('/device_rooms/available', { hotel_id: this.context.hotel_id[0] }, 'GET');
		this.setState({ rooms: rooms.data });
	}

	setData(tourist) {
		this.setState({ tourist: { ...this.state.tourist, ...tourist } })
	}
	closeModal() {
		this.setState({
			visible: false
		});
	}
	async send(e) {
		e.preventDefault()

		await this.setState({ alert_message: [] }) //pour qu'il vider la state a chaqu fois des erreur 


		if (document.forms["formEditGuest"]["first_name"].value) {
			if (!/[a-z]{1,10}/.test(this.state.tourist.first_name)) {
				this.setState({ alert_message: [...this.state.alert_message, "Invalid first name!"] })
			}
		} else if (document.forms["formEditGuest"]["first_name"].value == "") {
			await this.setState({ alert_message: [...this.state.alert_message, "Missing First Name!"] })
		}

		if (document.forms["formEditGuest"]["last_name"].value) {
			if (!/[a-z]{1,10}/.test(this.state.tourist.last_name)) {
				this.setState({ alert_message: [...this.state.alert_message, "Invalid last name!"] })
			}
		} else if (document.forms["formEditGuest"]["last_name"].value == "") {
			await this.setState({ alert_message: [...this.state.alert_message, "Missing last Name!"] })
		}

		if (document.forms["formEditGuest"]["email"].value) {
			if (!/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/.test(this.state.tourist.email)) {
				this.setState({ alert_message: [...this.state.alert_message, "Invalid email!"] })
			}
		} else if (document.forms["formEditGuest"]["email"].value == "") {
			await this.setState({ alert_message: [...this.state.alert_message, "Missing Email!"] })
		}

		if (document.forms["formEditGuest"]["check_out"].value) {
			if (!/\d{4}-\d{2}-\d{2}/.test(this.state.tourist.check_out)) {
				this.setState({ alert_message: [...this.state.alert_message, "Invalid Date format !"] })
			}
		} else if (document.forms["formEditGuest"]["check_out"].value == "") {
			await this.setState({ alert_message: [...this.state.alert_message, "Missing check Out Date!"] })
		}


		if (document.forms["formEditGuest"]["check_in"].value) {
			if (!/\d{4}-\d{2}-\d{2}/.test(this.state.tourist.check_in)) {
				this.setState({ alert_message: [...this.state.alert_message, "Invalid Date format  !"] })
			}
		} else if (document.forms["formEditGuest"]["check_in"].value == "") {
			await this.setState({ alert_message: [...this.state.alert_message, "Missing check in Date!"] })
		}


		if (document.forms["formEditGuest"]["cin_number"].value) {
			if (!/^[0-9]*$/.test(this.state.tourist.cin_number)) {
				this.setState({ alert_message: [...this.state.alert_message, "Invalid cin_number!"] })
			}
		} else if (document.forms["formEditGuest"]["cin_number"].value == "") {
			await this.setState({ alert_message: [...this.state.alert_message, "Missing CIN number!"] })
		}

		if (document.forms["formEditGuest"]["phone_number"].value) {
			if (!/^[0-9]*$/.test(this.state.tourist.phone_number)) {
				this.setState({ alert_message: [...this.state.alert_message, "Invalid Phone Number!"] })
			}
		} else if (document.forms["formEditGuest"]["phone_number"].value == "") {
			await this.setState({ alert_message: [...this.state.alert_message, "Missing Phone Number!"] })
		}

		if (document.forms["formEditGuest"]["city"].value) {
			if (!/[A-Za-z]/.test(this.state.tourist.city)) {
				this.setState({ alert_message: [...this.state.alert_message, "Invalid City Name !"] })
			}
		}



		if (!/\d{4}-\d{2}-\d{2}/.test(this.state.tourist.born)) {

			this.setState({ alert_message: [...this.state.alert_message, "Invalid Date format  !"] })
		}
		if ((this.state.tourist.check_in > this.state.tourist.check_out)) {

			this.setState({ alert_message: [...this.state.alert_message, "check in  must be lower than check out ! "] })
		}
		await callApi('tourists', { hotel_id: this.context.hotel_id[0] }).then(res => {
			let otherTourists = res.data.reduce((otherTourists, item) => {
				if (item.id !== this.state.tourist.id) {
					otherTourists.push(item);
				}
				return otherTourists;

			}, []);
			otherTourists.map(tourist => {
				return this.state.tourist.email == tourist.email && this.setState({ alert_message: [...this.state.alert_message, "Email already registered !"] })
			})
			otherTourists.map(tourist => {
				return this.state.tourist.cin_number == tourist.cin_number && this.setState({ alert_message: [...this.state.alert_message, "CIN already registered !"] })
			})
			otherTourists.map(tourist => {
				return this.state.tourist.phone_number == tourist.phone_number && this.setState({ alert_message: [...this.state.alert_message, "Phone number already registered !"] })
			})


		})

		if (this.state.alert_message.length == 0)


			await callApi('tourist/' + this.state.tourist.id,
				{
					prefix_name: this.state.tourist.prefix_name, first_name: this.state.tourist.first_name, last_name: this.state.tourist.last_name,
					gender: this.state.tourist.gender, email: this.state.tourist.email, born: this.state.tourist.born,
					phone_number: this.state.tourist.phone_number, country: this.state.tourist.country, city: this.state.tourist.city,
					zip_code: this.state.tourist.zip_code, address_1: this.state.tourist.address_1, cin_number: this.state.tourist.cin_number
					, check_in: this.state.tourist.check_in, check_out: this.state.tourist.check_out
				}
				, 'PUT').then(res => { console.log(res, "success") }).catch(error => {
					this.setState({ visible: "echec" })
				})
		if (this.state.room_id > 0)
			await callApi('stays/switch', { 'tourist_id': this.state.tourist.id, 'device_room_id': this.state.room_id }, 'PUT').then(res => console.log('result', res)).catch(error => console.log('error', error));

		if (this.state.alert_message.length == 0) {
			this.setState({ visible: "success" })
			// setTimeout(() => document.location.href = "/guest", 1000);
		} else {
			this.setState({ visible: "echec" })
		}
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
	render() {
		console.log(this.state.tourist, "toujjjfjdksfjqjes")

		return <div className='tourist-form-add'>

			<div className="tourist-header">
				<div className="tourist_image"><img src="/img/ui/ajjouter_client.png" /></div>
				<div >Edit Guest</div>
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
						<div>successfully Updated !</div>
						{/* <button  onClick={() => this.closeModal()} >X</button> */}
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
			<div className="input-tourists">
				<form name="formEditGuest"  >

					<div className="form-grouping-half-tourist-edit">
						<label className="input-label-half-tourist-edit"> Prefix Name </label>
						<label className="input-label-half-tourist-edit">First Name</label>
						<label className="input-label-half-tourist-edit">Last Name</label>
						<select name="prefix_name" onChange={(e) => this.setData({ prefix_name: e.target.value })} className="input-half-tourist-edit">
							<option selected disabled hidden>{this.state.tourist.prefix_name || ''}</option>
							<option value="Mr.">Mr.</option>
							<option value="Ms.">Ms.</option>
							<option value="Miss.">Miss.</option>
							<option value="Mrs.">Mrs.</option>
						</select>

						<input
							type="text"
							placeholder="first name"
							name="first_name"
							value={this.state.tourist.first_name || ''}
							onChange={(e) => this.setData({ first_name: e.target.value })}
							className="input-half-tourist-edit" />


						<input
							type="text"
							placeholder="last name"
							name="last_name"
							value={this.state.tourist.last_name || ''}
							onChange={(e) => this.setData({ last_name: e.target.value })}
							className="input-half-tourist-edit" />

					</div>
					<div className="form-grouping-half-tourist-edit">

						<label className="input-label-half-tourist-edit">Gender </label>
						<label className="input-label-half-tourist-edit"> Email</label>
						<label className="input-label-half-tourist-edit">Born</label>


						<select name="gender" onChange={(e) => this.setData({ gender: e.target.value })} className="input-half-tourist-edit" >
							<option selected disabled hidden>{this.state.tourist.gender == 2 && "female" || this.state.tourist.gender == 1 && "Male" || this.state.tourist.gender == 0 && "Other" || ''}</option>
							<option value="2">Female</option>
							<option value="1">Male</option>
							<option value="0">Other</option>
						</select>
						<input
							type="text"
							placeholder="email"
							name="email"
							value={this.state.tourist.email || ''}
							onChange={(e) => this.setData({ email: e.target.value })}
							className="input-half-tourist-edit" />


						<input
							type="text" onFocus={this.onFocus} onBlur={this.onBlurborn} required
							placeholder="born Date"
							value={this.state.tourist.born || ''}
							onChange={(e) => this.setData({ born: e.target.value })}
							className="input-half-tourist-edit" />
					</div>


					<div class="form-grouping-half-tourist-edit">
						<label className="input-label-half-tourist-edit"> Phone Number</label>
						<label className="input-label-half-tourist-edit">Cin Number / Passport Number</label>
						<label className="input-label-half-tourist-edit"> Country</label>
						<input
							type="text"
							placeholder="phone_number"
							name="phone_number"
							value={this.state.tourist.phone_number || ''}
							onChange={(e) => this.setData({ phone_number: e.target.value })}
							className="input-half-tourist-edit" />

						<input
							type="text"
							placeholder="cin_number"
							name="cin_number"
							value={this.state.tourist.cin_number || this.state.tourist.passport_number || ""}
							onChange={(e) => this.setData({ cin_number: e.target.value })}
							className="input-half-tourist-edit" />

						<select name="country" onChange={(e) => this.setData({ country: e.target.value })} className="input-half-tourist-edit" >
							<option selected disabled hidden>{this.state.tourist.country || ''}</option>
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
					</div>
					<div class="form-grouping-half-tourist-edit">


						<label className="input-label-half-tourist-edit"> City</label>
						<label className="input-label-half-tourist-edit">Zip Code</label>
						<label className="input-label-half-tourist-edit"> Address </label>




						<input
							type="text"
							placeholder="city"
							name="city"
							value={this.state.tourist.city || ''}
							onChange={(e) => this.setData({ city: e.target.value })}
							className="input-half-tourist-edit" />

						<input
							type="text"
							placeholder="zip_code"
							value={this.state.tourist.zip_code || ''}
							onChange={(e) => this.setData({ zip_code: e.target.value })}
							className="input-half-tourist-edit" />

						<input
							type="text"
							placeholder="address_1"
							value={this.state.tourist.address_1 || ''}
							onChange={(e) => this.setData({ address_1: e.target.value })}
							className="input-half-tourist-edit" />
					</div>
					<div class="form-grouping-half-tourist-edit">


						<label className="input-label-half-tourist-edit"> Check In</label>
						<label className="input-label-half-tourist-edit">Check Out</label>
						<label for="switch_room" className="input-label-half-tourist-edit">Switch Room</label>



						<input
							type="text" onFocus={this.onFocus} onBlur={this.onBlurin} required
							placeholder="check in Date"
							name="check_in"
							value={this.state.tourist.check_in || ''}
							onChange={(e) => this.setData({ check_in: e.target.value })}
							className="input-half-tourist-edit" />

						<input
							type="text" onFocus={this.onFocus} onBlur={this.onBlurout} required
							name="check_out"
							placeholder="check out Date"
							value={this.state.tourist.check_out || ''}
							onChange={(e) => this.setData({ check_out: e.target.value })}
							className="input-half-tourist-edit" />


						<select id="switch_room" name="switch_room" onChange={(e) => this.setState({ room_id: e.target.value })} className="input-half-tourist-edit">
							<option selected disabled hidden>Choose a new room</option>
							{this.state.rooms.filter(x => x.device.id !== null).map(x => (
								<option value={x.id}>{x.room.room_number}</option>
							))}
						</select>

						<button onClick={this.send}>
							<img src="/img/ui/valid.png" />
							Confirm
        </button>







					</div>
				</form>
			</div>
		</div>;




	}

}

TouristForm.contextType = UserContext

export default TouristForm;
