
<ul class="uk-breadcrumb">
    <!--
    <li><a href="">Calculators</a></li>
    -->
    <li><a href="#" onclick="_CORE.funcs.handleBreadcrumbs('salary')"> Salary</a></li>
    <li><a href="#">Simple Salary</a></li>
</ul>

<div id="SIMPLE-SALARY" class="uk-margin-medium-top">
    <div class="">
        <div class="fd--calc--title uk-padding uk-padding-remove-vertical">
            <h2 class="uk-margin-bottom fd--title--border">Simple Salary Calculator</h2>
        </div>
        <div class="uk-card-body uk-padding-remove-bottom">
            <div class="uk-margin-bottom">
                <div class="">
                    <div class="uk-padding-small">
                        <div data-calculator-field="mortgage-details-error-text" class="uk-hidden">
                            <div class="uk-alert-danger uk-text-center uk-alert">
                                <h4></h4>
                            </div>
                        </div>
                        <div uk-grid class="uk-child-width-1-2@s uk-grid-small">
                            <div>
                                <label class="uk-margin-small">Gross (pre-tax) Income</label>
                                <div class="uk-position-relative" data-prefix="£">
                                    <input data-calculator-field="SIMPLE-SALARY-CALC-annual-income" class="uk-input">
                                </div>
                            </div>
                            <div>
                                <label class="uk-margin-small">Monthly Pension Contributions</label>
                                <div class="uk-position-relative" data-prefix="%">
                                    <input data-calculator-field="SIMPLE-SALARY-CALC-monthly-pension-contributions" class="uk-input" style="padding-left: 3em;">
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div>
                <div class="uk-position-relative">
                    <h2 class="uk-text-center" data-results-suffix="a year">You'll take home <span data-calculator-field="SIMPLE-SALARY-CALC-CALC-annual-take-home"class="uk-text-bold"></span></h2>
                </div>
                <div class="uk-position-relative">
                    <h2 class="uk-text-center" data-results-suffix="a month">or <span data-calculator-field="SIMPLE-SALARY-CALC-CALC-monthly-take-home"class="uk-text-bold"></span></h2>
                </div>
                <hr class="uk-divider-icon">
                <div class="uk-position-relative">
                    <h2 class="uk-text-center" data-results-suffix="Income tax">Over the year you'll pay <span data-calculator-field="SIMPLE-SALARY-CALC-CALC-total-income-tax"class="uk-text-bold"></span></h2>
                </div>
                <div class="uk-position-relative">
                    <h2 class="uk-text-center" data-results-suffix="National Insurance">and <span data-calculator-field="SIMPLE-SALARY-CALC-CALC-total-national-insurance"class="uk-text-bold"></span></h2>
                </div>
            </div>

            <div class="uk-margin-large-top fd--calculator--disclaimer--container">
                <p class="uk-margin-remove">
                    It's important to note that the calculators are for guidance purposes only and the actual amounts will depend on several factors. It's recommended to speak to an advisor or financial planner before making any decisions regarding a loan.
                </p>
            </div>

        </div>
    </div>
</div>

