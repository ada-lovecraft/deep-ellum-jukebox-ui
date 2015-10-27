import React from 'react';



class Hatchshow extends React.Component {
  constructor(...args) {
    super(...args);
  }
  componentDidMount() {
    $(".slabify").wideText({maxSize: 300});
  }

  render() {
    return (
    <div>
      <span className="slabify">{this.props.children}</span>
    </div>
    );
  }
}

export default Hatchshow;

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
