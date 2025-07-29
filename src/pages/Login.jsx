import { useState, useRef, useEffect } from "react";
import LoginImage from "../assets/LoginImage.gif";
import OTPModal from "../components/Modals/OTPModal";
import {
  HandleChange,
  HandleChangeDigitsOnly,
} from "../components/Validations";
import { toast, ToastContainer } from "react-toastify";
import { Globe } from "lucide-react";
import { useTranslation } from "react-i18next";
import { verifyCredentials, verifyOTP } from "../api/login";
import changePassword from "../api/changepassword";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../components/Auth/useAuth";
import ChangePasswordModal from "../components/Modals/changePasswordModal";
import LoadingModal from "../components/Modals/LoadingModal";

const Login = () => {
  if (!localStorage.getItem("lang")) {
    localStorage.setItem("lang", JSON.stringify({ language: "EN" }));
  }

  const initialFormData = {
    msisdn: "",
    username: "",
    password: "",
  };

  const languageDropdownRef = useRef(null);
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const { login } = useAuth();

  const [_otpFromServer, setOtpFromServer] = useState("");
  const [formData, setFormData] = useState(initialFormData);
  const [showPassword, setShowPassword] = useState(false);
  const [openModal, setOpenModal] = useState("");
  const [isLanguageDropdownOpen, setIsLanguageDropdownOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  // Show Password
  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const isFormValid =
      formData.msisdn && formData.username && formData.password;

    if (isFormValid) {
      setLoading(true);
      try {
        const result = await verifyCredentials(
          formData.msisdn,
          formData.username,
          formData.password
        );

        if (result.logout) {
          toast.error(result.message);
        } else if (result.success) {
          setOtpFromServer(result.otp); // Store OTP sent by mock server
          setOpenModal("OTPModal"); // Open OTP modal
        } else {
          toast.error(result.message);
        }
      } catch (error) {
        toast.error(error);
      } finally {
        setLoading(false);
      }
    } else {
      toast.error(t("modal_fill_all_fields"));
    }
  };

  const handleEnterPress = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      handleSubmit(event);
    }
  };

  // Toggle language dropdown
  const toggleLanguageDropdown = () => {
    setIsLanguageDropdownOpen(!isLanguageDropdownOpen);
  };

  // Handle language change
  const changeLanguage = (language) => {
    i18n.changeLanguage(language); // Update language globally
    localStorage.setItem("lang", JSON.stringify({ language: `${language}` }));
    setIsLanguageDropdownOpen(false);
  };

  // Handle clicks inside language dropdown
  const handleClickInsideLanguageDropdown = (event) => {
    event.stopPropagation();
  };

  // Dropdown closing state handler
  const handleClickOutside = (event) => {
    if (
      languageDropdownRef.current &&
      !languageDropdownRef.current.contains(event.target)
    ) {
      setIsLanguageDropdownOpen(false);
    }
  };

  // Event Listener to detect clicks outside dropdowns
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative flex flex-row min-h-screen bg-white">
      {loading && <LoadingModal />}
      <ToastContainer />

      <div className="w-full h-screen hidden md:flex items-center justify-center">
        <img
          src={LoginImage}
          className="max-content object-cover"
          alt="Login Illustration"
        />
      </div>

      {/* Login Form Section */}
      <div className="flex flex-col min-h-screen items-center justify-center w-full">
        <div className="w-full max-w-sm p-6 sm:max-w-md lg:max-w-lg shadow-lg md:shadow-none">
          <h2 className="mb-6 text-5xl font-bold text-center text-gray-800 tracking-wider cursor-default">
          Merchant {t("login")} 
          </h2>
          <form>
            <div className="mb-4">
              <label
                htmlFor="msisdn"
                className="block mb-2 text-sm font-bold text-gray-700"
              >
                {t("msisdn")}
              </label>
              <input
                type="text"
                id="msisdn"
                name="msisdn"
                value={formData.msisdn}
                onKeyDown={handleEnterPress}
                onChange={HandleChangeDigitsOnly(setFormData)}
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#A0C878] focus:border-transparent"
                placeholder={t("Enter your MSISDN")}
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="username"
                className="block mb-2 text-sm font-bold text-gray-700"
              >
                {t("username")}
              </label>
              <input
                type="text"
                id="username"
                name="username"
                value={formData.username}
                onKeyDown={handleEnterPress}
                onChange={HandleChange(setFormData)}
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#A0C878] focus:border-transparent"
                placeholder={t("Enter your username")}
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="password"
                className="block mb-2 text-sm font-bold text-gray-700"
              >
                {t("login_password")}
              </label>
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                value={formData.password}
                onChange={HandleChange(setFormData)}
                onKeyDown={handleEnterPress}
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#A0C878] focus:border-transparent"
                placeholder={t("********************")}
              />
            </div>

            <div className="flex items-center mb-4">
              <input
                type="checkbox"
                checked={showPassword}
                onChange={togglePasswordVisibility}
                className="mr-2 w-4 h-4 cursor-pointer rounded"
              />
              <label>{t("login_show_password")}</label>
            </div>

            <div className="flex justify-center">
              <button
                type="button"
                onClick={handleSubmit}
                className="w-80 px-4 py-2 font-medium text-white bg-[#237C55] rounded hover:bg-[#A0C878] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1"
              >
                {t("login")}
              </button>
            </div>
          </form>
        </div>
      </div>

      <div
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="absolute bottom-4 right-4 cursor-pointer"
        ref={languageDropdownRef}
      >
        <Globe
          size={34}
          color={isLanguageDropdownOpen || isHovered ? "#A0C878" : "#237C55"}
          onClick={toggleLanguageDropdown}
        />
        {isLanguageDropdownOpen && (
          <div
            className="absolute bottom-full right-0 mb-2 w-40 bg-[#A0C878] rounded-tl-lg rounded-tr-2xl rounded-bl-2xl border border-gray-100"
            onClick={handleClickInsideLanguageDropdown}
          >
            <div className="p-4">
              <button
                onClick={() => {
                  changeLanguage("en");
                }}
                className="block mt-2 w-full text-left px-4 text-white hover:text-[#237C55]"
              >
                English
              </button>
              <button
                onClick={() => {
                  changeLanguage("fr");
                }}
                className="block mt-2 w-full text-left px-4 text-white hover:text-[#237C55]"
              >
                Français
              </button>
            </div>
          </div>
        )}
      </div>

      {openModal === "OTPModal" && (
        <OTPModal
          onProceed={async (enteredOtp) => {
            try {
              const { success, message, data, logout } = await verifyOTP(
                enteredOtp,
                formData.msisdn,
                formData.username,
                formData.password
              );

              if (logout) {
                toast.error(message);
                setTimeout(() => {
                  setOpenModal("");
                }, 6000);
              } else if (success) {
                toast.success(message);

                // || data.isfirstlogon === '1'
                if (
                  message ===
                    "Password expired. Please use forgot password or contact the administrator." ||
                  data.isFirstLogon === "1"
                ) {
                  setOpenModal(""); // Close OTP Modal
                  setOpenModal("ChangePasswordModal"); // Open Change Password Modal
                } else {
                  login();
                  setOpenModal("");
                  navigate("/dashboard"); // Navigate to the dashboard on success
                }
              } else {
                toast.error(message);
              }
            } catch (error) {
              toast.error(error.message || t("enter_valid_otp"));
            }
          }}
          handleClose={() => setOpenModal("")}
        />
      )}

      {openModal === "ChangePasswordModal" && (
        <ChangePasswordModal
          onSubmit={async (newPassword) => {
            try {
              const { success, message } = await changePassword(
                formData.password,
                newPassword
              );

              if (success) {
                toast.success(
                  message || t("modal_password_changed_successfully")
                );
                setOpenModal("");
              } else {
                toast.error(message || t("modal_changing_password_failed"));
              }
            } catch (error) {
              toast.error(error.message || t("modal_changing_password_failed"));
            }
          }}
          handleClose={() => setOpenModal("")}
        />
      )}
    </div>
  );
};

export default Login;
