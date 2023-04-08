(function(c){
	c.extend(	
	{
        utils: {

        },
		refs:{},
		funcs:{
            init: function(){	

            },
			calculateSalary: function(){
                // Get input values
                const grossSalary = parseFloat(document.getElementById('gross-salary').value);
                const pensionContribution = parseFloat(document.getElementById('pension-contribution').value);
                const taxCode = document.getElementById('tax-code').value;

                // Calculate taxable income
                const personalAllowance = 12500;
                const taxableIncome = Math.max(grossSalary - personalAllowance - (pensionContribution / 100) * grossSalary, 0);

                // Calculate income tax
                const incomeTax = calculateIncomeTax(taxableIncome, taxCode);

                // Calculate national insurance
                const niThreshold = 9500;
                const niRate = 0.12;
                const niMax = 4167;
                const niableIncome = Math.max(grossSalary - niThreshold, 0);
                const nationalInsurance = Math.min(niableIncome * niRate, niMax);

                // Calculate net salary
                const netSalary = grossSalary - incomeTax - nationalInsurance;

                // Display result
                document.getElementById('net-salary').innerHTML = '£' + netSalary.toFixed(2);

			},
            calculateIncomeTax: function(taxableIncome, taxCode) {
                // Lookup tax rates and bands
                const taxRates = {
                    '1250L': { rate: 0.0, band: 0 },
                    '1257L': { rate: 0.0, band: 0 },
                    '1265L': { rate: 0.0, band: 0 },
                    '1270L': { rate: 0.0, band: 0 },
                    '1285L': { rate: 0.0, band: 0 },
                    '1450L': { rate: 0.20, band: 37500 },
                    '1500L': { rate: 0.20, band: 37500 },
                    '2000L': { rate: 0.40, band: 125000 },
                    '2400L': { rate: 0.45, band: 150000 }
                };

                // Calculate income tax
                const taxRate = taxRates[taxCode].rate;
                const taxBand = taxRates[taxCode].band;
                const incomeTax = taxableIncome > taxBand ? (taxableIncome - taxBand) * taxRate : 0;
                return incomeTax;
            }
		}
		// End of extend	
	},'salary');
})(_CORE);