import Reflux from 'reflux';
import request from 'superagent';
import _ from 'lodash';

const localStorageKey = 'about',
      apiUrl = '/wp-json/wp/v2',
      endPoint = '/pages?filter[name]=about-me';

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

    //console.log('local (há? )->' , loadedList  );
    if (!loadedList || loadedList === 'undefined') {
      this.fetchPage();
    } else {
      //this.trigger(this.page);
      //JUST FOR DEBUG
      this.fetchPage(); //
      this.updateList(JSON.parse(loadedList));
      //this.compareLatestsID();
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