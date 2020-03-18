import React, { Component } from 'react';
import './EmployeeEditForm.scss'
import { callApi } from '../../../Helpers';
import { UserContext } from '../../Context'
import AutoristationEdit from './AutoristationEdit/AutoristationEdit'
import Modal from 'react-awesome-modal';

class EmployeeEditForm extends Component {
	constructor(props, context) {
		super(props, context)
		this.state = {
			data: {
				role: 2,
				approved: 1,
				devices: 0,
				employees: 0,
				guests: 0,
				history: 0,
				orders_reservations: 0,
				rooms: 0,
				statistics: 0,
				notifications: 0,
				chat: 0,
				hotel_id: this.context.hotel_id[0],
			},
			employee: {},
			postAccess: [],
			alert_message: [],
		}
		this.edit = this.edit.bind(this)
		this.setData = this.setData.bind(this)
		this.setPostAccessData = this.setPostAccessData.bind(this)

	}
	async componentDidMount() {
		let x = await callApi('user/' + this.props.match.params.id);
		this.setState({ data: x.data[0] });
	}

	async setPostAccessData(postID, value) {
		let column = {
			post_id: postID,
			authorized: value
		}
		await this.setState({ postAccess: [...this.state.postAccess, column] });
	}

	async edit() {
		await this.setState({ alert_message: [] });
		if (document.forms["formEditEmployee"]["name"].value) {
			if (!/[A-Za-z]/.test(this.state.data.name)) {
				this.setState({ alert_message: [...this.state.alert_message, "Invalid Name!"] })
			}
		} else if (document.forms["formEditEmployee"]["name"].value == "") {
			await this.setState({ alert_message: [...this.state.alert_message, "Missing Name Employee!"] })
		}
		if (document.forms["formEditEmployee"]["email"].value) {
			if (!/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/.test(this.state.data.email)) {
				this.setState({ alert_message: [...this.state.alert_message, "Invalid Email!"] })
			}
		} else if (document.forms["formEditEmployee"]["email"].value == "") {
			await this.setState({ alert_message: [...this.state.alert_message, "Missing Email Employee!"] })
		}
		if (document.forms["formEditEmployee"]["phone_number"].value) {
			if (!/^[0-9]*$/.test(this.state.data.phone_number)) {
				this.setState({ alert_message: [...this.state.alert_message, " Invalid Phone number  !"] })
			}
		} else if (document.forms["formEditEmployee"]["phone_number"].value == "") {
			await this.setState({ alert_message: [...this.state.alert_message, "Missing Phone number!"] })
		}
		if (document.forms["formEditEmployee"]["cin"].value) {
			if (!/^[0-9-A-Za-z]*$/.test(this.state.data.cin)) {
				this.setState({ alert_message: [...this.state.alert_message, "Invalid cin!"] })
			}
		} else if (document.forms["formEditEmployee"]["cin"].value == "") {
			await this.setState({ alert_message: [...this.state.alert_message, "Missing CIN Number!"] })
		}
		if (document.forms["formEditEmployee"]["born"].value) {
			if (!/\d{4}-\d{2}-\d{2}/.test(this.state.data.born)) {
				this.setState({ alert_message: [...this.state.alert_message, "Invalid Born Date format !"] })
			}
		} else if (document.forms["formEditEmployee"]["born"].value == "") {
			await this.setState({ alert_message: [...this.state.alert_message, "Missing Born Date!"] })
		}
		let request = {
			role: 2,
			approved: 1,
			devices: this.state.data.devices,
			employees: this.state.data.employees,
			guests: this.state.data.guests,
			history: this.state.data.history,
			orders_reservations: this.state.data.orders_reservations,
			rooms: this.state.data.rooms,
			statistics: this.state.data.statistics,
			notifications: this.state.data.notifications,
			chat: this.state.data.chat,
			postAccess: JSON.stringify(this.state.postAccess),
			prefix: this.state.data.prefix,
			name: this.state.data.name,
			email: this.state.data.email,
			password: this.state.data.password,
			gender: this.state.data.gender,
			born: this.state.data.born,
			phone_number: this.state.data.phone_number,
			cin: this.state.data.cin,
			country: this.state.data.country,
			city: this.state.data.city,
			zip_code: this.state.data.zip_code,
			adress: this.state.data.adress,
			hotel_id: this.context.hotel_id[0]
		}
		await callApi('user/' + this.props.match.params.id, request, 'PUT').then(res => { this.setState({ visible: "success" }) }).catch(err=>{this.setState({ visible: "echec" })});
		if (this.state.alert_message.length == 0) {
			this.setState({ visible: "success" })
			setTimeout(() => document.location.href = "/employees", 1000);
		} else {
			this.setState({ visible: "echec" })
		}

	}

	setData(data) {
		this.setState({ data: { ...this.state.data, ...data } });
	}
	closeModal = () => {
		this.setState({
			visible: false
		});
	}
	render() {
		console.log(this.state.data,"datadata")
		return <div className='employee-form-add'>
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
						<div>Successfully updated !</div>
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
						<div>Reinsert information please !</div>
						<button onClick={() => this.closeModal()} >X</button>
					</div>
				</Modal>
				: null}
			<div className="message-erreur" >
				{this.state.alert_message.map(x => <p>{x}</p>)}
			</div>
			<div className="employee-inputs-all" >
				<div className="employee-inputs">
					<form name="formEditEmployee">
						<select name="prefix" onChange={(e) => this.setData({ prefix: e.target.value })}>
							<option selected disabled hidden>{this.state.data.prefix} </option>
							<option value="Mr.">Mr.</option>
							<option value="Ms.">Ms.</option>
							<option value="Miss.">Miss.</option>
							<option value="Mrs.">Mrs.</option>
						</select>
						<input placeholder="Name" name="name" defaultValue={this.state.data.name} onChange={(e) => this.setData({ name: e.target.value })} />
						<input type="text" placeholder="Email" name="email" defaultValue={this.state.data.email} onChange={(e) => this.setData({ email: e.target.value })} />
						<input type="password" placeholder="Password" defaultValue={this.state.data.password} name="password" onChange={(e) => this.setData({ password: e.target.value })} />
						<select name="gender" onChange={(e) => this.setData({ gender: e.target.value })} >
							<option selected disabled hidden>{this.state.data.gender == 2 && "female" || this.state.data.gender == 1 && "Male" || this.state.data.gender == 0 && "Other" || ''}</option>
							<option value="2">Female</option>
							<option value="1">Male</option>
							<option value="0">Other</option>
						</select>
						<input type="date" placeholder="Born" name="born" defaultValue={this.state.data.born} onChange={(e) => this.setData({ born: e.target.value })} />
						<input type="text" placeholder="Phone_number" name="phone_number" defaultValue={this.state.data.phone_number} onChange={(e) => this.setData({ phone_number: e.target.value })} />
						<input type="text" placeholder="Cin" name="cin" defaultValue={this.state.data.cin} onChange={(e) => this.setData({ cin: e.target.value })} />
						<select name="country" defaultValue={this.state.data.country} name="country" onChange={(e) => this.setData({ country: e.target.value })} >
							<option selected disabled hidden>{this.state.data.country}</option>
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
						<input type="text" defaultValue={this.state.data.city} name="city" placeholder="City" onChange={(e) => this.setData({ city: e.target.value })} />
						<input type="text" defaultValue={this.state.data.zip_code} name="zip_code" placeholder="Zip code" onChange={(e) => this.setData({ zip_code: e.target.value })} />
						<input type="text" defaultValue={this.state.data.adress} name="adress" placeholder=" Adress" onChange={(e) => this.setData({ adress: e.target.value })} />
					</form>
				</div>
			</div>
			<AutoristationEdit employee={this.state.data} setData={this.setData} id={this.props.match.params.id} setPostAccessData={this.setPostAccessData} />

			<button className="Button_confirm" onClick={this.edit}>
				<img src="/img/ui/valid.png" />
          Update
        </button>
		</div>;
	}

}

EmployeeEditForm.contextType = UserContext

export default EmployeeEditForm;