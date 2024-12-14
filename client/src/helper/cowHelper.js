const status = {
    0: 'TIDAK_SEHAT',
    1: 'SEHAT'
}

const getStatusLabel = (status) => {
    let label;

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

export default {
    getStatusLabel,
    getStatusKey
}