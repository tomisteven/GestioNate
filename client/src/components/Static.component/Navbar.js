import React from 'react';
import {Link, useNavigate} from "react-router-dom";
import {AppBar, Box, Button, Container, Toolbar, Typography, Avatar} from '@mui/material';



export default function Navbar() {

  const navigate = useNavigate(); //para el boton de ir a tareas

  return <div>
    
    <Box sx={{ flexGrow:1 }}>
      <AppBar position='static' color='transparent'>
        <Container>
          <Toolbar>
            <Typography variant='h6' sx={{ flexGrow: 1 }}>
              <Link style={{textDecoration:"none", color:"white"}} to="/">Sistema de gestion</Link>
            </Typography>

            <Button color='primary' variant='contained' onClick={ ()=> navigate("/task/new")}>
              
              Nueva Tarea &nbsp; 

              
              
              <Avatar src='https://w7.pngwing.com/pngs/209/1016/png-transparent-computer-icons-task-id-miscellaneous-computer-logo.png' />
            
            </Button>
            &nbsp;&nbsp;&nbsp;
            <Button color="secondary" variant='contained' onClick={ ()=> navigate("/turn/new")}>
              
              Nuevo Turno &nbsp;

              <Avatar src='https://flyclipart.com/thumb2/reloj-icono-234872.png' />
            
            </Button>

            &nbsp;&nbsp;&nbsp;
            <Button color='success' variant='contained' onClick={ ()=> navigate("/order/new")}>Nuevo pedido &nbsp;	
            <Avatar src='https://cdn-icons-png.flaticon.com/512/1532/1532688.png' />
            </Button>


            &nbsp;&nbsp;&nbsp;
            <Button color='error' variant='contained' onClick={ ()=> navigate("/providers/new")}>Nuevo Proveedor &nbsp;
            <Avatar src='https://cdn-icons-png.flaticon.com/512/712/712742.png' />
            
            </Button>

          </Toolbar>
        </Container>
      </AppBar>

    </Box>
    
    </div>;
}
