import { useAuth } from "@/auth/auth-context";
import type { FunctionComponent } from "react";

interface ReportsProps {}

const Reports: FunctionComponent<ReportsProps> = () => {
  const auth = useAuth();

  console.log(auth.user);
  return (
    <main className="p-6">
      <h1>Reports</h1>
    </main>
  );
};

export default Reports;
