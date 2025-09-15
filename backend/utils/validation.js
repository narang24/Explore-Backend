const validateStudent = (data) => {
  const errors = {};
  
  if (!data.rollNumber || data.rollNumber.trim().length < 3) {
    errors.rollNumber = 'Roll number is required and must be at least 3 characters';
  }
  
  if (!data.password || data.password.length < 6) {
    errors.password = 'Password must be at least 6 characters';
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
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};

module.exports = { validateStudent, validateClub };