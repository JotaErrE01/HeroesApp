import React from 'react';
import { Link } from 'react-router-dom';

const heroImages = require.context('../../assets/heroes');


const HeroCard = ({
    id, 
    superhero,
    alter_ego, 
    first_appearance, 
    characters
}) => {
    return (
        <div className="card ms-3" style={ { maxWidth: 540 } }>
            <div className="row no-gutters">
                <div className="col-md-4">
                    <img 
                        src={ heroImages(`./${id}.jpg`).default } 
                        className=" animate__animated animate__zoomIn card-img" 
                        alt={superhero}/>
                </div>

                <div className="col-md-8">
                    <div className="card-body">
                        <h5 className="card-tittle">{ superhero }</h5>
                        <p className="car-text">{ alter_ego }</p>
                        {
                            alter_ego !== characters 
                            && 
                            <p className="card-text">{ characters }</p>
                        }

                        <p className="card-text">
                            <small className="text-muted">{ first_appearance }</small>
                        </p>

                        <Link to={`/hero/${id}`}>Mas...</Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default HeroCard;