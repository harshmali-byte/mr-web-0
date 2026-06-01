import AdminDashboard from "../../components/Admin/Dashboard/AdminDashboard";
import UnAuthorized from "../../components/Common/UnAuthorized";

export default function Unauthorized() {
    return (
        <AdminDashboard>
            <UnAuthorized />
        </AdminDashboard>
    )
}