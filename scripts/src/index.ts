import CanvasImage from "./CanvasImageConstructor";

/**коэффициент перехода*/
let koefBG:number = 3,
    koefBR = 3,
    koefGR = 2,
    koefR = 245;
//Кнопка загрузки
const butLoad = document.getElementById('load') as HTMLButtonElement;
/**
 * действия при клике на кнопку
 */
butLoad.onclick = function( event: MouseEvent ) {
    let image:any = new CanvasImage(document.getElementById('basic') as HTMLCanvasElement,'../TempMap/image/imgColor.jpg');
    //Кнопка перевода картинки в чёрно-белый вариант
    const butGS = document.getElementById('grayscale') as HTMLButtonElement;
    //Кнопка подгрузки картинки фотошопа
    const butCmp = document.getElementById('compare') as HTMLButtonElement;
    //Кнопка пересоздания и создания температурной карты
    const butTM = document.getElementById('tempMap') as HTMLButtonElement;

    //действия при клике на кнопку
    butGS.onclick = function( event: MouseEvent ):void {
        image.grayscale();
    }
    //действия при клике на кнопку
    butCmp.onclick = function( event: MouseEvent ):void {
        //добавляем картинку для сравнения (тоже можно запрашивать)
        let img:any = new CanvasImage(document.getElementById('addImg') as HTMLCanvasElement,'../TempMap/image/imgWB.jpg');
        //действия при клике на кнопку
        butTM.onclick = function( event ):void {
            //добавляем картинку для сравнения (тоже можно запрашивать)
            let result:HTMLImageElement = new Image();
            /**value считываемое с ползунка 1*/
            const kbg = document.getElementById("koef1") as HTMLInputElement;
            /**value считываемое с ползунка 2*/
            const kbr = document.getElementById("koef2") as HTMLInputElement;
            /**value считываемое с ползунка 3*/
            const kgr = document.getElementById("koef3") as HTMLInputElement;
            /**value считываемое с ползунка 4*/
            const kr = document.getElementById("koef4") as HTMLInputElement;

            image.temperatureMap(result,img,parseInt(kbg.value),parseInt(kbr.value),parseInt(kgr.value),parseInt(kr.value));
        }
    }
}