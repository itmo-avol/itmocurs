define(["require", "exports"], function (require, exports) {
    "use strict";
    /**Модуль с класса canimage
     * @module
     */
    var CanvasImage = (function () {
        /**
         * конструктор холста
         * @param canvas холст
         * @param src ссылка
         */
        function CanvasImage(canvas, src) {
            /**получить текущее */
            this.getData = function () {
                return this.context.getImageData(0, 0, this.image.width, this.image.height);
            };
            /**поместить новое*/
            this.setData = function (data) {
                return this.context.putImageData(data, 0, 0);
            };
            /**вернуть исходное */
            this.reset = function () {
                this.setData(this.original);
            };
            /** Трансформирование изображения в чб*/
            this.grayscale = function () {
                var newdata = this.context.createImageData(this.original);
                var len = newdata.data.length;
                for (var i = 0; i < len; i += 4) {
                    //среднее между тремя значениями пикселя
                    var average3 = (this.original.data[i] + this.original.data[i + 1] + this.original.data[i + 2]) / 3;
                    this.original.data[i] = average3; // r
                    this.original.data[i + 1] = average3; // g
                    this.original.data[i + 2] = average3; // b
                    this.original.data[i + 3] = this.original.data[i + 3]; // a
                }
                this.setData(this.original);
            };
            /** Создание/Пересоздание температурной карты
             * @param imgTM элемент new Image()
             * @param GsCimg2 картинка номер два, созданная CanvasImage конструктором
             * @param koefBG значение разницы между двумя пикселями такое, что цвет перейдёт из синего в зелёный
             * @param koefBR значение разницы между двумя пикселями такое, что цвет перейдёт в зелёный
             * @param koefGR значение разницы между двумя пикселями такое, что цвет перейдёт из зелёного в жёлтый
             * @param koefR значение разницы между двумя пикселями такое, что всё, что больше будет красным (255;0;0)
             */
            this.temperatureMap = function (imgTM, GsCImg2, koefBG, koefBR, koefGR, koefR) {
                /**холст для картинки*/
                var canvasR = document.getElementById('result');
                canvasR.width = this.w;
                canvasR.height = this.h;
                var contextTM = canvasR.getContext('2d');
                var newdataTM = contextTM.createImageData(GsCImg2.original);
                /**"длина" картинки*/
                var len = newdataTM.data.length;
                /**сумма первого и второго значения на ползунках*/
                var koef_BG_BR = koefBG + koefBR;
                /**сумма первого, второго и третьего значения на ползунках*/
                var koef_BG_BR_GR = koef_BG_BR + koefGR;
                /**скорость перехода из одной группы цвета в другую*/
                var koef_conversion_green_up = 255 / koefBG, koef_conversion_blue_down = 255 / koefBR, koef_conversion_red_up = 255 / koefGR, koef_conversion_green_down = 255 / (255 - koef_BG_BR_GR - koefR);
                for (var i = 0; i < len; i += 4) {
                    //предполагаем, что поступила чб картинка
                    /**разница между значениями пикселей*/
                    var dev = Math.abs(this.original.data[i] - GsCImg2.original.data[i]);
                    var red = 255;
                    var green = 255;
                    var blue = 255;
                    if (dev <= koef_BG_BR) {
                        if (dev <= koefBG) {
                            blue = 255;
                            green = dev * koef_conversion_green_up;
                            red = 0;
                        }
                        else {
                            blue = 255 - dev * koef_conversion_blue_down;
                            green = 255;
                            red = 0;
                        }
                    }
                    else {
                        if (dev <= koef_BG_BR_GR) {
                            blue = 0;
                            green = 255;
                            red = dev * koef_conversion_red_up;
                        }
                        else {
                            blue = 0;
                            green = 255 - dev * koef_conversion_green_down;
                            red = 255;
                        }
                    }
                    newdataTM.data[i] = red; // r
                    newdataTM.data[i + 1] = green; // g
                    newdataTM.data[i + 2] = blue; // b
                    newdataTM.data[i + 3] = 255; // a
                }
                contextTM.putImageData(newdataTM, 0, 0);
            };
            // загрузка изображения на холст
            var context = canvas.getContext('2d');
            var img = new Image();
            var that = this;
            img.onload = function () {
                canvas.width = img.width;
                canvas.height = img.height;
                context.drawImage(img, 0, 0, img.width, img.height);
                // запомним оригинальные пикселы
                that.original = that.getData();
            };
            img.src = src;
            // кешируем
            this.context = context;
            this.image = img;
            this.w = img.width;
            this.h = img.height;
        }
        return CanvasImage;
    }());
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = CanvasImage;
    ;
});
//# sourceMappingURL=CanvasImageConstructor.js.map