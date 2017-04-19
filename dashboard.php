<?php
// outputs the username that owns the running php/httpd process
// (on a system with the "whoami" executable in the path)

$output = shell_exec('ps axuw | grep stanford');
if(contains("java -mx4g -cp * edu.stanford.nlp.pipeline.StanfordCoreNLPServer", $output)){
	echo "Stanford CoreNLP library is active";
}else{
	echo "Stanford CoreNLP library is NOT active";
}

echo "<br>";

$output = shell_exec('ps axuw | grep server.js');
if(contains("nodejs server.js", $output)){
	echo "BrainTag Server is active";
}else{
	echo "BrainTag Server is NOT active";
}


echo "<br>";

$myFile = "nohup.out";
$fh = fopen($myFile, 'r');
$theData = fread($fh, 1);
fclose($fh);
echo "Data : ".$theData;

function contains($needle, $haystack){
    return strpos($haystack, $needle) !== false;
}

?>