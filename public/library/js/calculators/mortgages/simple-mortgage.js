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
			updateSlider: function(type, slider, input){
				if(type == "input"){
					let val;
					if(input.value){
						val = input.value;
					} else {
						val = 0;
					}

					if(input.value.slice(-1) == '.'){
						let split = val.split('.')[0];
						slider.value = split;
					} else {
						slider.value = val;
					}
					_CORE.funcs.slidersSetup();
				} else {
					input.value = slider.value;
				}
			},
			setupInputs: function() {

				// Repayment

				_CORE.refs["SIMPLE-MORTGAGE-CALC-rp-balance"].value = '178,000';

				_CORE.refs["SIMPLE-MORTGAGE-CALC-rp-balance"].onchange = function(){
					_CORE.simple_mortgage.funcs.monthlyCalculation();
				}

				_CORE.utils.numberInputFormatter(_CORE.refs["SIMPLE-MORTGAGE-CALC-rp-balance"]);

				_CORE.refs["SIMPLE-MORTGAGE-CALC-rp-interest-rate-text"].value = '2.25';

				_CORE.refs["SIMPLE-MORTGAGE-CALC-rp-interest-rate-text"].oninput = function(){
					_CORE.simple_mortgage.funcs.updateSlider('input', _CORE.refs["SIMPLE-MORTGAGE-CALC-rp-interest-rate"], this);
					_CORE.simple_mortgage.funcs.monthlyCalculation();
				}

				_CORE.refs["SIMPLE-MORTGAGE-CALC-rp-interest-rate"].value = '2.25';

				_CORE.refs["SIMPLE-MORTGAGE-CALC-rp-interest-rate"].oninput = function(){
					_CORE.simple_mortgage.funcs.updateSlider('slider', this, _CORE.refs["SIMPLE-MORTGAGE-CALC-rp-interest-rate-text"]);
					_CORE.simple_mortgage.funcs.monthlyCalculation();
				}

				_CORE.refs["SIMPLE-MORTGAGE-CALC-rp-term-text"].value = '28';

				_CORE.refs["SIMPLE-MORTGAGE-CALC-rp-term-text"].oninput = function(){
					_CORE.simple_mortgage.funcs.updateSlider('input', _CORE.refs["SIMPLE-MORTGAGE-CALC-rp-term"], this);
					_CORE.simple_mortgage.funcs.monthlyCalculation();
				}
				
				_CORE.refs["SIMPLE-MORTGAGE-CALC-rp-term"].value = '28';

				_CORE.refs["SIMPLE-MORTGAGE-CALC-rp-term"].oninput = function(){
					_CORE.simple_mortgage.funcs.updateSlider('slider', this, _CORE.refs["SIMPLE-MORTGAGE-CALC-rp-term-text"]);
					_CORE.simple_mortgage.funcs.monthlyCalculation();
				}

				// Interest Only

				_CORE.refs["SIMPLE-MORTGAGE-CALC-io-balance"].value = '150,000';

				_CORE.refs["SIMPLE-MORTGAGE-CALC-io-balance"].onchange = function(){
					_CORE.simple_mortgage.funcs.monthlyCalculation();
				}

				_CORE.utils.numberInputFormatter(_CORE.refs["SIMPLE-MORTGAGE-CALC-io-balance"]);
				
				_CORE.refs["SIMPLE-MORTGAGE-CALC-io-interest-rate-text"].value = '4.25';

				_CORE.refs["SIMPLE-MORTGAGE-CALC-io-interest-rate-text"].oninput = function(){
					_CORE.simple_mortgage.funcs.updateSlider('input', _CORE.refs["SIMPLE-MORTGAGE-CALC-io-interest-rate"], this);
					_CORE.simple_mortgage.funcs.monthlyCalculation();
				}

				_CORE.refs["SIMPLE-MORTGAGE-CALC-io-interest-rate"].value = '4.25';

				_CORE.refs["SIMPLE-MORTGAGE-CALC-io-interest-rate"].oninput = function(){
					_CORE.simple_mortgage.funcs.updateSlider('slider', this, _CORE.refs["SIMPLE-MORTGAGE-CALC-io-interest-rate-text"]);
					_CORE.simple_mortgage.funcs.monthlyCalculation();
				}

				_CORE.simple_mortgage.funcs.monthlyCalculation();

			},
			monthlyCalculation: function(){

				// Interest-Only
				let ioInterestRate = parseFloat(_CORE.refs["SIMPLE-MORTGAGE-CALC-io-interest-rate-text"].value.replaceAll(",", ""));
				let interestOnlyValue;

				interestOnlyValue = parseFloat(_CORE.refs["SIMPLE-MORTGAGE-CALC-io-balance"].value.replaceAll(",", ""));
				let interestResult = interestOnlyValue*ioInterestRate/1200;

				let ioResultText = _CORE.refs["SIMPLE-MORTGAGE-CALC-io-monthly-result"];
				ioResultText.textContent = "£" + interestResult.toFixed(2);

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
					repaymentResult = repaymentResult.toFixed(2)
				} else {
					repaymentResult = 0.00;
				}
				rpResultText.textContent = "£" + repaymentResult;
			}
		}
		// End of extend	
	},'simple_mortgage');
})(_CORE);