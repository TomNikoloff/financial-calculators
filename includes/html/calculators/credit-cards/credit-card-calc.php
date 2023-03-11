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
            {$card_balance$}
            {$interest_rate$}
            {$interest_only_result$}
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