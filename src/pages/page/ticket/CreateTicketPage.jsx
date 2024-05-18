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
import { useState } from "react";
import clsx from "clsx";

const CreateTicketPage = () => {
  const codeJenis = {
    dispen: 505,
    izin: 405,
    pulang: 305,
  };

  const options = [
    {
      id: 1,
      value: "yayat hidayat, S.Kom",
      mapel: "informatika",
      label: "yayat hidayat, S.Kom - informatika",
      color: "bg-blue-500",
    },
    {
      id: 2,
      value: "ahejik, S.Kom",
      mapel: "informatika",
      label: "ahejik, S.Kom - informatika",
      color: "bg-blue-500",
    },
    {
      id: 3,
      value: "Kiki Ginayat, S.Kom",
      mapel: "matematika",
      label: "Kiki Ginayat, S.Kom - matematika",
      color: "bg-red-500",
    },
    {
      id: 4,
      value: "Wawan Suparman, S.Ti",
      mapel: "biologi",
      label: "Wawan Suparman, S.Ti - biologi",
      color: "bg-green-500",
    },
    {
      id: 5,
      value: "abcde, S.Kom",
      mapel: "fisika",
      label: "abcde, S.Kom - fisika",
      color: "bg-yellow-500",
    },
    {
      id: 6,
      value: "afgdh, S.Kom",
      mapel: "geografi",
      label: "afgdh, S.Kom - geografi",
      color: "bg-purple-500",
    },
    {
      id: 7,
      value: "kkwo2, S.Kom",
      mapel: "sejarah",
      label: "kkwo2, S.Kom - sejarah",
      color: "bg-pink-500",
    },
    {
      id: 8,
      value: "pp2id, S.Kom",
      mapel: "bahasa inggris",
      label: "pp2id, S.Kom - bahasa inggris",
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

  const [selectedJenis, setSelectedJenis] = useState(null);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [timePicked, setTimePicked] = useState("");
  const [description, setDescription] = useState("");

  const cetak = () => {
    console.log("Jenis Izin:", selectedJenis);
    if (selectedJenis === codeJenis.pulang) {
      console.log("Waktu:", null);
    } else {
      console.log("Waktu:", timePicked);
    }
    console.log("Description:", description);
    console.log("Mata Pelajaran:", selectedOptions);
  };

  const JenisIzin = () => {
    return (
      <Field className="mb-5">
        <Label className="text-lg font-medium text-white">Jenis</Label>
        <Description className="text-md text-white/50">
          Pilih jenis izin anda dengan jujur!
        </Description>
        <div className="grid grid-cols-2 md:grid-cols-3 mt-5">
          {data.map((item) => (
            <div
              key={item.id}
              className="flex justify-center items-center gap-3"
            >
              <h1 className="text-xl font-semibold text-white/70">
                {item.jenis}
              </h1>
              <Checkbox
                checked={selectedJenis === item.code}
                onChange={() => setSelectedJenis(item.code)}
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
          ))}
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
          onChange={(e) => setTimePicked(e.target.value)}
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
            {selectedJenis !== codeJenis.pulang && <Waktu />}

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
          onClick={cetak}
          className="mt-5 inline-flex items-center gap-2 rounded-md bg-gray-700 py-1.5 px-3 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-gray-600 data-[open]:bg-gray-700 data-[focus]:outline-1 data-[focus]:outline-white"
        >
          CETAK TIKET IZIN
        </Button>
        <Button className="mt-5 inline-flex items-center gap-2 rounded-md bg-red-700 py-1.5 px-3 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-red-600 data-[open]:bg-red-700 data-[focus]:outline-1 data-[focus]:outline-white">
          BATALKAN
        </Button>
      </div>
    </div>
  );
};

export default CreateTicketPage;
