
import React from 'react'
import ContactForm from './ContactForm'
import GSAP from 'gsap'

var tweenForm = new TimelineLite();

class Footer extends React.Component {

  componentDidMount() {

    let formTrigger = jQuery('.form-trigger');
    let ftPosition = formTrigger.offset();

    jQuery('body').css('overflow:hidden');
    //console.log(ftPosition.left, ftPosition.top);
    TweenLite.set('.form-bg-fx',{scale:1,autoAlpha:0 ,top:ftPosition.top, left:ftPosition.left+82,transformOrigin: "50% 50% 0"})
    //let formBgFx = jQuery('.form-bg-fx');
    tweenForm.to('.form-trigger',.3,{className:"+=toAlphaText"})
    tweenForm.to('.form-trigger',.3,{className:"+=toCircle"})
    tweenForm.to('body',0,{className:"+=overflow-hidden"})
    tweenForm.to('.form-bg-fx',0,{autoAlpha:1, force3D:true})
    tweenForm.to('.form-bg-fx',.4,{scale:100, force3D:true})
    tweenForm.to('.ContactForm-warper',.5,{autoAlpha:1})
    tweenForm.pause();
  }


  showFormPop(){
    let ftPosition = jQuery('.form-trigger').offset();
    TweenLite.set('.form-bg-fx',{top:ftPosition.top, left:ftPosition.left+82})
    tweenForm.seek(0);
    tweenForm.play();
  }

  closeFormPop(){
    tweenForm.reverse();
  }

  render() {
    return (
      <div className="Footer ">
        <div className="container">
          <div className="Form-title text-center color-white">
            <div className="Form-title-main font-size-h3  text-uppercase ">
              Say Hi! It's free
            </div>
            <div className="Form-title-subtitle text-uppercase">
              <small>or if want to work together</small>
            </div>
            <div className="position-rel1">
              <button type="button" className="form-trigger btn btn-primary" ref="formTrigger" onClick={this.showFormPop} >start here</button>
              <div className="form-bg-fx" ref="formBgFx" />
            </div>
          </div>
        </div>
        <div className="ContactForm-warper">
          <div className="showFormPop">

            <button type="button" className="btn btn-primary no-outline" ref="formTrigger" onClick={this.closeFormPop} >X</button>

          </div>
          <ContactForm animationIn='false' />

        </div>
      </div>
    );
  }
}
export default Footer
