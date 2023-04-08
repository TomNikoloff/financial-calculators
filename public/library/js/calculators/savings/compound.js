(function(c){
	c.extend(	
	{
        utils: {

        },
		refs:{},
		funcs:{
            init: function(){	

            },
            calculateCompounding: function() {
                // Get input values
                const principal = parseFloat(document.getElementById('principal').value);
                const interestRate = parseFloat(document.getElementById('interest-rate').value) / 100;
                const compoundingFrequency = parseInt(document.getElementById('compounding-frequency').value);
                const numYears = parseFloat(document.getElementById('num-years').value);
                const monthlyPayment = parseFloat(document.getElementById('monthly-payment').value);

                // Calculate compound interest
                const numCompoundingPeriods = compoundingFrequency * numYears;
                const interestRatePerPeriod = interestRate / compoundingFrequency;
                const compoundedPrincipal = principal * Math.pow(1 + interestRatePerPeriod, numCompoundingPeriods);
                const monthlyInterest = (compoundedPrincipal - principal) / (numYears * 12);

                // Calculate monthly payment
                const numMonthlyPayments = numYears * 12;
                const monthlyRate = interestRate / 12;
                const monthlyPaymentWithInterest = monthlyPayment * (1 + monthlyRate);
                let remainingBalance = compoundedPrincipal;

                for (let i = 1; i <= numMonthlyPayments; i++) {
                    remainingBalance = remainingBalance * (1 + monthlyRate) - monthlyPaymentWithInterest;
                }

                const finalBalance = remainingBalance.toFixed(2);

                // Display results
                document.getElementById('compounded-principal').innerHTML = '£' + compoundedPrincipal.toFixed(2);
                document.getElementById('monthly-interest').innerHTML = '£' + monthlyInterest.toFixed(2);
                document.getElementById('final-balance').innerHTML = '£' + finalBalance;
            }
		}
		// End of extend	
	},'compound');
})(_CORE);