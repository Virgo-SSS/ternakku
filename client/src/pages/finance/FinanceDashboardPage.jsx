import { useEffect, useState } from "react";
import Chart from "react-apexcharts";
import axios from "../../api/api.js";
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import Flatpickr from "react-flatpickr";

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
        cardColor: '#fff',
        bodyBg: '#f5f5f9',
        bodyColor: '#697a8d',
        headingColor: '#566a7f',
        textMuted: '#a1acb8',
        borderColor: '#eceef1'
    }
};

let cardColor, headingColor, axisColor, borderColor;

cardColor = config.colors.cardColor;
headingColor = config.colors.headingColor;
axisColor = config.colors.axisColor;
borderColor = config.colors.borderColor;

export const FinanceDashboardPage = () => {
    const [transactions, setTransactions] = useState([]);

    useEffect(() => {
        const getTransactions = async () => {
            try {
                const response = await axios.get('/transaction');
                setTransactions(response.data.data);
            } catch (error) {
                withReactContent(Swal).fire({
                    title: 'Error',
                    text: error.response.data.message || error.message || "Something went wrong",
                    icon: 'error',
                    confirmButtonText: 'OK'
                });
            }
        }

        getTransactions();
    }, []);

    // get total income for current month
    const totalIncome = transactions.filter(transaction => transaction.type === 1).reduce((acc, transaction) => acc + transaction.amount, 0);
    const totalExpense = transactions.filter(transaction => transaction.type === 2).reduce((acc, transaction) => acc + transaction.amount, 0);
    const totalBalance = totalIncome - totalExpense;

    return (
        <>
            <div className="d-flex mb-4">
                <Flatpickr 
                    render={
                        ({defaultValue, value, ...props}, ref) => {
                            return <button ref={ref} {...props} className="btn btn-icon btn-outline-primary me-2">
                                <i className="bx bx-calendar"></i>
                            </button>
                        }
                    }
                    options={{ dateFormat: "F Y", defaultDate: new Date() }}
                    onChange={(selectedDates, dateStr, instance) => {
                        console.log(selectedDates, dateStr, instance);
                    }}
                />
                <button className="btn btn-primary">
                    Bulan Ini
                </button>
            </div>
            
            <div className="row">
                {/* sum transactions based on the date */}
                <MonthlyCard title="Total Saldo" money={`Rp. ` + totalBalance} percentage="+3.42%" />
                <MonthlyCard title="Pendapatan" money={"Rp. " + totalIncome} percentage="+3.42%" />
                <MonthlyCard title="Pengeluaran" money={"Rp. " + totalExpense} percentage="-1.42%" />
            </div>

            <div className="row">
                <div className="col-12 col-lg-9 order-2 order-md-3 order-lg-2 mb-4">
                    <MoneyFlow />
                </div>

                <div className="col-12 col-lg-3 order-3 order-md-2 order-lg-3 mb-4">
                </div>
            </div>
            <div className="row">
                <div className="col-lg-12">
                <MonthlyChart />

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
            <div className="col-3 mb-4">
                <div className="card h-100">
                    <div className="card-body">
                        <div className="card-title d-flex align-items-start justify-content-between mb-4">
                            <div className="avatar flex-shrink-0">
                                <img src="../../assets/img/icons/unicons/wallet-info.png" alt="wallet info"
                                    className="rounded" />
                            </div>
                        </div>
                        <p className="mb-1">{title}</p>
                        <h3 className="card-title mb-3">{money}</h3>
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

const MoneyFlow = () => {
    const totalRevenueChartOptions = {
        series: [
            {
                name: '2021',
                data: [18, 7, 15, 29, 18, 12, 9]
            },
            {
                name: '2020',
                data: [-13, -18, -9, -14, -5, -17, -15]
            }
        ],
        chart: {
            stacked: true,
            toolbar: { show: false }
        },
        plotOptions: {
            bar: {
                horizontal: false,
                columnWidth: '33%',
                borderRadius: 12,
                startingShape: 'rounded',
                endingShape: 'rounded'
            }
        },
        colors: [config.colors.primary, config.colors.info],
        dataLabels: {
            enabled: false
        },
        stroke: {
            curve: 'smooth',
            width: 6,
            lineCap: 'round',
            colors: [cardColor]
        },
        legend: {
            show: true,
            horizontalAlign: 'left',
            position: 'top',
            markers: {
                height: 8,
                width: 8,
                radius: 12,
                offsetX: -3
            },
            labels: {
                colors: axisColor
            },
            itemMargin: {
                horizontal: 10
            }
        },
        grid: {
            borderColor: borderColor,
            padding: {
                top: 0,
                bottom: -8,
                left: 20,
                right: 20
            }
        },
        xaxis: {
            categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
            labels: {
                style: {
                    fontSize: '13px',
                    colors: axisColor
                }
            },
            axisTicks: {
                show: false
            },
            axisBorder: {
                show: false
            }
        },
        yaxis: {
            labels: {
                style: {
                    fontSize: '13px',
                    colors: axisColor
                }
            }
        },
        responsive: [
            {
                breakpoint: 1700,
                options: {
                    plotOptions: {
                        bar: {
                            borderRadius: 10,
                            columnWidth: '32%'
                        }
                    }
                }
            },
            {
                breakpoint: 1580,
                options: {
                    plotOptions: {
                        bar: {
                            borderRadius: 10,
                            columnWidth: '35%'
                        }
                    }
                }
            },
            {
                breakpoint: 1440,
                options: {
                    plotOptions: {
                        bar: {
                            borderRadius: 10,
                            columnWidth: '42%'
                        }
                    }
                }
            },
            {
                breakpoint: 1300,
                options: {
                    plotOptions: {
                        bar: {
                            borderRadius: 10,
                            columnWidth: '48%'
                        }
                    }
                }
            },
            {
                breakpoint: 1200,
                options: {
                plotOptions: {
                    bar: {
                    borderRadius: 10,
                    columnWidth: '40%'
                    }
                }
                }
            },
            {
                breakpoint: 1040,
                options: {
                plotOptions: {
                    bar: {
                    borderRadius: 11,
                    columnWidth: '48%'
                    }
                }
                }
            },
            {
                breakpoint: 991,
                options: {
                plotOptions: {
                    bar: {
                    borderRadius: 10,
                    columnWidth: '30%'
                    }
                }
                }
            },
            {
                breakpoint: 840,
                options: {
                plotOptions: {
                    bar: {
                    borderRadius: 10,
                    columnWidth: '35%'
                    }
                }
                }
            },
            {
                breakpoint: 768,
                options: {
                plotOptions: {
                    bar: {
                    borderRadius: 10,
                    columnWidth: '28%'
                    }
                }
                }
            },
            {
                breakpoint: 640,
                options: {
                plotOptions: {
                    bar: {
                    borderRadius: 10,
                    columnWidth: '32%'
                    }
                }
                }
            },
            {
                breakpoint: 576,
                options: {
                plotOptions: {
                    bar: {
                    borderRadius: 10,
                    columnWidth: '37%'
                    }
                }
                }
            },
            {
                breakpoint: 480,
                options: {
                plotOptions: {
                    bar: {
                    borderRadius: 10,
                    columnWidth: '45%'
                    }
                }
                }
            },
            {
                breakpoint: 420,
                options: {
                plotOptions: {
                    bar: {
                    borderRadius: 10,
                    columnWidth: '52%'
                    }
                }
                }
            },
            {
                breakpoint: 380,
                options: {
                plotOptions: {
                    bar: {
                    borderRadius: 10,
                    columnWidth: '60%'
                    }
                }
                }
            }
        ],
        states: {
            hover: {
                filter: {
                  type: 'none'
                }
            },
            active: {
                filter: {
                    type: 'none'
                }
            }
        }
    };

    const growthChartOptions = {
        series: [78],
        labels: ['Growth'],
        chart: {
          type: 'radialBar'
        },
        plotOptions: {
          radialBar: {
            size: 150,
            offsetY: 10,
            startAngle: -150,
            endAngle: 150,
            hollow: {
              size: '55%'
            },
            track: {
              background: cardColor,
              strokeWidth: '100%'
            },
            dataLabels: {
              name: {
                offsetY: 15,
                color: headingColor,
                fontSize: '15px',
                fontWeight: '500',
                fontFamily: 'Public Sans'
              },
              value: {
                offsetY: -25,
                color: headingColor,
                fontSize: '22px',
                fontWeight: '500',
                fontFamily: 'Public Sans'
              }
            }
          }
        },
        colors: [config.colors.primary],
        fill: {
          type: 'gradient',
          gradient: {
            shade: 'dark',
            shadeIntensity: 0.5,
            gradientToColors: [config.colors.primary],
            inverseColors: true,
            opacityFrom: 1,
            opacityTo: 0.6,
            stops: [30, 70, 100]
          }
        },
        stroke: {
          dashArray: 5
        },
        grid: {
          padding: {
            top: -35,
            bottom: -10
          }
        },
        states: {
          hover: {
            filter: {
              type: 'none'
            }
          },
          active: {
            filter: {
              type: 'none'
            }
          }
        }
    };

    const handleFilterChange = (e) => {
        console.log(e.target.value);
    }

    return (
        <>
            <div className="card">
                <div className="row row-bordered g-0">
                    <div className="col-md-8">
                        <h5 className="card-header m-0 me-2 pb-3">Aliran Uang</h5>
                        
                        <div className="px-2">
                            <div>
                                {/* Chart Here */}
                                <Chart
                                    options={totalRevenueChartOptions}
                                    series={totalRevenueChartOptions.series}
                                    type="bar"
                                    height={300}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="col-md-4">
                        <div className="card-body">
                            <div className="text-center">
                                <div className="dropdown">
                                    <div className="btn-group">
                                        <select name="filter" id="" className="btn btn-outline-primary" onChange={handleFilterChange}>
                                            {[...Array(3).keys()].map((year) => {
                                                return (
                                                    <option key={year} value={new Date().getFullYear() - year}>
                                                        {new Date().getFullYear() - year}
                                                    </option>
                                                )
                                            })}
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div id="growthChart">
                            <div>
                                {/* Chart here */}
                                <Chart
                                    options={growthChartOptions}
                                    series={growthChartOptions.series}
                                    type="radialBar"
                                    height={240}
                                />
                            </div>
                        </div>

                        <div className="text-center fw-medium pt-3 mb-2">
                            62% Pertumbuhan Usaha
                        </div>

                        <div className="d-flex px-xxl-4 px-lg-2 p-4 gap-xxl-3 gap-lg-1 gap-3 justify-content-between">
                            <div className="d-flex">
                                <div className="me-2">
                                    <span className="badge bg-label-primary p-2">
                                        <i className="bx bx-dollar text-primary"></i>
                                    </span>
                                </div>
                                <div className="d-flex flex-column">
                                    <small>2024</small>
                                    <h6 className="mb-0">Rp24jt</h6>
                                </div>
                            </div>
                            <div className="d-flex">
                                <div className="me-2">
                                    <span className="badge bg-label-info p-2">
                                        <i className="bx bx-wallet text-info"></i>
                                    </span>
                                </div>
                                <div className="d-flex flex-column">
                                    <small>2024</small>
                                    <h6 className="mb-0">Rp25jt</h6>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

const MonthlyChart = () => {
    // get a list of days in the current month in an array
    // example current month is August 2021, the array will be [1, 2, 3, ..., 31]
    const daysInMonth = new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0).getDate();
    const days = [...Array(daysInMonth).keys()].map(day => day + 1);

    let areaChartConfig = {
        series: [
            {
                name: 'Income',
                data: [
                    [1327359600000,30.95],
                    [1327446000000,31.34],
                    [1327532400000,31.18],
                    [1327618800000,31.05],
                    [1327878000000,31.00],
                    [1327964400000,30.95],
                    [1328050800000,31.24],
                    [1328137200000,31.29],
                    [1328223600000,31.85],
                    [1328482800000,31.86],
                    [1328569200000,32.28],
                    [1344290400000, 32.37],
                    [1344376800000, 32.51],
                    [1344463200000, 32.65],
                    [1344549600000, 32.64],
                    [1344808800000, 32.27],
                    [1344895200000, 32.10],
                    [1344981600000, 32.91],
                    [1345068000000, 33.65],
                    [1345154400000, 33.80],
                    [1345413600000, 33.92],
                    [1345500000000, 33.75],
                    [1346968800000, 32.46],
                    [1347228000000, 32.13],
                    [1347314400000, 32.43],
                    [1347400800000, 32.42],
                    [1347487200000, 32.81],
                    [1347573600000, 33.34],
                    [1347832800000, 33.41],
                    [1347919200000, 32.57],
                    [1348005600000, 33.12],
                    [1348092000000, 34.53],
                    [1348178400000, 33.83],
                    [1348437600000, 33.41],
                    [1348524000000, 32.90],
                    [1348610400000, 32.53],
                    [1348696800000, 32.80],
                    [1348783200000, 32.44],
                    [1349042400000, 32.62],
                    [1349128800000, 32.57],
                    [1349215200000, 32.60],
                    [1349301600000, 32.68],
                    [1349388000000, 32.47],
                    [1349647200000, 32.23],
                    [1349733600000, 31.68],
                    [1349820000000, 31.51],
                    [1349906400000, 31.78],
                    [1349992800000, 31.94],
                    [1350252000000, 32.33],
                    [1359932400000, 38.10],
                    [1360018800000, 38.51],
                    [1360105200000, 38.40],
                    [1360191600000, 38.07],
                    [1360278000000, 39.12],
                    [1360537200000, 38.64],
                    [1360623600000, 38.89],
                    [1360710000000, 38.81],
                    [1360796400000, 38.61],
                    [1360882800000, 38.63],
                    [1361228400000, 38.99],
                    [1361314800000, 38.77],
                    [1361401200000, 38.34],
                    [1361487600000, 38.55],
                    [1361746800000, 38.11],
                    [1361833200000, 38.59],
                    [1361919600000, 39.60],
                ]
            }
        ],
        chart: {
            parentHeightOffset: 0,
            parentWidthOffset: 0,
            toolbar: {
                show: false
            },
        },
        dataLabels: {
            enabled: false
        },
        stroke: {
            width: 2,
            curve: 'smooth'
        },
        legend: {
            show: false,
        },
        markers: {
            size: 2,
            colors: 'green',
            strokeColors: 'green',
            strokeWidth: 3,
            hover: {
                size: 7
            }
        },
        colors: [config.colors.primary],
        fill: {
            type: 'gradient',
            gradient: {
                opacityFrom: 0.5,
                opacityTo: 0.25,
            }
        },
        grid: {
            show: true,
            borderColor: borderColor,
            strokeDashArray: 4,
            padding: {
                top: -20,
                bottom: -8,
                left: -10,
                right: 8
            }
        },
        xaxis: {
            type: 'datetime',
            axisBorder: {
                show: false
            },
            axisTicks: {
                show: false
            },
            labels: {
                show: true,
                style: {
                    fontSize: '13px',
                    colors: axisColor
                }
            }
        },
        yaxis: {
            labels: {
                show: false
            },
        }
    };

    let radialBarConfig = {
        series: [65],
        plotOptions: {
            radialBar: {
                startAngle: 0,
                endAngle: 360,
                strokeWidth: '8',
                hollow: {
                margin: 2,
                    size: '45%'
                },
                track: {
                strokeWidth: '50%',
                    background: borderColor
                },
                dataLabels: {
                    show: true,
                    name: {
                        show: false
                    },
                    value: {
                        formatter: function (val) {
                            return 'Rp.' + parseInt(val);
                        },
                        offsetY: 5,
                        color: '#697a8d',
                        fontSize: '13px',
                        show: true
                    }
                }
            }
        },
        fill: {
            type: 'solid',
            colors: config.colors.primary
        },
        stroke: {
            lineCap: 'round'
        },
        grid: {
            padding: {
                top: -10,
                bottom: -15,
                left: -10,
                right: -10
            }
        },
        states: {
            hover: {
                filter: {
                    type: 'none'
                }   
            },
            active: {
                filter: {
                    type: 'none'
                }
            }
        }
    };
    
    return (
        <>
             <div className="card h-100">
                <div className="card-header nav-align-top" style={{ paddingBottom: "4px" }}>
                    <ul className="nav nav-pills" role="tablist">
                        <li className="nav-item" role="presentation">
                            <button type="button" style={{ padding: "6px", fontSize: "13.6px" }} className="nav-link active" role="tab" data-bs-toggle="tab" data-bs-target="#income-tab" aria-controls="income-tab" aria-selected="true">Pendapatan</button>
                        </li>
                        <li className="nav-item" role="presentation">
                            <button type="button" style={{ padding: "6px", fontSize: "13.6px" }} className="nav-link" role="tab" data-bs-toggle="tab" data-bs-target="#expense-tab" aria-controls="nexpense-tab" aria-selected="false" tabIndex="-1">Pengeluaran</button>
                        </li>
                        <li className="nav-item" role="presentation">
                            <button type="button" style={{ padding: "6px", fontSize: "13.6px" }} className="nav-link" role="tab" data-bs-toggle="tab" data-bs-target="#profit-tab" aria-controls="profit-tab" aria-selected="false" tabIndex="-1">Keuntungan</button>
                        </li>
                    </ul>
                </div>
                <div className="card-body p-0">
                    <div className="tab-content">
                        <div className="tab-pane fade show active" id="income-tab" role="tabpanel" style={{ position: "relative" }}>
                            <div className="d-flex mb-6">
                                <div className="avatar flex-shrink-0 me-3">
                                    <img src="../../assets/img/icons/unicons/wallet-info.png" alt="User" />
                                </div>
                                <div>
                                    <p className="mb-0">Total Balance</p>
                                    <div className="d-flex align-items-center">
                                        <h6 className="mb-0 me-1">$459.10</h6>
                                        <small className="text-success fw-medium">
                                            <i className="bx bx-chevron-up bx-lg"></i>
                                            42.9%
                                        </small>
                                    </div>
                                </div>
                            </div>

                            <div>
                                <div id="incomeChart" style={{ minHeight: "232px" }}>
                                    {/* Chart here */}
                                    <Chart
                                        options={areaChartConfig}
                                        series={areaChartConfig.series}
                                        type="area"
                                        height={215}
                                    />
                                </div>
                            </div>

                            <div className="d-flex align-items-center justify-content-center mt-6 gap-3">
                                <div className="flex-shrink-0" style={{ position: "relative" }}>
                                    <div id="expensesOfWeek" style={{ minHeight: "57.7px" }}>
                                        {/* Chart here */}
                                        <Chart
                                            options={radialBarConfig}
                                            series={radialBarConfig.series}
                                            type="radialBar"
                                            width={60}
                                            height={60}
                                        />
                                    </div>
                                </div>
                                <div>
                                    <h6 className="mb-0">Income this week</h6>
                                    <small>$39k less than last week</small>
                                </div>
                            </div>
                        </div>

                        <div className="tab-pane fade" id="expense-tab" role="tabpanel">
                            <div className="d-flex mb-6">
                                <div className="avatar flex-shrink-0 me-3">
                                    <img src="../../assets/img/icons/unicons/wallet-info.png" alt="User" />
                                </div>
                                <div>
                                    <p className="mb-0">Total Balance</p>
                                    <div className="d-flex align-items-center">
                                        <h6 className="mb-0 me-1">$459.10</h6>
                                        <small className="text-success fw-medium">
                                            <i className="bx bx-chevron-up bx-lg"></i>
                                            42.9%
                                        </small>
                                    </div>
                                </div>
                            </div>

                            <div>
                                <div id="incomeChart" style={{ minHeight: "232px" }}>
                                    {/* Chart here */}
                                    <Chart
                                        options={areaChartConfig}
                                        series={areaChartConfig.series}
                                        type="area"
                                        height={215}
                                    />
                                </div>
                            </div>

                            <div className="d-flex align-items-center justify-content-center mt-6 gap-3">
                                <div className="flex-shrink-0" style={{ position: "relative" }}>
                                    <div id="expensesOfWeek" style={{ minHeight: "57.7px" }}>
                                        {/* Chart here */}
                                        <Chart
                                            options={radialBarConfig}
                                            series={radialBarConfig.series}
                                            type="radialBar"
                                            width={60}
                                            height={60}
                                        />
                                    </div>
                                </div>
                                <div>
                                    <h6 className="mb-0">Pengeluaran Bulan ini</h6>
                                    <small>Rp21jt lebih dari bulan lalu</small>
                                </div>
                            </div>
                        </div>

                        <div className="tab-pane fade" id="profit-tab" role="tabpanel">
                            <div className="d-flex mb-6">
                                <div className="avatar flex-shrink-0 me-3">
                                    <img src="../../assets/img/icons/unicons/wallet-info.png" alt="User" />
                                </div>
                                <div>
                                    <p className="mb-0">Total Balance</p>
                                    <div className="d-flex align-items-center">
                                        <h6 className="mb-0 me-1">$459.10</h6>
                                        <small className="text-success fw-medium">
                                            <i className="bx bx-chevron-up bx-lg"></i>
                                            42.9%
                                        </small>
                                    </div>
                                </div>
                            </div>

                            <div>
                                <div id="incomeChart" style={{ minHeight: "232px" }}>
                                    {/* Chart here */}
                                    <Chart
                                        options={areaChartConfig}
                                        series={areaChartConfig.series}
                                        type="area"
                                        height={215}
                                    />
                                </div>
                            </div>

                            <div className="d-flex align-items-center justify-content-center mt-6 gap-3">
                                <div className="flex-shrink-0" style={{ position: "relative" }}>
                                    <div id="expensesOfWeek" style={{ minHeight: "57.7px" }}>
                                        {/* Chart here */}
                                        <Chart
                                            options={radialBarConfig}
                                            series={radialBarConfig.series}
                                            type="radialBar"
                                            width={60}
                                            height={60}
                                        />
                                    </div>
                                </div>
                                <div>
                                    <h6 className="mb-0">Keuntungan Bulan ini</h6>
                                    <small>Rp21jt lebih dari bulan lalu</small>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}