import React from 'react'
import { FaBars } from 'react-icons/fa'
import {Nav, NavContainer, NavLogo, MobileIcon, NavMenu, NavItem, NavLinks, NavBtn} from './NavbarElements';

const Navbar = ({ toggle }) => {
    return (
    <>
        <Nav>
            <NavContainer>
                <h1 contenteditable spellcheck="false">
                    <NavLogo to='/'> AlgoLabs </NavLogo>
                </h1>
                <MobileIcon onClick={toggle}>
                    <FaBars />
                </MobileIcon>
                <NavMenu>
                    <NavItem>
                         <NavLinks to="/dijkstra"> Dijkstra </NavLinks>
                    </NavItem>
                    <NavItem>
                         <NavLinks to="/a*"> A* </NavLinks>
                    </NavItem>
                    <NavItem>
                         {/* <NavLinks to="/services"> Services </NavLinks> */}
                    </NavItem>
                </NavMenu>
                <NavBtn>
                    {/* <NavBtnLink to = "/login" >Login</NavBtnLink> */}
                </NavBtn>
            </NavContainer>
        </Nav>
    </>
    )
}

export default Navbar