import {
  Button,
  Dialog,
  DialogPanel,
  DialogTitle,
  Transition,
  TransitionChild,
} from "@headlessui/react";
import clsx from "clsx";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AxiosInstance from "../../auth/AxiosInstance";

const TicketPage = () => {
  const token = localStorage.getItem("userToken");
  const [searchTerm, setSearchTerm] = useState("");
  const [item, setItem] = useState({});
  const [isOpenFound, setIsOpenFound] = useState(false);
  const [isOpenNotFound, setIsOpenNotFound] = useState(false);
  const [isOpenRequired, setIsOpenRequired] = useState(false);
  const [usersData, setUsersData] = useState({}); // Changed to object
  const [ticketsData, setTicketsData] = useState([]);

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const checkNISN = async (nisn) => {
    if (nisn.length === 10) {
      try {
        // Perform API request
        const response = await AxiosInstance.get(
          `/api/v1/auth/users?nisn=${nisn}`,
          {
            headers: { token: token }, // Replace with your actual token
          }
        );

        // Extract user data from response
        const foundItem = response.data.data;
        setUsersData(foundItem[0] || {}); // Assuming single item or empty object

        // Update state and open the appropriate dialog
        if (foundItem.length > 0) {
          setItem(foundItem[0]);
          openFound();
        } else {
          openNotFound();
        }
      } catch (error) {
        console.error("Error fetching user information:", error);
        openNotFound(); // You might want to show an error dialog here
      }
    } else {
      openRequired();
    }
  };

  const fetchTicketsInformation = async () => {
    if (usersData && usersData.id) {
      try {
        const response = await AxiosInstance.get(
          `/api/v1/tickets?idUser=${usersData.id}`,
          {
            headers: { token: token }, // Replace with your actual token
          }
        );

        // console.log(response.data.data);
        setTicketsData(response.data.data);
      } catch (error) {
        console.error("Error fetching tickets information:", error);
      }
    }
  };

  useEffect(() => {
    if (usersData.id) {
      fetchTicketsInformation();
    }
  }, [usersData]);

  const historyCount = () => {
    const dispenCount = ticketsData.filter(
      (ticket) => ticket.category === 7010
    ).length;
    const izinCount = ticketsData.filter(
      (ticket) => ticket.category === 7020
    ).length;
    const pulangCount = ticketsData.filter(
      (ticket) => ticket.category === 7030
    ).length;
    const nullCount = ticketsData.filter(
      (ticket) => ticket.category === 5050
    ).length;

    return { dispenCount, izinCount, pulangCount, nullCount };
  };

  const { dispenCount, izinCount, pulangCount, nullCount } = historyCount();

  // console.log({ dispenCount, izinCount, pulangCount, nullCount });

  const handleSearch = () => {
    checkNISN(searchTerm);
  };

  const openFound = () => setIsOpenFound(true);
  const closeFound = () => setIsOpenFound(false);
  const openNotFound = () => setIsOpenNotFound(true);
  const closeNotFound = () => setIsOpenNotFound(false);
  const openRequired = () => setIsOpenRequired(true);
  const closeRequired = () => setIsOpenRequired(false);

  const AlertFound = () => (
    <Transition appear show={isOpenFound}>
      <Dialog
        as="div"
        className="fixed inset-0 z-10 overflow-y-auto"
        onClose={closeFound}
      >
        <div className="flex items-center justify-center min-h-full">
          <TransitionChild
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <DialogPanel className="absolute bg-black bg-opacity-40 inset-0 flex items-center justify-center">
              <div className="w-full max-w-md rounded-xl bg-white/5 p-6 backdrop-blur-2xl">
                <DialogTitle
                  as="h3"
                  className="text-base/7 font-medium text-white"
                >
                  Akun ditemukan
                </DialogTitle>
                <div className="flex flex-col items-center">
                  <div className="bg-gradient-to-t from-blue-400 via-blue-500 to-blue-500 font-mono my-5 w-full h-[50%] max-w-xs sm:max-w-sm md:max-w-md flex flex-col justify-between p-4 rounded-lg shadow-xl">
                    <div className="flex justify-between items-start">
                      {/* <div className="mb-2">
                        <img
                          className="rounded-full"
                          src={item.img}
                          alt="photo"
                        />
                      </div> */}
                      <div className="text-white font-semibold text-lg w-full ps-4">
                        <div>{item.displayName}</div>
                        <div>{item.nisn}</div>
                      </div>
                      <div className="backdrop-blur-sm bg-white/30 rounded-full w-auto px-3 py-1 text-white font-light text-sm">
                        YYT
                      </div>
                    </div>
                    <div className="flex gap-3 items-center justify-center text-white text-opacity-50 py-5">
                      <div className="p-1">Dispen: {dispenCount}</div>
                      <div className="p-1">Izin: {izinCount}</div>
                      <div className="p-1">Izin Pulang: {pulangCount}</div>
                      <div className="p-1">Tidak Diketahui: {nullCount}</div>
                    </div>
                    <div className="flex justify-between items-center text-white">
                      <div>
                        <div className="text-gray-600 text-xs">Id pengguna</div>
                        <div>{item.id}</div>
                      </div>
                      <div>
                        <div className="text-gray-600 text-xs">Kelas</div>
                        <div>{item.classGrade}</div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mt-4 flex gap-3">
                  <Link
                    to={`/create-ticket/${item.id}`}
                    className="inline-flex items-center gap-2 rounded-md bg-green-700 py-1.5 px-3 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:outline-none"
                    onClick={closeFound}
                  >
                    Ya, Buat tiket
                  </Link>
                  <Button
                    className="inline-flex items-center gap-2 rounded-md bg-red-700 py-1.5 px-3 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:outline-none"
                    onClick={closeFound}
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </Dialog>
    </Transition>
  );

  const AlertNotFound = () => (
    <Transition appear show={isOpenNotFound}>
      <Dialog
        as="div"
        className="fixed inset-0 z-10 overflow-y-auto"
        onClose={closeNotFound}
      >
        <div className="flex items-center justify-center min-h-full">
          <TransitionChild
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <DialogPanel className="absolute bg-black bg-opacity-40 inset-0 flex items-center justify-center">
              <div className="w-full max-w-md rounded-xl bg-white/5 p-6 backdrop-blur-2xl">
                <DialogTitle
                  as="h3"
                  className="text-base/7 font-medium text-white"
                >
                  Akun tidak ditemukan
                </DialogTitle>
                <p className="mt-2 text-sm/6 text-white/50">
                  Carilah dengan benar dan masukan ulang
                </p>
                <div className="mt-4 flex gap-3">
                  <Button
                    className="inline-flex items-center gap-2 rounded-md bg-red-700 py-1.5 px-3 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:outline-none"
                    onClick={closeNotFound}
                  >
                    Kembali
                  </Button>
                </div>
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </Dialog>
    </Transition>
  );

  const AlertRequired = () => (
    <Transition appear show={isOpenRequired}>
      <Dialog
        as="div"
        className="fixed inset-0 z-10 overflow-y-auto"
        onClose={closeRequired}
      >
        <div className="flex items-center justify-center min-h-full">
          <TransitionChild
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <DialogPanel className="absolute bg-black bg-opacity-40 inset-0 flex items-center justify-center">
              <div className="w-full max-w-md rounded-xl bg-white/5 p-6 backdrop-blur-2xl">
                <DialogTitle
                  as="h3"
                  className="text-base/7 font-medium text-white"
                >
                  NISN belum diinput
                </DialogTitle>
                <p className="mt-2 text-sm/6 text-white/50">
                  Silahkan masukan NISN terlebih dahulu
                </p>
                <div className="mt-4 flex gap-3">
                  <Button
                    className="inline-flex items-center gap-2 rounded-md bg-red-700 py-1.5 px-3 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:outline-none"
                    onClick={closeRequired}
                  >
                    Kembali
                  </Button>
                </div>
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </Dialog>
    </Transition>
  );

  return (
    <>
      <div className="p-4 flex flex-col justify-center items-center">
        <div className="text-center text-white  mb-8">
          <h1 className="text-4xl font-bold">SI MIKA</h1>
          <h1 className="text-2xl font-semibold">
            SISTEM MANAJEMEN IZIN KELUAR SISWA
          </h1>
        </div>

        <div className="w-full max-w-md">
          <input
            type="text"
            value={searchTerm}
            onChange={handleChange}
            placeholder="Masukkan NISN"
            className="w-full rounded-md border border-gray-300 p-2 mb-2"
          />
          <button
            onClick={handleSearch}
            className="mt-2 w-full rounded-md bg-blue-500 py-2 px-4 text-white font-semibold"
          >
            Cari
          </button>
        </div>
      </div>
      <AlertFound />
      <AlertNotFound />
      <AlertRequired />
    </>
  );
};

export default TicketPage;
