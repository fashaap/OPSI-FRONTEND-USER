import {
  Button,
  Checkbox,
  Description,
  Field,
  Input,
  Label,
  Textarea,
} from "@headlessui/react";
import Select from "react-select";
import { useEffect, useState } from "react";
import clsx from "clsx";
import { useNavigate, useParams } from "react-router-dom";
import AxiosInstance from "../../auth/AxiosInstance";

const CreateTicketPage = () => {
  const { id } = useParams();
  const token = localStorage.getItem("userToken");
  // console.log("id:", id);

  const [selectedJenis, setSelectedJenis] = useState(null);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [timePicked, setTimePicked] = useState("");
  const [description, setDescription] = useState("");
  const [selectedHour, setSelectedHour] = useState(null);
  const [selectedMinute, setSelectedMinute] = useState(null);
  const [userData, setUserData] = useState({});
  const [checked1, setChecked1] = useState(false);
  const [checked2, setChecked2] = useState(false);
  const [checked3, setChecked3] = useState(false);

  const navigate = useNavigate();
  const codeJenis = {
    dispen: 7010,
    izin: 7020,
    pulang: 7020,
  };

  const options = [
    {
      id: 1,
      value: "informatika",
      mapel: "informatika",
      label: "informatika",
      color: "bg-blue-500",
    },

    {
      id: 2,
      value: "matematika",
      mapel: "matematika",
      label: "matematika",
      color: "bg-red-500",
    },
    {
      id: 3,
      value: "biologi",
      mapel: "biologi",
      label: "biologi",
      color: "bg-green-500",
    },
    {
      id: 4,
      value: "fisika",
      mapel: "fisika",
      label: "fisika",
      color: "bg-yellow-500",
    },
    {
      id: 5,
      value: "geografi",
      mapel: "geografi",
      label: "geografi",
      color: "bg-purple-500",
    },
    {
      id: 6,
      value: "sejarah",
      mapel: "sejarah",
      label: "sejarah",
      color: "bg-pink-500",
    },
    {
      id: 7,
      value: "bahasa inggris",
      mapel: "bahasa inggris",
      label: "bahasa inggris",
      color: "bg-indigo-500",
    },
  ];

  const data = [
    {
      id: 1,
      jenis: "Dispen",
      code: codeJenis.dispen,
    },
    {
      id: 2,
      jenis: "Izin",
      code: codeJenis.izin,
    },
    {
      id: 3,
      jenis: "Pulang",
      code: codeJenis.pulang,
    },
  ];

  const now = new Date();
  // console.log("Current Date:", now.toUTCString());

  // Extract year, month, and day from the current date
  const year = now.getUTCFullYear();
  const month = now.getUTCMonth() + 1; // getUTCMonth() returns 0-based index, so add 1
  const day = now.getUTCDate();

  // Extract current hour and minute in UTC
  let hour = now.getUTCHours(); // get current hour in UTC
  let minute = now.getUTCMinutes(); // get current minute in UTC

  // Custom addition to hour and minute
  let hourCustom = hour + parseInt(selectedHour); // add 6 hours to current time
  let minuteCustom = minute + parseInt(selectedMinute); // keep minutes as is

  // Handle minute overflow
  if (minuteCustom >= 60) {
    hourCustom += Math.floor(minuteCustom / 60); // Add extra hour(s) if minutes exceed 60
    minuteCustom = minuteCustom % 60; // Get remaining minutes
  }

  // Handle hour overflow (rolling over midnight)
  if (hourCustom >= 24) {
    hourCustom = hourCustom % 24; // Keep the hour within 0-23 range
  }

  const second = 0; // Set seconds to 0 or as desired

  let formatTime = `${year}-${String(month).padStart(2, "0")}-${String(
    day
  ).padStart(2, "0")}T${String(hourCustom).padStart(2, "0")}:${String(
    minuteCustom
  ).padStart(2, "0")}:${String(second).padStart(2, "0")}Z`;

  // console.log("Formatted Time:", formatTime);

  const fetchUserInformation = async () => {
    const response = await AxiosInstance.get(`/api/v1/auth/users/${id}`, {
      headers: { token: token },
    });

    // console.log(response);
    setUserData(response.data.data);
  };

  useEffect(() => {
    fetchUserInformation().then(() => {
      // console.log("User Data:", userData);
    });
  }, []);

  const handleCreateTiket = async () => {
    const subjectsArray = selectedOptions.map((option) => option.label);

    const category = checked1 ? 7010 : checked2 ? 7020 : checked3 ? 7030 : null;

    const formData = {
      idUser: id,
      username: userData.username,
      nisn: userData.nisn,
      classGrade: userData.classGrade,
      email: userData.email,
      TimeCountdown: selectedJenis === codeJenis.pulang ? null : formatTime,
      startTime: "00:00:00",
      endTime: "00:00:00",
      codeStatus: 4444,
      category,
      subjects: subjectsArray,
      description: description,
      date: new Date().toLocaleDateString("id-ID", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      }),
      offline: true,
    };

    // console.log("Form Data:", formData);

    try {
      const response = await AxiosInstance.post(
        "/api/v1/tickets/create",
        formData,
        {
          headers: { token: token },
        }
      );
      // console.log("Data:", response.data.data._id);

      if (response.data.status === 200) {
        // alert(response.data.message);
        navigate(`/ticket/print/${response.data.data._id}`);
      }
    } catch (error) {
      console.error("Error creating ticket:", error);
    }
  };

  const handleTimeChange = (e) => {
    const timeValue = e.target.value;
    setTimePicked(timeValue);

    const [hour, minute] = timeValue.split(":");
    setSelectedHour(hour);
    setSelectedMinute(minute);

    if (parseInt(hour, 10) > 10) {
      alert("The selected hour is greater than 10.");
      window.location.reload();
    }
  };

  const handleCancel = () => {
    navigate("/");
  };

  const JenisIzin = () => {
    const toggleCheckBox1 = () => {
      setChecked1(true), setChecked2(false), setChecked3(false);
    };

    const toggleCheckBox2 = () => {
      setChecked1(false), setChecked2(true), setChecked3(false);
    };

    const toggleCheckBox3 = () => {
      setChecked1(false), setChecked2(false), setChecked3(true);
    };

    return (
      <Field className="mb-5">
        <Label className="text-lg font-medium text-white">Jenis</Label>
        <Description className="text-md text-white/50">
          Pilih jenis izin anda dengan jujur!
        </Description>
        <div className="grid grid-cols-2 md:grid-cols-3 mt-5">
          <div className="flex justify-center items-center gap-3">
            <h1 className="text-xl font-semibold text-white/70">Dispen</h1>
            <Checkbox
              checked={checked1}
              onChange={toggleCheckBox1}
              className="group block size-4 rounded border bg-white/70 data-[checked]:bg-gray-700"
            >
              <svg
                className="stroke-white opacity-0 group-data-[checked]:opacity-100"
                viewBox="0 0 14 14"
                fill="none"
              >
                <path
                  d="M3 8L6 11L11 3.5"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </Checkbox>
          </div>
          <div className="flex justify-center items-center gap-3">
            <h1 className="text-xl font-semibold text-white/70">Izin</h1>
            <Checkbox
              checked={checked2}
              onChange={toggleCheckBox2}
              className="group block size-4 rounded border bg-white/70 data-[checked]:bg-gray-700"
            >
              <svg
                className="stroke-white opacity-0 group-data-[checked]:opacity-100"
                viewBox="0 0 14 14"
                fill="none"
              >
                <path
                  d="M3 8L6 11L11 3.5"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </Checkbox>
          </div>
          <div className="flex justify-center items-center gap-3">
            <h1 className="text-xl font-semibold text-white/70">Pulang</h1>
            <Checkbox
              checked={checked3}
              onChange={toggleCheckBox3}
              className="group block size-4 rounded border bg-white/70 data-[checked]:bg-gray-700"
            >
              <svg
                className="stroke-white opacity-0 group-data-[checked]:opacity-100"
                viewBox="0 0 14 14"
                fill="none"
              >
                <path
                  d="M3 8L6 11L11 3.5"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </Checkbox>
          </div>
        </div>
      </Field>
    );
  };

  const Waktu = () => {
    return (
      <Field className="mb-10">
        <Label className="text-lg font-medium text-white">Waktu</Label>
        <Description className="text-md text-white/50">
          Berapa lama anda akan izin?
        </Description>
        <Input
          type="time"
          value={timePicked}
          onChange={handleTimeChange}
          max="10:00"
          className={clsx(
            "mt-3 block rounded-lg border-none bg-white/5 py-1.5 px-3 text-sm/6 text-white",
            "focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25"
          )}
        />
      </Field>
    );
  };

  return (
    <div className="container mx-auto">
      <div className="mt-10 mb-5 flex flex-col md:flex-row">
        <div className="w-full md:w-1/2 mx-auto flex flex-col md:pr-6">
          <div>
            <JenisIzin />
            {!checked3 ? <Waktu /> : null}

            <Field>
              <Label className="text-xl font-medium text-white">
                Description
              </Label>
              <Description className="text-sm/6 text-white/50">
                Berikan keterangan mengapa anda izin!
              </Description>
              <Textarea
                name="description"
                placeholder="Isi disini..."
                maxLength={25}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className={clsx(
                  "mt-3 block w-full resize-none rounded-lg border-none bg-white/5 py-1.5 px-3 text-sm/6 text-white",
                  "focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25"
                )}
                rows={5}
              />
            </Field>
          </div>
        </div>
        <div className="w-full md:w-1/2 mx-auto flex flex-col md:pl-6 mt-10 xl:mt-0">
          <Field>
            <Label className="text-xl font-medium text-white">
              Jam Pelajaran
            </Label>
            <Description className="text-sm/6 text-white/50">
              Jam pelajaran apa saja yang izin?
            </Description>

            <Select
              isMulti
              unstyled
              closeMenuOnSelect={false}
              options={options}
              placeholder="Pilih mata pelajaran"
              onChange={setSelectedOptions}
              classNames={{
                multiValueRemove: () =>
                  "inline-flex items-center justify-center w-6 h-6 ml-2 rounded-xl text-white",
                multiValue: ({ data }) =>
                  ` ${
                    options.find((option) => option.value === data.value)
                      ?.color || ""
                  } font-semibold text-white m-1 ps-2 py-1 rounded-md`,
                input: () => "[&_input:focus]:ring-0",
                control: () =>
                  clsx(
                    "mt-3 block w-full resize-none rounded-lg border-none bg-white/5 py-1.5 px-3 text-sm/6 text-white",
                    "focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25"
                  ),
                menu: () =>
                  clsx(
                    "mt-3 block w-full resize-none rounded-lg border-none bg-white/5 py-1.5 px-3 text-sm/6 text-white",
                    "focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25"
                  ),
                option: ({ isFocused, isSelected }) =>
                  clsx(
                    "py-2 px-3 rounded my-1",
                    isFocused && "hover:cursor-pointer hover:bg-gray-700",
                    isSelected && "bg-slate-300"
                  ),
                scrollIndicator: () => "bg-gray-500 rounded-full p-1",
              }}
              classNamePrefix="select"
            />
          </Field>
        </div>
      </div>
      <div className="flex gap-5">
        <Button
          onClick={handleCreateTiket}
          className="mt-5 inline-flex items-center gap-2 rounded-md bg-gray-700 py-1.5 px-3 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-gray-600 data-[open]:bg-gray-700 data-[focus]:outline-1 data-[focus]:outline-white"
        >
          BUAT TIKET
        </Button>
        <Button
          onClick={handleCancel}
          className="mt-5 inline-flex items-center gap-2 rounded-md bg-red-700 py-1.5 px-3 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-red-600 data-[open]:bg-red-700 data-[focus]:outline-1 data-[focus]:outline-white"
        >
          BATALKAN
        </Button>
      </div>
    </div>
  );
};

export default CreateTicketPage;
