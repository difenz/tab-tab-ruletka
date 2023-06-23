<?php

/*$data = file_get_contents('php://input');
$data = json_decode($data, true);

if (empty($data['name'])) {
    exit;
}*/

$data['name'] = 'Testing';

require(__DIR__ . '/vendor/autoload.php');

/**
* 
* Путь к файлу ключа сервисного аккаунта
* 
* @link https://console.developers.google.com/apis/credentials
* 
*/
$googleAccountKeyFilePath = __DIR__ . '/credentials/fixed-roulette-df478cf7df32.json';
putenv('GOOGLE_APPLICATION_CREDENTIALS=' . $googleAccountKeyFilePath);

$spreadsheetId = '1I0XwMMljnjiG4GUsZ4MizK71DYkhff5SiE2M18VmOKY';

/**
* 
* @link https://developers.google.com/sheets/api/
* 
*/
$client = new Google\Client();
$client->useApplicationDefaultCredentials();
$client->setScopes([Google\Service\Sheets::SPREADSHEETS]);

$service = new Google\Service\Sheets($client);

// Append data
$requestBody = new Google\Service\Sheets\ValueRange([
    'values' => [
        [$data['name']]
    ]
]);
$requestOptions = [
    'valueInputOption' => 'RAW'
];

$response = $service->spreadsheets_values->append($spreadsheetId, 'A:A', $requestBody, $requestOptions);
var_dump($response);
