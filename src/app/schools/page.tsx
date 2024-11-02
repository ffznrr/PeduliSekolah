import SchoolPageAll from "@/components/SchoolPage";
import { getSchools } from "./action";

const SchoolPage = async () => {
  const schoolData = await getSchools();
  const modifiedData = [...schoolData].map((school) => {
    return {
      ...school,
      _id: school._id.toString(),
      userId: school.userId.toString(),
    };
  });

  return (
    <>
      <div className="w-full bg-white p-5">
        <SchoolPageAll schoolData={modifiedData} />
      </div>
    </>
  );
};

export default SchoolPage;
