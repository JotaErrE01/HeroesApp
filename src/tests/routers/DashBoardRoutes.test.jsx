import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import AuthContext from "../../auth/AuthContext";
import { DashBoardRoutes } from "../../routers/DashBoardRoutes";


describe('Pruebas en <DashboardRoutes />', () => {

    const contextValue = {
        dispatch: jest.fn(),
        user: {
            logged: true,
            name: 'Jonathan'
        }
    }
    
    test('Debe mostrarse correctamente', () => {
      
        const { container } = render( 
            <AuthContext.Provider value={contextValue}>
                <MemoryRouter>
                    <DashBoardRoutes  /> 
                </MemoryRouter>
            </AuthContext.Provider>
        );

        expect( container ).toMatchSnapshot();
        expect( container.querySelector('.text-info').textContent.trim() ).toBe('Jonathan')
    })

})
