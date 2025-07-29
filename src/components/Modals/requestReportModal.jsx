import { useState, useEffect } from "react";
import { X } from "lucide-react";
import ConfirmationModal from "./confirmationModal";
import StatusModal from "./statusModal";
import { toast, ToastContainer } from "react-toastify";
import { HandleChange, ResetFormData } from "../Validations";
import { useTranslation } from "react-i18next";
import { transactionTypeCol, requestReport } from "../../api/reports";
import LoadingModal from "../../components/Modals/LoadingModal";
import PropTypes from "prop-types";

export default function RequestReportsModal({ handleClose = () => {} }) {
  const initialFormData = {
    reportType: "",
    msisdn: "ALL",
    dateFrom: "",
    dateTo: "",
    transType: "",
  };

  const [formData, setFormData] = useState(initialFormData);
  const [transTypes, setTransTypes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [typeOfReport, setTypeOfReport] = useState("");
  const { t } = useTranslation();

  useEffect(() => {
    const fetchTransactionTypes = async () => {
      setLoading(true);

      try {
        const { success, transactType, message } = await transactionTypeCol();

        if (success) {
          let parsedData;
          if (Array.isArray(transactType)) {
            parsedData = transactType[0];
          } else {
            parsedData = transactType;
          }

          if (parsedData) {
            parsedData = Array.isArray(transactType)
              ? transactType
              : [transactType];

            setTransTypes(JSON.parse(parsedData));
          } else {
            toast.error(message);
          }
        } else {
          toast.error(message);
        }
      } catch (err) {
        toast.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchTransactionTypes();
  }, []);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // State to manage modals and messages
  const [openModal, setOpenModal] = useState("");
  const [setModalMessage] = useState("");
  const [modalState, setModalState] = useState({
    isOpen: false,
    status: "",
    message: "",
  });

  // Open confirmation modal with a specific message
  // const handleOpenModal = (modalMessage) => {
  //     setModalMessage(modalMessage);
  //     setOpenModal('confirmationModal');
  // };

  // Close confirmation modal
  const handleCloseModal = () => {
    setOpenModal("");
    setModalMessage("");
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    const isFormValid =
      formData.reportType &&
      formData.msisdn &&
      formData.dateFrom &&
      formData.dateTo &&
      formData.reportType !== "Transaction Reports" &&
      formData.transType;

    if (isFormValid) {
      try {
        const response = await requestReport(formData);
        if (response.success) {
          setModalState({
            isOpen: true,
            status: "success",
            message: t("modal_request_success"),
          });
          ResetFormData(setFormData, initialFormData)();
        } else {
          setModalState({
            isOpen: true,
            status: "error",
            message: t("modal_request_failed"),
          });
        }
      } catch {
        setModalState({
          isOpen: true,
          status: "error",
          message: t("modal_request_failed"),
        });
      } finally {
        setLoading(false);
      }
    } else {
      setModalState({
        isOpen: true,
        status: "error",
        message: t("modal_request_failed"),
      });
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50 cursor-default">
      {loading && <LoadingModal />}

      <div className="bg-white rounded-lg shadow-lg max-w-xl w-full pb-6 border-2 border-[#237C55]">
        <div className="flex justify-between flex-row items-center bg-[#237C55] rounded-t-sx p-2">
          <div className="flex flex-row">
            <h2 className="text-xl font-semibold text-white">
              {t("request_reports")}
            </h2>
          </div>
          <div>
            <X className="cursor-pointer text-white" onClick={handleClose} />
          </div>
        </div>

        {/* Input fields */}
        <form className="flex flex-col gap-6 mb-8 mt-6 mx-6">
          <div>
            <label
              className="w-auto text-sm font-medium text-gray-700"
              htmlFor="reportType"
            >
              {t("modal_types_of_report")}
            </label>
            <select
              name="reportType"
              id="reportType"
              value={formData.reportType}
              onChange={(e) => {
                HandleChange(setFormData)(e);
                setTypeOfReport(e.target.value);
              }}
              className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#A0C878] cursor-pointer"
            >
              <option value="">Please Select Type of Report</option>
              <option value="SUBSCRIBER TRANSACTION SUMMARY">
                Transaction Summary
              </option>
              <option value="SUBSCRIBER TRANSACTION REPORTS">
                Transaction Reports
              </option>
              <option value="SUBSCRIBER ACCOUNT SUMMARY">
                Account Summary
              </option>
              <option value="SUBSCRIBER TRANSACTION STATEMENT">
                Statement Reports
              </option>
              <option value="SUBSCRIBER BONUS COMMISSION">
                Bonus Commission
              </option>
            </select>
          </div>

          {typeOfReport !== "" && (
            <>
              <div>
                <label
                  className="w-auto text-sm font-medium text-gray-700"
                  htmlFor="msisdn"
                >
                  {t("msisdn")}
                </label>
                <input
                  name="msisdn"
                  id="msisdn"
                  value={formData.msisdn}
                  onChange={HandleChange(setFormData)}
                  placeholder="MSISDN"
                  className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#A0C878]"
                />
              </div>
              <div>
                <label
                  className="w-auto text-sm font-medium text-gray-700"
                  htmlFor="dateFrom"
                >
                  {t("date_from")}
                </label>
                <input
                  type="date"
                  name="dateFrom"
                  id="dateFrom"
                  value={formData.dateFrom}
                  onChange={handleInputChange}
                  className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#A0C878] cursor-pointer"
                />
              </div>
              <div>
                <label
                  className="w-auto text-sm font-medium text-gray-700"
                  htmlFor="dateTo"
                >
                  {t("date_to")}
                </label>
                <input
                  type="date"
                  name="dateTo"
                  id="dateTo"
                  value={formData.dateTo}
                  onChange={handleInputChange}
                  className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#A0C878] cursor-pointer"
                />
              </div>
              {typeOfReport === "SUBSCRIBER TRANSACTION REPORTS" && (
                <div>
                  <label
                    className="w-auto text-sm font-medium text-gray-700"
                    htmlFor="transType"
                  >
                    {t("modal_transaction_type")}
                  </label>
                  <select
                    name="transType"
                    id="transType"
                    value={formData.transType}
                    onChange={HandleChange(setFormData)}
                    className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#A0C878] cursor-pointer"
                  >
                    <option value="">Please Select Transaction Type</option>
                    {transTypes.map((item) => (
                      <option key={item.ID} value={item.KEY}>
                        {item.DESCRIPTION}
                      </option>
                    ))}
                  </select>
                </div>
              )}
            </>
          )}
          <div className="flex justify-center gap-2">
            <button
              type="submit"
              onClick={handleSubmit}
              className="px-4 py-2 text-white bg-[#237C55] rounded hover:bg-[#A0C878] font-bold tracking-wide shadow-md focus:outline-none focus:ring-2 focus:ring-[#A0C878]/50 focus:ring-offset-2"
            >
              {t("submit")}
            </button>
            <button
              type="button"
              className="px-4 py-2 text-white bg-[#C60000] rounded hover:bg-[#F71010] font-bold tracking-wide shadow-md focus:outline-none focus:ring-2 focus:ring-[#F71010]/50 focus:ring-offset-2"
              onClick={handleClose}
            >
              {t("modal_cancel")}
            </button>
          </div>
        </form>
      </div>
      {openModal === "confirmationModal" && (
        <ConfirmationModal
          openModal={Boolean(openModal)}
          handleCloseModal={handleCloseModal}
        />
      )}
      <StatusModal
        isOpen={modalState.isOpen}
        onClose={() => {
          setModalState((prev) => ({ ...prev, isOpen: false }));
          if (modalState.status === "success") {
            handleClose();
          }
        }}
        status={modalState.status}
        message={modalState.message}
      />

      <ToastContainer />
    </div>
  );
}

RequestReportsModal.propTypes = {
  handleClose: PropTypes.func.isRequired,
};
