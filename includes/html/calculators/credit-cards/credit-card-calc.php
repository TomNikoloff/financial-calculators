<div class="uk-card-header" style="background-color: #f0f0f0;">
    <div uk-grid class="uk-grid uk-grid-small uk-flex-middle">
        <div class="uk-width-auto">
            <div style="width: 50px; height: 50px; line-height: 50px;" class="uk-text-center">
                <span class="zc-li-outline shopping-credit-card" style="transform: scale(3);"></span>
            </div>
        </div>
        <div class="uk-width-expand">
            <h3 class="uk-card-title uk-margin-remove-bottom">Credit Card Calculator</h3>
        </div>
    </div>
</div>
<div class="uk-padding">
    <input hidden id="CUSTOMER-PORTAL_calc_type" value="CREDIT-CARD-CALC">
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
                    <h2 class="result-text uk-text-center" data-results-suffix="a month">Interest-only payment of <span data-calculator-field="credit-card-interest-only-payment" class="results-value-text uk-text-bold">£</span></h2>
            </div>
            <hr class="uk-divider-icon">
        </div>

    </div>

    <div uk-grid class="uk-grid uk-grid-match">

        <div class="uk-width-1-2@s">
            <div class="uk-card uk-card-default">
                <div class="uk-card-body">
                    {$chosen_monthly_amount$}
                    {$payoff_results$}
                    {$payoff_error$}
                </div>
            </div>
        </div>

        <div class="uk-width-1-2@s">
            <div class="uk-card uk-card-default">
                <div class="uk-card-body">
                    {$amount_of_months$}
                    <div class="uk-margin-large-top">
                        {$amount_of_months_results$}
                    </div>
                </div>
            </div>
        </div>

    </div>

</div>