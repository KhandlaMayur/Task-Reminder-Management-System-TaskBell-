import React, { useState } from 'react';
import '../styles/auth.css';

export default function Register({ onNavigate }) {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    username: '',
    password: '',
    confirmPassword: '',
    phone: '',
    agreeTerms: false,
    agreePrivacy: false,
  });

  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState('');
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState('');
  const [otpExpired, setOtpExpired] = useState(false);
  const [systemStatus, setSystemStatus] = useState('ok');
  const [duplicateCheck, setDuplicateCheck] = useState('ok'); // ok, emailExists, usernameExists, phoneExists
  const [registrationStep, setRegistrationStep] = useState('form'); // form, otp, success
  const [botDetected, setBotDetected] = useState(false);
  const [ageRestriction, setAgeRestriction] = useState(false);

  const validateEmail = (value) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(value);
  };

  const validatePhone = (value) => {
    const phoneRegex = /^[0-9]{10}$/;
    return phoneRegex.test(value);
  };

  const validateUsername = (value) => {
    return value.length >= 3 && value.length <= 20;
  };

  const calculatePasswordStrength = (password) => {
    let strength = 0;
    if (password.length >= 8) strength++;
    if (password.length >= 12) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[a-z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[^a-zA-Z0-9]/.test(password)) strength++;
    return strength;
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));

    if (name === 'password') {
      setPasswordStrength(calculatePasswordStrength(value));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    // Input validation
    if (!formData.fullName.trim()) {
      newErrors.fullName = '❌ Name field is empty';
    }

    if (!formData.email.trim()) {
      newErrors.email = '❌ Email field is empty';
    } else if (!validateEmail(formData.email)) {
      newErrors.email = '❌ Email format is invalid';
    } else if (formData.email.includes(' ')) {
      newErrors.email = '❌ Leading/trailing spaces detected';
    }

    if (!formData.username.trim()) {
      newErrors.username = '❌ Username field is empty';
    } else if (!validateUsername(formData.username)) {
      newErrors.username = '❌ Username must be 3-20 characters';
    }

    if (!formData.password) {
      newErrors.password = '❌ Password field is empty';
    } else if (formData.password.length < 8) {
      newErrors.password = '❌ Minimum length not met (min 8 chars)';
    } else if (!/[A-Z]/.test(formData.password)) {
      newErrors.password = '❌ No uppercase letter';
    } else if (!/[a-z]/.test(formData.password)) {
      newErrors.password = '❌ No lowercase letter';
    } else if (!/[0-9]/.test(formData.password)) {
      newErrors.password = '❌ No number';
    } else if (formData.password.includes(' ')) {
      newErrors.password = '❌ Password contains spaces';
    } else if (formData.password.includes(formData.username)) {
      newErrors.password = '❌ Password contains username';
    } else if (formData.password.includes(formData.email.split('@')[0])) {
      newErrors.password = '❌ Password contains email';
    } else if (/^(password|123456|qwerty|abc123)/i.test(formData.password)) {
      newErrors.password = '❌ Common password detected';
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = '❌ Confirm password is empty';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = '❌ Password & confirm password mismatch';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = '❌ Phone number is empty';
    } else if (!validatePhone(formData.phone)) {
      newErrors.phone = '❌ Phone number invalid (10 digits required)';
    }

    if (!formData.agreeTerms) {
      newErrors.terms = '❌ Terms & Conditions not accepted';
    }

    if (!formData.agreePrivacy) {
      newErrors.privacy = '❌ Privacy policy unchecked';
    }

    if (ageRestriction) {
      newErrors.age = '❌ Age restriction not satisfied (< 18)';
    }

    // System checks
    if (systemStatus === 'serverError') {
      newErrors.system = 'Server error - Please try again later';
    } else if (systemStatus === 'dbError') {
      newErrors.system = 'Database insert failed';
    } else if (systemStatus === 'networkError') {
      newErrors.system = 'Network issue detected';
    }

    // Duplicate checks
    if (duplicateCheck === 'emailExists') {
      newErrors.email = '❌ Email already registered';
    } else if (duplicateCheck === 'usernameExists') {
      newErrors.username = '❌ Username already taken';
    } else if (duplicateCheck === 'phoneExists') {
      newErrors.phone = '❌ Phone number already registered';
    }

    // Security checks
    if (botDetected) {
      newErrors.security = '❌ Bot detected';
    }

    if (formData.email.includes('<') || formData.email.includes('>')) {
      newErrors.security = '❌ XSS attempt detected';
    }

    if (formData.password.includes('<') || formData.password.includes('>')) {
      newErrors.security = '❌ XSS attempt detected in password';
    }

    return newErrors;
  };

  const handleRegister = (e) => {
    e.preventDefault();

    const validationErrors = validateForm();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setSuccess('');
      return;
    }

    // Simulate sending OTP
    setOtpSent(true);
    setRegistrationStep('otp');
    setSuccess('✅ Verification email sent! Check your email for OTP.');
    setErrors({});
  };

  const handleVerifyOtp = (e) => {
    e.preventDefault();

    if (!otp) {
      setErrors({ otp: '❌ OTP not entered' });
      return;
    }

    if (otpExpired) {
      setErrors({ otp: '❌ OTP expired' });
      return;
    }

    if (otp !== '123456') {
      setErrors({ otp: '❌ OTP incorrect' });
      return;
    }

    // Successful registration
    setSuccess('✅ Registration successful!\n✅ Account created and verified\n✅ Auto login enabled\n✅ Welcome email sent\n✅ Profile created successfully');
    setErrors({});
    setRegistrationStep('success');
    // Persist registered user locally (for demo purposes only)
    try {
      const userRecord = {
        fullName: formData.fullName,
        email: formData.email,
        username: formData.username,
        password: formData.password,
        phone: formData.phone,
      };
      localStorage.setItem('taskbell_user', JSON.stringify(userRecord));
    } catch (err) {
      console.warn('Could not save user to localStorage', err);
    }
  };

  const handleResendOtp = () => {
    setOtp('');
    setOtpExpired(false);
    setSuccess('✅ OTP resent to your email');
    setErrors({});
  };

  const getPasswordStrengthText = () => {
    if (passwordStrength === 0) return 'Very Weak';
    if (passwordStrength <= 2) return 'Weak';
    if (passwordStrength <= 4) return 'Medium';
    return 'Strong';
  };

  const getPasswordStrengthColor = () => {
    if (passwordStrength === 0) return '#999';
    if (passwordStrength <= 2) return '#e74c3c';
    if (passwordStrength <= 4) return '#f39c12';
    return '#27ae60';
  };

  if (registrationStep === 'success') {
    return (
      <div className="auth-container register-page">
        <div className="auth-card success-card">
          <div className="success-icon">✅</div>
          <h1>Registration Complete!</h1>
          <p className="auth-subtitle">Your account has been successfully created</p>

          {success && (
            <div className="alert alert-success">
              {success.split('\n').map((line, idx) => (
                <div key={idx}>{line}</div>
              ))}
            </div>
          )}

          <button 
            className="btn btn-primary btn-full" 
            onClick={() => onNavigate && onNavigate('login')}
          >
            Go to Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="auth-container register-page">
      <div className="auth-card">
        <h1>TaskBell Registration</h1>
        <p className="auth-subtitle">Create your account</p>

        {/* Demo controls removed */}

        {/* Error Messages */}
        {Object.keys(errors).length > 0 && (
          <div className="alert alert-error">
            {Object.entries(errors).map(([key, message]) => (
              <div key={key}>{message}</div>
            ))}
          </div>
        )}

        {/* Success Messages */}
        {success && (
          <div className="alert alert-success">
            {success.split('\n').map((line, idx) => (
              <div key={idx}>{line}</div>
            ))}
          </div>
        )}

        {registrationStep === 'form' ? (
          <form onSubmit={handleRegister} className="auth-form">
            {/* Full Name */}
            <div className="form-group">
              <label htmlFor="fullName">Full Name</label>
              <input
                id="fullName"
                type="text"
                name="fullName"
                placeholder="John Doe"
                value={formData.fullName}
                onChange={handleInputChange}
                className={`form-input ${errors.fullName ? 'input-error' : ''}`}
              />
              {errors.fullName && <span className="error-text">{errors.fullName}</span>}
              {!errors.fullName && formData.fullName && <span className="success-text">✅ Name valid</span>}
            </div>

            {/* Email */}
            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <input
                id="email"
                type="email"
                name="email"
                placeholder="user@example.com"
                value={formData.email}
                onChange={handleInputChange}
                className={`form-input ${errors.email ? 'input-error' : ''}`}
              />
              {errors.email && <span className="error-text">{errors.email}</span>}
              {!errors.email && formData.email && validateEmail(formData.email) && (
                <span className="success-text">✅ Email valid</span>
              )}
            </div>

            {/* Username */}
            <div className="form-group">
              <label htmlFor="username">Username</label>
              <input
                id="username"
                type="text"
                name="username"
                placeholder="johndoe (3-20 chars)"
                value={formData.username}
                onChange={handleInputChange}
                className={`form-input ${errors.username ? 'input-error' : ''}`}
              />
              {errors.username && <span className="error-text">{errors.username}</span>}
              {!errors.username && formData.username && validateUsername(formData.username) && (
                <span className="success-text">✅ Username valid</span>
              )}
            </div>

            {/* Password */}
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <div className="password-wrapper">
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  placeholder="Min 8 chars, 1 uppercase, 1 lowercase, 1 number"
                  value={formData.password}
                  onChange={handleInputChange}
                  className={`form-input ${errors.password ? 'input-error' : ''}`}
                />
                <button
                  type="button"
                  className="toggle-password"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? '👁️' : '👁️‍🗨️'}
                </button>
              </div>

              {/* Password Strength Indicator */}
              {formData.password && (
                <div className="password-strength">
                  <div className="strength-bars">
                    {[...Array(6)].map((_, i) => (
                      <div
                        key={i}
                        className="strength-bar"
                        style={{
                          backgroundColor: i < passwordStrength ? getPasswordStrengthColor() : '#ddd',
                        }}
                      ></div>
                    ))}
                  </div>
                  <span className="strength-text" style={{ color: getPasswordStrengthColor() }}>
                    {getPasswordStrengthText()}
                  </span>
                </div>
              )}

              {errors.password && <span className="error-text">{errors.password}</span>}
            </div>

            {/* Confirm Password */}
            <div className="form-group">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <div className="password-wrapper">
                <input
                  id="confirmPassword"
                  type={showConfirmPassword ? 'text' : 'password'}
                  name="confirmPassword"
                  placeholder="Re-enter password"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  className={`form-input ${errors.confirmPassword ? 'input-error' : ''}`}
                />
                <button
                  type="button"
                  className="toggle-password"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? '👁️' : '👁️‍🗨️'}
                </button>
              </div>
              {errors.confirmPassword && <span className="error-text">{errors.confirmPassword}</span>}
              {!errors.confirmPassword && formData.confirmPassword && formData.password === formData.confirmPassword && (
                <span className="success-text">✅ Passwords match</span>
              )}
            </div>

            {/* Phone Number */}
            <div className="form-group">
              <label htmlFor="phone">Phone Number</label>
              <input
                id="phone"
                type="tel"
                name="phone"
                placeholder="1234567890 (10 digits)"
                value={formData.phone}
                onChange={handleInputChange}
                className={`form-input ${errors.phone ? 'input-error' : ''}`}
              />
              {errors.phone && <span className="error-text">{errors.phone}</span>}
              {!errors.phone && formData.phone && validatePhone(formData.phone) && (
                <span className="success-text">✅ Phone valid</span>
              )}
            </div>

            {/* Terms & Conditions */}
            <div className="form-group checkbox-group">
              <label className="checkbox">
                <input
                  type="checkbox"
                  name="agreeTerms"
                  checked={formData.agreeTerms}
                  onChange={handleInputChange}
                />
                I agree to Terms & Conditions
              </label>
              {errors.terms && <span className="error-text">{errors.terms}</span>}
            </div>

            {/* Privacy Policy */}
            <div className="form-group checkbox-group">
              <label className="checkbox">
                <input
                  type="checkbox"
                  name="agreePrivacy"
                  checked={formData.agreePrivacy}
                  onChange={handleInputChange}
                />
                I agree to Privacy Policy
              </label>
              {errors.privacy && <span className="error-text">{errors.privacy}</span>}
            </div>

            {/* Age Verification */}
            <div className="form-group checkbox-group">
              <label className="checkbox">
                <input
                  type="checkbox"
                  checked={!ageRestriction}
                  onChange={(e) => setAgeRestriction(!e.target.checked)}
                />
                I am 18 years or older
              </label>
              {errors.age && <span className="error-text">{errors.age}</span>}
              {!errors.age && !ageRestriction && <span className="success-text">✅ Age verification confirmed</span>}
            </div>

            {/* Submit Button */}
            <button type="submit" className="btn btn-primary btn-full">
              Create Account
            </button>

            {/* Login Link */}
            <div className="form-footer">
              Already have an account? 
              <button 
                type="button"
                className="link"
                onClick={() => onNavigate && onNavigate('login')}
                style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#4aa0a5', textDecoration: 'underline', padding: 0, font: 'inherit' }}
              >
                Sign In
              </button>
            </div>
          </form>
        ) : (
          <form onSubmit={handleVerifyOtp} className="auth-form">
            <div className="otp-section">
              <p className="otp-info">Enter the 6-digit OTP sent to your email</p>
              <div className="form-group">
                <label htmlFor="otp">OTP Code</label>
                <input
                  id="otp"
                  type="text"
                  placeholder="000000"
                  maxLength="6"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value.replace(/[^0-9]/g, ''))}
                  className={`form-input otp-input ${errors.otp ? 'input-error' : ''}`}
                />
                {errors.otp && <span className="error-text">{errors.otp}</span>}
                <div className="field-hint">Test OTP: 123456</div>
              </div>

              {otpExpired && (
                <div className="alert alert-warning">
                  ⏰ OTP has expired. Request a new one.
                </div>
              )}

              <button type="submit" className="btn btn-primary btn-full">
                Verify OTP
              </button>

              <button
                type="button"
                className="btn btn-ghost btn-full"
                onClick={handleResendOtp}
              >
                Resend OTP
              </button>
            </div>
          </form>
        )}
      </div>

      {/* Demo Info */}
      <div className="demo-info">
        <p><strong>Demo Information:</strong></p>
        <p>Test OTP: 123456</p>
        <p>Email: Test any format (user@example.com)</p>
        <p>All validation conditions are demonstrated</p>
      </div>
    </div>
  );
}
