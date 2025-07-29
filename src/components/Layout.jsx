// import { useState, useEffect } from "react";
// import Sidebar from "./Navbar/Sidebar";
// import Logo from "../assets/logo-new.png";
// import Topbar from "./Navbar/Topbar";
// import { cn } from "../lib/utils";
// import PropTypes from "prop-types";

// // Function to format date and time to 12-hour format
// const formatDateTime = (date) => {
//   let hours = date.getHours();
//   let minutes = date.getMinutes();
//   const ampm = hours >= 12 ? "PM" : "AM";
//   hours = hours % 12;
//   hours = hours ? hours : 12; // the hour '0' should be '12'
//   minutes = minutes < 10 ? "0" + minutes : minutes;
//   const strTime = hours + ":" + minutes + " " + ampm;
//   return (
//     date.getMonth() +
//     1 +
//     "/" +
//     date.getDate() +
//     "/" +
//     date.getFullYear() +
//     " " +
//     strTime
//   );
// };

// const Layout = ({ children }) => {
//   const storedData = JSON.parse(localStorage.getItem("userData"));
//   // const [isSidebarOpen, setIsSidebarOpen] = useState(true);
//   const [isSidebarOpen, setIsSidebarOpen] = useState(
//     () => window.innerWidth >= 1025
//   );
//   const [hoveredIcon, setHoveredIcon] = useState(null);
//   const [currentUser, _setCurrentUser] = useState(storedData.username);
//   const [currentUserLevel, _setCurrentUserLevel] = useState(
//     storedData.userslevel
//   );
//   const [lastLogin, setLastLogin] = useState("");

//   // Mouse enter event on icons
//   const handleMouseEnter = (icon) => {
//     setHoveredIcon(icon);
//   };

//   // Mouse leave event on icons
//   const handleMouseLeave = () => {
//     setHoveredIcon(null);
//   };

//   // Update last login time when dropdown content is opened
//   useEffect(() => {
//     const interval = setInterval(() => {
//       const currentDateTime = new Date();
//       setLastLogin(formatDateTime(currentDateTime));
//     }, 1000);

//     return () => clearInterval(interval);
//   }, []);

//   return (
//     <div className="flex h-screen bg-gray-200">
//       <div
//         className={cn(
//           "bg-white h-screen overflow-y-hidden transition-all duration-300 ease-in-out z-40 flex-none",
//           "rounded-tr-2xl rounded-br-2xl",
//           "lg:static lg:block"
//         )}
//       >
//         <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
//       </div>

//       <div className="flex flex-col w-full">
//         {/* Header overlapping the sidebar */}
//         <header className="bg-[#237C55] text-white p-4 flex justify-between items-center -ml-16">
//           {!isSidebarOpen && (
//             <img
//               src={Logo}
//               className="absolute left-20 h-10 rounded z-0"
//               alt="Logo"
//             />
//           )}

//           <Topbar
//             handleMouseEnter={handleMouseEnter}
//             handleMouseLeave={handleMouseLeave}
//             hoveredIcon={hoveredIcon}
//             username={currentUser}
//             userslevel={currentUserLevel}
//             lastLogin={lastLogin}
//           />
//         </header>

//         <div className="flex-1 bg-gray-200 p-4 overflow-auto">{children}</div>
//       </div>
//     </div>
//   );
// };

// Layout.propTypes = {
//   username: PropTypes.string,
//   children: PropTypes.node.isRequired,
// };

// export default Layout;

import { useState, useEffect } from "react";
import Sidebar from "./Navbar/Sidebar";
import Logo from "../assets/logo-new.png";
import Topbar from "./Navbar/Topbar";
import { cn } from "../lib/utils";
import PropTypes from "prop-types";

// Function to format date and time to 12-hour format
const formatDateTime = (date) => {
  let hours = date.getHours();
  let minutes = date.getMinutes();
  const ampm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12 || 12;
  minutes = minutes < 10 ? "0" + minutes : minutes;
  const strTime = `${hours}:${minutes} ${ampm}`;
  return `${
    date.getMonth() + 1
  }/${date.getDate()}/${date.getFullYear()} ${strTime}`;
};

const Layout = ({ children }) => {
  const storedData = JSON.parse(localStorage.getItem("userData"));
  const [isSidebarOpen, setIsSidebarOpen] = useState(
    () => window.innerWidth >= 1025
  );
  const [hoveredIcon, setHoveredIcon] = useState(null);
  const [currentUser, _setCurrentUser] = useState(storedData?.username);
  const [currentUserLevel, _setCurrentUserLevel] = useState(
    storedData?.userslevel
  );
  const [lastLogin, setLastLogin] = useState("");

  // Mouse enter/leave handlers
  const handleMouseEnter = (icon) => setHoveredIcon(icon);
  const handleMouseLeave = () => setHoveredIcon(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setLastLogin(formatDateTime(new Date()));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex h-screen bg-gray-200">
      {/* Sidebar */}
      <div
        className={cn(
          "bg-white h-screen overflow-y-hidden transition-all duration-300 ease-in-out z-40 flex-none",
          "rounded-tr-2xl rounded-br-2xl",
          "lg:static lg:block"
        )}
      >
        <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
      </div>

      {/* Main Content Area */}
      <div className="flex flex-col w-full">
        {/* Topbar/Header */}
        <header className="bg-[#237C55] text-white p-4 flex justify-between items-center -ml-16">
          {!isSidebarOpen && (
            <img
              src={Logo}
              className="absolute left-20 h-10 rounded z-0"
              alt="Logo"
            />
          )}
          <Topbar
            handleMouseEnter={handleMouseEnter}
            handleMouseLeave={handleMouseLeave}
            hoveredIcon={hoveredIcon}
            username={currentUser}
            userslevel={currentUserLevel}
            lastLogin={lastLogin}
          />
        </header>

        {/* Main Scrollable Page Content */}
        <main className="flex-1 bg-gray-200 p-4 overflow-auto">{children}</main>

        {/* Footer */}
        <footer className="bg-[#237C55] text-sm text-white border-t px-4 py-2 text-center shadow-sm -ml-16">
          © {new Date().getFullYear()} e& Technologies. All rights reserved.
        </footer>
      </div>
    </div>
  );
};

Layout.propTypes = {
  username: PropTypes.string,
  children: PropTypes.node.isRequired,
};

export default Layout;
