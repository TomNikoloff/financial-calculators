(function(c){
	c.extend(	
	{
        utils: {

        },
		refs:{},
		funcs:{
            init: function(){	
				_CORE.simple_salary.funcs.setupInputs();
            },
			setupInputs: function() {
				_CORE.refs["SIMPLE-SALARY-CALC-annual-income"].value = '30,000';

				_CORE.refs["SIMPLE-SALARY-CALC-annual-income"].onchange = function(){
					_CORE.simple_salary.funcs.calculateSalary();
				}

				_CORE.utils.numberInputFormatter(_CORE.refs["SIMPLE-SALARY-CALC-annual-income"]);


				_CORE.refs["SIMPLE-SALARY-CALC-monthly-pension-contributions"].value = '0';

				_CORE.refs["SIMPLE-SALARY-CALC-monthly-pension-contributions"].onchange = function(){
					_CORE.simple_salary.funcs.calculateSalary();
				}

				_CORE.simple_salary.funcs.calculateSalary();
			},
            calculateSalary: function() {

                const grossSalary = parseInt(_CORE.refs["SIMPLE-SALARY-CALC-annual-income"].value.replaceAll(",", ""));
                const pensionContribution = parseInt(_CORE.refs["SIMPLE-SALARY-CALC-monthly-pension-contributions"].value.replaceAll(",", ""));
                
                // Calculate taxable income
                const personalAllowance = 12570;
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

				_CORE.refs["SIMPLE-SALARY-CALC-CALC-annual-take-home"].value = netSalary;
				_CORE.refs["SIMPLE-SALARY-CALC-CALC-monthly-take-home"].value = netSalary / 12;

				_CORE.refs["SIMPLE-SALARY-CALC-CALC-total-income-tax"].value = incomeTax;
				_CORE.refs["SIMPLE-SALARY-CALC-CALC-total-national-insurance"].value = nationalInsurance;

            }
            calculateIncomeTax: function(taxableIncome) {

                taxBands = 12571 - 50270 20%, 50271 - 125140 40%, over 125140 45%

                let tax = 0;
                if(taxableIncome > 37700){

                } else if(taxableIncome <= )


                if (salary <= 12500) {
                  // Personal allowance
                  tax = 0;
                } else if (salary <= 50000) {
                  // Basic rate band
                  tax = (salary - 12500) * 0.2;
                } else if (salary <= 150000) {
                  // Higher rate band
                  tax = 37500 * 0.2 + (salary - 50000) * 0.4;
                } else {
                  // Additional rate band
                  tax = 37500 * 0.2 + 100000 * 0.4 + (salary - 150000) * 0.45;
                }

                // Calculate income tax
                const taxRate = taxRates[taxCode].rate;
                const taxBand = taxRates[taxCode].band;
                const incomeTax = taxableIncome > taxBand ? (taxableIncome - taxBand) * taxRate : 0;
                return incomeTax;
            }
            /*
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
            */
		}
		// End of extend	
	},'simple_salary');
})(_CORE);