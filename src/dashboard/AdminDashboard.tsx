import DashboardNavbar from "@/components/DashboardNavbar/DashboardNavbar";
import DashboardSidebar from "@/components/DashboardSidebar/DashboardSidebar";

const AdminDashboard = () => {
  return (
    <section className="lg:flex gap-8 ">
      <div className="">
        <DashboardSidebar sidebarType="admin" />
        <DashboardNavbar sidebarType="admin" />
      </div>
      <div className="lg:p-8 text-white max-w-screen-xl mx-auto">
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Labore, amet
        nisi facere ducimus distinctio porro inventore dolorum debitis natus
        quae voluptates dicta modi, beatae illum, minus eum est numquam
        corrupti!
      </div>
    </section>
  );
};

export default AdminDashboard;
