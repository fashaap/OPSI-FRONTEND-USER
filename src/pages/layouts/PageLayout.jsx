const PageLayout = ({ children }) => {
  return (
    <div className="bg-[conic-gradient(at_bottom_right,_var(--tw-gradient-stops))] from-blue-700 via-blue-800 to-gray-900 w-full h-full">
      <div className="container mx-auto flex justify-center items-center md:h-screen p-5 sm:p-10">{children}</div>
    </div>
  );
};

export default PageLayout;
