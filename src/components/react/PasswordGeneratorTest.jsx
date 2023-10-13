import React, { Component } from 'react'

class PasswordGeneratorTest extends Component {
  constructor(props) {
    super(props)

    this.state = {
      password: this.generatePassword(8, true, true), // Generate a default password with length 8, including special characters and numbers
      passwordLength: 8,
      includeSpecialChars: true,
      includeNumbers: true,
    }
  }

  generatePassword(length, includeSpecialChars, includeNumbers) {
    let charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
    if (includeSpecialChars) {
      charset += '!@#$%^&*'
    }
    if (includeNumbers) {
      charset += '0123456789'
    }

    let password = ''
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * charset.length)
      password += charset[randomIndex]
    }
    return password
  }

  handlePasswordLengthChange = (newLength) => {
    const newPassword = this.generatePassword(newLength, this.state.includeSpecialChars, this.state.includeNumbers)
    this.setState({ password: newPassword, passwordLength: newLength })
  }

  handleSpecialCharsChange = () => {
    const newPassword = this.generatePassword(
      this.state.passwordLength,
      !this.state.includeSpecialChars,
      this.state.includeNumbers
    )
    this.setState({ includeSpecialChars: !this.state.includeSpecialChars, password: newPassword })
  }

  handleNumbersChange = () => {
    const newPassword = this.generatePassword(
      this.state.passwordLength,
      this.state.includeSpecialChars,
      !this.state.includeNumbers
    )
    this.setState({ includeNumbers: !this.state.includeNumbers, password: newPassword })
  }

  copyToClipboard = () => {
    const textToCopy = this.state.password

    const textArea = document.createElement('textarea')
    textArea.value = textToCopy
    document.body.appendChild(textArea)
    textArea.select()
    document.execCommand('copy')
    document.body.removeChild(textArea)

    alert(textToCopy)
  }

  render() {
    return (
      <div className="mt-20 flex  flex-col items-center justify-center ">
        <strong>Generated Password:</strong>
        <div>
          <div className="wrap flex w-1/2 flex-wrap p-1 text-4xl text-white">{this.state.password}</div>
        </div>
        <div>
          <label>Password Length: </label>
          <input
            type="range"
            className="h-2 w-full cursor-pointer appearance-none rounded-lg bg-gray-200 dark:bg-gray-700"
            min="8"
            max="60"
            step="1"
            value={this.state.passwordLength}
            onChange={(e) => this.handlePasswordLengthChange(e.target.value)}
          />
          <span>{this.state.passwordLength}</span>
        </div>
        <div>
          <label>
            <input
              className=""
              type="checkbox"
              checked={this.state.includeSpecialChars}
              onChange={this.handleSpecialCharsChange}
            />{' '}
            Include Special Characters
          </label>
        </div>
        <div>
          <label>
            <input
              className=""
              type="checkbox"
              checked={this.state.includeNumbers}
              onChange={this.handleNumbersChange}
            />{' '}
            Include Numbers
          </label>
        </div>

        <div className="">
          <button className=" mt-4 hover:shadow-md hover:shadow-slate-600" onClick={this.copyToClipboard}>
            Copy to Clipboard
          </button>
        </div>
      </div>
    )
  }
}

export default PasswordGeneratorTest
