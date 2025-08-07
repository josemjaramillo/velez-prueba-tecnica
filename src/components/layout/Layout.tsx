
import Cart from "../cart/Cart";
import Footer from "./Footer";
import Header from "./Header";
import "./Layout.css"

function Layout({children}: {children:React.ReactNode}) {
    return (
        <>
            <Header />
            <Cart />
            <main className="container">{children}</main>
            <Footer />
        </>
    )
}

export default Layout;