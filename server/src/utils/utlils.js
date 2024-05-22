// Ensure ID is numeric
function isValidId(id) {
    return /^\d+$/.test(id); 
}

module.exports = {
    isValidId
};