import React from 'react'
import cx from 'classnames'


class ImageLoader extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isReady: false
    };
  }

  // componentDidMount() {
  //   console.log('aqui no componentDidMount');
  // }
  onImageLoad(self) {
    //console.log('aui');
    self.setState({
      isReady: true
    });
    self.props.onLoaded;
  }

  fecthImage() {
    let self = this;
    setTimeout(() => {
      //self.fecthImage(this.props.imageSrc);
      let imgTag = self.refs.img.getDOMNode();
      let imgSrc = imgTag.getAttribute('src');
      // You may want to rename the component if the <Image> definition
      // overrides window.Image
      let img = new window.Image();
      img.onload = self.onImageLoad(self);
      img.src = imgSrc;
    }, 500);
  }
  componentDidMount(){

    if(!this.state.isReady) {
      this.fecthImage();
    }
  }
  componentWillReceiveProps(nextProps) {
    if(!this.state.isReady) {
      this.fecthImage();
    }
  }

  render() {

    let classNamesImg = cx({
      'image': true,
      'image-loaded': this.state.isReady
    });

    let classNamesSpiner = cx ({
      'spiner animated' : true,
      'out' : this.state.isReady
    });

    return (
      <div className="ImageLoader">
        <img className={classNamesImg} src={this.props.imageSrc} ref="img"/>
        <div className={classNamesSpiner}></div>
      </div>
    )
  }
}

export default ImageLoader
