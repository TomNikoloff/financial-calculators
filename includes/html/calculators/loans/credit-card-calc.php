
<ul class="uk-breadcrumb">
    <!--
    <li><a href="">Calculators</a></li>
    -->
    <li><a href="">Credit / Loans</a></li>
    <li><a href="#">Credit Card</a></li>
</ul>

<div id="CREDIT_CARD" class="uk-margin-medium-top">
    <div class="uk-padding uk-padding-remove-vertical">
        <h2 class="fd--title--border uk-margin-bottom">Credit Card Calculator</h2>
    </div>
    <div class="uk-padding">
        <div uk-grid class="uk-grid">

            <div class="uk-width-1-1">
                <div class="uk-margin">
                    <h4 class="uk-margin-small">Card Balance</h4>
                    <div class="uk-position-relative" data-prefix="£">
                        <input data-calculator-field="CREDIT-CARD-CALC-balance" class="uk-input" value="15,000" onchange="">
                    </div>
                </div>
                <div class="uk-flex uk-flex-center">
                    <div class="uk-position-relative" data-suffix="%" style="width: 100px">
                        <input data-calculator-field="CREDIT-CARD-CALC-interest-rate-text" class="uk-input" min="0.25" max="15" type="number">
                    </div>
                </div>
                <input data-calculator-field="CREDIT-CARD-CALC-interest-rate" type="range" min="0.25" max="15" value="4.25" step="0.25" class="styled-slider slider-progress">
                <div class="uk-flex uk-flex-between">
                    <div>0.25%</div>
                    <div>15%</div>
                </div>
                <div class="uk-position-relative uk-margin-medium">
                        <h2 class="uk-text-center uk-text-capitalize" data-results-suffix="a month">Interest-only payment of <span data-calculator-field="credit-card-interest-only-payment" class="results-value-text uk-text-bold">£</span></h2>
                </div>
                <hr class="uk-divider-icon">
            </div>

        </div>

        <div uk-grid class="uk-grid uk-grid-match">

            <div class="uk-width-1-2@s">
                <div class="uk-card uk-card-default">
                    <div class="uk-card-body">
                        <div class="uk-padding-small">
                            <div class="uk-margin">
                                <h4 class="uk-margin-small">Choose a monthly payment amount.</h4>
                                <div class="uk-position-relative" data-prefix="£">
                                    <input data-calculator-field="CREDIT-CARD-CALC-monthly-amount" class="uk-input" value="250">
                                </div>
                            </div>
                            <div data-calculator-field="credit-card-results-container">
                                <div class="uk-position-relative">
                                    <h2 class="uk-text-center" data-results-suffix="months">
                                        <span class="uk-margin-large-right uk-text-capitalize">This will take </span>
                                        <br>
                                        <span data-calculator-field="credit-card-months-to-payoff" class="results-value-text uk-text-bold uk-text-center">
                                            12
                                        </span>
                                    </h2>
                                </div>
                                <div class="uk-position-relative">
                                    <h2 class=" uk-text-center uk-text-capitalize" data-results-suffix="years">
                                        Or a total of 
                                        <span data-calculator-field="credit-card-years-to-payoff" class="results-value-text uk-text-bold">
                                            5
                                        </span>
                                    </h2>
                                </div>
                                <hr class="uk-divider-icon">
                                <div class="uk-position-relative uk-margin-medium-top">
                                    <h2 class=" uk-text-center" data-results-suffix="Total Interest">
                                        <span data-calculator-field="credit-card-chosen-payment-total-interest" class="results-value-text uk-text-bold">£1000</span>
                                    </h2>
                                </div>
                            </div>
                            <div data-calculator-field="credit-card-results-error" class='uk-hidden uk-margin-medium-top'>
                                <div class="uk-position-relative">
                                    <h2 class="">Please try again!</h2>
                                    <h4 class="">The monthly payment amount must be greater than the interest only payment or the debt will never be cleared.</h4>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="uk-width-1-2@s">
                <div class="uk-card uk-card-default">
                    <div class="uk-card-body">
                        <div class="uk-padding-small">
                            <div class="uk-margin">
                                <h4 class="uk-margin-small">Number of months to pay-off the balance?</h4>
                                <div class="uk-position-relative">
                                    <input data-calculator-field="CREDIT-CARD-CALC-amount-of-months" class="uk-input" value="6">
                                </div>
                            </div>
                            <div class="uk-margin-large-top">
                                <div class="uk-position-relative">
                                    <h2 class=" uk-text-center uk-text-capitalize">Monthly payment of 
                                        <br>
                                        <span data-calculator-field="credit-card-monthly-payment" class="results-value-text uk-text-bold">£</span>
                                </h2>
                                </div>
                                <hr class="uk-divider-icon">
                                <div class="uk-position-relative uk-margin-medium-top">
                                    <h2 class=" uk-text-center" data-results-suffix="Total Interest">
                                        <span data-calculator-field="credit-card-chosen-months-total-interest" class="results-value-text uk-text-bold">£</span>
                                    </h2>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>

    </div>
</div>
