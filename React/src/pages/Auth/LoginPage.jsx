import React, { useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";
import Alert from "../../components/ui/Alert";
import { loginUser, forgotPassword, verifyOtp, resetPassword, setStep } from "../../store/authSlice";
import "./LoginPage.css";

export default function LoginPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { step, loading, alert, user,token } = useSelector((state) => state.auth);

  const formRef = useRef({ email: "", password: "", otp: "", newPassword: "" });
  const inputsRef = useRef([]);

  const handleChange = (e) => (formRef.current[e.target.name] = e.target.value);

  // OTP input handler
  const handleOtpChange = (value, idx) => {
    if (/^[0-9]?$/.test(value)) {
      const otpArr = formRef.current.otp.split("");
      otpArr[idx] = value;
      formRef.current.otp = otpArr.join("");
      if (value && idx < 5) inputsRef.current[idx + 1]?.focus();
    }
  };

  // Redirect to Dashboard after successful login
 useEffect(() => {
  if (token) navigate("/dashboard");
}, [token, navigate]);

  return (
    <div className="login-container">
      <div className="login-card">
        <h2>
          🔑 {step === "login" ? "Login" : step === "forgot" ? "Forgot Password" : step === "otp" ? "Verify OTP" : "Reset Password"}
        </h2>

        {alert && <Alert type={alert.type} message={alert.message} />}

        {loading && <p className="loading-text">⏳ Processing...</p>}

        {step === "login" && (
          <>
            <Input label="Email" name="email" onChange={handleChange} placeholder="Enter email" />
            <Input label="Password" type="password" name="password" onChange={handleChange} placeholder="Enter password" />
            <Button onClick={() => dispatch(loginUser({ email: formRef.current.email, password: formRef.current.password }))}>
              Login
            </Button>
            <Button variant="secondary" onClick={() => dispatch(setStep("forgot"))}>
              Forgot Password?
            </Button>
          </>
        )}

        {step === "forgot" && (
          <>
            <Input label="Email" name="email" onChange={handleChange} placeholder="Enter email" />
            <Button onClick={() => dispatch(forgotPassword(formRef.current.email))}>Send OTP</Button>
            <Button variant="secondary" onClick={() => dispatch(setStep("login"))}>Back to Login</Button>
          </>
        )}

        {step === "otp" && (
          <>
            <p className="otp-instruction">Enter the 6-digit code sent to your email</p>
            <div className="otp-inputs">
              {[...Array(6)].map((_, idx) => (
                <input
                  key={idx}
                  type="text"
                  maxLength="1"
                  value={formRef.current.otp[idx] || ""}
                  onChange={(e) => handleOtpChange(e.target.value, idx)}
                  ref={(el) => (inputsRef.current[idx] = el)}
                />
              ))}
            </div>
            <Button onClick={() => dispatch(verifyOtp({ email: formRef.current.email, otp: formRef.current.otp }))}>
              Verify OTP
            </Button>
            <Button variant="secondary" onClick={() => dispatch(setStep("forgot"))}>Back</Button>
          </>
        )}

        {step === "reset" && (
          <>
            <Input label="New Password" type="password" name="newPassword" onChange={handleChange} placeholder="Enter new password" />
            <Button onClick={() => dispatch(resetPassword({ email: formRef.current.email, otp: formRef.current.otp, newPassword: formRef.current.newPassword }))}>
              Reset Password
            </Button>
            <Button variant="secondary" onClick={() => dispatch(setStep("login"))}>Back to Login</Button>
          </>
        )}
      </div>
    </div>
  );
}
