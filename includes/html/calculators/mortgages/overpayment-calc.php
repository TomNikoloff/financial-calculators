<div class="uk-padding">
    <h1 class="uk-text-center uk-margin-medium-bottom">Mortgage Overpayment Calculator</h1>
    <div class="uk-margin-bottom">
        <div class="uk-card uk-card-default uk-card-body">
            <div class="uk-padding-small">
                <div class="title-border">
                    <h3>Mortgage Details</h3>
                </div>
                <div uk-grid class="uk-child-width-1-2@s uk-child-width-1-4@m uk-grid-small">
                    <div>
                        <label>Mortgage Balance</label>
                        <div>
                            <input class="uk-input" type="text" vaLue="180000">
                        <div>
                    </div>
                    <div>
                        <label>Term - Years</label>
                        <div>
                            <input class="uk-input" type="text" vaLue="28">
                        <div>
                    </div>
                    <div>
                        <label>Term - Months</label>
                        <div>
                            <input class="uk-input" type="text" vaLue="0">
                        <div>
                    </div>
                    <div>
                        <label>Interest Rate</label>
                        <div>
                            <input class="uk-input" type="text" vaLue="2.17">
                        <div>
                    </div>
                </div>
            </div>
            <div class="results-banner">
                <h3 class="uk-margin-remove">Current Monthly Payment: <span id="OVERPAYMENT-CALC_current_monthly_payment" style="color: #faa05a; font-weight: bold;">£0</span></h3>
            </div>
        </div>
    </div>

    <div class="uk-margin-bottom">
        <div class="uk-card uk-card-default uk-card-body">
            <div class="uk-padding-small">
                <div class="title-border">
                    <h3>Overpayment Details</h3>
                </div>
                <div uk-grid class="uk-child-width-1-3@s uk-grid-small">
                    <div>
                        {$regular_overpayment$}
                    </div>
                    <div class="uk-flex uk-flex-bottom uk-flex-center">
                        <h3 class="uk-text-center uk-margin-bottom">AND / OR</h3>
                    </div>
                    <div>
                        {$lump_sum_overpayment$}
                    </div>
                </div>
            </div>
            <div class="results-banner">
                <h3 class="uk-margin-remove">New Monthly Payment: <span id="OVERPAYMENT-CALC_new_monthly_payment" style="color: #faa05a; font-weight: bold;">£0</span></h3>
            </div>
        </div>
    </div>

    <div class="text-banner uk-padding">
        <h3 id="OVERPAYMENT-CALC_overpayment_message" class="uk-margin-remove">

        </h3>
    </div>

    <div uk-grid class="uk-grid uk-grid-small uk-margin-top">
        <div class="uk-width-1-1">
            <div class="chart-container uk-padding-small">
                <div id="chart_div" style="width:100%" class="uk-margin-top"></div>
            </div>
        </div>
        <div class="uk-width-1-1">
            <div class="mortgage-table uk-margin-small-top">
                <div class="mortgage-table-header uk-flex uk-flex-middle uk-padding">
                    <h3 class="uk-margin-remove" style="color: #fff">Mortgage Balance</h3>
                </div>
                <div class="mortgage-table-content">
                    <div uk-grid class="mortgage-table-content-header uk-grid uk-grid-row-collapse uk-grid-collapse uk-margin-remove">
                        <div class="uk-text-center uk-width-1-5 uk-width-1-3">
                            Year
                        </div>
                        <div class="uk-text-center uk-width-2-5 uk-width-1-3">
                            Without Overpayment
                        </div>
                        <div class="uk-text-center uk-width-2-5 uk-width-1-3">
                            With Overpayment
                        </div>
                    </div>
                    <div id="mortgage_table_row_container">
        
                    </div>
                </div>
            </div>
        </div>
    </div>
    
</div>

