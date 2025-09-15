const validateStudent = (data) => {
  const errors = {};
  
  if (!data.rollNumber || data.rollNumber.trim().length < 3) {
    errors.rollNumber = 'Roll number is required and must be at least 3 characters';
  }
  
  if (!data.password || data.password.length < 6) {
    errors.password = 'Password must be at least 6 characters';
  }

  // Additional validation for registration
  if (data.name !== undefined) {
    if (!data.name || data.name.trim().length < 2) {
      errors.name = 'Name is required and must be at least 2 characters';
    }
  }

  if (data.email !== undefined) {
    const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (!data.email || !emailRegex.test(data.email)) {
      errors.email = 'Please enter a valid email';
    }
  }

  if (data.department !== undefined) {
    if (!data.department || data.department.trim().length < 2) {
      errors.department = 'Department is required';
    }
  }

  if (data.year !== undefined) {
    if (!data.year || data.year < 1 || data.year > 4) {
      errors.year = 'Year must be between 1 and 4';
    }
  }
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};

const validateClub = (data) => {
  const errors = {};
  
  if (!data.clubName || data.clubName.trim().length < 2) {
    errors.clubName = 'Club name is required and must be at least 2 characters';
  }
  
  if (!data.adminPassword || data.adminPassword.length < 6) {
    errors.adminPassword = 'Admin password must be at least 6 characters';
  }

  // Additional validation for registration
  if (data.description !== undefined) {
    if (!data.description || data.description.trim().length < 10) {
      errors.description = 'Description is required and must be at least 10 characters';
    }
  }

  if (data.category !== undefined) {
    const validCategories = ['Technical', 'Cultural', 'Sports', 'Academic', 'Social', 'Other'];
    if (!data.category || !validCategories.includes(data.category)) {
      errors.category = 'Please select a valid category';
    }
  }
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};

module.exports = { validateStudent, validateClub };