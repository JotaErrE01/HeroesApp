import { render, screen } from "@testing-library/react"
import { MemoryRouter, Route } from "react-router";
import HeroScreen from "../../../components/heroes/HeroScreen";
import userEvent from "@testing-library/user-event";

describe('Pruebas en <HeroScreen />', () => {

    const history = {
        length: 3,
        goBack: jest.fn(),
        push: jest.fn()
    }

    const param = 'dc-batman';
    
    test('Debe de mostrar el componente redirect si no hay argumentos en el url', () => {

        const { container } = render(
            <MemoryRouter initialEntries={['/hero']}>
                <HeroScreen history={history}/>
            </MemoryRouter>
        );

        expect( container.firstChild ).toBeNull();

    })

    test('Debe de mostrar un hero si el parametro existe', () => {

        const { container } = render(
            <MemoryRouter initialEntries={[`/hero/${param}`]} >
                <Route 
                    path='/hero/:heroId' 
                    component={HeroScreen} 
                />
            </MemoryRouter>
        );

        expect( container.firstChild ).toMatchSnapshot();

    })

    test('Debe de regresar a la pantalla anterior con push', () => {

        history.length = 2
      
        render(
            <MemoryRouter initialEntries={[`/hero/${param}`]}>
                <Route 
                    path='/hero/:heroId' 
                    component={ props => 
                        <HeroScreen 
                            {...props} 
                            history={history}
                        />
                    } 
                />
            </MemoryRouter>
        );

        userEvent.click(screen.getByText('Return'));

        expect( history.push ).toHaveBeenCalledWith('/');
        expect( history.goBack ).not.toHaveBeenCalled();

    })

    test('Debe de regresar a la pantalla anterior con goBak', () => {

        history.length = 3;
        
        render(
            <MemoryRouter initialEntries={[`/hero/${param}`]}>
                <Route  
                    path='/hero/:heroId' 
                    component={
                        props => <HeroScreen 
                            {...props}
                            history={history}
                        />
                    }
                />
            </MemoryRouter>
        );

        userEvent.click(screen.getByText('Return'));

        expect( history.push ).not.toHaveBeenCalled();
        expect( history.goBack ).toHaveBeenCalled();
    })
        
    
})
