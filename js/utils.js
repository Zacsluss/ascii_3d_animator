/**
 * Common utility functions
 * @module utils
 */

/**
 * Debounce function to limit how often a function can run
 * @param {Function} func - The function to debounce
 * @param {number} wait - The delay in milliseconds
 * @returns {Function} The debounced function
 */
export function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

/**
 * Validate file size
 * @param {File} file - The file to validate
 * @param {number} maxSizeMB - Maximum file size in megabytes
 * @returns {boolean} True if file is within size limit
 */
export function validateFileSize(file, maxSizeMB) {
  const maxBytes = maxSizeMB * 1024 * 1024;
  return file.size <= maxBytes;
}

/**
 * Validate file extension
 * @param {File} file - The file to validate
 * @param {string[]} allowedExtensions - Array of allowed extensions (e.g., ['.glb', '.gltf'])
 * @returns {boolean} True if file extension is allowed
 */
export function validateFileExtension(file, allowedExtensions) {
  const fileName = file.name.toLowerCase();
  return allowedExtensions.some((ext) => fileName.endsWith(ext));
}
