import {Component} from 'react'

import './index.css'

class LoginForm extends Component {
  state = {
    email: '',
    password: '',
    phoneNumber: '',
    showSubmitError: false,
    errorMsg: '',
  }

  onChangeEmail = event => {
    this.setState({email: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  onChangePhoneNumber = event => {
    this.setState({phoneNumber: event.target.value})
  }

  onSubmitSuccess = () => {
    const {history} = this.props

    history.replace('/')
  }

  onSubmitFailure = errorMsg => {
    this.setState({showSubmitError: true, errorMsg})
  }

  submitForm = async event => {
    event.preventDefault()
    const {email, password, phoneNumber} = this.state
    const userDetails = {email, password, phoneNumber}
    const url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(url, options)
    console.log(response)
    const data = await response.json()
    if (response.ok === true) {
      this.onSubmitSuccess()
    } else {
      this.onSubmitFailure(data.error_msg)
    }
  }

  renderPasswordField = () => {
    const {password} = this.state

    return (
      <>
        <label className="input-label" htmlFor="password">
          PASSWORD
        </label>
        <input
          type="password"
          id="password"
          className="input-element"
          value={password}
          onChange={this.onChangePassword}
          placeholder="Password"
        />
      </>
    )
  }

  renderUserEmailField = () => {
    const {email} = this.state

    return (
      <>
        <label className="input-label" htmlFor="username">
          EMAIL
        </label>
        <input
          type="text"
          id="email"
          className="input-element"
          value={email}
          onChange={this.onChangeEmail}
          placeholder="Email"
        />
      </>
    )
  }

  renderPhoneNumberField = () => {
    const {phoneNumber} = this.state

    return (
      <>
        <label className="input-label" htmlFor="phoneNumber">
          PHONE NUMBER
        </label>
        <input
          type="text"
          id="phoneNumber"
          className="input-element"
          value={phoneNumber}
          onChange={this.onChangePhoneNumber}
          placeholder="Phone Number"
        />
      </>
    )
  }

  render() {
    const {showSubmitError, errorMsg} = this.state
    return (
      <div className="login-form-container">
        <h1 className="recipe-heading">Recipe App</h1>
        <form className="form-container" onSubmit={this.submitForm}>
          <div className="input-container">{this.renderUserEmailField()}</div>
          <div className="input-container">{this.renderPasswordField()}</div>
          <div className="input-container">{this.renderPhoneNumberField()}</div>
          <button type="submit" className="login-button">
            Login
          </button>
          {showSubmitError && <p className="error-message">*{errorMsg}</p>}
        </form>
      </div>
    )
  }
}

export default LoginForm
