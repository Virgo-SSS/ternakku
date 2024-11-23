function formatDate(date, format = 'Y-m-d H:i:s') {
    const pad = (num) => String(num).padStart(2, '0');
    
    const year = date.getFullYear();
    const month = pad(date.getMonth() + 1); // Months are 0-based
    const day = pad(date.getDate());
    const hours = pad(date.getHours());
    const minutes = pad(date.getMinutes());
    const seconds = pad(date.getSeconds());

    switch (format) {
        case 'Y-m-d H:i:s':
            return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
        case 'Y-m-d':
            return `${year}-${month}-${day}`;
        case 'H:i:s':
            return `${hours}:${minutes}:${seconds}`;
        default:
            throw new Error('Invalid format');
    }
};

export { formatDate };