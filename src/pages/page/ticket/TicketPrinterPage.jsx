import { Button } from "@headlessui/react";
import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AxiosInstance from "../../auth/AxiosInstance";
import QRCode from "react-qr-code";
import { useReactToPrint } from "react-to-print";
import CountdownTimer from "../../components/CountdownTimer";

const TicketPrinterPage = () => {
  const { idTicket } = useParams();
  const token = localStorage.getItem("userToken");
  const [ticketData, setTicketData] = useState(null);
  const [userData, setUserData] = useState(null);
  const componentRef = useRef();
  const navigate = useNavigate(); // Initialize useNavigate
  const fetchTiket = async () => {
    try {
      const response = await AxiosInstance.get(`/api/v1/tickets/${idTicket}`, {
        headers: { token: token },
      });
      setTicketData(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchUserInformation = async (idUser) => {
    try {
      const response = await AxiosInstance.get(`/api/v1/auth/users/${idUser}`, {
        headers: { token: token },
      });
      setUserData(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      await fetchTiket();
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (ticketData && ticketData.idUser) {
      fetchUserInformation(ticketData.idUser);
    }
  }, [ticketData]);

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    onAfterPrint: () => {
      alert("Printed successfully");
      navigate("/");
    },
  });

  useEffect(() => {
    if (ticketData && userData) {
      handlePrint();
    }
  }, [ticketData, userData, handlePrint]);

  if (!ticketData || !userData) {
    return <div>Loading...</div>;
  }

  const getCategoryType = (category) => {
    switch (category) {
      case 7010:
        return "DISPEN";
      case 7020:
        return "IZIN";
      case 7030:
        return "IZIN PULANG";
      default:
        return "Unknown";
    }
  };

  return (
    <div className="max-w-xs mx-auto space-y-4 p-4 bg-white rounded-lg">
      <div
        ref={componentRef}
        className="print-container p-4 bg-white border rounded-lg border-gray-800"
      >
        <p className="text-center text-3xl font-bold mb-2 text-black border-b-2 border-gray-800 pb-2">
          SMA PGRI CICALENGKA
        </p>

        <div className="text-center mb-4">
          <div className="text-lg font-bold text-black print-title border-b-2 border-gray-700 pb-2">
            ID TIKET: {ticketData._id || "N/A"}
          </div>
          <div className="text-lg font-bold text-black print-info border-b-2 border-gray-700 pb-2">
            ID USER: {userData._id || "N/A"}
          </div>
          <div className="text-lg font-bold text-black print-info border-b-2 border-gray-700 pb-2">
            NAMA: {userData.displayName || "N/A"}
          </div>
          <div className="text-lg font-bold text-black print-info border-b-2 border-gray-700 pb-2">
            KELAS: {userData.classGrade || "N/A"}
          </div>
          <div className="text-lg font-bold text-black print-info border-b-2 border-gray-700 pb-2">
            JENIS IZIN: {getCategoryType(ticketData.category) || "N/A"}
          </div>
          <div className="text-lg font-bold text-black print-info border-b-2 border-gray-700 pb-2">
            DURASI IZIN:{" "}
            {ticketData.category !== 7030 ? (
              ticketData.TimeCountdown ? (
                <CountdownTimer countdown={ticketData.TimeCountdown} />
              ) : (
                "N/A"
              )
            ) : (
              "-"
            )}
          </div>
          <div className="text-lg font-bold text-black print-info border-b-2 border-gray-700 pb-2">
            ALASAN:{" "}
            <span className="block mt-1 font-bold text-black print-info  truncate">
              {ticketData.description || "N/A"}
            </span>
          </div>

          <div className="text-lg font-bold text-black print-info border-b-2 border-gray-700 pb-2">
            TANGGAL : {ticketData.date || "N/A"}
          </div>
        </div>

        <div className="flex justify-center my-5">
          <QRCode
            size={220}
            value={ticketData._id || "N/A"}
            className="print-qr"
          />
        </div>

        <div className="border-t-2 border-gray-800 pt-4">
          <p className="text-center text-sm text-black">
            Apabila Anda mengalami kendala atau kesalahan, mohon segera laporkan
            kepada petugas piket atau hubungi kami melalui email di
            bmpasha23@gmail.com
          </p>
        </div>
      </div>

      <Button
        onClick={handlePrint}
        className="w-full mt-4 rounded-lg bg-gradient-to-r from-sky-500 to-sky-600 py-2 px-4 text-white hover:from-sky-400 hover:to-sky-500 active:from-sky-600 active:to-sky-700 transition-all duration-200"
      >
        PRINT TIKET
      </Button>

      {/* Print-specific styles */}
      <style jsx>{`
        @media print {
          @page {
            size: 72.1mm 200mm; /* Adjust to your thermal printer's paper size */
            margin: 0;
          }
          body {
            -webkit-print-color-adjust: exact;
          }
          .print-container {
            padding: 10px;
            margin: 0;
            background: white;
            color: black;
            width: 72.1mm; /* Adjust to your thermal printer's width */
            font-family: Arial, sans-serif;
          }
          .print-title {
            font-size: 12pt; /* Increase font size for better clarity */
            font-weight: bold;
            text-align: center;
            margin-bottom: 10px;
          }
          .print-info {
            font-size: 12pt; /* Increase font size for better clarity */
            font-weight: bold;
            font-style: normal;
          }
          .print-qr {
            margin-top: 10px;
            margin-bottom: 20px;
            display: block;
            margin-left: auto;
            margin-right: auto;
          }
          .shadow-lg,
          .bg-white,
          .rounded-lg {
            box-shadow: none;
            background: none;
            border-radius: 0;
          }
          .max-w-xs {
            max-width: 100%;
          }
          .space-y-4 > * + * {
            margin-top: 0;
          }
          .w-full {
            width: 100%;
          }
          .bg-gradient-to-r {
            background: none;
          }
        }
      `}</style>
    </div>
  );
};

export default TicketPrinterPage;
