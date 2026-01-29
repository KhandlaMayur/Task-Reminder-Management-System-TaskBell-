import React, { useState } from 'react';
import '../styles/auth.css';

export default function Login({ onNavigate }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState('');
  const [loginAttempts, setLoginAttempts] = useState(0);
  const [isAccountLocked, setIsAccountLocked] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [sessionActive, setSessionActive] = useState(false);
  const [userStatus, setUserStatus] = useState('active'); // active, inactive, deleted, notFound, passwordMismatch
  const [systemStatus, setSystemStatus] = useState('ok'); // ok, serverError, dbError, networkError, maintenance
  const [showCaptcha, setShowCaptcha] = useState(false);
  const [captchaVerified, setCaptchaVerified] = useState(false);
  const [sessionExpired, setSessionExpired] = useState(false);
  const [multiDeviceLogin, setMultiDeviceLogin] = useState(false);

  const validateEmail = (value) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(value);
  };

  const validatePassword = (value) => {
    return value.length >= 8;
  };

  const handleLogin = (e) => {
    e.preventDefault();
    const newErrors = {};

    // Session checks
    if (sessionActive) {
      setErrors({ session: 'Session already active. Please logout first.' });
      return;
    }

    if (sessionExpired) {
      setErrors({ session: 'Session expired. Please login again.' });
      return;
    }

    // System status checks
    if (systemStatus === 'serverError') {
      setErrors({ system: 'Server not responding. Please try again later.' });
      return;
    }
    if (systemStatus === 'dbError') {
      setErrors({ system: 'Database connection failed. Please try again later.' });
      return;
    }
    if (systemStatus === 'networkError') {
      setErrors({ system: 'Network issue detected. Check your connection.' });
      return;
    }
    if (systemStatus === 'maintenance') {
      setErrors({ system: 'System under maintenance. Please try again later.' });
      return;
    }

    // Account locked check
    if (isAccountLocked) {
      setErrors({ account: 'Account temporarily locked. Try again after 15 minutes.' });
      return;
    }

    // Input validation
    if (!email.trim()) {
      newErrors.email = '❌ Email/Username field is empty';
    } else if (email.includes(' ')) {
      newErrors.email = '❌ Leading/trailing spaces detected';
    } else if (!validateEmail(email)) {
      newErrors.email = '❌ Email format is invalid (use: abc@xyz.com)';
    }

    if (!password.trim()) {
      newErrors.password = '❌ Password field is empty';
    } else if (password.length < 8) {
      newErrors.password = '❌ Password length is less than minimum (< 8 chars)';
    } else if (/^\s+$/.test(password)) {
      newErrors.password = '❌ Password contains spaces only';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setSuccess('');
      return;
    }

    // CAPTCHA required after multiple failed attempts
    if (loginAttempts >= 3 && !showCaptcha) {
      setShowCaptcha(true);
      setErrors({ captcha: 'Too many failed login attempts. CAPTCHA required.' });
      return;
    }

    if (showCaptcha && !captchaVerified) {
      setErrors({ captcha: 'CAPTCHA verification required' });
      return;
    }

    // SQL Injection & XSS attempt detection
    if (email.includes('<') || email.includes('>') || email.includes(';') || email.includes('--')) {
      setErrors({ security: 'SQL Injection attempt detected' });
      return;
    }

    if (password.includes('<') || password.includes('>')) {
      setErrors({ security: 'XSS input detected' });
      return;
    }

    // Authenticate against locally stored registered user (no database)
    let storedUser = null;
    try {
      storedUser = JSON.parse(localStorage.getItem('taskbell_user'));
    } catch (err) {
      storedUser = null;
    }

    if (!storedUser) {
      // No registered user found
      setLoginAttempts(loginAttempts + 1);
      newErrors.user = '❌ No registered user found. Please register first.';
    } else if (email !== storedUser.email) {
      // Email mismatch
      setLoginAttempts(loginAttempts + 1);
      newErrors.email = '❌ Email not registered. Please check or register.';
    } else if (password !== storedUser.password) {
      // Password mismatch
      setLoginAttempts(loginAttempts + 1);
      if (loginAttempts + 1 >= 5) {
        setIsAccountLocked(true);
        newErrors.account = '❌ Too many failed attempts. Account locked for 15 minutes.';
      } else if (loginAttempts + 1 >= 3) {
        setShowCaptcha(true);
        newErrors.password = `❌ Password is incorrect (${5 - loginAttempts - 1} attempts remaining)`;
      } else {
        newErrors.password = `❌ Password is incorrect (${5 - loginAttempts - 1} attempts remaining)`;
      }
    } else {
      // Successful login
      setSuccess('✅ Login successful! Redirecting to dashboard...');
      setErrors({});
      setLoginAttempts(0);
      setShowCaptcha(false);
      setCaptchaVerified(false);
      if (rememberMe) {
        setSuccess(prev => prev + '\n✅ Remember Me enabled');
      }
      setSessionActive(true);
      // navigate back to home/landing
      setTimeout(() => {
        if (onNavigate) onNavigate('home');
      }, 800);
      return;
    }

    setErrors(newErrors);
    setSuccess('');
  };

  const handleVerifyCaptcha = () => {
    setCaptchaVerified(true);
    setShowCaptcha(false);
    setErrors({});
  };

  return (
    <div className="auth-container login-page">
      <div className="auth-card">
        <h1>TaskBell Login</h1>
        <p className="auth-subtitle">Sign in to your account</p>

        {/* Demo controls removed */}

        {/* Success Message */}
        {success && (
          <div className="alert alert-success">
            {success.split('\n').map((line, idx) => (
              <div key={idx}>{line}</div>
            ))}
          </div>
        )}

        {/* Error Messages */}
        {Object.keys(errors).length > 0 && (
          <div className="alert alert-error">
            {Object.entries(errors).map(([key, message]) => (
              <div key={key}>{message}</div>
            ))}
          </div>
        )}

        {/* Account Locked Warning */}
        {isAccountLocked && (
          <div className="alert alert-warning">
            🔒 Account temporarily locked. Try again after 15 minutes.
          </div>
        )}

        <form onSubmit={handleLogin} className="auth-form">
          {/* Email Field */}
          <div className="form-group">
            <label htmlFor="email">Email or Username</label>
            <input
              id="email"
              type="email"
              placeholder="user@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={`form-input ${errors.email ? 'input-error' : ''}`}
              disabled={isAccountLocked}
            />
            {errors.email && <span className="error-text">{errors.email}</span>}
            {!errors.email && email && <span className="success-text">✅ Valid email format</span>}
          </div>

          {/* Password Field */}
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <div className="password-wrapper">
              <input
                id="password"
                type={showPassword ? 'text' : 'password'}
                placeholder="Enter password (min 8 chars)"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={`form-input ${errors.password ? 'input-error' : ''}`}
                disabled={isAccountLocked}
              />
              <button
                type="button"
                className="toggle-password"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? '👁️' : '👁️‍🗨️'}
              </button>
            </div>
            {errors.password && <span className="error-text">{errors.password}</span>}
            {!errors.password && password && password.length >= 8 && (
              <span className="success-text">✅ Password meets requirements</span>
            )}
          </div>

          {/* CAPTCHA Section */}
          {showCaptcha && (
            <div className="captcha-section">
              <label>CAPTCHA Verification</label>
              <div className="captcha-box">
                <p>🤖 I'm not a robot</p>
                <div className="captcha-content">
                  <input type="checkbox" onChange={handleVerifyCaptcha} />
                  <span>I'm not a robot</span>
                </div>
              </div>
            </div>
          )}

          {/* Remember Me */}
          <div className="form-group checkbox-group">
            <label className="checkbox">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                disabled={isAccountLocked}
              />
              Remember me on this device
            </label>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="btn btn-primary btn-full"
            disabled={isAccountLocked || sessionExpired}
          >
            {isAccountLocked ? '🔒 Account Locked' : 'Sign In'}
          </button>

          {/* Forgot Password */}
          <div className="form-footer">
            <a href="#forgot-password" className="link">Forgot Password?</a>
            <a href="#register" className="link">Create Account</a>
          </div>
        </form>

        {/* Registration Suggestion */}
        <div className="registration-suggestion">
          <p>Don't have an account yet?</p>
          <button 
            type="button" 
            className="btn btn-ghost btn-full"
            onClick={() => onNavigate && onNavigate('register')}
          >
            Create New Account
          </button>
        </div>

        {/* Login Attempts Counter */}
        {loginAttempts > 0 && (
          <div className="attempts-counter">
            Failed attempts: {loginAttempts}/5
            <div className="attempts-bar">
              <div className="attempts-fill" style={{ width: `${(loginAttempts / 5) * 100}%` }}></div>
            </div>
          </div>
        )}
      </div>

      {/* demo-info removed: login verifies against registered details */}
    </div>
  );
}
