import React from 'react'
import { FaBars } from 'react-icons/fa'
import {Nav, NavContainer, NavLogo, MobileIcon, NavMenu, NavItem, NavLinks, NavBtn, NavBtnLink} from './NavbarElements';
// import styles from './index.css';
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
                         {/* <NavLinks to="/about"> About </NavLinks> */}
                    </NavItem>
                    <NavItem>
                         {/* <NavLinks to="/menu"> Menu </NavLinks> */}
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