
<ul class="uk-breadcrumb">
    <!--
    <li><a href="">Calculators</a></li>
    -->
    <li><a href=""> Loans</a></li>
    <li><a href="#">Simple Loan</a></li>
</ul>

<div id="SIMPLE-LOAN" class="uk-margin-medium-top">
    <div class="">
        <div class="uk-padding uk-padding-remove-vertical">
            <h2 class="uk-margin-bottom fd--title--border">Loan Calculator</h2>
        </div>
        <div class="uk-card-body">
            <div>
                <div class="uk-margin">
                    <h4 class="uk-margin-small">Loan Balance</h4>
                    <div class="uk-position-relative" data-prefix="£">
                        <input data-calculator-field="SIMPLE-LOAN-CALC-balance" class="uk-input" value="15,000" onchange="_CORE.simple_loan.funcs.monthlyCalculation();">
                    </div>
                </div>
                <div class="uk-margin-medium uk-position-relative">
                    <h4 class="slider-label" style="margin-bottom: -34px">Interest rate is</h4>
                    <!--
                    <h4 class="uk-flex uk-flex-center uk-margin-remove">
                        <span data-calculator-field="SIMPLE-MORTGAGE-CALC-rp-interest-rate-text" class="uk-text-bold">4.25</span> %
                    </h4>
                    -->
                    <div class="uk-flex uk-flex-center">
                        <div class="uk-position-relative" data-suffix="%" style="width: 100px">
                            <input data-calculator-field="SIMPLE-LOAN-CALC-interest-rate-text" class="uk-input" min="0.25" max="15" type="number">
                        </div>
                    </div>
                    <input data-calculator-field="SIMPLE-LOAN-CALC-interest-rate" type="range" min="0.25" max="30" value="4.25" step="0.25" class="styled-slider slider-progress">
                    <div class="uk-flex uk-flex-between">
                        <div>0.25%</div>
                        <div>30%</div>
                    </div>
                </div>
                <div class="uk-margin-medium uk-position-relative">
                    <h4 class="slider-label" style="margin-bottom: -34px">Pay it back over</h4>
                    <!--
                    <h4 class="uk-flex uk-flex-center uk-margin-remove">
                        <span data-calculator-field="SIMPLE-MORTGAGE-CALC-rp-term-text" class="uk-text-bold">25</span>  Years
                    </h4>
                    -->
                    <div class="uk-flex uk-flex-center">
                        <div class="uk-position-relative" data-suffix="Years" style="width: 140px">
                            <input data-calculator-field="SIMPLE-LOAN-CALC-term-text" class="uk-input" min="1" max="7" type="number">
                        </div>
                    </div>
                    <input data-calculator-field="SIMPLE-MORTGAGE-CALC-rp-term" type="range" min="1" max="7" value="5" class="styled-slider slider-progress">
                    <div class="uk-flex uk-flex-between">
                        <div>1 Years</div>
                        <div>7 Years</div>
                    </div>
                </div>
                <div class="uk-position-relative">
                    <h2 class="uk-text-center" data-results-suffix="a month">This will cost <span data-calculator-field="SIMPLE-LOAN-CALC-monthly-result"class="uk-text-bold">£602.38</span></h2>
                </div>
            </div>
        </div>
    </div>
</div>

