<div class="uk-padding uk-padding-remove-bottom">
    <ul class="uk-breadcrumb">
        <!--
        <li><a href="">Calculators</a></li>
        -->
        <li><a href="#" onclick="_CORE.funcs.handleBreadcrumbs('mortgages')">Mortgages</a></li>
        <li><a href="#">Overpayment</a></li>
    </ul>
</div>
<div class="fd--calc--custom--container">
    <div id="OVERPAYMENT-CALC" class="">
        <div class="">
            <div class="fd--calc--title uk-padding uk-padding-remove-vertical uk-flex uk-flex-center">
                <h2 class="fd--title--secondary uk-margin-bottom">Mortgage Overpayment Calculator</h2>
            </div>
            <div class="uk-margin-bottom">
                <div class="">
                    <div class="uk-card uk-card-default uk-padding-small fd--card">
                        <div class="title-border">
                            <h3>Mortgage Details</h3>
                        </div>
                        <div data-calculator-field="mortgage-details-error-text" class="uk-hidden">
                            <div class="uk-alert-danger uk-text-center uk-alert">
                                <h4></h4>
                            </div>
                        </div>
                        <div uk-grid class="uk-child-width-1-2@s uk-child-width-1-4@m uk-grid-small">
                            <div>
                                <label class="uk-margin-small">Mortgage Balance</label>
                                <div class="uk-position-relative" data-prefix="£">
                                    <input data-calculator-field="OVERPAYMENT-CALC_mortgage_balance" class="uk-input" type="text" vaLue="180000">
                                </div>
                            </div>
                            <div>
                                <label>Interest Rate</label>
                                <div class="uk-position-relative" data-suffix="%">
                                    <input data-calculator-field="OVERPAYMENT-CALC_mortgage_rate" class="uk-input" type="text" vaLue="2.17">
                                </div>
                            </div>
                            <div>
                                <label>Mortgage Term</label>
                                <div class="uk-position-relative" data-suffix="Years">
                                    <input data-calculator-field="OVERPAYMENT-CALC_mortgage_term_years" class="uk-input" type="text" vaLue="28">
                                </div>
                            </div>
                            <div>
                                <label>&nbsp</label>
                                <div class="uk-position-relative" data-suffix="Months">
                                    <input data-calculator-field="OVERPAYMENT-CALC_mortgage_term_months" class="uk-input" type="text" vaLue="0">
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="results-banner">
                        <h3 class="uk-margin-remove">Current Monthly Payment: <span data-calculator-field="OVERPAYMENT-CALC_mortgage-current-monthly-payment" style="color: #a4ccc6; font-weight: bold;">£0</span></h3>
                    </div>
                </div>
            </div>
            <div class="uk-margin-bottom">
                <div class="">
                    <div class="uk-card uk-card-default uk-padding-small fd--card">
                        <div class="title-border">
                            <h3>Overpayment Details</h3>
                        </div>
                        <div class="uk-margin uk-padding-small">
                            Typically you're only allowed to overpay by up to 10% of your outstanding mortgage balance per year. Bear this in mind in particular if you wish to make recurring overpayments more than once a year.
                        </div>
                        <div data-calculator-field="mortgage-overpayment-error-text" class="uk-hidden">
                            <div class="uk-alert-danger uk-text-center uk-alert">
                                <h4></h4>
                            </div>
                        </div>
                        <div uk-grid class="uk-grid">
                            <div class="uk-width-1-1 uk-width-expand@s uk-width-auto@m">
                                <label>Regular Monthly Overpayment</label>
                                <div class="uk-position-relative" data-prefix="£">
                                    <input data-calculator-field="OVERPAYMENT-CALC_regular_overpayment" class="uk-input" value="0">
                                </div>
                            </div>
                            <div class="uk-width-1-1 uk-width-auto@s uk-width-auto@m uk-flex uk-flex-center uk-flex-middle">
                                <div class="">
                                    <h3 class="uk-text-center uk-margin-remove">AND / OR</h3>
                                </div>
                            </div>
                            <div class="uk-width-1-1 uk-width-expand@s uk-width-auto@m">
                                <label>Lump Sum Overpayment</label>
                                <div class="uk-position-relative" data-prefix="£">
                                    <input data-calculator-field="OVERPAYMENT-CALC_lump_sum_overpayment" class="uk-input" value="0">
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="results-banner">
                        <h3 class="uk-margin-remove">New Monthly Payment: <span data-calculator-field="OVERPAYMENT-CALC_mortgage-new-monthly-payment" style="color: #a4ccc6; font-weight: bold;">£0</span></h3>
                    </div>
                </div>
            </div>
        
            <div class="text-banner uk-padding" data-calculator-field="OVERPAYMENT-CALC_mortgage-overpayment-message-container">
                <h3 data-calculator-field="OVERPAYMENT-CALC_overpayment_message" class="uk-margin-remove">
        
                </h3>
            </div>
        
            <div data-calculator-field="mortgage-results-container" uk-grid class="uk-grid uk-grid-small uk-margin-top">
                <div class="uk-width-1-1">
                    <div class="chart-container uk-padding-small">
                        <div data-calculator-field="OVERPAYMENT-CALC_mortgage-chart-div" style="width:100%" class="uk-margin-top"></div>
                    </div>
                </div>

                <div class="uk-flex uk-margin-medium-top uk-margin-bottom fd--table-toggle--container">
                    <div class="uk-flex uk-flex-middle uk-margin-small-right">
                        <h3 class="uk-margin-remove">Show:</h3>
                    </div>
                    <div class="uk-flex">
                        <div class="">
                            <button data-calculator-field="OVERPAYMENT-CALC_mortgage-yearly-toggle" class="uk-button fd--table--toggle--yearly active" onclick="_CORE.overpayment.funcs.tableToggle('yearly')">Yearly Balance</button>
                        </div>
                        <div class="">
                            <button data-calculator-field="OVERPAYMENT-CALC_mortgage-monthly-toggle" class="uk-button fd--table--toggle--monthly" onclick="_CORE.overpayment.funcs.tableToggle('monthly')">Monthly Balance</button>
                        </div>
                    </div>
                </div>

                <div class="uk-width-1-1 uk-margin-remove">
                    <div class="uk-position-relative uk-width-1-1" style="overflow-y: auto; height: 790px;">
                        <div class="mortgage-table uk-margin-small-top uk-position-relative" style="position: absolute;">
                            <div class="mortgage-table-header uk-flex uk-flex-middle uk-flex-between uk-padding">
                                <h3 class="uk-margin-remove" style="color: #fff">Mortgage Balance</h3>
                                <div>
                                    <button type="button" class="uk-icon-button" uk-icon="expand" style="color: #333" onclick="_CORE.overpayment.funcs.expandShrinkExtendedRows(this)"></button>
                                </div>
                            </div>
                            <div class="mortgage-table-content">
                                <div uk-grid class="mortgage-table-content-header uk-grid uk-grid-row-collapse uk-grid-collapse uk-margin-remove" style="padding-left: 5px;">
                                    <div id="fd_overpayment_period_name" class="uk-text-center uk-width-1-5 uk-width-1-3">
                                        Year
                                    </div>
                                    <div class="uk-text-center uk-width-2-5 uk-width-1-3">
                                        Without Overpayment
                                    </div>
                                    <div class="uk-text-center uk-width-2-5 uk-width-1-3">
                                        With Overpayment
                                    </div>
                                </div>
                                <div class="uk-width-1-1 uk-position-relative" style="overflow-y: auto; min-height: 610px;">
                                    <div class="uk-width-1-1" style="position: absolute;">
                                        <div data-calculator-field="OVERPAYMENT-CALC_mortgage-table-row-container">
                    
                                        </div>
                                        <div data-calculator-field="OVERPAYMENT-CALC_mortgage-table-row-container-extended" class="uk-hidden">
                        
                                        </div>
                                    </div>
                                </div>        
                            </div>
                        </div>
                    </div>
                </div>
            </div>    

            <div class="uk-margin-top">
                <p class="uk-margin-remove uk-text-center">
                    It's important to note that overpayment calculators are for guidance purposes only and the actual amount you save will depend on several factors. It's recommended to speak to a mortgage advisor or financial planner before making any decisions regarding mortgage overpayment.
                </p>
            </div>

        </div>
    </div>
</div>

