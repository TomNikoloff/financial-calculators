(function(c){
	c.extend(	
	{
        utils: {

        },
		refs:{},
		funcs:{
            init: function(){	
				_CORE.simple_savings.funcs.setupInputs();
            },
			setupInputs: function() {
				_CORE.refs["SIMPLE-SAVINGS-CALC-savings-balance"].value = '3,000';

				_CORE.refs["SIMPLE-SAVINGS-CALC-savings-balance"].addEventListener("blur", _CORE.simple_savings.funcs.savingsResults);

				_CORE.utils.numberInputFormatter(_CORE.refs["SIMPLE-SAVINGS-CALC-savings-balance"]);

				_CORE.refs["SIMPLE-SAVINGS-CALC-monthly-savings"].value = '100';

				_CORE.refs["SIMPLE-SAVINGS-CALC-monthly-savings"].addEventListener("blur", _CORE.simple_savings.funcs.savingsResults);

				_CORE.utils.numberInputFormatter(_CORE.refs["SIMPLE-SAVINGS-CALC-monthly-savings"]);

				_CORE.refs["SIMPLE-SAVINGS-CALC_savings-term-years"].value = '1';

				_CORE.refs["SIMPLE-SAVINGS-CALC_savings-term-years"].addEventListener("blur", _CORE.simple_savings.funcs.savingsResults);

				_CORE.refs["SIMPLE-SAVINGS-CALC_savings-term-months"].value = '0';

				_CORE.refs["SIMPLE-SAVINGS-CALC_savings-term-months"].addEventListener("blur", _CORE.simple_savings.funcs.savingsResults);

				_CORE.refs["SIMPLE-SAVINGS-CALC-interest-rate-text"].value = '3';

				_CORE.refs["SIMPLE-SAVINGS-CALC-interest-rate-text"].addEventListener("blur", function(){
					_CORE.funcs.updateSlider('input', _CORE.refs["SIMPLE-SAVINGS-CALC-interest-rate"], this);
					_CORE.simple_savings.funcs.savingsResults();
				});

				_CORE.refs["SIMPLE-SAVINGS-CALC-interest-rate"].value = '3';

				_CORE.refs["SIMPLE-SAVINGS-CALC-interest-rate-text"].addEventListener("input", function(){
					_CORE.funcs.updateSlider('slider', this, _CORE.refs["SIMPLE-SAVINGS-CALC-interest-rate-text"]);
					_CORE.simple_savings.funcs.savingsResults();
				});

				_CORE.simple_savings.funcs.savingsResults();
			},
			savingsResults: function() {

				const initialInvestment = parseInt(_CORE.refs["SIMPLE-SAVINGS-CALC-savings-balance"].value.replaceAll(",", ""));
				const termYears = parseInt(_CORE.refs["SIMPLE-SAVINGS-CALC_savings-term-years"].value.replaceAll(",", ""));
				const termMonths = parseInt(_CORE.refs["SIMPLE-SAVINGS-CALC_savings-term-months"].value.replaceAll(",", ""));
				const interestRate = parseFloat(_CORE.refs["SIMPLE-SAVINGS-CALC-interest-rate-text"].value.replaceAll(",", ""));
				const monthlySavings = parseFloat(_CORE.refs["SIMPLE-SAVINGS-CALC-monthly-savings"].value.replaceAll(",", ""));

				let totalMonths = (termYears * 12) + termMonths;

				let rate = interestRate / 100;

				let totalSavings = initialInvestment;
				let totalCapital = initialInvestment;

				//console.log(totalMonths);

				function totalSavingsCalc(){
					for(let i = 0; i < totalMonths; i++){
						totalCapital += monthlySavings;
						totalSavings += monthlySavings;
						totalSavings += totalSavings * rate / 12;
					}
				}

				totalSavingsCalc();

				let totalInterestEarned = totalSavings - initialInvestment - monthlySavings * totalMonths;

				_CORE.refs["SIMPLE-SAVINGS-CALC-total-saved"].innerHTML = totalSavings.toLocaleString("en-GB", {style:"currency", currency:"GBP"});

				_CORE.refs["SIMPLE-SAVINGS-CALC-total-capital"].innerHTML = totalCapital.toLocaleString("en-GB", {style:"currency", currency:"GBP"});

				_CORE.refs["SIMPLE-SAVINGS-CALC-total-interest-gained"].innerHTML = totalInterestEarned.toLocaleString("en-GB", {style:"currency", currency:"GBP"});

			}
		}
		// End of extend	
	},'simple_savings');
})(_CORE);