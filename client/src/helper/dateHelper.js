// Function to adjust the date and format it
function formatDate(dateString, format = 'Y-m-d H:i:s') {
    const date = new Date(dateString);

    // Mapping for format tokens to date parts
    const tokens = {
        Y: date.getFullYear(), // Year as 4 digits
        m: String(date.getMonth() + 1).padStart(2, '0'), // Month as 2 digits
        d: String(date.getDate()).padStart(2, '0'), // Day as 2 digits
        H: String(date.getHours()).padStart(2, '0'), // Hours as 2 digits
        i: String(date.getMinutes()).padStart(2, '0'), // Minutes as 2 digits
        s: String(date.getSeconds()).padStart(2, '0'), // Seconds as 2 digits
        F: date.toLocaleString('default', { month: 'long' }) // Full month name
    };

    // Replace tokens in the format string with actual values
    return format.replace(/Y|m|d|H|i|s|F/g, (match) => tokens[match]);
}

export default {
    formatDate
}