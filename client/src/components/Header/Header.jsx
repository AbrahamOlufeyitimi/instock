import { Link, NavLink, useLocation } from "react-router-dom";
import instockLogo from "../../assets/logo/InStock-Logo.svg";
import "./Header.scss";

const Header = () => {
  const location = useLocation();
  const pathname = location?.pathname;
  return (
    <div className="header-wrapper">
      <header className="header">
        <Link to="/">
          <img src={instockLogo} className="header__logo" alt="InStock Logo" />
        </Link>
        <section className="header__nav-links">
          <NavLink
            to="/"
            className={`header__button
              ${
                pathname === "/" || pathname.startsWith("/warehouses")
                  ? "header__button--active"
                  : ""
              }`}
          >
            Warehouses
          </NavLink>
          <NavLink
            to="/inventory"
            className={({ isActive }) =>
              isActive
                ? "header__button header__button--active"
                : "header__button"
            }
          >
            Inventory
          </NavLink>
        </section>
      </header>
    </div>
  );
};

export default Header;
