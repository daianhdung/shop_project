import { BrowserRouter as Router, Routes, Route , Outlet} from 'react-router-dom';
import { Fragment } from 'react';

import { privateRoutes, publicRoutes } from './routes/public';
import { DefaultLayout } from '~/layouts';
import { AuthProvider } from './context/AuthProvider';
import RequireAuth from './components/RequiredAuth';


function App() {
    return (
        <Router>
            <AuthProvider>
                <div className="App">
                    <Outlet/>
                    <Routes>
                        {publicRoutes.map((route, index) => {
                            const Page = route.component;
                            let Layout = DefaultLayout;
                            if (route.layout) {
                                Layout = route.layout;
                            } else if (route.layout === null) {
                                Layout = Fragment;
                            }
                            return (
                                <Route
                                    key={index}
                                    path={route.path}
                                    element={
                                        <Layout>
                                            <Page />
                                        </Layout>
                                    }
                                />
                            );
                        })}
                        <Route element={<RequireAuth />}>
                            {privateRoutes.map((route, index) => {
                                const Page = route.component;
                                let Layout = DefaultLayout;
                                if (route.layout) {
                                    Layout = route.layout;
                                } else if (route.layout === null) {
                                    Layout = Fragment;
                                }
                                return (
                                    <Route
                                        key={index}
                                        path={route.path}
                                        element={
                                            <Layout>
                                                <Page />
                                            </Layout>
                                        }
                                    />
                                );
                            })}
                        </Route>
                    </Routes>
                </div>
            </AuthProvider>
        </Router>
    );
}

export default App;
