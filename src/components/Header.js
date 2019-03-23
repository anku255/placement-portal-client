import React, { Component } from "react";
import { connect } from "react-redux";
import { logoutUser } from "../_actions";

class Header extends Component {
  componentDidMount = () => {
    this.setupNavbarBurgers();
  };

  setupNavbarBurgers = () => {
    // Get all "navbar-burger" elements
    const $navbarBurgers = Array.prototype.slice.call(
      document.querySelectorAll(".navbar-burger"),
      0
    );

    // Check if there are any navbar burgers
    if ($navbarBurgers.length > 0) {
      // Add a click event on each of them
      $navbarBurgers.forEach(el => {
        el.addEventListener("click", () => {
          // Get the target from the "data-target" attribute
          const target = el.dataset.target;
          const $target = document.getElementById(target);

          // Toggle the "is-active" class on both the "navbar-burger" and the "navbar-menu"
          el.classList.toggle("is-active");
          $target.classList.toggle("is-active");
        });
      });
    }
  };

  NavbarEndMenuItems = () => {
    const { isAuthenticated, user, logoutUser } = this.props;

    if (isAuthenticated) {
      return (
        <div className="buttons">
          <div className="button">Hello, {user.name}</div>
          <div onClick={logoutUser} className="button is-light">
            Logout
          </div>
        </div>
      );
    }
    return (
      <div className="buttons">
        <a href="/register" className="button is-primary">
          <strong>Sign up</strong>
        </a>
        <a href="/login" className="button is-light">
          Log in
        </a>
      </div>
    );
  };

  render() {
    return (
      <nav
        className="header navbar"
        role="navigation"
        aria-label="main navigation"
      >
        <div className="navbar-brand">
          <a className="navbar-item">React</a>

          <a
            role="button"
            className="navbar-burger burger"
            aria-label="menu"
            aria-expanded="false"
            data-target="navbarBasicExample"
          >
            <span aria-hidden="true" />
            <span aria-hidden="true" />
            <span aria-hidden="true" />
          </a>
        </div>

        <div id="navbarBasicExample" className="navbar-menu">
          <div className="navbar-start">
            <a className="navbar-item">MenuItem</a>
          </div>

          <div className="navbar-end">
            <div className="navbar-item">
              <this.NavbarEndMenuItems />
            </div>
          </div>
        </div>
      </nav>
    );
  }
}

const mapStateToProps = state => ({
  isAuthenticated: state.users.isAuthenticated,
  user: state.users.user
});

export default connect(
  mapStateToProps,
  { logoutUser }
)(Header);
