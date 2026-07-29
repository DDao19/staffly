export const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

export const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export const phoneRegex = /^(?:\(\d{3}\)\s?|\d{3}[- ]?)\d{3}[- ]?\d{4}$/;

export const zipRegex = /^\d{5}$/;

export const salaryRegex = /^\d+(\.\d{1,2})?$/;

export const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
