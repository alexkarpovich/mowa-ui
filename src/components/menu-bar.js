import React, { useState, useContext, Fragment } from 'react';
import { Navbar, Nav } from 'react-bootstrap';

import { AuthContext } from '../context/auth';

function MenuBar() {
    const { user, logout } = useContext(AuthContext);
    const pathname = window.location.pathname;
    const path = pathname === '/' ? 'home' : pathname.substr(1);
    const [activeItem, setActiveItem] = useState(path);

    return (
        <Navbar bg="light" variant="light">
            <Navbar.Brand href="/">MOWA</Navbar.Brand>
            <Nav className="mr-auto" activeKey={activeItem} onSelect={key => setActiveItem(key)}>
                <Nav.Link href="/">Home</Nav.Link>
                { user ? (
                    <Fragment>
                        <Nav.Link href="/selections">Наборы</Nav.Link>
                        <Nav.Link href="/profile/add">Профили</Nav.Link>
                        <Nav.Link onClick={logout}>Выйти</Nav.Link>
                    </Fragment>
                ) : (
                    <Fragment>
                        <Nav.Link href="/login">Войти</Nav.Link>
                        <Nav.Link href="/signup">Регистрация</Nav.Link>
                    </Fragment>
                )}
            
            </Nav>
        </Navbar>
    );
}

export default MenuBar;
