import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { getPokemons, catchPokemon,releasePokemon } from '../../Redux/actions';
import Card from '../Cards';
import Paginate from '../Paginate';
import EmptyData from '../EmptyData';
class List extends Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 1,
      pokedexPage: 1,
      searchedPokemonsPage: 1 
      };
  }

  componentDidMount() {
    const { get } = this.props;
    const { page } = this.state;

    get(page);
  }

  handlePageClick = (data) => {
    const {location} = this.props;
    let type = location.search !=="" ? 'search' :
    location.pathname ==='/' ? 'pokemons' : 'pokedex';
    const { get } = this.props;

    if(type ==='search'){
      this.setState({
        searchedPokemonsPage: data.selected + 1,
      });
    }else if(type==='pokemons'){
      this.setState({
        page: data.selected + 1,
      });
      get(data.selected + 1);
    }else{
      this.setState({
        pokedexPage: data.selected + 1,
      });
    }

  };

  catch = (pokemon) => (e) => {
    const { catchPokemon } = this.props;
    catchPokemon(pokemon);
  };

  release = (name)=>(e)=>{
    const {releasePokemon} = this.props;
    releasePokemon(name);
  }

  render() {
    const {
      location,
      pokemons,
      pokedex,
      searchedPokemons,
      total,
      limit,
      pokedexTotal,
      searchedTotal
    } = this.props;
    const type = location.pathname === '/' ? 'pokemons' : 'pokedex';
    const { pokedexPage,page,searchedPokemonsPage } = this.state;
    let data;
    let totalCount;
    let currentPage;
    let message;
    if(location.search!==""){
      data = searchedPokemons.length
      ? searchedPokemons
          .slice((searchedPokemonsPage - 1) * limit, limit * searchedPokemonsPage)
          .map((pokemon) => (
            <Card key={pokemon.name} name={pokemon.name} url={pokemon.url} catch={this.catch(pokemon)}
            release={this.release(pokemon.name)}
            catched={pokemon.catched ? true : false} />
          ))
      : <EmptyData messaage={message}/>;
      
      totalCount = searchedTotal;
      currentPage = searchedPokemonsPage;

      if(type==='pokedex'){
        message = "You didn't catch this pokemon yet!"
      }else{
        message = "Did you try discover a new pokemon?"
      }

    }else{
      if (type === 'pokemons') {
        message = "We cant find any pokemon"
        data = pokemons.length
          ? pokemons.map((pokemon) => (
              <Card
                key={pokemon.name}
                name={pokemon.name}
                url={pokemon.url}
                catch={this.catch(pokemon)}
                release={this.release(pokemon.name)}
                catched={pokemon.catched ? true : false}
              />
            ))
          : <EmptyData messaage={message}/>;
        totalCount = total;
        currentPage = page;

      } else if(type==="pokedex") {
        message = "You cant beat Gary without pokemons! You should some catch"
        data = pokedex.length
          ? pokedex
              .slice((pokedexPage - 1) * limit, limit * pokedexPage)
              .map((pokemon) => (
                <Card key={pokemon.name} name={pokemon.name} url={pokemon.url} catch={this.catch(pokemon)}
                release={this.release(pokemon.name)}
                catched={pokemon.catched ? true : false} />
              ))
          : <EmptyData messaage={message}/>;
        totalCount = pokedexTotal;
        currentPage = pokedexPage;

      }
    }
    
    let paginate = <div className='react-paginate w-100'><Paginate
    limit={limit}
    total={totalCount}
    page={currentPage}
    handlePageClick={this.handlePageClick
  }
  /></div>  
    return (
      <div className={totalCount===0 ? 'w-100 d-flex flex-column align-items-center justify-content-center' :
       ' row mt-3'}>
        {totalCount!==0 ?<div className="w-100 row m-0 p-0">{data} {paginate}</div>:<EmptyData message={message} />}
        
      </div>
    );
  }
}
const mapStateToProps = (state) => state;
const mapDispatchToProps = {
  get: getPokemons,
  catchPokemon,
  releasePokemon
};
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(List));
