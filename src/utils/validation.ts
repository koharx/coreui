import { useI18n } from '../contexts/I18nContext';

export interface ValidationRule {
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  pattern?: RegExp;
  email?: boolean;
  url?: boolean;
  min?: number;
  max?: number;
  custom?: (value: any) => string | null;
}

export interface ValidationRules {
  [key: string]: ValidationRule;
}

export interface ValidationErrors {
  [key: string]: string;
}

export const useValidation = () => {
  const { t } = useI18n();

  const validateField = (value: any, rules: ValidationRule): string | null => {
    if (rules.required && !value) {
      return t('error.required');
    }

    if (value) {
      if (rules.minLength && value.length < rules.minLength) {
        return t('error.minLength', { min: rules.minLength });
      }

      if (rules.maxLength && value.length > rules.maxLength) {
        return t('error.maxLength', { max: rules.maxLength });
      }

      if (rules.pattern && !rules.pattern.test(value)) {
        return t('error.pattern');
      }

      if (rules.email && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) {
        return t('error.email');
      }

      if (rules.url && !/^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/.test(value)) {
        return t('error.url');
      }

      if (rules.min !== undefined && Number(value) < rules.min) {
        return t('error.min', { min: rules.min });
      }

      if (rules.max !== undefined && Number(value) > rules.max) {
        return t('error.max', { max: rules.max });
      }

      if (rules.custom) {
        return rules.custom(value);
      }
    }

    return null;
  };

  const validateForm = (values: Record<string, any>, rules: ValidationRules): ValidationErrors => {
    const errors: ValidationErrors = {};

    Object.keys(rules).forEach((field) => {
      const error = validateField(values[field], rules[field]);
      if (error) {
        errors[field] = error;
      }
    });

    return errors;
  };

  const isFormValid = (errors: ValidationErrors): boolean => {
    return Object.keys(errors).length === 0;
  };

  return {
    validateField,
    validateForm,
    isFormValid,
  };
};

export const commonValidationRules: ValidationRules = {
  email: {
    required: true,
    email: true,
  },
  password: {
    required: true,
    minLength: 8,
    pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
  },
  name: {
    required: true,
    minLength: 2,
    maxLength: 50,
  },
  phone: {
    pattern: /^\+?[\d\s-()]+$/,
  },
  url: {
    url: true,
  },
  number: {
    min: 0,
  },
}; 