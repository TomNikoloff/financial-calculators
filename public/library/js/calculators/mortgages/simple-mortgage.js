(function(c){
	c.extend(	
	{
        utils: {

        },
		refs:{},
		funcs:{
            init: function(){	
				_CORE.simple_mortgage.funcs.setupInputs();
            },
			setupInputs: function() {

				// Repayment

				_CORE.refs["SIMPLE-MORTGAGE-CALC-rp-balance"].value = '178,000';

				_CORE.refs["SIMPLE-MORTGAGE-CALC-rp-balance"].addEventListener("blur", _CORE.simple_mortgage.funcs.monthlyCalculation);

				_CORE.utils.numberInputFormatter(_CORE.refs["SIMPLE-MORTGAGE-CALC-rp-balance"]);

				_CORE.refs["SIMPLE-MORTGAGE-CALC-rp-interest-rate-text"].value = '2.25';

				
				_CORE.refs["SIMPLE-MORTGAGE-CALC-rp-interest-rate-text"].addEventListener("blur", function(){
					_CORE.funcs.updateSlider('input', _CORE.refs["SIMPLE-MORTGAGE-CALC-rp-interest-rate"], this);
					_CORE.simple_mortgage.funcs.monthlyCalculation();
				});
				
				_CORE.refs["SIMPLE-MORTGAGE-CALC-rp-interest-rate"].value = '2.25';

				_CORE.refs["SIMPLE-MORTGAGE-CALC-rp-interest-rate"].addEventListener("input", function(){
					_CORE.funcs.updateSlider('slider', this, _CORE.refs["SIMPLE-MORTGAGE-CALC-rp-interest-rate-text"]);
					_CORE.simple_mortgage.funcs.monthlyCalculation();
				});		

				_CORE.refs["SIMPLE-MORTGAGE-CALC-rp-term-text"].value = '28';

				_CORE.refs["SIMPLE-MORTGAGE-CALC-rp-term-text"].addEventListener("blur", function(){
					_CORE.funcs.updateSlider('input', _CORE.refs["SIMPLE-MORTGAGE-CALC-rp-term"], this);
					_CORE.simple_mortgage.funcs.monthlyCalculation();
				});		
				
				_CORE.refs["SIMPLE-MORTGAGE-CALC-rp-term"].value = '28';

				_CORE.refs["SIMPLE-MORTGAGE-CALC-rp-term"].addEventListener("input", function(){
					_CORE.funcs.updateSlider('slider', this, _CORE.refs["SIMPLE-MORTGAGE-CALC-rp-term-text"]);
					_CORE.simple_mortgage.funcs.monthlyCalculation();
				});		

				// Interest Only

				_CORE.refs["SIMPLE-MORTGAGE-CALC-io-balance"].value = '150,000';

				_CORE.refs["SIMPLE-MORTGAGE-CALC-io-balance"].addEventListener("blur", _CORE.simple_mortgage.funcs.monthlyCalculation);

				_CORE.utils.numberInputFormatter(_CORE.refs["SIMPLE-MORTGAGE-CALC-io-balance"]);
				
				_CORE.refs["SIMPLE-MORTGAGE-CALC-io-interest-rate-text"].value = '4.25';

				_CORE.refs["SIMPLE-MORTGAGE-CALC-io-interest-rate-text"].addEventListener("blur", function(){
					_CORE.funcs.updateSlider('input', _CORE.refs["SIMPLE-MORTGAGE-CALC-io-interest-rate"], this);
					_CORE.simple_mortgage.funcs.monthlyCalculation();
				});		

				_CORE.refs["SIMPLE-MORTGAGE-CALC-io-interest-rate"].value = '4.25';

				_CORE.refs["SIMPLE-MORTGAGE-CALC-io-interest-rate"].addEventListener("input", function(){
					_CORE.funcs.updateSlider('slider', this, _CORE.refs["SIMPLE-MORTGAGE-CALC-io-interest-rate-text"]);
					_CORE.simple_mortgage.funcs.monthlyCalculation();
				});		

				_CORE.simple_mortgage.funcs.monthlyCalculation();

			},
			monthlyCalculation: function(){

				// Interest-Only
				let ioInterestRate = parseFloat(_CORE.refs["SIMPLE-MORTGAGE-CALC-io-interest-rate-text"].value.replaceAll(",", ""));
				let interestOnlyValue;

				interestOnlyValue = parseFloat(_CORE.refs["SIMPLE-MORTGAGE-CALC-io-balance"].value.replaceAll(",", ""));
				let interestResult = interestOnlyValue*ioInterestRate/1200;

				let ioResultText = _CORE.refs["SIMPLE-MORTGAGE-CALC-io-monthly-result"];
				ioResultText.textContent = interestResult.toLocaleString("en-GB", {style:"currency", currency:"GBP"});

				//_CORE.simple_mortgage.funcs.calculateTotalInterestAndRepayable(interestResult, 'interest-only');

				// Repayment 
				let rpInterestRate = parseFloat(_CORE.refs["SIMPLE-MORTGAGE-CALC-rp-interest-rate-text"].value.replaceAll(",", ""));
				let repaymentValue;

				let mortgageTerm = parseFloat(_CORE.refs["SIMPLE-MORTGAGE-CALC-rp-term"].value.replaceAll(",", ""));
				if(mortgageTerm == 1){
					_CORE.refs["SIMPLE-MORTGAGE-CALC-rp-term-text"].value = 1;
				}
				repaymentValue = parseFloat(_CORE.refs["SIMPLE-MORTGAGE-CALC-rp-balance"].value.replaceAll(",", ""));

				let toPowerOf = Math.pow((1 + ((rpInterestRate)/100)), mortgageTerm);
				let repaymentResult = ((repaymentValue)*((rpInterestRate)/100)*toPowerOf)/(12*(toPowerOf-1));

				let rpResultText = _CORE.refs["SIMPLE-MORTGAGE-CALC-rp-monthly-result"];
				if(repaymentResult){
					//repaymentResult = repaymentResult.toFixed(2)
				} else {
					repaymentResult = 0.00;
				}
				rpResultText.textContent = repaymentResult.toLocaleString("en-GB", {style:"currency", currency:"GBP"});

				_CORE.simple_mortgage.funcs.calculateTotalInterestAndRepayable(repaymentResult, 'repayment');
			},
			calculateTotalInterestAndRepayable: function(monthlyPayment, type){
				let loanAmount;
				let interestRate;
				let loanTerm;

				if(type == 'interest-only'){
					interestRate = parseFloat(_CORE.refs["SIMPLE-MORTGAGE-CALC-io-interest-rate-text"].value.replaceAll(",", ""));
				} else if(type == 'repayment'){
					loanAmount = parseFloat(_CORE.refs["SIMPLE-MORTGAGE-CALC-rp-balance"].value.replaceAll(",", ""));
					interestRate = parseFloat(_CORE.refs["SIMPLE-MORTGAGE-CALC-rp-interest-rate-text"].value.replaceAll(",", ""));
					loanTerm = parseFloat(_CORE.refs["SIMPLE-MORTGAGE-CALC-rp-term"].value.replaceAll(",", ""));

					let monthlyInterestRate = (interestRate / 100) / 12;
					let balance = loanAmount;
	
					let totalInterest = 0;
	
					function calculateTotalInterest(){
						for(let i = 0; i < loanTerm; i++){
	
							for(let y = 0; y < 12; y++){

								let interest = balance * monthlyInterestRate;
								totalInterest += interest;
		
								let capital = monthlyPayment - interest;
								balance = balance - capital;
								
							}
						}
					}
	
					calculateTotalInterest();
	
					_CORE.refs["SIMPLE-MORTGAGE-CALC-total-interest"].innerHTML = totalInterest.toLocaleString("en-GB", {style:"currency", currency:"GBP"});
	
					const totalRepayable = loanAmount + totalInterest;
	
					_CORE.refs["SIMPLE-MORTGAGE-CALC-total-repayable"].innerHTML = totalRepayable.toLocaleString("en-GB", {style:"currency", currency:"GBP"});
				}

			}
		}
		// End of extend	
	},'simple_mortgage');
})(_CORE);