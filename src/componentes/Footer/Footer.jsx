function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-info">
          <h2>Tech Store</h2>

          <p>
            Tienda especializada en productos de tecnología.
          </p>
        </div>

        <div className="footer-team">
          <h3>Desarrollado por</h3>

          <div className="team-container">
            <div className="team-card">
              <h4>Eliedy Torrealba</h4>
              <p>Desarrollo Frontend</p>
            </div>
          </div>
        </div>

        <p className="footer-copy">
          © 2026 Tech Store
        </p>
      </div>
    </footer>
  )
}

export default Footer