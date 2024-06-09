import React from "react";
import Button from "../../components/Button";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();
  const classRoom = () => {
    navigate("/classroom");
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen ">
      <h1 className="font-bold ">Dashboard</h1>
      <Button onClick={classRoom}>Assign homework</Button>
    </div>
  );
};

export default Dashboard;
