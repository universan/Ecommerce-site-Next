import AdminNav from "@/components/nav/AdminNav";

export default function AdminDashboard({ children }) {
  return (
    <>
      <AdminNav />
      {children}
    </>
  );
}
