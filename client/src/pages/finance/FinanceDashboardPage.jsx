import { useEffect, useState } from "react";
import Chart from "react-apexcharts";
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import useAxiosPrivate from "../../hooks/useAxiosPrivate.jsx";

let config = {
    colors: {
        primary: '#696cff',
        secondary: '#8592a3',
        success: '#71dd37',
        info: '#03c3ec',
        warning: '#ffab00',
        danger: '#ff3e1d',
        dark: '#233446',
        black: '#000',
        white: '#fff',
        bodyBg: '#f5f5f9',
        bodyColor: '#697a8d',
        headingColor: '#566a7f',
        textMuted: '#a1acb8',
        borderColor: '#eceef1'
    }
};

export const FinanceDashboardPage = () => {
    return (
        <>
            <div className="row g-0">
                <Monthly />
            </div>

            <div className="row">
                <div className="col-12 col-lg-9 order-2 order-md-3 order-lg-2 mb-4">
                    <ProfitAndLossStatement />
                </div>

                <div className="col-12 col-lg-3 order-3 order-md-2 order-lg-3 mb-4">
                    <Category />
                </div>
            </div>
        </>
    )
}

const Monthly = () => {
    const axiosPrivate = useAxiosPrivate();
    const [transactions, setTransactions] = useState([]);
    const [selectedMonth, setSelectedMonth] = useState(new Date().getFullYear() + '-' + String(new Date().getMonth() + 1).padStart(2, '0'));
    const [isLoading, setIsLoading] = useState(false);

    const getTransactions = async () => {
        try {
            setIsLoading(true);

            const response = await axiosPrivate.get('/transaction', {
                params: {
                    date: selectedMonth
                }
            });

            setTransactions(response.data.data);
            setIsLoading(false);
        } catch (error) {
            withReactContent(Swal).fire({
                title: 'Error',
                text: error.response?.data?.message || error.message || 'Something went wrong',
                icon: 'error',
                confirmButtonText: 'OK'
            });
        }
    }

    const handleMonthChange = (e) => {
        setSelectedMonth(e.target.value);
    }

    useEffect(() => {
        getTransactions();
    },  [selectedMonth]);

    // get total income for current month
    const totalIncome = transactions.filter(transaction => transaction.type === 1).reduce((acc, transaction) => acc + transaction.amount, 0);
    const totalExpense = transactions.filter(transaction => transaction.type === 2).reduce((acc, transaction) => acc + transaction.amount, 0);
    const totalBalance = totalIncome - totalExpense;

    return (
        <>
            {/* sum transactions based on the date */}
            <MonthlyCard title="Total Saldo" money={`Rp. ` + totalBalance} percentage="+3.42%" />
            <MonthlyCard title="Pendapatan" money={"Rp. " + totalIncome} percentage="+3.42%" />
            <MonthlyCard title="Pengeluaran" money={"Rp. " + totalExpense} percentage="-1.42%" />

            <div className="col-md-3 mb-4">
                <div className="card h-100">
                    <div className="card-body d-flex flex-column align-items-center">
                        <div className="dropdown mb-4">
                            <select className="form-select" onChange={handleMonthChange} value={selectedMonth}>
                                {
                                    [...Array(8).keys()].map((month) => {
                                        let date = new Date();
                                        date.setMonth(date.getMonth() - month);
                                        let monthYear = date.toLocaleString('default', { month: 'long' }) + ' ' + date.getFullYear();
                                        let monthYearValue = date.getFullYear() + '-' + String(date.getMonth() + 1).padStart(2, '0');
                                        return (
                                            <option key={month} value={monthYearValue}>{monthYear}</option>
                                        );
                                    })
                                }
                            </select>
                        </div>
                        
                        {isLoading && (
                            <div className="spinner-border text-primary" role="status">
                                <span className="visually-hidden">Loading...</span>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    )
}

const MonthlyCard = ({title, money, percentage}) => {
    const minus = {
        'text': 'text-danger',
        'icon': 'bx-down-arrow-alt'
    }

    const plus = {
        'text': 'text-success',
        'icon': 'bx-up-arrow-alt'
    }

    if(percentage.includes('-')) {
        percentage = percentage.replace('-', '');
        percentage = percentage + '%';
        percentage = <span className={minus.text}><i className={`bx ${minus.icon}`}></i> {percentage}</span>
    } else {
        percentage = percentage + '%';
        percentage = <span className={plus.text}><i className={`bx ${plus.icon}`}></i> {percentage}</span>
    }

    return (
        <>
            <div className="col-md-3 mb-4">
                <div className="card h-100">
                    <div className="card-body">
                        <div className="card-title d-flex align-items-start justify-content-between mb-4">
                            <div className="avatar flex-shrink-0">
                                <img src="../../assets/img/icons/wallet-info.png" alt="wallet info"
                                    className="rounded" />
                            </div>
                        </div>
                        <p className="mb-1">{title}</p>
                        <h3 className="card-title mb-3">
                            {
                                money.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
                            }
                        </h3>
                        <div className="d-flex align-items-center">
                            <div className="d-flex align-items-center">
                                <i className="bx bx-line-chart me-1"></i>
                                <span>{percentage}</span>
                            </div>
                        </div>  
                    </div>
                </div>
            </div>
        </>
    )
}

const Category = () => {
    const axiosPrivate = useAxiosPrivate();
    const [transactions, setTransactions] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [selectedMonth, setSelectedMonth] = useState(new Date().getFullYear() + '-' + String(new Date().getMonth() + 1).padStart(2, '0'));

    const handleMonthChange = (value) => {
        setSelectedMonth(value);
    }

    useEffect(() => {
        const getTransactions = async () => {
            try {
                setIsLoading(true);

                const response = await axiosPrivate.get('/transaction', {
                    params: {
                        date: selectedMonth
                    }
                });

                setTransactions(response.data.data);
                setIsLoading(false);
            } catch (error) {
                withReactContent(Swal).fire({
                    title: 'Error',
                    text: error.response?.data?.message || error.message || 'Something went wrong',
                    icon: 'error',
                    confirmButtonText: 'OK'
                });
            }
        }

        getTransactions();
    }, [selectedMonth]);

    let income = transactions.filter(transaction => transaction.type === 1);
    let incomePercentages = calculateCategoryPercentages(income);
    let incomeSeries = incomePercentages.map(item => item.total);
    let incomeLabels = incomePercentages.map(item => item.category);

    let expense = transactions.filter(transaction => transaction.type === 2);
    let expensePercentages = calculateCategoryPercentages(expense);
    let expenseSeries = expensePercentages.map(item => item.total);
    let expenseLabels = expensePercentages.map(item => item.category);

    let incomeChartOptions = {
        series: incomeSeries,
        labels: incomeLabels,
        colors: [config.colors.primary, config.colors.secondary, config.colors.success, config.colors.info, config.colors.warning, config.colors.danger],
        legend: {
            position: 'bottom',
            labels: {
                colors: 'black'
            }
        },
        dataLabels: {
            enabled: true,
            formatter: function (val) {
                return val.toFixed(2) + "%"
            },
        },
    }

    let expenseChartOptions = {
        series: expenseSeries,
        labels: expenseLabels,
        colors: [config.colors.primary, config.colors.secondary, config.colors.success, config.colors.info, config.colors.warning, config.colors.danger],
        legend: {
            position: 'bottom',
            labels: {
                colors: 'black'
            }
        },
        dataLabels: {
            enabled: true,
            formatter: function (val) {
                return val.toFixed(2) + "%"
            },
        },
    }
    
    return (
        <>
            <div className="card h-100">
                <div className="card-header d-flex align-items-center justify-content-between">
                    <div>
                        <h6 className="card-title mb-1">Berdasarkan Kategori</h6>
                        {/* show loading */}
                        {isLoading && (
                            <div className="spinner-border text-primary" role="status">
                                <span className="visually-hidden">Loading...</span>
                            </div>
                        )}
                        <ul className="nav nav-pills" role="tablist">
                            <li className="nav-item" role="presentation">
                                <button type="button" style={{ padding: "6px", fontSize: "13.6px" }} className="nav-link active" role="tab" data-bs-toggle="tab" data-bs-target="#income-tab" aria-controls="income-tab" aria-selected="true">Pendapatan</button>
                            </li>
                            <li className="nav-item" role="presentation">
                                <button type="button" style={{ padding: "6px", fontSize: "13.6px" }} className="nav-link" role="tab" data-bs-toggle="tab" data-bs-target="#expense-tab" aria-controls="nexpense-tab" aria-selected="false" tabIndex="-1">Pengeluaran</button>
                            </li>
                        </ul>
                    </div>
                    <div className="dropdown d-none d-sm-flex">
                        <button type="button" className="btn dropdown-toggle px-0" data-bs-toggle="dropdown" aria-expanded="false">
                            <i className="bx bx-calendar"></i>
                        </button>
                        <ul className="dropdown-menu dropdown-menu-end">
                            {
                                [...Array(3).keys()].map((month) => {
                                    let date = new Date();
                                    date.setMonth(date.getMonth() - month);
                                    let monthYear = date.toLocaleString('default', { month: 'long' }) + ' ' + date.getFullYear();
                                    let monthYearValue = date.getFullYear() + '-' + String(date.getMonth() + 1).padStart(2, '0');
                                    return (
                                        <li key={month} onClick={handleMonthChange.bind(this, monthYearValue)}>
                                            <a href="#" className="dropdown-item d-flex align-items-center">{monthYear}</a>
                                        </li>
                                    );
                                })
                            }
                        </ul>
                    </div>
                </div>
                <div className="card-body">
                    <div className="tab-content">
                        <div className="tab-pane fade show active" id="income-tab" role="tabpanel" style={{ position: "relative" }}>
                            <div>
                                <div id="incomeChart">
                                    {/* Chart here */}
                                    <Chart 
                                        type="donut"
                                        options={incomeChartOptions}
                                        series={incomeChartOptions.series}
                                        height={250}
                                        width={250}
                                    />
                                </div>
                                <div className="d-flex align-items-center justify-content-center mt-6 gap-3">
                                    <div>
                                        <h6 className="mb-0">
                                            {new Date(selectedMonth).toLocaleString('default', { month: 'long' }) + ' ' + new Date(selectedMonth).getFullYear()}
                                        </h6>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="tab-pane fade" id="expense-tab" role="tabpanel">
                            <div>
                                <div id="incomeChart">
                                    {/* Chart here */}
                                    <Chart 
                                        type="donut"
                                        options={expenseChartOptions}
                                        series={expenseChartOptions.series}
                                        height={250}
                                        width={250}
                                    />
                                </div>
                                <div className="d-flex align-items-center justify-content-center mt-6 gap-3">
                                    <div>
                                        <h6 className="mb-0">
                                            {new Date(selectedMonth).toLocaleString('default', { month: 'long' }) + ' ' + new Date(selectedMonth).getFullYear()}
                                        </h6>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

const ProfitAndLossStatement = () => {
    const axiosPrivate = useAxiosPrivate();
    const [transactions, setTransactions] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [selectedYear, setselectedYear] = useState(new Date().getFullYear());

    const handleMonthChange = (value) => {
        setselectedYear(value);
    }

    useEffect(() => {
        const getTransactions = async () => {
            try {
                setIsLoading(true);

                const response = await axiosPrivate.get('/transaction', {
                    params: {
                        date: selectedYear
                    }
                });

                setTransactions(response.data.data);
                setIsLoading(false);
            } catch (error) {
                withReactContent(Swal).fire({
                    title: 'Error',
                    text: error.response?.data?.message || error.message || 'Something went wrong',
                    icon: 'error',
                    confirmButtonText: 'OK'
                });
            }
        }

        getTransactions();
    }, [selectedYear]);

    // calculate profit and loss statement for each month
    let profitLossStatement = transactions.reduce((acc, transaction) => {
        let month = new Date(transaction.date).toLocaleString('default', { month: 'numeric' });
        let income = transaction.type === 1 ? transaction.amount : 0;
        let expense = transaction.type === 2 ? transaction.amount : 0;
        let profit = income - expense;

        acc[month] = (acc[month] || 0) + profit;
        return acc;
    }, {});

    let data = Object.entries(profitLossStatement).map(([month, profit]) => ({
        x: new Date(selectedYear, month - 1).toLocaleString('default', { month: 'long' }),
        y: profit
    }));

    let statementOptions = {
        series: [
            {
                name: 'Profit',
                data: data
            }
        ],
        colors: [config.colors.primary],
        dataLabels: {
            enabled: false,
        },
        plotOptions: {
            bar: {
                horizontal: false,
                columnWidth: '20%',
                borderRadius: 5,
                borderRadiusApplication: 'end'
            },
        },
        colors: [
            function({ value, seriesIndex, w }) {
                return value > 0 ? config.colors.success : config.colors.danger;
            }, 
        ],
        tooltip: {
            y: {
                formatter: function (val) {
                    return "Rp " + val;
                }
            }
        },
    }

    return (
        <>
            <div className="card h-100">
                <div className="card-header d-flex align-items-center justify-content-between">
                    <div>
                        <h6 className="card-title mb-1">Profit and Loss Statement {selectedYear}</h6>
                        <p className="card-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                    </div>
                    {
                        isLoading && (
                            <div className="spinner-border text-primary" role="status">
                                <span className="visually-hidden">Loading...</span>
                            </div>
                        )
                    }
                    <div className="dropdown d-none d-sm-flex">
                        <button type="button" className="btn dropdown-toggle px-0" data-bs-toggle="dropdown" aria-expanded="false">
                            <i className="bx bx-calendar"></i>
                        </button>
                        <ul className="dropdown-menu dropdown-menu-end">
                            {
                                [...Array(3).keys()].map((year) => {
                                    let date = new Date();
                                    date.setFullYear(date.getFullYear() - year);
                                    return (
                                        <li key={year} onClick={handleMonthChange.bind(this, date.getFullYear())}>
                                            <a href="#" className="dropdown-item d-flex align-items-center">{date.getFullYear()}</a>
                                        </li>
                                    );
                                })
                               
                            }
                        </ul>
                    </div>
                </div>
                <div className="card-body">
                    {
                        transactions.length === 0 ? (
                            <div className="d-flex align-items-center justify-content-center">
                                <h6 className="text-muted">No data available</h6>
                            </div>
                        ) : (
                            <div id="profitLossChart">
                                <Chart 
                                    type="bar"
                                    options={statementOptions}
                                    series={statementOptions.series}
                                    height={300}
                                />
                            </div>
                        )
                    }
                   
                </div>
            </div>
        </>
    )
}

const calculateCategoryPercentages = (data) => {

    // Step 1: Group by category and calculate total for each
    const categoryTotals = data.reduce((acc, transaction) => {
        acc[transaction.category_name] = (acc[transaction.category_name] || 0) + transaction.amount;
        return acc;
    }, {});
  
    // Step 2: Calculate overall total
    const overallTotal = Object.values(categoryTotals).reduce((acc, amount) => acc + amount, 0);
  
    // Step 3: Calculate percentages
    const percentages = Object.entries(categoryTotals).map(([category, total]) => ({
        category,
        total,
        percentage: ((total / overallTotal) * 100).toFixed(2), // Keep 2 decimal points
    }));
  
    return percentages;
};