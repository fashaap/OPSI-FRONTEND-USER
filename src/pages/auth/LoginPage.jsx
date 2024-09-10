import {
  Button,
  Description,
  Field,
  Input,
  Label,
  Dialog,
  DialogPanel,
  Transition,
} from "@headlessui/react";
import clsx from "clsx";
import { useState, Fragment } from "react";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from "yup";
import AxiosInstance from "./AxiosInstance";

const LoginPage = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  const closeAlert = () => setIsOpen(false);

  const login = async (email, password) => {
    try {
      const response = await AxiosInstance.post("/api/v1/auth/admin/signin", {
        email,
        password,
      });
      if (response.data) {
        setIsLoading(false);

        // Store user information and token in localStorage
        localStorage.setItem("userInfo", JSON.stringify(response.data));
        localStorage.setItem("userToken", response.data.token.refreshToken);

        navigate("/");
      } else {
        // Display error alert
        setAlertMessage(response.data?.error || "An unexpected error occurred");
        setIsOpen(true);
      }
    } catch (error) {
      // Display error alert
      setAlertMessage(
        error.response?.data?.error || "An unexpected error occurred"
      );
      setIsOpen(true);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLoginSubmit = async (values) => {
    setIsLoading(true);
    await login(values.email, values.password);
  };

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: handleLoginSubmit,
    validationSchema: yup.object().shape({
      email: yup
        .string()
        .required("Email is required")
        .email("Invalid email address"),
      password: yup.string().required("Password is required"),
    }),
  });

  return (
    <div className="mb-[10vh]">
      <div className="text-center text-white mb-20">
        <h1 className="text-4xl font-bold">SI MIKA</h1>
        <h1 className="text-2xl font-semibold">
          SISTEM MANAJEMEN IZIN KELUAR SISWA
        </h1>
      </div>
      <div className="w-full max-w-xl px-4">
        <form onSubmit={formik.handleSubmit}>
          <Field>
            <Label className="text-sm/6 font-medium text-white">Email</Label>
            <Description className="text-sm/6 text-white/50">
              Masukan email dengan akun yang terdaftar (hanya untuk admin)
            </Description>
            <Input
              type="email"
              name="email"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
              className={clsx(
                "mt-2 block w-full rounded-lg border-none bg-white/5 py-1.5 px-3 text-sm/6 text-white h-10",
                "focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25"
              )}
            />
            {formik.touched.email && formik.errors.email ? (
              <div className="text-red-500 text-xs mt-1">
                {formik.errors.email}
              </div>
            ) : null}
          </Field>
          <Field className="mt-2">
            <Label className="text-sm/6 font-medium text-white">Password</Label>
            <Description className="text-sm/6 text-white/50">
              Masukan password dengan benar
            </Description>
            <Input
              type="password"
              name="password"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.password}
              className={clsx(
                "block w-full rounded-lg border-none bg-white/5 py-1.5 px-3 text-sm/6 text-white h-10 mt-2",
                "focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25"
              )}
            />
            {formik.touched.password && formik.errors.password ? (
              <div className="text-red-500 text-xs mt-1">
                {formik.errors.password}
              </div>
            ) : null}
          </Field>

          <div className="mt-3 flex justify-end">
            <Button
              type="submit"
              disabled={isLoading}
              className={clsx(
                "inline-flex items-center gap-2 rounded-md bg-green-700 py-1.5 px-3 text-sm/6 font-semibold text-white shadow-inner shadow-white/10",
                "focus:outline-none data-[hover]:bg-green-600 data-[open]:bg-green-700 data-[focus]:outline-1 data-[focus]:outline-white"
              )}
            >
              {isLoading ? "Loading..." : "Login"}
            </Button>
          </div>
        </form>
      </div>

      <Transition show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-10 overflow-y-auto"
          onClose={closeAlert}
        >
          <div className="min-h-screen px-4 text-center">
            <Dialog.Overlay className="fixed inset-0 bg-black opacity-30" />

            {/* Centering the dialog */}
            <span
              className="inline-block h-screen align-middle"
              aria-hidden="true"
            >
              &#8203;
            </span>
            <DialogPanel className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
              <Dialog.Title className="text-lg font-medium text-gray-900">
                Login Failed
              </Dialog.Title>
              <Dialog.Description className="mt-2 text-sm text-gray-500">
                {alertMessage}
              </Dialog.Description>
              <div className="mt-4">
                <Button
                  onClick={closeAlert}
                  className="inline-flex justify-center rounded-md bg-green-600 px-4 py-2 text-sm font-medium text-white hover:bg-green-500"
                >
                  Close
                </Button>
              </div>
            </DialogPanel>
          </div>
        </Dialog>
      </Transition>
    </div>
  );
};

export default LoginPage;
