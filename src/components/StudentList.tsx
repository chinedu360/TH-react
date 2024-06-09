import React from "react";
import { PiStudentFill } from "react-icons/pi";

// Define the List component
const StudentList = ({ students, onStudentClick }) => {
  const renderStudents = () => {
    return students?.map((student) => (
      <li
        className="flex pt-4 p-4 space-x-12 cursor-pointer border border-[#d5cdcd]"
        key={student.id}
        onClick={() => onStudentClick && onStudentClick(student)}
      >
        <div>
          <PiStudentFill size={24} />
        </div>
        <div className="flex space-x-14">
          <h3>
            {student?.firstname} {student.lastname}
          </h3>
          <p>{student?.grade}</p>
          <p> {student?.email}</p>
          {/* <p>School ID: {student.schoolId}</p> */}
        </div>
      </li>
    ));
  };

  return (
    <>
      <div className="flex pt-8 space-x-3 font-bold">
        <div className="">Avatar</div>
        <div className="flex flex-row space-x-6">
          <h3 className="mb-1">Student Name</h3>
          <p className="mb-1">Grade</p>
          <p className="mb-1">Email</p>
          {/* <p>School ID</p> */}
        </div>
      </div>
      <ul>{renderStudents()}</ul>
    </>
  );
};

export default StudentList;
