import React, { Component } from 'react';
import { UserContext } from '../../Context'
import './RestaurantFormNew.scss'
import OpeningTime from '../../UI/OpeningTime/OpeningTime'
import Modal from 'react-awesome-modal';
import ImageUploader from 'react-images-upload';
import Switcher from './Switch/Switcher'
import SwitchPromotion from './SwitchPromotion/SwitchPromotion'
import Promotion from '../../UI/Promotion/Promotion'

class RestaurantFormNew extends Component {
  constructor(props, context) {
    super(props, context)
    this.state = {
      visible: '',
      check: false,
      checkP: false,
      frenchChoosen: false,
      arabChoosen: false,
      titlePlaceHolder: 'Titre',
      secondTitlePlaceHolder: 'الاسم',
      color: '',
      secondColor: '',
      frBackgroundColor: '',
      arBackgroundColor: '',
      title_fr: '',
      title_ar: '',
      valueFr: false,
      valueAr: false
    }
    this.confirm = this.confirm.bind(this);
    this.secondConfirm = this.secondConfirm.bind(this);
    this.editConfirm = this.editConfirm.bind(this);
    this.editSecondConfirm = this.editSecondConfirm.bind(this);
    this.handleDeleteFr = this.handleDeleteFr.bind(this);
    this.handleDeleteAr = this.handleDeleteAr.bind(this);
  }
  closeModalFr = () => {
    this.setState({
      valueFr: false,
    });
    if (this.state.title_fr.length == 0)
      this.setState({ title_fr: this.props.tradLang.title_fr, color: 'black' });
  }
  closeModalAr = () => {
    this.setState({
      valueAr: false,
    });
    if (this.state.title_ar.length == 0)
      this.setState({ title_ar: this.props.tradLang.title_ar, color: 'black' });
  }
  setCheck = () => {
    this.setState({ check: !this.state.check });
  }

  setCheckPro = () => {
    this.setState({ checkP: !this.state.checkP });
  }
  closeModal = () => {
    this.setState({
      visible: false,
      frBackgroundColor: this.props.tradLang.ar == true && 'rgb(65, 124, 241)',
      arBackgroundColor: this.props.tradLang.fr == true && 'rgb(65, 124, 241)',
      frenchChoosen: this.props.tradLang.ar == true && true,
      arabChoosen: false,
      titlePlaceHolder: 'Title',
      secondTitlePlaceHolder: 'الاسم',
      color: 'black',
      secondColor: 'black',
    });
    if (this.props.tradLang.fr == false && this.props.tradLang.ar == false)
      this.props.setLangPost({ lang_fr: true, lang_ar: false });

  }

  async confirm() {
    if (this.state.title_fr.length > 0) {
      this.closeModal();
      this.props.setLangPost({ fr: true });
      await this.setState({ arabChoosen: true, frBackgroundColor: 'rgb(65, 124, 241)', arBackgroundColor: '#1a3e64' });
      await this.props.setLangPost({ lang_ar: true });
      await this.setState({ frBackgroundColor: 'rgb(65, 124, 241)', arBackgroundColor: 'rgb(65, 124, 241)', title_ar: this.props.tradLang.ar == false ? '' : this.state.title_ar });
    }
    else {
      if (this.state.frenchChoosen) {
        this.setState({ titlePlaceHolder: 'Please Add at least a title ' });
        this.setState({ color: 'red' });
      }
    }
  }

  async secondConfirm() {
    if (this.state.title_ar.length > 0) {
      this.closeModal();
      this.props.setLangPost({ lang_ar: true, lang_fr: true, ar: true });
      await this.setState({ frenchChoosen: true, arBackgroundColor: 'rgb(65, 124, 241)', frBackgroundColor: 'rgb(65, 124, 241)' });
    }
    else {
      this.setState({ secondTitlePlaceHolder: 'الرجاء اضافة الاسم' });
      this.setState({ secondColor: 'red' });
    }
  }

  editConfirm() {
    if (this.state.title_fr.length > 0) {
      this.closeModalFr();
      this.props.setLangPost({ fr: true, title_fr: this.state.title_fr });
    }
    else {
      this.setState({ titlePlaceHolder: 'Please Add at least a title ' });
      this.setState({ color: 'red' });
    }
  }

  editSecondConfirm() {
    if (this.state.title_ar.length > 0) {
      this.closeModalAr();
      this.props.setLangPost({ ar: true, title_ar: this.state.title_ar });
    }
    else {
      this.setState({ secondTitlePlaceHolder: 'الرجاء اضافة الاسم على الأقل' });
      this.setState({ secondColor: 'red' });
    }
  }

  async handleDeleteFr() {
    this.props.setLangPost({ lang_fr: true, title_fr: '', description_fr: '', fr: false, lang_ar: false });
    this.setState({ title_fr: '', frBackgroundColor: this.props.tradLang.ar == true ? 'rgb(65, 124, 241)' : '#1a3e64', arBackgroundColor: '#1a3e64' });

  }
  async handleDeleteAr() {
    this.props.setLangPost({ lang_ar: this.props.tradLang.fr == true ? true : false, title_ar: '', description_ar: '', ar: false, lang_fr: (this.props.tradLang.fr == false) ? true : false });
    this.setState({ title_ar: '', arBackgroundColor: this.props.tradLang.fr == true ? 'rgb(65, 124, 241)' : '#1a3e64', frBackgroundColor: '#1a3e64', frenchChoosen: this.props.tradLang.fr == false && false });
  }

  render() {
    return <div className="form-grid-here">

      {/* frensh edit popup */}

      {this.state.valueFr == true ?
        <Modal
          className="my-modal-restau"
          visible={true}
          width="400"
          height="450"
          effect="fadeInUp"
          onClickAway={() => this.closeModalFr()}
        >
          <div className="add-modal">
            <span className="close_button" onClick={() => { this.closeModalFr() }}>&times;</span>
            <div className="mainrest-container-fr">
              <label>Title :</label>
              <input value={this.state.title_fr} onChange={(e) => { this.setState({ color: 'black' }); { this.setState({ title_fr: e.target.value }) } }} placeholder={this.state.titlePlaceHolder} style={{ color: this.state.color }} />
              <label>Description :</label>
              <textarea onChange={(e) => this.props.setLangPost({ description_fr: e.target.value })} value={this.props.tradLang.description_fr} placeholder="Description" />
            </div>
            <div className="button-container">
              <div className="bt-valide" onClick={() => { this.editConfirm() }}>
                <img src="/img/ui/valideWhite.png" style={{ width: "16px", height: "16px" }} />
                <p>Confirm</p>
              </div></div>
          </div>
        </Modal>
        : null}


      {/* arabian edit popup */}

      {this.state.valueAr == true ?
        <Modal
          className="my-modal-restau"
          visible={true}
          width="400"
          height="450"
          effect="fadeInUp"
          onClickAway={() => this.closeModalAr()}
        >
          <div className="add-modal">
            <span className="close_button" onClick={() => { this.closeModalAr() }}>&times;</span>
            <div className="mainrest-container-fr">
              <label>:الاسم</label>
              <input value={this.state.title_ar} onChange={(e) => { this.setState({ secondColor: 'black' }); { this.setState({ title_ar: e.target.value }) } }} placeholder={this.state.secondTitlePlaceHolder} style={{ color: this.state.secondColor }} />
              <label>:الوصف</label>
              <textarea onChange={(e) => this.props.setLangPost({ description_ar: e.target.value })} value={this.props.tradLang.description_ar} placeholder="الوصف" />
            </div>
            <div className="button-container">
              <div className="bt-valide" onClick={() => { this.editSecondConfirm() }}>
                <img src="/img/ui/valideWhite.png" style={{ width: "16px", height: "16px" }} />
                <p>تعديل</p>
              </div></div>
          </div>
        </Modal>
        : null}




      {/* add language popup */}

      {this.state.visible == true ?
        <Modal
          className="my-modal-restau"
          visible={this.state.visible}
          width="400"
          height="450"
          effect="fadeInUp"
          onClickAway={() => this.closeModal()}
        >
          <div className="add-modals">
            <span className="close_button" onClick={() => { this.closeModal() }}>&times;</span>
            <div className="language-container">


              {this.props.tradLang.fr == false && <div className="francais-container" value={this.props.tradLang.lang} onClick={() => { { this.setState({ frenchChoosen: true }) }; this.props.setLangPost({ lang_fr: true, lang_ar: false }); this.setState({ frBackgroundColor: 'rgb(65, 124, 241)', arBackgroundColor: '#1a3e64', title_ar: '', secondTitlePlaceHolder: 'الإسم', secondColor: 'black' }) }} style={{ backgroundColor: this.state.frBackgroundColor }} ><p>Fr</p></div>}
              {this.props.tradLang.ar == false && <div className="arabe-container" value={this.props.tradLang.lang} onClick={() => { { this.setState({ arabChoosen: true }) }; this.props.setLangPost({ lang_ar: true, lang_fr: false }); this.setState({ arBackgroundColor: 'rgb(65, 124, 241)', frBackgroundColor: '#1a3e64', title_fr: '', titlePlaceHolder: 'Title', color: 'black' }) }} style={{ backgroundColor: this.state.arBackgroundColor }}><p>Ar</p></div>}

            </div>


            {(this.props.tradLang.fr == false && this.props.tradLang.lang_fr == true) ? <div>
              <div className="mainrest-container">
                <label>Title :</label>
                {this.state.frenchChoosen == true ?
                  <input onChange={(e) => { this.props.setLangPost({ title_fr: e.target.value }); this.setState({ color: 'black' }); { this.setState({ title_fr: e.target.value }) } }} value={this.props.tradLang.title} placeholder={this.state.titlePlaceHolder} style={{ color: this.state.color }} />
                  : <div className="input-fr"><p>Select a language to continue</p></div>}
                <label>Description :</label>
                {this.state.frenchChoosen == true ?
                  <textarea onChange={(e) => this.props.setLangPost({ description_fr: e.target.value })} value={this.props.tradLang.description} placeholder="Description" />
                  : <div className="description-fr"><p>Select a language to continue</p></div>}
              </div>
              <div className="button-container">
                <div className="bt-valide" onClick={() => {
                  this.confirm();
                }}>
                  <img src="/img/ui/valideWhite.png" style={{ width: "16px", height: "16px" }} />
                  <p>Confirm</p>
                </div>
              </div></div>
              : ""}


            {(this.props.tradLang.ar == false && this.props.tradLang.lang_ar == true) ?
              <div>	<div className="mainrest-container-ar">
                <label>:الاسم</label>
                <input onChange={(e) => { this.props.setLangPost({ title_ar: e.target.value }); this.setState({ secondColor: 'black', title_ar: e.target.value }) }} value={this.props.tradLang.title} placeholder={this.state.secondTitlePlaceHolder} style={{ color: this.state.secondColor }} />
                <label> :الوصف</label>
                <textarea onChange={(e) => this.props.setLangPost({ description_ar: e.target.value })} value={this.props.tradLang.description} placeholder="الوصف" />
              </div>
                <div className="button-container">
                  <div className="bt-valide-ar" onClick={() => {
                    this.secondConfirm();
                  }}>
                    <p>إضافة</p>
                    <img src="/img/ui/valideWhite.png" style={{ width: "16px", height: "16px" }} />

                  </div> 
                </div>
              </div> : ""}




          </div>
        </Modal>
        : null
      }


      {/* Add form  */}

      <div className="add-resturant-container">
        <div className="header-restaurant">
          <p>Add Form</p>
        </div>
        <form name="formAddRestau">
        <div className="main-container-restau">

          <div className="main-container-restau-left">
            <label>Title :</label>
            <input
              onChange={(e) => this.props.setData({ title: e.target.value })}
              placeholder="Title"
              name="title"
              value={this.props.data.title} />
            <label>Description :</label>
            <textarea
              value={this.props.data.description}
              placeholder="Description"
              onChange={(e) => this.props.setData({ description: e.target.value })}
            />
            {/* <label>Adresse :</label>
            <input
              onChange={(e) => this.props.setData({ location: e.target.value })}
              placeholder="Adresse"
              value={this.props.data.location} /> */}
          </div>
          <div className="main-container-restau-right">
            <label>Image :</label>
            <ImageUploader
              fileContainerStyle={{ height: '152px', width: "100%", backgroundColor: " #d2d2d2" }}
              onChange={this.props.upload}
              label={'Max file size: 2MB | Allowed formats: jpg, png'}
              maxFileSize="2097152"
              name="image"
            />
          </div>
        </div>
        </form>
        <div className="footer-restaurant">
          <div className="restau-laguage-popup">
            <div className="language-container-bottom">

              {(this.props.tradLang.ar == false || this.props.tradLang.fr == false) &&
                <div className="add-language" onClick={() => { this.setState({ visible: true }) }}>
                  <img src="/img/ui/addShift.png" style={{ width: "23px", height: "23px" }} />
                  <p>Add a language</p>
                </div>
              }

              {this.props.tradLang.fr == true && <div className="french_square"><div className="languages" onClick={() => { this.setState({ valueFr: true }) }}><p>FR</p></div><img src="/img/ui/close_image.svg" onClick={() => { this.handleDeleteFr() }} /></div>}
              {this.props.tradLang.ar == true && <div className="french_square"><div className="languages" onClick={() => { this.setState({ valueAr: true }) }}><p>AR</p></div><img src="/img/ui/close_image.svg" onClick={() => { this.handleDeleteAr() }} /></div>}

            </div>
            <div className="bt-Add" onClick={this.props.send}>
              <img src="/img/ui/valideWhite.png" style={{ width: "16px", height: "16px" }} />
              <p>Add</p>
            </div>
          </div>
        </div>
      </div>
      {
        this.props.hasOpenTime == "true" ?
          <div className="hasOpenTime">
            {this.state.check == false ?
              <div className="has-opening-time">
                <img src="/img/ui/clock.png" />
                <p>Opening Time</p>
                <Switcher check={this.state.check} setCheck={this.setCheck} />
              </div>
              : ""}

            {this.state.check == true ?
              <div className="parent-groupe">
                <OpeningTime data={this.props.data} setData={this.props.setData} check={this.state.check} setCheck={this.setCheck} />

              </div>
              : ""}
          </div>
          : null
      }
      {
        this.props.hasPromo == "true" ?
          <div className="hasPromo">
            {this.state.checkP == false ?
              <div className="has-opening-time">
                <img src="/img/ui/promo.png" />
                <p style={{ color: "#ca2a43", marginLeft: "2%", marginRight: "40px" }}>Promotion</p>
                <SwitchPromotion checkP={this.state.checkP} setCheckPro={this.setCheckPro} />
              </div>
              : ""}
            {this.state.checkP == true ?
              <div className="parent-groupe">
                <Promotion data={this.props.data} setData={this.props.setData} checkP={this.state.checkP} setCheckPro={this.setCheckPro} />

              </div>
              : ""}
          </div>
          : null
      }

    </div >;
  }
}
RestaurantFormNew.contextType = UserContext

export default RestaurantFormNew;
