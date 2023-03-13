<?php
    # HEAD
    include($_SERVER['DOCUMENT_ROOT']."/financial-dashboard/includes/html/core/head.php");

    ## Root will need changing. This root is for use on my virtual server test area.
?>
<body>
    <div class="fd--site--wrapper">
        <nav id="fd_sticky_navbar" class=hide>
            <div class="uk-container">
                <div class="fd--nav uk-flex uk-width-1-1">
                    <div class="fd--nav--logo--container uk-flex uk-flex-middle">
                        <img id="fd_nav_logo" class="fd--nav--logo" src="./images/logo-remove-bg.png">
                    </div>
                    <div class="uk-flex uk-flex-middle">
                        <div class="fd--nav--divider"></div>
                    </div>
                    <div class="fd--nav--menu--container uk-width-expand uk-padding uk-padding-remove-left">
                        <ul class="fd--nav--menu" uk-switcher>
                            <li>
                                <a href="#">Calculators</a>
                            </li>
                            <li>
                                <a href="#">Graphs</a>
                            </li>
                            <li>
                                <a href="#">Diagrams</a>
                            </li>
                            <li>
                                <a href="#">Info</a>
                            </li>
                            <li>
                                <a href="#">Contact</a>
                            </li>
                        </ul>
                    </div>
                    <div class="uk-width-auto uk-flex uk-flex-middle">
                        <a href="" class="fd--nav--social" uk-icon="icon: instagram; ratio: 0.9"></a>  
                        <div class="fd--social--divider"></div>
                        <a href="" class="fd--nav--social" uk-icon="icon: facebook; ratio: 0.9"></a>  
                    </div>
                </div>
            </div>
        </nav>
        <div style="height: 54px">

        </div>
        <main class="uk-container uk-margin-large-top">
            <div class="uk-flex uk-flex-center">
                <h1 class="uk-text-center fd--title">Calculators</h1>
            </div>
            <div class="uk-card uk-card-default uk-margin-top">
                <div uk-grid class="uk-grid uk-child-width-1-4 uk-grid-collapse uk-grid-match">
                    <div>
                        <button class="uk-button fd--card--nav active" type="button">
                            <span uk-icon="icon: settings; ratio: 1.8"></span>
                            <br>
                            Mortgages
                        </button>
                    </div>
                    <div>
                        
                        <button class="uk-button fd--card--nav" type="button">
                            <span uk-icon="icon: credit-card; ratio: 2"></span>
                            <br>
                            Credit Cards
                        </button>
                    </div>
                    <div>
                        <button class="uk-button fd--card--nav" type="button">
                            <span uk-icon="icon: settings; ratio: 1.8"></span>
                            <br>
                            Savings
                        </button>
                    </div>
                    <div>
                        <button class="uk-button fd--card--nav" type="button">
                            <span uk-icon="icon: settings; ratio: 1.8"></span>
                            <br>
                            Salary
                        </button>
                    </div>
                </div>
                <div class="uk-padding">
                    <div>
                        <h2>Mortgages</h2>
                    </div>
                    <div uk-grid class="uk-grid uk-child-width-1-2@s uk-grid-match">
                        <div>
                            <div class="uk-card uk-card-default">
                                <div class="fd--card--header uk-padding-small">
                                    <h4>Simple Repayment Calculator</h4>
                                </div>
                                <div class="fd--card--body uk-padding">
                                    <p>
                                        A simple calculator for repayment mortgages. A quick and easy way to find out what your monthly payments could be, based on the mortgage balance and interest rate.
                                    </p>
                                </div>
                                <div class="fd--card--footer uk-card-footer">
                                    <button class="uk-button" type="button">
                                        GO
                                        <span uk-icon="icon: arrow-right; ratio: 1.8" class="uk-animation-slide-left"></span>
                                    </button>
                                </div>
                            </div>

                        </div>
                        <div>
                            <div class="uk-card uk-card-default">
                                <div class="fd--card--header uk-padding-small">
                                    <h4>Simple Interest-Only Calculator</h4>
                                </div>
                                <div class="fd--card--body uk-padding">
                                    <p>
                                        A simple calulator for interest-only mortgages.
                                        A quick and easy way to find out what your monthly payments could be, base on the mortgage balance, interest rate and term.
                                    </p>
                                </div>
                                <div class="fd--card--footer uk-card-footer">
                                    <button class="uk-button" type="button">
                                        GO
                                        <span uk-icon="icon: arrow-right; ratio: 1.8" class="uk-animation-slide-left"></span>
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div>
                            <div class="uk-card uk-card-default">
                                <div class="fd--card--header uk-padding-small">
                                    <h4>Overpayment Calculator</h4>
                                </div>
                                <div class="fd--card--body uk-padding">
                                    <p>
                                        A Simple overpayment calculator that allows the user to make regular monthly overpayments and/or lump sum overpayments. The mortgage balance, term and interest rate is required.
                                    </p>
                                </div>
                                <div class="fd--card--footer uk-card-footer">
                                    <button class="uk-button" type="button">
                                        GO
                                        <span uk-icon="icon: arrow-right; ratio: 1.8" class="uk-animation-slide-left"></span>
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div>
                            <div class="uk-card uk-card-default">
                                <div class="fd--card--header uk-padding-small">
                                    <h4>Complex Mortgage Calculator</h4>
                                </div>
                                <div class="fd--card--body uk-padding">
                                    <p>
                                        A much more complex and informative mortgage calculator. It expands greatly on the overpayment calculator. Adding extra features such as regular overpayment intervals, annual overpayments. The calculator can also be used to get the balance at the end of a mortgage fixed term. See the interest, capital split of every payment and much more.
                                    </p>
                                </div>
                                <div class="fd--card--footer uk-card-footer">
                                    <button class="uk-button" type="button">
                                        GO
                                        <span uk-icon="icon: arrow-right; ratio: 1.8" class="uk-animation-slide-left"></span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <?php 
                        # Mortgage Interest-Only Payment Calculator
                        include($_SERVER['DOCUMENT_ROOT']."/financial-dashboard/includes/html/calculators/mortgages/simple-interest-only-calc.php");
                    ?>

                    <?php 
                        # Mortgage Repayment Payment Calculator
                        include($_SERVER['DOCUMENT_ROOT']."/financial-dashboard/includes/html/calculators/mortgages/simple-repayment-calc.php");
                    ?>

                    <?php 
                        # Mortgage Overpayment Calculator
                        include($_SERVER['DOCUMENT_ROOT']."/financial-dashboard/includes/html/calculators/mortgages/overpayment-calc.php");
                    ?>

                </div>
            </div>
        </main>
        <footer class="uk-margin-large-top">
            
        </footer>
    </div>
</body>
</html>