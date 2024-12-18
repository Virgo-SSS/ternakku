const type = {
    1: 'PEMASUKAN',
    2: 'PENGELUARAN'
}

const getAllTransactionTypes = () => {
    return type;
}

const getTransactionTypeLabel = (type) => {
    let label;
    type = Number(type);
    
    switch (type) {
        case 1:
            label = 'Pemasukan';
            break;
        case 2:
            label = 'Pengeluaran';
            break;
        default:
            label = 'UNKNOWN';
    }

    return label;
}

export default {
    getTransactionTypeLabel,
    getAllTransactionTypes
}