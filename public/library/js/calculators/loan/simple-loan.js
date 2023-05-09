(function(c){
	c.extend(	
	{
        utils: {

        },
		refs:{},
		funcs:{
            init: function(){	
				_CORE.simple_loan.funcs.setupInputs();
            },
			setupInputs: function() {

				// Repayment

				_CORE.refs["SIMPLE-LOAN-CALC-balance"].value = '11,000';

				_CORE.refs["SIMPLE-LOAN-CALC-balance"].addEventListener("blur", _CORE.simple_loan.funcs.calculateMonthlyPayments);

				_CORE.utils.numberInputFormatter(_CORE.refs["SIMPLE-LOAN-CALC-balance"]);

				_CORE.refs["SIMPLE-LOAN-CALC-interest-rate-text"].value = '4.9';

				_CORE.refs["SIMPLE-LOAN-CALC-interest-rate-text"].addEventListener("blur", function(){
					_CORE.funcs.updateSlider('input', _CORE.refs["SIMPLE-LOAN-CALC-interest-rate"], this);
					_CORE.simple_loan.funcs.calculateMonthlyPayments();
				});

				_CORE.refs["SIMPLE-LOAN-CALC-interest-rate"].value = '4.9';

				_CORE.refs["SIMPLE-LOAN-CALC-interest-rate"].addEventListener("input", function(){
					_CORE.funcs.updateSlider('slider', this, _CORE.refs["SIMPLE-LOAN-CALC-interest-rate-text"]);
					_CORE.simple_loan.funcs.calculateMonthlyPayments();
				});

				_CORE.refs["SIMPLE-LOAN-CALC-term-text"].value = '5';

				_CORE.refs["SIMPLE-LOAN-CALC-term-text"].oninput = function(){
					_CORE.funcs.updateSlider('input', _CORE.refs["SIMPLE-LOAN-CALC-term"], this);
					_CORE.simple_loan.funcs.calculateMonthlyPayments();
				}

				_CORE.refs["SIMPLE-LOAN-CALC-term-text"].addEventListener("blur", function(){
					_CORE.funcs.updateSlider('input', _CORE.refs["SIMPLE-LOAN-CALC-term"], this);
					_CORE.simple_loan.funcs.calculateMonthlyPayments();
				});
				
				_CORE.refs["SIMPLE-LOAN-CALC-term"].value = '5';

				_CORE.refs["SIMPLE-LOAN-CALC-term"].oninput = function(){
					_CORE.funcs.updateSlider('slider', this, _CORE.refs["SIMPLE-LOAN-CALC-term-text"]);
					_CORE.simple_loan.funcs.calculateMonthlyPayments();
				}

				_CORE.refs["SIMPLE-LOAN-CALC-term"].addEventListener("input", function(){
					_CORE.funcs.updateSlider('slider', this, _CORE.refs["SIMPLE-LOAN-CALC-term-text"]);
					_CORE.simple_loan.funcs.calculateMonthlyPayments();
				});

				_CORE.simple_loan.funcs.calculateMonthlyPayments();

			},
			calculateMonthlyPayments: function(){

				// Get input values
				const loanAmount = parseFloat(_CORE.refs["SIMPLE-LOAN-CALC-balance"].value.replaceAll(",", ""));
				const interestRate = parseFloat(_CORE.refs["SIMPLE-LOAN-CALC-interest-rate-text"].value.replaceAll(",", ""));
				const loanTerm = parseInt(_CORE.refs["SIMPLE-LOAN-CALC-term-text"].value.replaceAll(",", ""));
		
/*
				let toPowerOf = Math.pow((1 + ((interestRate)/100)), loanTerm);
				let monthlyPayment = ((loanAmount)*((interestRate)/100)*toPowerOf)/(12*(toPowerOf-1));
*/
				let monthlyInterestRate  = (interestRate / 100) / 12;
				let loanDurationInMonths  = loanTerm * 12;
				const monthlyPayment = (loanAmount * monthlyInterestRate ) / (1 - (1 / Math.pow(1 + monthlyInterestRate , loanDurationInMonths )));
			
				// Display result
				_CORE.refs["SIMPLE-LOAN-CALC-monthly-result"].innerHTML = monthlyPayment.toLocaleString("en-GB", {style:"currency", currency:"GBP"});

				_CORE.simple_loan.funcs.calculateTotalInterestAndRepayable(monthlyPayment);
				  
			},
			calculateTotalInterestAndRepayable: function(monthlyPayment){

				// Get input values
				const loanAmount = parseFloat(_CORE.refs["SIMPLE-LOAN-CALC-balance"].value.replaceAll(",", ""));
				const interestRate = parseFloat(_CORE.refs["SIMPLE-LOAN-CALC-interest-rate"].value.replaceAll(",", ""));
				const loanTerm = parseInt(_CORE.refs["SIMPLE-LOAN-CALC-term-text"].value.replaceAll(",", ""));

				let monthlyInterestRate = (interestRate / 100) / 12;
				let balance = loanAmount;

				let totalInterest = 0;

				function calculateTotalInterest(){
					for(let i = 0; i < loanTerm; i++){

						for(let y = 0; y < 12; y++){
							if(i == 0 && y == 0){

							} else {
								let interest = balance * monthlyInterestRate;
								totalInterest += interest;
		
								let capital = monthlyPayment - interest;
								balance = balance - capital;
							}
						}
					}
				}

				calculateTotalInterest();

				_CORE.refs["SIMPLE-LOAN-CALC-total-interest"].innerHTML = totalInterest.toLocaleString("en-GB", {style:"currency", currency:"GBP"});

				const totalRepayable = loanAmount + totalInterest;

				_CORE.refs["SIMPLE-LOAN-CALC-total-repayable"].innerHTML = totalRepayable.toLocaleString("en-GB", {style:"currency", currency:"GBP"});
				
			}
		}
		// End of extend	
	},'simple_loan');
})(_CORE);