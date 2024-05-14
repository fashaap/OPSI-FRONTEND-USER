import Navigation from "../../components/Navigation";

const PageLayout = ({ children }) => {
  return (
    <div className="bg-[conic-gradient(at_bottom_right,_var(--tw-gradient-stops))] from-blue-700 via-blue-800 to-gray-900 h-screen w-screen">
      <Navigation />
      <div className="p-5 ">{children}</div>
    </div>
  );
};

export default PageLayout;
