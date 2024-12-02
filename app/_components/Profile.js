import { Drawer } from "@mantine/core";
import { useState } from "react";

function Profile({ opened, close }) {
  const [formValues, setFormValues] = useState({
    firstName: "",
    lastName: "",
    email: "",
    location: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleLocationChange = (e) => {
    const { value } = e.target;
    setFormValues((prev) => ({ ...prev, location: value }));
  };

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
      <form className="space-y-4">
        <div>
          <label className="block mb-1 text-sm font-medium text-gray-700">
            First Name
          </label>
          <input
            type="text"
            name="firstName"
            value={formValues.firstName}
            onChange={handleChange}
            placeholder="Enter your first name"
            className="w-full h-12 px-4 border border-gray-300 rounded-lg"
          />
        </div>
        <div>
          <label className="block mb-1 text-sm font-medium text-gray-700">
            Last Name
          </label>
          <input
            type="text"
            name="lastName"
            value={formValues.lastName}
            onChange={handleChange}
            placeholder="Enter your last name"
            className="w-full h-12 px-4 border border-gray-300 rounded-lg"
          />
        </div>
        <div>
          <label className="block mb-1 text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            type="email"
            name="email"
            value={formValues.email}
            onChange={handleChange}
            placeholder="Enter your email"
            className="w-full h-12 px-4 border border-gray-300 rounded-lg"
          />
        </div>
        <div>
          <label className="block mb-1 text-sm font-medium text-gray-700">
            Location
          </label>
          <div className="flex items-center gap-3">
            <select
              name="location"
              value={formValues.location}
              onChange={handleLocationChange}
              className="w-full h-12 px-4 border border-gray-300 rounded-lg"
            >
              <option value="" disabled>
                Select your country
              </option>
              <option value="US">United States</option>
              <option value="CA">Canada</option>
              <option value="GB">United Kingdom</option>
              <option value="AU">Australia</option>
              <option value="DE">Germany</option>
              <option value="FR">France</option>
              <option value="IN">India</option>
              <option value="JP">Japan</option>
              <option value="CN">China</option>
              <option value="NG">Nigeria</option>
            </select>
            {formValues.location && (
              <span className="text-2xl">
                {countryFlags[formValues.location]}
              </span>
            )}
          </div>
        </div>
        <button
          type="button"
          onClick={close}
          className="w-full h-12 text-sm font-semibold text-white bg-[#32BC9B] rounded-lg shadow-md hover:bg-[#28a083] transition duration-200 ease-in-out"
        >
          Save Changes
        </button>
      </form>
    </Drawer>
  );
}

export default Profile;
