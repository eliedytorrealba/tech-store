import NavBar from '../NavBar/NavBar'

function Header() {
  return (
    <header className="header">
      <div className="header-container">
        <h1 className="logo">Tech Store</h1>

        <NavBar />
      </div>
    </header>
  )
}

export default Header