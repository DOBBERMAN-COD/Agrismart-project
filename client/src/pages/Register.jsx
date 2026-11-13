
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Register() {
  const navigate = useNavigate();

  // Form state
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
    location: "",
    role: "",
  });

  // UI state
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Update form fields
  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previousData) => ({
      ...previousData,
      [name]: value,
    }));
  };

  // Submit registration form
  const handleSubmit = async (event) => {
    event.preventDefault();

    setErrorMessage("");

    // Check password confirmation
    if (formData.password !== formData.confirmPassword) {
      setErrorMessage("Passwords do not match.");
      return;
    }

    try {
      setIsSubmitting(true);

      const response = await fetch(
        "http://localhost:5000/api/auth/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: formData.name,
            email: formData.email,
            password: formData.password,
            phone: formData.phone,
            location: formData.location,
            role: formData.role,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Registration failed. Please try again."
        );
      }

      // Redirect to login after successful registration
      navigate("/login", {
        state: {
          successMessage:
            "Your account was created successfully. Please log in.",
        },
      });
    } catch (error) {
      console.error("Registration error:", error);
      setErrorMessage(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-md-8 col-lg-6">
          <div className="card shadow-sm border-0">
            <div className="card-body p-4 p-md-5">

              <h2 className="text-center mb-2">
                Create Your Account
              </h2>

              <p className="text-muted text-center mb-4">
                Join AgriSmart and become part of the agricultural
                waste marketplace.
              </p>

              {errorMessage && (
                <div className="alert alert-danger" role="alert">
                  {errorMessage}
                </div>
              )}

              <form onSubmit={handleSubmit}>

                {/* Full name */}
                <div className="mb-3">
                  <label htmlFor="name" className="form-label">
                    Full Name
                  </label>

                  <input
                    type="text"
                    id="name"
                    name="name"
                    className="form-control"
                    placeholder="Enter your full name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>

                {/* Email */}
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">
                    Email Address
                  </label>

                  <input
                    type="email"
                    id="email"
                    name="email"
                    className="form-control"
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>

                {/* Phone */}
                <div className="mb-3">
                  <label htmlFor="phone" className="form-label">
                    Phone Number
                  </label>

                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    className="form-control"
                    placeholder="Enter your phone number"
                    value={formData.phone}
                    onChange={handleChange}
                  />
                </div>

                {/* Location */}
                <div className="mb-3">
                  <label htmlFor="location" className="form-label">
                    Location
                  </label>

                  <input
                    type="text"
                    id="location"
                    name="location"
                    className="form-control"
                    placeholder="e.g. Nyeri, Kenya"
                    value={formData.location}
                    onChange={handleChange}
                  />
                </div>

                {/* Role */}
                <div className="mb-3">
                  <label htmlFor="role" className="form-label">
                    Account Type
                  </label>

                  <select
                    id="role"
                    name="role"
                    className="form-select"
                    value={formData.role}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select your account type</option>
                    <option value="farmer">Farmer</option>
                    <option value="buyer">Buyer</option>
                    <option value="driver">Driver</option>
                  </select>
                </div>

                {/* Password */}
                <div className="mb-4">
                    <label htmlFor="password" className="form-label">
                      Password
                    </label>

                    <div className="input-group">
                      <input
                        type={showPassword ? "text" : "password"}
                        className="form-control"
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        placeholder="Create a password"
                        required
                      />

                      <button
                        type="button"
                        className="btn btn-outline-secondary"
                        onClick={() => setShowPassword((previous) => !previous)}
                      >
                        {showPassword ? "Hide" : "Show"}
                      </button>
                </div>
              </div>

                {/* Confirm password */}
               <div className="mb-4">
                    <label htmlFor="confirmPassword" className="form-label">
                      Confirm Password
                    </label>

                    <div className="input-group">
                      <input
                        type={showConfirmPassword ? "text" : "password"}
                        className="form-control"
                        id="confirmPassword"
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        placeholder="Enter your password again"
                        required
                      />

                      <button
                        type="button"
                        className="btn btn-outline-secondary"
                        onClick={() =>
                          setShowConfirmPassword((previous) => !previous)
                        }
                      >
                        {showConfirmPassword ? "Hide" : "Show"}
                      </button>
              </div>
            </div>

                <button
                  type="submit"
                  className="btn btn-success w-100"
                  disabled={isSubmitting}
                >
                  {isSubmitting
                    ? "Creating Account..."
                    : "Create Account"}
                </button>

              </form>

              <p className="text-center mt-4 mb-0">
                Already have an account?{" "}
                <Link to="/login">Log in</Link>
              </p>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
