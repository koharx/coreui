import React, { createContext, useContext, useState, useEffect } from "react";
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

interface I18nContextType {
  currentLanguage: string;
  isRTL: boolean;
  changeLanguage: (language: string) => void;
  t: (key: string, options?: any) => string;
}

const I18nContext = createContext<I18nContextType | undefined>(undefined);

const resources = {
  en: {
    translation: {
      // Common
      "common.loading": "Loading...",
      "common.error": "An error occurred",
      "common.success": "Success",
      "common.cancel": "Cancel",
      "common.save": "Save",
      "common.delete": "Delete",
      "common.edit": "Edit",
      "common.create": "Create",
      "common.search": "Search",
      "common.filter": "Filter",
      "common.sort": "Sort",
      "common.actions": "Actions",

      // Auth
      "auth.login": "Login",
      "auth.logout": "Logout",
      "auth.register": "Register",
      "auth.forgotPassword": "Forgot Password?",
      "auth.resetPassword": "Reset Password",
      "auth.email": "Email",
      "auth.password": "Password",
      "auth.confirmPassword": "Confirm Password",
      "auth.rememberMe": "Remember Me",

      // Navigation
      "nav.dashboard": "Dashboard",
      "nav.profile": "Profile",
      "nav.settings": "Settings",
      "nav.users": "Users",
      "nav.roles": "Roles",
      "nav.permissions": "Permissions",

      // Errors
      "error.required": "This field is required",
      "error.email": "Please enter a valid email",
      "error.password": "Password must be at least 8 characters",
      "error.passwordMatch": "Passwords do not match",
      "error.invalidCredentials": "Invalid email or password",
      "error.sessionExpired": "Your session has expired",

      // Success
      "success.saved": "Changes saved successfully",
      "success.deleted": "Item deleted successfully",
      "success.created": "Item created successfully",
    },
  },
  ar: {
    translation: {
      // Common
      "common.loading": "جاري التحميل...",
      "common.error": "حدث خطأ",
      "common.success": "نجاح",
      "common.cancel": "إلغاء",
      "common.save": "حفظ",
      "common.delete": "حذف",
      "common.edit": "تعديل",
      "common.create": "إنشاء",
      "common.search": "بحث",
      "common.filter": "تصفية",
      "common.sort": "ترتيب",
      "common.actions": "إجراءات",

      // Auth
      "auth.login": "تسجيل الدخول",
      "auth.logout": "تسجيل الخروج",
      "auth.register": "تسجيل",
      "auth.forgotPassword": "نسيت كلمة المرور؟",
      "auth.resetPassword": "إعادة تعيين كلمة المرور",
      "auth.email": "البريد الإلكتروني",
      "auth.password": "كلمة المرور",
      "auth.confirmPassword": "تأكيد كلمة المرور",
      "auth.rememberMe": "تذكرني",

      // Navigation
      "nav.dashboard": "لوحة التحكم",
      "nav.profile": "الملف الشخصي",
      "nav.settings": "الإعدادات",
      "nav.users": "المستخدمين",
      "nav.roles": "الأدوار",
      "nav.permissions": "الصلاحيات",

      // Errors
      "error.required": "هذا الحقل مطلوب",
      "error.email": "الرجاء إدخال بريد إلكتروني صحيح",
      "error.password": "يجب أن تكون كلمة المرور 8 أحرف على الأقل",
      "error.passwordMatch": "كلمات المرور غير متطابقة",
      "error.invalidCredentials": "البريد الإلكتروني أو كلمة المرور غير صحيحة",
      "error.sessionExpired": "انتهت صلاحية الجلسة",

      // Success
      "success.saved": "تم حفظ التغييرات بنجاح",
      "success.deleted": "تم الحذف بنجاح",
      "success.created": "تم الإنشاء بنجاح",
    },
  },
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: "en",
    interpolation: {
      escapeValue: false,
    },
  });

export const I18nProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [currentLanguage, setCurrentLanguage] = useState(i18n.language);
  const [isRTL, setIsRTL] = useState(currentLanguage === "ar");

  useEffect(() => {
    const handleLanguageChange = (lng: string) => {
      setCurrentLanguage(lng);
      setIsRTL(lng === "ar");
      document.documentElement.dir = lng === "ar" ? "rtl" : "ltr";
      document.documentElement.lang = lng;
    };

    i18n.on("languageChanged", handleLanguageChange);
    return () => {
      i18n.off("languageChanged", handleLanguageChange);
    };
  }, []);

  const changeLanguage = (language: string) => {
    i18n.changeLanguage(language);
  };

  return (
    <I18nContext.Provider
      value={{
        currentLanguage,
        isRTL,
        changeLanguage,
        t: i18n.t,
      }}
    >
      {children}
    </I18nContext.Provider>
  );
};

export const useI18n = () => {
  const context = useContext(I18nContext);
  if (context === undefined) {
    throw new Error("useI18n must be used within an I18nProvider");
  }
  return context;
};
