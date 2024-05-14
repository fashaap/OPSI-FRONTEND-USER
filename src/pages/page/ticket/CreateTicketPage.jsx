import {
  Button,
  Checkbox,
  Description,
  Field,
  Input,
  Label,
  Textarea,
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
  Transition,
} from "@headlessui/react";
import { CheckIcon, ChevronDownIcon } from "@heroicons/react/20/solid";
import { useState } from "react";
import clsx from "clsx";

const CreateTicketPage = () => {
  const [selectedOption, setSelectedOption] = useState("");
  const [enabledVerif, setEnabledVerif] = useState(false);

  const people = [
    { id: 1, name: "Tom Cook" },
    { id: 2, name: "Wade Cooper" },
    { id: 3, name: "Tanya Fox" },
    { id: 4, name: "Arlene Mccoy" },
    { id: 5, name: "Devon Webb" },
  ];

  const [selected, setSelected] = useState(people[1]);

  const data = [
    {
      id: 1,
      jenis: "Dispen",
      onchange: () => {
        setSelectedOption("Dispen");
      },
      checked: selectedOption === "Dispen",
    },
    {
      id: 2,
      jenis: "Izin",
      onchange: () => {
        setSelectedOption("Izin");
      },
      checked: selectedOption === "Izin",
    },
    {
      id: 3,
      jenis: "Pulang",
      onchange: () => {
        setSelectedOption("Pulang");
      },
      checked: selectedOption === "Pulang",
    },
  ];

  const mapel = [
    {
      id: 1,
      name: "yayat hidayat, S.Kom",
      mapel: "informatika",
      color: "bg-blue-500",
    },
    {
      id: 2,
      name: "Kiki Ginayat, S.Kom",
      mapel: "matematika",
      color: "bg-red-500",
    },
    {
      id: 3,
      name: "Wawan Suparman, S.Ti",
      mapel: "biologi",
      color: "bg-green-500",
    },
    {
      id: 4,
      name: "yayat hidayat, S.Kom",
      mapel: "fisika",
      color: "bg-yellow-500",
    },
    {
      id: 5,
      name: "yayat hidayat, S.Kom",
      mapel: "geografi",
      color: "bg-purple-500",
    },
    {
      id: 6,
      name: "yayat hidayat, S.Kom",
      mapel: "sejarah",
      color: "bg-pink-500",
    },
    {
      id: 7,
      name: "yayat hidayat, S.Kom",
      mapel: "bahasa inggris",
      color: "bg-indigo-500",
    },
  ];

  return (
    <div className="container mx-auto">
      <div className="mt-10 mb-5 flex flex-col md:flex-row ">
        <div className="w-full md:w-1/2 mx-auto flex flex-col md:pr-6">
          <div>
            <Field className="mb-5">
              <Label className="text-lg font-medium text-white">Jenis</Label>
              <Description className="text-md text-white/50">
                Pilih jenis izin anda dengan jujur!
              </Description>
              <div className="grid grid-cols-2 md:grid-cols-3 mt-5">
                {data.map((item, idx) => (
                  <div
                    key={idx}
                    className="flex justify-center items-center gap-3"
                  >
                    <h1 className="text-xl font-semibold text-white/70">
                      {item.jenis}
                    </h1>
                    <Checkbox
                      checked={item.checked}
                      onChange={item.onchange}
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

            <Field className="mb-10">
              <Label className="text-lg font-medium text-white">Waktu</Label>
              <Description className="text-md text-white/50">
                Berapa lama anda akan izin?
              </Description>
              <Input
                type="time"
                className={clsx(
                  "mt-3 block w-full rounded-lg border-none bg-white/5 py-1.5 px-3 text-sm/6 text-white",
                  "focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25"
                )}
              />
            </Field>

            <Field>
              <Label className="text-xl font-medium text-white">
                Description
              </Label>
              <Description className="text-sm/6 text-white/50">
                Berikan keterangan mengapa anda izin!
              </Description>
              <Textarea
                className={clsx(
                  "mt-3 block w-full resize-none rounded-lg border-none bg-white/5 py-1.5 px-3 text-sm/6 text-white",
                  "focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25"
                )}
                rows={3}
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
            {mapel.length !== 0 ? (
              <div className="mt-3 w-full rounded-lg bg-white/5 py-4 pr-8 pl-3 text-left text-sm/6 text-white ">
                <div className="grid grid-flow-row-dense gap-3">
                  <div className="flex flex-wrap items-center gap-3">
                    {mapel.map((item, idx) => {
                      return (
                        <h1
                          key={idx}
                          className={`badge ${
                            (mapel.length > 0 &&
                              mapel.filter(
                                (data) => data.mapel === item.mapel
                              )[0]?.color) ||
                            "bg-blue-500"
                          } text-white px-3 py-1 rounded-2xl font-semibold max-w-full`}
                        >
                          {item.name} - {item.mapel}
                        </h1>
                      );
                    })}
                  </div>
                </div>
              </div>
            ) : null}
            <Listbox value={selected} onChange={setSelected}>
              <ListboxButton
                className={clsx(
                  "mt-3 relative block w-full rounded-lg bg-white/5 py-1.5 pr-8 pl-3 text-left text-sm/6 text-white",
                  "focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25"
                )}
              >
                {selected.name}
                <ChevronDownIcon
                  className="group pointer-events-none absolute top-2.5 right-2.5 size-4 fill-white/60"
                  aria-hidden="true"
                />
              </ListboxButton>
              <Transition
                leave="transition ease-in duration-100"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <ListboxOptions
                  anchor="bottom-right"
                  style={{ right: 0 }}
                  className={`mt-3 w-[var(--button-width)] rounded-xl border border-white/5 bg-white/5 p-1 [--anchor-gap:var(--spacing-1)] focus:outline-none max-h-72 overflow-y-auto ${
                    mapel.length > 0 && mapel.length * 38 > 400
                      ? "overflow-auto"
                      : ""
                  }`}
                >
                  {mapel.map((person, idx) => (
                    <ListboxOption
                      key={idx}
                      value={person}
                      className="group flex cursor-default items-center gap-2 rounded-lg py-1.5 px-3 select-none data-[focus]:bg-white/10"
                    >
                      <CheckIcon className="invisible size-4 fill-white group-data-[selected]:visible" />
                      <div className="text-sm/6 text-white">{person.name}</div>
                    </ListboxOption>
                  ))}
                </ListboxOptions>
              </Transition>
            </Listbox>
          </Field>
        </div>
      </div>
      <div className="flex items-center gap-3 ">
        <Checkbox
          checked={enabledVerif}
          onChange={setEnabledVerif}
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
        <h1 className="text-md font-semibold text-white/70">
          Saya mengisi form dengan jujur
        </h1>
      </div>
      <div>
        <Button className="mt-5 inline-flex items-center gap-2 rounded-md bg-gray-700 py-1.5 px-3 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-gray-600 data-[open]:bg-gray-700 data-[focus]:outline-1 data-[focus]:outline-white">
          CETAK TIKET IZIN
        </Button>
      </div>
    </div>
  );
};

export default CreateTicketPage;
