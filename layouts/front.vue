<script setup>
// import "front/css/icons/bootstrap-icons.css"
// import "front/css/icons/font-awesome.css"
// import "front/css/icons/unicons.css"

// import "front/style.css"
// import "front/css/font-icons.css"
// import "front/css/components/bs-switches.css"
// import "front/demos/seo/seo.css"
// import "front/css/custom.css"

useHead({
    script:[
        {src:"/front/js/functions.bundle.js", type:"text/javascript", body:true},
        {src:"/front/js/plugins.min.js", type:"text/javascript", body:true},
        {src:"https://cdnjs.cloudflare.com/ajax/libs/skrollr/0.6.30/skrollr.min.js", type:"text/javascript", defer:true, client:true},
        {innerHTML:"document.addEventListener('DOMContentLoaded', function(){skrollr.init({forceHeight: false});})", defer:true, body:true, type:"text/javascript", client:true}
    ],
    link:[
        {rel:"stylesheet", href:"/front/style.css"},
        {rel:"stylesheet", href:"/front/css/font-icons.css"},
        {rel:"stylesheet", href:"/front/css/components/bs-switches.css"},
        {rel:"stylesheet", href:"/front/demos/seo/seo.css"},
        {rel:"stylesheet", href:"/front/css/custom.css"}
    ]
})
</script>

<template>
    <div id="wrapper">
        <!-- Top Bar
============================================= -->
        <div id="top-bar" class="transparent-topbar">
            <div class="container">
                <div class="row justify-content-between">
                    <div class="col-12 col-md-auto">
                        <!-- Top Links
                ============================================= -->
                        <div class="top-links">
                            <ul class="top-links-container">
                                <li class="top-links-item"><a href="demo-seo.html">Home</a></li>
                                <li class="top-links-item"><a href="demo-seo-faqs.html">FAQs</a></li>
                                <li class="top-links-item"><a href="demo-seo-contact.html">Contact</a></li>
                                <li class="top-links-item"><a href="#"><img src="/front/demos/seo/images/flags/eng.png"
                                            alt="Lang">Eng</a>
                                    <ul class="top-links-sub-menu">
                                        <li class="top-links-item"><a href="#"><img src="/front/demos/seo/images/flags/fre.png"
                                                    alt="Lang">French</a></li>
                                        <li class="top-links-item"><a href="#"><img src="/front/demos/seo/images/flags/ara.png"
                                                    alt="Lang">Arabic</a></li>
                                        <li class="top-links-item"><a href="#"><img src="/front/demos/seo/images/flags/tha.png"
                                                    alt="Lang">Thai</a></li>
                                    </ul>
                                </li>
                            </ul>
                        </div><!-- .top-links end -->

                    </div>

                    <div class="col-12 col-md-auto dark">

                        <!-- Top Social
                ============================================= -->
                        <ul id="top-social">
                            <li><a href="https://facebook.com/semicolonweb" class="h-bg-facebook" target="_blank"><span
                                        class="ts-icon"><i class="fa-brands fa-facebook-f"></i></span><span
                                        class="ts-text">Facebook</span></a></li>
                            <li><a href="https://twitter.com/__semicolon" class="h-bg-x-twitter" target="_blank"><span
                                        class="ts-icon"><i class="fa-brands fa-x-twitter"></i></span><span
                                        class="ts-text">Twitter</span></a></li>
                            <li><a href="https://youtube.com/semicolonweb" class="h-bg-youtube" target="_blank"><span
                                        class="ts-icon"><i class="fa-brands fa-youtube"></i></span><span
                                        class="ts-text">Youtube</span></a></li>
                            <li><a href="https://instagram.com/semicolonweb" class="h-bg-instagram" target="_blank"><span
                                        class="ts-icon"><i class="fa-brands fa-instagram"></i></span><span
                                        class="ts-text">Instagram</span></a></li>
                            <li><a href="tel:+10.11.85412542" class="h-bg-call"><span class="ts-icon"><i
                                            class="fa-solid fa-phone"></i></span><span
                                        class="ts-text">+10.11.85412542</span></a></li>
                            <li><a href="mailto:info@canvas.com" class="h-bg-email3"><span class="ts-icon"><i
                                            class="bi-envelope-fill"></i></span><span
                                        class="ts-text">info@canvas.com</span></a></li>
                        </ul><!-- #top-social end -->

                    </div>
                </div>

            </div>
        </div><!-- #top-bar end -->
        <!-- Header
============================================= -->
        <header id="header" class="transparent-header floating-header header-size-md">
            <div id="header-wrap">
                <div class="container">
                    <div class="header-row">

                        <!-- Logo
                ============================================= -->
                        <div id="logo">
                            <a href="index.html">
                                <img class="logo-default"
                                    src="/front/images/logo@2x.png" alt="Canvas Logo">
                                <img class="logo-dark"
                                    src="/front/images/logo-dark@2x.png" alt="Canvas Logo">
                            </a>
                        </div><!-- #logo end -->

                        <div class="header-misc">

                            <!-- Top Search
                    ============================================= -->
                            <div id="top-search" class="header-misc-icon">
                                <a href="#" id="top-search-trigger"><i class="uil uil-search"></i><i
                                        class="bi-x-lg"></i></a>
                            </div><!-- #top-search end -->

                            <a href="demo-seo-about.html" class="button button-rounded ms-3 d-none d-sm-block">Get
                                Started</a>

                        </div>

                        <div class="primary-menu-trigger">
                            <button class="cnvs-hamburger" type="button" title="Open Mobile Menu">
                                <span class="cnvs-hamburger-box"><span class="cnvs-hamburger-inner"></span></span>
                            </button>
                        </div>

                        <!-- Primary Navigation
                ============================================= -->
                        <nav class="primary-menu with-arrows">

                            <ul class="menu-container">
                                <li class="menu-item current"><a class="menu-link" href="demo-seo.html">
                                        <div>Home</div>
                                    </a></li>
                                <li class="menu-item"><a class="menu-link" href="demo-seo-about.html">
                                        <div>What We Do</div>
                                    </a></li>
                                <li class="menu-item mega-menu"><a class="menu-link" href="#">
                                        <div>Services</div>
                                    </a>
                                    <div class="mega-menu-content mega-menu-style-2 px-0">
                                        <div class="container">
                                            <div class="row">
                                                <a href="demo-seo-optimizations.html"
                                                    class="mega-menu-column sub-menu-container col-lg-4 border-bottom h-bg-light py-4">
                                                    <div class="feature-box">
                                                        <div class="fbox-icon mb-2">
                                                            <img src="/front/demos/seo/images/icons/seo.svg" alt="Feature Icon"
                                                                class="bg-transparent rounded-0">
                                                        </div>
                                                        <div class="fbox-content">
                                                            <h3 class="text-transform-none ls-0">Seo Optimization</h3>
                                                            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                                                                Commodi, ipsa!</p>
                                                        </div>
                                                    </div>
                                                </a>
                                                <a href="demo-seo-social.html"
                                                    class="mega-menu-column sub-menu-container col-lg-4 border-bottom h-bg-light py-4">
                                                    <div class="feature-box">
                                                        <div class="fbox-icon mb-2">
                                                            <img src="/front/demos/seo/images/icons/social.svg" alt="Feature Icon"
                                                                class="bg-transparent rounded-0">
                                                        </div>
                                                        <div class="fbox-content">
                                                            <h3 class="text-transform-none ls-0">Social Media Marketing</h3>
                                                            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                                                                Commodi, ipsa!</p>
                                                        </div>
                                                    </div>
                                                </a>
                                                <a href="demo-seo-adwords.html"
                                                    class="mega-menu-column sub-menu-container col-lg-4 border-bottom h-bg-light py-4">
                                                    <div class="feature-box">
                                                        <div class="fbox-icon mb-2">
                                                            <img src="/front/demos/seo/images/icons/adword.svg" alt="Feature Icon"
                                                                class="bg-transparent rounded-0">
                                                        </div>
                                                        <div class="fbox-content">
                                                            <h3 class="text-transform-none ls-0">Adwords Campaign</h3>
                                                            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                                                                Commodi, ipsa!</p>
                                                        </div>
                                                    </div>
                                                </a>
                                                <a href="demo-seo-experience.html"
                                                    class="mega-menu-column sub-menu-container col-lg-4 border-bottom h-bg-light py-4">
                                                    <div class="feature-box">
                                                        <div class="fbox-icon mb-2">
                                                            <img src="/front/demos/seo/images/icons/experience.svg"
                                                                alt="Feature Icon" class="bg-transparent rounded-0">
                                                        </div>
                                                        <div class="fbox-content">
                                                            <h3 class="text-transform-none ls-0">Customer Experience</h3>
                                                            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                                                                Commodi, ipsa!</p>
                                                        </div>
                                                    </div>
                                                </a>
                                                <a href="demo-seo-analysis.html"
                                                    class="mega-menu-column sub-menu-container col-lg-4 border-bottom h-bg-light py-4">
                                                    <div class="feature-box">
                                                        <div class="fbox-icon mb-2">
                                                            <img src="/front/demos/seo/images/icons/analysis.svg"
                                                                alt="Feature Icon" class="bg-transparent rounded-0">
                                                        </div>
                                                        <div class="fbox-content">
                                                            <h3 class="text-transform-none ls-0">Digital Analysis</h3>
                                                            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                                                                Commodi, ipsa!</p>
                                                        </div>
                                                    </div>
                                                </a>
                                                <a href="demo-seo-content-marketing.html"
                                                    class="mega-menu-column sub-menu-container col-lg-4 border-bottom h-bg-light py-4">
                                                    <div class="feature-box">
                                                        <div class="fbox-icon mb-2">
                                                            <img src="/front/demos/seo/images/icons/content_marketing.svg"
                                                                alt="Feature Icon" class="bg-transparent rounded-0">
                                                        </div>
                                                        <div class="fbox-content">
                                                            <h3 class="text-transform-none ls-0">Content Marketing</h3>
                                                            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                                                                Commodi, ipsa!</p>
                                                        </div>
                                                    </div>
                                                </a>
                                                <div class="mega-menu-column sub-menu-container col-12 p-0">
                                                    <a href="demo-seo-about.html"
                                                        class="button button-rounded button-large text-transform-none ls-0 w-100 text-center m-0 rounded-0 py-3 button-light ">View
                                                        All <i class="bi-arrow-right"></i></a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </li>
                                <li class="menu-item"><a class="menu-link" href="demo-seo-faqs.html">
                                        <div>FAQs</div>
                                    </a></li>
                                <li class="menu-item"><a class="menu-link" href="demo-seo-contact.html">
                                        <div>Contact</div>
                                    </a></li>
                            </ul>

                        </nav><!-- #primary-menu end -->

                        <form class="top-search-form" action="search.html" method="get">
                            <input type="text" name="q" class="form-control" value="" placeholder="Type &amp; Hit Enter.."
                                autocomplete="off">
                        </form>

                    </div>
                </div>
            </div>
            <div class="header-wrap-clone"></div>
        </header><!-- #header end -->
        <slot/>

        <!-- Footer
============================================= -->
        <footer id="footer" class="border-0" style="background: var(--cnvs-contrast-0);">
            <div class="container">
                <!-- Footer Widgets
        ============================================= -->
                <div class="footer-widgets-wrap pb-5">

                    <div class="row col-mb-50">
                        <div class="col-md-8">

                            <div class="widget">

                                <img src="/front/images/footer-widget-logo.png" alt="Footer Logo" class="alignleft"
                                    style="margin-top: 8px; padding-right: 18px; border-right: 1px solid #DDD;">

                                <p>We believe in <strong>Simple</strong>, <strong>Creative</strong> &amp;
                                    <strong>Flexible</strong> Design Standards with a Retina &amp; Responsive Approach.
                                    Browse the amazing Features this template offers.</p>

                                <div class="line line-sm"></div>

                                <div class="row g-4">
                                    <div class="col-lg-3 col-6 widget_links">
                                        <ul>
                                            <li><a href="#">Home</a></li>
                                            <li><a href="#">About</a></li>
                                            <li><a href="#">FAQs</a></li>
                                            <li><a href="#">Support</a></li>
                                            <li><a href="#">Contact</a></li>
                                        </ul>
                                    </div>

                                    <div class="col-lg-3 col-6 widget_links">
                                        <ul>
                                            <li><a href="#">Shop</a></li>
                                            <li><a href="#">Portfolio</a></li>
                                            <li><a href="#">Blog</a></li>
                                            <li><a href="#">Events</a></li>
                                            <li><a href="#">Forums</a></li>
                                        </ul>
                                    </div>

                                    <div class="col-lg-3 col-6 widget_links">
                                        <ul>
                                            <li><a href="#">Corporate</a></li>
                                            <li><a href="#">Agency</a></li>
                                            <li><a href="#">eCommerce</a></li>
                                            <li><a href="#">Personal</a></li>
                                            <li><a href="#">One Page</a></li>
                                        </ul>
                                    </div>

                                    <div class="col-lg-3 col-6 widget_links">
                                        <ul>
                                            <li><a href="#">Restaurant</a></li>
                                            <li><a href="#">Wedding</a></li>
                                            <li><a href="#">App Showcase</a></li>
                                            <li><a href="#">Magazine</a></li>
                                            <li><a href="#">Landing Page</a></li>
                                        </ul>
                                    </div>
                                </div>

                            </div>

                        </div>

                        <div class="col-md-4">
                            <div class="widget">

                                <div class="row">
                                    <div class="col-12">
                                        <div class="feature-box fbox-plain fbox-sm align-items-center">
                                            <div class="fbox-icon">
                                                <i class="bi-envelope text-dark"></i>
                                            </div>
                                            <div class="fbox-content">
                                                <span class="text-muted">Call Us:</span><br>
                                                <h3 class="text-transform-none ls-0 fw-semibold">(10) 22 33445566</h3>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="col-12 mt-4">
                                        <div class="feature-box fbox-plain fbox-sm align-items-center">
                                            <div class="fbox-icon">
                                                <i class="bi-telephone text-dark"></i>
                                            </div>
                                            <div class="fbox-content">
                                                <span class="text-muted">Email Us:</span><br>
                                                <h3 class="text-transform-none ls-0 fw-semibold">info@canvas.com</h3>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </div>

                            <div class="widget subscribe-widget">
                                <h5><strong>Subscribe</strong> to Our Newsletter to get Important News, Amazing Offers &amp;
                                    Inside Scoops:</h5>
                                <div class="widget-subscribe-form-result"></div>
                                <form id="widget-subscribe-form" action="include/subscribe.php" method="post" class="mb-0">
                                    <div class="input-group mx-auto">
                                        <div class="input-group-text bg-transparent"><i class="bi-send"></i></div>
                                        <input type="email" id="widget-subscribe-form-email"
                                            name="widget-subscribe-form-email" class="form-control required email"
                                            placeholder="Enter your Email">
                                        <button class="btn btn-success button button-color text-transform-none ls-0 m-0"
                                            type="submit">Subscribe</button>
                                    </div>
                                </form>
                            </div>

                            <div class="widget">

                            <div class="row col-mb-30">
                                <div class="col-lg-6 col-md-12 col-6">
                                    <div class="d-flex align-items-center">
                                        <a href="https://facebook.com/semicolonweb" target="_blank"
                                            class="social-icon bg-dark h-bg-facebook mb-0 me-2">
                                            <i class="fa-brands fa-facebook-f"></i>
                                            <i class="fa-brands fa-facebook-f"></i>
                                        </a>
                                        <a href="https://facebook.com/semicolonweb" target="_blank"
                                            class="text-dark"><small><strong class="d-block">Like us</strong>on
                                                Facebook</small></a>
                                    </div>
                                </div>
                                <div class="col-lg-6 col-md-12 col-6">
                                    <div class="d-flex align-items-center">
                                        <a href="https://themeforest.net/user/SemiColonWeb/follow" target="_blank"
                                            class="social-icon bg-dark h-bg-rss mb-0 me-2">
                                            <i class="fa-solid fa-rss"></i>
                                            <i class="fa-solid fa-rss"></i>
                                        </a>
                                        <a href="https://themeforest.net/user/SemiColonWeb/follow" target="_blank"
                                            class="text-dark"><small><strong class="d-block">Subscribe</strong>to RSS
                                                Feeds</small></a>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>

            </div><!-- .footer-widgets-wrap end -->
        </div>

        <!-- Copyrights
    ============================================= -->
        <div id="copyrights"
            style="background: url('/front/demos/seo/images/hero/footer.svg') no-repeat top center; background-size: cover; padding-top: 70px;">
            <div class="container">

                <div class="row justify-content-between col-mb-30"> 
                    <div class="col-12 col-lg-auto text-center text-lg-start">
                        Copyrights &copy; 2023 All Rights Reserved by Canvas Inc.<br>
                        <div class="copyright-links"><a href="#" class="text-contrast-600">Terms of Use</a> / <a
                                href="#" class="text-contrast-600">Privacy Policy</a></div>
                    </div>

                    <div class="col-12 col-lg-auto text-center text-lg-end">
                        <div class="copyrights-menu copyright-links">
                            <a href="#" class="text-contrast-600">Home</a>/<a href="#" class="text-contrast-600">About
                                Us</a>/<a href="#" class="text-contrast-600">Team</a>/<a href="#"
                                class="text-contrast-600">Clients</a>/<a href="#" class="text-contrast-600">FAQs</a>/<a
                                href="#" class="text-contrast-600">Contact</a>
                        </div>
                    </div>
                </div>

            </div>
        </div><!-- #copyrights end -->
    </footer><!-- #footer end -->

</div><!-- #wrapper end -->

<!-- Go To Top
============================================= -->
<div id="gotoTop" class="uil uil-angle-up"></div></template>