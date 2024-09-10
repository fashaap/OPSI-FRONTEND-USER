import { Button } from "@headlessui/react";
import { useState } from "react";
import { FaCog } from "react-icons/fa";

const PageLayout = ({ children }) => {
  const token = localStorage.getItem("userToken");
  const [showButtons, setShowButtons] = useState(false);
  const toggleButtons = () => {
    setShowButtons((prev) => !prev);
  };

  const handleLogout = () => {
    localStorage.removeItem("userToken");
    window.location.reload();
  };

  return (
    <div className="relative bg-[conic-gradient(at_bottom_right,_var(--tw-gradient-stops))] from-blue-700 via-blue-800 to-gray-900 w-full h-full">
      <div className="container mx-auto flex justify-center items-center md:h-screen p-5 sm:p-10">
        {children}
        {token && (
          <>
            <Button
              onClick={toggleButtons}
              className="absolute top-5 left-5 hover:bg-gray-500 bg-white p-3 w-auto rounded-full font-semibold text-center flex justify-start items-start"
            >
              <FaCog size={13} />
            </Button>

            {showButtons && (
              <Button
                onClick={handleLogout}
                className="absolute top-5 left-2 w-auto ms-16 shadow-md rounded-full bg-white py-2 px-4 text-sm data-[hover]:bg-gray-500 data-[active]:bg-gray-700"
              >
                <span className="text-black font-semibold">Log Out</span>
              </Button>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default PageLayout;
