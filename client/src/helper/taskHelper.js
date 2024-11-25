const getEventClassBasedOnPriority = (priority) => {
    switch (priority) {
        case 1: // low
            return 'fc-event-success';
        case 2: // medium
            return 'fc-event-warning';
        case 3: // high
            return 'fc-event-danger';
        default:
            return 'fc-event-primary';
    }
}

const getStatusLabel = (status) => {
    switch (status) {
        case 0:
            return 'Pending';
        case 1:
            return 'Dalam Proses';
        case 2:
            return 'Selesai';
        default:
            return 'Tidak Diketahui';
    }
}

const getPriorityLabel = (priority) => {
    switch (priority) {
        case 1:
            return 'Low';
        case 2:
            return 'Medium';
        case 3:
            return 'High';
        default:
            return 'Unknown';
    }
}

export default {
    getEventClassBasedOnPriority,
    getStatusLabel,
    getPriorityLabel
}
