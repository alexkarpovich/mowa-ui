import React, { useState, useContext, Fragment } from 'react';
import {useMutation, useQuery} from '@apollo/react-hooks';
import { Navbar, Nav, NavDropdown, Spinner } from 'react-bootstrap';

import { AuthContext } from 'context/auth';
import { ME_QUERY, ACTIVATE_PROFILE } from "schemas/account";

function MenuBar() {
    const { user, logout } = useContext(AuthContext);
    const { loading, data } = useQuery(ME_QUERY);
    const [activateProfile] = useMutation(ACTIVATE_PROFILE);
    const pathname = window.location.pathname;
    const path = pathname === '/' ? 'home' : pathname.substr(1);
    const [activeItem, setActiveItem] = useState(path);

    function activateUserProfile(id) {
      activateProfile({
        variables: { id },
        update(proxy) {
          const root = proxy.readQuery({ query: ME_QUERY });
          root.me.profiles = root.me.profiles.map(profile => {
            profile.active = profile.id === id;

            return profile;
          });
          proxy.writeData({ query: ME_QUERY, data: root });
        }
      }).catch(err => console.log(err));
    }

    return (
        <Navbar bg="light" variant="light">
            <Navbar.Brand href="/">MOWA</Navbar.Brand>
            <Nav className="mr-auto" activeKey={activeItem} onSelect={key => setActiveItem(key)}>
                <Nav.Link href="/">Home</Nav.Link>
                { user ? (
                    <Fragment>
                        <Nav.Link href="/sets">Наборы</Nav.Link>
                        { loading ? <Spinner animation="border" /> : (
                          <NavDropdown title="Профили" id="profile-dropdown">
                            {
                              data.me.profiles.map((profile, i) => (
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
                            <NavDropdown.Item href="/profile/add">+ добавить</NavDropdown.Item>
                          </NavDropdown>
                        ) }
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
