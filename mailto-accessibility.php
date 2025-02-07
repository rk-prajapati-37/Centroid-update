<?php
// Configuration
$siteurl = 'http://' . $_SERVER['HTTP_HOST'] . dirname(str_replace(array('\'', '"', 'blog'), '', $_SERVER["PHP_SELF"])) . '/';
define('SITE_PATH', $siteurl);

// reCAPTCHA configuration
const RECAPTCHA_SECRET = "6LdDDs4qAAAAAC5HfEQ0HWwxmotYlwwwkmWY_N7X";
const MAILER_API_URL = 'https://centroid-mailer.vercel.app/api/centroid/contact';

function verifyRecaptcha($response, $remoteIp) {
    $ch = curl_init();
    curl_setopt_array($ch, [
        CURLOPT_URL => 'https://www.google.com/recaptcha/api/siteverify',
        CURLOPT_POST => true,
        CURLOPT_POSTFIELDS => [
            'secret'   => RECAPTCHA_SECRET,
            'response' => $response,
            'remoteip' => $remoteIp
        ],
        CURLOPT_RETURNTRANSFER => true
    ]);
    
    $output = curl_exec($ch);
    $error = curl_error($ch);
    curl_close($ch);
    
    if ($error) {
        error_log("reCAPTCHA verification error: " . $error);
        return false;
    }
    
    return json_decode($output);
}

function sendEmailViaMailerApi($formData) {
    $ch = curl_init();
    curl_setopt_array($ch, [
        CURLOPT_URL => MAILER_API_URL,
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_POST => true,
        CURLOPT_POSTFIELDS => http_build_query($formData),
        CURLOPT_HTTPHEADER => ['Content-Type: application/x-www-form-urlencoded'],
        CURLOPT_TIMEOUT => 30
    ]);
    
    $response = curl_exec($ch);
    $error = curl_error($ch);
    $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    curl_close($ch);
    
 
    return $response;
}

// Main execution
try {
    // Validate reCAPTCHA
    if (!isset($_POST['g-recaptcha-response']) || empty($_POST['g-recaptcha-response'])) {
        throw new Exception("reCAPTCHA validation required");
    }
    
    // Verify reCAPTCHA
    $recaptchaResult = verifyRecaptcha($_POST['g-recaptcha-response'], $_SERVER['REMOTE_ADDR']);
    if (!$recaptchaResult || !$recaptchaResult->success) {
        throw new Exception("reCAPTCHA verification failed");
    }
    
    // Validate form data
    if (empty($_POST['frmname'])) {
        throw new Exception("Name is required");
    }
    
    // Prepare form data
    $formData = [
        'frmname'    => $_POST['frmname'],
        'frmmobile'  => $_POST['frmmobile'] ?? '',
        'frmcourse'  => $_POST['frmcourse'] ?? '',
        'frmcomment' => $_POST['frmcomment'] ?? '',
        'frmcheck'   => (isset($_POST['frmcheck']) && $_POST['frmcheck']) ? 'Yes' : 'No'
    ];
    
    // Send email
    $mailResult = sendEmailViaMailerApi($formData);
    if ($mailResult === false) {
        throw new Exception("Failed to send email");
    }
    
    $response = json_decode($mailResult);
    if (!$response || !isset($response->success) || !$response->success) {
        throw new Exception("Invalid response from mailer API");
    }
    
    // Success - redirect
    header("Location: index.html");
    exit;
    
} catch (Exception $e) {
    error_log("Form submission error: " . $e->getMessage());
 
    
	header("Location: index.html");
    exit;
}
?>