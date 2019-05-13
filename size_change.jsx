//ピクセル指定のおまじない
var saveRulerUnits=preferences.rulerUnits;
preferences.rulerUnits=Units.PIXELS;

//上限
var widthLim=1600; //幅上限
var heightLim=1200; //高さ上限

//元ファイル情報
var baseFile=activeDocument; //アクティブドキュメントを取得
var w=baseFile.width; //幅を取得
var h=baseFile.height; //高さを取得
var ratio=w/h; //縦横比を取得

//新規サイズ
var newW=0; //新規幅初期化
var newH=0; //新規高さ初期化

if(w>widthLim || h>heightLim){
    if(h > 1200){//高さが1200を超えている
        newW=heightLim*ratio;
        newH=heightLim;
    }else{//幅が1600を超えている
        newW=widthLim;
        newH=widthLim/ratio;
    }
    //サイズ変更
    baseFile.resizeImage(newW,newH,baseFile.resolution,ResampleMethod.BICUBIC);
}
preferences.rulerUnits=saveRulerUnits; //ピクセル指定を元に戻す