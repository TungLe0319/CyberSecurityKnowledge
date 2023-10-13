import React, { Component } from 'react';

class PasswordGeneratorTest extends Component {
  constructor(props) {
    super(props);

    this.state = {
      password: this.generatePassword(8, true, true), // Generate a default password with length 8, including special characters and numbers
      passwordLength: 8,
      includeSpecialChars: true,
      includeNumbers: true,
    };
  }

  generatePassword(length, includeSpecialChars, includeNumbers) {
    let charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    if (includeSpecialChars) {
      charset += '!@#$%^&*';
    }
    if (includeNumbers) {
      charset += '0123456789';
    }

    let password = '';
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * charset.length);
      password += charset[randomIndex];
    }
    return password;
  }

  handlePasswordLengthChange = (newLength) => {
    const newPassword = this.generatePassword(
      newLength,
      this.state.includeSpecialChars,
      this.state.includeNumbers
    );
    this.setState({ password: newPassword, passwordLength: newLength });
  };

  handleSpecialCharsChange = () => {
    const newPassword = this.generatePassword(
      this.state.passwordLength,
      !this.state.includeSpecialChars,
      this.state.includeNumbers
    );
    this.setState({ includeSpecialChars: !this.state.includeSpecialChars, password: newPassword });
  };

  handleNumbersChange = () => {
    const newPassword = this.generatePassword(
      this.state.passwordLength,
      this.state.includeSpecialChars,
      !this.state.includeNumbers
    );
    this.setState({ includeNumbers: !this.state.includeNumbers, password: newPassword });
  };


    copyToClipboard= () => {
    const textToCopy =  this.state.password

    const textArea = document.createElement("textarea");
    textArea.value = textToCopy;
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand('copy');
    document.body.removeChild(textArea);

    alert( textToCopy);
  }

  render() {
    return (
      <div className="flex justify-center  items-center flex-col mt-20 ">
        <div>
          <strong>Generated Password:</strong>
          <div className="text-white w-1/2 p-1 text-4xl flex flex-wrap wrap">{this.state.password}</div>
        </div>
        <div>
          <label>Password Length: </label>
          <input
            type="range"
            min="8"
            max="030"
            step="1"
            value={this.state.passwordLength}
            onChange={(e) => this.handlePasswordLengthChange(e.target.value)}
          />
          <span>{this.state.passwordLength}</span>
        </div>
        <div>
          <label>
            <input
              type="checkbox"
              checked={this.state.includeSpecialChars}
              onChange={this.handleSpecialCharsChange}
            /> Include Special Characters
          </label>
        </div>
        <div>
          <label>
            <input
              type="checkbox"
              checked={this.state.includeNumbers}
              onChange={this.handleNumbersChange}
            /> Include Numbers
          </label>
        </div>

        <div className="">

          <button onClick={ this.copyToClipboard}></button>
        </div>
      </div>
    );
  }
}

export default PasswordGeneratorTest;
