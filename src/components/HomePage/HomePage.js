import Base from '../Base/Base.js';
import AdminBase from '../AdminSideFrontEnd/Base/AdminBase.js';
import {useContext} from 'react';
import AuthContext from '../store/AuthContext.js';

function HomePage() {
    const authContext = useContext(AuthContext);
    return <div>
    {authContext.isAdmin ? <AdminBase /> : <Base />}
    </div>;
}

export default HomePage;