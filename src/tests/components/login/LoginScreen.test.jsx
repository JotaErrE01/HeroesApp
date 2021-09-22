import { render, screen } from '@testing-library/react';
import { Router } from 'react-router';
import AuthContext from '../../../auth/AuthContext';
import LoginScreen from '../../../components/login/LoginScreen';
import { createMemoryHistory } from 'history';
import userEvent from '@testing-library/user-event';

describe('Pruebas en el componente <LoginScreen />', () => {

    Storage.prototype.getItem = jest.fn();
    const contextValue = {
        dispatch: jest.fn()
    }

    test('Debe de hacer match con el snapshot', () => {
        
        const { container } = render(
            <AuthContext.Provider value={contextValue}>
                <LoginScreen />
            </AuthContext.Provider>
        );

        expect( container ).toMatchSnapshot();
    })
    
    test('Debe de realizar el dispatch y la navegacion', () => {

        const history = {
            replace: jest.fn()
        }
        
        const { container } = render(
            <AuthContext.Provider value={contextValue}>
                <LoginScreen history={history}/>
            </AuthContext.Provider>
        );

        userEvent.click(container.querySelector('.btn-primary'));

        expect( contextValue.dispatch ).toHaveBeenCalled();
        expect( history.replace ).toHaveBeenCalled();
        expect( localStorage.getItem ).toHaveBeenCalledWith( 'lastPath' );

    })
    

})
