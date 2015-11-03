
import React from 'react'
import Reflux from 'reflux'
import cx from 'classnames'
import AboutStore from '../stores/AboutStore.jsx'
import Swiper from 'swiper'
//import SwiperReact from 'react-idangerous-swiper'


var Facts = React.createClass({

  mixins: [Reflux.connect(AboutStore,"page")],


  getInitialState: function() {
    return {
      swiperInit: false
    };
  },

  componentDidMount() {
    // //console.log(this.refs.Swiper);
    //let mySwiper = new Swiper ('.swiper-container');//,{
    //window.p = mySwiper;
  },


  initSlider() {
    let self = this;
    setTimeout(function(){
      self.setState({
        swiperInit : true
      })

      let mySwiper = new Swiper ('.swiper-container',{
        pagination: '.swiper-pagination',
        paginationClickable: true,
        autoplay : 15000
      });

    },1000)
  },

  render: function() {
    let key = '',
        facts = [];
        self = this;

    if(this.state.page) {
      facts = this.state.page[0].acf.faqs;
      //console.log(facts);
    }

    let swiperClasses = cx({
      'swiper-container' : true,
      'fadein' : this.state.swiperInit
    })

    return (
      <section className='Facts container fader ' id="posts" ref="Swiper">
        <div className={swiperClasses}>
          <div className='swiper-wrapper'>
            {
              facts.map(function(fact , i){
                if(facts.length === parseInt(i+1) && !self.state.swiperInit ){
                  self.initSlider();
                }
                return (
                  <div className='swiper-slide' key={'fact-id-'+i} >
                    <div className="cote ">
                      <span className="the-content" dangerouslySetInnerHTML={{__html: fact.comment }} />
                    </div>

                    <div className="who">
                      <div className="who-avatar"><img src={fact.who_avatar.url} className="round img-responsive" /></div>
                      <div className="who-name"> {fact.who_said} </div>
                    </div>

                  </div>
                  )

              })
            }
          </div>
          <div className="swiper-pagination"></div>
        </div>

      </section>
    );



  }
});

module.exports = Facts;
