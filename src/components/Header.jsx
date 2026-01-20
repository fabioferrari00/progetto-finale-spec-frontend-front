import { Link } from "react-router-dom";
const Header = () => {
  return (
    <header className="p-4 bg-blue">
      <div className="container-fluid">
        <div className="row align-items-center justify-content-around">
          <div className="col-4 col-md-4 text-center text-md-start">
            <Link to="/">
              <h1>PIROSERVIZI</h1>
            </Link>
          </div>
          <div className="col-4 col-md-4 text-center">
            <Link to="/">
              <img src="../src/assets/logo.png" className="logo" alt="" />
            </Link>
          </div>
          <div className="col-4">
            <nav className="icons d-flex justify-content-center justify-content-md-end">
              <Link to="/" className="nav-item">
                <span className="d-none d-sm-inline ms-1">Home</span>
              </Link>

              <Link to="/comparison" className="nav-item">
                <span className="d-none d-sm-inline ms-1">Compara</span>
              </Link>

              <Link to="/favorites" className="nav-item">
                <span className="d-none d-sm-inline ms-1">Preferiti</span>
              </Link>
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;