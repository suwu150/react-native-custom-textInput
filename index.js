import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  TextInput,
  View,
  Text,
  StyleSheet,
} from 'react-native';

const styles = StyleSheet.create({
  center: {
    justifyContent: 'center',
    alignItems: 'center'
  }
});

class Input extends Component {
  static propTypes = {
    inputStyle: TextInput.propTypes.style,
    labelTextStyle: TextInput.propTypes.style,
    placeholderTextColor: PropTypes.string,
    isUpdate: PropTypes.bool,
    readonly: PropTypes.bool,
    textInputStyle: TextInput.propTypes.style,
    autoCapitalize: PropTypes.oneOf(['characters', 'words', 'sentences', 'none']),
  };

  static defaultProps = {
    labelTextStyle: {
      fontSize: 14,
      color: '#514b46'
    },
    placeholderTextColor: '#ccc8c4',
    textInputStyle: {
      fontSize: 14,
      color: '#332f2b'
    },
    autoCapitalize: 'none',
    isUpdate: true,
    readonly: false
  };

  constructor(props) {
    super(props);
    this.state = {
      value: props.value,
      textAlign: 'right'
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.value !== this.state.value) {
      this.setState({ value: nextProps.value });
    }
  }

  _onChangeText = (val) => {
    this.setState({ value: val });
    this.props.onChange && this.props.onChange(val.replace(/(^\s*)|(\s*$)/g, ''));
  };

  _onBlur = (e) => {
    const { onBlur } = this.props;
    onBlur && onBlur(e);
    this.setState({
      textAlign: 'right'
    });
  };

  _onFocus = (e) => {
    const { onFocus } = this.props;
    onFocus && onFocus(e);
    this.setState({
      textAlign: 'left'
    });
  };

  _renderInputContent = () => {
    const { textInputStyle, placeholderTextColor, autoCapitalize, isUpdate, readonly, suffix } = this.props;
    return (
      (isUpdate && !readonly) ?
        <View
          style={[{ flexDirection: 'row', flex: 1, height: '100%' }, styles.center]}
        >
          <TextInput
            {...this.props}
            onChangeText={this._onChangeText}
            onBlur={this._onBlur}
            onFocus={this._onFocus}
            style={[{ textAlign: (this.state.value === 0 || this.state.value) ?
              this.state.textAlign : 'left', flex: 1 }, textInputStyle]}
            placeholderTextColor={placeholderTextColor}
            value={String(this.state.value)}
            autoCorrect={false}
            autoCapitalize={autoCapitalize}
            underlineColorAndroid="transparent"
          />
          <Text style={{ marginRight: 10 }}>
            {(suffix && suffix.length > 3) ? '' : suffix}
          </Text>
        </View>
        :
        <View
          style={[{ flexDirection: 'row', flex: 1, height: '100%', backgroundColor: '#f7f6f5' }, styles.center]}
        >
          <Text
            style={{ textAlign: this.state.value ? this.state.textAlign : 'left', flex: 1 }}
          >
            {this.state.value}
          </Text>
          <Text style={{ marginRight: 10 }}>
            {(suffix && suffix.length > 3) ? '' : suffix}
          </Text>
        </View>
    );
  };

  render() {
    const { label, labelTextStyle, required } = this.props;
    return (
      <View
        style={[{
          height: 36,
          width: '100%',
          backgroundColor: '#fff',
          flexDirection: 'row',
          borderColor: '#eae6e4',
          borderBottomWidth: 0.5,
        }, styles.center]}
      >
        <Text style={[
          {
            width: 100,
            flexDirection: 'row',
            justifyContent: 'flex-end',
            alignItems: 'center',
            marginLeft: 15,
          },
          labelTextStyle,
        ]}
        >{label}
          { required ? <Text style={{ fontSize: 16, fontWeight: 'bold', color: '#F00' }}>*</Text> : null }
        </Text>
        { this._renderInputContent() }
      </View>
    );
  }
}

export default Input;
