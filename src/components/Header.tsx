import { useState } from "react";
import { ShoppingCart } from "lucide-react";

function Header() {
    const [burst, setBurst] = useState(false);
    const [carCount, setCarCount] = useState(0);

    const handleClick = () => {
        setBurst(true);
        setTimeout(() => setBurst(false), 400); // duración = duración de la animación
    };

    return (
        <nav className="navbar">
            <div className="nav-content container">
                <h1 className="logo">Vélez</h1>
                <button className="cart-btn" onClick={handleClick}>
                    <ShoppingCart className="cart-icon" />
                    {carCount ? <span className="cart-count">{carCount}</span> : null}
                    {burst && <span className="burst" />}
                </button>

            </div>
        </nav>
    )
}

export default Header;