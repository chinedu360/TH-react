import React, { useEffect, useState, useMemo, useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { IoIosArrowRoundBack } from "react-icons/io";
import Button from "../../components/Button";
import { PiStudentFill } from "react-icons/pi";
import Modal from "../../components/Modal";
import Input from "../../components/Input";
import { getResource, getStudent } from "../../features/classroom/studentSlice";

const StudentDetails = ({ student }) => (
  <div className="flex flex-col items-center">
    <div>
      <PiStudentFill size={100} />
    </div>
    <h1>
      {student?.firstname} {student?.lastname}
    </h1>
    <p>{student?.grade}</p>
    <p>{student?.schoolId}</p>
    <p>{student?.email}</p>
  </div>
);

const Student = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [checkedResources, setCheckedResources] = useState({});
  const [resources, setResources] = useState([]);

  const student = useSelector((state) =>
    state.student.studentsData.students?.find((student) => student.id === id)
  );
  const { getResourceData, getResourceStatus } = useSelector(
    (state) => state.student
  );

  const back = useCallback(() => {
    navigate(-1);
  }, [navigate]);

  const openModal = useCallback(() => {
    dispatch(getResource());
    setIsModalOpen(true);
  }, [dispatch]);

  const closeModal = useCallback(() => {
    setIsModalOpen(false);
  }, []);

  const handleCheckboxChange = useCallback((e, book) => {
    const { id } = book;
    setCheckedResources((prev) => ({
      ...prev,
      [id]: e.target.checked,
    }));
  }, []);

  const handleSelectedResource = useCallback(() => {
    const selectedResources = getResourceData?.resources?.filter(
      (book) => checkedResources[book.id]
    );
    setResources(selectedResources);
    closeModal();
  }, [checkedResources, closeModal, getResourceData]);

  useEffect(() => {
    dispatch(getStudent());
  }, [dispatch]);

  // Using useMemo for studentDetails to prevent unnecessary re-renders
  const studentDetails = useMemo(
    () => <StudentDetails student={student} />,
    [student]
  );

  return (
    <div className="flex flex-col items-center">
      <div className="mb-4">
        <Button
          className="border-none !bg-transparent !text-black hover:bg-transparent py-0 px-0"
          onClick={back}
          aria-label="Back"
        >
          <IoIosArrowRoundBack size={35} />
        </Button>
        {studentDetails}
        <div className="flex flex-col items-center m-6">
          <Button aria-label="Assign Book" onClick={openModal}>
            Assign book
          </Button>
        </div>
        <Modal isOpen={isModalOpen} onClose={closeModal}>
          <h2 className="text-xl mb-4">Books and Audios</h2>
          <p className="text-gray-700">You can submit Resources.</p>
          {getResourceStatus === "pending" ? (
            <p>Loading resources...</p> // You can replace this with a spinner component if you have one
          ) : (
            getResourceData?.resources?.map((book) => (
              <div className="flex items-center" key={book.id}>
                <Input
                  type="checkbox"
                  checked={!!checkedResources[book.id]}
                  onChange={(e) => handleCheckboxChange(e, book)}
                  value={book.subject}
                  name="subject"
                />
                <label className="ml-2">
                  {book.type.toLowerCase()} ({book.path.split("/")[2]})
                </label>
              </div>
            ))
          )}
          <Button aria-label="Assign" onClick={handleSelectedResource}>
            Assign
          </Button>
        </Modal>
        <h1 className="font-bold text-[30px]">Assigned Resources</h1>
        <div>
          {resources?.map((book) => (
            <div key={book.id}>
              <h2 className="font-bold ">Type: {book.type}</h2>
              <p>{book.path.split("/")[2]}</p>
            </div>
          ))}
          {resources.length === 0 && (
            <h1 className="font-bold text-[15px]">
              No resources assigned to this student
            </h1>
          )}
        </div>
      </div>
    </div>
  );
};

export default Student;
