/**Модуль с класса canimage
 * @module
 */
class CanvasImage{
    public context: any;
    public image: HTMLImageElement;
    public w: number;
    public h: number;
    public original: ImageData;
    /**
     * конструктор холста
     * @param canvas холст
     * @param src ссылка
     */
    public constructor(canvas:HTMLCanvasElement, src:string) {
        // загрузка изображения на холст
        let context:any = canvas.getContext('2d');
        let img:HTMLImageElement = new Image();
        let that:CanvasImage = this;
        img.onload = function(){
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
    /**получить текущее */
    getData = function():ImageData {
        return this.context.getImageData(0, 0, this.image.width, this.image.height);
    };
    /**поместить новое*/
    setData = function(data:HTMLDataListElement):any {
        return this.context.putImageData(data, 0, 0);
    };
    /**вернуть исходное */
    reset = function():void {
        this.setData(this.original);
    }
    /** Трансформирование изображения в чб*/
    grayscale = function():void {
        let newdata:ImageData = this.context.createImageData(this.original);
        const len:number = newdata.data.length;
        for (let i = 0; i < len; i += 4) {
            //среднее между тремя значениями пикселя
            const average3 = (this.original.data[i] + this.original.data[i+1] + this.original.data[i+2]) / 3;
            this.original.data[i]   = average3;// r
            this.original.data[i+1] = average3;// g
            this.original.data[i+2] = average3;// b
            this.original.data[i+3] = this.original.data[i+3];// a
        }
        this.setData(this.original);
    }
    /** Создание/Пересоздание температурной карты
     * @param imgTM элемент new Image()
     * @param GsCimg2 картинка номер два, созданная CanvasImage конструктором
     * @param koefBG значение разницы между двумя пикселями такое, что цвет перейдёт из синего в зелёный
     * @param koefBR значение разницы между двумя пикселями такое, что цвет перейдёт в зелёный
     * @param koefGR значение разницы между двумя пикселями такое, что цвет перейдёт из зелёного в жёлтый
     * @param koefR значение разницы между двумя пикселями такое, что всё, что больше будет красным (255;0;0)
     */
    temperatureMap = function(imgTM:any,GsCImg2:CanvasImage,koefBG:number,koefBR:number,koefGR:number,koefR:number):void {
        /**холст для картинки*/
        let canvasR = document.getElementById('result') as HTMLCanvasElement;
        canvasR.width = this.w;
        canvasR.height = this.h;
        let contextTM:any = canvasR.getContext('2d');
        let newdataTM:ImageData = contextTM.createImageData(GsCImg2.original);
        /**"длина" картинки*/
        const len:number = newdataTM.data.length;
        /**сумма первого и второго значения на ползунках*/
        const koef_BG_BR:number = koefBG + koefBR;
        /**сумма первого, второго и третьего значения на ползунках*/
        const koef_BG_BR_GR:number = koef_BG_BR + koefGR;
        /**скорость перехода из одной группы цвета в другую*/
        const koef_conversion_green_up:number = 255 / koefBG,
            koef_conversion_blue_down = 255 / koefBR,
            koef_conversion_red_up = 255 / koefGR,
            koef_conversion_green_down = 255 / (255 - koef_BG_BR_GR - koefR)
            ;
        for (let i = 0; i < len; i += 4) {
            //предполагаем, что поступила чб картинка
            /**разница между значениями пикселей*/
            const dev:number = Math.abs(this.original.data[i] - GsCImg2.original.data[i]);
            let red:number = 255;
            let green:number = 255;
            let blue:number = 255;
            if (dev <= koef_BG_BR){
                if (dev <= koefBG){
                    blue = 255;
                    green = dev * koef_conversion_green_up;
                    red = 0;
                }else{
                    blue = 255 - dev * koef_conversion_blue_down;
                    green = 255;
                    red = 0;
                }
            }else{
                if (dev <= koef_BG_BR_GR){
                    blue = 0;
                    green = 255;
                    red = dev * koef_conversion_red_up;
                }else{
                    blue = 0;
                    green = 255 - dev * koef_conversion_green_down;
                    red = 255;
                }
            }
            newdataTM.data[i]   = red; // r
            newdataTM.data[i+1] = green; // g
            newdataTM.data[i+2] = blue; // b
            newdataTM.data[i+3] = 255;// a
        }
        contextTM.putImageData(newdataTM, 0, 0);
    }
};
/**
 * модуль
 */
export{
    CanvasImage as default,
};