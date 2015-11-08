import Reflux from 'reflux';
import request from 'superagent';
import _ from 'lodash';

const localStorageKey = 'contactForm',
      apiUrl = '/gravityformsapi/forms/'+gfApiVars.contactFormID+'/',
      formId = gfApiVars.contactFormID,
      nonce = gfApiVars.nonce,
      sig = gfApiVars.sig_1,
      expires = gfApiVars.expires,
      api_key = gfApiVars.api_key;


const ContactFormStore = Reflux.createStore({

  fetchContactForm() {
    let self = this;
    request
      .get( apiUrl )
      //.query({ _gf_json_nonce: nonce })
      .query({ api_key:api_key,signature:sig,expires:expires })
      .end( function( error, result ) {
          self.updateList(JSON.parse( result.text ));
          //console.log(result.text);
      });
  },

  getInitialState() {

    let loadedList = localStorage.getItem(localStorageKey);

    // //console.log('local (há? )->' , loadedList  );
    // if (!loadedList || loadedList === 'undefined') {
    //    this.fetchContactForm();
    // } else {
    // //   //this.trigger(this.form);
    // //   //JUST FOR DEBUG
    //    this.fetchContactForm(); //
    //    this.updateList(JSON.parse(loadedList));
    // //   //this.compareLatestsID();
    // }
    //console.log('local else ->', this.form);
    return this.form;

  },

  updateList(form){
      localStorage.setItem(localStorageKey,JSON.stringify(form));
      // if we used a real database, we would likely do the below in a callback
      this.form = form;
      this.trigger(form); // sends the updated list to all listening components
  }

});

module.exports = ContactFormStore;