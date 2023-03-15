(function(c){
	c.extend(	
	{
        utils: {
 
        },
		funcs:{
            init: function(){	
				
            },
			updateSlider: function(slider){
				if(slider.id == "SIMPLE-MORTGAGE-CALC_interest_rate"){
					let mortgageInterestText = document.getElementById('SIMPLE-MORTGAGE-CALC_interest_rate_text');
					mortgageInterestText.textContent = slider.value;
				} else if(slider.id == "SIMPLE-MORTGAGE-CALC_mortgage_term"){
					let mortgageTermText = document.getElementById('SIMPLE-MORTGAGE-CALC_mortgage_term_text');
					mortgageTermText.textContent = slider.value;
				}
			},
			buildElementReferences: function(){

				/*Calc input varibles*/
				_SIMPLE_MORTGAGE.refs.interestOnlyBalance = document.getElementById('SIMPLE-MORTGAGE-CALC_interest_only_balance');

				_SIMPLE_MORTGAGE.refs.interestRate = document.getElementById('SIMPLE-MORTGAGE-CALC_interest_rate');

				_SIMPLE_MORTGAGE.refs.repaymentBalance = document.getElementById('SIMPLE-MORTGAGE-CALC_repayment_balance');

				_SIMPLE_MORTGAGE.refs.mortgageTerm = document.getElementById('SIMPLE-MORTGAGE-CALC_mortgage_term');

				_SIMPLE_MORTGAGE.funcs.setupInputs();
			},
			setupInputs: function() {

				if(_SIMPLE_MORTGAGE.refs.interestOnlyBalance){

					_SIMPLE_MORTGAGE.refs.interestOnlyBalance.value = '150000';

					_SIMPLE_MORTGAGE.refs.interestOnlyBalance.onchange = function(){
						_SIMPLE_MORTGAGE.funcs.monthlyCalculation();
					}
				}

				if(_SIMPLE_MORTGAGE.refs.repaymentBalance){

					_SIMPLE_MORTGAGE.refs.repaymentBalance.value = '220000';

					_SIMPLE_MORTGAGE.refs.repaymentBalance.onchange = function(){
						_SIMPLE_MORTGAGE.funcs.monthlyCalculation();
					}
				}

				if(_SIMPLE_MORTGAGE.refs.mortgageTerm){

					_SIMPLE_MORTGAGE.refs.mortgageTerm.value = '25';

					_SIMPLE_MORTGAGE.refs.mortgageTerm.oninput = function(){
						_SIMPLE_MORTGAGE.funcs.monthlyCalculation();
						_SIMPLE_MORTGAGE.funcs.updateSlider(this);
					}
				}

				_SIMPLE_MORTGAGE.refs.interestRate.value = '4.25';

				_SIMPLE_MORTGAGE.refs.interestRate.oninput = function(){
					_SIMPLE_MORTGAGE.funcs.monthlyCalculation();
					_SIMPLE_MORTGAGE.funcs.updateSlider(this);
				}

				_SIMPLE_MORTGAGE.funcs.monthlyCalculation();

			},
			monthlyCalculation: function(){

				let interestOnly = _SIMPLE_MORTGAGE.refs.interestOnlyBalance;
				let capitalAndInterest = _SIMPLE_MORTGAGE.refs.repaymentBalance;

				let mortgageInterestRate = parseFloat(_SIMPLE_MORTGAGE.refs.interestRate.value.replaceAll(",", ""));

				let interestOnlyValue;
				if(interestOnly){
					interestOnlyValue = parseFloat(_SIMPLE_MORTGAGE.refs.interestOnlyBalance.value.replaceAll(",", ""));
					let interestResult = interestOnlyValue*mortgageInterestRate/1200;

					let resultText = document.getElementById('monthly_amount');
	
					resultText.textContent = "£" + interestResult.toFixed(2);
				} 

	
				let repaymentValue;
				if(capitalAndInterest){
					repaymentValue = parseFloat(_SIMPLE_MORTGAGE.refs.repaymentBalance.value.replaceAll(",", ""));
					let mortgageTerm = parseFloat(_SIMPLE_MORTGAGE.refs.mortgageTerm.value.replaceAll(",", ""));

					let toPowerOf = Math.pow((1 + ((mortgageInterestRate)/100)), mortgageTerm);
					let repaymentResult = ((repaymentValue)*((mortgageInterestRate)/100)*toPowerOf)/(12*(toPowerOf-1));

					let resultText = document.getElementById('monthly_amount');
	
					resultText.textContent = "£" + repaymentResult.toFixed(2);
				} 
	

			}
		}
		// End of extend	
	},'simple_mortgage');
})(_CORE);