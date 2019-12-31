import React, { useState, useContext, Fragment } from 'react';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';

import { AuthContext } from 'context/auth';

function MenuBar() {
    const { user, logout } = useContext(AuthContext);
    const pathname = window.location.pathname;
    const path = pathname === '/' ? 'home' : pathname.substr(1);
    const [activeItem, setActiveItem] = useState(path);

    console.log(user);

    return (
        <Navbar bg="light" variant="light">
            <Navbar.Brand href="/">MOWA</Navbar.Brand>
            <Nav className="mr-auto" activeKey={activeItem} onSelect={key => setActiveItem(key)}>
                <Nav.Link href="/">Home</Nav.Link>
                { user ? (
                    <Fragment>
                        <Nav.Link href="/sets">Наборы</Nav.Link>
                        <NavDropdown title="Профили" id="profile-dropdown">
                          {
                            user.profiles.map(profile => (
                              <NavDropdown.Item active={profile.active}>{profile.name}</NavDropdown.Item>
                            ))
                          }
                          <NavDropdown.Divider />
                          <NavDropdown.Item eventKey="4.4">+ добавить</NavDropdown.Item>
                        </NavDropdown>
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
