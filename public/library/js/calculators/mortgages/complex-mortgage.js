(function(c){
	c.extend(
	{
		utils:{

		},
		context:{},
		refs:{},
		cache:{},
		funcs:{
            init: function(){	
				_CORE.complex_mortgage.funcs.buildElementReferences();
            },
			buildElementReferences: function(){

				// Current Monthly Payment
				_CORE.refs.currentPaymentValue;

				// New Monthly Payment
				_CORE.refs.newPaymentValue;

				// Product Expiry Date
				let expiryDate = new Date();
				expiryDate.setMonth(expiryDate.getMonth() + 24);
				let formattedDate = expiryDate.toLocaleDateString('en-GB');
				let split = formattedDate.split('/');
				let correctDateFormat = split[2] + '-' + split[1] + '-' + split[0];

				_CORE.refs["COMPLEX-CALC_mortgage-product-expiry-date"].value = correctDateFormat;

				_CORE.refs.tableYear = 0;
				_CORE.refs.tableMonth = 0;
				_CORE.refs.tableWithOp;
				_CORE.refs.tableWithoutOp;

				_CORE.cache.mortgage_data = [{}];

				_CORE.complex_mortgage.funcs.setupInputs();
			},
			setupInputs: function() {

				/*
				_CORE.refs["property-value"].onchange = function(){
					_CORE.complex_mortgage.funcs.currentPaymentCalc();
				}
				*/

				_CORE.refs["COMPLEX-CALC_mortgage_balance"].onchange = function(){
					_CORE.complex_mortgage.funcs.inputValidation(this);
					_CORE.complex_mortgage.funcs.currentPaymentCalc();
				}

				_CORE.refs["COMPLEX-CALC_mortgage_term_years"].onchange = function(){
					_CORE.complex_mortgage.funcs.inputValidation(this);
					_CORE.complex_mortgage.funcs.inputValidation(document.querySelector('[data-calculator-field="COMPLEX-CALC_mortgage-product-expiry-date"]'));
					_CORE.complex_mortgage.funcs.currentPaymentCalc();
				}

				_CORE.refs["COMPLEX-CALC_mortgage_term_months"].onchange = function(){
					_CORE.complex_mortgage.funcs.inputValidation(this);
					_CORE.complex_mortgage.funcs.currentPaymentCalc();
				}

				_CORE.refs["COMPLEX-CALC_mortgage_rate"].onchange = function(){
					_CORE.complex_mortgage.funcs.inputValidation(this);
					_CORE.complex_mortgage.funcs.currentPaymentCalc();
				}

				_CORE.refs["COMPLEX-CALC_mortgage-regular-overpayment"].onchange = function(){
					_CORE.complex_mortgage.funcs.currentPaymentCalc();
				}

				_CORE.refs["COMPLEX-CALC_mortgage-overpayment-interval"].value = '1';

				_CORE.refs["COMPLEX-CALC_mortgage-overpayment-interval"].onchange = function(){
					_CORE.complex_mortgage.funcs.currentPaymentCalc();
				}

				_CORE.refs["COMPLEX-CALC_mortgage-annual-overpayment"].onchange = function(){
					_CORE.complex_mortgage.funcs.currentPaymentCalc();
				}

				_CORE.refs["COMPLEX-CALC_mortgage-product-expiry-date"].onchange = function(){
					_CORE.complex_mortgage.funcs.inputValidation(this);
					_CORE.complex_mortgage.funcs.currentPaymentCalc();
				}

				_CORE.complex_mortgage.funcs.currentPaymentCalc();

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
				
				let type = input.getAttribute('data-calculator-field');	

				let val;
				if(type == 'COMPLEX-CALC_mortgage-product-expiry-date'){
					val = _CORE.refs["COMPLEX-CALC_mortgage-product-expiry-date"].value;
				} else {
					val = parseFloat(input.value.replaceAll(",", ""));
				}

				let errorContainer = _CORE.refs["mortgage-details-error-text"];
				let errorText = _CORE.refs["mortgage-details-error-text"].querySelector('h4');

				errorContainer.classList.add('uk-hidden');

				let resultsContainer = _CORE.refs["mortgage-results-container"];
				resultsContainer.classList.remove('uk-hidden');

 				if(type == 'COMPLEX-CALC_mortgage_term_years'){
					if(isNaN(val) || !Number.isInteger(val) || val > 40 || val == 0){
						//console.log('fail');
						if(val > 40){
							input.value = 40;

							errorText.textContent = "The remaining duration must be atleast 1 year and not exceed 40 years.";
							errorContainer.classList.remove("uk-hidden");
						} else if(!_CORE.refs["COMPLEX-CALC_mortgage_term_months"].value) {
							input.value = 1;

							errorText.textContent = "The remaining duration must be atleast 1 year and not exceed 40 years.";
							errorContainer.classList.remove("uk-hidden");
						}
					} else {
						//console.log('success');
					}
				} else if(type == 'COMPLEX-CALC_mortgage_term_months'){
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
				} else if(type == 'COMPLEX-CALC_mortgage_balance'){
					if(isNaN(val) || !Number.isInteger(val) || val == 0){
						//console.log('fail');

						resultsContainer.classList.add('uk-hidden');

						errorText.textContent = "The remaining balance must be atleast £1.";
						errorContainer.classList.remove("uk-hidden");
					} else {
						//console.log('success');
					}
				} else if(type == 'COMPLEX-CALC_mortgage_rate'){
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
				} else if(type == 'COMPLEX-CALC_mortgage-product-expiry-date'){

					console.log(val);
					
					let split = val.split('-');
	
					let todaysDate = new Date(); 
	
					function addYears(date, years) {
						date.setFullYear(date.getFullYear() + years);
						return date;
					}
	
					let mortgageTerm = parseFloat(_CORE.refs["COMPLEX-CALC_mortgage_term_years"].value.replaceAll(",", ""));
					let termEndDate = (addYears(todaysDate, mortgageTerm));
					let fullFormattedDate = split[1] + '/' + split[2] + '/' + split[0];
									
					let resultsContainer = _CORE.refs["_COMPLEX-CALC_mortgage-product_expiry_results_container"];
					let errorContainer = _CORE.refs["_COMPLEX-CALC_mortgage-product_expiry_error_container"];
	
					if(Date.parse(fullFormattedDate) < Date.parse(termEndDate)){

						resultsContainer.classList.remove('uk-hidden');
						errorContainer.classList.add('uk-hidden');

						console.log('before end');

					 } else {

						console.log('after end');
						let endDateSplit = (termEndDate.toLocaleDateString('en-GB')).split('/');
						
						let formattedEndDate = endDateSplit[2] + '-' + endDateSplit[1] + '-' + endDateSplit[0];
						//input.value = formattedEndDate;

						resultsContainer.classList.add('uk-hidden');
						errorContainer.classList.remove('uk-hidden');
						
						//UIkit.notification('Product Expiry Date cannot be beyond the mortgage end date.');
						//input.value = termEndDate;
						
					}
					
				} else if(type == "COMPLEX-CALC_mortgage-regular-overpayment" || type == 'COMPLEX-CALC_mortgage-annual-overpayment'){
					if(val > parseFloat(_CORE.complex_mortgage.refs["mortgage-balance"].value.replaceAll(",", ""))){
						/*
						overpaymentErrorText.textContent = "The mortgage overpayments must be less than the total mortgage balance!";
						overpaymentErrorContainer.classList.remove('uk-hidden');
						*/
						input.value = 0;
					}
				} 
			},
			currentPaymentCalc: function(){
				let interestRate = parseFloat(_CORE.refs["COMPLEX-CALC_mortgage_rate"].value.replaceAll(",", ""));
				let mortgageBalance = parseFloat(_CORE.refs["COMPLEX-CALC_mortgage_balance"].value.replaceAll(",", ""));


				// Nper = total number of payments
				let nper = 12;
				let mortgageTerm;
				let mortgageTermMonths;

				if(_CORE.refs["COMPLEX-CALC_mortgage_term_years"].value){
					mortgageTerm = parseFloat(_CORE.refs["COMPLEX-CALC_mortgage_term_years"].value.replaceAll(",", ""));
				} else {
					_CORE.refs["COMPLEX-CALC_mortgage_term_years"].value = 0;
				}

				if(_CORE.refs["COMPLEX-CALC_mortgage_term_months"].value){
					mortgageTermMonths = parseFloat(_CORE.refs["COMPLEX-CALC_mortgage_term_months"].value.replaceAll(",", ""));

					if(mortgageTermMonths > 11 ){
						// Display Error Message - Value cannot be greater than 11. Showing results for 11 months.
						_CORE.refs["COMPLEX-CALC_mortgage_term_months"].value = 11;
						mortgageTermMonths = 11;
					}
				} else {
					_CORE.refs["COMPLEX-CALC_mortgage_term_months"].value = 0;
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

					_CORE.refs["COMPLEX-CALC_mortgage_term_years"].value = 1;
					mortgageTerm = 1;
				}

				let rate = (interestRate / 100) / 12;

				let pmt =  _CORE.complex_mortgage.funcs.PMT(rate, parseInt(nper), mortgageBalance);

				let result = pmt.toFixed(2);

				_CORE.refs["COMPLEX-CALC_mortgage-current-monthly-payment"].textContent = '£' + Number(result).toLocaleString();
				_CORE.refs.currentPaymentValue = result;

				_CORE.refs["COMPLEX-CALC_mortgage-new-monthly-payment"].textContent = '£' + Number(result).toLocaleString();

				/*
				let propertyValue = parseFloat(_CORE.refs["property-value"].value.replaceAll(",", ""));
				_CORE.refs["mortgage-equity"].textContent = (propertyValue - mortgageBalance).toLocaleString("en-GB", {style:"currency", currency:"GBP"});
				*/
				
				_CORE.complex_mortgage.funcs.newPaymentCalc(result);
			},
			newPaymentCalc: function(currentPayment){
				currentPayment = parseFloat(currentPayment.replaceAll(",", ""));

				let overpaymentAmount;
				let lumpSumAmount;

				let newPayment = currentPayment;

				if(_CORE.refs["COMPLEX-CALC_mortgage-regular-overpayment"].value){

					overpaymentAmount = parseFloat(_CORE.refs["COMPLEX-CALC_mortgage-regular-overpayment"].value.replaceAll(",", ""));
					newPayment = overpaymentAmount + currentPayment;

					_CORE.refs["COMPLEX-CALC_mortgage-new-monthly-payment"].textContent = '£' + newPayment.toLocaleString();
					_CORE.refs.newPaymentValue = newPayment;		
					
				} else {
					_CORE.refs["COMPLEX-CALC_mortgage-new-monthly-payment"].textContent = '£' + currentPayment.toLocaleString();
				}

				let balance = parseFloat(_CORE.refs["COMPLEX-CALC_mortgage_balance"].value.replaceAll(",", ""));
				let interestRate = parseFloat(_CORE.refs["COMPLEX-CALC_mortgage_rate"].value.replaceAll(",", ""));
				let rate = (interestRate / 100) / 12;

				let currentMonthsResult = _CORE.complex_mortgage.funcs.NPER(rate, -currentPayment, balance);
				let totalInterest = (currentMonthsResult * currentPayment) - balance;

				// Mortgage Values with no overpayments
				_CORE.refs["COMPLEX-CALC_mortgage-total-payments-default"].innerHTML = 'Total Payment Amount Of <span class="uk-text-bold">' + Number(currentMonthsResult * currentPayment).toLocaleString("en-GB", {style:"currency", currency:"GBP"}) + '</span>';
				_CORE.refs["COMPLEX-CALC_mortgage-total-interest-default"].innerHTML = 'Total Interest Of <span class="uk-text-bold">' + Number(totalInterest).toLocaleString("en-GB", {style:"currency", currency:"GBP"}) + '</span>';
				_CORE.refs.totalInterestDefaultVal = totalInterest;

				_CORE.complex_mortgage.funcs.calculateStandardMortgageBalance();
				_CORE.complex_mortgage.funcs.calculateTableValues();
			},
			calculateStandardMortgageBalance: function(){
				let mortgageBalance = parseFloat(_CORE.refs["COMPLEX-CALC_mortgage_balance"].value.replaceAll(",", ""));
				let interestRate = parseFloat(_CORE.refs["COMPLEX-CALC_mortgage_rate"].value.replaceAll(",", ""));
				let rate = (interestRate / 100) / 12;
				let mortgageTerm = parseFloat(_CORE.refs["COMPLEX-CALC_mortgage_term_years"].value.replaceAll(",", ""));

				_CORE.complex_mortgage.cache.balanceResults = [];
				_CORE.complex_mortgage.cache.balanceResults.push(['Year', 'Without Overpayment', 'With Overpayment']);
				_CORE.complex_mortgage.cache.balanceResults.push([0,Math.trunc(Number(mortgageBalance)),  Math.trunc(Number(mortgageBalance))]);

				_CORE.complex_mortgage.cache.standardBalance = mortgageBalance;

				function calulateNewBalance(i){

					for(let y = 1; y < 13; y++){

						let newMortgageBalance = _CORE.complex_mortgage.cache.standardBalance;
						let paymentInterest = rate * newMortgageBalance;
						let paymentCapital = _CORE.refs.currentPaymentValue - paymentInterest;

						_CORE.complex_mortgage.cache.standardBalance = newMortgageBalance - paymentCapital;

						if(y == 12){
							
							_CORE.complex_mortgage.cache.balanceResults.push([(i + 1),Math.trunc(Number(_CORE.complex_mortgage.cache.standardBalance)),  Math.trunc(Number(_CORE.complex_mortgage.cache.standardBalance))]);
						}
					}
				}	

				for(let i = 0; i <  mortgageTerm; i++){

					calulateNewBalance(i);

					if(i == (mortgageTerm - 1)){
						_CORE.complex_mortgage.cache.balanceResults.push([(mortgageTerm + 1), 0,  0]);
					}
				}

			},
			calculateTableValues: function(){

				_CORE.refs["COMPLEX-CALC_mortgage-table-row-container"].innerHTML = "";
				_CORE.refs["COMPLEX-CALC_mortgage-table-row-container-extended"].innerHTML = "";

				_CORE.refs.tableYear = 0;
				_CORE.refs.tableCount = 0;

				let overpaymentAmount = 0;
				if(_CORE.refs["COMPLEX-CALC_mortgage-regular-overpayment"].value){
					overpaymentAmount = parseFloat(_CORE.refs["COMPLEX-CALC_mortgage-regular-overpayment"].value.replaceAll(",", ""));
				}

				let overpaymentInterval = 1;
				if(_CORE.refs["COMPLEX-CALC_mortgage-overpayment-interval"].value){
					overpaymentInterval = parseFloat(_CORE.refs["COMPLEX-CALC_mortgage-overpayment-interval"].value.replaceAll(",", ""));
				}

				let annualOverpayment = 0;
				if(_CORE.refs["COMPLEX-CALC_mortgage-annual-overpayment"].value){
					annualOverpayment = parseFloat(_CORE.refs["COMPLEX-CALC_mortgage-annual-overpayment"].value.replaceAll(",", ""));
				}

				let mortgageBalance = parseFloat(_CORE.refs["COMPLEX-CALC_mortgage_balance"].value.replaceAll(",", ""));
				let interestRate = parseFloat(_CORE.refs["COMPLEX-CALC_mortgage_rate"].value.replaceAll(",", ""));
				let rate = (interestRate / 100) / 12;
				let mortgageTerm = parseFloat(_CORE.refs["COMPLEX-CALC_mortgage_term_years"].value.replaceAll(",", ""));
				
				if(_CORE.refs["COMPLEX-CALC_mortgage_term_months"].value){
					mortgageTerm = mortgageTerm + 1;
				}
				
				let paymentInterest;
				let paymentCapital;

				let withOpBalance;

				let lastRow = false;

				function calulateNewBalance(i){

					// Monthly Balance

					for(let y = 1; y < 13; y++){

						if(i == 0 && y == 1){
							
							_CORE.refs.tableCount++;

							paymentInterest = rate * mortgageBalance;
							paymentCapital = _CORE.refs.currentPaymentValue - paymentInterest;

							_CORE.refs.totalOverpaymentAmount = 0;
							_CORE.refs.regularOverpaymentAmount = 0;

							if(_CORE.cache.mortgage_data[_CORE.refs.tableCount]){
								if(_CORE.cache.mortgage_data[_CORE.refs.tableCount]["adhoc_op"]){
									_CORE.refs.totalOverpaymentAmount += _CORE.cache.mortgage_data[_CORE.refs.tableCount]["adhoc_op"];
								}
							}

							if(overpaymentInterval > 1){
								withOpBalance = mortgageBalance - (paymentCapital + _CORE.refs.totalOverpaymentAmount);
								_CORE.refs.regularOverpaymentAmount += overpaymentAmount;
							} else {
								_CORE.refs.regularOverpaymentAmount += overpaymentAmount;
								_CORE.refs.totalOverpaymentAmount += overpaymentAmount;
								withOpBalance = mortgageBalance - (paymentCapital + _CORE.refs.totalOverpaymentAmount);
							}

							_CORE.refs.tablePaymentInterest = paymentInterest;
							_CORE.refs.tablePaymentCapital = paymentCapital + _CORE.refs.totalOverpaymentAmount;

							let startDate = new Date();
							startDate.setMonth(startDate.getMonth() + _CORE.refs.tableCount);
							let formattedDate = startDate.toLocaleDateString('en-GB');

							_CORE.refs.tableDueDate = formattedDate;
							_CORE.refs.tableWithOp = withOpBalance;

							_CORE.complex_mortgage.funcs.buildTableRow(true);

						} else {

							_CORE.refs.tableCount++;

							let updatedBalance = _CORE.refs.tableWithOp;

							paymentInterest = rate * updatedBalance;
							paymentCapital = _CORE.refs.currentPaymentValue - paymentInterest;

							let totalPaymentCapital;

							_CORE.refs.totalOverpaymentAmount = 0;
							_CORE.refs.regularOverpaymentAmount = 0;

							if(_CORE.cache.mortgage_data[_CORE.refs.tableCount]){
								if(_CORE.cache.mortgage_data[_CORE.refs.tableCount]["adhoc_op"]){
									_CORE.refs.totalOverpaymentAmount += _CORE.cache.mortgage_data[_CORE.refs.tableCount]["adhoc_op"];
								}
							}

							if(overpaymentInterval == '1'){
								_CORE.refs.regularOverpaymentAmount += overpaymentAmount;
								_CORE.refs.totalOverpaymentAmount += overpaymentAmount;
								totalPaymentCapital = paymentCapital + _CORE.refs.totalOverpaymentAmount;
							} else {
								let isValid = y % overpaymentInterval === 0;
								if(isValid){
									_CORE.refs.regularOverpaymentAmount += overpaymentAmount;
									_CORE.refs.totalOverpaymentAmount += overpaymentAmount;
									totalPaymentCapital = paymentCapital + _CORE.refs.totalOverpaymentAmount;

								} else {
									totalPaymentCapital = paymentCapital; 
								}
							}
							
							if(y == 12){
								_CORE.refs.regularOverpaymentAmount += annualOverpayment;
								_CORE.refs.totalOverpaymentAmount += annualOverpayment;
								totalPaymentCapital = paymentCapital + _CORE.refs.totalOverpaymentAmount;
							}

							let newBalance = updatedBalance - totalPaymentCapital;

							_CORE.refs.tablePaymentInterest = paymentInterest;
							_CORE.refs.tablePaymentCapital = paymentCapital + _CORE.refs.totalOverpaymentAmount;

							let startDate = new Date();
							startDate.setMonth(startDate.getMonth() + _CORE.refs.tableCount);
							let formattedDate = startDate.toLocaleDateString('en-GB');

							_CORE.refs.tableDueDate = formattedDate;

							_CORE.refs.tableWithOp = newBalance;

							if(newBalance < 0 ){
								newBalance = 0;
								_CORE.refs.numberOfPayments = _CORE.refs.tableCount;
								lastRow = true;
								_CORE.refs.currentPaymentValue = updatedBalance + _CORE.refs.tablePaymentInterest;
								_CORE.refs.regularOverpaymentAmount = 0;
								_CORE.refs.tablePaymentCapital = updatedBalance;
								_CORE.refs.tableWithOp = 0;

								_CORE.complex_mortgage.funcs.buildTableRow(false);
								_CORE.complex_mortgage.funcs.fullAmortization();
								_CORE.complex_mortgage.funcs.balanceProductExpiry();

								function updateBalanceResults(){
									for(let x = i + 2; x < (mortgageTerm + 2); x++){
										_CORE.complex_mortgage.cache.balanceResults[x][2] = 0
									}
								}

								updateBalanceResults();
								_CORE.complex_mortgage.funcs.drawBalanceChart();

								break;
							} else {
								if(i == 0 && y <= 10){
									_CORE.complex_mortgage.funcs.buildTableRow(true);
								} else if(parseFloat(_CORE.refs["COMPLEX-CALC_mortgage_term_years"].value.replaceAll(",", "")) == 0){
									_CORE.complex_mortgage.funcs.buildTableRow(true);
								} else {
									_CORE.complex_mortgage.funcs.buildTableRow(false);
								}
							}
						}

						if(y == 12){
							_CORE.complex_mortgage.cache.balanceResults[i + 2][2] = Math.trunc(Number(_CORE.refs.tableWithOp));
						}

					}
				}

				for(let i = 0; i <  mortgageTerm; i++){
					if(lastRow == false){
						calulateNewBalance(i);
					} else {
						break;
					}
				}

			},
			buildTableRow: function(lessThan10){

				if(_CORE.cache.mortgage_data[_CORE.refs.tableCount]){

					_CORE.cache.mortgage_data[_CORE.refs.tableCount]["count"] = _CORE.refs.tableCount;
					_CORE.cache.mortgage_data[_CORE.refs.tableCount]["due_date"] = _CORE.refs.tableDueDate;
					_CORE.cache.mortgage_data[_CORE.refs.tableCount]["payment"] = _CORE.refs.currentPaymentValue;
					_CORE.cache.mortgage_data[_CORE.refs.tableCount]["regular_op"] = _CORE.refs.regularOverpaymentAmount;
					_CORE.cache.mortgage_data[_CORE.refs.tableCount]["interest"] = _CORE.refs.tablePaymentInterest;
					_CORE.cache.mortgage_data[_CORE.refs.tableCount]["capital"] = _CORE.refs.tablePaymentCapital;
					_CORE.cache.mortgage_data[_CORE.refs.tableCount]["balance"] = _CORE.refs.tableWithOp.toFixed(2);

				} else {
					let data = {};

					data["count"] = _CORE.refs.tableCount;
					data["due_date"] = _CORE.refs.tableDueDate;
					data["payment"] = _CORE.refs.currentPaymentValue;
					data["regular_op"] = _CORE.refs.regularOverpaymentAmount;
					data["interest"] = _CORE.refs.tablePaymentInterest;
					data["capital"] = _CORE.refs.tablePaymentCapital;
					data["balance"] = _CORE.refs.tableWithOp.toFixed(2);

					_CORE.cache.mortgage_data[_CORE.refs.tableCount] = data;
				}

				let newBalance = _CORE.refs.tableWithOp.toFixed(2);
				let withOp = Number(newBalance).toLocaleString("en-GB", {style:"currency", currency:"GBP"});

				let count = _CORE.refs.tableCount;
				let dueDate = _CORE.refs.tableDueDate;
				let payment = Number(_CORE.refs.currentPaymentValue).toLocaleString("en-GB", {style:"currency", currency:"GBP"});
				let overpaymentAmount = Number(_CORE.refs.regularOverpaymentAmount).toLocaleString("en-GB", {style:"currency", currency:"GBP"});

				let interest = Number(_CORE.refs.tablePaymentInterest).toLocaleString("en-GB", {style:"currency", currency:"GBP"})

				let capital = _CORE.refs.tablePaymentCapital.toFixed(2);
				let capitalText = Number(capital).toLocaleString("en-GB", {style:"currency", currency:"GBP"});

				let gridDiv = document.createElement('div');
				gridDiv.classList.add('table-results-row', 'uk-grid', 'uk-margin-remove', 'uk-grid-row-collapse', 'uk-grid-collapse');
				gridDiv.setAttribute('uk-grid', '');

				let countDiv = document.createElement('div');
				countDiv.classList.add('uk-text-center');
				countDiv.style.width = '50px';
				let countDivContent =  document.createTextNode(count);
				countDiv.appendChild(countDivContent);

				let dueDateDiv = document.createElement('div');
				dueDateDiv.classList.add('uk-text-center', 'uk-width-expand', 'table-payment-date');
				let dueDateDivContent =  document.createTextNode(dueDate);
				dueDateDiv.appendChild(dueDateDivContent);

				let paymentDiv = document.createElement('div');
				paymentDiv.classList.add('uk-text-center', 'uk-width-expand');
				let paymentDivContent =  document.createTextNode(payment);
				paymentDiv.appendChild(paymentDivContent);

				let overpaymentDiv = document.createElement('div');
				overpaymentDiv.classList.add('uk-text-center', 'uk-width-expand');
				let overpaymentDivContent =  document.createTextNode(overpaymentAmount);
				overpaymentDiv.appendChild(overpaymentDivContent);

				let adhocOverpaymentsDiv = document.createElement('div');
				adhocOverpaymentsDiv.classList.add('uk-text-center', 'uk-width-expand');

				let adhocInputContainer =  document.createElement('div');
				adhocInputContainer.classList.add('uk-position-relative', 'uk-padding-remove', 'adhoc-container');
				adhocInputContainer.dataset.prefix = "£";

				let adhocInput = document.createElement('input');
				adhocInput.classList.add('uk-input', 'table-adhoc-overpayment');
				adhocInput.style.height = "auto";
				adhocInput.setAttribute('type', 'number');
				adhocInput.dataset.format = "number";
				adhocInput.dataset.kata ='';

				if(_CORE.cache.mortgage_data[count]["adhoc_op"]){

					adhocInput.value = _CORE.cache.mortgage_data[count]["adhoc_op"];

				} else {
					adhocInput.value = 0;
				}

				adhocInput.onchange = function(){
					_CORE.complex_mortgage.funcs.updateAdhocOverpayment(count, this);
				}

				adhocInputContainer.appendChild(adhocInput);
				adhocOverpaymentsDiv.appendChild(adhocInputContainer);

				let interestDiv = document.createElement('div');
				interestDiv.classList.add('uk-text-center', 'uk-width-expand', 'table-payment-interest');
				let interestDivContent =  document.createTextNode(interest);
				interestDiv.appendChild(interestDivContent);

				let capitalDiv = document.createElement('div');
				capitalDiv.classList.add('uk-text-center', 'uk-width-expand', 'table-payment-capital');
				let capitalDivContent =  document.createTextNode(capitalText);
				capitalDiv.appendChild(capitalDivContent);

				let balanceDiv = document.createElement('div');
				balanceDiv.classList.add('uk-text-center', 'uk-width-expand', 'table-balance');
				let balanceDivContent =  document.createTextNode(withOp);
				balanceDiv.appendChild(balanceDivContent);

				gridDiv.appendChild(countDiv);
				gridDiv.appendChild(dueDateDiv);
				gridDiv.appendChild(paymentDiv);
				gridDiv.appendChild(overpaymentDiv);
				gridDiv.appendChild(adhocOverpaymentsDiv);
				gridDiv.appendChild(interestDiv);
				gridDiv.appendChild(capitalDiv);
				gridDiv.appendChild(balanceDiv);

				if(lessThan10){
					_CORE.refs["COMPLEX-CALC_mortgage-table-row-container"].appendChild(gridDiv);
				} else {
					_CORE.refs["COMPLEX-CALC_mortgage-table-row-container-extended"].appendChild(gridDiv);
				}
			},
			drawBalanceChart: function(){

				console.log(_CORE.complex_mortgage.cache.balanceResults);
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
					var data = google.visualization.arrayToDataTable(_CORE.complex_mortgage.cache.balanceResults);
				
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
					var container = _CORE.refs["COMPLEX-CALC_mortgage-chart-div"];
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
			balanceProductExpiry: function(){
				let date = _CORE.refs["COMPLEX-CALC_mortgage-product-expiry-date"].value;

				if(date){
					let split = date.split('-');
					let formattedDate = split[1] + '/' + split[0];
	
					let todaysDate = new Date(); 
	
					function addYears(date, years) {
						date.setFullYear(date.getFullYear() + years);
						return date;
					}
	
					let mortgageTerm = parseFloat(_CORE.refs["COMPLEX-CALC_mortgage_term_years"].value.replaceAll(",", ""));
					let termEndDate = (addYears(todaysDate, mortgageTerm)).toLocaleDateString('en-GB');
					let fullFormattedDate = split[2] + '/' + split[1] + '/' + split[0];
	
					if(Date.parse(fullFormattedDate) < Date.parse(termEndDate)){
						//console.log('before end');
					 } else {
						//console.log('after end');
					 }
	
					let paymentInterestValues = document.querySelectorAll('.table-payment-interest');
					let paymentInterestTotal = 0;
	
					let paymentCapitalValue = document.querySelectorAll('.table-payment-capital');
					let paymentCapitalTotal = 0;
	
					let paymentDates = document.querySelectorAll('.table-payment-date');
	
					let balanceArr = document.querySelectorAll('.table-balance');
	
					let productExpiryIndex;
	
					function findIndex(){
	
						_CORE.utils.forEach(paymentDates, function(index, item){
	
							let splitItem = item.textContent.split('/');
							let date = splitItem[1] + '/' + splitItem[2]; 
	
							if(formattedDate == date){
								productExpiryIndex = index;
	
								_CORE.utils.forEach(paymentInterestValues, function(num, val){
									if(num <= productExpiryIndex){
										let num = val.textContent.split('£')[1];
										if(num.includes(',')){
										let commaRemoved = parseFloat(num.replaceAll(",", ""));
											paymentInterestTotal += commaRemoved;
										} else {
											paymentInterestTotal += Number(num);
										}
									}
								});
	
								_CORE.utils.forEach(paymentCapitalValue, function(num, val){
									if(num <= productExpiryIndex){
										let num = val.textContent.split('£')[1];
										if(num.includes(',')){
										let commaRemoved = parseFloat(num.replaceAll(",", ""));
										paymentCapitalTotal += commaRemoved;
										} else {
											paymentCapitalTotal += Number(num);
										}
									}
								});
							}
						});
	
					}
	
					findIndex();
	
					_CORE.refs["COMPLEX-CALC_mortgage-product_expiry_interest"].textContent = paymentInterestTotal.toLocaleString("en-GB", {style:"currency", currency:"GBP"});
					_CORE.refs["COMPLEX-CALC_mortgage-product_expiry_capital"].textContent = paymentCapitalTotal.toLocaleString("en-GB", {style:"currency", currency:"GBP"});
					_CORE.refs["COMPLEX-CALC_mortgage-product_expiry_outstanding"].textContent = balanceArr[productExpiryIndex].innerHTML;
				}
	
			},
			fullAmortization: function(){

				let paymentInterestValues = document.querySelectorAll('.table-payment-interest');
				let paymentInterestTotal = 0;

				let paymentCapitalValue = document.querySelectorAll('.table-payment-capital');
				let paymentCapitalTotal = 0;

				function sumOfPaymentCapitalAndInterest(){
					_CORE.utils.forEach(paymentInterestValues, function(index, val){
						let num = val.textContent.split('£')[1];
						if(num.includes(',')){
						let commaRemoved = parseFloat(num.replaceAll(",", ""));
							paymentInterestTotal += commaRemoved;
						} else {
							paymentInterestTotal += Number(num);
						}
					});

					_CORE.utils.forEach(paymentCapitalValue, function(index, val){
						let num = val.textContent.split('£')[1];
						if(num.includes(',')){
						let commaRemoved = parseFloat(num.replaceAll(",", ""));
						paymentCapitalTotal += commaRemoved;
						} else {
							paymentCapitalTotal += Number(num);
						}
					});
				}

				sumOfPaymentCapitalAndInterest();

				let amortizationTotalPayments = paymentInterestTotal + paymentCapitalTotal;
				_CORE.refs["COMPLEX-CALC_mortgage-amortization-payment"].textContent = amortizationTotalPayments.toLocaleString("en-GB", {style:"currency", currency:"GBP"});

				let amortizationTotalInterest = paymentInterestTotal;
				_CORE.refs["COMPLEX-CALC_mortgage-amortization-interest"].textContent = amortizationTotalInterest.toLocaleString("en-GB", {style:"currency", currency:"GBP"});

				let amortizationNumOfPayments = _CORE.refs.numberOfPayments
				_CORE.refs["COMPLEX-CALC_mortgage-amortization-months"].textContent  = amortizationNumOfPayments;

				_CORE.refs["COMPLEX-CALC_mortgage-amortization-final-date"].textContent = _CORE.refs.tableDueDate;;

				let totalInterestWithNoOP = Number(_CORE.refs.totalInterestDefaultVal);
				
				let amortizationInterestSaved = (totalInterestWithNoOP - paymentInterestTotal);

				if(amortizationInterestSaved < 0){
					amortizationInterestSaved = 0;
				} else {
					if(amortizationInterestSaved > 0 && amortizationInterestSaved < 1){
						amortizationInterestSaved = 0;
					}
				}

				_CORE.refs["COMPLEX-CALC_mortgage-amortization-interest-saved"].textContent  = amortizationInterestSaved.toLocaleString("en-GB", {style:"currency", currency:"GBP"});
			},
			expandShrinkExtendedRows: function(btn){
				let extendedRows = _CORE.refs["COMPLEX-CALC_mortgage-table-row-container-extended"];

				if(extendedRows.classList.contains('uk-hidden')){
					extendedRows.classList.remove('uk-hidden');
					btn.setAttribute('uk-icon', 'shrink');
				} else {
					extendedRows.classList.add('uk-hidden');
					btn.setAttribute('uk-icon', 'expand');
				}
			},
			updateAdhocOverpayment: function(month, input){
				_CORE.cache.mortgage_data[month]["adhoc_op"] = Number(input.value);

				_CORE.complex_mortgage.funcs.currentPaymentCalc();
			}
        }
		// End of extend	
	},'complex_mortgage');
})(_CORE);

