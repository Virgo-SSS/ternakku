import transactionSeeder from './transactionSeeder.js'

const seed = async () => {
    console.log('Seeding started...');

    await transactionSeeder.run(50);

    console.log('Seeding completed');
    process.exit();
}

seed();