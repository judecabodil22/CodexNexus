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

    

	const expOverviewChrt = document.getElementById('ExpensesOverviewChart');
	const expSrcsChrt = document.getElementById('expSrcsChrt');
	const svngOverview = document.getElementById('svngOverview');
	const svngDonutChrt = document.getElementById('svngDonutChrt');

	new Chart(expOverviewChrt, {
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
	});
	new Chart(expSrcsChrt, {
		"type": "doughnut",
		"data": {
			"labels": ["Direct", "Social", "Referral"],
			"datasets": [{
				"label": "",
				"backgroundColor": ["#333333", "#888888", "#dddddd"],
				"borderColor": ["#ffffff", "#ffffff", "#ffffff"],
				"data": ["68", "12", "20"]
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

