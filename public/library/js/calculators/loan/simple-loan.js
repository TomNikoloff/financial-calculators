(function(c){
	c.extend(	
	{
        utils: {

        },
		refs:{},
		funcs:{
            init: function(){	

            },
			calculateMonthlyPayments: function(){

				// Get input values
				const amount = parseFloat(document.getElementById('loan-amount').value);
				const interestRate = parseFloat(document.getElementById('interest-rate').value) / 100 / 12;
				const loanTerm = parseInt(document.getElementById('loan-term').value);
			
				// Calculate monthly payment
				const x = Math.pow(1 + interestRate, loanTerm);
				const monthlyPayment = (amount * x * interestRate) / (x - 1);
			
				// Display result
				document.getElementById('monthly-payment').innerHTML = '$' + monthlyPayment.toFixed(2);

				  
			}
		}
		// End of extend	
	},'simple_loan');
})(_CORE);