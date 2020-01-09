import React, { useState, useContext, Fragment } from 'react';
import { useMutation } from '@apollo/react-hooks';
import { Link } from 'react-router-dom';
import { Navbar, Nav, NavDropdown, Spinner } from 'react-bootstrap';

import { AuthContext } from 'context/auth';
import { ACTIVATE_PROFILE, ACTIVATE_PROFILE_CLIENT, SETS_QUERY } from 'graphql/schemas/account';

function MenuBar() {
    const { user, logout } = useContext(AuthContext);
    const [activateProfile] = useMutation(ACTIVATE_PROFILE);
    const [activateProfileClient] = useMutation(ACTIVATE_PROFILE_CLIENT);
    const pathname = window.location.pathname;
    const path = pathname === '/' ? 'home' : pathname.substr(1);
    const [activeItem, setActiveItem] = useState(path);

    function activateUserProfile(id) {
      activateProfile({
        variables: { id },
        update(proxy) {
          activateProfileClient({
            variables: { id }
          });
        },
        refetchQueries: () => [{ query: SETS_QUERY }]
      }).catch(err => console.log(err));
    }

    return (
        <Navbar bg="light" variant="light">
            <Navbar.Brand href="/">MOWA</Navbar.Brand>
            <Nav className="mr-auto" activeKey={activeItem} onSelect={key => setActiveItem(key)}>
                <Nav.Link as={Link} to="/">Home</Nav.Link>
                { user ? (
                    <Fragment>
                        <Nav.Link as={Link} to="/sets">Наборы</Nav.Link>
                        { !user ? <Spinner animation="border" /> : (
                          <NavDropdown title="Профили" id="profile-dropdown">
                            {
                              user.profiles.map((profile, i) => (
                                <NavDropdown.Item
                                  key={i}
                                  active={profile.active}
                                  onClick={() => activateUserProfile(profile.id)}
                                >
                                  {profile.name}
                                </NavDropdown.Item>
                              ))
                            }
                            <NavDropdown.Divider />
                            <NavDropdown.Item as={Link} to="/profile/add">+ добавить</NavDropdown.Item>
                          </NavDropdown>
                        ) }
                        <Nav.Link onClick={logout}>Выйти</Nav.Link>
                    </Fragment>
                ) : (
                    <Fragment>
                        <Nav.Link as={Link} to="/login">Войти</Nav.Link>
                        <Nav.Link as={Link} to="/signup">Регистрация</Nav.Link>
                    </Fragment>
                )}

            </Nav>
        </Navbar>
    );
}

export default MenuBar;
