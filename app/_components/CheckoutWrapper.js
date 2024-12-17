"use client";

import { IoArrowBackOutline } from "react-icons/io5";
import Spinner from "./Spinner";
import { Suspense, useRef } from "react";
import { useSearchParams } from "next/navigation";
import dynamic from "next/dynamic";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { getTicketValidationSchema } from "../utils/schemas";
import { useEffect } from "react";

function CheckoutWrapper({ params, user }) {
  const searchParams = useSearchParams();

  const EventImage = dynamic(() => import("@/app/_components/EventImage"), {
    suspense: true, // Enable suspense if needed
  });

  // Reference to access Formik
  const formikRefs = useRef([]); // Store references to Formik instances

  // Retrieve the 'NOT' query parameter from the URL (which holds the quantity)
  const quantity = searchParams.get("NOT") || 1; // Fallback value if 'NOT' is not available
  const eventPrice = searchParams.get("price") || 0; // Fallback value if 'NOT' is not available

  const numberOfTickets = parseInt(quantity, 10); // Ensure quantity is a number
  const priceOfTickets = parseInt(eventPrice, 10); // Ensure quantity is a number
  const totalPrice = priceOfTickets * numberOfTickets;

  // Generate an array of ticket data based on the number of tickets
  const tickets = Array.from(
    { length: numberOfTickets },
    (_, index) => index + 1
  );

  const nameParts = user.name.split(" ");
  const firstName = nameParts[0];
  const lastName = nameParts[nameParts.length - 1];

  // Trigger validation and API call when 'Pay with Paystack' is clicked
  // Trigger validation and API call when 'Pay with Paystack' is clicked
  const handlePaymentClick = async () => {
    const errors = await Promise.all(
      formikRefs.current.map((formik) => {
        // Trigger validation
        formik.validateForm();

        // Mark all fields as touched
        Object.keys(formik.values).forEach((key) =>
          formik.setFieldTouched(key, true)
        );

        return formik.validateForm(); // Return the errors
      })
    );

    const hasErrors = errors.some((error) => Object.keys(error).length > 0);

    if (!hasErrors) {
      document.body.style.overflow = "hidden";

      const ticketData = formikRefs.current.map((formik) => formik.values);
      console.log("Collected ticket data:", ticketData);

      const handler = window.PaystackPop.setup({
        key: process.env.PAYSTACK_SECRET,
        email: user.email,
        amount: totalPrice * 100,
        currency: "NGN",
        callback: function (response) {
          console.log("Payment successful:", response);
          alert("Payment successful! Reference: " + response.reference);
          document.body.style.overflow = "auto";
        },
        onClose: function () {
          alert("Payment canceled by user.");
          document.body.style.overflow = "auto";
        },
      });

      handler.openIframe();
    } else {
      console.error("Validation errors:", errors);
    }
  };

  const handleSubmit = (values) => {
    console.log(values); // Your submission logic
  };

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://js.paystack.co/v1/inline.js";
    script.async = true;
    document.body.appendChild(script);
  }, []);

  return (
    <div className="flex flex-col w-full h-full pb-10 sm:flex-row">
      <div className="sm:w-[70%] w-full bg-[#FFFFFF] h-full pb-10">
        <div className="border-y border-[#C2C2C2] h-24 flex items-center px-10">
          <IoArrowBackOutline
            className="cursor-pointer"
            size={30}
            onClick={() => window.history.back()} // Or use router.back() in client-side navigation
          />
          <p className="mx-auto text-2xl font-semibold sm:text-4xl">Checkout</p>
        </div>

        <div className="flex flex-col w-full gap-3 px-10">
          <div className="w-full">
            <h1 className="py-5 text-xl font-medium sm:text-3xl">
              Contact information
            </h1>
            <div className="flex flex-col gap-6">
              <div className="flex flex-row gap-10">
                <input
                  type="text"
                  name="firstName"
                  placeholder="First name"
                  className="w-full h-12 border border-[#B7B7B7] rounded-3xl px-4"
                  value={firstName}
                  disabled
                />
                <input
                  type="text"
                  name="lastName"
                  placeholder="Last name"
                  className="w-full h-12 border border-[#B7B7B7] rounded-3xl px-4"
                  value={lastName}
                  disabled
                />
              </div>

              <input
                type="email"
                name="email"
                placeholder="Email address"
                className="w-full h-12 border border-[#B7B7B7] rounded-3xl px-4"
                value={user.email}
                disabled
              />
            </div>
          </div>

          {tickets.map((ticketNumber) => (
            <Formik
              key={ticketNumber}
              innerRef={(el) => (formikRefs.current[ticketNumber - 1] = el)} // Save formik ref for each ticket
              initialValues={{
                [`firstName_${ticketNumber}`]: "",
                [`lastName_${ticketNumber}`]: "",
              }}
              validationSchema={getTicketValidationSchema(ticketNumber)} // Use dynamic schema
              onSubmit={handleSubmit}
            >
              {() => (
                <Form>
                  <h1 className="py-2 text-xl">
                    Ticket {ticketNumber} Information
                  </h1>
                  <div className="flex flex-col gap-3 sm:gap-10 sm:flex-row">
                    <div className="w-full">
                      <Field
                        type="text"
                        name={`firstName_${ticketNumber}`}
                        placeholder={`First name for Ticket ${ticketNumber}`}
                        className="w-full h-12 border border-[#B7B7B7] rounded-3xl px-4 focus:border-red-900"
                      />
                      <ErrorMessage
                        name={`firstName_${ticketNumber}`}
                        component="div"
                        className="text-xs text-red-500 sm:text-sm"
                      />
                    </div>

                    <div className="w-full">
                      <Field
                        type="text"
                        name={`lastName_${ticketNumber}`}
                        placeholder={`Last name for Ticket ${ticketNumber}`}
                        className="w-full h-12 border border-[#B7B7B7] rounded-3xl px-4"
                      />
                      <ErrorMessage
                        name={`lastName_${ticketNumber}`}
                        component="div"
                        className="text-xs text-red-500 sm:text-sm"
                      />
                    </div>
                  </div>
                </Form>
              )}
            </Formik>
          ))}
        </div>
      </div>
      <div className="sm:w-[30%] w-full bg-[#F2F2F2] p-6 rounded-lg shadow-md h-full">
        <Suspense fallback={<Spinner />}>
          <EventImage params={params} />
        </Suspense>

        <div className="space-y-4">
          <h1 className="text-xl font-semibold text-gray-800">Order Summary</h1>

          <div className="space-y-2">
            <div className="flex items-center justify-between text-gray-700">
              <p>{numberOfTickets} x General Admission</p>
              <p>${totalPrice}</p>
            </div>
            {/* <div className="flex items-center justify-between text-gray-700">
              <p>Delivery - eTicket</p>
              <p>$50</p>
            </div> */}
          </div>

          <hr className="border border-[#C2C2C2]" />

          <div className="flex items-center justify-between font-semibold text-gray-800">
            <p>Total</p>
            <p>${totalPrice}</p>
          </div>

          <button
            type="button" // Change to type="button" since it's outside Formik
            onClick={handlePaymentClick}
            className="w-full mt-4 py-3 text-lg font-semibold text-white bg-[#32BC9B] rounded-full hover:bg-[#28a083] transition duration-200 ease-in-out"
          >
            Pay with Paystack
          </button>
        </div>
      </div>
    </div>
  );
}

export default CheckoutWrapper;
