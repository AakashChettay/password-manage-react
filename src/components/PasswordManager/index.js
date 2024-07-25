import {Component} from 'react'
import {v4 as uuidv4} from 'uuid'
import './index.css'
import PasswordItem from '../PasswordItem'

class PasswordManager extends Component {
  state = {
    passwordList: JSON.parse(localStorage.getItem('passwordList')) || [],
    websiteAddress: '',
    username: '',
    password: '',
    showPasswords: false,
    inputSearch: '',
    addedUsername: '',
    showAddedUsername: false,
  }

  componentDidUpdate(_, prevState) {
    const {passwordList} = this.state
    if (prevState.passwordList !== passwordList) {
      localStorage.setItem('passwordList', JSON.stringify(passwordList))
    }
  }

  onChangeInputSearch = event => {
    this.setState({inputSearch: event.target.value})
  }

  handleWebsiteAddressChange = event => {
    this.setState({websiteAddress: event.target.value})
  }

  handleUserNameChange = event => {
    this.setState({username: event.target.value})
  }

  handlePasswordChange = event => {
    this.setState({password: event.target.value})
  }

  handleShowPasswordChange = event => {
    this.setState({showPasswords: event.target.checked})
  }

  handleDeletePassword = id => {
    this.setState(prevState => ({
      passwordList: prevState.passwordList.filter(
        passwordItem => passwordItem.id !== id,
      ),
    }))
  }

  addPassword = event => {
    event.preventDefault()
    const {websiteAddress, username, password} = this.state
    if (websiteAddress && username && password) {
      const newPassword = {
        id: uuidv4(),
        websiteAddress,
        username,
        password,
      }

      this.setState(prevState => ({
        passwordList: [...prevState.passwordList, newPassword],
        websiteAddress: '',
        username: '',
        password: '',
        addedUsername: username,
        showAddedUsername: true,
      }))
    }
  }

  render() {
    const {
      passwordList,
      websiteAddress,
      username,
      password,
      showPasswords,
      inputSearch,
      addedUsername,
      showAddedUsername,
    } = this.state
    const passwordCount = passwordList.length

    const searchResults = passwordList.filter(passwordDetails => {
      const pasName = passwordDetails.websiteAddress.toLowerCase()
      return pasName.includes(inputSearch.toLowerCase())
    })

    return (
      <div className="password-manager-container">
        <img
          alt="app logo"
          src="https://assets.ccbp.in/frontend/react-js/password-manager-logo-img.png"
          className="password-manager-logo"
        />
        <h1>Add New Password</h1>
        <form className="input-container" onSubmit={this.addPassword}>
          <div className="add-new-password-container">
            <div className="input-and-logo-container">
              <img
                alt="website"
                className="logo"
                src="https://assets.ccbp.in/frontend/react-js/password-manager-website-img.png"
              />
              <input
                onChange={this.handleWebsiteAddressChange}
                placeholder="Enter Website"
                type="text"
                value={websiteAddress}
              />
            </div>
            <div className="input-and-logo-container">
              <img
                alt="username"
                className="logo"
                src="https://assets.ccbp.in/frontend/react-js/password-manager-username-img.png"
              />
              <input
                onChange={this.handleUserNameChange}
                placeholder="Enter Username"
                type="text"
                value={username}
              />
            </div>
            <div className="input-and-logo-container">
              <img
                alt="password"
                className="logo"
                src="https://assets.ccbp.in/frontend/react-js/password-manager-password-img.png"
              />
              <input
                onChange={this.handlePasswordChange}
                placeholder="Enter Password"
                type="password"
                value={password}
              />
            </div>
            <button type="submit" className="add-button">
              Add
            </button>
          </div>
          <img
            srcSet="https://assets.ccbp.in/frontend/react-js/password-manager-sm-img.png 300w,
                    https://assets.ccbp.in/frontend/react-js/password-manager-lg-img.png 768w"
            sizes="(max-width: 600px) 300px, 768px"
            className="password-login-image"
            alt="password manager"
          />
        </form>
        {showAddedUsername && <p>{addedUsername}</p>}
        <div className="your-passwords-container">
          <div className="heading-count-search-container">
            <div className="heading-and-count">
              <h1 className="your-psw-heading">Your Passwords</h1>
              <p className="count-of-psws">{passwordCount.toString()}</p>
            </div>
            <div className="searchbar">
              <img
                src="https://assets.ccbp.in/frontend/react-js/password-manager-search-img.png"
                alt="search"
                className="search-logo"
              />
              <input
                onChange={this.onChangeInputSearch}
                type="search"
                placeholder="Search"
                className="searchInput"
              />
            </div>
          </div>
          <br />
          <div className="show-password-container">
            <input
              onChange={this.handleShowPasswordChange}
              id="showpassword"
              type="checkbox"
              className="checkbox"
            />
            <label className="label" htmlFor="showpassword">
              Show Passwords
            </label>
          </div>
          {passwordCount !== 0 ? (
            <ul className="passwordList">
              {searchResults.map(pass => (
                <PasswordItem
                  key={pass.id}
                  passwordItem={pass}
                  showPasswords={showPasswords}
                  handleDeletePassword={this.handleDeletePassword}
                />
              ))}
            </ul>
          ) : (
            <div className="no-password-container">
              <img
                alt="no passwords"
                src="https://assets.ccbp.in/frontend/react-js/no-passwords-img.png"
                className="no-password-image"
              />
              <p>No Passwords</p>
            </div>
          )}
        </div>
      </div>
    )
  }
}

export default PasswordManager
