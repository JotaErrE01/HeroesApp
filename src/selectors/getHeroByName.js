import { heroes } from "../data/heroes";

const getHeroByName = (heroName = '' ) => {

    // validar el hero
    if(heroName.trim() === '') return [];

    return heroes.filter( hero =>  hero.superhero.toLowerCase().includes(heroName.toLowerCase()) );
}

export default getHeroByName;