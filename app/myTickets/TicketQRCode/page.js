"use client";

import { QRCodeCanvas } from "qrcode.react";

export default function TicketQRCodePage() {
  const ticketDetails = {
    eventName: "Music Festival",
    venue: "Central Park, NY",
    date: "2024-12-01",
    time: "7:00 PM",
    qrCodeValue: "https://example.com/ticket/12345", // Unique ticket link or ID
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#F2F2F2] p-4">
      <div className="bg-white rounded-lg shadow-lg p-6 max-w-lg w-full">
        <div className="flex flex-col items-center text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-2">
            {ticketDetails.eventName}
          </h1>
          <p className="text-gray-600 mb-4">{ticketDetails.venue}</p>
          <p className="text-gray-600">
            <strong>Date:</strong> {ticketDetails.date}
          </p>
          <p className="text-gray-600 mb-6">
            <strong>Time:</strong> {ticketDetails.time}
          </p>

          {/* QR Code */}
          <div className="bg-gray-100 p-4 rounded-md shadow-md">
            <QRCodeCanvas
              value={ticketDetails.qrCodeValue}
              size={200}
              bgColor={"#ffffff"}
              fgColor={"#000000"}
              level={"H"}
            />
          </div>

          <p className="text-gray-500 mt-4 text-sm">
            Show this QR code at the event entrance for scanning.
          </p>

          {/* Download Button */}
          <button
            onClick={() => downloadQRCode(ticketDetails.qrCodeValue)}
            className="mt-6 px-6 py-2 bg-blue-500 text-white rounded-md shadow-md hover:bg-blue-600 transition duration-300"
          >
            Download QR Code
          </button>
        </div>
      </div>
    </div>
  );
}

function downloadQRCode(qrCodeValue) {
  const canvas = document.querySelector("canvas");
  const pngUrl = canvas
    .toDataURL("image/png")
    .replace("image/png", "image/octet-stream");
  const downloadLink = document.createElement("a");
  downloadLink.href = pngUrl;
  downloadLink.download = "ticket-qrcode.png";
  downloadLink.click();
}
