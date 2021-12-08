<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Форма загрузки файла</title>
    <link rel="stylesheet" href="styles/uploadFormStyle.css">
</head>
<body>
    <div class="container">
        <form method="post" id="upload" enctype="multipart/form-data">
            <input type="file" id="file-button" name="file">
            <input type="submit" id="confirm-button" value="Подтвердить">
            <?php
                function getExtension($file) : string {
                    $parts = explode('.', $file['name']);
                    return strtolower(end($parts));
                }
                function fileIsCorrect($file) : bool {
                    if($file['name'] === '')
                        die("Файл не выбран");
                    if($file['size'] === 0)
                        die("Файл невозможно загрузить");
                    $extension = getExtension($file);
                    if($extension === '')
                        die("Файлы без расширения загружать нельзя");
                    return true;
                }
                function uploadFile($file) : string {
                    $directory = 'uploads/';
                    $newName = sha1($file['name']);
                    $extension = getExtension($file);
                    copy($file['tmp_name'], $directory.$newName.".".$extension);
                    return $newName.".".$extension;
                }
                if(isset($_FILES['file'])) {
                    $file = $_FILES['file'];
                    if(fileIsCorrect($file)) {
                        $oldName = $file['name'];
                        $newName = uploadFile($file);
                        echo "<div id=\"result-area\">
                                <div class=\"info-record\">
                                    <span>Был загружен файл: </span>
                                    <span class='value'>$oldName</span>
                                </div>
                                <div class=\"info-record\">
                                    <span>Под именем: </span>
                                    <span class='value'>$newName</span>
                                </div>
                              </div>";
                        $_FILES['file'] = null;
                    }
                }
            ?>
        </form>
    </div>

</body>
</html>