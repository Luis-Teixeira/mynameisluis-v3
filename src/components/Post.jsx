import React from 'react'
import cx from 'classnames'
import { Link } from 'react-router'
import LazyLoad from 'react-lazy-load'
import ImageLoader from './ImageLoader'


class Post extends React.Component {

  constructor(props) {
    super(props);
    this.state = { ImageLoaded: false };
    //this.handleChange = this.handleChange.bind(this);
  }
  componentDidMount() {
    // console.log('aqui e o pai');
    // console.log(this.refs.LazyLoad.state.visible);
    //console.log(React.findDOMNode(this.refs.LazyLoad).classList);
  }

  componentWillReceiveProps(prevProps,nextProps){
    //console.log(prevProps, nextProps);
  }

  imageLoadedCB(){

    this.state.ImageLoaded = true;
  }

  render() {
    //console.log('render ', this.state);
    let fetchedData = this.props.data;
    let acf = fetchedData.acf;
    //console.log(acf.imagem_destaque);
    let classNames = cx({
      'Post': true,
      'Post_init' : true//this.state.ImageLoaded
      // 'active': this.state.activatedPost,
      // 'Post-animate': this.state.animateThis,
    });

    return (
      <LazyLoad  ref="LazyLoad">
        <article className="col-md-6">
          <div className={classNames}>
            <ImageLoader imageSrc={acf.imagem_destaque.sizes.medium} onLoaded={this.imageLoadedCB()}/>
            <div className="Post_link ">
              <Link to={`/portfolio/${fetchedData.slug}`}> {fetchedData.title.rendered}</Link>
            </div>
          </div>
        </article>
      </LazyLoad>
    );
  }
}

export default Post
