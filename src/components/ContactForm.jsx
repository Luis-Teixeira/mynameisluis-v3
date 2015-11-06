import React from 'react'
import Reflux from 'reflux'
import ContactFormStore from '../stores/ContactFormStore.jsx'
import _ from 'lodash';
import cx from 'classnames';

const ContactForm = React.createClass({

  mixins: [Reflux.connect(ContactFormStore,"form")],
  // To get rid of those input refs I'm moving those values
  // and the form message into the state
  getInitialState: function() {
    return {
      name: 'luis',
      email: 'lui@sss.pp',
      message: '',
      validationMessage: '',
      sending: false,
      hasError: false,
      hasSucess: false
    };
  },

  componentDidMount() {
    //ContactFormStore.fetchContactForm();

  },

  changeName: function(e) {

    this.setState({
      name: e.target.value
    });
  },

  changeEmail: function(e) {
    this.setState({
      email: e.target.value
    });
  },

  changeMessage: function(e) {
    this.setState({
      message: e.target.value
    });
  },


  onSubmit: function(e) {
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
    this.setState( {
      name: '',
      email: '',
      message: '',
      validationMessage: '',
      sending: false,
      hasError: false,
      hasSucess: false
    })
  },

  sendForm(data) {
    let self = this;

    let url ='/gravityformsapi/forms/'+gfApiVars.contactFormID+'/submissions';
    $.ajax({
        url: url,
        type: 'POST',
        data: JSON.stringify(data),
        beforeSend: function (xhr, opts) {
            //$sending.show();
        }
    })
    .done(function (data, textStatus, xhr) {
      //console.log(data, textStatus);
      let validationMessages = data.response.validation_messages;

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
    //console.log(this.state.form);
    //console.log(self.state.validationMessage);
    let formClasses = cx({
      'ContactForm' : true,
      'fadeout' : this.state.hasSucess
    });

    let happyMessageClasses = cx({
      'happy-message fade' : true,
      'out' : !this.state.hasSucess,
      'in' : this.state.hasSucess
    });
    return (
      <div>
      <div className="font-size-h3 font-700 text-uppercase">
        Say Hi! It's free
      </div>
      {
          this.state.hasError ?
            <div className="alert alert-danger message-box" role="alert">
              {this.state.validationMessage}
            </div>
          :
            <div className={happyMessageClasses}>
              {this.state.validationMessage}
               <button className="btn btn-primary" onClick={this.resetForm}>Send me Another Happy Message</button>
            </div>
      }

        <form className={formClasses} onSubmit={this.onSubmit} ref="form">

          {
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
                    <input className="form-control" type={input.type} placeholder={input.label} value={state} onChange={onChange} key={id} id={id} ref={id} noValidate/>
                  </div>
                )
              } else {
                let state = self.state.message;
                let onChange = self.changeMessage;
                return (
                  <div className="form-group" key={input.label}>
                    <textarea className="form-control" placeholder={input.label} value={state} onChange={onChange} id={id} key={id} />
                  </div>
                )
              }
            })
          }

          <button className="btn btn-primary" >Send It</button>
        </form>
      </div>
    );
  }
});



module.exports = ContactForm;