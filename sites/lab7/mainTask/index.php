<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>PHP tasks</title>
    <link rel="stylesheet" href="styles/mainPageStyle.css">
</head>
<body>
    <form id="task1" method="post">
        <h1>Задание 1</h1>
        <input type="number" size="2" maxlength="10" name="value" placeholder="Введите число для возведения...">
        <input type="number" size="2" maxlength="10" name="power" placeholder="Введите степень...">
        <button type="submit" name="calculate">Посчитать</button>
        <?php
        function power($val, $power) {
            if ($power == 0) {
                return 1;
            }
            return $power == 1 ? $val : $val * power($val, $power - 1);
        }
        if (isset($_POST['calculate']) && is_numeric($_POST['value']) && is_numeric( $_POST['power'])) {
            $value = $_POST['value'];
            $power = $_POST['power'];
            echo "<br>Результат: ".power($value, $power);
        }
        ?>
    </form>
    <section id="task2">
        <h1>Задание 2</h1>
        <?php
            $hoursVariants = ["час", "часов", "часа"];
            $minutesVariants = ["минута", "минут", "минуты"];
            $now = getdate();
            $hours = $now["hours"];
            $minutes = $now["minutes"];
            function getVariantIndex ($param): int
            {
                if ($param > 10 && $param < 20)
                    return 1;
                $param %= 10;
                return match ($param) {
                    1 => 0,
                    2, 3, 4 => 2,
                    default => 1,
                };
            }
            $hourIndex = getVariantIndex($hours);
            $minuteIndex = getVariantIndex($minutes);
            echo "Сейчас ".$hours." ".$hoursVariants[$hourIndex]." ".$minutes." ".$minutesVariants[$minuteIndex];
        ?>
    </section>
    <section id="task3">
        <h1>Задание 3</h1>
        <span>Результат:</span>
        <ul id="results">
            <?php
                $i = 0;
                while ($i <= 100) {
                    if ($i % 3 === 0) {
                        echo "<li>$i</li>";
                    }
                    $i++;
                }
            ?>
        </ul>
    </section>
    <section id="task4">
        <h1>Задание 4</h1>
        <ul>
            <?php
            $i = 0;
            do {
                if ($i === 0) {
                    echo "<li>".$i." - это ноль </li>";
                }
                elseif ($i % 2 === 1) {
                    echo "<li>".$i." - это нечетное число </li>";
                }
                else {
                    echo "<li>".$i." - это четное число </li>";
                }
                $i++;
            }
            while ($i <= 10)
            ?>
        </ul>
    </section>
    <section id="task5">
        <h1>Задание 5</h1>
        <?php
            for ($i = 0; print $i." ", ++$i <= 9;) {
                // здесь пусто
            }
        ?>
    </section>
    <section id="task6">
        <h1>Задание 6</h1>
        <?php
            $regions = array(
                    "Московская область" => array("Москва", "Зеленоград", "Клин"),
                    "Ленинградская область" => array("Санкт-Петербург", "Всеволожск", "Павловск", "Кронштадт"),
                    "Рязанская область" => array("Рязань", "Спасск-Рязанский", "Рыбное"),
                    "Донецкая область" => array("Харцызск", "Донецк", "Макеевка", "Шахтерск", "Зугрэс", "Енакиево", "Зуевка")
            );
            foreach ($regions as $region => $cities) {
                echo "<h2>$region:</h2>";
                echo "<ul>";
                foreach ($cities as $city) {
                    echo "<li>$city</li>";
                }
                echo "</ul>";
            }
        ?>
    </section>
    <section id="task7">
        <h1>Задание 7</h1>
        <?php
        $regions = array(
            "Московская область" => array("Москва", "Зеленоград", "Клин"),
            "Ленинградская область" => array("Санкт-Петербург", "Всеволожск", "Павловск", "Кронштадт"),
            "Рязанская область" => array("Рязань", "Спасск-Рязанский", "Рыбное"),
            "Донецкая область" => array("Харцызск", "Донецк", "Макеевка", "Шахтерск", "Зугрэс", "Енакиево", "Зуевка")
        );
        $filtered = array_filter($regions, "hasFittedElements");
        foreach ($filtered as $region => $cities) {
            echo "<h2>$region:</h2>";
            echo "<ul>";
            foreach ($cities as $city) {
                if (mb_substr($city, 0, 1) === 'К')
                    echo "<li>$city</li>";
            }
            echo "</ul>";
        }
        function hasFittedElements($region): bool
        {
            foreach ($region as $city) {
                if (mb_substr($city, 0, 1) === 'К')
                    return true;
            }
            return false;
        }
        ?>
    </section>
    <section id="task8">
        <h1>Задание 8</h1>
        <form method="post">
            <input type="text" placeholder="Введите текст на русском языке..." name="input">
            <button type="submit" name="transliterate">Транслитерировать</button>
        </form>
        <?php
        function transliterate($line) : string {
            $letters = ['а' => 'a', 'б' => 'b', 'в' => 'v',
                'г' => 'g', 'д' => 'd', 'е' => 'e',
                'ё' => 'e', 'ж' => 'zh', 'з' => 'z',
                'и' => 'i', 'й' => 'y', 'к' => 'k',
                'л' => 'l', 'м' => 'm', 'н' => 'n',
                'о' => 'o', 'п' => 'p', 'р' => 'r', 'с' => 's',
                'т' => 't', 'у' => 'u', 'ф' => 'f', 'х' => 'h',
                'ц' => 'tc', 'ч' => 'ch', 'ш' => 'sh',
                'щ' => 'sch', 'ъ' => '\'', 'ы' => 'i', 'ь' => '\'',
                'э' => 'e', 'ю' => 'yu', 'я' => 'ya',
                'А' => 'A',   'Б' => 'B',   'В' => 'V',
                'Г' => 'G',   'Д' => 'D',   'Е' => 'E',
                'Ё' => 'E',   'Ж' => 'Zh',  'З' => 'Z',
                'И' => 'I',   'Й' => 'Y',   'К' => 'K',
                'Л' => 'L',   'М' => 'M',   'Н' => 'N',
                'О' => 'O',   'П' => 'P',   'Р' => 'R',
                'С' => 'S',   'Т' => 'T',   'У' => 'U',
                'Ф' => 'F',   'Х' => 'H',   'Ц' => 'C',
                'Ч' => 'Ch',  'Ш' => 'Sh',  'Щ' => 'Sch',
                'Ь' => '\'',  'Ы' => 'Y',   'Ъ' => '\'',
                'Э' => 'E',   'Ю' => 'Yu',  'Я' => 'Ya',];
            return strtr($line, $letters);
        }
        if (isset($_POST["transliterate"]) && strlen($_POST["input"]) > 0) {
            $inputLine = $_POST["input"];
            $inputLine = transliterate($inputLine);
            echo "<b>Результат:</b> $inputLine";
        }
        ?>
    </section>
    <section id="task9">
        <h1>Задание 9</h1>
        <form method="post">
            <input type="text" placeholder="Введите текст на русском языке..." name="newInput">
            <button type="submit" name="transliterateBetter">Транслитерировать</button>
        </form>
        <?php
        if (isset($_POST["transliterateBetter"]) && strlen($_POST["newInput"]) > 0) {
            $inputLine = $_POST["newInput"];
            $inputLine = transliterate($inputLine);
            $inputLine = str_replace(' ', '_', $inputLine);
            echo "<b>Результат:</b> $inputLine";
        }
        ?>
    </section>
    <section id="otherTasks">
        <h1>Задания 10 и 11</h1>
        <div id="menu">
            <ul>
                <li class="menu-item">
                    <a href="calculator.php">Калькулятор</a>
                </li>
                <li class="menu-item">
                    <a href="uploadForm.php">Форма загрузки файлов на сервер</a>
                </li>
                <li class="menu-item">
                    <a href="../extraTask/index.php">Галерея изображений</a>
                </li>
            </ul>
        </div>
    </section>
</body>
</html>