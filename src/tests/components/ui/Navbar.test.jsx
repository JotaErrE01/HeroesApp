import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event";
import {  Router } from "react-router";
import AuthContext from "../../../auth/AuthContext";
import { Navbar } from "../../../components/ui/Navbar";
import { createMemoryHistory } from 'history';


describe('Pruebas en el <Navbar />', () => {

    const history = createMemoryHistory();

    const contextValue = {
        dispatch: jest.fn(), // siempre que quieras probar funciones
        user: {
            logged: true,
            name: 'Jonathan'
        }
    }

    let wrapper;

    beforeEach(() => {
        wrapper = render(
            <AuthContext.Provider value={contextValue}>
                <Router history={history}>
                    <Navbar />
                </Router>
            </AuthContext.Provider>
        );
    });
    
    test('Debe de mostrarse correctamente', () => {
       
        expect( wrapper.container ).toMatchSnapshot();
        expect( wrapper.container.querySelector('.text-info').textContent.trim() ).toBe('Jonathan');

    });

    test('Debe de llamar el logOut y usar history', () => {
       
        userEvent.click( screen.getByText('Logout') );

        expect( contextValue.dispatch ).toHaveBeenCalled();
        expect( history.location.pathname ).toBe( '/login' );

    });

})