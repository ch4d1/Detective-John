<?php
//mcfit api: https://www.mcfit.com/de/auslastung/antwort/request.json?tx_brastudioprofilesmcfitcom_brastudioprofiles[studioId]=
//johnreed api: https://typo3.johnreed.fitness/studiocapacity.json?studioId=
header('Content-Type: application/json');
if(!empty($_GET)){

    foreach($_GET as $key => $value){
        switch ($key){
            case "s":
                sleep(10);
                break;
            case "f":
                switch($value){
                    case "john":
                        $url = "https://www.mcfit.com/de/auslastung/antwort/request.json?tx_brastudioprofilesmcfitcom_brastudioprofiles[studioId]=1613587690";
                        break;
                    case "mcfit":
                        $url = "https://www.mcfit.com/de/auslastung/antwort/request.json?tx_brastudioprofilesmcfitcom_brastudioprofiles[studioId]=1632519320";
                        break;
                }
                break;
        }
    }
}

//Initiate curl
$ch = curl_init();
//Set the url
curl_setopt($ch, CURLOPT_URL,$url);
//Execute
curl_exec($ch);
//Closing
curl_close($ch);