import React, { useState } from 'react';
import { User, Lock, Eye, EyeOff, ChevronRight, ShieldCheck, CheckCircle2, AlertCircle } from 'lucide-react';
import { SecurityBadge, TricolorRibbonMedal } from './Emblems';
import { useSakshi } from '../context/SakshiContext';
import { SakshiRole } from '../types/sakshi';

interface LoginFormProps {
  onLoginSuccess?: () => void;
}

export const LoginForm: React.FC<LoginFormProps> = ({ onLoginSuccess }) => {
  const { switchRole, officers } = useSakshi();
  const [officialId, setOfficialId] = useState('OFF-DIST-01');
  const [password, setPassword] = useState('GovSecure@2026');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [loginStep, setLoginStep] = useState<'form' | 'otp' | 'success'>('form');
  const [otpValue, setOtpValue] = useState('482910');
  const [selectedRole, setSelectedRole] = useState<SakshiRole>('district_admin');
  const [notification, setNotification] = useState<string | null>(null);

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!officialId.trim() || !password.trim()) {
      setNotification('Please enter both your Official ID and Password.');
      return;
    }

    setNotification(null);
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      setLoginStep('otp');
    }, 600);
  };

  const handleOtpVerify = (e: React.FormEvent) => {
    e.preventDefault();
    if (otpValue.length < 6) {
      setNotification('Please enter the 6-digit OTP sent to your registered mobile number.');
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setLoginStep('success');
      switchRole(selectedRole);
      if (onLoginSuccess) {
        setTimeout(() => {
          onLoginSuccess();
        }, 800);
      }
    }, 600);
  };

  const handleReset = () => {
    setLoginStep('form');
    setNotification(null);
  };

  return (
    <div className="w-full flex flex-col items-center justify-center relative z-20">
      {/* White Elevated Card (~420px max width) */}
      <div className="w-full max-w-[420px] bg-white rounded-2xl shadow-[0_10px_35px_-8px_rgba(0,0,0,0.09)] border border-slate-100 p-8 sm:p-10 relative">
        
        {/* Top: Shield Security Badge with Laurel Wreath & Tricolor bar */}
        <div className="mb-4">
          <SecurityBadge />
        </div>

        {loginStep === 'form' && (
          <>
            {/* Title & Subtitle */}
            <div className="text-center mb-6">
              <h2 className="text-[23px] font-bold text-[#162E52] tracking-tight">
                Welcome Back
              </h2>
              <p className="text-[13px] text-slate-500 mt-0.5">
                Sign in to continue to your account
              </p>
            </div>

            {notification && (
              <div className="mb-4 p-2.5 rounded-lg bg-amber-50 border border-amber-200 text-amber-800 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 flex-shrink-0 text-amber-600" />
                <span>{notification}</span>
              </div>
            )}

            {/* Login Form Fields */}
            <form onSubmit={handleLoginSubmit} className="space-y-4 text-left">
              
              {/* Role / Clearance Selector for Demo */}
              <div>
                <label className="block text-[13px] font-semibold text-slate-700 mb-1.5">
                  Official Role & Portal
                </label>
                <select
                  value={selectedRole}
                  onChange={(e) => {
                    const r = e.target.value as SakshiRole;
                    setSelectedRole(r);
                    const match = officers.find(o => o.role === r);
                    if (match) setOfficialId(match.id);
                  }}
                  className="w-full py-2 px-3 bg-slate-50 border border-slate-300 rounded-md text-[13px] text-slate-800 focus:outline-none focus:ring-1.5 focus:ring-gov-navy focus:bg-white"
                >
                  <option value="district_admin">1. District Admin (Operations Portal)</option>
                  <option value="central_admin">2. Central Admin (National Command)</option>
                  <option value="investigating_officer">3. Investigating Officer (Case Diary)</option>
                  <option value="womens_safety_officer">4. Women's Safety Record Officer</option>
                  <option value="forensic_officer">5. Evidence & Forensic Officer</option>
                  <option value="prosecuting_officer">6. Legal / Prosecuting Officer</option>
                  <option value="senior_officer">7. Senior Supervisory Officer</option>
                </select>
              </div>

              {/* Field 1: Official ID */}
              <div>
                <label
                  htmlFor="official-id"
                  className="block text-[13px] font-semibold text-slate-700 mb-1.5"
                >
                  Official ID
                </label>
                <div className="relative rounded-md shadow-2xs">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                    <User className="w-4 h-4 stroke-[1.8]" />
                  </div>
                  <input
                    id="official-id"
                    type="text"
                    required
                    value={officialId}
                    onChange={(e) => setOfficialId(e.target.value)}
                    placeholder="Enter your Official ID"
                    className="w-full pl-10 pr-3.5 py-2.5 bg-white border border-slate-300 rounded-md text-[13.5px] text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-1.5 focus:ring-gov-navy focus:border-gov-navy transition-colors"
                  />
                </div>
                <p className="text-[11.5px] text-slate-400 mt-1 pl-0.5">
                  Use your assigned official ID
                </p>
              </div>

              {/* Field 2: Password */}
              <div>
                <label
                  htmlFor="password"
                  className="block text-[13px] font-semibold text-slate-700 mb-1.5"
                >
                  Password
                </label>
                <div className="relative rounded-md shadow-2xs">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                    <Lock className="w-4 h-4 stroke-[1.8]" />
                  </div>
                  <input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    className="w-full pl-10 pr-10 py-2.5 bg-white border border-slate-300 rounded-md text-[13.5px] text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-1.5 focus:ring-gov-navy focus:border-gov-navy transition-colors"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-600 transition-colors"
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                  >
                    {showPassword ? (
                      <EyeOff className="w-4 h-4 stroke-[1.8]" />
                    ) : (
                      <Eye className="w-4 h-4 stroke-[1.8]" />
                    )}
                  </button>
                </div>

                {/* Forgot Password Right-Aligned Link */}
                <div className="flex justify-end mt-1.5">
                  <a
                    href="#forgot-password"
                    onClick={(e) => {
                      e.preventDefault();
                      setNotification('A password reset link has been dispatched to your official nodal officer.');
                    }}
                    className="text-[12px] font-semibold text-[#1B68D2] hover:underline transition-colors"
                  >
                    Forgot Password?
                  </a>
                </div>
              </div>

              {/* Primary Login Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full mt-2 py-2.5 px-4 bg-[#F5821F] hover:bg-[#E06D0B] active:bg-[#C95B00] text-white font-bold text-[14px] rounded-lg shadow-sm flex items-center justify-center gap-1.5 transition-colors cursor-pointer disabled:opacity-75"
              >
                {isLoading ? (
                  <span className="inline-flex items-center gap-2">
                    <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Authenticating...
                  </span>
                ) : (
                  <>
                    <span>Login</span>
                    <ChevronRight className="w-4 h-4 stroke-[2.5]" />
                  </>
                )}
              </button>
            </form>
          </>
        )}

        {/* MFA Verification Screen */}
        {loginStep === 'otp' && (
          <div className="text-center space-y-4 py-2">
            <h2 className="text-xl font-bold text-[#162E52]">MFA Verification</h2>
            <p className="text-xs text-slate-500 leading-relaxed">
              A 6-digit OTP has been dispatched to your registered officer mobile/email for ID <strong>{officialId}</strong>
            </p>
            {notification && (
              <div className="p-2.5 rounded-lg bg-amber-50 border border-amber-200 text-amber-800 text-xs">
                {notification}
              </div>
            )}
            <form onSubmit={handleOtpVerify} className="space-y-4">
              <input
                type="text"
                maxLength={6}
                value={otpValue}
                onChange={(e) => setOtpValue(e.target.value.replace(/\D/g, ''))}
                placeholder="• • • • • •"
                className="w-full text-center tracking-[0.5em] text-xl font-mono py-2.5 bg-slate-50 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gov-navy focus:bg-white"
                autoFocus
              />
              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-2.5 bg-[#162E52] hover:bg-[#0F2A4A] text-white font-bold text-sm rounded-lg transition-colors cursor-pointer"
              >
                {isLoading ? 'Verifying OTP...' : 'Verify & Launch Portal'}
              </button>
              <button
                type="button"
                onClick={handleReset}
                className="text-xs text-slate-500 hover:text-gov-navy underline block mx-auto cursor-pointer"
              >
                Back to credentials
              </button>
            </form>
          </div>
        )}

        {/* Authentication Success Screen */}
        {loginStep === 'success' && (
          <div className="text-center py-4 space-y-3">
            <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-7 h-7" />
            </div>
            <h3 className="text-lg font-bold text-[#162E52]">Access Granted</h3>
            <p className="text-xs text-slate-600">
              Welcome, Officer (ID: {officialId}). Initializing SAKSHI cryptographic investigation workspace...
            </p>
            <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
              <div className="bg-[#138808] h-full rounded-full w-full animate-pulse" />
            </div>
          </div>
        )}

        {/* Multi-Factor Authentication Info Box */}
        <div className="mt-5">
          <div className="p-3.5 bg-[#F0F6FF] border border-[#D6E6FB] rounded-xl flex items-start gap-3 text-left">
            <div className="flex-shrink-0 mt-0.5 text-[#162E52]">
              <ShieldCheck className="w-5 h-5 stroke-[2]" />
            </div>
            <div className="text-[12px] leading-snug">
              <span className="font-bold text-[#162E52] block mb-0.5">
                This system is protected with multi-factor authentication.
              </span>
              <span className="text-slate-600 block">
                You will be asked to verify with OTP after successful password authentication.
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative Tricolor Wave Ribbon & Monument Outlines below the card */}
      <div className="w-full max-w-[420px] -mt-1">
        <TricolorRibbonMedal />
      </div>
    </div>
  );
};
