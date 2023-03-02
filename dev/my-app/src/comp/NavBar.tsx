import React from 'react';
import ReactDOM from 'react-dom';
import NavBarButton from './NavBarButton';

export default function NavBar(props: any) {
    const [selectedIndex, setSelectedIndex] = React.useState(0);
    const navBarButtons = ["About", "Dev", "2D", "3D", "Contact"].map(
        (str, i ) => <NavBarButton key={i} label={str} isSelected={i === selectedIndex} onClick={() => setSelectedIndex(i)} />
    );
    return (
        <nav className="nav-bar">
            <h1 className="logo-text">Cory Butler</h1>
            <div className="nav-bar-button-container">
                {navBarButtons}
            </div>
        </nav>
    );
}