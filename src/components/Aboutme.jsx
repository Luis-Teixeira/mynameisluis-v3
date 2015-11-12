import React from 'react'
import AboutStore from '../stores/AboutStore.jsx'
import Reflux from 'reflux';
import ImageLoader from './ImageLoader'
import Helmet from "react-helmet";


const Aboutme = React.createClass({

  mixins: [Reflux.connect(AboutStore,"page")],

  render: function() {
    let key = '',
        content = '',
        avatar = '';

    if(this.state.page) {
      key = this.state.page[0].id;
      content = this.state.page[0].acf.resume;
      avatar = this.state.page[0].acf.avatar.sizes.thumbnail;
    }
    //console.log(this.state.page[0].acf.avatar);
    return (
      <section className="Aboutme">
        <Helmet title={' About Me | MNSL | '+ appConfig.wordpressName} />

        <div className="container">
          <div className="col-md-8 col-md-push-2 margin-t-60 margin-b-60">
            <div className="avatar round">
              <ImageLoader imageSrc={avatar} />
            </div>
            <div className="the-content" dangerouslySetInnerHTML={{__html: content }} />
            <div className="the-aboutme-links">
              <a className="footer-icon-btn" href="https://pt.linkedin.com/in/luispteixeira" title="" target='_blank'><i className="icon-linkedin"></i></a>
              <a className="footer-icon-btn" href="mailto:luispteixeira@gmail.com" title="" target='_blank'><i className="icon-mail"></i></a>
            </div>
          </div>
        </div>
      </section>
    );
  }
});

module.exports = Aboutme;
