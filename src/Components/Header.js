import React, { useEffect } from 'react';
import { useLocation, NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import {
  Navbar, Nav,
} from 'react-bootstrap';
import { getSearchedPokemons } from '../Redux/actions';

function Header({ props, dispatch }) {
  const location = useLocation();

  let textInput = null;
  const search = () => (e) => {
    const type = location.pathname === '/' ? 'pokemons' : 'pokedex';
    const searchString = textInput.value.replace(/\s/g, '');
    dispatch(getSearchedPokemons(type, searchString));
  };
  const keyPressHandler = (e) => {
    if (e.key === 'Enter') {
      const type = location.pathname === '/' ? 'pokemons' : 'pokedex';

      const searchString = textInput.value.replace(/\s/g, '');
      dispatch(getSearchedPokemons(type, searchString));
    }
  };
  useEffect(() => {
    window.addEventListener('keydown', keyPressHandler);
    return () => {
      window.removeEventListener('keydown', keyPressHandler);
    };
  });

  return (

    <Navbar className="header" expand="lg">
      <Navbar.Toggle aria-controls="pokemon-navbar-nav" />
      <Navbar.Collapse id="pokemon-navbar-nav">
        <Nav activeKey={location.pathname} className="mr-auto">
          <NavLink
            exact
            className="text-white text-center"
            to="/"
          >
            Pokemons
          </NavLink>
          <NavLink
            exact
            className="text-white text-center "
            to="/pokedex"
          >
            Pokedex
          </NavLink>
        </Nav>
        <div className="input-group">
          <input ref={(input) => { textInput = input; }} name="search" type="text" className="form-control" placeholder="Search Pokemon" aria-describedby="basic-addon2" />
          <div className="input-group-append">
            <NavLink
              onClick={search()}
              exact
              className="btn btn-danger outline-light btn-sm"
              to="?search"
            >

              Search

            </NavLink>
          </div>
        </div>

      </Navbar.Collapse>
    </Navbar>

  );
}
function mapStateToProps(state) {
  return { state };
}

export default connect(mapStateToProps)(Header);
