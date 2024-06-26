import React, { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../components/Button";
import StudentList from "../../components/StudentList";
import Modal from "../../components/Modal";
import Input from "../../components/Input";
import { homework } from "./homework";
import { IoIosArrowRoundBack } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { getStudent } from "../../features/classroom/studentSlice";

const Classroom = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { studentsData, errorMessage, getStudentStatus } = useSelector(
    (store) => store.student
  );
  const [checkedAssignments, setCheckedAssignments] = useState({});
  const [assignments, setAssignments] = useState([]);

  const back = useCallback(() => {
    navigate(-1);
  }, [navigate]);

  const handleStudentClick = useCallback(
    (student) => {
      navigate(`/student/${student.id}`);
      // console.log("Clicked student:", student.id);
    },
    [navigate]
  );

  const openModal = useCallback(() => {
    setIsModalOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setIsModalOpen(false);
  }, []);

  const handleCheckboxChange = useCallback((e, homework) => {
    const { id } = homework;
    setCheckedAssignments((prev) => ({
      ...prev,
      [id]: e.target.checked,
    }));
  }, []);

  const handleSelectedAssignment = useCallback(() => {
    const selectedAssignments = homework.filter(
      (assignment) => checkedAssignments[assignment.id]
    );
    setAssignments(selectedAssignments);
    closeModal();
  }, [checkedAssignments, closeModal]);

  useEffect(() => {
    dispatch(getStudent());
  }, [dispatch]);

  return (
    <div className="flex flex-col items-center">
      <div className="mb-4">
        <h1 className="font-bold text-center text-[35px]">SS3 Classroom</h1>
        <Button
          className="!bg-transparent !text-black border-none hover:bg-transparent py-0 px-0"
          onClick={back}
          aria-label="Back"
        >
          <IoIosArrowRoundBack size={35} />
        </Button>

        <div className="mb-4 space-y-1">
          <Button
            aria-label="Assign Homework"
            className="text-black"
            onClick={openModal}
          >
            Assign Homework
          </Button>
          {getStudentStatus === "pending" ? (
            <p>loading...</p>
          ) : errorMessage ? (
            <p className="text-red-500">{errorMessage}</p>
          ) : (
            <StudentList
              students={studentsData?.students}
              onStudentClick={handleStudentClick}
            />
          )}
        </div>

        <Modal isOpen={isModalOpen} onClose={closeModal}>
          <h2 className="text-xl mb-4">Assignment</h2>
          <p className="text-gray-700">You can submit assignments.</p>
          {homework.map((assigned) => (
            <div className="flex items-center" key={assigned.id}>
              <Input
                type="checkbox"
                checked={!!checkedAssignments[assigned.id]}
                onChange={(e) => handleCheckboxChange(e, assigned)}
                value={assigned.subject}
                name="subject"
              />
              <label className="ml-2">{assigned.subject}</label>
            </div>
          ))}
          <Button aria-label="Assign" onClick={handleSelectedAssignment}>
            Assign
          </Button>
        </Modal>
      </div>
      <h1 className="font-bold text-[30px]">Class Assigned Homework</h1>
      <div>
        {assignments.map((assignment) => (
          <div key={assignment.id}>
            <h2 className="font-bold ">{assignment.subject}</h2>
            <p>{assignment.description}</p>
          </div>
        ))}
        {assignments.length === 0 && (
          <h1 className="font-bold text-[15px]">
            No Homework assigned to this class
          </h1>
        )}
      </div>
    </div>
  );
};

export default Classroom;
