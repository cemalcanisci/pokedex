/* eslint-disable default-case */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { getPokemon,catchPokemon,releasePokemon } from '../Redux/actions';
import EmptyData from '../Components/EmptyData';
import typeColors from '../Constant';
class Detail extends Component {
  componentDidMount() {
    const { get, match } = this.props;
    const { params } = match;
    const { pokeId } = params;
    if (params || pokeId) {
      const id = pokeId;
      get(id);
    }
    
  }
  catch = (pokemon) => (e) => {
    const { catchPokemon } = this.props;
    const {  match } = this.props;
    const { params } = match;
    const { pokeId } = params;
    const newPokeObject = {
      name:pokemon.name,
      url:`https://pokeapi.co/api/v2/pokemon/${pokeId}/`
    }
    catchPokemon(newPokeObject);
  };
  release = (name)=>(e)=>{
    const {releasePokemon} = this.props;
    releasePokemon(name);
  }

  render() {
    const { match ,error } = this.props;
    const { params } = match;
    const { pokeId } = params;
    const { pokemon} = this.props;
    const {
      name, sprites, stats, height, weight, types, abilities, catched,
    } = pokemon;
    let pokemonImage;
    let {
      hp, attack, defense, speed, specialAttack, specialDefense,
    } = '';
    const pokeTypes = [];
    const pokeAbilities = [];
    let evs;
    if (sprites) pokemonImage = sprites.front_default;

    if (stats && stats.length) {
      stats.forEach((stat) => {
        switch (stat.stat.name) {
          case ('hp'): hp = stat.base_stat; break;
          case ('attack'): attack = stat.base_stat; break;
          case ('defense'): defense = stat.base_stat; break;
          case ('speed'): speed = stat.base_stat; break;
          case ('special-attack'): specialAttack = stat.base_stat; break;
          case ('special-defense'): specialDefense = stat.base_stat; break;
        }
      });

      evs = stats.filter((stat) => {
        if (stat.effort > 0) {
          return true;
        }
        return false;
      }).map((stat) => `${stat.effort} ${stat.stat.name.toLowerCase().split('-')
        .map((s) => s.charAt(0).toUpperCase()
  + s.substring(1))
        .join(' ')}`);
    }

    if (types && types.length) {
      types.forEach((type) => { pokeTypes.push(type.type.name); });
    }

    if (abilities && abilities.length) {
      abilities.forEach((ability) => {
        pokeAbilities.push(ability.ability.name.toLowerCase().split('-').map((s) => s.charAt(0).toUpperCase()
       + s.substring(1)).join(' '));
      });
    }



    const heightMeter = height / 10;
    const weightKg = weight / 10;

    return (
      <div className="col mt-3">
        {!error ? <div className="card">
          <div className="card-header">
            <div className="row">
              <div className="col-5">
                <h5>{pokeId}</h5>
              </div>
              <div className="col-7">
                <div className="float-right">
                  {
                  pokeTypes.map((type) => (
                    <span
                      key={type}
                      className="badge badge-primary badge-pill mr-1"
                      style={{ backgroundColor: `#${typeColors[type]}`, color: 'white' }}
                    >
                      {type}
                    </span>
                  ))
                  }
                </div>
              </div>
            </div>
          </div>
          <div className="card-body">
            <div className="row align-items-center">
              <div className="col-md-3">
                <img src={pokemonImage} className="card-img-top rounded mx-auto mt-2" alt="pokemon" />
              </div>
              <div className="col-md-9">
                <h4 className="mx-auto">
                  {name}
                </h4>
                <div className="row align-items-center">
                  <div className="col-12 col-md-3">
                    HP
                  </div>
                  <div className="col-12 col-md-9">
                    <div className="progress">
                      <div
                        className="progress-bar"
                        style={{
                          width: `${hp}%`,
                        }}
                        aria-valuenow="25"
                        aria-valuemin="0"
                        aria-valuemax="100"
                      >
                        {hp}

                      </div>
                    </div>
                  </div>
                </div>
                <div className="row align-items-center">
                  <div className="col-12 col-md-3">
                    Attack
                  </div>
                  <div className="col-12 col-md-9">
                    <div className="progress">
                      <div
                        className="progress-bar"
                        style={{
                          width: `${attack}%`,
                        }}
                        aria-valuenow="25"
                        aria-valuemin="0"
                        aria-valuemax="100"
                      >
                        {attack}

                      </div>
                    </div>
                  </div>
                </div>
                <div className="row align-items-center">
                  <div className="col-12 col-md-3">
                    Defense
                  </div>
                  <div className="col-12 col-md-9">
                    <div className="progress">
                      <div
                        className="progress-bar"
                        style={{
                          width: `${defense}%`,
                        }}
                        aria-valuenow="25"
                        aria-valuemin="0"
                        aria-valuemax="100"
                      >
                        {defense}

                      </div>
                    </div>
                  </div>
                </div>
                <div className="row align-items-center">
                  <div className="col-12 col-md-3">
                    Speed
                  </div>
                  <div className="col-12 col-md-9">
                    <div className="progress">
                      <div
                        className="progress-bar"
                        style={{
                          width: `${speed}%`,
                        }}
                        aria-valuenow="25"
                        aria-valuemin="0"
                        aria-valuemax="100"
                      >
                        {speed}

                      </div>
                    </div>
                  </div>
                </div>
                <div className="row align-items-center">
                  <div className="col-12 col-md-3">
                    Special Attack
                  </div>
                  <div className="col-12 col-md-9">
                    <div className="progress">
                      <div
                        className="progress-bar"
                        style={{
                          width: `${specialAttack}%`,
                        }}
                        aria-valuenow="25"
                        aria-valuemin="0"
                        aria-valuemax="100"
                      >
                        {specialAttack}

                      </div>
                    </div>
                  </div>
                </div>
                <div className="row align-items-center">
                  <div className="col-12 col-md-3">
                    Special Defense
                  </div>
                  <div className="col-12 col-md-9">
                    <div className="progress">
                      <div
                        className="progress-bar"
                        style={{
                          width: `${specialDefense}%`,
                        }}
                        aria-valuenow="25"
                        aria-valuemin="0"
                        aria-valuemax="100"
                      >
                        {specialDefense}

                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <hr />
          <div className="card-body">
            <h5 className="card-title text-center">
              Profile
            </h5>
            <div className="row">
              <div className="col-md-6">
                <div className="row">
                  <div className="col-md-6">
                    <div className="row">
                      <div className="col-md-6">
                        <h6 className="float-right">
                          Height:
                        </h6>
                      </div>
                      <div className="col-md-6">
                        <h6 className="float-left">
                          {`${heightMeter} M`}
                        </h6>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6">
                    <div className="row">
                      <div className="col-md-6">
                        <h6 className="float-right">
                          Weight:
                        </h6>
                      </div>
                      <div className="col-md-6">
                        <h6 className="float-left">
                          {`${weightKg} Kg`}
                        </h6>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="row">
                  <div className="col-md-6">
                    <div className="row">
                      <div className="col-md-6">
                        <h6 className="float-right">
                          Abilities:
                        </h6>
                      </div>
                      <div className="col-md-6">
                        <h6 className="float-left">
                          {pokeAbilities.map((ability) => (
                            <span key={ability}>
                              {`${ability} `}
                            </span>
                          ))}
                        </h6>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6">
                    <div className="row">
                      <div className="col-md-6">
                        <h6 className="float-right">
                          Evs:
                        </h6>
                      </div>
                      <div className="col-md-6">
                        <h6 className="float-left">
                          {evs}
                        </h6>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="card-footer text-muted">
            <div className="row">
              <div className="col-md-6">
                Data from
                {' '}
                <a className="card-link" href="https://pokeapi.co/" target="_blank " rel="noreferrer">
                  PokeAPI.co
                </a>
              </div>
              <div className="col-md-6">
                <button
                  type="button"
                  className={`p-2 btn btn-sm catch-btn d-flex flex-row justify-content-around align-items-center ${
                    !catched ? 'btn-danger' : 'btn-warning'}`}
                  onClick={!catched ? this.catch(pokemon) : this.release(name)}
                >
                  <img src={!catched ? '/pokeball.png' : '/open-pokeball.png'} alt="open" />
                  <h5>{!catched ? 'Catch!' : 'Release'}</h5>
                </button>
              </div>
            </div>
          </div>
        </div> : <EmptyData type="error" message="This pokemon is not discovered yet.."></EmptyData>}
      </div>
    );
  }
}

const mapStateToProps = (state) => state;
const mapDispatchToProps = { get: getPokemon,catchPokemon,
  releasePokemon };
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Detail));
