import React, { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button"; // Assuming you have a Button component

const NotFound = () => {
  const navigate = useNavigate();

  const goHome = () => {
    navigate("/");
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 p-4">
      <div className="text-[25px] font-bold mb-4">This Page is Not Found</div>
      <p className="text-gray-700 mb-6">
        Sorry, the page you are looking for does not exist. You can click the
        button below to return to the homepage.
      </p>
      <Button onClick={goHome} aria-label="Go to Home Page">
        Go to Home Page
      </Button>
    </div>
  );
};

export default NotFound;
