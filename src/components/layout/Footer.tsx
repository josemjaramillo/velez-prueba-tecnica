function Footer() {
    const date = new Date().getFullYear();
    return (
        <div>
            <footer>
                <p>{date} © Todos los derechos reservados </p>
            </footer>
        </div>
    )
}

export default Footer;