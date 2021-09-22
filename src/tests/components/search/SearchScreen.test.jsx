import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter, Route } from 'react-router';
import SearchScreen from '../../../components/search/SearchScreen';

describe('Pruebas en el <SearchScreen />', () => {
    
    test('Debe de hacer match con el snapshot', () => {
        
        const { container } = render(
            <MemoryRouter>
                <SearchScreen />
            </MemoryRouter>
        );

        expect( container ).toMatchSnapshot();

    });

    test('Debe de mostrar a batman y el valor del query String', () => {
        
        const { container } = render(
            <MemoryRouter initialEntries={['/search?q=batman']}>
                <Route exact path='/search' component={SearchScreen} />
            </MemoryRouter>
        )
        expect( screen.getByPlaceholderText('Find your hero').value ).toBe('batman');
        expect( container.querySelector('.card-tittle').textContent.trim().toLowerCase() ).toBe('batman');

    });

    test('Debe de mostrar un error si no se encuentra el hero', () => {
        
        const { container } = render(
            <MemoryRouter initialEntries={['/search?q=batmanjsdf;']}>
                <Route exact path='/search' component={SearchScreen} />
            </MemoryRouter>
        )

        expect( container.querySelector('.alert-danger') ).toBeInTheDocument();

    })

    test('Debe de llamar al push del history', () => {

        const history = {
            push: jest.fn()
        }
        
        const { container } = render(
            <MemoryRouter initialEntries={['/search']}>
                <Route 
                    exact 
                    path='/search' 
                    component={ props => <SearchScreen {...props} history={history}/> } 
                />
            </MemoryRouter>
        )

        userEvent.type(container.querySelector('.form-control'), 'batman');

        userEvent.click(container.querySelector('.btn-outline-primary'));

        expect( history.push ).toHaveBeenCalled();
        expect( history.push ).toHaveBeenCalledWith('?q=batman');

    })
    
})
