
<ul class="uk-breadcrumb">
    <!--
    <li><a href="">Calculators</a></li>
    -->
    <li><a href="#" onclick="_CORE.funcs.handleBreadcrumbs('savings')"> Savings / Invest</a></li>
    <li><a href="#">Simple Savings</a></li>
</ul>

<div id="SIMPLE-SAVINGS" class="uk-margin-medium-top">
    <div class="">
        <div class="fd--calc--title uk-padding uk-padding-remove-vertical">
            <h2 class="uk-margin-bottom fd--title--border">Simple Savings Calculator</h2>
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
                        <div uk-grid class="uk-child-width-1-2@s uk-child-width-1-4@m uk-grid-small">
                            <div>
                                <label class="uk-margin-small">Current Savings Balance</label>
                                <div class="uk-position-relative" data-prefix="£">
                                    <input data-calculator-field="SIMPLE-SAVINGS-CALC-savings-balance" class="uk-input">
                                </div>
                            </div>
                            <div>
                                <label class="uk-margin-small">Monthly Savings</label>
                                <div class="uk-position-relative" data-prefix="£">
                                    <input data-calculator-field="SIMPLE-SAVINGS-CALC-monthly-savings" class="uk-input">
                                </div>
                            </div>
                            <div>
                                <label>Savings Term</label>
                                <div class="uk-position-relative" data-suffix="Years">
                                    <input data-calculator-field="SIMPLE-SAVINGS-CALC_savings-term-years" class="uk-input" type="text">
                                </div>
                            </div>
                            <div>
                                <label>&nbsp</label>
                                <div class="uk-position-relative" data-suffix="Months">
                                    <input data-calculator-field="SIMPLE-SAVINGS-CALC_savings-term-months" class="uk-input" type="text">
                                </div>
                            </div>
                        </div>
                        <div class="uk-margin-medium uk-position-relative">
                            <h4 class="slider-label">Interest rate is</h4>
                            <div class="uk-flex uk-flex-center">
                                <div class="uk-position-relative" data-suffix="%" style="width: 100px">
                                    <input data-calculator-field="SIMPLE-SAVINGS-CALC-interest-rate-text" class="uk-input" min="0.25" max="15" type="number">
                                </div>
                            </div>
                            <input data-calculator-field="SIMPLE-SAVINGS-CALC-interest-rate" type="range" min="0.25" max="15" value="3.5" step="0.25" class="styled-slider slider-progress">
                            <div class="uk-flex uk-flex-between">
                                <div>0.25%</div>
                                <div>15%</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div>
                <div class="uk-position-relative">
                    <h2 class="uk-text-center" data-results-suffix="Saved">You'd have a total of <span data-calculator-field="SIMPLE-SAVINGS-CALC-total-saved"class="uk-text-bold">£10,000</span></h2>
                </div>
                <hr class="uk-divider-icon">
                <div class="uk-position-relative">
                    <h2 class="uk-text-center" data-results-suffix="Total Savings Added"><span data-calculator-field="SIMPLE-SAVINGS-CALC-total-capital"class="uk-text-bold">£16,585.00</span></h2>
                </div>
                <div class="uk-position-relative">
                    <h2 class="uk-text-center" data-results-suffix="Total Interest Earned"><span data-calculator-field="SIMPLE-SAVINGS-CALC-total-interest-gained"class="uk-text-bold">£1,585.00</span></h2>
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

