import TransactionModel from '../../models/transaction.js';
import { faker } from '@faker-js/faker';

const run = async (total = 1) => {
    try {
        const transactions = [
            { title: "Membeli sapi baru" },
            { title: "Menjual sapi potong" },
            { title: "Membeli pakan sapi" },
            { title: "Membayar dokter hewan untuk pemeriksaan sapi" },
            { title: "Menjual susu sapi" },
            { title: "Membeli vitamin untuk sapi" },
            { title: "Memperbaiki kandang sapi" },
            { title: "Membayar pekerja peternakan" },
            { title: "Menjual pupuk dari kotoran sapi" },
            { title: "Membeli alat pemerah susu" },
            { title: "Membeli obat cacing untuk sapi" },
            { title: "Menyewa truk pengangkut sapi" },
            { title: "Membayar inseminasi buatan" },
            { title: "Menjual sapi anakan" },
            { title: "Membeli sapi bakalan" },
            { title: "Membeli jerami sebagai pakan tambahan" },
            { title: "Menjual kulit sapi" },
            { title: "Membeli peralatan kebersihan kandang" },
            { title: "Menyewa lahan untuk peternakan" },
            { title: "Menjual tanduk sapi" },
            { title: "Membeli bibit rumput gajah" },
            { title: "Membayar pajak peternakan" },
            { title: "Membeli mesin pengolah kotoran sapi" },
            { title: "Menjual lemak sapi" },
            { title: "Membeli alat penimbang sapi" },
            { title: "Menjual sapi kurban" },
            { title: "Membeli pagar untuk kandang sapi" },
            { title: "Membeli alat pemotong rumput" },
            { title: "Menjual sapi perah tua" },
            { title: "Membayar biaya listrik peternakan" },
            { title: "Menjual sapi untuk acara adat" },
            { title: "Membeli bak penampung air untuk sapi" },
            { title: "Menyewa tenaga ahli kesehatan ternak" },
            { title: "Menjual daging sapi segar" },
            { title: "Membeli semen sapi unggulan" },
            { title: "Membeli ember untuk minum sapi" },
            { title: "Menjual sapi yang tidak produktif" },
            { title: "Membayar biaya transportasi sapi" },
            { title: "Menjual produk olahan susu sapi" },
            { title: "Membeli alat pemotong tanduk sapi" },
            { title: "Membeli suplemen nutrisi untuk sapi" },
            { title: "Menjual sapi pejantan" },
            { title: "Membeli obat luka untuk sapi" },
            { title: "Membeli alas kandang sapi" },
            { title: "Menjual sapi betina tua" },
            { title: "Membayar biaya pelatihan pengelolaan peternakan" },
            { title: "Membeli buku panduan peternakan sapi" },
            { title: "Membeli lampu pemanas untuk kandang sapi" },
            { title: "Menjual susu sapi pasteurisasi" }
        ];

        for (let i = 0; i < total; i++) {
            let fakerDate = faker.date.between({ from: '2023-01-01', to: '2024-12-31' });
            fakerDate = fakerDate.toISOString().split('T')[0];

            await TransactionModel.create({
                name: transactions[faker.number.int({ min: 0, max: transactions.length - 1 })].title,
                date: fakerDate,
                category: faker.number.int({ min: 1, max: 10 }),
                amount: faker.number.int({ min: 500000, max: 10000000 }),
                type: faker.number.int({ min: 1, max: 2 }),
                notes: faker.lorem.sentence(6),
            });
        }

        return;
    } catch (error) {
        console.error(error);
    }
}

export default {
    run
}