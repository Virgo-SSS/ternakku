const getTransactionTypeLabel = (type) => {
    switch (type) {
        case 1:
            return 'Pemasukan';
        case 2:
            return 'Pengeluaran';
        default:
            return 'Tidak Diketahui';
    }
}

export default {
    getTransactionTypeLabel
}