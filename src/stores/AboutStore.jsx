import Reflux from 'reflux';
import request from 'superagent';
import _ from 'lodash';
import timeDifference from '../utils/TimeDifference'


const localStorageKey = 'about',
      localStorageDateKey = 'post-date',
      apiUrl = '/wp-json/wp/v2',
      endPoint = '/pages?filter[name]=about-me',
      loadEvery = appConfig.loadDataEvery;

const AboutStore = Reflux.createStore({

  fetchPage() {
    let self = this;
    request
      .get( apiUrl + endPoint)
      .end( function( error, result ) {
          self.updateList(JSON.parse( result.text ));
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

    //console.log('local (há? )->' , loadedList  );
    if (!loadedList || loadedList === 'undefined' || timeDifference.daysDifference( new Date(), oldDateObj) > loadEvery) {
      localStorage.setItem(localStorageDateKey,appConfig.time);
      this.fetchPage();
    } else {
      this.updateList(JSON.parse(loadedList));
    }
    //console.log('local else ->', this.page);
    return this.page;

  },

  updateList(page){
      localStorage.setItem(localStorageKey,JSON.stringify(page));
      // if we used a real database, we would likely do the below in a callback
      this.page = page;
      this.trigger(page); // sends the updated list to all listening components
  }

});

module.exports = AboutStore;