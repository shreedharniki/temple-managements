import React, { useEffect, useState } from "react";
import Loader from "../../components/ui/Loader";
import Alert from "../../components/ui/Alert";
import ReportCard from "../../components/ui/ReportCard";
import { apiGet } from "../../utils/helpers";

function DonationReportPage() {
  const [data, setData] = useState([]);
  const [alert, setAlert] = useState(null);
  const [loading, setLoading] = useState(true);

  const user_id = localStorage.getItem("user_id");
  const temple_id = localStorage.getItem("temple_id");

  useEffect(() => {
    const fetchReport = async () => {
      try {
        const res = await apiGet(
          `/donations/report/temple/${temple_id}/user/${user_id}`
        );
        setData(res.data || res);
      } catch (err) {
        console.error(err);
        setAlert({
          type: "error",
          message: "❌ Failed to fetch donation report",
        });
      } finally {
        setLoading(false);
      }
    };

    if (temple_id && user_id) fetchReport();
  }, [temple_id, user_id]);

  if (loading) return <Loader />;
  if (alert) return <Alert {...alert} />;

  return (
    <div className="p-6">
      <ReportCard
        logo="/temple-logo.png"
        title="🧾 Donation Report"
        data={data}
      />
    </div>
  );
}

export default DonationReportPage;
