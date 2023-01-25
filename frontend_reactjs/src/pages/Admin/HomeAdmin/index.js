import { Link } from "react-router-dom";

import config from '~/config';

function HomeAdmin() {
    return (<>
        <Link to={config.routes.adminProduct}>Testt</Link>
        <Link to={config.routes.adminProductInsert}>Testt111</Link>
        <Link to={config.routes.adminProductUpdate}>Testt2222</Link>
        <h1>Admin Home</h1>
    </>);
}

export default HomeAdmin;