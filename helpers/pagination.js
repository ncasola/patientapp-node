/**
 * @function calculateLimitAndOffset
 * @param {number} currentPage page number to get
 * @param {number} pageLimit number of items per page/request
 * @returns {object} returns object containing limit and offset
 */
 module.exports.calculateLimitAndOffset = (currentPage, pageLimit = 10) => {
  const offset = (currentPage ? Number(currentPage) - 1 : 0) * Number(pageLimit);
  const limit = Number(pageLimit);
  return { offset, limit };
};