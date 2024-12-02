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
      <div className="w-full max-w-lg p-6 bg-white rounded-lg shadow-lg">
        <div className="flex flex-col items-center text-center">
          <h1 className="mb-2 text-2xl font-bold text-gray-800">
            {ticketDetails.eventName}
          </h1>
          <p className="mb-4 text-gray-600">{ticketDetails.venue}</p>
          <p className="text-gray-600">
            <strong>Date:</strong> {ticketDetails.date}
          </p>
          <p className="mb-6 text-gray-600">
            <strong>Time:</strong> {ticketDetails.time}
          </p>

          {/* QR Code */}
          <div className="p-4 bg-gray-100 rounded-md shadow-md">
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
            onClick={() => downloadQRCode(ticketDetails.qrCodeValue)}
            className="px-6 py-2 mt-6 text-white transition duration-300 bg-blue-500 rounded-md shadow-md hover:bg-blue-600"
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
  if (canvas) {
    const pngUrl = canvas
      .toDataURL("image/png")
      .replace("image/png", "image/octet-stream");
    const downloadLink = document.createElement("a");
    downloadLink.href = pngUrl;
    downloadLink.download = "ticket-qrcode.png";
    downloadLink.click();
  } else {
    alert("QR code is not ready for download.");
  }
}
