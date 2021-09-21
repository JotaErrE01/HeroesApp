import React from 'react'
import { useLocation } from 'react-router';
import useFrom from '../../hooks/useForm';
import HeroCard from '../heroes/HeroCard';
import queryString from 'query-string';
import getHeroByName from '../../selectors/getHeroByName';

const SearchScreen = ({ history }) => {

    const { search } = useLocation();

    const { q = '' } = queryString.parse(search);
    
    const [ { hero }, handleInputChange ] = useFrom({
        hero: q
    });

    const heroesFiltered = getHeroByName(q); // pasar hero si deseas buscar mientras escribes

    const handleSearch = e => {
        e.preventDefault();
        history.push(`?q=${hero}`);
    }

    return (
        <div>
            <h1>Search Screen</h1>
            <hr />

            <div className="row">
                <div className="col-5">
                    <h4>Search Form</h4>
                    <hr />

                    <form
                        onSubmit={handleSearch}
                    >
                        <input 
                            type="text" 
                            placeholder="Find your hero"
                            className="form-control"
                            autoComplete="off"
                            name="hero"
                            value={hero}
                            onChange={handleInputChange}
                        />

                        <button
                            type="submit"
                            className="btn btn-block m-1 btn-outline-primary"
                        >Search</button>
                    </form>
                </div>

                <div className="col-7">
                    <h4>Results</h4>
                    <hr />

                    {
                        q.length === 0 &&

                        <div className="alert alert-info">
                            Search a Hero
                        </div>
                    }

                    {
                        heroesFiltered.length === 0 && 
                        
                        q.length > 0 &&

                        <div className="alert alert-danger">
                            Threre is not hero with { q }
                        </div>
                    }

                    {
                        heroesFiltered.map(hero => (
                            <HeroCard 
                                key={hero.id}
                                {...hero}
                            />
                        ))
                    }
                </div>
            </div>
        </div>
    )
}

export default SearchScreen;