<div class="uk-padding uk-padding-remove-bottom">
    <ul class="uk-breadcrumb">
        <!--
        <li><a href="">Calculators</a></li>
        -->
        <li><a href="#" onclick="_CORE.funcs.handleBreadcrumbs('mortgages')">Mortgages</a></li>
        <li><a href="#">Complex</a></li>
    </ul>
</div>

<div class="fd--calc--custom--container uk-padding-remove-top">
    <div id="COMPLEX-CALC" class="">
        <div class="fd--calc--title uk-padding uk-padding-remove-vertical uk-flex uk-flex-center">
            <h2 class="fd--title--secondary uk-margin-bottom">Complex Mortgage Calculator</h2>
        </div>
        <div class="uk-margin-bottom">
            <div class="uk-card uk-card-default fd--card">
                <div class="uk-padding">
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
                                <input data-calculator-field="COMPLEX-CALC_mortgage_balance" class="uk-input" type="text" vaLue="200,000">
                            </div>
                        </div>
                        <div>
                            <label>Interest Rate</label>
                            <div class="uk-position-relative" data-suffix="%">
                                <input data-calculator-field="COMPLEX-CALC_mortgage_rate" class="uk-input" type="text" vaLue="2.17">
                            </div>
                        </div>
                        <div>
                            <label>Term</label>
                            <div class="uk-position-relative" data-suffix="Years">
                                <input data-calculator-field="COMPLEX-CALC_mortgage_term_years" class="uk-input" type="text" vaLue="28">
                            </div>
                        </div>
                        <div>
                            <label>&nbsp</label>
                            <div class="uk-position-relative" data-suffix="Months">
                                <input data-calculator-field="COMPLEX-CALC_mortgage_term_months" class="uk-input" type="text" vaLue="0">
                            </div>
                        </div>
                    </div>
                </div>
                <div class="results-banner">
                    <h3 class="uk-margin-remove">Current Monthly Payment: <span data-calculator-field="COMPLEX-CALC_mortgage-current-monthly-payment" style="color: #a4ccc6; font-weight: bold;">£0</span></h3>
                </div>
            </div>
        </div>

        <div data-calculator-field="mortgage-results-container">

            <div uk-grid class="uk-grid uk-child-width-1-1 uk-grid-match">
                <div class="uk-margin-bottom">
                    <div class="uk-card uk-card-default fd--card">
                            <div class="uk-flex uk-flex-column uk-height-1-1">
                                <div class="uk-padding">
                                    <div class="title-border">
                                        <h3>Overpayment Details</h3>
                                    </div>
                                    <div data-calculator-field="COMPLEX-CALC_mortgage-overpayment-error-text" class="uk-hidden">
                                        <div class="uk-alert-danger uk-text-center uk-alert">
                                            <h4></h4>
                                        </div>
                                    </div>
                                    <div uk-grid class="uk-grid uk-grid-small uk-child-width-1-3@s">
                                        <div class="">
                                            <div>
                                                <label>Regular Overpayment</label>
                                                <div class="uk-position-relative" data-prefix="£">
                                                    <input data-calculator-field="COMPLEX-CALC_mortgage-regular-overpayment" class="uk-input" value="0">
                                                </div>
                                            </div>
                                        </div>
                                        <div class="">
                                            <div class="uk-flex uk-flex-around">
                                                <div>
                                                    <label>Overpayment Every</label>
                                                    <div class="uk-position-relative" data-suffix="Months">
                                                        <input data-calculator-field="COMPLEX-CALC_mortgage-overpayment-interval" class="uk-input" value="1">
                                                    </div>
                                                </div>
                                                <div class="uk-flex uk-flex-bottom">
                                                    <a uk-toggle="target: #helper_modal_overpayment_interval" href="" class="uk-icon-button" uk-icon="icon: info; ratio: 2;"></a>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="">
                                            <div>
                                                <label>Annual Overpayment</label>
                                                <div class="uk-position-relative" data-prefix="£">
                                                    <input data-calculator-field="COMPLEX-CALC_mortgage-annual-overpayment" class="uk-input" value="0">
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="results-banner uk-margin-auto-top">
                                    <h3 class="uk-margin-remove">New Monthly Payment: <span data-calculator-field="COMPLEX-CALC_mortgage-new-monthly-payment" style="color: #a4ccc6; font-weight: bold;">£0</span></h3>
                                </div>
                            </div>
                    </div>
                </div>
        
            </div>

            <div class="uk-flex uk-margin-top uk-margin-bottom fd--table-toggle--container">
                <div class="uk-flex uk-flex-middle uk-margin-small-right">
                    <h3 class="uk-margin-remove">Show:</h3>
                </div>
                <div class="uk-flex">
                    <div class="">
                        <button data-calculator-field="COMPLEX-CALC_mortgage-yearly-toggle" class="uk-button fd--table--toggle--yearly" onclick="_CORE.complex_mortgage.funcs.tableToggle('yearly')">Yearly Info</button>
                    </div>
                    <div class="">
                        <button data-calculator-field="COMPLEX-CALC_mortgage-monthly-toggle" class="uk-button fd--table--toggle--monthly active" onclick="_CORE.complex_mortgage.funcs.tableToggle('monthly')">Monthly Info</button>
                    </div>
                </div>
            </div>

            <div class="uk-width-1-1">
                <div data-calculator-field="COMPLEX-CALC_mortgage-table-container" class="uk-position-relative uk-width-1-1">
                    <div class="mortgage-table complex-calculator-table uk-width-1-1">
                        <div class="mortgage-table-header uk-flex uk-flex-middle uk-flex-between uk-padding">
                            <h3 class="uk-margin-remove" style="color: #fff">Mortgage Info</h3>
                            <div>
                                <button type="button" class="uk-icon-button" uk-icon="expand" style="color: #333" onclick="_CORE.complex_mortgage.funcs.expandShrinkExtendedRows(this)"></button>
                            </div>
                        </div>
                        <div class="mortgage-table-content">
                            <div uk-grid class="mortgage-table-content-header uk-grid uk-grid-row-collapse uk-grid-collapse uk-margin-remove">
                                <div class="uk-text-center" style="width: 50px">
                                    No.
                                </div>
                                <div class="uk-text-center uk-width-expand">
                                    Due Date
                                </div>
                                <div class="uk-text-center uk-width-expand">
                                    Payment
                                </div>
                                <div class="uk-text-center uk-width-expand">
                                    Regular OP
                                </div>
                                <div class="uk-text-center uk-width-expand">
                                    Adhoc OP
                                </div>
                                <div class="uk-text-center uk-width-expand">
                                    Interest
                                </div>
                                <div class="uk-text-center uk-width-expand">
                                    Capital
                                </div>
                                <div class="uk-text-center uk-width-expand">
                                    Balance
                                </div>
                            </div>
                            <div class="uk-width-1-1 uk-position-relative" style="overflow-y: auto; min-height: 555px;">
                                <div class="uk-width-1-1" style="position: absolute;">
                                    <div data-calculator-field="COMPLEX-CALC_mortgage-table-row-container">
                
                                    </div>
                                    <div data-calculator-field="COMPLEX-CALC_mortgage-table-row-container-extended" class="uk-hidden">
                        
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="text-banner uk-padding uk-margin-top">
                <div class="title-border">
                    <h4>Totals Assuming No Overpayments Are Made</h4>
                </div>
                <div class="uk-text-center">
                    <h3 data-calculator-field="COMPLEX-CALC_mortgage-total-payments-default" class="uk-margin-remove">Total Payment Amount Of £140,052.69</h3>
                    <h3 data-calculator-field="COMPLEX-CALC_mortgage-total-interest-default" class="uk-margin-remove">Total Interest Of £71,557.69 Paid.</h3>
                </div>
            </div>

            <div class="uk-width-1-1 uk-margin-medium">
                <div class="chart-container uk-padding-small">
                    <div data-calculator-field="COMPLEX-CALC_mortgage-chart-div" style="width:100%" class="uk-margin-top"></div>
                </div>
            </div>

            <div class="text-banner">
                <div uk-grid class="uk-grid uk-child-width-1-2@m uk-margin-remove uk-grid-row-collapse">

                    <div class="fd--grid--first--line">
                        <div class="uk-padding-small">
                            <div class="uk-padding-small">
                                <div class="title-border">
                                    <h3>Balance At Product Expiry</h3>
                                </div>

                                <div>
                                    <input type="date" value class="uk-input" data-calculator-field="COMPLEX-CALC_mortgage-product-expiry-date">
                                </div>

                                <div data-calculator-field="_COMPLEX-CALC_mortgage-product_expiry_results_container">
                                    <div class="uk-position-relative uk-margin-medium-top uk-text-center">
                                        <h2 class="result-text" data-results-suffix="Interest Paid"><span data-calculator-field="COMPLEX-CALC_mortgage-product_expiry_interest" class="uk-text-bold" >£19,752.17</span></h2>
                                    </div>
                                    <div class="uk-position-relative uk-margin-medium-top uk-text-center">
                                        <h2 class="result-text" data-results-suffix="Capital Paid"><span data-calculator-field="COMPLEX-CALC_mortgage-product_expiry_capital" class="uk-text-bold">£5,711.83</span></h2>
                                    </div>
                                    <hr class="uk-divider-icon">
                                    <div class="uk-position-relative uk-margin-medium-top uk-text-center">
                                        <h2 class="result-text outstanding-balance" data-results-suffix="Outstanding Balance"><span data-calculator-field="COMPLEX-CALC_mortgage-product_expiry_outstanding" class="uk-text-bold">£62,783.17</span></h2>
                                    </div>
                                </div>

                                <div data-calculator-field="_COMPLEX-CALC_mortgage-product_expiry_error_container" class="uk-hidden uk-margin-large-top">
                                    <div class="uk-alert-danger uk-text-center uk-alert">
                                        <h4>
                                            Product Expiry Date cannot be beyond the mortgage end date.
                                        </h4>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>

                    <div class="fd--grid--second--line">
                        <div class="uk-padding-small">
                            <div class="uk-padding-small">
                                <div class="title-border">
                                    <h3>Full Amortization</h3>
                                </div>
                                <div class="uk-position-relative uk-margin-top uk-text-center">
                                    <h3 class="result-text" data-results-suffix="">Total Payment Amount <span data-calculator-field="COMPLEX-CALC_mortgage-amortization-payment" class="uk-text-bold">£140,052.69</span></h3>
                                </div>
                                <div class="uk-position-relative uk-margin-top uk-text-center">
                                    <h3 class="result-text" data-results-suffix="">Total Interest Paid <span data-calculator-field="COMPLEX-CALC_mortgage-amortization-interest" class="uk-text-bold">£71,557.69</span></h3>
                                </div>
                                <div class="uk-position-relative uk-margin-top uk-text-center">
                                    <h3 class="result-text" data-results-suffix="months">Number Of Payments <span data-calculator-field="COMPLEX-CALC_mortgage-amortization-months" class="uk-text-bold">264</span></h3>
                                </div>
                                <div class="uk-position-relative uk-margin-top uk-text-center">
                                    <h3 class="result-text" data-results-suffix="">Last Payment Date <span data-calculator-field="COMPLEX-CALC_mortgage-amortization-final-date" class="uk-text-bold">01/08/2044</span></h3>
                                </div>
                                <hr class="uk-divider-icon uk-margin-medium">
                                <div class="uk-position-relative uk-margin-top uk-text-center">
                                    <h3 class="result-text" data-results-suffix="">Interest Saved <span data-calculator-field="COMPLEX-CALC_mortgage-amortization-interest-saved" class="uk-text-bold">£0.00</span></h3>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        
        </div>

        <!-- Helper Modal -->
        <div id="helper_modal_overpayment_interval" uk-modal>
            <div class="uk-modal-dialog">
                <button class="uk-modal-close-default fd--modal--close--btn" type="button" uk-close></button>
                <div class="uk-modal-header">
                    <h2 class="uk-modal-title">Overpayment Interval</h2>
                </div>
                <div class="uk-modal-body">
                    <div>
                        <p>
                            Specifies that the Overpayment amount will be made every 'nth' payment.
                        </p>
                        <p>
                            For example,  if the desired payment frequency is monthly, enter a value of 1.
                            For every 2 months, enter 2 and so on.
                        </p>
                    </div>
                </div>
            </div>
        </div>

        <div class="uk-margin-top">
            <p class="uk-margin-remove uk-text-center">
                It's important to note that the calculators are for guidance purposes only and the actual amount you save will depend on several factors. It's recommended to speak to a mortgage advisor or financial planner before making any decisions regarding mortgage overpayment.
            </p>
        </div>

    </div>
</div>
