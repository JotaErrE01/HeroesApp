import authReducer from "../../auth/authReducer"
import { types } from "../../types/types";


describe('Pruebas en AuthReducer', () => {

    test('Debe de retornar el estado por defecto', () => {

        const initialState = { logged: false }
        
        const state = authReducer(initialState, {});

        expect(state).toEqual(initialState);

    })

    test('Debe de autenticar y colocar el name del usuario', () => {
        
        const initialState = { logged: false }
        
        const state = authReducer(initialState, { type: types.login, payload: { name: 'Jonathan' }});

        expect(state).toEqual({ logged: true, name: 'Jonathan' });

    })

    test('Debe de borrar el name del usuario y el log en false', () => {
        
        const initialState = { logged: false }
        
        const state = authReducer(initialState, { type: types.logout });

        expect(state).toEqual(initialState);

    })
    
})
