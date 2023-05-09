(function(c){
	c.extend(	
	{
        utils: {

        },
		refs:{},
		funcs:{
            init: function(){	
                _CORE.simple_credit.funcs.setupInputs();
            },
			setupInputs: function() {

                _CORE.refs["CREDIT-CARD-CALC-balance"].value = '3,600';

                _CORE.refs["CREDIT-CARD-CALC-balance"].addEventListener("blur", _CORE.simple_credit.funcs.interestOnlyCalc);

                _CORE.utils.numberInputFormatter(_CORE.refs["CREDIT-CARD-CALC-balance"]);

                _CORE.refs["CREDIT-CARD-CALC-interest-rate-text"].value = '7.9';
                
                _CORE.refs["CREDIT-CARD-CALC-interest-rate-text"].addEventListener("blur", function(){
                    _CORE.funcs.updateSlider('input', _CORE.refs["CREDIT-CARD-CALC-interest-rate"], this);
					_CORE.simple_credit.funcs.interestOnlyCalc();
                });

                _CORE.refs["CREDIT-CARD-CALC-interest-rate"].value = '7.9';

                _CORE.refs["CREDIT-CARD-CALC-interest-rate"].addEventListener("input", function(){
                    _CORE.funcs.updateSlider('slider', this, _CORE.refs["CREDIT-CARD-CALC-interest-rate-text"]);
					_CORE.simple_credit.funcs.interestOnlyCalc();
                });

                _CORE.refs["CREDIT-CARD-CALC-monthly-amount"].addEventListener("blur", _CORE.simple_credit.funcs.interestOnlyCalc);

                _CORE.utils.numberInputFormatter(_CORE.refs["CREDIT-CARD-CALC-monthly-amount"]);

                _CORE.refs["CREDIT-CARD-CALC-amount-of-months"].value = '18';

                _CORE.refs["CREDIT-CARD-CALC-amount-of-months"].addEventListener("blur", _CORE.simple_credit.funcs.interestOnlyCalc);

                _CORE.simple_credit.funcs.interestOnlyCalc();
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
            interestOnlyCalc: function() {   
				
                let balance = parseFloat(_CORE.refs["CREDIT-CARD-CALC-balance"].value.replaceAll(",", ""));
                let interestRate = parseFloat(_CORE.refs["CREDIT-CARD-CALC-interest-rate-text"] .value.replaceAll(",", ""));

                let result = (balance * (interestRate / 100)) / 12;

                let interestOnly = _CORE.refs["CREDIT-CARD-interest-only-payment"];
                interestOnly.textContent = "£" + result.toFixed(2);

                _CORE.simple_credit.funcs.monthsToPayoffCalc();
                _CORE.simple_credit.funcs.monthlyPaymentCalc();
            },
            monthsToPayoffCalc: function() {

				let payOffResultsContainer = _CORE.refs["CREDIT-CARD-results-container"];
				let payoffResultsError = _CORE.refs["CREDIT-CARD-results-error"];

                let balance = parseFloat(_CORE.refs["CREDIT-CARD-CALC-balance"].value.replaceAll(",", ""));
                let interestRate = parseFloat(_CORE.refs["CREDIT-CARD-CALC-interest-rate-text"] .value.replaceAll(",", ""));
    
                let chosenMonthlyAmount = parseFloat(_CORE.refs["CREDIT-CARD-CALC-monthly-amount"].value.replaceAll(",", ""));

                let monthsTaken = _CORE.refs["CREDIT-CARD-months-to-payoff"];
                let yearsTaken = _CORE.refs["CREDIT-CARD-years-to-payoff"];
                let totalInterest = _CORE.refs["CREDIT-CARD-chosen-payment-total-interest"];
    
                let rate = (interestRate / 100) / 12;

                let monthsResult = _CORE.simple_credit.funcs.NPER(rate, -chosenMonthlyAmount, balance);

                if(monthsResult > 0){
                    let interestResult = (monthsResult * chosenMonthlyAmount) - balance;

                    monthsTaken.textContent = monthsResult.toFixed(2);
    
                    let yearsResult = monthsResult / 12;
                    yearsTaken.textContent = yearsResult.toFixed(2);
        
                    let formattedInterestResult = interestResult.toFixed(2);
                    totalInterest.textContent = "£" + _CORE.utils.numberFormatter(formattedInterestResult);

                    payOffResultsContainer.classList.remove('uk-hidden');
                    payoffResultsError.classList.add('uk-hidden');
                } else {
                    payOffResultsContainer.classList.add('uk-hidden');
                    payoffResultsError.classList.remove('uk-hidden');
                }
            },
            monthlyPaymentCalc: function() {

                let balance = parseFloat(_CORE.refs["CREDIT-CARD-CALC-balance"].value.replaceAll(",", ""));
                let interestRate = parseFloat(_CORE.refs["CREDIT-CARD-CALC-interest-rate-text"] .value.replaceAll(",", ""));
    
                let numOfMonths = parseFloat(_CORE.refs["CREDIT-CARD-CALC-amount-of-months"].value.replaceAll(",", ""));
                let monthlyPayments = _CORE.refs["CREDIT-CARD-monthly-payment"];
                let totalInterest = _CORE.refs["CREDIT-CARD-chosen-months-total-interest"]; 
    
                if(!numOfMonths){
                    monthlyPayments.textContent = "-";
                    totalInterest.textContent = "-";
                } else {
                    let rate = (interestRate / 100) / 12;
                    let monthlyPaymentsResult = _CORE.simple_credit.funcs.PMT(rate, parseInt(numOfMonths), -balance);
    
                    let formattedmonthlyPaymentsResult = monthlyPaymentsResult.toFixed(2);
                    monthlyPayments.textContent = "£" + _CORE.utils.numberFormatter(formattedmonthlyPaymentsResult);
    
                    let interestResult = (formattedmonthlyPaymentsResult * parseInt(numOfMonths)) - balance;
    
                    let formattedInterestResult = interestResult.toFixed(2);
                    totalInterest.textContent = "£" + _CORE.utils.numberFormatter(formattedInterestResult);
                }
            }
		}
		// End of extend	
	},'simple_credit');
})(_CORE);