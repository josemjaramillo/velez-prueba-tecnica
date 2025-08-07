import Cart from "./Cart";
import Footer from "./Footer";
import Header from "./Header";

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