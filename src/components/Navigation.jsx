import { Tab, TabGroup, TabList } from "@headlessui/react";
import { Link } from "react-router-dom";

const Navigation = () => {
  const categories = [
    {
      name: "Buat tiket",
      path: "/",
    },
    {
      name: "Pengaturan",
      path: "/settings",
    },
  ];

  return (
    <div className="w-full max-w-md py-5 px-5 lg:py-10 lg:px-10">
      <TabGroup>
        <TabList className="flex gap-4 justify-center">
          {categories.map((item, idx) => (
            <Link
              key={idx}
              to={item.path}
              className="rounded-full py-2 px-4 lg:text-lg font-semibold text-white focus:outline-none hover:bg-white/5 hover:bg-opacity-10"
            >
              {item.name}
            </Link>
          ))}
        </TabList>
      </TabGroup>
    </div>
  );
};

export default Navigation;
