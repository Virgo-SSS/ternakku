import TransactionModel from '../../models/transaction.js';
import { faker } from '@faker-js/faker';

const run = async (total = 1) => {
    try {
        for (let i = 0; i < total; i++) {
            let fakerDate = faker.date.between({ from: '2023-01-01', to: '2024-12-31' });
            fakerDate = fakerDate.toISOString().split('T')[0];

            await TransactionModel.create({
                name: faker.word.sample({ length: { min: 5, max: 7 }, strategy:'closest' }),
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