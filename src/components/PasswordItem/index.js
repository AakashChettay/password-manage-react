import './index.css'

const PasswordItem = props => {
  const {passwordItem, showPasswords, handleDeletePassword} = props
  const {websiteAddress, username, password, id} = passwordItem

  const deletePassword = () => {
    handleDeletePassword(id)
  }

  return (
    <li className="password-item">
      <h1 className="first-char-logo">{username[0]}</h1>
      <div className="detailsContainer">
        <p className="webAdd">{websiteAddress}</p>
        <p className="usrname">{username}</p>
        <p className="pswd">
          {showPasswords ? (
            password.toString()
          ) : (
            <img
              alt="stars"
              src="https://assets.ccbp.in/frontend/react-js/password-manager-stars-img.png"
            />
          )}
        </p>
      </div>
      <button
        data-testid="delete"
        className="deleteBtn"
        type="button"
        onClick={deletePassword}
      >
        <img
          className="deleteIcon"
          alt="delete"
          src="https://assets.ccbp.in/frontend/react-js/password-manager-delete-img.png"
        />
      </button>
    </li>
  )
}

export default PasswordItem
