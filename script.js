'use strict'
// 1行目に記載している 'use strict' は削除しないでください

//グローバル変数
let changeCnt = 0;
let tachFlag = 0;

//47都道府県の観光ガイド情報
const introObj = {
    hokkaido: "北海道（ほっかいどう）は、日本の北海道地方に位置する道。道庁所在地は札幌市。47都道府県中唯一の「道」である。ブランド総合研究所による「都道府県の魅力度ランキング」で2021年現在、13年連続で1位に選ばれ、観光意欲度、産品購入意欲度でも1位、居住意欲度でも3位となっており、各意欲の面で高い評価を得ている。",
}

//47都道府県の画像データ
const imgObj = {
    hokkaido: ".img/h1.png"
};

//スリープ関数
function sleep(waitMsec) {
    let startMsec = new Date();

    // 指定ミリ秒間だけループさせる（CPUは常にビジー状態）
    while (new Date() - startMsec < waitMsec);
}



//マウスカーソルを都道府県のBox上に移動した場合に情報をポップアップする
function infoPickup(event) {

    //ポップアップ用のBox情報の要素、マウスカーソルを当てた際のイベント情報の取得とポップアップに挿入する要素作成を定義
    const intro = document.getElementById("intro");
    const point = event.currentTarget;
    const pushInfo = document.createElement("p");
    const pushImg = document.createElement("img");

    //ポップアップに挿入するタグ情報、テキスト情報の加工
    pushInfo.classList.add("addInfo");
    pushInfo.textContent = introObj["hokkaido"];

    //参考画像のクラス、スタイル定義
    pushImg.classList.add("addImg");
    pushImg.style.height = "200px";
    pushImg.style.display = "block";
    pushImg.style.margin = "auto";

    //ポップアップを可視化
    intro.style.visibility = (intro.style.visibility == "visible") ? "hidden" : "visible";

    //ポップアップに情報を挿入
    intro.appendChild(pushInfo);
    pushImg.setAttribute("src", imgObj["hokkaido"]);

    //ポップアップに画像を挿入
    intro.appendChild(pushImg);

    //タッチフラグをリターンする
    return 1;
}

//マウスカーソルを都道府県のBox上から移動した場合にポップアップを消す
function infoDelete() {

    //ポップアップ用のBox情報、ポップアップに挿入された要素を取得して定義
    const intro = document.getElementById("intro");
    const popInfo = document.querySelector(".addInfo");
    const popImg = document.querySelector(".addImg");

    //ポップアップを非可視化
    intro.style.visibility = (intro.style.visibility == "visible") ? "hidden" : "visible";

    //ポップアップに挿入された情報の削除
    intro.removeChild(popInfo);
    intro.removeChild(popImg);

    //タッチフラグをリターンする
    return 0;
}

//クリックした都道府県のGoogle検索画面を表示
function googleSerch(event) {
    const point = event.currentTarget;
    let serchInfo = "https://www.google.com/search?q="

    //Google検索テキストを生成
    serchInfo += point.innerText + "+観光名所";

    //Google検索画面に画面遷移
    window.open(serchInfo);

}

//都道府県の要素を取得して定義
const hokkaido = document.getElementById("hokkaido");

//都道府県の要素範囲への侵入、脱出時のアクション、クリック時のアクション
tachFlag = hokkaido.addEventListener("mouseenter", infoPickup);
tachFlag = hokkaido.addEventListener("mouseleave", infoDelete);
hokkaido.addEventListener("click", googleSerch);
