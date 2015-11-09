import React from 'react'
import Reflux from 'reflux'
import ContactFormStore from '../stores/ContactFormStore.jsx'
import _ from 'lodash';
import cx from 'classnames';
import GSAP from 'gsap'

var tl = new TimelineLite();
var tlsuccess = new TimelineLite();

const ContactForm = React.createClass({

  mixins: [Reflux.connect(ContactFormStore,"form")],
  // To get rid of those input refs I'm moving those values
  // and the form message into the state
  getInitialState() {
    return {
      name: '',
      email: '',
      message: '',
      validationMessage:'',
      sending: 'Send It',
      hasError: false,
      hasSucess: false,
      hasLoaded: false,
      count: 0
    };
  },

  componentDidMount() {
    tl.to('.Form',.3,{autoAlpha:1})
    tl.paused(!tl.paused())
  },

  componentWillUpdate(prevProps,nextProps){
    //console.log(prevProps, nextProps);
  },

  changeName(e) {

    this.setState({
      name: e.target.value
    });
  },

  changeEmail(e) {
    this.setState({
      email: e.target.value
    });
  },

  changeMessage(e) {
    this.setState({
      message: e.target.value
    });
  },


  onSubmit(e) {
    e.preventDefault();

    let userName = this.state.name.trim();
    let userEmail = this.state.email.trim();
    let userMessage = this.state.message.trim();

    let inputValues = {
      input_1: userName,
      input_4: userEmail,
      input_5: userMessage
    }

    let data = {
      input_values: inputValues
    }

    this.sendForm(data)


    //alert('form submitted!')
  },

  resetForm(){
    let self = this;
    TweenLite.to('.happy-message',.3,{autoAlpha:0,display:'none',onComplete:function(){
        self.setState( {
          name: '',
          email: '',
          message: '',
          validationMessage: '',
          sending: 'Send It',
          hasError: false,
          hasSucess: false
        })
    }})
    TweenLite.to('.ContactForm',.3,{autoAlpha:1,display:'block',delay:.5})
  },

  sendForm(data) {
    let self = this;

    let url ='/gravityformsapi/forms/'+gfApiVars.contactFormID+'/submissions';
    jQuery.ajax({
        url: url,
        type: 'POST',
        data: JSON.stringify(data),
        beforeSend: function (xhr, opts) {
            //$sending.show();
            self.setState({
              sending: 'Sending...'
            })
        }
    })
    .done(function (data, textStatus, xhr) {
      //console.log(data, textStatus);
      let validationMessages = data.response.validation_messages;
      self.setState({
        sending: 'Send It'
      })
      if(validationMessages) {
        //FAILD
        self.setState({
            hasError: true
        });

        if(_.size(validationMessages) === 3) {
          self.setState({
            validationMessage: 'Do not be lazy, all fields are required and you already knew that.'
          });
        } else {
          switch( Object.keys(validationMessages)[0] ) {
          //switch( Object.keys(validationMessages)[Object.keys(validationMessages).length-1] ) {
            case "1":
                self.setState({
                  validationMessage: 'Do not be shy, tell me your name.'
                });
                break;
            case "4":
                self.setState({
                  validationMessage: 'Give me your email, I promise I will not send you SPAM!'
                });
                break;
            case "5":
                self.setState({
                  validationMessage: 'Seriously! Come on, write me a very happy message.'
                });
                break;
            default:
              self.setState({
                validationMessage: 'Do not be lazy, all fields are required and you already knew that.'
              });
          }
        }

      } else {

        //SUCESSS
        TweenLite.to('.ContactForm',.3,{autoAlpha:0,display:'none'})
        TweenLite.to('.happy-message',.3,{autoAlpha:1,delay:.5,display:'block'})

        self.setState({
          validationMessage: 'Well done! I will read your joyful message and then say anything or not. Thank you',
          hasError: false,
          hasSucess: true
        });
      }
    })
  },


  render() {
    let self = this;

    if(this.state.form && this.state.count===0) {
      tl.seek(0);
      tl.paused(!tl.paused())
      this.state.count++;
      //TweenLite.to('.Form',.3,{autoAlpha:1,delay:1})
    }

    let ContactFormClass = cx({
      'Form ' : true
      // 'initAnimation': this.state.form
    });

    let formClasses = cx({
      'ContactForm' : true,
      //'fadeout' : this.state.hasSucess
    });

    let happyMessageClasses = cx({
      'happy-message' : true//,
      // 'out' : !this.state.hasSucess,
      // 'in' : this.state.hasSucess
    });

    return (
      <div>
        <div className="form-messages">
          <div className="container">
          {
              this.state.hasError ?
                <div className="alert alert-danger message-box" role="alert">
                  {this.state.validationMessage}
                </div>
              : <div/>

          }
          </div>
        </div>
        <div className={ContactFormClass}>
          <div className="logo-on-form w25 center">
            <img className="img-responsive" src={appConfig.themeURL+"/images/mnsl-v3-white.svg"} />
          </div>
          <div className="copy-form center color-white">
              <h3>Now talking seriously.</h3>
              <p>Feel free to contact me. Whether to say hello or even to know more about me.</p>
              <p>It can be a beginning of a good friendship.</p>
          </div>
          <form className={formClasses} onSubmit={this.onSubmit} ref="form">

          {
            this.state.form ?
              this.state.form.response.fields.map(function(input, i){
                //console.log(input);
                let id = 'input_'+input.id+'_'+input.formId;
                let labelToState = input.label;
                let tempInputState = labelToState.replace(/\-+/g, '').toLowerCase();

                ///console.log(input.type !== 'textarea');
                if(input.type !== 'textarea') {

                  let state = tempInputState === 'email' ? self.state.email : self.state.name;
                  let onChange = tempInputState === 'email' ? self.changeEmail : self.changeName;
                  return (
                    <div className="form-group" key={input.label}>
                      <input className="form-control" type={input.type} placeholder={input.label+"*"} value={state} onChange={onChange} key={id} id={id} ref={id} noValidate/>
                    </div>
                  )
                } else {
                  let state = self.state.message;
                  let onChange = self.changeMessage;
                  return (
                    <div className="form-group" key={input.label}>
                      <textarea className="form-control" placeholder={input.label+"*"} value={state} onChange={onChange} id={id} key={id} />
                    </div>
                  )
                }
              })
            : <div/>
          }

            <button className="bt-send-it btn btn-primary text-uppercase" >
              {this.state.sending}
            </button>
            <div className="center margin-t-20 color-white">
            <small>* required</small>
            </div>
          </form>
          {
            !this.state.hasError ?
              <div className={happyMessageClasses}>
                  <div className="center color-white">{this.state.validationMessage}</div>

                  <button className="bt-resend-it btn btn-primary" onClick={this.resetForm}>Send me Another Happy Message</button>
              </div>
            : <div/>
          }
        </div>
      </div>
    );
  }
});

module.exports = ContactForm;

