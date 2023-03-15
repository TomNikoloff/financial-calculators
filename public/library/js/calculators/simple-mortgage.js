(function(c){
	c.extend(	
	{
        utils: {
 
        },
		refs:{},
		funcs:{
            init: function(){	
				_CORE.simple_mortgage.funcs.buildElementReferences('repayment');
            },
			updateSlider: function(slider){
				if(slider.id == 'SIMPLE-MORTGAGE-CALC_repayment_interest_rate' || slider.id == 'SIMPLE-MORTGAGE-CALC_interest_only_interest_rate'){
					_CORE.simple_mortgage.refs.interestRateText.textContent = slider.value;
				} else if(slider.id == 'SIMPLE-MORTGAGE-CALC_mortgage_term'){
					_CORE.simple_mortgage.refs.mortgageTermText.textContent = slider.value;
				}
			},
			buildElementReferences: function(type){

				let repaymentCalc = document.getElementById('REPAYMENT');
				let interestOnlyCalc = document.getElementById('INTEREST-ONLY');

				// Interest Only
				if(type == "interest_only"){
					_CORE.simple_mortgage.refs.interestOnlyBalance = document.getElementById('SIMPLE-MORTGAGE-CALC_interest_only_balance');
					_CORE.simple_mortgage.refs.interestRate = document.getElementById('SIMPLE-MORTGAGE-CALC_interest_only_interest_rate');
					_CORE.simple_mortgage.refs.interestRateText = document.getElementById('SIMPLE-MORTGAGE-CALC_interest_only_interest_rate_text');
				}

				// Repayment
				if(type == "repayment"){
					_CORE.simple_mortgage.refs.interestRate = document.getElementById('SIMPLE-MORTGAGE-CALC_repayment_interest_rate');
					_CORE.simple_mortgage.refs.mortgageTerm = document.getElementById('SIMPLE-MORTGAGE-CALC_mortgage_term');
					_CORE.simple_mortgage.refs.mortgageTermText = document.getElementById('SIMPLE-MORTGAGE-CALC_mortgage_term_text');
					_CORE.simple_mortgage.refs.repaymentBalance = document.getElementById('SIMPLE-MORTGAGE-CALC_repayment_balance');
					_CORE.simple_mortgage.refs.interestRateText = document.getElementById('SIMPLE-MORTGAGE-CALC_repayment_interest_rate_text');
				}

				_CORE.simple_mortgage.funcs.setupInputs();
			},
			setupInputs: function() {

				if(_CORE.simple_mortgage.refs.interestOnlyBalance){

					_CORE.simple_mortgage.refs.interestOnlyBalance.value = '150,000';

					_CORE.simple_mortgage.refs.interestOnlyBalance.onchange = function(){
						_CORE.simple_mortgage.funcs.monthlyCalculation();
					}
				}

				if(_CORE.simple_mortgage.refs.repaymentBalance){

					_CORE.simple_mortgage.refs.repaymentBalance.value = '220,000';

					_CORE.simple_mortgage.refs.repaymentBalance.onchange = function(){
						_CORE.simple_mortgage.funcs.monthlyCalculation();
					}
				}

				if(_CORE.simple_mortgage.refs.mortgageTerm){

					_CORE.simple_mortgage.refs.mortgageTerm.value = '25';

					_CORE.simple_mortgage.refs.mortgageTerm.oninput = function(){
						_CORE.simple_mortgage.funcs.monthlyCalculation();
						_CORE.simple_mortgage.funcs.updateSlider(this);
					}
				}

				_CORE.simple_mortgage.refs.interestRate.value = '4.25';

				_CORE.simple_mortgage.refs.interestRate.oninput = function(){
					_CORE.simple_mortgage.funcs.monthlyCalculation();
					_CORE.simple_mortgage.funcs.updateSlider(this);
				}

				_CORE.simple_mortgage.funcs.monthlyCalculation();

			},
			monthlyCalculation: function(){
				
				let interestOnly = _CORE.simple_mortgage.refs.interestOnlyBalance;
				let capitalAndInterest = _CORE.simple_mortgage.refs.repaymentBalance;

				let mortgageInterestRate = parseFloat(_CORE.simple_mortgage.refs.interestRate.value.replaceAll(",", ""));

				let interestOnlyValue;
				if(interestOnly){
					interestOnlyValue = parseFloat(_CORE.simple_mortgage.refs.interestOnlyBalance.value.replaceAll(",", ""));
					let interestResult = interestOnlyValue*mortgageInterestRate/1200;

					let resultText = document.getElementById('SIMPLE-MORTGAGE-CALC_interest_only_monthly_result');
	
					resultText.textContent = "£" + interestResult.toFixed(2);
				} 

				let repaymentValue;

				if(capitalAndInterest){
					repaymentValue = parseFloat(_CORE.simple_mortgage.refs.repaymentBalance.value.replaceAll(",", ""));
					let mortgageTerm = parseFloat(_CORE.simple_mortgage.refs.mortgageTerm.value.replaceAll(",", ""));

					let toPowerOf = Math.pow((1 + ((mortgageInterestRate)/100)), mortgageTerm);
					let repaymentResult = ((repaymentValue)*((mortgageInterestRate)/100)*toPowerOf)/(12*(toPowerOf-1));

					let resultText = document.getElementById('SIMPLE-MORTGAGE-CALC_repayment_monthly_result');
	
					resultText.textContent = "£" + repaymentResult.toFixed(2);
				} 
			}
		}
		// End of extend	
	},'simple_mortgage');
})(_CORE);