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

        _CORE.utils.numberInputFormatter(_CORE.refs["SIMPLE-SALARY-CALC-monthly-pension-contributions"]);

				_CORE.simple_salary.funcs.calculateSalary();
			},
      calculateSalary: function() {

          const grossSalary = parseInt(_CORE.refs["SIMPLE-SALARY-CALC-annual-income"].value.replaceAll(",", ""));
          const pensionContribution = parseInt(_CORE.refs["SIMPLE-SALARY-CALC-monthly-pension-contributions"].value.replaceAll(",", ""));
          
          // Calculate taxable income
          const personalAllowance = 12570;
          const taxableIncome = Math.max(grossSalary - personalAllowance - (pensionContribution / 100) * grossSalary, 0);

          // Calculate income tax
          const incomeTax = _CORE.simple_salary.funcs.calculateIncomeTax(taxableIncome);
          //console.log(incomeTax);

          // Calculate national insurance
          let weeklyIncome = grossSalary / 52;
          let nationalInsurance =  _CORE.simple_salary.funcs.calculateNationalInsurance(weeklyIncome);

          // Calculate net salary
          const netSalary = grossSalary - incomeTax - nationalInsurance;
          //console.log(netSalary)

          _CORE.refs["SIMPLE-SALARY-CALC-CALC-annual-take-home"].textContent = netSalary.toLocaleString("en-GB", {style:"currency", currency:"GBP"});;
          _CORE.refs["SIMPLE-SALARY-CALC-CALC-monthly-take-home"].textContent = (netSalary / 12).toLocaleString("en-GB", {style:"currency", currency:"GBP"});;

          _CORE.refs["SIMPLE-SALARY-CALC-CALC-total-income-tax"].textContent = incomeTax.toLocaleString("en-GB", {style:"currency", currency:"GBP"});;
          _CORE.refs["SIMPLE-SALARY-CALC-CALC-total-national-insurance"].textContent = nationalInsurance.toLocaleString("en-GB", {style:"currency", currency:"GBP"});;

        },
        calculateNationalInsurance: function(weeklyIncome){

          //console.log(weeklyIncome);

          let totalWeeklyNi = 0;

          let niAt2 = 0;
          let niAt12 = 0;

          if(weeklyIncome > 967){
            niAt2 =  (weeklyIncome - 967) * 0.02;
            niAt12 = 725 * 0.12;
          } else if(weeklyIncome > 242 && weeklyIncome <= 967){
            niAt12 = (weeklyIncome - 242) * 0.12;
          }

          totalWeeklyNi = niAt2 + niAt12;
          //console.log(totalWeeklyNi);

          return (totalWeeklyNi * 52);

        },
        calculateIncomeTax: function(taxableIncome) {

            //taxBands = 12570 - 50270 20%, 50271 - 125140 40%, over 125140 45%
            //taxableBands = 0 - 37700 = 20%, 37701 - 74869 = 40%, over 45%

            let tax = 0;

            let taxAt45 = 0;
            let taxAt40 = 0;
            let taxAt20 = 0;

            if(taxableIncome > 112570){

              taxAt45 = (taxableIncome - 112570) * 0.45;
              taxAt40 = 74869 * 0.4;
              taxAt20 = 37700 * 0.2;
              
            } else if(taxableIncome > 37701 && taxableIncome <= 112570 ){
              
              taxAt40 = (taxableIncome - 37701) * 0.4;
              taxAt20 = 37700 * 0.2;

            } else if(taxableIncome > 0 && taxableIncome <= 37700){

              taxAt20 = taxableIncome * 0.2;

            }

            tax = taxAt45 + taxAt40 + taxAt20;

            return tax;
        }
		}
		// End of extend	
	},'simple_salary');
})(_CORE);