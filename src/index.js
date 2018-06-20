/**
 * created by hushicai on 2018/6/20
 * @flow
 */

// ios
import React from 'react';
import {Keyboard, Animated} from 'react-native';

const KeyboardShowEvent = 'keyboardWillShow';
const KeyboardHideEvent = 'keyboardWillHide';

class KeyboardResponsiveView extends React.Component {
  // 初始高度
  _originHeight: number;

  // 键盘高度
  _keyboardHeight: number = 0;

  constructor(props: any) {
    super(props);

    if (props.height === undefined) {
      throw new Error('KeyboardResponsiveView: missing `height` props.');
    }

    this._originHeight = props.height;

    this.state = {
      height: new Animated.Value(props.height)
    };
  }

  _onKeyboardShow = event => {
    if (!event.endCoordinates) {
      return;
    }

    this._keyboardHeight = event.endCoordinates.height;

    let height = this._originHeight - this._keyboardHeight;

    Animated.timing(this.state.height, {
      toValue: height,
      duration: 100
    }).start();
  };

  _onKeyboardHide = () => {
    this._keyboardHeight = 0;

    Animated.timing(this.state.height, {
      toValue: this._originHeight,
      duration: 100
    }).start();
  };

  componentWillReceiveProps(nextProps: Props) {
    if (nextProps.height !== this.props.height) {
      let diff = nextProps.height - this.props.height;
      let height = this._originHeight - this._keyboardHeight + diff;

      this._originHeight = nextProps.height;

      Animated.timing(this.state.height, {
        toValue: height,
        duration: 100
      }).start();
    }
  }

  componentDidMount() {
    Keyboard.addListener(KeyboardShowEvent, this._onKeyboardShow);
    Keyboard.addListener(KeyboardHideEvent, this._onKeyboardHide);
  }

  componentWillUnmount() {
    Keyboard.removeListener(KeyboardShowEvent, this._onKeyboardShow);
    Keyboard.removeListener(KeyboardHideEvent, this._onKeyboardHide);
  }

  render() {
    let viewStyle = {
      height: this.state.height,
      backgroundColor: 'transparent'
    };
    return (
      <Animated.View
        onTouchStart={this.props.onTouchStart}
        style={[viewStyle, this.props.style]}>
        {this.props.children}
      </Animated.View>
    );
  }
}

export default KeyboardResponsiveView;
