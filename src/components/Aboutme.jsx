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
        avatar = '',
        avatarBig = '',
        linkMeta='';

    if(this.state.page) {
      key = this.state.page[0].id;
      content = this.state.page[0].acf.resume;
      avatar = this.state.page[0].acf.avatar.sizes.thumbnail;
      avatarBig = this.state.page[0].acf.avatar.url;
      linkMeta = this.state.page[0].link;
      //console.log(this.state.page[0]);
    }
    //console.log(this.state.page[0].acf.avatar);
    return (
      <section className="Aboutme">
        <Helmet
          title={' About Me | MNSL | '+ appConfig.wordpressName}
          meta={[
            {"name": "description", "content": content},
            {"property": "og:title", "content": ' About Me | MNSL | '+ appConfig.wordpressName},
            {"property": "og:description", "content": content},
            {"property": "og:type", "content": "article"},
            {"property": "og:url", "content": linkMeta},
            {"property": "og:image", "content": avatarBig},
            {"property": "og:site_name","content": appConfig.wordpressName},
          ]}
        />

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
