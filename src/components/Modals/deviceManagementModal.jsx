import { useState, useEffect } from "react";
import { FaUserPen } from "react-icons/fa6";
import { X } from "lucide-react";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";

export default function DeviceManagementModal({
  handleClose = () => {},
  deviceData = {},
}) {
  const { t } = useTranslation();

  const [formData, setFormData] = useState({
    deviceId: "",
    label: "",
    deviceInfo: "",
    deviceStatus: "",
    lastUpdate: "",
    assignedProfile: "",
    assignedTerminalId: "",
  });

  const [onEdit, setOnEdit] = useState(false);

  // Mocked dropdown options
  const profileOptions = ["Admin", "Merchant", "Technician"];
  const terminalOptions = ["TERM-001", "TERM-002", "TERM-003"];

  useEffect(() => {
    if (deviceData) {
      setFormData((prevData) => ({
        ...prevData,
        ...deviceData,
      }));
    }
  }, [deviceData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = () => {
    // Save logic here (e.g. call API)
    console.log("Saving device:", formData);
    setOnEdit(false);
    handleClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50 text-sm">
      <div className="bg-white rounded-lg shadow-lg max-w-3xl w-full border-2 border-[#237C55]">
        <div className="flex justify-between items-center bg-[#237C55] p-4 rounded-t">
          <div className="flex items-center space-x-2">
            <FaUserPen className="text-white" />
            <h2 className="text-white font-semibold text-lg">
              {t("view_device_details")}
            </h2>
          </div>
          <X className="text-white cursor-pointer" onClick={handleClose} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-6 max-h-[450px] overflow-y-auto">
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Device ID
            </label>
            <input
              disabled
              name="deviceId"
              value={formData.deviceId}
              onChange={handleChange}
              className="w-full border p-2 rounded focus:ring-[#A0C878]"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Label
            </label>
            <input
              name="label"
              disabled={!onEdit}
              value={formData.label}
              onChange={handleChange}
              className="w-full border p-2 rounded focus:ring-[#A0C878]"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-gray-700 font-medium mb-1">
              Device Info
            </label>
            <textarea
              name="deviceInfo"
              disabled={!onEdit}
              value={formData.deviceInfo}
              onChange={handleChange}
              className="w-full border p-2 rounded focus:ring-[#A0C878]"
              rows="3"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Device Status
            </label>
            <select
              name="deviceStatus"
              disabled={!onEdit}
              value={formData.deviceStatus}
              onChange={handleChange}
              className="w-full border p-2 rounded focus:ring-[#A0C878]"
            >
              <option value="ACTIVE">ACTIVE</option>
              <option value="INACTIVE">INACTIVE</option>
            </select>
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Last Update
            </label>
            <input
              disabled
              name="lastUpdate"
              value={formData.lastUpdate}
              onChange={handleChange}
              className="w-full border p-2 rounded focus:ring-[#A0C878]"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Assigned Profile
            </label>
            <select
              name="assignedProfile"
              disabled={!onEdit}
              value={formData.assignedProfile}
              onChange={handleChange}
              className="w-full border p-2 rounded focus:ring-[#A0C878]"
            >
              <option value="">Select Profile</option>
              {profileOptions.map((profile) => (
                <option key={profile} value={profile}>
                  {profile}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Assigned Terminal ID
            </label>
            <select
              name="assignedTerminalId"
              disabled={!onEdit}
              value={formData.assignedTerminalId}
              onChange={handleChange}
              className="w-full border p-2 rounded focus:ring-[#A0C878]"
            >
              <option value="">Select Terminal</option>
              {terminalOptions.map((terminal) => (
                <option key={terminal} value={terminal}>
                  {terminal}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="flex justify-end space-x-4 px-6 pb-6">
          {!onEdit ? (
            <button
              onClick={() => setOnEdit(true)}
              className="px-4 py-2 bg-[#237C55] text-white rounded hover:bg-[#A0C878]"
            >
              {t("edit")}
            </button>
          ) : (
            <>
              <button
                onClick={handleSave}
                className="px-4 py-2 bg-[#237C55] text-white rounded hover:bg-[#A0C878]"
              >
                {t("save")}
              </button>
              {/* <button
                onClick={() => setOnEdit(false)}
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
              >
                {t("cancel")}
              </button> */}
            </>
          )}
          <button
            onClick={handleClose}
            className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
          >
            {t("close")}
          </button>
        </div>
      </div>
    </div>
  );
}

DeviceManagementModal.propTypes = {
  handleClose: PropTypes.func.isRequired,
  deviceData: PropTypes.object.isRequired,
};
