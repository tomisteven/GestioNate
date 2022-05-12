import React from 'react'
import { useAuth0 } from '@auth0/auth0-react'

const LoginButton = () => {


    const { loginWithRedirect } = useAuth0();

    return (
        <button style={
            {
                color: 'white',
                backgroundColor: 'transparent',
                border: 'none',
                cursor: 'pointer',
                outline: 'none',
                fontSize: '1rem',
                fontWeight: 'bold',
                margin: '2rem',
            }
        }  onClick={() => loginWithRedirect()}>
            Iniciar Sesion
        </button>
    );


}

export default LoginButton
