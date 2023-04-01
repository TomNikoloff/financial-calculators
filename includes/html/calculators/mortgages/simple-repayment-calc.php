
<ul class="uk-breadcrumb">
    <!--
    <li><a href="">Calculators</a></li>
    -->
    <li><a href="">Mortgages</a></li>
    <li><a href="#">Simple Repayment</a></li>
</ul>

<div id="REPAYMENT" class="uk-margin-medium-top">
    <div class="">
        <div class="uk-padding uk-padding-remove-vertical">
            <h2 class="uk-margin-medium-bottom fd--title--border">Mortgage Repayment Calculator</h2>
        </div>
        <div class="uk-card-body">
            <div>
                <div class="uk-margin">
                    <h4 class="uk-margin-small">Repayment Balance</h4>
                    <div class="uk-position-relative" data-prefix="£">
                        <input data-calculator-field="SIMPLE-MORTGAGE-CALC-rp-balance" class="uk-input" value="220,000" onchange="_CORE.simple_mortgage.funcs.monthlyCalculation();">
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
                            <input data-calculator-field="SIMPLE-MORTGAGE-CALC-rp-interest-rate-text" class="uk-input" min="0.25" max="15" type="number">
                        </div>
                    </div>
                    <input data-calculator-field="SIMPLE-MORTGAGE-CALC-rp-interest-rate" type="range" min="0.25" max="15" value="4.25" step="0.25" class="styled-slider slider-progress">
                    <div class="uk-flex uk-flex-between">
                        <div>0.25%</div>
                        <div>15%</div>
                    </div>
                </div>
                <div class="uk-margin-medium uk-position-relative">
                    <h4 class="slider-label" style="margin-bottom: -34px">Mortgage term is</h4>
                    <!--
                    <h4 class="uk-flex uk-flex-center uk-margin-remove">
                        <span data-calculator-field="SIMPLE-MORTGAGE-CALC-rp-term-text" class="uk-text-bold">25</span>  Years
                    </h4>
                    -->
                    <div class="uk-flex uk-flex-center">
                        <div class="uk-position-relative" data-suffix="Years" style="width: 140px">
                            <input data-calculator-field="SIMPLE-MORTGAGE-CALC-rp-term-text" class="uk-input" min="1" max="40" type="number">
                        </div>
                    </div>
                    <input data-calculator-field="SIMPLE-MORTGAGE-CALC-rp-term" type="range" min="1" max="40" value="28" class="styled-slider slider-progress">
                    <div class="uk-flex uk-flex-between">
                        <div>1 Years</div>
                        <div>40 Years</div>
                    </div>
                </div>
                <div class="uk-position-relative">
                    <h2 class="uk-text-center" data-results-suffix="a month">This will cost <span data-calculator-field="SIMPLE-MORTGAGE-CALC-rp-monthly-result"class="uk-text-bold">£602.38</span></h2>
                </div>
            </div>
        </div>
    </div>
</div>

