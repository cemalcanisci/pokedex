import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { NavLink } from 'react-router-dom';

export default class Cards extends Component {
  constructor(props) {
    super(props);
    this.state = {
      imageLoading: true,
      tooManyRequests: false,
    };
  }

  render() {
    const {
      name, url, catched, release,
    } = this.props;

    const index = url.split('/')[url.split('/').length - 2];
    const imageUrl = `https://github.com/PokeAPI/sprites/blob/master/sprites/pokemon/${index}.png?raw=true`;
    const { imageLoading, tooManyRequests } = this.state;
    
    return (
      <div className="col-md-3 col-sm-6 mb-5">
        <div className={`card shadow  rounded ${
          !catched ? 'bg-white' : 'bg-private'}`}
        >
          <h5 className="card-header">
            {index}
          </h5>
          {imageLoading ? <FontAwesomeIcon size="lg" className="text-danger w-100" icon={faSpinner} /> : null}
          <img
            onLoad={() => this.setState({ imageLoading: false })}
            onError={() => this.setState({ tooManyRequests: true })}
            className="pokemon-card card-img-top rounded mx-auto mt-2"
            src={imageUrl}
            alt={name}
            style={tooManyRequests ? { display: 'none' } : imageLoading ? null : { display: 'block' }}
          />
          {tooManyRequests ? (
            <h6 className="mx-auto">
              <span className="badge badge-danger mt-2">Too Many Request</span>
            </h6>
          ) : null}
          <div className="card-body  mx-auto">
            <h6 className="card-title">{name.toLowerCase().split(' ').map((letter) => letter.charAt(0).toUpperCase() + letter.substring(1)).join(' ')}</h6>
          </div>
          <NavLink
            type="button"
            to={`/pokemon/${index}`}
            className={`btn btn-inspect btn-sm ${
              !catched ? 'btn-warning' : 'btn-danger'}`}
          >
            <h6 className="text-white">Inspect</h6>
          </NavLink>
          <button
            type="button"
            className={`p-2 btn btn-sm catch-btn d-flex flex-row justify-content-around align-items-center ${
              !catched ? 'btn-danger' : 'btn-warning'}`}
            onClick={!catched ? this.props.catch : release}
          >
            <img src={!catched ? '/pokeball.png' : '/open-pokeball.png'} alt="open" />
            <h5>{!catched ? 'Catch!' : 'Release'}</h5>
          </button>
        </div>
      </div>
    );
  }
}
