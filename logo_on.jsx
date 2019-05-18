//ピクセル指定のおまじない
var saveRulerUnits=preferences.rulerUnits;
preferences.rulerUnits=Units.PIXELS;

//上限
var widthLim=1600; //幅上限
var heightLim=1200; //高さ上限

//元ファイル情報
var baseFile=activeDocument; //アクティブドキュメントを取得
var w=baseFile.width.value; //幅を取得
var h=baseFile.height.value; //高さを取得
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
}else{
    newW=w;
    newH=h;    
 }

//ロゴ位置スケーリング計算
var numFraction = 3; //元画像の 母数に設定する
var numScaling = newW / numFraction; //元画像の 子数に設定する

// ロゴ画像のファイルを開く
//差し込み先画像のサイズの最大が1600*1200なのでロゴ画像のサイズは幅600以上に設定しておく が、大きすぎると重いので考慮すること
var strLogoFName;
var objLogo;
var objFile;

//指定フォルダの選択
//var strLogoFName = File.openDialog ("操作を行うファイルの選択");
//if(strLogoFName.length == 0){
//    alert("選択されていません、終了します");
//    exit;
//    }
strLogoFName = "Presets\\Scripts\\logo.psd";
objFile = new File(strLogoFName);
objLogo = open(objFile);

// ロゴサイズ変更
var numResizeWidth  = Math.floor(numScaling);
var numResizeHeight = Math.floor(objLogo.height.value * (numScaling / objLogo.width.value));

objLogo.resizeImage(numResizeWidth, numResizeHeight, objLogo.resolution, ResampleMethod.BICUBICSHARPER);

// ロゴのすべてのレイヤーをワークドキュメントへコピー 一応複数レイヤーになっても使える(はず)
var numLayerLogo = objLogo.layers.length;

for (i = 0; i < numLayerLogo; i++){
    objLogo.layers[i].duplicate(baseFile);
}

// ロゴ画像を閉じる
objLogo.close(SaveOptions.DONOTSAVECHANGES);
objFile.close();

// ロゴ位置移動処理
var numOffset = numResizeWidth / 4; //オフセットの基準値は縦横共通でロゴ画像の1/4 px
var numLogoLeft = newW - numResizeWidth - numOffset;
var numLogoTop  = newH - numResizeHeight - numOffset;

// ロゴレイヤーの移動 (コピーされたレイヤーは0番から)
var numLayer = baseFile.layers.length;
for (i = 0; i < numLayerLogo; i++){
    baseFile.layers[i].translate(numLogoLeft, numLogoTop);
}

preferences.rulerUnits=saveRulerUnits; //ピクセル指定を元に戻す