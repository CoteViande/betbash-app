// import React, { Component, PropTypes, } from 'react'
// import { Animated, TextInput, View, } from 'react-native'
//
// import * as utils from '../utils';
// import { getTheme } from '../theme';
// import { pick, } from 'ramda';
//
//
// class FloatingLabel extends Component {
//   constructor(props) {
//     super(props);
//     this.labelDim = {};
//     this.offsetX = 0;
//     this.placeholderHeight = 0;
//     this.state = {
//       progress: new Animated.Value(1),
//       opacity: new Animated.Value(0),
//       text: '',
//     };
//   }
//
//   componentWillMount() {
//     this.updateText(this.props.text);
//   }
//
//   componentWillReceiveProps(nextProps) {
//     this.updateText(nextProps.text);
//   }
//
//   _onLabelLayout = ({ nativeEvent: { layout } }) => {
//     const x = layout.x;
//     const width = layout.width;
//     const height = layout.height;
//
//     if (width && !this.offsetX) {
//       this.offsetX = ((width - (width * 0.8)) / 2 * -1) - x;
//     }
//
//     if (height && !this.placeholderHeight) {
//       this.placeholderHeight = height;
//     }
//
//     if (width !== this.labelDim.width || height !== this.labelDim.height) {
//       this.labelDim = { width, height };
//     }
//   };
//
//   updateText(text) {
//     this.setState({ text });
//   }
//
//   measure(cb) {
//     return this.refs.label && this.refs.label.refs.node.measure(cb);
//   }
//
//   aniFloatLabel() {
//     if (!this.props.floatingLabelEnabled) {
//       return [];
//     }
//
//     return [Animated.sequence([
//       Animated.timing(this.state.opacity, {
//         toValue: 1,
//         duration: this.props.opacityAniDur,
//       }),
//       Animated.timing(this.state.progress, {
//         toValue: 0,
//         duration: this.props.floatingLabelAniDuration,
//       }),
//     ])];
//   }
//
//   aniSinkLabel() {
//     if (!this.props.floatingLabelEnabled) {
//       return [];
//     }
//
//     return [Animated.sequence([
//       Animated.timing(this.state.progress, {
//         toValue: 1,
//         duration: this.props.floatingLabelAniDuration,
//       }),
//       Animated.timing(this.state.opacity, {
//         toValue: 0,
//         duration: this.props.opacityAniDur,
//       }),
//     ])];
//   }
//
//   render() {
//     const labelColor = this.state.progress.interpolate({
//       inputRange: [0, 1],
//       outputRange: [this.props.highlightColor, this.props.tintColor],
//     });
//
//     const labelScale = this.state.progress.interpolate({
//       inputRange: [0, 1],
//       outputRange: [0.8, 1],
//     });
//
//     const labelY = this.state.progress.interpolate({
//       inputRange: [0, 1],
//       outputRange: [0, this.placeholderHeight],
//     });
//
//     const labelX = this.state.progress.interpolate({
//       inputRange: [0, 1],
//       outputRange: [this.offsetX, 0],
//     });
//
//     return (
//       <Animated.Text
//         ref="label"
//         pointerEvents="none"
//         allowFontScaling={this.props.allowFontScaling}
//
//         style={[{
//           backgroundColor: 'transparent',
//           position: 'absolute',
//           top: labelY,
//           left: labelX,
//           color: labelColor,
//           opacity: this.state.opacity,
//           fontSize: 16,
//           transform: [
//             { scale: labelScale },
//           ],
//           marginBottom: this.props.floatingLabelBottomMargin,
//         },
//         this.props.floatingLabelFont,
//         ]}
//         onLayout={this._onLabelLayout}
//       >
//         {this.state.text}
//       </Animated.Text>
//     );
//   }
// }
//
// FloatingLabel.publicPropTypes = {
//   floatingLabelEnabled: PropTypes.bool,
//   floatingLabelAniDuration: PropTypes.number,
//   floatingLabelBottomMargin: PropTypes.number,
//   // floatingLabelFont: MKPropTypes.font,
//   allowFontScaling: PropTypes.bool,
// };
//
// FloatingLabel.propTypes = {
//   ...FloatingLabel.publicPropTypes,
//
//   tintColor: PropTypes.string,
//   highlightColor: PropTypes.string,
//   opacityAniDur: PropTypes.number,
// };
//
// FloatingLabel.defaultProps = {
//   floatingLabelAniDuration: 200,
//   opacityAniDur: 0,
// };
//
// class Underline extends Component {
//   constructor(props) {
//     super(props);
//     this.animatedLeft = new Animated.Value(0);
//     this.animatedLineLength = new Animated.Value(0);
//     this.state = {
//       lineLength: 0,
//     };
//   }
//
//   updateLineLength(lineLength, cb) {
//     this.setState({ lineLength }, cb);
//   }
//
//   aniStretchUnderline(focused) {
//     if (!(this.props.underlineEnabled && focused)) {
//       return [];
//     }
//
//     this.animatedLeft.setValue(this.state.lineLength / 2);
//     return [
//       Animated.timing(this.animatedLeft, {
//         toValue: 0,
//         duration: this.props.underlineAniDur,
//       }),
//       Animated.timing(this.animatedLineLength, {
//         toValue: this.state.lineLength,
//         duration: this.props.underlineAniDur,
//       }),
//     ];
//   }
//
//   aniShrinkUnderline() {
//     if (!this.props.underlineEnabled) {
//       return [];
//     }
//
//     return [
//       Animated.timing(this.animatedLeft, {
//         toValue: this.state.lineLength / 2,
//         duration: this.props.underlineAniDur,
//       }),
//       Animated.timing(this.animatedLineLength, {
//         toValue: 0,
//         duration: this.props.underlineAniDur,
//       }),
//     ];
//   }
//
//   renderUnderline() {
//     return this.props.underlineEnabled && (
//       <Animated.View
//         style={{
//           position: 'absolute',
//           backgroundColor: this.props.highlightColor,
//           height: this.props.underlineSize,
//           left: this.animatedLeft,
//           width: this.animatedLineLength,
//         }}
//       />);
//   }
//
//   render() {
//     return (
//       <View pointerEvents="none"
//         style={{
//           // top: -this.props.underlineSize,
//           height: this.props.underlineSize,
//         }}
//       >
//         <View  // the default silver border
//           style={{
//             position: 'absolute',
//             backgroundColor: this.props.tintColor,
//             height: this.props.underlineSize,
//             width: this.state.lineLength,
//           }}
//         />
//         {this.renderUnderline()}
//       </View>
//     );
//   }
// }
//
// Underline.propTypes = {
//   underlineEnabled: PropTypes.bool,
//   tintColor: PropTypes.string,
//   highlightColor: PropTypes.string,
//   underlineSize: PropTypes.number,
//   underlineAniDur: PropTypes.number,
// };
//
// Underline.defaultProps = {
//   underlineEnabled: true,
//   underlineAniDur: FloatingLabel.defaultProps.floatingLabelAniDuration,
//   underlineSize: 2,
// };
//
// class TextField extends Component {
//   constructor(props) {
//     super(props);
//     this.theme = getTheme(); // TODO
//     this.inputFrame = {};
//     this.anim = null;
//     this.state = {
//       inputMarginTop: 0,
//     };
//   }
//
//   set bufferedValue(v) {
//     this._bufferedValue = v;
//     if (v) {
//       this._aniFloatLabel();
//     }
//   }
//
//   get bufferedValue() {
//     return (this._bufferedValue || '').trim();
//   }
//
//   focus() {
//     if (this.refs.input) {
//       this.refs.input.focus();
//     }
//   }
//
//   isFocused() {
//     return this.refs.input && this.refs.input.isFocused();
//   }
//
//   blur() {
//     if (this.refs.input) {
//       this.refs.input.blur();
//     }
//   }
//
//   componentWillMount() {
//     this.bufferedValue = this.props.value || this.props.text ||
//     this.props.defaultValue;
//     this._originPlaceholder = this.props.placeholder;
//   }
//
//   componentWillReceiveProps(nextProps) {
//     const newText = nextProps.value || nextProps.text || nextProps.defaultValue;
//     if (newText) {
//       this.bufferedValue = newText;
//     }
//     this._originPlaceholder = nextProps.placeholder;
//   }
//
//   componentDidMount() {
//     requestAnimationFrame(this._doMeasurement.bind(this));
//   }
//
//   _onTextChange = (text) => {
//     this.bufferedValue = text;
//     this._callback('onTextChange', text);
//     this._callback('onChangeText', text);
//   };
//
//   _onFocus = (e) => {
//     this._aniStartHighlight(true);
//     this._callback('onFocus', e);
//   };
//
//   _onBlur = (e) => {
//     this._aniStopHighlight();
//     this._callback('onBlur', e);
//   };
//
//   startAnimations(animations, cb) {
//     if (this.anim) {
//       this.anim.stop();
//     }
//
//     this.anim = Animated.parallel(animations).start(cb);
//   }
//
//   _doMeasurement() {
//     if (this.refs.input) {
//       this.refs.input.measure(this._onInputMeasured.bind(this));
//       if (this.props.floatingLabelEnabled) {
//         this.refs.floatingLabel.measure(this._onLabelMeasured.bind(this));
//       }
//     }
//   }
//
//   _onLabelMeasured(left, top, width, height) {
//     this.setState({ inputMarginTop: height });
//   }
//
//   _onInputMeasured(left, top, width, height) {
//     Object.assign(this.inputFrame, { left, top, width, height });
//     this.refs.underline.updateLineLength(width, () => {
//       if (this.bufferedValue || this.isFocused()) {
//         this._aniStartHighlight(this.isFocused());  // if input not empty, lift the label
//       }
//     });
//   }
//
//   _aniFloatLabel() {
//     if (!(this.bufferedValue && this.props.floatingLabelEnabled)) {
//       return;
//     }
//
//     if (this.refs.floatingLabel) {
//       const animations = this.refs.floatingLabel.aniFloatLabel();
//       if (animations.length) {
//         this.startAnimations(animations);
//       }
//     }
//   }
//
//   _aniStartHighlight(focused) {
//     if (this.props.floatingLabelEnabled) {
//       this.setPlaceholder('');
//       // and show floating label
//       // FIXME workaround https://github.com/facebook/react-native/issues/3220
//       this.refs.floatingLabel.updateText(this._originPlaceholder);
//     }
//
//     const animations = this.refs.underline.aniStretchUnderline(focused);
//     if (this.props.floatingLabelEnabled) {
//       animations.push(...this.refs.floatingLabel.aniFloatLabel());
//     }
//     if (animations.length) {
//       this.startAnimations(animations);
//     }
//   }
//
//   _aniStopHighlight() {
//     const animations = this.refs.underline.aniShrinkUnderline();
//     if (this.props.floatingLabelEnabled && !this.bufferedValue) {
//       animations.push(...this.refs.floatingLabel.aniSinkLabel());
//     }
//
//     if (animations.length) {
//       this.startAnimations(animations, () => {
//         if (this.props.floatingLabelEnabled) {
//           this.setPlaceholder(this._originPlaceholder);
//           // and hide floating label
//           // FIXME workaround https://github.com/facebook/react-native/issues/3220
//           if (!this.bufferedValue) {
//             this.refs.floatingLabel.updateText('');
//           }
//         }
//       });
//     }
//   }
//
//   setPlaceholder(placeholder) {
//     if(this.refs.input) {
//       this.refs.input.setNativeProps({ placeholder });
//     }
//   }
//
//   _callback(name, e) {
//     if (this.props[name]) {
//       this.props[name](e);
//     }
//   }
//
//   render() {
//     let floatingLabel;
//     if (this.props.floatingLabelEnabled) {
//       const props = {
//         tintColor: 'blue',
//         highlightColor: 'green',
//         // floatingLabelFont: ,
//         opacityAniDur: 200,
//         floatingLabelEnabled: true,
//         floatingLabelAniDuration: 200,
//         floatingLabelBottomMargin: 24,
//         allowFontScaling: true,
//       };
//
//       floatingLabel = (
//         <FloatingLabel ref="floatingLabel"
//           {...props}
//           text={this.props.placeholder}
//           // allowFontScaling={this.props.allowFontScaling}
//         />
//       );
//     }
//
//     const underlineProps = { // TODO
//       tintColor: 'red',
//       highlightColor: 'yellow',
//       underlineSize: 4,
//       underlineEnabled: true,
//     };
//     const inputProps = { // TODO
//       ...TextInput.propTypes,
//       password: 1,
//     };
//
//     return (
//       <View style={this.props.style} >
//         <TextInput
//           ref="input"
//           {...inputProps}
//           style={[{
//             backgroundColor: 'transparent',
//             flex: 1,
//             alignSelf: 'stretch',
//             paddingTop: 2, paddingBottom: 2,
//             marginTop: this.state.inputMarginTop,
//           },
//           this.theme.textfieldStyle.textInputStyle, // TODO
//           this.props.textInputStyle,
//           ]}
//           onChangeText={this._onTextChange}
//           onFocus={this._onFocus}
//           onBlur={this._onBlur}
//           allowFontScaling={this.props.allowFontScaling}
//         />
//         {floatingLabel}
//         <Underline ref="underline"
//           {...underlineProps}
//           underlineAniDur={this.props.floatingLabelAniDuration}
//         />
//       </View>
//     );
//   }
// }
//
// TextField.propTypes = {
//   ...TextInput.propTypes,
//   text: PropTypes.string,
//   onTextChange: PropTypes.func,
//   password: PropTypes.bool,
//   ...FloatingLabel.publicPropTypes,
//   underlineEnabled: PropTypes.bool,
//   underlineSize: PropTypes.number,
//   highlightColor: PropTypes.string,
//   // Color of the un-highlighted underline, and the placeholder
//   // - TODO cursor color is not affected for now
//   // @see https://github.com/facebook/react-native/issues/1685
//   tintColor: PropTypes.string,
//   textInputStyle: PropTypes.any,
//   allowFontScaling: PropTypes.bool,
// };
//
// TextField.defaultProps = {
//   style: {
//     height: 39,
//   },
//   underlineEnabled: true,
// };
//
// const {
//   Builder,
// } = require('../builder'); // TODO
//
// class TextFieldBuilder extends Builder {
//   // For compatibility with RN version older than 0.9.0.
//   // > Since [RN v0.9.0][], `TextInput` became a [controlled component][]
//   // [RN v0.9.0]: https://github.com/facebook/react-native/releases/tag/v0.9.0-rc
//   // [controlled component]: https://facebook.github.io/react/docs/forms.html#controlled-components
//   // withDefaultValue(defaultValue) {
//   //   const propName = TextField.propTypes.defaultValue ? 'defaultValue' : 'value';
//   //   this[propName] = defaultValue;
//   //   return this;
//   // }
//
//   mergeStyle() {
//     super.mergeStyle();
//
//     if (!this.highlightColor) {
//       this.highlightColor = this.getThemeColor(); // TODO
//     }
//   }
//
//   build() {
//     const BuiltTextField = class extends TextField {};
//     BuiltTextField.defaultProps = Object.assign({}, TextField.defaultProps, this.toProps());
//     return BuiltTextField;
//   }
// }
//
// // define builder method for each prop
// TextFieldBuilder.defineProps(TextField.propTypes); // TODO
//
// function textfield() {
//   return new TextFieldBuilder();
// }
//
// function textfieldWithFloatingLabel() {
//   return textfield().withFloatingLabelEnabled(true);
// }
//
// module.exports = TextField;
//
// TextField.Builder = TextFieldBuilder;
// TextField.textfield = textfield;
// TextField.textfieldWithFloatingLabel = textfieldWithFloatingLabel;