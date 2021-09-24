<?php
$name = $_POST['name'];
$surname = $_POST['surname'];
$address = $_POST['email-address'];
$domain = $_POST['email-domain'];
$message = $_POST['message'];

$name = htmlspecialchars($name);
$surname = htmlspecialchars($surname);
$address = htmlspecialchars($address);
$domain = htmlspecialchars($domain);
$message = htmlspecialchars($message);

$name = urldecode($name);
$surname = urldecode($surname);
$address = urldecode($address);
$domain = urldecode($domain);
$message = urldecode($message);

$name = trim($name);
$surname = trim($surname);
$address = trim($address);
$domain = trim($domain);
$message = trim($message);

$full_address = $address . $domain;
$full_name = $name . $surname;

if (mail("eliseevv02@mail.ru", "Заявка с сайта", "ФИО:".$full_name.". E-mail: ".$full_address." Сообщение: ".$message ,"From: info@satename.ru \r\n"))
{
    echo "Сообщение успешно отправлено";
}
else
{
    echo "При отправке сообщения возникли ошибки";
}