import './Navbar.scss'
import drivelahLogo from '/drivelah-logo.png'

function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-brand">
          <img src={drivelahLogo} alt="DriveLab" className="navbar-logo" />
        </div>
        <div className="navbar-right">
          <ul className="navbar-menu">
            <li><a href="#learn-more">Learn more</a></li>
            <li><a href="#list-your-car">List your car</a></li>
            <li><a href="#inbox">Inbox</a></li>
          </ul>
          <div className="navbar-profile">
            <div className="profile-avatar">
              <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="20" cy="20" r="20" fill="#E5E5E5"/>
                <circle cx="20" cy="16" r="6" fill="#999999"/>
                <path d="M8 32C8 26 13 22 20 22C27 22 32 26 32 32V34H8V32Z" fill="#999999"/>
              </svg>
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar

