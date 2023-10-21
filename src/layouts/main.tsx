import { Header, Footer } from "~/components";

const Main = ({ children }: { children: React.ReactNode }) => {
    return (
        <>
            <Header />
            <main className="h-screen pt-14 pb-10">{children}</main>
            <Footer />
        </>
    );
};

export default Main;
