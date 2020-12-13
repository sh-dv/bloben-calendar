import React from 'react';
import './inputs.css';
import IconButton from '@material-ui/core/IconButton';
import VisibilityIcon from '@material-ui/icons/Visibility';

export class InputForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      borderWidth: '1px',
      textForInput: '',
      isPassword: false,
      passwordIsHidden: false,
      icon: 'md-eye-off',
      textType: 'text',
      isFocused: false,
    };
  }

  componentDidMount() {
    this.props.isPassword
      ? this.setState({ passwordIsHidden: true, textType: 'password' })
      : this.setState({ passwordIsHidden: false, textType: 'text' });
  }

  onFocus = () => {
    this.setState({ borderWidth: '2px', isFocused: true });
  };

  onBlur = () => {
    this.setState({ borderWidth: '1px', isFocused: false });
  };

  changePasswordView = () => {
    this.state.passwordIsHidden
      ? this.setState({ passwordIsHidden: false, textType: 'text' })
      : this.setState({ passwordIsHidden: true, textType: 'password' });
  };
  render() {
    const inputWrapper = {
      height: 80,
      margin: this.props.margin ? this.props.margin : 0,
      includeFontPadding: false,
      position: 'relative',
    };

    const labelStyle = {
      padding: 0,
      fontFamily: 'Open Sans',
      includeFontPadding: false,
    };

    const labelText = {
      fontSize: 12,
      margin: 0,
      paddingBottom: this.props.noBorder ? 0 : 6,
      color: this.props.error
        ? this.props.colors.error
        : this.state.isFocused
        ? this.props.colors.onFocusColor
        : this.props.colors.onBlurColor,
      includeFontPadding: false,
    };

    const inputContainer = {
      backgroundColor: 'transparent',
      boxShadow: this.props.noBorder
        ? ''
        : `0px 0px 0px ${this.state.borderWidth} ${
            this.props.error
              ? this.props.colors.error
              : this.state.isFocused
              ? this.props.colors.onFocusColor
              : this.props.colors.onBlurColor
          } inset`,
      borderRadius: this.props.noBorder ? 0 : 4,
      display: 'flex',
      flexDirection: 'row',
      paddingTop: 4,
      paddingBottom: 4,
      paddingRight: 4,
      height: this.props.noBorder ? '' : 40,
      borderBottom: this.props.noBorder
        ? `solid ${this.state.borderWidth} ${
            this.props.error
              ? this.props.colors.error
              : this.state.isFocused
              ? this.props.colors.onFocusColor
              : this.props.colors.onBlurColor
          }`
        : '',
    };
    const textInputStyle = {
      fontSize: 16,
      backgroundColor: 'transparent',
      paddingLeft: this.props.noBorder ? 0 : 16,
      paddingRight: this.props.isPassword ? 8 : this.props.noBorder ? 0 : 16,
      includeFontPadding: false,
      width: '100%',
    };

    const helperContainer = {
      marginTop: 4,
      width: '100%',
      height: 20,
    };
    const helperText = {
      fontSize: 12,
      color: this.props.error
        ? this.props.colors.error
        : this.props.colors.onBlurColor,
      padding: 0,
      margin: 0,
    };

    return (
      <div style={inputWrapper}>
        <div style={labelStyle}>
          <p style={labelText}>{this.props.label}</p>
        </div>
        <form style={inputContainer}>
          <input
            name={this.props.name}
            type={this.state.textType}
            style={textInputStyle}
            placeholder={this.props.placeholder}
            onFocus={() => {
              this.onFocus();
            }}
            onBlur={() => {
              this.onBlur();
            }}
            onChange={this.props.onChange}
            autoFocus={this.props.autoFocus}
            value={this.props.value}
            maxLength={this.props.maxLength}
            autoComplete={this.props.autoComplete}
            onKeyPress={(ev) => {
              if (this.props.submitEnter) {
                if (ev.key === 'Enter') {
                  // Do code here
                  this.props.submitEnter();
                  ev.preventDefault();
                }
              }
            }}
          />

          {this.props.isPassword ? (
            <IconButton
              size="small"
              style={{ padding: 0, paddingLeft: 8, paddingRight: 8 }}
              onClick={() => this.changePasswordView()}
            >
              <VisibilityIcon style={{ color: this.props.colors.gray }} />
            </IconButton>
          ) : null}
        </form>
        {this.props.helperText ? (
          <div style={helperContainer}>
            <p style={helperText}>{this.props.helperText}</p>
          </div>
        ) : (
          <div style={helperContainer} />
        )}
      </div>
    );
  }
}

export class InputSearch extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      borderWidth: '1px',
      textForInput: '',
      textType: 'text',
      isFocused: false,
    };
  }

  onFocus = () => {
    this.setState({ borderWidth: '2px', isFocused: true });
  };

  onBlur = () => {
    this.setState({ borderWidth: '1px', isFocused: false });
  };

  render() {
    const inputWrapper = {
      fontFamily: 'Open Sans',
      includeFontPadding: false,
      position: 'relative',
    };

    const labelStyle = {
      padding: 0,
      paddingLeft: 16,
      includeFontPadding: false,
    };

    const inputContainer = {
      backgroundColor: this.props.colors.ICON_GRAY_LIGHT,
      boxShadow: this.state.isFocused
        ? `0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23)`
        : '',
      borderRadius: 4,
      border: this.state.isFocused
        ? ''
        : `solid 1px ${this.props.colors.border}`,
      display: 'flex',
      flexDirection: 'row',
      paddingTop: 4,
      paddingBottom: 4,
      paddingRight: 4,
      minHeight: 40,
    };
    const textInputStyle = {
      fontSize: 16,
      backgroundColor: 'transparent',
      paddingLeft: 16,
      paddingRight: this.props.isPassword ? 8 : 16,
      fontFamily: 'Open Sans',
      includeFontPadding: false,
      color: this.props.colors.text,
      width: '100%',
    };

    return (
      <div style={inputWrapper}>
        <form style={inputContainer}>
          <input
            name={this.props.name}
            type={this.state.textType}
            style={textInputStyle}
            onFocus={() => {
              this.onFocus();
            }}
            onBlur={() => {
              this.onBlur();
            }}
            onChange={this.props.onChange}
            placeholder={this.props.placeholder}
            autoFocus={this.props.autoFocus}
            value={this.props.value}
            autoComplete={this.props.autoComplete}
            onKeyPress={(ev) => {
              if (this.props.submitEnter) {
                if (ev.key === 'Enter') {
                  // Do code here
                  this.props.submitEnter();
                  ev.preventDefault();
                }
              }
            }}
          />
        </form>
      </div>
    );
  }
}
