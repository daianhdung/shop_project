import Header from '~/layouts/components/Header/Header';
import Sidebar from '~/layouts/components/Sidebar/Sidebar';

function DefaultLayout({ children }) {
    return (
        <div>
            <Header />
            <div>
                <Sidebar />
                <div>{children}</div>
            </div>
        </div>
    );
}

export default DefaultLayout;
