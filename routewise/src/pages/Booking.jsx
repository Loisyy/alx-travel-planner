import { useState, useEffect } from "react"
import { useLocation, useNavigate } from "react-router-dom"

const STEPS = ["Passenger Info", "Review", "Confirmation"]

function generateRef() {
  return "RW-" + Date.now().toString(36).toUpperCase() +
         "-" + Math.random().toString(36).substring(2, 5).toUpperCase()
}

// Move Field component outside to prevent recreating on every render
function Field({ id, label, type = "text", value, field, placeholder, children, required, errors, handleChange, inputCls }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="text-[11px] font-semibold text-gray-500 uppercase tracking-wider">
        {label}{required && <span className="text-[#FF7F7F] ml-0.5">*</span>}
      </label>
      {children || (
        <input
          id={id}
          type={type}
          value={value}
          onChange={e => handleChange(field, e.target.value)}
          placeholder={placeholder}
          className={inputCls(field)}
          aria-invalid={!!errors[field]}
          aria-describedby={errors[field] ? `${id}-err` : undefined}
        />
      )}
      {errors[field] && (
        <span id={`${id}-err`} className="text-red-500 text-xs" role="alert">{errors[field]}</span>
      )}
    </div>
  )
}

function Booking() {
  const navigate = useNavigate()
  const { state } = useLocation()
  const flight = state?.flight
  const origin = state?.origin || "???"
  const destination = state?.destination || "???"
  const depDate = state?.depDate || ""
  const passengers = state?.passengers || 1

  const [step, setStep] = useState(0)
  const [bookingRef] = useState(generateRef)

  const [form, setForm] = useState({
    firstName: "", lastName: "", email: "", phone: "",
    passport: "", nationality: "", dob: "",
    seatPref: "no-preference", agree: false,
  })
  const [errors, setErrors] = useState({})

  useEffect(() => { document.title = "Booking — RouteWise" }, [])

  const seg = flight?.itineraries?.[0]?.segments?.[0]
  const airline = flight?.validatingAirlineCodes?.[0] || "N/A"
  const price = flight?.price?.total || "—"
  const currency = flight?.price?.currency || ""
  const duration = flight?.itineraries?.[0]?.duration?.replace("PT", "").replace("H", "h ").replace("M", "m") || "—"
  const depTime = seg?.departure?.at?.split("T")[1]?.slice(0, 5) || "—"
  const arrTime = seg?.arrival?.at?.split("T")[1]?.slice(0, 5) || "—"

  const validate = () => {
    const e = {}
    if (!form.firstName.trim()) e.firstName = "Required"
    if (!form.lastName.trim()) e.lastName = "Required"
    if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email)) e.email = "Valid email required"
    if (!form.phone.trim()) e.phone = "Required"
    if (!form.passport.trim()) e.passport = "Required"
    if (!form.nationality.trim()) e.nationality = "Required"
    if (!form.dob) e.dob = "Required"
    if (!form.agree) e.agree = "You must agree to continue"
    return e
  }

  const handleChange = (field, value) => {
    setForm(f => ({ ...f, [field]: value }))
    if (errors[field]) setErrors(e => ({ ...e, [field]: undefined }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length > 0) { setErrors(errs); return }
    setStep(1)
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const handleConfirm = () => {
    setStep(2)
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  // Clean white input — easy to type, clear focus ring
  const inputCls = (field) =>
    `w-full bg-white border rounded-lg px-3.5 py-2.5 text-sm text-gray-900 placeholder-gray-400 outline-none transition-all duration-200 focus:ring-2 focus:ring-[#019FCD] focus:border-[#019FCD] ${
      errors[field]
        ? "border-red-400 ring-1 ring-red-300"
        : "border-gray-300 hover:border-gray-400"
    }`

  return (
    <div className="min-h-screen bg-gray-50">

      {/* Topbar */}
      <div className="bg-white border-b border-gray-200 px-12 py-4 flex items-center gap-4 sm:px-5">
        <button
          className="flex items-center gap-1.5 px-3 py-1.5 text-gray-600 font-medium text-sm rounded-lg hover:bg-gray-100 hover:text-gray-900 transition-colors duration-200"
          onClick={() => step > 0 ? setStep(s => s - 1) : navigate(-1)}
          aria-label={step > 0 ? "Go back to previous step" : "Go back"}
        >
          ← Back
        </button>
        <span className="font-extrabold text-lg text-gray-900">
          {step === 2 ? "Booking Confirmed" : "Complete Your Booking"}
        </span>
      </div>

      {/* Step indicator */}
      {step < 2 && (
        <nav aria-label="Booking steps" className="flex justify-center py-7 max-w-xl mx-auto px-6">
          {STEPS.slice(0, 2).map((label, i) => (
            <div key={label} className="flex flex-col items-center flex-1 relative">
              {i < 1 && (
                <div className={`absolute top-4 left-1/2 w-full h-0.5 transition-colors duration-300 ${i < step ? "bg-[#019FCD]" : "bg-gray-200"}`} />
              )}
              <div className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold z-10 transition-all duration-300 ${
                i < step ? "bg-[#019FCD] text-white" :
                i === step ? "bg-[#FF7F7F] text-white shadow-[0_0_0_4px_rgba(255,127,127,0.2)]" :
                "bg-gray-200 text-gray-400"
              }`}>
                {i < step ? "✓" : i + 1}
              </div>
              <span className={`text-[11px] font-medium tracking-wide mt-1.5 whitespace-nowrap ${
                i < step ? "text-[#019FCD]" :
                i === step ? "text-[#FF7F7F] font-semibold" :
                "text-gray-400"
              }`}>{label}</span>
            </div>
          ))}
        </nav>
      )}

      {/* ── Confirmation ── */}
      {step === 2 && (
        <div className="max-w-lg mx-auto text-center py-10 px-6" role="main" aria-live="polite">
          <h1 className="font-extrabold text-3xl text-gray-900 mb-2">You're all set!</h1>
          <p className="text-gray-500 mb-8 leading-relaxed">
            Your booking is confirmed. A confirmation email has been sent to{" "}
            <strong className="text-gray-700">{form.email}</strong>.
          </p>

          <div className="bg-white border border-gray-200 rounded-xl p-6 mb-6 text-left shadow-sm">
            <div className="inline-block bg-[#FF7F7F]/10 text-[#FF7F7F] font-extrabold text-xl rounded-lg px-5 py-2 mb-5 tracking-widest">
              {bookingRef}
            </div>
            {[
              ["Route", `${origin} → ${destination}`],
              ["Date", depDate],
              ["Passenger", `${form.firstName} ${form.lastName}`],
              ["Airline", airline],
            ].map(([label, value]) => (
              <div key={label} className="flex justify-between py-2 border-b last:border-b-0 text-sm">
                <span className="text-gray-400">{label}</span>
                <span className="font-semibold text-gray-800">{value}</span>
              </div>
            ))}
            <div className="flex justify-between items-center mt-4 pt-4 border-t-2 border-gray-100">
              <span className="font-bold text-gray-900">Total Paid</span>
              <span className="font-extrabold text-2xl text-[#FF7F7F]">{currency} {price}</span>
            </div>
          </div>

          <div className="flex justify-center gap-3">
            <button
              className="bg-[#FF7F7F] hover:bg-[#df6e6e] text-white rounded-full px-6 py-3 font-semibold transition-colors duration-200"
              onClick={() => navigate("/")}
            >
              Back to Home
            </button>
            <button
              className="bg-white border border-gray-200 text-gray-800 rounded-full px-6 py-3 font-semibold hover:border-[#019FCD] hover:text-[#019FCD] transition-all duration-200"
              onClick={() => navigate("/itinerary")}
            >
              View Itinerary
            </button>
          </div>
        </div>
      )}

      {/* ── Form + Summary ── */}
      {step < 2 && (
        <div className="max-w-6xl mx-auto grid lg:grid-cols-[1fr_360px] gap-6 px-6 pb-16 sm:px-4 sm:grid-cols-1">

          {/* Left: form or review */}
          <div>
            {step === 0 && (
              <form onSubmit={handleSubmit} noValidate className="bg-white rounded-xl border border-gray-200 shadow-sm p-8 sm:p-5">
                <h2 className="text-xl font-extrabold text-gray-900 pb-3 border-b border-gray-100 mb-5 flex items-center gap-2">
                  <span aria-hidden="true">👤</span> Passenger Details
                </h2>

                <div className="grid grid-cols-2 gap-4 sm:grid-cols-1 mb-4">
                  <Field id="bk-fname" label="First Name" field="firstName" value={form.firstName} placeholder="John" required errors={errors} handleChange={handleChange} inputCls={inputCls} />
                  <Field id="bk-lname" label="Last Name" field="lastName" value={form.lastName} placeholder="Doe" required errors={errors} handleChange={handleChange} inputCls={inputCls} />
                </div>

                <div className="grid grid-cols-2 gap-4 sm:grid-cols-1 mb-4">
                  <Field id="bk-email" label="Email Address" type="email" field="email" value={form.email} placeholder="john@example.com" required errors={errors} handleChange={handleChange} inputCls={inputCls} />
                  <Field id="bk-phone" label="Phone Number" type="tel" field="phone" value={form.phone} placeholder="+234 800 000 0000" required errors={errors} handleChange={handleChange} inputCls={inputCls} />
                </div>

                <div className="grid grid-cols-2 gap-4 sm:grid-cols-1 mb-4">
                  <Field id="bk-passport" label="Passport Number" field="passport" value={form.passport} placeholder="A12345678" required errors={errors} handleChange={handleChange} inputCls={inputCls} />
                  <Field id="bk-nat" label="Nationality" field="nationality" value={form.nationality} placeholder="Nigerian" required errors={errors} handleChange={handleChange} inputCls={inputCls} />
                </div>

                <div className="grid grid-cols-2 gap-4 sm:grid-cols-1 mb-5">
                  <Field id="bk-dob" label="Date of Birth" type="date" field="dob" value={form.dob} required errors={errors} handleChange={handleChange} inputCls={inputCls} />
                  <Field id="bk-seat" label="Seat Preference" field="seatPref" value={form.seatPref} errors={errors} handleChange={handleChange} inputCls={inputCls}>
                    <select
                      id="bk-seat"
                      value={form.seatPref}
                      onChange={e => handleChange("seatPref", e.target.value)}
                      className="w-full bg-white border border-gray-300 hover:border-gray-400 rounded-lg px-3.5 py-2.5 text-sm text-gray-900 outline-none focus:ring-2 focus:ring-[#019FCD] focus:border-[#019FCD] transition-all duration-200 cursor-pointer"
                    >
                      <option value="no-preference">No Preference</option>
                      <option value="window">Window</option>
                      <option value="aisle">Aisle</option>
                      <option value="middle">Middle</option>
                    </select>
                  </Field>
                </div>

                <div className="flex items-start gap-3 text-sm text-gray-600 mb-2">
                  <input
                    type="checkbox"
                    id="bk-agree"
                    checked={form.agree}
                    onChange={e => handleChange("agree", e.target.checked)}
                    className="w-4 h-4 mt-0.5 shrink-0 accent-[#FF7F7F] cursor-pointer"
                    aria-describedby={errors.agree ? "bk-agree-err" : undefined}
                  />
                  <label htmlFor="bk-agree" className="cursor-pointer leading-relaxed">
                    I agree to the{" "}
                    <a href="#" className="text-[#019FCD] hover:underline">Terms of Service</a>{" "}
                    and{" "}
                    <a href="#" className="text-[#019FCD] hover:underline">Privacy Policy</a>.
                    I confirm all passenger details are correct.
                  </label>
                </div>
                {errors.agree && (
                  <p id="bk-agree-err" className="text-red-500 text-xs mb-3" role="alert">{errors.agree}</p>
                )}

                <button
                  type="submit"
                  className="w-full bg-[#FF7F7F] hover:bg-[#df6e6e] text-white rounded-xl py-3.5 font-semibold text-[15px] mt-2 transition-colors duration-200 shadow-[0_4px_16px_rgba(255,127,127,0.3)] hover:shadow-[0_6px_24px_rgba(255,127,127,0.4)]"
                >
                  Review Booking →
                </button>
              </form>
            )}

            {step === 1 && (
              <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-8 sm:p-5">
                <h2 className="text-xl font-extrabold text-gray-900 pb-3 border-b border-gray-100 mb-5 flex items-center gap-2">
                  <span aria-hidden="true">📋</span> Review Your Booking
                </h2>
                <div className="mb-6">
                  {[
                    ["Full Name", `${form.firstName} ${form.lastName}`],
                    ["Email", form.email],
                    ["Phone", form.phone],
                    ["Passport", form.passport],
                    ["Nationality", form.nationality],
                    ["Date of Birth", form.dob],
                    ["Seat Preference", form.seatPref],
                  ].map(([label, value]) => (
                    <div key={label} className="flex justify-between py-2.5 border-b border-gray-50 last:border-b-0 text-sm">
                      <span className="text-gray-400">{label}</span>
                      <span className="font-semibold text-gray-800">{value}</span>
                    </div>
                  ))}
                </div>
                <button
                  onClick={handleConfirm}
                  className="w-full bg-[#FF7F7F] hover:bg-[#df6e6e] text-white rounded-xl py-3.5 font-semibold text-[15px] transition-colors duration-200 shadow-[0_4px_16px_rgba(255,127,127,0.3)]"
                >
                  Confirm & Pay {currency} {price} →
                </button>
              </div>
            )}
          </div>

          {/* Right: flight summary */}
          <aside className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 sticky top-20 self-start" aria-label="Flight summary">
            <h2 className="text-[13px] font-extrabold uppercase tracking-wider text-gray-900 border-b border-gray-100 pb-3 mb-4">
              Flight Summary
            </h2>
            <div className="flex items-center justify-between mb-5">
              <div>
                <div className="text-2xl font-extrabold text-gray-900">{origin}</div>
                <div className="text-xs text-gray-400 mt-0.5">{depTime}</div>
              </div>
              <div className="text-right">
                <div className="text-2xl font-extrabold text-gray-900">{destination}</div>
                <div className="text-xs text-gray-400 mt-0.5">{arrTime}</div>
              </div>
            </div>
            {[
              ["Date", depDate],
              ["Airline", airline],
              ["Duration", duration],
              ["Passengers", `${passengers} Adult${passengers > 1 ? "s" : ""}`],
              ["Class", "Economy"],
            ].map(([label, value]) => (
              <div key={label} className="flex justify-between py-2 border-b border-gray-50 last:border-b-0 text-sm">
                <span className="text-gray-400">{label}</span>
                <span className="font-semibold text-gray-800">{value}</span>
              </div>
            ))}
            <div className="flex justify-between items-center mt-4 pt-4 border-t-2 border-gray-100">
              <span className="font-bold text-gray-900">Total</span>
              <span className="font-extrabold text-2xl text-[#FF7F7F]">{currency} {price}</span>
            </div>
          </aside>

        </div>
      )}
    </div>
  )
}

export default Booking