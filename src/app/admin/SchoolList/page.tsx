import AdminSidebar from "@/components/AdminSidebar";
import SchoolListClient from "@/components/PageSchoolList"; // Import client component
import { getSchoolList } from "./action";
import { getUsers } from "@/db/models/user";
import { ObjectId } from "mongodb"; // Import ObjectId

const PageAdminSchoolList = async () => {
  const schoolData = await getSchoolList();
  const modifiedData = [...schoolData].map((school) => ({
    ...school,
    _id: new ObjectId(school._id), // Convert back to ObjectId
    userId: new ObjectId(school.userId), // If userId also needs conversion
  }));
  
  const userData = await getUsers();
  const modifiedUsers = [...userData].map((user) => ({
    ...user,
    _id: new ObjectId(user._id), // If user._id also needs conversion
  }));

  return (
    <div className="w-full min-h-screen bg-[#2C3E50]">
      <div className="flex min-h-screen">
        <AdminSidebar />
        <div className="w-9/12 bg-[#2C3E50] mx-auto mt-2 p-5">
          {/* Pass the data to the client component */}
          <SchoolListClient
            schools={modifiedData}
            users={modifiedUsers}
          />
        </div>
      </div>
    </div>
  );
};

export default PageAdminSchoolList;
