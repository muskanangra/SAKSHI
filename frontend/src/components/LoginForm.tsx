import React, { useState } from 'react';
import { User, Lock, Eye, EyeOff, ChevronRight, CheckCircle2, AlertCircle, UserPlus } from 'lucide-react';
import { SecurityBadge, TricolorRibbonMedal } from './Emblems';
import { useSakshi } from '../context/SakshiContext';
import { loginApi, signupApi } from '../services/auth';
import { SakshiRole } from '../types/sakshi';

interface LoginFormProps {
  onLoginSuccess?: () => void;
}

export const LoginForm: React.FC<LoginFormProps> = ({ onLoginSuccess }) => {
  const { switchRole } = useSakshi();
  const [activeTab, setActiveTab] = useState<'login' | 'signup'>('login');
  
  // Login State
  const [officialId, setOfficialId] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [notification, setNotification] = useState<{ type: 'error' | 'success'; message: string } | null>(null);

  // Signup State
  const [signupId, setSignupId] = useState('');
  const [signupPassword, setSignupPassword] = useState('');
  const [signupFullName, setSignupFullName] = useState('');
  const [signupEmail, setSignupEmail] = useState('');
  const [signupPhone, setSignupPhone] = useState('');
  const [signupRole, setSignupRole] = useState('POLICE_OFFICER');

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!officialId.trim() || !password.trim()) {
      setNotification({ type: 'error', message: 'Please enter both your Official ID and Password.' });
      return;
    }

    setNotification(null);
    setIsLoading(true);

    try {
      const res = await loginApi(officialId.trim(), password);
      setIsLoading(false);
      setNotification({ type: 'success', message: `Authenticated as ${res.user.full_name} (${res.user.role_title})` });
      
      // Map backend role to frontend SakshiRole
      let targetRole: SakshiRole = 'district_admin';
      const r = res.user.role_name;
      if (r === 'CENTRAL_ADMIN') targetRole = 'central_admin';
      else if (r === 'DISTRICT_ADMIN') targetRole = 'district_admin';
      else if (r === 'POLICE_OFFICER' || r === 'INVESTIGATION_OFFICER') targetRole = 'investigating_officer';
      else if (r === 'EVIDENCE_OFFICER') targetRole = 'forensic_officer';
      else if (r === 'LEGAL_OFFICER') targetRole = 'prosecuting_officer';
      else if (r === 'WOMEN_SAFETY_OFFICER') targetRole = 'womens_safety_officer';

      switchRole(targetRole);
      
      if (onLoginSuccess) {
        setTimeout(() => {
          onLoginSuccess();
        }, 400);
      }
    } catch (err: any) {
      setIsLoading(false);
      setNotification({ type: 'error', message: err.message || 'Login failed. Please verify credentials.' });
    }
  };

  const handleSignupSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!signupId.trim() || !signupPassword.trim() || !signupFullName.trim()) {
      setNotification({ type: 'error', message: 'Please complete all required fields.' });
      return;
    }

    setNotification(null);
    setIsLoading(true);

    try {
      const res = await signupApi({
        official_id: signupId.trim(),
        password: signupPassword,
        full_name: signupFullName.trim(),
        email: signupEmail.trim() || undefined,
        phone: signupPhone.trim() || undefined,
        role_name: signupRole,
        district_code: 'DST-DL-CENTRAL'
      });

      setIsLoading(false);
      setNotification({ type: 'success', message: `Account created for ${res.user.full_name}! Logging in...` });

      let targetRole: SakshiRole = 'district_admin';
      const r = res.user.role_name;
      if (r === 'CENTRAL_ADMIN') targetRole = 'central_admin';
      else if (r === 'DISTRICT_ADMIN') targetRole = 'district_admin';
      else if (r === 'POLICE_OFFICER' || r === 'INVESTIGATION_OFFICER') targetRole = 'investigating_officer';
      else if (r === 'EVIDENCE_OFFICER') targetRole = 'forensic_officer';
      else if (r === 'LEGAL_OFFICER') targetRole = 'prosecuting_officer';
      else if (r === 'WOMEN_SAFETY_OFFICER') targetRole = 'womens_safety_officer';

      switchRole(targetRole);

      if (onLoginSuccess) {
        setTimeout(() => {
          onLoginSuccess();
        }, 500);
      }
    } catch (err: any) {
      setIsLoading(false);
      setNotification({ type: 'error', message: err.message || 'Registration failed.' });
    }
  };

  return (
    <div className="w-full flex flex-col items-center justify-center relative z-20">
      {/* Elevated Card */}
      <div className="w-full max-w-[440px] bg-white rounded-2xl shadow-[0_10px_35px_-8px_rgba(0,0,0,0.09)] border border-slate-100 p-8 sm:p-10 relative">
        
        {/* Top: Shield Security Badge */}
        <div className="mb-4">
          <SecurityBadge />
        </div>

        {/* Dual Mode Tab Selector */}
        <div className="flex border-b border-slate-200 mb-6">
          <button
            type="button"
            onClick={() => { setActiveTab('login'); setNotification(null); }}
            className={`flex-1 py-2 text-xs font-bold text-center border-b-2 transition-colors cursor-pointer ${
              activeTab === 'login'
                ? 'border-[#F5821F] text-[#162E52]'
                : 'border-transparent text-slate-400 hover:text-slate-600'
            }`}
          >
            Official Login
          </button>
          <button
            type="button"
            onClick={() => { setActiveTab('signup'); setNotification(null); }}
            className={`flex-1 py-2 text-xs font-bold text-center border-b-2 transition-colors cursor-pointer ${
              activeTab === 'signup'
                ? 'border-[#F5821F] text-[#162E52]'
                : 'border-transparent text-slate-400 hover:text-slate-600'
            }`}
          >
            Register Officer Account
          </button>
        </div>

        {/* Title */}
        <div className="text-center mb-5">
          <h2 className="text-[22px] font-bold text-[#162E52] tracking-tight">
            {activeTab === 'login' ? 'Official Authentication' : 'Create Officer Account'}
          </h2>
          <p className="text-[12.5px] text-slate-500 mt-0.5">
            {activeTab === 'login' ? 'Sign in to access your role-based portal' : 'Register official credentials'}
          </p>
        </div>

        {/* Notification Alert */}
        {notification && (
          <div className={`mb-4 p-3 rounded-lg border text-xs flex items-center gap-2 ${
            notification.type === 'error'
              ? 'bg-red-50 border-red-200 text-red-800'
              : 'bg-emerald-50 border-emerald-200 text-emerald-800'
          }`}>
            {notification.type === 'error' ? (
              <AlertCircle className="w-4 h-4 flex-shrink-0 text-red-600" />
            ) : (
              <CheckCircle2 className="w-4 h-4 flex-shrink-0 text-emerald-600" />
            )}
            <span>{notification.message}</span>
          </div>
        )}

        {/* TAB 1: LOGIN FORM */}
        {activeTab === 'login' && (
          <form onSubmit={handleLoginSubmit} className="space-y-4 text-left">
            
            {/* Field 1: Official ID */}
            <div>
              <label htmlFor="official-id" className="block text-[13px] font-semibold text-slate-700 mb-1.5">
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
            </div>

            {/* Field 2: Password */}
            <div>
              <label htmlFor="password" className="block text-[13px] font-semibold text-slate-700 mb-1.5">
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
                >
                  {showPassword ? <EyeOff className="w-4 h-4 stroke-[1.8]" /> : <Eye className="w-4 h-4 stroke-[1.8]" />}
                </button>
              </div>
            </div>

            {/* Primary Submit Button */}
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
                  <span>Sign In to Portal</span>
                  <ChevronRight className="w-4 h-4 stroke-[2.5]" />
                </>
              )}
            </button>
          </form>
        )}

        {/* TAB 2: SIGNUP FORM */}
        {activeTab === 'signup' && (
          <form onSubmit={handleSignupSubmit} className="space-y-3.5 text-left">
            <div>
              <label className="block text-[12.5px] font-semibold text-slate-700 mb-1">
                Official ID *
              </label>
              <input
                type="text"
                required
                value={signupId}
                onChange={(e) => setSignupId(e.target.value)}
                placeholder="Enter Official ID"
                className="w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-[13px] text-slate-800 focus:outline-none focus:ring-1.5 focus:ring-gov-navy"
              />
            </div>

            <div>
              <label className="block text-[12.5px] font-semibold text-slate-700 mb-1">
                Full Name & Rank *
              </label>
              <input
                type="text"
                required
                value={signupFullName}
                onChange={(e) => setSignupFullName(e.target.value)}
                placeholder="Enter Official Name"
                className="w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-[13px] text-slate-800 focus:outline-none focus:ring-1.5 focus:ring-gov-navy"
              />
            </div>

            <div>
              <label className="block text-[12.5px] font-semibold text-slate-700 mb-1">
                Password *
              </label>
              <input
                type="password"
                required
                value={signupPassword}
                onChange={(e) => setSignupPassword(e.target.value)}
                placeholder="Create password"
                className="w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-[13px] text-slate-800 focus:outline-none focus:ring-1.5 focus:ring-gov-navy"
              />
            </div>

            <div>
              <label className="block text-[12.5px] font-semibold text-slate-700 mb-1">
                Role & Jurisdiction *
              </label>
              <select
                value={signupRole}
                onChange={(e) => setSignupRole(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-md text-[13px] text-slate-800 focus:outline-none focus:ring-1.5 focus:ring-gov-navy"
              >
                <option value="POLICE_OFFICER">Police Officer (FIR Filing)</option>
                <option value="INVESTIGATION_OFFICER">Investigating Officer (Case Diary)</option>
                <option value="EVIDENCE_OFFICER">Evidence & Forensic Officer</option>
                <option value="LEGAL_OFFICER">Legal / Prosecuting Officer</option>
                <option value="WOMEN_SAFETY_OFFICER">Women's Safety Officer</option>
                <option value="DISTRICT_ADMIN">District Admin</option>
                <option value="CENTRAL_ADMIN">Central Admin</option>
              </select>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-[12px] font-medium text-slate-600 mb-1">
                  Official Email
                </label>
                <input
                  type="email"
                  value={signupEmail}
                  onChange={(e) => setSignupEmail(e.target.value)}
                  placeholder="officer@sakshi.gov.in"
                  className="w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-[12px] text-slate-800 focus:outline-none focus:ring-1.5 focus:ring-gov-navy"
                />
              </div>
              <div>
                <label className="block text-[12px] font-medium text-slate-600 mb-1">
                  Phone
                </label>
                <input
                  type="tel"
                  value={signupPhone}
                  onChange={(e) => setSignupPhone(e.target.value)}
                  placeholder="+91 98765 00000"
                  className="w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-[12px] text-slate-800 focus:outline-none focus:ring-1.5 focus:ring-gov-navy"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full mt-3 py-2.5 px-4 bg-[#162E52] hover:bg-[#0F2A4A] text-white font-bold text-[14px] rounded-lg shadow-sm flex items-center justify-center gap-1.5 transition-colors cursor-pointer disabled:opacity-75"
            >
              {isLoading ? (
                <span>Registering Account...</span>
              ) : (
                <>
                  <UserPlus className="w-4 h-4" />
                  <span>Create Officer Account</span>
                </>
              )}
            </button>
          </form>
        )}
      </div>

      {/* Decorative Ribbon */}
      <div className="w-full max-w-[440px] -mt-1">
        <TricolorRibbonMedal />
      </div>
    </div>
  );
};
