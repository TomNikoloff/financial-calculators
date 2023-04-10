<?php
    # HEAD
    include($_SERVER['DOCUMENT_ROOT']."/financial-dashboard/includes/html/core/head.php");

    ## Root will need changing. This root is for use on my virtual server test area.
?>
<body>
    <div class="fd--site--wrapper">
        <nav id="fd_sticky_navbar" class="hide">
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
                <h1 class="uk-text-center fd--title">Financial Calculators</h1>
            </div>
            <div class="uk-margin-top">
                <div class="uk-card uk-card-default">
                    <div id="fd_calc_category_menu" uk-grid class="uk-grid uk-child-width-1-2 uk-child-width-1-4@s uk-grid-collapse uk-grid-match" uk-switcher="connect: #fd_calc_category_switcher">
                        <div>
                            <button class="uk-button fd--card--nav" type="button" onclick="_CORE.funcs.switchCalcCategory()">
                                <span uk-icon="icon: settings; ratio: 1.8"></span>
                                <br>
                                Mortgages
                            </button>
                        </div>
                        <div>
                            
                            <button class="uk-button fd--card--nav" type="button" onclick="_CORE.funcs.switchCalcCategory()">
                                <span uk-icon="icon: credit-card; ratio: 2"></span>
                                <br>
                                Credit / Loans
                            </button>
                        </div>
                        <div>
                            <button class="uk-button fd--card--nav" type="button" onclick="_CORE.funcs.switchCalcCategory()">
                                <span uk-icon="icon: settings; ratio: 1.8"></span>
                                <br>
                                Savings / Invest
                            </button>
                        </div>
                        <div>
                            <button class="uk-button fd--card--nav" type="button" onclick="_CORE.funcs.switchCalcCategory()">
                                <span uk-icon="icon: settings; ratio: 1.8"></span>
                                <br>
                                Salary
                            </button>
                        </div>
                    </div>
                </div>
                <ul id="fd_calc_category_switcher" class="uk-switcher">
                    <li>
                        <!-- Mortgage Calcs Menu -->
                        <div class="uk-card uk-card-default uk-padding">
                            <div class="uk-animation-scale-up">
                                <div class="fd--calcs--list--title">
                                    <h2>Mortgages</h2>
                                </div>
                                <div id="fd_mortgage_calcs_menu" uk-grid class="uk-grid uk-child-width-1-2@s uk-grid-match fd--calcs--menu" uk-switcher="connect: #fd_mortgage_calcs_switcher">
                                    <?php 
                                        # Mortgage Calculator Menu
                                        include($_SERVER['DOCUMENT_ROOT']."/financial-dashboard/includes/html/calculators/mortgages/menu.php");
                                    ?>
                                </div>
                                <ul id="fd_mortgage_calcs_switcher" class="uk-switcher uk-animation-scale-up fd--calcs--list hide">
                                    <li>
                                        <?php 
                                            # Mortgage Repayment Payment Calculator
                                            include($_SERVER['DOCUMENT_ROOT']."/financial-dashboard/includes/html/calculators/mortgages/simple-repayment-calc.php");
                                        ?>
                                    </li>
                                    <li>
                                        <?php 
                                            # Mortgage Interest-Only Payment Calculator
                                            include($_SERVER['DOCUMENT_ROOT']."/financial-dashboard/includes/html/calculators/mortgages/simple-interest-only-calc.php");
                                        ?>
                                    </li>
                                    <li>
                                        <?php 
                                            # Mortgage Overpayment Calculator
                                            include($_SERVER['DOCUMENT_ROOT']."/financial-dashboard/includes/html/calculators/mortgages/overpayment-calc.php");
                                        ?>
                                    </li>
                                    <li>
    
                                    </li>
                                </ul>
                            </div>
                        </div>

                        <!-- Mortgage Info -->
                        <div class="uk-margin-large-top">
                            <?php
                                # Mortgage Info Section 
                                include($_SERVER['DOCUMENT_ROOT']."/financial-dashboard/includes/html/calculators/mortgages/info.php");
                            ?>
                        </div>
                    </li>
                    <li>
                        <!-- Credit / Loan Calcs Menu -->
                        <div class="uk-card uk-card-default uk-padding">
                            <div class="uk-animation-scale-up">
                                <div class="fd--calcs--list--title">
                                    <h2>Credit Cards / Loans</h2>
                                </div>
                                <div id="fd_credit_calcs_menu" uk-grid class="uk-grid uk-child-width-1-2@s uk-grid-match fd--calcs--menu" uk-switcher="connect: #fd_credit_calcs_switcher">
                                    <?php 
                                        # Credit Card Calculator Menu
                                        include($_SERVER['DOCUMENT_ROOT']."/financial-dashboard/includes/html/calculators/loans/menu.php");
                                    ?>
                                </div>
                                <ul id="fd_credit_calcs_switcher" class="uk-switcher uk-animation-scale-up fd--calcs--list hide">
                                    <li>
                                        <?php 
                                            # Credit Card Calculator
                                            include($_SERVER['DOCUMENT_ROOT']."/financial-dashboard/includes/html/calculators/loans/credit-card-calc.php");
                                        ?>
                                    </li>
                                    <li>

                                    </li>
                                    <li>
                                        <?php 
                                            # Loan Calculator
                                            include($_SERVER['DOCUMENT_ROOT']."/financial-dashboard/includes/html/calculators/loans/simple-loan.php");
                                        ?>
                                    </li>
                                    <li>

                                    </li>
                                </ul>
                            </div>
                        </div>

                        <!-- Credit / Loan Calcs Info -->
                        <div class="uk-margin-large-top">
                            <?php
                                # Credit Card Info Section 
                                include($_SERVER['DOCUMENT_ROOT']."/financial-dashboard/includes/html/calculators/loans/info.php");
                            ?>
                        </div>

                    </li>
                    <li>
                        <!-- Savings/ Investments Calcs Menu -->
                        <div class="uk-card uk-card-default uk-padding">
                            <div class="uk-animation-scale-up">
                                <div class="fd--calcs--list--title">
                                    <h2>Savings / Investments</h2>
                                </div>
                                <div id="fd_savings_calcs_menu" uk-grid class="uk-grid uk-child-width-1-2@s uk-grid-match fd--calcs--menu" uk-switcher="connect: #fd_savings_calcs_switcher">
                                    <?php 
                                        # Savings Calculator Menu
                                        include($_SERVER['DOCUMENT_ROOT']."/financial-dashboard/includes/html/calculators/savings/menu.php");
                                    ?>
                                </div>
                                <ul id="fd_savings_calcs_switcher" class="uk-switcher uk-animation-scale-up fd--calcs--list hide">
                                    <li>

                                    </li>
                                    <li>

                                    </li>
                                    <li>

                                    </li>
                                    <li>

                                    </li>
                                </ul>
                            </div>
                        </div>

                        <!-- Savings/ Investments Info -->
                        <div class="uk-margin-large-top">

                        </div>

                    </li>
                    <li class="uk-animation-scale-up">
                        <div>
                            Salary
                        </div>
                    </li>
                </ul>
            </div>

        </main>
        <footer class="uk-margin-large-top">
            <div class="fd--footer--infoBox">
                <div class="uk-container">
                    <div uk-grid class="uk-grid">
                        <div class="uk-width-2-3@s uk-width-1-2@m">
                            <div class="fd--footer-heading">
                                <h3 class="fd--text--secondary">
                                    Financial-Calculators
                                </h3>
                            </div>
                            <p class="fd--text--primary uk-flex">
                                <span class="uk-margin-small-right" uk-icon="mail"></span>
                                <a class="fd--text--primary" href="mailto:info@financial-calculators.co.uk">info@financial-calculators.co.uk</a>
                            </p>
                            <p class="fd--text--secondary">Disclaimer: Information provided on this site is for illustrative purposes only.
                                Do not make any major financial decisions without consulting a qualified specialist.
                            </p>
                        </div>
                        <div uk-grid class="uk-width-1-3@s uk-width-1-2@m uk-margin-remove uk-grid-collapse uk-padding-remove uk-grid">
                            <div class="uk-width-1-3 uk-visible@m uk-first-column">
                            </div>
                            <div class="uk-width-2-3@m uk-flex uk-flex-middle uk-flex-center">
                                <div class="fd--footer--logo uk-flex uk-flex-middle uk-margin-remove@s">
                                    <img class="" src="./images/logo-remove-bg.png">
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="fd--footer--bar">
                <div class="uk-container uk-flex uk-flex-between">
                    <div>
                        © 2023  |  All Rights Reserved
                    </div>
                    <div>
                        financial-calculators.co.uk
                    </div>
                </div>
            </div>
        </footer>
    </div>
</body>
</html>