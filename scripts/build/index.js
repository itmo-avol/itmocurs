define(["require", "exports", "./CanvasImageConstructor"], function (require, exports, CanvasImageConstructor_1) {
    "use strict";
    /**коэффициент перехода*/
    var koefBG = 3, koefBR = 3, koefGR = 2, koefR = 245;
    //Кнопка загрузки
    var butLoad = document.getElementById('load');
    /**
     * действия при клике на кнопку
     */
    butLoad.onclick = function (event) {
        var image = new CanvasImageConstructor_1.default(document.getElementById('basic'), '../TempMap/image/imgColor.jpg');
        //Кнопка перевода картинки в чёрно-белый вариант
        var butGS = document.getElementById('grayscale');
        //Кнопка подгрузки картинки фотошопа
        var butCmp = document.getElementById('compare');
        //Кнопка пересоздания и создания температурной карты
        var butTM = document.getElementById('tempMap');
        //действия при клике на кнопку
        butGS.onclick = function (event) {
            image.grayscale();
        };
        //действия при клике на кнопку
        butCmp.onclick = function (event) {
            //добавляем картинку для сравнения (тоже можно запрашивать)
            var img = new CanvasImageConstructor_1.default(document.getElementById('addImg'), '../TempMap/image/imgWB.jpg');
            //действия при клике на кнопку
            butTM.onclick = function (event) {
                //добавляем картинку для сравнения (тоже можно запрашивать)
                var result = new Image();
                /**value считываемое с ползунка 1*/
                var kbg = document.getElementById("koef1");
                /**value считываемое с ползунка 2*/
                var kbr = document.getElementById("koef2");
                /**value считываемое с ползунка 3*/
                var kgr = document.getElementById("koef3");
                /**value считываемое с ползунка 4*/
                var kr = document.getElementById("koef4");
                image.temperatureMap(result, img, parseInt(kbg.value), parseInt(kbr.value), parseInt(kgr.value), parseInt(kr.value));
            };
        };
    };
});
//# sourceMappingURL=index.js.map