/**
 * created by hushicai on 2018/6/20
 * @flow
 */

// rn android可以在AndroidManifest.xml中配置`android:windowSoftInputMode`。
// 当输入框在页面底部时，例如聊天界面，推荐设置为`adjustSize`模式，此时当键盘呼起时，视图会自动往上推。

// TODO: LayoutAnimation

import React from 'react';
import {Animated} from 'react-native';

class KeyboardResponsiveView extends React.Component {
  render() {
    let viewStyle = {
      flex: 1,
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
