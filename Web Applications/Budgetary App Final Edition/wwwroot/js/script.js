$(document).ready(function () {

    function numberWithCommas(x) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
    $('.dropdown-item').on('click', function () {
        var selectedText = $(this).text();
        var selectedValue = $(this).data('value');
        var type = $(this).data('type');

        if (type === "modeofPayment") {
            $('#mopBtn').text(selectedText);
            $('#modeofPayment').val(selectedValue);
        } else if (type === "category") {
            $('#categoryBtn').text(selectedText);
            $('#category').val(selectedValue);
        }
    });



   /* $('#submitBtn').click(function () {
        alert("this is a test");
        // Clear previous validation messages
        $('.text-danger').text('');

        // Perform validation
        var isValid = true;
        var startingBudget = $('#startingBudget').val();
        var dailyBudget = $('#dailyBudget').val();
        var expenseName = $('#expenseName').val();
        var amount = $('#amount').val();
        var modeofPayment = $('#modeofPayment').val();
        var category = $('#category').val();

        if (!startingBudget || startingBudget <= 0) {
            $('#startingBudget').next('.text-danger').text('Starting Budget is required and must be greater than zero.');
            isValid = false;
        }
        if (!dailyBudget || dailyBudget <= 0) {
            $('#dailyBudget').next('.text-danger').text('Daily Budget is required and must be greater than zero.');
            isValid = false;
        }
        if (!expenseName) {
            $('#name').next('.text-danger').text('Expenses Name is required.');
            isValid = false;
        }
        if (!amount || amount <= 0) {
            $('#amount').next('.text-danger').text('Amount is required and must be greater than zero.');
            isValid = false;
        }
        if (!modeofPayment) {
            $('#modeofPayment').next('.text-danger').text('Mode of Payment is required.');
            isValid = false;
        }
        if (!category) {
            $('#category').next('.text-danger').text('Category is required.');
            isValid = false;
        }

        // If valid, submit the form
        if (isValid) {
            alert("form valid");
            $('#billForm').submit();
        }
        else {
            alert("form invalid");
        }
    });*/
           
        
        


   


   

    $.ajax({

        url: 'GetMonthlyExpensesLine',
        method: 'GET',
        success: function (data) {

            var monthNames = data.monthNames;
            var expensesData = data.expensesData;
            var startingBudget = data.startingBudget;
            var dailyBudget = data.dailyBudget;
            var totalBudgetAfterExpenses = data.totalBudgetAfterExpenses;
            var daysLeft = data.actualDaysLeft;

            $("#daysLeft").text(daysLeft);
            $("#averageSavings").text(numberWithCommas(data.averageSavings));
            $("#averageExpenses").text(numberWithCommas(data.averageExpenses));



            var ratio = (data.averageSavings / data.averageExpenses) * 100;

            $("#ratioProgress").attr("aria-valuenow", ratio).css("width", ratio + "%");


            $("#savingsToRatio").text(Math.floor(ratio) + "%");

            const expOverviewChrt = document.getElementById('ExpensesOverviewChart');
            new Chart(expOverviewChrt, {
                "type": "line",
                "data": {
                    "labels": monthNames,
                    "datasets": [{
                        "label": "Expenses",
                        "fill": true,
                        "data": expensesData,
                        "backgroundColor": "rgba(78, 115, 223, 0.05)",
                        "borderColor": "rgb(255,255,255)"
                    }]
                },
                "options": {
                    "maintainAspectRatio": false,
                    "legend": {
                        "display": false,
                        "labels": {
                            "fontStyle": "normal"
                        }
                    },
                    "title": {
                        "fontStyle": "normal",
                        "fontColor": "#666",
                        "display": false
                    },
                    "scales": {
                        "xAxes": [{
                            "gridLines": {
                                "drawBorder": true,
                                "drawTicks": true,
                                "drawOnChartArea": true
                            },
                            "ticks": {
                                "fontColor": "#ffffff",
                                "fontStyle": "normal",
                                "beginAtZero": false
                            }
                        }],
                        "yAxes": [{
                            "gridLines": {
                                "drawBorder": true,
                                "drawTicks": true
                            },
                            "ticks": {
                                "fontColor": "#ffffff",
                                "fontStyle": "normal",
                                "beginAtZero": false
                            }
                        }]
                    }
                }
            });

            const svngOverview = document.getElementById('svngOverview');
            new Chart(svngOverview, {
                "type": "line",
                "data": {
                    "labels": monthNames,
                    "datasets": [{
                        "label": "Savings",
                        "fill": true,
                        "data": totalBudgetAfterExpenses,
                        "backgroundColor": "rgba(78, 115, 223, 0.05)",
                        "borderColor": "rgb(255,255,255)"
                    }]
                },
                "options": {
                    "maintainAspectRatio": false,
                    "legend": {
                        "display": false,
                        "labels": {
                            "fontStyle": "normal"
                        }
                    },
                    "title": {
                        "fontStyle": "normal",
                        "fontColor": "#666",
                        "display": false
                    },
                    "scales": {
                        "xAxes": [{
                            "gridLines": {
                                "drawBorder": true,
                                "drawTicks": true,
                                "drawOnChartArea": true
                            },
                            "ticks": {
                                "fontColor": "#ffffff",
                                "fontStyle": "normal",
                                "beginAtZero": false
                            }
                        }],
                        "yAxes": [{
                            "gridLines": {
                                "drawBorder": true,
                                "drawTicks": true
                            },
                            "ticks": {
                                "fontColor": "#ffffff",
                                "fontStyle": "normal",
                                "beginAtZero": false
                            }
                        }]
                    }
                }
            });


        }
    });

    $.ajax({
        url: 'GetMonthlyExpensesPie',
        method: 'GET',
        success: function (data) {

            var expensesData = data.expensesData;
            var expenseCategories = data.expenseCategories;

            const expSrcsChrt = document.getElementById('expSrcsChrt');
            new Chart(expSrcsChrt, {
                "type": "doughnut",
                "data": {
                    "labels": expenseCategories,
                    "datasets": [{
                        "label": "Expenses",
                        "backgroundColor": ["#333333", "#888888", "#dddddd", "#555555"],
                        "borderColor": ["#ffffff", "#ffffff", "#ffffff"],
                        "data": expensesData
                    }]
                },
                "options": {
                    "maintainAspectRatio": false,
                    "legend": {
                        "display": false,
                        "labels": {
                            "fontStyle": "normal"
                        }
                    },
                    "title": {
                        "fontStyle": "normal"
                    }
                }
            });

            var chartLegend = $('#chartLegend');
            expenseCategories.forEach(function (category, index) {
                var color = ["#333333", "#888888", "#dddddd", "#555555"];
                chartLegend.append(`<span class="me-2"><i class="fas fa-circle" style="color: ${color[index]};"></i>&nbsp;${category}</span>`);
            });

        }
    });

    $.ajax({
        url: 'GetPastThreeMonthsSavings',
        method: 'GET',
        success: function (data) {

            const svngDonutChrt = document.getElementById('svngDonutChrt');
            var monthNames = data.monthNames;
            var averageSavings = data.totalBudgetAfterExpenses;

            new Chart(svngDonutChrt, {
                "type": "bar",
                "data": {
                    "labels": monthNames,
                    "datasets": [{
                        "label": "",
                        "backgroundColor": "rgb(255,255,255)",
                        "borderColor": "#ffffff",
                        "data": averageSavings
                    }]
                },
                "options": {
                    "maintainAspectRatio": false,
                    "legend": {
                        "display": false,
                        "labels": {
                            "fontStyle": "normal"
                        }
                    },
                    "title": {
                        "fontStyle": "normal"
                    }
                }
            })
        }
    })


    
});



