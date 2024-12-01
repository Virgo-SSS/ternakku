import { useEffect, useState } from "react";
import Chart from "react-apexcharts";
import { Link } from "react-router-dom";

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

let cardColor, headingColor, axisColor, shadeColor, borderColor;

cardColor = config.colors.cardColor;
headingColor = config.colors.headingColor;
axisColor = config.colors.axisColor;
borderColor = config.colors.borderColor;

export const FinanceDashboardPage = () => {
    return (
        <>
            <div className="d-flex justify-content-end mb-4">
                <Link to="/transaction/create">
                    <button className="btn btn-primary">Input Data</button>
                </Link>
            </div>

            <div className="row">
                <MoneyCard title="Total Saldo" money="Rp. 25.000.000" percentage="+3.42%" />
                <MoneyCard title="Pengeluaran" money="Rp. 20.000.000" percentage="-1.42%" />
                <MoneyCard title="Pendapatan" money="Rp. 24.000.000" percentage="+3.42%" />
                <MoneyCard title="Penghematan" money="Rp. 5.000.000" percentage="+3.42%" />
            </div>

            <div className="row">
                <div className="col-12 col-lg-9 order-2 order-md-3 order-lg-2 mb-4">
                    <MoneyFlow />
                </div>

                <div className="col-12 col-lg-3 order-3 order-md-2 order-lg-3 mb-4">
                    <MoneyCardChart />
                </div>
            </div>
        </>
    )
}

const MoneyCard = ({title, money, percentage}) => {
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
                                    <button aria-label='Years selection 2022'
                                        className="btn btn-sm btn-outline-primary dropdown-toggle" type="button"
                                        id="growthReportId" data-bs-toggle="dropdown" aria-haspopup="true"
                                        aria-expanded="false">
                                        2022
                                    </button>
                                    <div className="dropdown-menu dropdown-menu-end" aria-labelledby="growthReportId">
                                        <a aria-label="dropdown item 2021" className="dropdown-item" href="#">
                                            2021
                                        </a>
                                        <a aria-label="dropdown item 2020" className="dropdown-item" href="#">
                                            2020
                                        </a>
                                        <a aria-label="dropdown item 2019" className="dropdown-item" href="#">
                                            2019
                                        </a>
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

const MoneyCardChart = () => {
    let  incomeChartConfig = {
        series: [
          {
            data: [24, 21, 30, 22, 42, 26, 35, 29]
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
          show: false
        },
        markers: {
          size: 6,
          colors: 'transparent',
          strokeColors: 'transparent',
          strokeWidth: 4,
          discrete: [
            {
              fillColor: config.colors.white,
              seriesIndex: 0,
              dataPointIndex: 7,
              strokeColor: config.colors.primary,
              strokeWidth: 2,
              size: 6,
              radius: 8
            }
          ],
          hover: {
            size: 7
          }
        },
        colors: [config.colors.primary],
        fill: {
          type: 'gradient',
          gradient: {
            shade: shadeColor,
            shadeIntensity: 0.6,
            opacityFrom: 0.5,
            opacityTo: 0.25,
            stops: [0, 95, 100]
          }
        },
        grid: {
          borderColor: borderColor,
          strokeDashArray: 3,
          padding: {
            top: -20,
            bottom: -8,
            left: -10,
            right: 8
          }
        },
        xaxis: {
          categories: ['', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
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
          min: 10,
          max: 50,
          tickAmount: 4
        }
    };

    let weeklyExpensesConfig = {
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
                  return '$' + parseInt(val);
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
                                        options={incomeChartConfig}
                                        series={incomeChartConfig.series}
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
                                            options={weeklyExpensesConfig}
                                            series={weeklyExpensesConfig.series}
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
                                        options={incomeChartConfig}
                                        series={incomeChartConfig.series}
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
                                            options={weeklyExpensesConfig}
                                            series={weeklyExpensesConfig.series}
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
                                        options={incomeChartConfig}
                                        series={incomeChartConfig.series}
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
                                            options={weeklyExpensesConfig}
                                            series={weeklyExpensesConfig.series}
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