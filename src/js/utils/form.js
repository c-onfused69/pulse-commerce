// Form Validation Utilities
export function validateForm(form) {
  let isValid = true;
  const requiredFields = form.querySelectorAll('[required]');
  
  requiredFields.forEach(field => {
    if (!field.value.trim()) {
      markInvalid(field, 'This field is required');
      isValid = false;
    } else {
      markValid(field);
      
      // Special validations
      if (field.type === 'email' && !validateEmail(field.value)) {
        markInvalid(field, 'Please enter a valid email');
        isValid = false;
      }
    }
  });
  
  return isValid;
}

function markInvalid(field, message) {
  const formGroup = field.closest('.form-group');
  if (!formGroup) return;
  
  // Add error class
  formGroup.classList.add('invalid');
  
  // Create or update error message
  let error = formGroup.querySelector('.error-message');
  if (!error) {
    error = document.createElement('div');
    error.className = 'error-message';
    formGroup.appendChild(error);
  }
  error.textContent = message;
}

function markValid(field) {
  const formGroup = field.closest('.form-group');
  if (formGroup) {
    formGroup.classList.remove('invalid');
    
    const error = formGroup.querySelector('.error-message');
    if (error) error.remove();
  }
}

function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

