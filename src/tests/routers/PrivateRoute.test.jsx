import { prettyDOM, render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import PrivateRoute from "../../routers/PrivateRoute";

describe('Pruebas en <PrivateRoute />', () => {

    const rest = {
        location: {
            pathname: '/dc'
        }
    }

    Storage.prototype.setItem = jest.fn();
    
    test('Debe de mostrar el componente si esta autenticado y guardar local storage', () => {
        const { container } = render(
            <MemoryRouter>
                <PrivateRoute 
                    isAuthenticated={ true }
                    component={() => <span>Listo</span>}
                    {...rest}
                />
            </MemoryRouter>
        );

        expect( container.firstChild ).toMatchSnapshot();
        expect( container.firstChild.textContent ).toBe('Listo');
        expect( localStorage.setItem ).toHaveBeenCalledWith('lastPath', rest.location.pathname);
    })

    test('Debe de bloquear el componente si no esta autenticado', () => {
        const { container, debug } = render(
            <MemoryRouter>
                <PrivateRoute 
                    isAuthenticated={ false }
                    component={() => <span>Listo</span>}
                    {...rest}
                />
            </MemoryRouter>
        );
        
        expect( container.firstChild ).toBeNull();
        expect( container.querySelector('span') ).not.toBeInTheDocument();
    })
    
    
})