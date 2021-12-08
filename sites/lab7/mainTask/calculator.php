<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <link rel="stylesheet" href="styles/calculatorStyle.css">
    <title>Калькулятор</title>
</head>
<body>
    <h1>Задание 10</h1>
    <form method="post">
        <div class="hintedBlock">
            <span>Введите первый операнд</span>
            <input type="number" placeholder="Число 1..." minlength="1" name="first-operand" step="any" required>
        </div>
        <div class="hintedBlock">
            <span>Выберите операцию</span>
            <div id="buttons-area">
                <input type="submit" name="operation" value="+" class="operation-button">
                <input type="submit" name="operation" value="*" class="operation-button">
                <input type="submit" name="operation" value="-" class="operation-button">
                <input type="submit" name="operation" value="/" class="operation-button">
            </div>
        </div>
        <div class="hintedBlock">
            <span>Введите второй операнд</span>
            <input type="number" placeholder="Число 2..." minlength="1" name="second-operand" step="any" required>
        </div>
    </form>
    <?php
    function calculate($firstOperand, $secondOperand, $operation) {
        switch ($operation) {
            case "+":
                return $firstOperand + $secondOperand;
            case "-":
                return $firstOperand - $secondOperand;
            case "*":
                return $firstOperand * $secondOperand;
            case "/":
                return $firstOperand / $secondOperand;
            default:
                die('Произошла ошибка!');
        }
    }
    if(isset($_POST['operation'])) {
        $operation = $_POST['operation'];
        $firstOperand = (double)$_POST['first-operand'];
        $secondOperand = (double)$_POST['second-operand'];
        $result = calculate($firstOperand, $secondOperand, $operation);
        echo "<div id=\"result-area\">
                <span class=\"operand\">$firstOperand</span>
                <span id=\"operation\">$operation</span>
                <span class=\"operand\">$secondOperand</span>
                <span>=</span>
                <span id=\"result\">$result</span>
              </div>";
    }
    ?>
</body>
</html>