
import React from 'react';
import ContactForm from './ContactForm'

class Footer extends React.Component {
  render() {
    return (
      <div className="Footer">
        <div className="container">
          <ContactForm formId="1" />
        </div>
      </div>
    );
  }
}
export default Footer
