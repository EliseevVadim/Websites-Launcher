<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Галерея изображений</title>
    <link rel="stylesheet" href="mainPageStyle.css">
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
            $allowedExtensions = ["jpg", "png", "webp", "jpeg", "gif", "bmp"];
            if($file['name'] === '') {
                echo("Файл не выбран");
                return false;
            }
            if($file['size'] === 0) {
                echo("Файл невозможно загрузить");
                return false;
            }
            $extension = getExtension($file);
            if(!in_array($extension, $allowedExtensions)) {
                echo("Загружаемый файл не является изображением");
                return false;
            }
            return true;
        }
        function resize($file, $name, $requiredHeight)
        {
            $previewsDirectory = "previews/";
            $sourceImage = match ($file['type']) {
                'image/jpeg' => imagecreatefromjpeg($file['tmp_name']),
                'image/gif' => imagecreatefromgif($file['tmp_name']),
                'image/png' => imagecreatefrompng($file['tmp_name']),
                'image/webp' => imagecreatefromwebp($file['tmp_name']),
                'image/bmp' => imagecreatefrombmp($file['tmp_name']),
            };
            $sourceWidth = imagesx($sourceImage);
            $sourceHeight = imagesy($sourceImage);
            $scaleCoefficient = $requiredHeight / $sourceHeight;
            $newWidth = round($sourceWidth * $scaleCoefficient);
            $newHeight = round($sourceHeight * $scaleCoefficient);
            $resultImage = imagecreatetruecolor($newWidth, $newHeight);
            imagecopyresampled($resultImage, $sourceImage, 0, 0, 0, 0, $newWidth, $newHeight, $sourceWidth, $sourceHeight);
            imagejpeg($resultImage, $previewsDirectory.$name, 100);
        }
        function uploadFile($file) : string {
            $directory = 'images/';
            $newName = sha1($file['name']);
            $extension = getExtension($file);
            copy($file['tmp_name'], $directory.$newName.".".$extension);
            resize($file, $newName.".".$extension, 150);
            return $newName.".".$extension;
        }

        if (isset($_FILES['file'])) {
            $file = $_FILES['file'];
            if (fileIsCorrect($file)) {
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
    <div class="gallery">
        <h1>
            Загруженные изображения
        </h1>
        <div class="images-area">
            <?php
            function sortFiles($directory): array|bool
            {
                $files = array();
                foreach (array_diff(scandir($directory), ['..', '.']) as $file) {
                    $files[$file] = filemtime($directory.'/'.$file);
                }
                arsort($files);
                $files = array_keys($files);
                if (is_null($files))
                    return false;
                return $files;
            }
            $initialDirectory = "images/";
            $previewsDirectory = "previews/";
            $images = array_diff(scandir($initialDirectory), ['..', '.']);
            try {
                $images = sortFiles($initialDirectory);
                foreach ($images as $image) {
                    $name = $previewsDirectory.$image;
                    echo "<img src=$name alt='#'>";
                }
            }
            catch (TypeError) {

            }
            ?>
        </div>
    </div>
    <script src="mainScript.js"></script>
</body>
</html>