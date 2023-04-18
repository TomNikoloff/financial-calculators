(function(c){
	c.extend(	
	{
        utils: {
 
        },
		refs:{},
		funcs:{
            init: function(){	
				_CORE.overpayment.funcs.buildElementReferences();
            },
			buildElementReferences: function(){

				// Current Monthly Payment
				_CORE.overpayment.cache.currentPaymentValue;

				// Current Monthly Payment
				_CORE.overpayment.cache.newPaymentValue;

				_CORE.overpayment.cache.tableYear = 0;
				_CORE.overpayment.cache.tableWithOp;
				_CORE.overpayment.cache.tableWithoutOp;

				_CORE.overpayment.cache.balanceResults = [];

				_CORE.overpayment.funcs.setupInputs();
			},
			setupInputs: function() {

				_CORE.utils.numberInputFormatter(_CORE.refs["OVERPAYMENT-CALC_mortgage_balance"]);

				_CORE.refs["OVERPAYMENT-CALC_mortgage_balance"].value = '180,000';

				_CORE.refs["OVERPAYMENT-CALC_mortgage_balance"].onchange = function(){
					_CORE.overpayment.funcs.currentPaymentCalc();
				}

				_CORE.refs["OVERPAYMENT-CALC_mortgage_term_years"].value = '28';

				_CORE.refs["OVERPAYMENT-CALC_mortgage_term_years"].onchange = function(){
					_CORE.overpayment.funcs.currentPaymentCalc();
				}

				_CORE.refs["OVERPAYMENT-CALC_mortgage_term_months"].value = '0';

				_CORE.refs["OVERPAYMENT-CALC_mortgage_term_months"].onchange = function(){
					_CORE.overpayment.funcs.currentPaymentCalc();
				}

				_CORE.refs["OVERPAYMENT-CALC_mortgage_rate"].value = '2.17';

				_CORE.refs["OVERPAYMENT-CALC_mortgage_rate"].onchange = function(){
					_CORE.overpayment.funcs.currentPaymentCalc();
				}

				_CORE.utils.numberInputFormatter(_CORE.refs["OVERPAYMENT-CALC_regular_overpayment"]);

				_CORE.refs["OVERPAYMENT-CALC_regular_overpayment"].value = '200';

				_CORE.refs["OVERPAYMENT-CALC_regular_overpayment"].onchange = function(){
					_CORE.overpayment.funcs.currentPaymentCalc();
				}

				_CORE.utils.numberInputFormatter(_CORE.refs["OVERPAYMENT-CALC_lump_sum_overpayment"]);

				_CORE.refs["OVERPAYMENT-CALC_lump_sum_overpayment"].value = '0';

				_CORE.refs["OVERPAYMENT-CALC_lump_sum_overpayment"].onchange = function(){
					_CORE.overpayment.funcs.currentPaymentCalc();
				}

				_CORE.overpayment.funcs.currentPaymentCalc();

			},
            NPER: function(rate, payment, present, future, type) {
                // Initialize type
                var type = (typeof type === 'undefined') ? 0 : type;
              
                // Initialize future value
                var future = (typeof future === 'undefined') ? 0 : future;
              
                // Evaluate rate and periods (TODO: replace with secure expression evaluator)
                rate = eval(rate);
              
                // Return number of periods
                var num = payment * (1 + rate * type) - future * rate;
                var den = (present * rate + payment * (1 + rate * type));
                num = parseFloat(num);
                den = parseFloat(den);
    
                return Math.log(num / den) / Math.log(1 + rate);
            },
            PMT: function(rate, nper, pv, fv){
                // Initialize future value
                var fv = (typeof fv === 'undefined') ? 0 : fv;
    
                return Math.abs((pv - fv) * (rate) / (1 - (Math.pow(1 + rate, -nper))));
            },
			currentPaymentCalc: function(){
				let interestRate = parseFloat(_CORE.refs["OVERPAYMENT-CALC_mortgage_rate"].value.replaceAll(",", ""));
				let mortgageBalance = parseFloat(_CORE.refs["OVERPAYMENT-CALC_mortgage_balance"].value.replaceAll(",", ""));

				let mortgageTerm = parseFloat(_CORE.refs["OVERPAYMENT-CALC_mortgage_term_years"].value.replaceAll(",", ""));

				// Nper = total number of payments
				let nper = mortgageTerm * 12;

				if(_CORE.refs["OVERPAYMENT-CALC_mortgage_term_months"].value){
					let mortgageTermMonths = parseFloat(_CORE.refs["OVERPAYMENT-CALC_mortgage_term_months"].value.replaceAll(",", ""));
					nper = nper + mortgageTermMonths;
				}
				
				let rate = (interestRate / 100) / 12;

				let pmt =  _CORE.overpayment.funcs.PMT(rate, parseInt(nper), mortgageBalance);

				let result = pmt.toFixed(2);

				_CORE.refs["OVERPAYMENT-CALC_OVERPAYMENT-CALC_mortgage-current-monthly-payment"].textContent = '£' + result.toLocaleString();
				_CORE.overpayment.cache.currentPaymentValue = result;

				_CORE.refs["OVERPAYMENT-CALC_OVERPAYMENT-CALC_mortgage-new-monthly-payment"].textContent = '£' + result.toLocaleString();
				_CORE.overpayment.funcs.newPaymentCalc(result);
			},
			newPaymentCalc: function(currentPayment){
				currentPayment = parseFloat(currentPayment.replaceAll(",", ""));

				let overpaymentAmount;
				let lumpSumAmount;

				let newPayment = currentPayment;

				if(_CORE.refs["OVERPAYMENT-CALC_regular_overpayment"].value){

					overpaymentAmount = parseFloat(_CORE.refs["OVERPAYMENT-CALC_regular_overpayment"].value.replaceAll(",", ""));
					newPayment = overpaymentAmount + currentPayment;

					_CORE.refs["OVERPAYMENT-CALC_OVERPAYMENT-CALC_mortgage-new-monthly-payment"].textContent = '£' + newPayment.toLocaleString();
					_CORE.overpayment.cache.newPaymentValue = newPayment;		
					
				} else {
					_CORE.refs["OVERPAYMENT-CALC_OVERPAYMENT-CALC_mortgage-new-monthly-payment"].textContent = '£' + currentPayment.toLocaleString();
				}

				let balance = parseFloat(_CORE.refs["OVERPAYMENT-CALC_mortgage_balance"].value.replaceAll(",", ""));
				let interestRate = parseFloat(_CORE.refs["OVERPAYMENT-CALC_mortgage_rate"].value.replaceAll(",", ""));
				let rate = (interestRate / 100) / 12;

				if(_CORE.refs["OVERPAYMENT-CALC_regular_overpayment"].value && _CORE.refs["OVERPAYMENT-CALC_lump_sum_overpayment"].value){

					lumpSumAmount = parseFloat(_CORE.refs["OVERPAYMENT-CALC_lump_sum_overpayment"].value.replaceAll(",", ""));

					let currentMonthsResult = _CORE.overpayment.funcs.NPER(rate, -currentPayment, balance);
					let totalInterest = (currentMonthsResult * currentPayment) - balance;

					let paymentInterest = rate * balance;

					let paymentCapital = _CORE.overpayment.cache.currentPaymentValue - paymentInterest;

					let firstMonthBalance = balance - (paymentCapital + overpaymentAmount + lumpSumAmount);

					let newMonthlyResult = _CORE.overpayment.funcs.NPER(rate, -newPayment, firstMonthBalance);
					let newInterest = (newMonthlyResult * newPayment) - firstMonthBalance;

					let interestSaved = totalInterest - newInterest - paymentInterest;

					if(overpaymentAmount > 0 || lumpSumAmount > 0 ){

						_CORE.refs["OVERPAYMENT-CALC_OVERPAYMENT-CALC_mortgage-overpayment-message-container"].classList.remove('hide');

						if(overpaymentAmount > 0 && lumpSumAmount > 0) {

							let bothText = "Paying an extra <span class='text-highlight'>£" + overpaymentAmount.toLocaleString() + "</span> per month for the remaining mortgage term and a lump sum of <span class='text-highlight'>£" + lumpSumAmount.toLocaleString() + "</span> could mean you'd save <span class='text-highlight'>£" + Math.round(interestSaved).toLocaleString() + "</span> in interest. These results assume the interest rate stays at <span class='text-highlight'>" + interestRate + "%" + "</span> over the whole remaining mortgage term.";
	
							_CORE.refs["OVERPAYMENT-CALC_overpayment_message"].innerHTML = bothText;
	
						} else if(overpaymentAmount > 0 && lumpSumAmount <= 0 ){
	
							let monthlyText = "Paying an extra <span class='text-highlight'>£" + overpaymentAmount.toLocaleString() + "</span> per month for the remaining mortgage term could mean you'd save <span class='text-highlight'>£" + Math.round(interestSaved).toLocaleString() + "</span> in interest. These results assume the interest rate stays at <span class='text-highlight'>" + interestRate + "%" + "</span> over the whole remaining mortgage term.";
	
							_CORE.refs["OVERPAYMENT-CALC_overpayment_message"].innerHTML = monthlyText;
	
						} else if(lumpSumAmount > 0 && overpaymentAmount <= 0){
	
							let lumpSumText = "Paying a lump sum of <span class='text-highlight'>£" + lumpSumAmount.toLocaleString() + "</span> could mean you'd save <span class='text-highlight'>£" + Math.round(interestSaved).toLocaleString() + "</span> in interest. These results assume the interest rate stays at <span class='text-highlight'>" + interestRate + "%" + "</span> over the whole remaining mortgage term.";
	
							_CORE.refs["OVERPAYMENT-CALC_overpayment_message"].innerHTML = lumpSumText;
	
						}
					} else {
						_CORE.refs["OVERPAYMENT-CALC_OVERPAYMENT-CALC_mortgage-overpayment-message-container"].classList.add('hide');
					}
				}
				_CORE.overpayment.funcs.calculateTableValues();
			},
			calculateTableValues: function(){
				_CORE.refs["OVERPAYMENT-CALC_mortgage-table-row-container"].innerHTML = "";

				_CORE.overpayment.cache.balanceResults = [];
				_CORE.overpayment.cache.balanceResults.push(['Year', 'Without Overpayment', 'With Overpayment']);

				_CORE.overpayment.cache.tableYear = 0;

				let mortgageBalance = parseFloat(_CORE.refs["OVERPAYMENT-CALC_mortgage_balance"].value.replaceAll(",", ""));
				let interestRate = parseFloat(_CORE.refs["OVERPAYMENT-CALC_mortgage_rate"].value.replaceAll(",", ""));
				let rate = (interestRate / 100) / 12;
				let mortgageTerm = parseFloat(_CORE.refs["OVERPAYMENT-CALC_mortgage_term_years"].value.replaceAll(",", ""));

				_CORE.overpayment.cache.balanceResults.push([0,Math.trunc(Number(mortgageBalance)),  Math.trunc(Number(mortgageBalance))]);

				if(_CORE.refs["OVERPAYMENT-CALC_mortgage_term_months"].value){
					mortgageTerm = mortgageTerm + 1;
				}

				let overpaymentAmount = '';
				if(_CORE.refs["OVERPAYMENT-CALC_regular_overpayment"].value){
					overpaymentAmount = parseFloat(_CORE.refs["OVERPAYMENT-CALC_regular_overpayment"].value.replaceAll(",", ""));
				}

				let lumpSumAmount = '';
				if(_CORE.refs["OVERPAYMENT-CALC_lump_sum_overpayment"].value){
					lumpSumAmount = parseFloat(_CORE.refs["OVERPAYMENT-CALC_lump_sum_overpayment"].value.replaceAll(",", ""));
				}

				let paymentInterest;
				let paymentCapital;

				let paymentInterestOP;
				let paymentCapitalOP;

				let withoutOpBalance;
				let withOpBalance;

				function calulateNewBalance(i){

					// Monthly Balance

					for(let y = 0; y < 12; y++){

						if(i == 0 && y == 0){

							paymentInterest = rate * mortgageBalance;
							paymentCapital = _CORE.overpayment.cache.currentPaymentValue - paymentInterest;

							withOpBalance = mortgageBalance - (paymentCapital + overpaymentAmount + lumpSumAmount);

							withoutOpBalance = mortgageBalance - paymentCapital;

						} else {

							paymentInterest = rate * withoutOpBalance;
							paymentCapital = _CORE.overpayment.cache.currentPaymentValue - paymentInterest;

							paymentInterestOP = rate * withOpBalance;
							paymentCapitalOP = _CORE.overpayment.cache.currentPaymentValue - paymentInterestOP;

							withOpBalance = withOpBalance - (paymentCapitalOP + overpaymentAmount);

							withoutOpBalance = withoutOpBalance - paymentCapital;

							if(y == 11){

								if(withOpBalance < 0 ){
									withOpBalance = 0;
								}

								if(withoutOpBalance < 0 ){
									withoutOpBalance = 0;
								}

								_CORE.overpayment.cache.tableYear++;
								_CORE.overpayment.cache.tableWithOp = withOpBalance;
								_CORE.overpayment.cache.tableWithoutOp = withoutOpBalance;

							}
						}
						
					}
				}

				for(let i = 0; i <  mortgageTerm; i++){

					calulateNewBalance(i);

					let yearlyResult = [_CORE.overpayment.cache.tableYear, Math.trunc(Number(_CORE.overpayment.cache.tableWithoutOp)),  Math.trunc(Number(_CORE.overpayment.cache.tableWithOp))];
					_CORE.overpayment.cache.balanceResults.push(yearlyResult);

					_CORE.overpayment.funcs.buildTableRow();

					if(i == (mortgageTerm - 1)){
						_CORE.overpayment.funcs.drawBalanceChart();
					}
				}

			},
			buildTableRow: function(){

				let year = _CORE.overpayment.cache.tableYear;
				let withOp = Math.trunc(Number(_CORE.overpayment.cache.tableWithOp));
				let withoutOp = Math.trunc(Number(_CORE.overpayment.cache.tableWithoutOp));

				let withOpText = withOp.toLocaleString();
				let withoutOpText = withoutOp.toLocaleString();

				let gridDiv = document.createElement('div');
				gridDiv.classList.add('table-results-row', 'uk-grid', 'uk-margin-remove', 'uk-grid-row-collapse', 'uk-grid-collapse');
				gridDiv.setAttribute('uk-grid', '');

				let div1 = document.createElement('div');
				div1.classList.add('uk-text-center', 'uk-width-1-5', 'uk-width-1-3');
				let div1Content =  document.createTextNode(year);
				div1.appendChild(div1Content);

				let div2 = document.createElement('div');
				div2.classList.add('uk-text-center', 'uk-width-2-5', 'uk-width-1-3');
				let div2Content =  document.createTextNode('£' + withoutOpText);
				div2.appendChild(div2Content);

				let div3 = document.createElement('div');
				div3.classList.add('uk-text-center', 'uk-width-2-5', 'uk-width-1-3');
				let div3Content =  document.createTextNode('£' + withOpText);
				div3.appendChild(div3Content);

				gridDiv.appendChild(div1);
				gridDiv.appendChild(div2);
				gridDiv.appendChild(div3);

				if((year <= 10)){
					_CORE.refs["OVERPAYMENT-CALC_mortgage-table-row-container"].appendChild(gridDiv);
				} else {
					_CORE.refs["OVERPAYMENT-CALC_mortgage-table-row-container-extended"].appendChild(gridDiv);
				}
				
			},
			drawBalanceChart: function(){

				//console.log(_CORE.overpayment.cache.balanceResults);
				// Load the Visualization API and the corechart package.
				google.charts.load('current', {'packages':['corechart']});

				// Set a callback to run when the Google Visualization API is loaded.
				google.charts.setOnLoadCallback(drawChart);
			
				// Callback that creates and populates a data table,
				// instantiates the pie chart, passes in the data and
				// draws it.

				function drawChart() {
			
					// Create the data table.
					var data = new google.visualization.DataTable();
					var data = google.visualization.arrayToDataTable(_CORE.overpayment.cache.balanceResults);
				
					// Set chart options
					var options = {'title':'',
									curveType: 'function',
									legend: { position: 'top' },
									colors: ['#666', '#373542'],
									/*lineWidth: 2,*/
									pointShape: 'circle',
									pointSize: 5,
									backgroundColor: {
										fill: '#c2c2c2',
										fillOpacity: 0.8
									},
									vAxis: {title: "Mortgage Balance (£)", minValue: 0, format: 'short', viewWindow:{min:0}},
									hAxis: {title: "Term (Years)", minValue: 0, viewWindow:{min:0}},
									tooltip: {isHtml: true}
								};
				
					// Instantiate and draw our chart, passing in some options.
					var container = _CORE.refs["OVERPAYMENT-CALC_mortgage-chart-div"];
					var chart = new google.visualization.LineChart(container);

					google.visualization.events.addListener(chart, 'onmouseover', function (props) {

				
						var tooltip = container.getElementsByTagName('ul');
						var tooltipLabel = container.getElementsByTagName('span');
						if (tooltip.length > 0) {
							let year = tooltipLabel[0].textContent;
							let newYearText = 'Year: ' + year;
							tooltipLabel[0].textContent = newYearText;

							tooltipLabel[1].style.display = "block";

							let balance = tooltipLabel[2].textContent;
							let newBalanceText = '£' + balance;
							console.log(balance)
							tooltipLabel[2].textContent = newBalanceText;
						}
					});
					chart.draw(data, options);
				}
			},
			expandShrinkExtendedRows: function(btn){
				let extendedRows = _CORE.refs.tableRowExtended;

				if(extendedRows.classList.contains('uk-hidden')){
					extendedRows.classList.remove('uk-hidden');
					btn.setAttribute('uk-icon', 'shrink');
				} else {
					extendedRows.classList.add('uk-hidden');
					btn.setAttribute('uk-icon', 'expand');
				}
			}
		}
		// End of extend	
	},'overpayment');
})(_CORE);


(function(c){
	c.extend(	
	{
        utils: {
 
        },
		context:{},
		refs:{},
		cache:{},
		funcs:{
			init: function(){	
				_CORE.overpayment.funcs.buildElementReferences();	
            },
			buildElementReferences: function(){	

				// Current Monthly Payment
				_CORE.overpayment.cache.currentPaymentValue;

				// Current Monthly Payment
				_CORE.overpayment.cache.newPaymentValue;

				_CORE.overpayment.funcs.setupInputs();
			},
			setupInputs: function() {

				_CORE.utils.numberInputFormatter(_CORE.refs["OVERPAYMENT-CALC_mortgage_balance"]);
				
				_CORE.refs["OVERPAYMENT-CALC_mortgage_balance"].onchange = function(){
					_CORE.overpayment.funcs.inputValidation(this);
					_CORE.overpayment.funcs.currentPaymentCalc();
				}

				_CORE.refs["OVERPAYMENT-CALC_mortgage_term_years"].onchange = function(){
					_CORE.overpayment.funcs.inputValidation(this);
					_CORE.overpayment.funcs.currentPaymentCalc();
				}

				_CORE.refs["OVERPAYMENT-CALC_mortgage_term_months"].onchange = function(){
					_CORE.overpayment.funcs.inputValidation(this);
					_CORE.overpayment.funcs.currentPaymentCalc();
				}

				_CORE.refs["OVERPAYMENT-CALC_mortgage_rate"].onchange = function(){
					_CORE.overpayment.funcs.inputValidation(this);
					_CORE.overpayment.funcs.currentPaymentCalc();
				}

				_CORE.utils.numberInputFormatter(_CORE.refs["OVERPAYMENT-CALC_regular_overpayment"]);

				_CORE.refs["OVERPAYMENT-CALC_regular_overpayment"].onchange = function(){
					_CORE.overpayment.funcs.inputValidation(this);
					_CORE.overpayment.funcs.currentPaymentCalc();
				}

				_CORE.utils.numberInputFormatter(_CORE.refs["OVERPAYMENT-CALC_lump_sum_overpayment"]);

				_CORE.refs["OVERPAYMENT-CALC_lump_sum_overpayment"].onchange = function(){
					_CORE.overpayment.funcs.inputValidation(this);
					_CORE.overpayment.funcs.currentPaymentCalc();
				}

				_CORE.overpayment.funcs.currentPaymentCalc();

			},
            NPER: function(rate, payment, present, future, type) {
                // Initialize type
                var type = (typeof type === 'undefined') ? 0 : type;
              
                // Initialize future value
                var future = (typeof future === 'undefined') ? 0 : future;
              
                // Evaluate rate and periods (TODO: replace with secure expression evaluator)
                rate = eval(rate);
              
                // Return number of periods
                var num = payment * (1 + rate * type) - future * rate;
                var den = (present * rate + payment * (1 + rate * type));
                num = parseFloat(num);
                den = parseFloat(den);
    
                return Math.log(num / den) / Math.log(1 + rate);
            },
            PMT: function(rate, nper, pv, fv){
                // Initialize future value
                var fv = (typeof fv === 'undefined') ? 0 : fv;
    
                return Math.abs((pv - fv) * (rate) / (1 - (Math.pow(1 + rate, -nper))));
            },
			inputValidation: function(input){
				
				let val = parseFloat(input.value.replaceAll(",", ""));
				let type = input.getAttribute('data-calculator-field');	

				let errorContainer = _CORE.refs["mortgage-details-error-text"];
				let errorText = _CORE.refs["mortgage-details-error-text"].querySelector('h4');

				let overpaymentErrorContainer = _CORE.refs["mortgage-overpayment-error-text"];
				let overpaymentErrorText = _CORE.refs["mortgage-overpayment-error-text"].querySelector('h4');

				errorContainer.classList.add('uk-hidden');

				let resultsContainer = _CORE.refs["mortgage-results-container"];
				resultsContainer.classList.remove('uk-hidden');

				if(type == 'OVERPAYMENT-CALC_mortgage_term_years'){
					
					if(isNaN(val) || !Number.isInteger(val) || val > 40 || val == 0){
						//console.log('fail');
						if(val > 40){
							input.value = 40;

							errorText.textContent = "The remaining duration must be atleast 1 year and not exceed 40 years.";
							errorContainer.classList.remove("uk-hidden");
						} else if(!_CORE.refs["OVERPAYMENT-CALC_mortgage_term_months"].value){
							input.value = 1;

							errorText.textContent = "The remaining duration must be atleast 1 year and not exceed 40 years.";
							errorContainer.classList.remove("uk-hidden");
						}
					} else {
						//console.log('success');
					}
					
				} else if(type == 'OVERPAYMENT-CALC_mortgage_term_months'){
					if(isNaN(val) || !Number.isInteger(val) || val > 11){
						//console.log('fail');
						if(val > 11){
							input.value = 11;

							errorText.textContent = "The remaining months must not exceed 11. Please use the remaining years field.";
							errorContainer.classList.remove("uk-hidden");
						}
					} else {
						//console.log('success');
					}	
				} else if(type == 'OVERPAYMENT-CALC_mortgage_balance'){
					if(isNaN(val) || !Number.isInteger(val) || val == 0){
						//console.log('fail');

						resultsContainer.classList.add('uk-hidden');

						errorText.textContent = "The remaining balance must be atleast £1.";
						errorContainer.classList.remove("uk-hidden");
					} else {
						//console.log('success');
					}
				} else if(type == 'OVERPAYMENT-CALC_mortgage_rate'){
					if(isNaN(val) || !Number.isInteger(val) || val == 0 || val > 15){
						//console.log('fail');
						if(val > 15){
							input.value = 15;

							errorText.textContent = "The interest rate cannot exceed 15%.";
							errorContainer.classList.remove("uk-hidden");
						} else if(val == 0 || isNaN(val)){

							resultsContainer.classList.add('uk-hidden');

							errorText.textContent = "The interest rate must be greater than 0%.";
							errorContainer.classList.remove("uk-hidden");
						} 
					} else {
						//console.log('success');
					}
				} else if(type == 'OVERPAYMENT-CALC_regular_overpayment' || type == 'OVERPAYMENT-CALC_lump_sum_overpayment'){
					if(val > parseFloat(_CORE.refs["OVERPAYMENT-CALC_mortgage_balance"].value.replaceAll(",", ""))){
						overpaymentErrorText.textContent = "The mortgage overpayments must be less than the total mortgage balance!";
						overpaymentErrorContainer.classList.remove('uk-hidden');

						input.value = 0;
					}
				} 
			},
			currentPaymentCalc: function(){
				let interestRate = parseFloat(_CORE.refs["OVERPAYMENT-CALC_mortgage_rate"].value.replaceAll(",", ""));
				let mortgageBalance = parseFloat(_CORE.refs["OVERPAYMENT-CALC_mortgage_balance"].value.replaceAll(",", ""));

				// Nper = total number of payments
				let nper = 12;
				let mortgageTerm;
				let mortgageTermMonths;

				if(_CORE.refs["OVERPAYMENT-CALC_mortgage_term_years"].value){
					mortgageTerm = parseFloat(_CORE.refs["OVERPAYMENT-CALC_mortgage_term_years"].value.replaceAll(",", ""));
				} else {
					_CORE.refs["OVERPAYMENT-CALC_mortgage_term_years"].value = 0;
				}

				if(_CORE.refs["OVERPAYMENT-CALC_mortgage_term_months"].value){
					mortgageTermMonths = parseFloat(_CORE.refs["OVERPAYMENT-CALC_mortgage_term_months"].value.replaceAll(",", ""));

					if(mortgageTermMonths > 11 ){
						// Display Error Message - Value cannot be greater than 11. Showing results for 11 months.
						_CORE.refs["OVERPAYMENT-CALC_mortgage_term_months"].value = 11;
						mortgageTermMonths = 11;
					}
				} else {
					_CORE.refs["OVERPAYMENT-CALC_mortgage_term_months"].value = 0;
				}

				if(mortgageTerm > 0 || mortgageTermMonths > 0){

					if(mortgageTerm > 0){
						nper = mortgageTerm * 12;
					}

					if(mortgageTermMonths > 0 && mortgageTerm > 0){
						nper = nper + mortgageTermMonths;
					} else if(mortgageTermMonths > 0 || mortgageTerm <= 0){
						nper =  mortgageTermMonths;
					}

				} else {

					_CORE.refs["OVERPAYMENT-CALC_mortgage_term_years"].value = 1;
					mortgageTerm = 1;
				}

				let rate = (interestRate / 100) / 12;

				let pmt =  _CORE.overpayment.funcs.PMT(rate, parseInt(nper), mortgageBalance);

				let result = pmt.toFixed(2);


				if(isNaN(result) || result == 0){

					_CORE.refs["OVERPAYMENT-CALC_mortgage-current-monthly-payment"].textContent = '£' + 0;
					_CORE.overpayment.cache.currentPaymentValue = 0;
	
					_CORE.refs["OVERPAYMENT-CALC_mortgage-new-monthly-payment"].textContent = '£' + 0;
					_CORE.overpayment.funcs.newPaymentCalc(0);

				} else {

					_CORE.refs["OVERPAYMENT-CALC_mortgage-current-monthly-payment"].textContent = '£' + result.toLocaleString();
					_CORE.overpayment.cache.currentPaymentValue = result;

					_CORE.refs["OVERPAYMENT-CALC_mortgage-new-monthly-payment"].textContent = '£' + result.toLocaleString();
					_CORE.overpayment.funcs.newPaymentCalc(result);

				}

			},
			newPaymentCalc: function(currentPayment){

				if(currentPayment == 0){
					_CORE.refs["OVERPAYMENT-CALC_mortgage-overpayment-message-container"].style.display= "none";

					_CORE.refs["OVERPAYMENT-CALC_mortgage-new-monthly-payment"].textContent = '£' + 0;
					_CORE.overpayment.cache.newPaymentValue = 0;		
				} else {
					currentPayment = parseFloat(currentPayment.replaceAll(",", ""));
					
					let overpaymentAmount;
					let lumpSumAmount;

					let newPayment = currentPayment;

					if(_CORE.refs["OVERPAYMENT-CALC_regular_overpayment"].value){

						overpaymentAmount = parseFloat(_CORE.refs["OVERPAYMENT-CALC_regular_overpayment"].value.replaceAll(",", ""));
						newPayment = overpaymentAmount + currentPayment;

						_CORE.refs["OVERPAYMENT-CALC_mortgage-new-monthly-payment"].textContent = '£' + newPayment.toLocaleString();
						_CORE.overpayment.cache.newPaymentValue = newPayment;		
						
					} else {
						_CORE.refs["OVERPAYMENT-CALC_mortgage-new-monthly-payment"].textContent = '£' + currentPayment.toLocaleString();
					}

					let balance = parseFloat(_CORE.refs["OVERPAYMENT-CALC_mortgage_balance"].value.replaceAll(",", ""));
					let interestRate = parseFloat(_CORE.refs["OVERPAYMENT-CALC_mortgage_rate"].value.replaceAll(",", ""));
					let rate = (interestRate / 100) / 12;

					if(_CORE.refs["OVERPAYMENT-CALC_regular_overpayment"].value){	
					} else {
						_CORE.refs["OVERPAYMENT-CALC_regular_overpayment"].value = 0;
					}

					if(_CORE.refs["OVERPAYMENT-CALC_lump_sum_overpayment"].value){	
					} else {
						_CORE.refs["OVERPAYMENT-CALC_lump_sum_overpayment"].value = 0;
					}

					if(_CORE.refs["OVERPAYMENT-CALC_regular_overpayment"].value && _CORE.refs["OVERPAYMENT-CALC_lump_sum_overpayment"].value){

						lumpSumAmount = parseFloat(_CORE.refs["OVERPAYMENT-CALC_lump_sum_overpayment"].value.replaceAll(",", ""));

						let currentMonthsResult = _CORE.overpayment.funcs.NPER(rate, -currentPayment, balance);
						let totalInterest = (currentMonthsResult * currentPayment) - balance;

						let paymentInterest = rate * balance;

						let paymentCapital = _CORE.overpayment.cache.currentPaymentValue - paymentInterest;

						let firstMonthBalance = balance - (paymentCapital + overpaymentAmount + lumpSumAmount);

						let newMonthlyResult = _CORE.overpayment.funcs.NPER(rate, -newPayment, firstMonthBalance);
						let newInterest = (newMonthlyResult * newPayment) - firstMonthBalance;

						let interestSaved = totalInterest - newInterest - paymentInterest;

						if(overpaymentAmount > 0 && lumpSumAmount > 0) {

							let bothText = "Paying an extra <span class='text-highlight'>£" + overpaymentAmount.toLocaleString() + "</span> per month for the remaining mortgage term and a lump sum of <span class='text-highlight'>£" + lumpSumAmount.toLocaleString() + "</span> could mean you'd save <span class='text-highlight'>£" + Math.round(interestSaved).toLocaleString() + "</span> in interest. These results assume the interest rate stays at <span class='text-highlight'>" + interestRate + "%" + "</span> over the whole remaining mortgage term.";

							_CORE.refs["OVERPAYMENT-CALC_overpayment_message"].innerHTML = bothText;

							_CORE.refs["OVERPAYMENT-CALC_mortgage-overpayment-message-container"].style.display= "block";

						} else if(overpaymentAmount > 0 && lumpSumAmount <= 0 ){

							let monthlyText = "Paying an extra <span class='text-highlight'>£" + overpaymentAmount.toLocaleString() + "</span> per month for the remaining mortgage term, could mean you'd save <span class='text-highlight'>£" + Math.round(interestSaved).toLocaleString() + "</span> in interest. These results assume the interest rate stays at <span class='text-highlight'>" + interestRate + "%" + "</span> over the whole remaining mortgage term.";

							_CORE.refs["OVERPAYMENT-CALC_overpayment_message"].innerHTML = monthlyText;

							_CORE.refs["OVERPAYMENT-CALC_mortgage-overpayment-message-container"].style.display= "block";

						} else if(lumpSumAmount > 0 && overpaymentAmount <= 0){

							let lumpSumText = "Paying a lump sum of <span class='text-highlight'>£" + lumpSumAmount.toLocaleString() + "</span> could mean you'd save <span class='text-highlight'>£" + Math.round(interestSaved).toLocaleString() + "</span> in interest. These results assume the interest rate stays at <span class='text-highlight'>" + interestRate + "%" + "</span> over the whole remaining mortgage term.";

							_CORE.refs["OVERPAYMENT-CALC_overpayment_message"].innerHTML = lumpSumText;

							_CORE.refs["OVERPAYMENT-CALC_mortgage-overpayment-message-container"].style.display= "block";

						} else {
							_CORE.refs["OVERPAYMENT-CALC_mortgage-overpayment-message-container"].style.display= "none";
						}
					}
					_CORE.overpayment.funcs.calculateTableValues();
				}
			},
			calculateTableValues: function(){
				_CORE.refs["OVERPAYMENT-CALC_mortgage-table-row-container"].innerHTML = "";

				_CORE.overpayment.cache.balanceResults = [];
				_CORE.overpayment.cache.balanceResults.push(['Year', 'Without Overpayment', 'With Overpayment']);

				_CORE.overpayment.cache.tableYear = 0;

				let mortgageBalance = parseFloat(_CORE.refs["OVERPAYMENT-CALC_mortgage_balance"].value.replaceAll(",", ""));
				let interestRate = parseFloat(_CORE.refs["OVERPAYMENT-CALC_mortgage_rate"].value.replaceAll(",", ""));
				let rate = (interestRate / 100) / 12;
				let mortgageTerm = parseFloat(_CORE.refs["OVERPAYMENT-CALC_mortgage_term_years"].value.replaceAll(",", ""));

				_CORE.overpayment.cache.balanceResults.push([0,Math.trunc(Number(mortgageBalance)),  Math.trunc(Number(mortgageBalance))]);

				if(_CORE.refs["OVERPAYMENT-CALC_mortgage_term_months"].value > 0){
					mortgageTerm = mortgageTerm + 1;
				}

				let overpaymentAmount = '';
				if(_CORE.refs["OVERPAYMENT-CALC_regular_overpayment"].value){
					overpaymentAmount = parseFloat(_CORE.refs["OVERPAYMENT-CALC_regular_overpayment"].value.replaceAll(",", ""));
				}

				let lumpSumAmount = '';
				if(_CORE.refs["OVERPAYMENT-CALC_lump_sum_overpayment"].value){
					lumpSumAmount = parseFloat(_CORE.refs["OVERPAYMENT-CALC_lump_sum_overpayment"].value.replaceAll(",", ""));
				}

				let paymentInterest;
				let paymentCapital;

				let paymentInterestOP;
				let paymentCapitalOP;

				let withoutOpBalance;
				let withOpBalance;

				function calulateNewBalance(i){

					// Monthly Balance

					for(let y = 0; y < 12; y++){

						if(i == 0 && y == 0){

							paymentInterest = rate * mortgageBalance;
							paymentCapital = _CORE.overpayment.cache.currentPaymentValue - paymentInterest;

							withOpBalance = mortgageBalance - (paymentCapital + overpaymentAmount + lumpSumAmount);

							withoutOpBalance = mortgageBalance - paymentCapital;

						} else {

							paymentInterest = rate * withoutOpBalance;
							paymentCapital = _CORE.overpayment.cache.currentPaymentValue - paymentInterest;

							paymentInterestOP = rate * withOpBalance;
							paymentCapitalOP = _CORE.overpayment.cache.currentPaymentValue - paymentInterestOP;

							withOpBalance = withOpBalance - (paymentCapitalOP + overpaymentAmount);

							withoutOpBalance = withoutOpBalance - paymentCapital;

							if(y == 11){

								if(withOpBalance <= 0 ){
									withOpBalance = 0;
								} 

								if(withoutOpBalance <= 0 ){
									withoutOpBalance = 0;
								} 

								_CORE.overpayment.cache.tableYear++;
								_CORE.overpayment.cache.tableWithOp = withOpBalance;
								_CORE.overpayment.cache.tableWithoutOp = withoutOpBalance;

							}
						}
						
					}
				}

				for(let i = 0; i <  mortgageTerm; i++){

					calulateNewBalance(i);

					let yearlyResult = [_CORE.overpayment.cache.tableYear, Math.trunc(Number(_CORE.overpayment.cache.tableWithoutOp)),  Math.trunc(Number(_CORE.overpayment.cache.tableWithOp))];
					_CORE.overpayment.cache.balanceResults.push(yearlyResult);

					if(i == (mortgageTerm - 1)){
						_CORE.overpayment.funcs.buildTable(mortgageTerm);
						_CORE.overpayment.funcs.drawBalanceChart();
					}
				}

			},
			buildTable:function(mortgageTerm){
				let results = _CORE.overpayment.cache.balanceResults;

				_CORE.refs["OVERPAYMENT-CALC_mortgage-table-row-container"].innerHTML = "";

				_CORE.refs["OVERPAYMENT-CALC_mortgage-table-row-container-extended"].innerHTML = "";

				_CORE.utils.forEach(results, function(index, arr){
					if(index == 0 || index > (mortgageTerm + 1)){
						// Dont Include
					} else if(index == (mortgageTerm + 1)){
						_CORE.overpayment.funcs.buildTableRow(mortgageTerm, 0, 0);					
					} else {
						let year = arr[0];
						let withoutOp = Math.trunc(Number(arr[1]));
						let withOp = Math.trunc(Number(arr[2]));

						_CORE.overpayment.funcs.buildTableRow(year, withOp, withoutOp);
					}
				});

			},
			buildTableRow: function(year, withOp, withoutOp){

				let withOpText = withOp.toLocaleString();
				let withoutOpText = withoutOp.toLocaleString();

				let gridDiv = document.createElement('div');
				gridDiv.classList.add('table-results-row', 'uk-grid', 'uk-margin-remove', 'uk-grid-row-collapse', 'uk-grid-collapse');
				gridDiv.setAttribute('uk-grid', '');

				let div1 = document.createElement('div');
				div1.classList.add('uk-text-center', 'uk-width-1-5', 'uk-width-1-3');
				let div1Content =  document.createTextNode(year);
				div1.appendChild(div1Content);

				let div2 = document.createElement('div');
				div2.classList.add('uk-text-center', 'uk-width-2-5', 'uk-width-1-3');
				let div2Content =  document.createTextNode('£' + withoutOpText);
				div2.appendChild(div2Content);

				let div3 = document.createElement('div');
				div3.classList.add('uk-text-center', 'uk-width-2-5', 'uk-width-1-3');
				let div3Content =  document.createTextNode('£' + withOpText);
				div3.appendChild(div3Content);

				gridDiv.appendChild(div1);
				gridDiv.appendChild(div2);
				gridDiv.appendChild(div3);

				if((year <= 10)){
					_CORE.refs["OVERPAYMENT-CALC_mortgage-table-row-container"].appendChild(gridDiv);
				} else {
					_CORE.refs["OVERPAYMENT-CALC_mortgage-table-row-container-extended"].appendChild(gridDiv);
				}

				
			},
			drawBalanceChart: function(){

				//console.log(_CORE.overpayment.cache.balanceResults);
				// Load the Visualization API and the corechart package.
				google.charts.load('current', {'packages':['corechart']});

				// Set a callback to run when the Google Visualization API is loaded.
				google.charts.setOnLoadCallback(drawChart);
			
				// Callback that creates and populates a data table,
				// instantiates the pie chart, passes in the data and
				// draws it.

				function drawChart() {
			
					// Create the data table.
					var data = new google.visualization.DataTable();
					var data = google.visualization.arrayToDataTable(_CORE.overpayment.cache.balanceResults);
				
					// Set chart options
					var options = {'title':'',
									curveType: 'function',
									legend: { position: 'top' },
									colors: ['#608b84', '#373542'],
									/*lineWidth: 2,*/
									pointShape: 'circle',
									pointSize: 5,
									backgroundColor: {
										fill: '#c2c2c2',
										fillOpacity: 0.8
									},
									vAxis: {title: "Mortgage Balance (£)", minValue: 0, format: 'short', viewWindow:{min:0}},
									hAxis: {title: "Term (Years)", minValue: 0, viewWindow:{min:0}},
									tooltip: {isHtml: true},
									chartArea: {
										height: '100%',
										width: '100%',
										top: 30,
										left: 60,
										right: 16,
										bottom: 30
									},
									height: '100%',
									width: '100%',
								};
				
					// Instantiate and draw our chart, passing in some options.
					var container = _CORE.refs["OVERPAYMENT-CALC_mortgage-chart-div"];
					var chart = new google.visualization.LineChart(container);

					google.visualization.events.addListener(chart, 'onmouseover', function (props) {

				
						var tooltip = container.getElementsByTagName('ul');
						var tooltipLabel = container.getElementsByTagName('span');
						if (tooltip.length > 0) {
							let year = tooltipLabel[0].textContent;
							let newYearText = 'Year: ' + year;
							tooltipLabel[0].textContent = newYearText;

							tooltipLabel[1].style.display = "block";

							let balance = tooltipLabel[2].textContent;
							let newBalanceText = '£' + balance;
							tooltipLabel[2].textContent = newBalanceText;
						}
					});
				
					window.addEventListener('resize', function(event){
						console.log('resizing')
						redrawChart();
					});

					redrawChart();
				
					function redrawChart(){
						chart.clearChart();
						chart.draw(data, options);
					}
				}
			},
			expandShrinkExtendedRows: function(btn){
				let extendedRows = _CORE.refs["OVERPAYMENT-CALC_mortgage-table-row-container-extended"];

				if(extendedRows.classList.contains('uk-hidden')){
					extendedRows.classList.remove('uk-hidden');
					btn.setAttribute('uk-icon', 'shrink');
				} else {
					extendedRows.classList.add('uk-hidden');
					btn.setAttribute('uk-icon', 'expand');
				}
			}
        }
		// End of extend	
	},'overpayment');
})(_CORE);
