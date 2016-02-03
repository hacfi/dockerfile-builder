<?php

$url = 'https://index.docker.io/v1/search';

$q = filter_input(INPUT_GET, 'q');
$url .= '?q=' . $q;

$ch = curl_init($url);

if ($file = false) {
    $fp = fopen("request.log", "w");
    curl_setopt($ch, CURLOPT_FILE, $fp);
}
curl_setopt($ch, CURLOPT_HEADER, 0);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

$output = curl_exec($ch);
curl_close($ch);

$json = json_decode($output, true);

$images = is_array($json) && is_array($json['results'])
    ? array_map(
        function ($row) {
            return [
                'id' => $row['name'],
                'name' => $row['name'],
            ];
        },
        $json['results']
    )
    : [];


if (stripos($q, 'hac') !== false) {

    foreach (
        [
            'couchdb',
            'elasticsearch',
            'mysql',
            'nginx',
            'node',
            'php56',
            'php7',
            'postgres',
            'python',
            'rabbitmq',
            'redis',
            'supervisor',
        ]
        as $imageName
    ) {
        $fullName = 'hacfi/' . $imageName;
        if (stripos($fullName, $q) === false) {
            continue;
        }

        $images[] = [
            'id' => $fullName,
            'name' => $fullName,
        ];
    }
}

echo json_encode(['results' => $images, 'page' => 1], JSON_PRETTY_PRINT);


if ($file) {
    fwrite($fp, $url);
    fclose($fp);
}
