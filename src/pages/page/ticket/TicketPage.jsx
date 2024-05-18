import {
  Button,
  Description,
  Field,
  Input,
  Label,
  Dialog,
  DialogPanel,
  DialogTitle,
  Transition,
  TransitionChild,
} from "@headlessui/react";
import clsx from "clsx";
import { useState } from "react";
import { Link } from "react-router-dom";

const TicketPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [item, setItem] = useState({});
  let [isOpenFound, setIsOpenFound] = useState(false);
  let [isOpenNotFound, setIsOpenNotFound] = useState(false);
  let [isOpenRequired, setIsOpenRequired] = useState(false);

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const data = [
    {
      id: "B3oFcYdRqVql78IX2RGU",
      nisn: "1234567899",
      username: "Fasha",
      kelas: "X1",
      walikelas: "Yayat Hidayat, S.Kom",
      img: "https://img.freepik.com/free-psd/3d-illustration-person-with-sunglasses_23-2149436188.jpg?size=626&ext=jpg&ga=GA1.1.545745486.1710488592&semt=ais",
    },
    {
      id: "Z6XRzXS8jj8vQctRwiwT",
      nisn: "1234567892",
      username: "John Doe",
      kelas: "X1",
      walikelas: "Yayat Hidayat, S.Kom",
      img: "https://img.freepik.com/free-psd/3d-illustration-person-with-sunglasses_23-2149436188.jpg?size=626&ext=jpg&ga=GA1.1.545745486.1710488592&semt=ais",
    },
    {
      id: "ZvQ0oNbKkpKWJpziXwR9",
      nisn: "1122334455",
      username: "John Doe",
      kelas: "X1",
      walikelas: "Yayat Hidayat, S.Kom",
      img: "https://img.freepik.com/free-psd/3d-illustration-person-with-sunglasses_23-2149436188.jpg?size=626&ext=jpg&ga=GA1.1.545745486.1710488592&semt=ais",
    },
  ];

  function checkNISN(nisn) {
    if (nisn.length === 10) {
      const foundItem = data.filter((item) => item.nisn === nisn);
      if (foundItem.length > 0) {
        setItem(foundItem[0]);
        openFound();
      } else {
        openNotFound();
      }
    } else {
      openRequired();
    }
  }

  const handleSearch = () => {
    checkNISN(searchTerm);
  };

  function openFound() {
    setIsOpenFound(true);
  }

  function closeFound() {
    setIsOpenFound(false);
  }
  function openNotFound() {
    setIsOpenNotFound(true);
  }

  function closeNotFound() {
    setIsOpenNotFound(false);
  }
  function openRequired() {
    setIsOpenRequired(true);
  }

  function closeRequired() {
    setIsOpenRequired(false);
  }

  const AlertFound = () => {
    return (
      <Transition appear show={isOpenFound}>
        <Dialog
          as="div"
          className="fixed inset-0 z-10 overflow-y-auto"
          onClose={close}
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
                <DialogPanel className="w-full max-w-md rounded-xl bg-white/5 p-6 backdrop-blur-2xl">
                  <DialogTitle
                    as="h3"
                    className="text-base/7 font-medium text-white"
                  >
                    Akun ditemukan
                  </DialogTitle>
                  {/* <p className="mt-2 text-sm/6 text-white/50">
                    nama: {item.name}
                  </p> */}

                  <div className=" flex flex-col items-center">
                    <div className="bg-gradient-to-t from-blue-400 via-blue-500 to-blue-500 font-mono my-5 w-full h-[50%] max-w-xs sm:max-w-sm md:max-w-md flex flex-col justify-between p-4 rounded-lg shadow-xl">
                      <div className="flex justify-between items-start">
                        <div className="mb-2">
                          <div className="">
                            <div className="bg-neutral text-neutral-content w-12">
                              <img
                                className="rounded-full"
                                src={item.img}
                                alt={item.username}
                              />
                            </div>
                          </div>
                        </div>
                        <div className="text-white font-semibold text-lg w-full ps-4">
                          <div>{item.username}</div>
                          <div>{item.nisn}</div>
                        </div>

                        <div className="backdrop-blur-sm bg-white/30   rounded-full w-auto px-3 py-1 text-white font-light text-sm">
                          YYT
                        </div>
                      </div>
                      <div className="flex gap-3 items-center justify-center text-white text-opacity-50 py-5">
                        <div className=" p-1">Dispen: 12</div>
                        <div className=" p-1">Izin: 12</div>
                        <div className=" p-1">Bolos: 12</div>
                        <div className=" p-1">Pulang: 12</div>
                      </div>

                      <div className="flex justify-between items-center text-white">
                        <div>
                          <div className="text-gray-600 text-xs">
                            Id pengguna
                          </div>
                          <div className="">{item.id}</div>
                        </div>
                        <div>
                          <div className="text-gray-600 text-xs">Kelas</div>
                          <div className="">{item.kelas}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="mt-4 flex gap-3">
                    <Link
                      to={`/create-ticket/${item.id}`}
                      className="inline-flex items-center gap-2 rounded-md bg-green-700 py-1.5 px-3 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-gray-600 data-[open]:bg-gray-700 data-[focus]:outline-1 data-[focus]:outline-white"
                      onClick={closeFound}
                    >
                      Ya, Buat tiket
                    </Link>
                    <Button
                      className="inline-flex items-center gap-2 rounded-md bg-red-700 py-1.5 px-3 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-gray-600 data-[open]:bg-gray-700 data-[focus]:outline-1 data-[focus]:outline-white"
                      onClick={closeFound}
                    >
                      Cancel
                    </Button>
                  </div>
                </DialogPanel>
              </DialogPanel>
            </TransitionChild>
          </div>
        </Dialog>
      </Transition>
    );
  };

  const AlertNotFound = () => {
    return (
      <Transition appear show={isOpenNotFound}>
        <Dialog
          as="div"
          className="fixed inset-0 z-10 overflow-y-auto"
          onClose={close}
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
                <DialogPanel className="w-full max-w-md rounded-xl bg-white/5 p-6 backdrop-blur-2xl">
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
                      className="inline-flex items-center gap-2 rounded-md bg-red-700 py-1.5 px-3 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-gray-600 data-[open]:bg-gray-700 data-[focus]:outline-1 data-[focus]:outline-white"
                      onClick={closeNotFound}
                    >
                      Kembali
                    </Button>
                  </div>
                </DialogPanel>
              </DialogPanel>
            </TransitionChild>
          </div>
        </Dialog>
      </Transition>
    );
  };

  const AlertRequired = () => {
    return (
      <Transition appear show={isOpenRequired}>
        <Dialog
          as="div"
          className="fixed inset-0 z-10 overflow-y-auto"
          onClose={close}
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
                <DialogPanel className="w-full max-w-md rounded-xl bg-white/5 p-6 backdrop-blur-2xl">
                  <DialogTitle
                    as="h3"
                    className="text-base/7 font-medium text-white"
                  >
                    Akun tidak ditemukan
                  </DialogTitle>
                  <p className="mt-2 text-sm/6 text-white/50">
                    Masukan NISN 10 DIGIT
                  </p>

                  <div className="mt-4 flex gap-3">
                    <Button
                      className="inline-flex items-center gap-2 rounded-md bg-orange-700 py-1.5 px-3 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-gray-600 data-[open]:bg-gray-700 data-[focus]:outline-1 data-[focus]:outline-white"
                      onClick={closeRequired}
                    >
                      Kembali
                    </Button>
                  </div>
                </DialogPanel>
              </DialogPanel>
            </TransitionChild>
          </div>
        </Dialog>
      </Transition>
    );
  };

  return (
    <div className="mb-[22vh]">
      <div className="text-center text-white mb-20">
        <h1 className="text-4xl font-bold">SI MIKA</h1>
        <h1 className="text-2xl font-semibold">
          SISTEM MANAJEMEN IZIN KELUAR SISWA
        </h1>
      </div>
      <div className="w-full max-w-xl px-4">
        <Field>
          <Label className="text-xl font-medium text-white">Nisn</Label>
          <Description className="text-lg text-white/70">
            Cari akun berdasarkan NISN terlebih dahulu
          </Description>
          <Input
            placeholder="Ketik nisn kamu disini..."
            className={clsx(
              "mt-3 block w-full rounded-lg border-none bg-white/5 py-3 px-3 text-sm/6 text-white",
              "focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25"
            )}
            id="nisn"
            name="nisn"
            value={searchTerm}
            onChange={handleChange}
          />
          <Button
            onClick={handleSearch}
            className="mt-4 inline-flex items-center gap-2 rounded-md bg-blue-700 py-2 px-4 text-md font-semibold text-white shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-blue-600 data-[open]:bg-blue-700 data-[focus]:outline-1 data-[focus]:outline-white"
          >
            Cari akun
          </Button>
        </Field>

        <AlertFound />
        <AlertNotFound />
        <AlertRequired />
      </div>
    </div>
  );
};

export default TicketPage;
