import React from 'react';
import { PropTypes } from 'prop-types';
import { Popover, PopoverHeader, PopoverBody } from 'reactstrap';

/**
 * PopoverLink
 */
class PopoverLink extends React.Component {
  /**
   * Constructor
   * @param props
   */
  constructor(props) {
    super(props);

    this.state = {
      popoverLinkOpen: false,
    };
    this.changeStatePopoverLinkOpen = this.changeStatePopoverLinkOpen.bind(this);
  }

  /**
   * Change local state for open popover link
   */
  changeStatePopoverLinkOpen() {
    this.setState({ popoverLinkOpen: !this.state.popoverLinkOpen });
  }

  render() {
    return (
      <div className="contentInfoKeycard">
        <a href="#" className="infoKeyCard" id="PopoverLink" onClick={this.changeStatePopoverLinkOpen}>
          <span>{this.props.popoverLink.get('labelKeycardInfo')}</span>
        </a>
        <Popover placement="bottom" isOpen={this.state.popoverLinkOpen} target="PopoverLink" toggle={this.changeStatePopoverLinkOpen} className="ppPopover">
          <PopoverHeader className="popover-title ppHeader">
            {this.props.popoverLink.get('popoverTitleKeycardInfo')}
          </PopoverHeader>
          <PopoverBody className="popover-content ppBody">
            <div className="row">
              <div className="col-xs-4">
                <img className="img-responsive" src={this.props.popoverLink.get('picKeycardInfo')} alt="" />
              </div>
              <div className="col-xs-8" dangerouslySetInnerHTML={{ __html: this.props.popoverLink.get('descKeycardInfo') }} />
            </div>
          </PopoverBody>
        </Popover>
      </div>
    );
  }
}

PopoverLink.propTypes = {
  popoverLink: PropTypes.object.isRequired, // content for popover info keycard
};

export default PopoverLink;
