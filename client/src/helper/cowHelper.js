const status = {
    0: 'TIDAK_SEHAT',
    1: 'SEHAT'
}

const getStatusLabel = (status) => {
    let label;
    status = Number(status);
    
    switch (status) {
        case 0:
            label = 'Tidak Sehat';
            break;
        case 1:
            label = 'Sehat';
            break;
        default:
            label = 'UNKNOWN';
    }
    return label;
}

const getStatusKey = (label) => {
    let key;

    switch (label) {
        case 'Tidak Sehat':
            key = 0;
            break;
        case 'Sehat':
            key = 1;
            break;
        default:
            key = -1;
    }
    
    return key;
}

const getAllStatus = () => {
    return status;
}

export default {
    getStatusLabel,
    getStatusKey,
    getAllStatus
}