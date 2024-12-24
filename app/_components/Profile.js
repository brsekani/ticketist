import { Drawer } from "@mantine/core";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

function Profile({ opened, close, session, locations }) {
  const countryFlags = {
    US: "🇺🇸",
    CA: "🇨🇦",
    GB: "🇬🇧",
    AU: "🇦🇺",
    DE: "🇩🇪",
    FR: "🇫🇷",
    IN: "🇮🇳",
    JP: "🇯🇵",
    CN: "🇨🇳",
    NG: "🇳🇬",
  };

  const initialValues = {
    fullName: session?.user?.name,
    email: session?.user?.email,
    location: "",
  };

  const validationSchema = Yup.object({
    fullName: Yup.string().required("Full name is required"),
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    location: Yup.string().required("Location is required"),
  });

  const handleSubmit = async (values) => {
    console.log("Form Submitted", values);
    close(); // Close the drawer after successful submission
  };

  return (
    <Drawer
      opened={opened}
      onClose={close}
      title="Profile Details"
      position="right"
      size="lg"
      styles={{
        title: { color: "#32BC9B", fontWeight: "bold", fontSize: "1.5rem" },
        drawer: { backgroundColor: "#F1F1F1", padding: "1.5rem" },
      }}
    >
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ values }) => (
          <Form className="space-y-4">
            {/* First Name */}
            <div>
              <label className="block mb-1 text-sm font-medium text-gray-700">
                First Name
              </label>
              <Field
                name="fullName"
                type="text"
                placeholder="Enter your first name"
                className="w-full h-12 px-4 border border-gray-300 rounded-lg"
              />
              <ErrorMessage
                name="fullName"
                component="div"
                className="text-sm text-red-600"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block mb-1 text-sm font-medium text-gray-700">
                Email
              </label>
              <Field
                name="email"
                type="email"
                placeholder="Enter your email"
                className="w-full h-12 px-4 border border-gray-300 rounded-lg"
                disabled
              />
              <ErrorMessage
                name="email"
                component="div"
                className="text-sm text-red-600"
              />
            </div>

            {/* Location */}
            <div>
              <label className="block mb-1 text-sm font-medium text-gray-700">
                Location
              </label>
              <div className="flex items-center gap-3">
                <Field
                  as="select"
                  name="location"
                  className="w-full h-12 px-4 border border-gray-300 rounded-lg"
                >
                  <option value="" disabled>
                    Select your country
                  </option>
                  {locations.map((location, i) => (
                    <option key={i}>{location}</option>
                  ))}
                </Field>
                {values.location && (
                  <span className="text-2xl">
                    {countryFlags[values.location]}
                  </span>
                )}
              </div>
              <ErrorMessage
                name="location"
                component="div"
                className="text-sm text-red-600"
              />
            </div>

            {/* Save Button */}
            <button
              type="submit"
              className="w-full h-12 text-sm font-semibold text-white bg-[#32BC9B] rounded-lg shadow-md hover:bg-[#28a083] transition duration-200 ease-in-out"
            >
              Save Changes
            </button>
          </Form>
        )}
      </Formik>
    </Drawer>
  );
}

export default Profile;
