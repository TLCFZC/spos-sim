import PropTypes from "prop-types";

const Pagination = ({ currentPage, totalPages, paginate }) => {
  if (totalPages <= 1) return null; // Hide if only one page

  const goToPage = (page) => {
    if (page < 1 || page > totalPages) return;
    paginate(page);
  };

  return (
    <div className="flex justify-center mt-4 space-x-1">
      <button
        onClick={() => goToPage(1)}
        className="px-3 py-1 text-xl text-[#19405A] font-bold rounded-full hover:bg-[#F3EEEB] disabled:opacity-50"
        disabled={currentPage === 1}
      >
        «
      </button>
      <button
        onClick={() => goToPage(currentPage - 1)}
        className="px-3 py-1 text-xl text-[#19405A] font-bold rounded-full hover:bg-[#F3EEEB] disabled:opacity-50"
        disabled={currentPage === 1}
      >
        ‹
      </button>

      {Array.from({ length: totalPages }, (_, i) => (
        <button
          key={i + 1}
          onClick={() => goToPage(i + 1)}
          className={`px-3 py-1 mx-1 hover:bg-[#F3EEEB] rounded-full text-sm ${
            currentPage === i + 1
              ? "bg-[#F4E6DC] text-black"
              : "bg-transparent text-gray-700"
          }`}
        >
          {i + 1}
        </button>
      ))}

      <button
        onClick={() => goToPage(currentPage + 1)}
        className="px-3 py-1 text-xl text-[#19405A] font-bold rounded-full hover:bg-[#F3EEEB] disabled:opacity-50"
        disabled={currentPage === totalPages}
      >
        ›
      </button>
      <button
        onClick={() => goToPage(totalPages)}
        className="px-3 py-1 text-xl text-[#19405A] font-bold rounded-full hover:bg-[#F3EEEB] disabled:opacity-50"
        disabled={currentPage === totalPages}
      >
        »
      </button>
    </div>
  );
};

Pagination.propTypes = {
  currentPage: PropTypes.number.isRequired,
  totalPages: PropTypes.number.isRequired,
  paginate: PropTypes.func.isRequired,
};

export default Pagination;
