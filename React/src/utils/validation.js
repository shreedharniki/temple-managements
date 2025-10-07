// utils/validation.js
export function validateAdminForm(form, isEdit = false) {
  // Required fields (ignore password if editing and left blank)
  if (!form.name || !form.email || !form.phone || !form.temple_id) {
    return { valid: false, message: "❌ Please fill all required fields" };
  }

  // Name validation: letters & spaces only, at least 3 chars
  if (!/^[A-Za-z ]{3,}$/.test(form.name)) {
    return {
      valid: false,
      message: "❌ Name must contain only letters and be at least 3 characters",
    };
  }

  // Email validation
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
    return { valid: false, message: "❌ Enter a valid email address" };
  }

  // Phone validation: exactly 10 digits
  if (!/^\d{10}$/.test(form.phone)) {
    return { valid: false, message: "❌ Phone number must be exactly 10 digits" };
  }

  // Password validation (only if adding, or if password provided during edit)
  if (!isEdit || (isEdit && form.password)) {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!passwordRegex.test(form.password)) {
      return {
        valid: false,
        message:
          "❌ Password must be at least 8 characters long, include uppercase, lowercase, number, and special character",
      };
    }
  }

  return { valid: true };
}



export function validateTempleForm(form) {
  // Required fields
  if (!form.name || !form.location) {
    return { valid: false, message: "❌ Please fill all required fields" };
  }

  // Name validation: letters & spaces only, at least 3 chars
  if (!/^[A-Za-z ]{3,}$/.test(form.name)) {
    return {
      valid: false,
      message: "❌ Temple Name must contain only letters and be at least 3 characters",
    };
  }

  // Optional: description length check
  if (form.description && form.description.length > 250) {
    return {
      valid: false,
      message: "❌ Description cannot exceed 250 characters",
    };
  }

  return { valid: true };
}