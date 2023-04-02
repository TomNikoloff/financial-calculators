
<ul class="uk-breadcrumb">
    <!--
    <li><a href="">Calculators</a></li>
    -->
    <li><a href="" >Mortgages</a></li>
    <li><a href="#">Overpayment</a></li>
</ul>

<div id="OVERPAYMENT-CALC" class="uk-margin-medium-top">
    <div class="">
        <div class="uk-padding uk-padding-remove-vertical">
            <h2 class="fd--title--border uk-margin-bottom">Mortgage Overpayment Calculator</h2>
        </div>
        <div class="uk-margin-bottom">
            <div class="uk-card uk-card-default uk-card-body">
                <div class="uk-padding-small">
                    <div class="title-border">
                        <h3>Mortgage Details</h3>
                    </div>
                    <div uk-grid class="uk-child-width-1-2@s uk-child-width-1-4@m uk-grid-small">
                        <div>
                            <label>Mortgage Balance</label>
                            <div class="uk-position-relative" data-prefix="£">
                                <input id="OVERPAYMENT-CALC_mortgage_balance" class="uk-input" type="text" vaLue="180000">
                            </div>
                        </div>
                        <div>
                            <label>Term - Years</label>
                            <div>
                                <input id="OVERPAYMENT-CALC_mortgage_term_years" class="uk-input" type="text" vaLue="28">
                            </div>
                        </div>
                        <div>
                            <label>Term - Months</label>
                            <div>
                                <input id="OVERPAYMENT-CALC_mortgage_term_months" class="uk-input" type="text" vaLue="0">
                            </div>
                        </div>
                        <div>
                            <label>Interest Rate</label>
                            <div class="uk-position-relative" data-suffix="%">
                                <input id="OVERPAYMENT-CALC_mortgage_rate" class="uk-input" type="text" vaLue="2.17">
                            </div>
                        </div>
                    </div>
                </div>
                <div class="results-banner">
                    <h3 class="uk-margin-remove">Current Monthly Payment: <span id="OVERPAYMENT-CALC_current_monthly_payment" style="color: #a4ccc6; font-weight: bold;">£0</span></h3>
                </div>
            </div>
        </div>
        <div class="uk-margin-bottom">
            <div class="uk-card uk-card-default uk-card-body">
                <div class="uk-padding-small">
                    <div class="title-border">
                        <h3>Overpayment Details</h3>
                    </div>
                    <div class="uk-flex uk-flex-between">
                        <div>
                            <label>Regular Monthly Overpayment</label>
                            <div>
                                <input id="OVERPAYMENT-CALC_regular_overpayment" class="uk-input" value="0">
                            </div>
                        </div>
                        <div class="uk-flex uk-flex-bottom uk-flex-center">
                            <h3 class="uk-text-center uk-margin-bottom">AND / OR</h3>
                        </div>
                        <div>
                            <label>Lump Sum Overpayment</label>
                            <div>
                                <input id="OVERPAYMENT-CALC_lump_sum_overpayment" class="uk-input" value="0">
                            </div>
                        </div>
                    </div>
                </div>
                <div class="results-banner">
                    <h3 class="uk-margin-remove">New Monthly Payment: <span id="OVERPAYMENT-CALC_new_monthly_payment" style="color: #a4ccc6; font-weight: bold;">£0</span></h3>
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

        <div class="uk-padding">
            <p>
                It's important to note that overpayment calculators are for guidance purposes only and the actual amount you save will depend on several factors. It's recommended to speak to a mortgage advisor or financial planner before making any decisions regarding mortgage overpayment.
            </p>
        </div>

    </div>
</div>
