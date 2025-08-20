import cities from "./data/CitiesData";
import SearchableDropdown from "./SearchableDropdown";

// This component renders a contact form for a PIC (Person In Charge)
export default function PicContactForm({ errors, register, handlePicDivisionChange, selectedCity, handleCityChange }) {
  return (
    <>
      {/* Field for PIC Name */}
      <div className="form-field">
        <label htmlFor="picName" className="form-label">
          Nama PIC
        </label>
        <input
          id="picName"
          type="text"
          // Conditionally add "error" class if there is an error for picName
          className={`form-input ${errors.picName ? "error" : ""}`}
          placeholder="Masukkan Nama PIC"
          // Spread the register object for handling the field with React Hook Form
          {...register("picName")}
        />
        {/* Display error message if there is an error */}
        {errors.picName && (
          <div className="error-message">{errors.picName.message}</div>
        )}
      </div>

      {/* Field for PIC Phone Number */}
      <div className="form-field">
        <label htmlFor="picPhoneNumber" className="form-label">
          Nomor Telepon PIC
        </label>
        <input
          id="picPhoneNumber"
          type="text"
          // Add error class if there's an error for picPhoneNumber
          className={`form-input ${errors.picPhoneNumber ? "error" : ""}`}
          placeholder="Masukkan Nomor Telepon PIC"
          {...register("picPhoneNumber")}
        />
        {/* Display error message if there's an error */}
        {errors.picPhoneNumber && (
          <div className="error-message">{errors.picPhoneNumber.message}</div>
        )}
      </div>

      {/* Field for PIC Email */}
      <div className="form-field">
        <label htmlFor="picEmail" className="form-label">
          Email PIC
        </label>
        <input
          id="picEmail"
          type="email"
          // Add error class if there's an error for picEmail
          className={`form-input ${errors.picEmail ? "error" : ""}`}
          placeholder="Masukkan Email PIC"
          {...register("picEmail")}
        />
        {/* Display error message if there's an error */}
        {errors.picEmail && (
          <div className="error-message">{errors.picEmail.message}</div>
        )}
      </div>

      {/* Field for PIC Division */}
      <div className="form-field">
        <label htmlFor="picDivision" className="form-label">
          Divisi PIC
        </label>
        <div className="form-select">
          <select
            id="picDivision"
            className={`form-input select ${errors.picDivision ? "error" : ""}`}
            {...register("picDivision")}
            onChange={(e) => handlePicDivisionChange(e.target.value)}
          >
            <option value="">Pilih Divisi PIC</option>
            <option value="Business Owner">Business Owner</option>
            <option value="C-Level (CEO/CFO/COO etc)">C-Level (CEO/CFO/COO etc)</option>
            <option value="Senior Manager (Head/VP, etc)">Senior Manager (Head/VP, etc)</option>
            <option value="Staff">Staff</option>
            <option value="Lainnya">Lainnya</option>
          </select>
          <svg
            className="select-arrow"
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
          >
            <path
              d="M4 6L8 10L12 6"
              stroke="#64748b"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        {errors.picDivision && (
          <div className="error-message">{errors.picDivision.message}</div>
        )}
      </div>

      {/* Field for City */}
      <div className="form-field">
        <label htmlFor="city" className="form-label">
          Kota
        </label>
        {/* Hidden input to register the field with React Hook Form */}
        <input type="hidden" {...register("city")} />
        <SearchableDropdown
          options={cities}
          onValueChange={handleCityChange}
          selectedValue={selectedCity}
          placeholder="Cari atau pilih kota..."
          error={errors.city}
        />
        {errors.city && (
          <div className="error-message">{errors.city.message}</div>
        )}
      </div>
    </>
  );
}
