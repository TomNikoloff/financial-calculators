<div class="uk-padding">
    <ul class="uk-breadcrumb">
        <!--
        <li><a href="">Calculators</a></li>
        -->
        <li><a href="#" onclick="_CORE.funcs.handleBreadcrumbs('mortgages')">Mortgages</a></li>
        <li><a href="#">Simple Interest Only</a></li>
    </ul>

    <div id="INTEREST-ONLY" class="uk-margin-medium-top">
        <div class="">
            <div class="fd--calc--title uk-padding uk-padding-remove-vertical">
                <h2 class="fd--title--border uk-margin-bottom">Mortgage Interest-Only Calculator</h2>
            </div>
            <div class="uk-card-body uk-padding-remove-bottom">
                <div>
                    <div class="uk-margin">
                        <h4 class="uk-margin-small">Interest Only Balance</h4>
                        <div class="uk-position-relative" data-prefix="£">
                            <input  data-calculator-field="SIMPLE-MORTGAGE-CALC-io-balance" class="uk-input" value="0" onchange="_CORE.simple_mortgage.funcs.monthlyCalculation();">
                        </div>
                    </div>
                    <div class="uk-margin-medium uk-position-relative">
                        <h4 class="slider-label" >Interest rate is</h4>
                        <!--
                        <h4 class="uk-flex uk-flex-center uk-margin-remove">
                            <span data-calculator-field="SIMPLE-MORTGAGE-CALC-io-interest-rate-text" class="uk-text-bold">4.25</span> %
                        </h4>
                        -->
                        <div class="uk-flex uk-flex-center">
                            <div class="uk-position-relative" data-suffix="%" style="width: 100px">
                                <input data-calculator-field="SIMPLE-MORTGAGE-CALC-io-interest-rate-text" class="uk-input" min="0.25" max="15" type="number">
                            </div>
                        </div>
                        <input data-calculator-field="SIMPLE-MORTGAGE-CALC-io-interest-rate" type="range" min="0.25" max="15" value="4.25" step="0.25" class="styled-slider slider-progress">
                        <div class="uk-flex uk-flex-between">
                            <div>0.25%</div>
                            <div>15%</div>
                        </div>
                    </div>
                    <div class="uk-position-relative">
                        <h2 class="uk-text-center" data-results-suffix="a month">This will cost <span data-calculator-field="SIMPLE-MORTGAGE-CALC-io-monthly-result"class="uk-text-bold">£602.38</span></h2>
                    </div>
                </div>

                <div class="uk-margin-medium-top fd--calculator--disclaimer--container">
                    <p class="uk-margin-remove uk-text-center">
                        It's important to note that the calculators are for guidance purposes only and the actual amounts will depend on several factors. It's recommended to speak to a mortgage advisor or financial planner before making any decisions regarding a mortgage.
                    </p>
                </div>

            </div>
        </div>
    </div>
</div>



