import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';

function Header() {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('jwtToken'); 
        navigate('/');  // Redirect to the login page
    };
    
    const handleMenuClick = () => {
        console.log("Menu button clicked");
    };

    return (
        <header style={styles.header}>
            <button onClick={handleMenuClick} style={styles.iconButton}>
                <FontAwesomeIcon icon={faBars} />
            </button>
            <h2 style={styles.logo}>Employee Management System</h2>
            <button onClick={handleLogout} style={styles.iconButton}>
                <FontAwesomeIcon icon={faSignOutAlt} />
            </button>
        </header>
    );
}

const styles = {
    header: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '10px 20px',
        backgroundColor: '#4CAF50',
        color: '#fff',
    },
    iconButton: {
        border: 'none',
        backgroundColor: 'transparent',
        color: '#fff',
        fontSize: '20px',
        cursor: 'pointer',
    },
    logo: {
        fontSize: '24px',
        margin: 0,
        textAlign: 'center',
        flexGrow: 1,
    },
};

export default Header;
