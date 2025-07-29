// components/SearchableDataTable.jsx
import { useState } from "react";
import PropTypes from "prop-types";
import { Search, X } from "lucide-react";
import DataTable from "react-data-table-component";

const SearchableDataTable = ({
  columns,
  data,
  title,
  loading,
  downloadLabel,
  onDownload,
  noDataText,
}) => {
  const [searchInput, setSearchInput] = useState("");

  const handleSearch = (e) => setSearchInput(e.target.value);

  const filteredData = data.filter((item) =>
    Object.values(item).some((val) =>
      String(val).toLowerCase().includes(searchInput.toLowerCase())
    )
  );

  return (
    <div className="max-w-7xl mx-auto bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-gray-800 flex items-center justify-center mb-10">
        {title}
      </h2>

      {/* Search + Download */}
      <div className="flex justify-between gap-4 mb-4">
        {/* Search Input - Left Side */}
        <div className="relative flex items-center w-full md:w-1/5">
          {!searchInput ? (
            <Search
              color="#BFBFBF"
              className="absolute left-2 top-1/2 -translate-y-1/2"
            />
          ) : (
            <X
              color="#BFBFBF"
              onClick={() => setSearchInput("")}
              className="absolute left-2 top-1/2 -translate-y-1/2 cursor-pointer"
            />
          )}
          <input
            type="text"
            value={searchInput}
            onChange={handleSearch}
            placeholder="Search..."
            className="w-full h-10 pl-8 border border-gray-400 rounded p-2 focus:outline-none focus:ring-1 focus:ring-[#A0C878]"
          />
        </div>

        {/* Download Button - Right Side */}
        {onDownload && (
          <button
            className="w-full md:w-1/5 px-4 py-2 bg-[#237C55] text-white tracking-wide shadow-md rounded font-bold hover:bg-[#A0C878]"
            type="button"
            disabled={loading}
            onClick={onDownload}
          >
            {downloadLabel}
          </button>
        )}
      </div>

      <DataTable
        columns={columns}
        data={filteredData}
        pagination
        highlightOnHover
        responsive
        striped
        noDataComponent={noDataText}
      />
    </div>
  );
};

// PropTypes validation
SearchableDataTable.propTypes = {
  columns: PropTypes.arrayOf(PropTypes.object).isRequired,
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  title: PropTypes.string,
  loading: PropTypes.bool,
  downloadLabel: PropTypes.string,
  onDownload: PropTypes.func,
  noDataText: PropTypes.string,
};

// Default props
SearchableDataTable.defaultProps = {
  title: "Data Table",
  loading: false,
  downloadLabel: "Download",
  onDownload: null,
  noDataText: "No data available",
};

export default SearchableDataTable;
