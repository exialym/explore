import React, { Component, PropTypes, cloneElement } from 'react';
import classnames from 'classnames';
import {Motion, spring} from 'react-motion';
import { findDOMNode } from 'react-dom'

function getOuterWidth(el) {
  return el.offsetWidth;
}

function getOffset(el) {
  const html = el.ownerDocument.documentElement;
  const box = el.getBoundingClientRect();
  return {
    top: box.top + window.pageYOffset - html.clientTop,
    left: box.left + window.pageXOffset - html.clientLeft,
  };
}

class TabNav extends Component {
  static propTypes = {
    classPrefix: React.PropTypes.string,
    panels: PropTypes.node,
    activeIndex: PropTypes.number,
  };
  constructor(props) { super(props);
    this.state = {
      inkBarWidth: 0,
      inkBarLeft: 0,
    };
  }
  componentDidMount() {
    const { activeIndex } = this.props;
    const node = findDOMNode(this);
    const el = node.querySelectorAll('li')[activeIndex];
    this.setState({
      inkBarWidth: getOuterWidth(el),
      inkBarLeft: getOffset(el).left,
    });
  }
  componentDidUpdate(prevProps) {
    if (prevProps.activeIndex !== this.props.activeIndex) {
      const { activeIndex } = this.props;
      const node = findDOMNode(this);
      const el = node.querySelectorAll('li')[activeIndex];
      this.setState({
        inkBarWidth: getOuterWidth(el),
        inkBarLeft: getOffset(el).left,
      }); }
  }

  getTabs() {
    const { panels, classPrefix, activeIndex } = this.props;

    return React.Children.map(panels, (child) => {
      if (!child) { return; }

      const order = parseInt(child.props.order, 10);

      let classes = classnames({
        [`${classPrefix}-tab`]: true,
        [`${classPrefix}-active`]: activeIndex === order,
        [`${classPrefix}-disabled`]: child.props.disabled,
      });

      let events = {};
      if (!child.props.disabled) {
        events = {
          onClick: this.props.onTabClick.bind(this, order),
        };
      }

      const ref = {};
      if (activeIndex === order) {
        ref.ref = 'activeTab';
      }

      return (
        <li
          role="tab"
          aria-disabled={child.props.disabled ? 'true' : 'false'}
          aria-selected={activeIndex === order? 'true' : 'false'}
          {...events}
          className={classes}
          key={order}
          {...ref}
        >
          {child.props.tab}
        </li>
      );
    });
  }

  render() {
    const { classPrefix } = this.props;

    const rootClasses = classnames({
      [`${classPrefix}-bar`]: true,
    });

    const classes = classnames({
      [`${classPrefix}-nav`]: true,
    });

    return (
      <div className={rootClasses} role="tablist">
        <Motion style={{ left: spring(this.state.inkBarLeft) }}>
          {({ left }) => <InkBar width={this.state.inkBarWidth} left={left} />}
        </Motion>
        <ul className={classes}>
          {this.getTabs()}
        </ul>
      </div>
    );
  }
}
class InkBar extends Component {
  static propTypes = {
    left: PropTypes.number, width: PropTypes.number,
  };
  render() {
    const { left, width } = this.props;
    const classes = classnames({
      inkBar: true,
    });
    return (
      <div className={classes} style={{
        WebkitTransform: `translate3d(${left}px, 0, 0)`,
        transform: `translate3d(${left}px, 0, 0)`,
        width: width,
      }}>
      </div>
    );
  }
}
export default TabNav;
