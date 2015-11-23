import Reflux from 'reflux';
import request from 'superagent';
import _ from 'lodash';
import timeDifference from '../utils/TimeDifference'


const localStorageKey = 'contactForm',
      localStorageDateKey = 'post-date',
      apiUrl = '/gravityformsapi/forms/'+gfApiVars.contactFormID+'/',
      formId = gfApiVars.contactFormID,
      nonce = gfApiVars.nonce,
      sig = gfApiVars.sig_1,
      expires = gfApiVars.expires,
      api_key = gfApiVars.api_key,
      loadEvery = appConfig.loadDataEvery;



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
          //return result.text ? true : false;
      });
  },

  getInitialState() {

    let loadedList = localStorage.getItem(localStorageKey);
    let oldDate = localStorage.getItem(localStorageDateKey);

    if( !oldDate || oldDate === 'undefined') {
      localStorage.setItem(localStorageDateKey,appConfig.time);
    }

    //console.log('--->', appConfig.loadDataEvery);
    let oldDateObj = new Date(oldDate);

    // //console.log('local (há? )->' , loadedList  );
    if (!loadedList || loadedList === 'undefined' || timeDifference.daysDifference( new Date(), oldDateObj) > loadEvery) {

      this.fetchContactForm();
      localStorage.setItem(localStorageDateKey,appConfig.time);

    } else {
      this.updateList(JSON.parse(loadedList));
    }
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