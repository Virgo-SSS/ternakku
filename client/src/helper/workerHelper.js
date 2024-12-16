const status = {
    0: 'TIDAK_AKTIF',
    1: 'AKTIF'
}

const getAllStatus = () => {
    return status;
}

const getStatusLabel = (status) => {
    let label;
    status = Number(status);
    
    switch (status) {
        case 0:
            label = 'Tidak Aktif';
            break;
        case 1:
            label = 'Aktif';
            break;
        default:
            label = 'UNKNOWN';
    }

    return label;
}

export default {
    getAllStatus,
    getStatusLabel
}