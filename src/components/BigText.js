import React from 'react';
import ReactDOM from 'react-dom';

class BigText extends React.Component {
  constructor(...args) {
    super(...args);
  }
  componentDidUpdate() {
    let node = ReactDOM.findDOMNode(this);
    $(node).bigText();
  }

  render() {
    return (
    <div>
      {_.map(this.props.children, (child, id) => (<span key={id}>{child}</span>))}
    </div>
    );
  }
}

export default BigText;

/*
class Hatchshow extends Component {
  constructor(...args) {
    super(...args);
    jQuery.fn.hatchShow = function () {
      $('.hsjs').css('display', 'inner-block').css('white-space', 'pre').each(function () {
        var t = $(this);
        t.wrap("<span class='hatchshow_temp' style='display:block'>");
        var pw = t.parent().width();
        while (t.width() < pw) {
          t.css('font-size', (t.fontSize() + 1) + "px"), function () {
            while (t.width() > pw) {
              t.css('font-size', (t.fontSize() - .1) + "px")
            }
          };
        }
        ;
      }).css('visibility', 'visible');
    };
    jQuery.fn.fontSize = function () {
      return parseInt($(this).css('font-size').replace('px', ''));
    };
  }
  render() {
    return;
  }
}

export default Hatchshow
*/
