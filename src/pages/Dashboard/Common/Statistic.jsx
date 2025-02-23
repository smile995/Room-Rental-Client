import LoadingSpinner from "../../../components/Shared/LoadingSpinner";
import useAuth from "../../../hooks/useAuth";
import useRole from "../../../hooks/useRole";
import AdminStatistics from "../Admin/AdminStatistics";
import GuestStatistics from "../Guest/GuestStatitics";
import HostStatistics from "../Host/HostStatistics";

const Statistic = () => {
  const [role, isLoading] = useRole();
  const {loading } = useAuth();
  if (isLoading || loading) {
    return <LoadingSpinner />;
  }
  return (
    <>
      {role === "admin" && <AdminStatistics />}
      {role === "host" && <HostStatistics />}
      {role === "guest" && <GuestStatistics />}
    </>
  );
};

export default Statistic;
