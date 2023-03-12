<div id="INTEREST-ONLY" class="hide">
    <div class="uk-padding">
        <h2 class="uk-text-center uk-margin-medium-bottom">Mortgage Interest-Only Calculator</h2>
        <div class="uk-card-body">
            <div>
                <div class="uk-margin">
                    <h4 class="uk-margin-small">Interest Only Balance</h4>
                    <div class="uk-position-relative" data-prefix="£">
                        <input id="interest_only_balance" class="uk-input" value="0" onchange="_CORE.funcs.monthlyCalculation();">
                    </div>
                </div>
                <div class="uk-margin-medium uk-position-relative">
                    <h4 class="slider-label" style="margin-bottom: -27px">Interest rate is</h4>
                    <h4 class="uk-flex uk-flex-center uk-margin-remove">
                        <span id="mortgage_interes_rate_text" class="uk-text-bold">4.25</span> %
                    </h4>
                    <input id="mortgage_interest_rate" type="range" min="0.25" max="15" value="4.25" class="styled-slider slider-progress" oninput="_CORE.funcs.updateSlider(this)">
                    <div class="uk-flex uk-flex-between">
                        <div>0.25%</div>
                        <div>15%</div>
                    </div>
                </div>
                <div class="uk-position-relative">
                    <h2 class="result-text" data-results-suffix="a month">This will cost <span id="monthly_amount" class="uk-text-bold">£602.38</span></h2>
                </div>
            </div>
        </div>
    </div>
</div>


