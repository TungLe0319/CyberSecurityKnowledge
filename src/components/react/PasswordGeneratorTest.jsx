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

  highlightNumbers = (text) => {
    return text.replace(/\d+/g, (match) => `<span class="  font-bold text-red-400">${match}</span>`)
  }
  render() {
    return (
      <div className="mt-20 flex  flex-col items-center justify-center ">
        <div className="rounded bg-slate-700 px-32">
          <div
            className="wrap-words text-center text-4xl text-white"
            dangerouslySetInnerHTML={{ __html: this.highlightNumbers(this.state.password) }}
          />

          <div className="mb-3 flex justify-between">
            <div className="flex items-center space-x-2">
              {this.state.password.length >= 9 ? (
                <>
                  <img
                    className="w-10"
                    src="https://cdn-icons-png.flaticon.com/128/3643/3643948.png"
                    alt="Strong Password"
                  />
                  <p className="font-semibold text-green-400">Strong Password</p>
                </>
              ) : (
                <>
                  <img
                    className="w-10"
                    src="https://cdn-icons-png.flaticon.com/128/7855/7855537.png"
                    alt="Weak Password"
                  />
                  <p className="font-semibold text-orange-400">Moderate Password</p>
                </>
              )}
            </div>

            <div className="flex space-x-3">
              <button
                title="generate"
                className=" rounded-full  border-4 border-slate-300 bg-slate-100  p-0 px-2  py-2 outline-none"
              >
                <img className="w-6" src="https://cdn-icons-png.flaticon.com/128/3329/3329465.png" alt="" />
              </button>
              <button
                onClick={this.copyToClipboard}
                title="Copy"
                className=" rounded-full  border-4 border-slate-300 bg-slate-100  p-0 px-2  py-2 outline-none"
              >
                <img className="w-6" src="https://cdn-icons-png.flaticon.com/128/1620/1620767.png" alt="" />
              </button>
              <button
                title="Save"
                className=" rounded-full  border-4 border-slate-300 bg-slate-100  p-0 px-2  py-2 outline-none"
              >
                <img className="w-6" src="https://cdn-icons-png.flaticon.com/128/5662/5662990.png" alt="" />
              </button>
            </div>
          </div>
        </div>

        <div className="mt-10 flex w-full flex-col items-center justify-center space-y-10">
          <div className="flex w-1/2 justify-between  items-center  border-b-2 pb-3">
            <label>Password Length: </label>
            <input
              type="range"
              className="h-2 w-full cursor-pointer appearance-none rounded-lg bg-gray-200 dark:bg-gray-700 "
              min="8"
              max="50"
              step="1"
              value={this.state.passwordLength}
              onChange={(e) => this.handlePasswordLengthChange(e.target.value)}
            />
            <span>{this.state.passwordLength}</span>
          </div>
          <div className="flex w-1/2 justify-between   border-b-2 pb-3">
            <label>Include Special Characters (!@#$%^&*)</label>
            <input
              className=""
              type="checkbox"
              checked={this.state.includeSpecialChars}
              onChange={this.handleSpecialCharsChange}
            />{' '}
          </div>
          <div className="flex w-1/2 justify-between   border-b-2 pb-3">
            <label>Include Numbers (0-9)</label>
            <input
              className=" "
              type="checkbox"
              checked={this.state.includeNumbers}
              onChange={this.handleNumbersChange}
            />{' '}
          </div>
        </div>
      </div>
    )
  }
}

export default PasswordGeneratorTest
