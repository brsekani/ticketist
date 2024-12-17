// src/schemas/ticketValidation.js
import * as Yup from "yup";

// Function to get validation schema for a specific ticket
export const getTicketValidationSchema = (ticketNumber) => {
  return Yup.object().shape({
    [`firstName_${ticketNumber}`]: Yup.string().required(
      `First name for ticket ${ticketNumber} is required`
    ),
    [`lastName_${ticketNumber}`]: Yup.string().required(
      `Last name for ticket ${ticketNumber} is required`
    ),
  });
};
