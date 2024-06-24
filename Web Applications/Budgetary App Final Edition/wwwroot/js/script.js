$(document).ready(function () {
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

	$.ajax({

		url: 'GetMonthlyExpensesLine',
		method: 'GET',
		success: function (data) {

			var monthNames = data.monthNames;
			var expensesData = data.expensesData;
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
		


		}
	});

	/*
	const svngOverview = document.getElementById('svngOverview');
	const svngDonutChrt = document.getElementById('svngDonutChrt');*/
	

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
			chartLegend.empty(); // Clear existing legend
			expenseCategories.forEach(function (category, index) {
				var color = ["#333333", "#888888", "#dddddd", "#555555"];
				chartLegend.append(`<span class="me-2"><i class="fas fa-circle" style="color: ${color[index]};"></i>&nbsp;${category}</span>`);
			});

		}
	});

	new Chart(svngOverview, {
		"type": "line",
		"data": {
			"labels": ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug"],
			"datasets": [{
				"label": "Earnings",
				"fill": true,
				"data": [0, 10000, 5000, 15000, 10000, 20000, 15000, 25000],
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
	})
	new Chart(svngDonutChrt, {
		"type": "bar",
		"data": {
			"labels": ["January", "February", "March"],
			"datasets": [{
				"label": "",
				"backgroundColor": "rgb(255,255,255)",
				"borderColor": "#ffffff",
				"data": [50, 30, 15]
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

	

	
	

});

