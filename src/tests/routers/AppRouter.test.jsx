import { render } from '@testing-library/react'
import AuthContext from '../../auth/AuthContext';
import AppRouter from '../../routers/AppRouter';

describe('Pruebas en <AppRouter />', () => {
    
    const contextValue = {
        dispatch: jest.fn(), // siempre que quieras probar funciones
        user: {
            logged: false
        }
    }

    test('Debe de mostrar el login si no estoy autenticado', () => {
        
        const { container } = render(
            <AuthContext.Provider value={contextValue}>
                <AppRouter />
            </AuthContext.Provider>
        );

        expect(container).toMatchSnapshot();

    })

    test('Debe de mostrar el componente de dc si esta autenticado', () => {

        contextValue.user.logged = true;
       
        const { container } = render(
            <AuthContext.Provider value={contextValue}>
                <AppRouter />
            </AuthContext.Provider>
        );

        expect(container).toMatchSnapshot();

    });

})
