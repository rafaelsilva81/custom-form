<?php
/**
 * Plugin Name: Formularios Fred Pinho
 * Description: Plugin para os formulários personalizados
 * Author: Rafael Galdino da Silva
 * Version: 4.3.0
 **/

function loadResources() {

    /* SCRIPTS */
    wp_enqueue_script('analytics_script', 'https://www.googletagmanager.com/gtag/js?id=G-XSSQFX7YB1');
    wp_enqueue_script('bootstrap_script', 'https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js');
    wp_enqueue_script('firebase_app_script', 'https://www.gstatic.com/firebasejs/8.10.1/firebase-app.js');
    wp_enqueue_script('firebase_firestore_script', 'https://www.gstatic.com/firebasejs/8.10.1/firebase-firestore.js');
    wp_enqueue_script('jspdf_script', 'https://unpkg.com/jspdf@latest/dist/jspdf.umd.min.js');
    //wp_enqueue_script('app_check_script', 'https://www.gstatic.com/firebasejs/8.10.1/firebase-app-check.js');
    //wp_enqueue_script('jquery', 'https://ajax.googleapis.com/ajax/libs/jquery/3.1.1/jquery.min.js');

    /* CUSTOM SCRIPT */
    wp_enqueue_script('forms_script', plugins_url('/scripts/form.js', __FILE__), array( 'jquery' ), '4.3.0', true);
    $translation_array = array( 'templateUrl' =>  plugin_dir_url(__FILE__) ); //after wp_enqueue_script
    wp_localize_script( 'forms_script', 'jsVars', $translation_array );

    /* STYLES */
    wp_enqueue_style('form_style', plugins_url('/styles/style.css', __FILE__), false, '4.3.0', 'all');
    wp_enqueue_style( 'bootstrap_css', 'https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css' );
    
}
add_action('wp_enqueue_scripts', 'loadResources');


function footerScripts() {
   echo "<script type='text/javascript'>
    /* function salvarResultados() {
        //modal = jQuery('#resultsModal')[0];

        html2canvas(jQuery('#resultsModal')[0]).then(function(canvas) {
            var a = document.createElement('a');
            a.href = canvas.toDataURL('image/png').replace('image/png', 'image/octet-stream');
            a.download = 'resultados.png';
            a.click();
            //location.reload();
        });
    } */

    window.dataLayer = window.dataLayer || [];

    function gtag() {
        dataLayer.push(arguments);
    }
    gtag('js', new Date());

    gtag('config', 'G-XSSQFX7YB1');

   </script>";
}
add_action('wp_footer', 'footerScripts', 200);


function generate_form($atts = []) {
    $atts = shortcode_atts(
        array(
            'id' => 1,
    ), $atts, 'form_generate');
    $id = $atts['id'];
    $q = file_get_contents(plugins_url('/templates/questions/'.$id.'.html',__FILE__ ));
    $loadingModal = file_get_contents(plugins_url('/templates/modals/loading.html',__FILE__ ));
    $content = '
<div class="container-fluid">
    <span id="req">*Obrigatório</span>
    <input type="hidden" id="formName" name="formName" value="'.$id.'" />
    <form id="customForm" method="POST">

        <div class="container-fluid">
            <div id="perguntas">'.$q.'</div>
        </div>

        <div id="result"> </div>

        <input id="submitButton" type="submit" value="Enviar" />
        <div id="modals">
        ' .$loadingModal. '
        </div>
    </form>
</div>';

    return $content;
}
add_shortcode('new_form', 'generate_form');