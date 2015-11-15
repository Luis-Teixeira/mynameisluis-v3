
import React from 'react'
import ContactForm from './ContactForm'
import GSAP from 'gsap'

var tweenForm = new TimelineLite();
var waitForFinalEvent = (function () {
  var timers = {};
  return function (callback, ms, uniqueId) {
    if (!uniqueId) { uniqueId = "Don't call this twice without a uniqueId"; }
    if (timers[uniqueId]) { clearTimeout (timers[uniqueId]); }
    timers[uniqueId] = setTimeout(callback, ms);
  };
})();


class Footer extends React.Component {


  constructor(props) {
    super(props);
    this.state = {
      showForm : false
    };
  }

  componentDidMount() {
    let self = this;
    let formTrigger = jQuery('.form-trigger');
    let ftPosition = formTrigger.offset();

    window.addEventListener('resize', this.handleResize);

    jQuery('body').css('overflow:hidden');
    //console.log(ftPosition.left, ftPosition.top);
    TweenLite.set('.form-bg-fx',{scale:1,autoAlpha:0 ,top:ftPosition.top, left:ftPosition.left+100,transformOrigin: "50% 50% 0"})
    //let formBgFx = jQuery('.form-bg-fx');
    tweenForm.to('.form-trigger',.3,{className:"+=toAlphaText",onReverseComplete:function(){self.setState({ showForm:false }) }})
    tweenForm.to('.form-trigger',.3,{className:"+=toCircle"})
    tweenForm.to('body',0,{className:"+=overflow-hidden"})
    tweenForm.to('.form-bg-fx',0,{autoAlpha:1, force3D:true})
    tweenForm.to('.form-bg-fx',.6,{scale:100, force3D:true})
    tweenForm.to('.ContactForm-warper',.4,{autoAlpha:1})
    tweenForm.from('.btn-close-form',.4,{autoAlpha:0,scale:0, transformOrigin: "50% 50% 0",ease:Back.easeInOut.config(4),onComplete:function(){ self.setState({ showForm:true }) }})

    tweenForm.pause();
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize);
  }


  showFormPop(){
    let ftPosition = jQuery('.form-trigger').offset();
    TweenLite.set('.form-bg-fx',{top:ftPosition.top, left:ftPosition.left+100})
    tweenForm.seek(0);
    tweenForm.play();
  }

  closeFormPop(){
    tweenForm.reverse();
  }

  handleResize(){
    let timeToWaitForLast = 100;
    waitForFinalEvent( function() {
      let ftPosition = jQuery('.form-trigger').offset();
      TweenLite.set('.form-bg-fx',{top:ftPosition.top, left:ftPosition.left+100})
    }, timeToWaitForLast, "formFXresizer");
  }

  render() {
    return (
      <div>
        <div className="Footer ">
          <div className="container">
            <div className="Form-title text-center color-white">
              <div className="Form-title-main font-size-h3  text-uppercase ">
                Say Hi! It's free
              </div>
              <div className="Form-title-subtitle text-uppercase">
                <small>(dont by shy if want to work together or if want to buy me a some beer)</small>
              </div>
              <div className="position-rel1">
                <button type="button" className="form-trigger btn btn-primary text-uppercase" ref="formTrigger" onClick={this.showFormPop} >start here</button>
                <div className="form-bg-fx" ref="formBgFx" />
              </div>
            </div>
          </div>
          <div className="ContactForm-warper w100">
            <div className="showFormPop container">
              <div >
                <button type="button" className="btn btn-primary no-outline btn-close-form" ref="formTrigger" onClick={this.closeFormPop} >X</button>
              </div>
              {
                this.state.showForm ? <ContactForm animationIn='false' /> : <div/>
              }
            </div>
          </div>
        </div>
        <div className="extra-info">
          <div className="container">
            <div className="footer-logo">
              <img className="img-responsive" src={appConfig.themeURL+"/images/mnsl-v3-white.svg"} />
            </div>
            <div className="info-links">
              <p>Handcode be me with love</p>
              <p><small>with</small></p>
              <div className="links-warpers">
                <a className="footer-icon-btn" href="https://facebook.github.io/react/" title="" target='_blank'><i className="icon-react"></i></a>
                <a className="footer-icon-btn" href="http://wp-api.org/" title="" target='_blank'><i className="icon-wordpress"></i></a>
                <a className="footer-icon-btn" href="https://pt.linkedin.com/in/luispteixeira" title="" target='_blank'><i className="icon-linkedin"></i></a>
                <a className="footer-icon-btn" href="https://github.com/Luis-Teixeira" title="" target='_blank'><i className="icon-github-circled"></i></a>
                <a className="footer-icon-btn" href="https://bitbucket.org/luispteixeira" title="" target='_blank'><i className="icon-bitbucket"></i></a>
                <a className="footer-icon-btn" href="mailto:luispteixeira@gmail.com" title="" target='_blank'><i className="icon-mail"></i></a>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default Footer
