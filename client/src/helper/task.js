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

export default getEventClassBasedOnPriority;
