"use client";

import { QRCodeCanvas } from "qrcode.react";
import { useRef } from "react";
import html2canvas from "html2canvas"; // Import html2canvas for downloading the entire ticket as an image

function TicketQRCodePageWrapper({ ticketDetails }) {
  const ticketRef = useRef(null);

  // Function to download the entire ticket as an image
  const downloadTicket = () => {
    html2canvas(ticketRef.current).then((canvas) => {
      const link = document.createElement("a");
      link.href = canvas.toDataURL("image/png");
      link.download = `${ticketDetails.eventName}-ticket.png`; // Download ticket as an image
      link.click();
    });
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#F2F2F2] p-4">
      <div
        ref={ticketRef}
        className="w-full max-w-lg p-6 bg-white rounded-lg shadow-lg"
      >
        <div className="flex flex-col items-center text-center">
          <h1 className="mb-2 text-2xl font-bold text-gray-800 capitalize">
            {ticketDetails.eventName}
          </h1>
          <p className="mb-4 text-gray-600">{ticketDetails.venue}</p>
          <p className="mb-4 text-gray-600">
            <span className="font-semibold">Attendee:</span>{" "}
            {ticketDetails.attendeeName}
          </p>
          <p className="text-gray-600">
            <strong>Date:</strong> {ticketDetails.date}
          </p>
          <p className="mb-6 text-gray-600">
            <strong>Time:</strong> {ticketDetails.time}
          </p>

          {/* QR Code */}
          <div className="p-4 mb-6 bg-gray-100 rounded-md shadow-md">
            <QRCodeCanvas
              value={ticketDetails.qrCodeValue}
              size={200}
              bgColor={"#ffffff"}
              fgColor={"#000000"}
              level={"H"}
              aria-label={`QR Code for ${ticketDetails.eventName}`}
            />
          </div>

          <p className="mt-4 text-sm text-gray-500">
            Show this QR code at the event entrance for scanning.
          </p>

          {/* Download Button */}
          <button
            onClick={downloadTicket}
            className="px-6 py-2 mt-6 text-white transition duration-300 bg-blue-500 rounded-md shadow-md hover:bg-blue-600"
          >
            Download Ticket
          </button>
        </div>
      </div>
    </div>
  );
}

export default TicketQRCodePageWrapper;
