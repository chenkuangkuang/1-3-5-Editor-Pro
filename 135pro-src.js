// style-item  vip-style
var modalHiddenInit = false;
var msgTimer = null;
var times = 0;
var canClick = true;
var timer = setInterval(() => {
  times++;
  var con = document.querySelector("#editor-template");
  if (con) {
    //   左上角面板点击，重新绑定生成悬浮复制按钮
      $("#style-categories").on("click", function(e){
          console.log('面板被点击22',);
          setTimeout(() => {
              bindCopyBtn();
          }, 1000);
      })
    clearInterval(timer);
    console.log('发现dom editor-template');
    var mask = document.querySelector(".g-view-mask");
    mask && mask.parentElement.removeChild(mask);

    $(".style-item").css({ 'position': 'relative', 'background': '#fff', 'border-bottom': '1px dotted #ddd', 'padding': '5px 15px', 'cursor': 'pointer' });

    clearDomAndVip();
    buildClearBtn();
    console.log('生成多个按钮',);
    buildAppendAllBtn();
    buildCopyBtn();
    $(".filter").on("click", function () {
      setTimeout(() => {
        console.log('重新清除vip');
        clearDomAndVip();
      }, 1000);
    })
    $('._135editor').click(function (e) {
      // console.clear();
      console.log('click', e.target, !!$(this).siblings('.vip-flag'));
      console.log('=111=', $(this).parent('li'));
      console.log('=111=', $(this).siblings('.vip-flag'));
      // console.log('=999=', $(".modal.show").data("hasHidden"));
      if ($(".modal.show").data("hasHidden")) return;
      var flag = 0;
      var timer2 = setTimeout(() => {
        console.log('=111=', flag);
        var dom = $(".modal.show");
        if (dom || flag >= 50) {
          clearTimeout(timer2);
          // $(".modal.show").remove();
          $(".modal.show").css("display","none").data("hasHidden", 1);
          // $(".modal-backdrop.show").remove();
          $(".modal-backdrop.show").css("display", "none");
          // modalHiddenInit = true;
        }
        flag++;
      }, 50);
      $(".modal.show").css("display","none").data("hasHidden", 1);
      e.stopPropagation();
    });

    $("[data-click]").click(function(){
      console.log('=li clkick=');
      setTimeout(() => {
        $(".modal.show").css("display", "none").data("hasHidden", 1);
        $(".modal-backdrop.show").css("display", "none");
      }, 1000);
    })

  }
  if (times == 10) {
    clearInterval(timer);
  }
  console.log('search...', location.href);
//  样式中心
  if (location.href.match('center')) {
    console.log('in center',);
    var con2 = document.querySelector("#filter-container");
    if (con2) {
      clearInterval(timer);
      bindCopyBtn('.editor-style-content', true)
    }
  }

  document.body.addEventListener("DOMNodeInserted", function(e) {
    // console.log("有元素被加入", e)
    // console.log(e);
    if(e.target.id == 'user-login-dialog'){
        console.log('登录框被加入',);
        $("#user-login-dialog").remove();
    }
    if(e.target.className && (e.target.className.includes('style-item') || e.target.className.includes('editor-template-list'))){
        console.log('有新素材加入',);
        bindCopyBtn();
    }
    // className = mixitem
    // bindCopyBtn('.editor-style-content', true)
    if(e.target.className && (e.target.className.includes('mixitem'))){
        console.log('有新素材加入',);
        bindCopyBtn('.editor-style-content', true);
    }
})
}, 1000);

function clearDomAndVip() {
  $("._135editor").on("click", function (e) {
    if ($(this).parent(".style-item").hasClass("vip-style") || window.appendAll) {
      var $iframeBody = $("iframe").contents().find(".view")
      // console.log('=e=', $(this)[0], $(this).clone(), $iframeBody);
      $iframeBody.removeClass("guide")
      $iframeBody.append($(this).clone())
    }
  })
}

function buildClearBtn() {
  var aDom = document.createElement("a");
  aDom.innerText = '清除vip权限';
  aDom.style.cssText = 'position:absolute;right:100px;top:100px;background:#345;color:#fff;border-radius:3px;padding:5px;'
  document.body.append(aDom);
  aDom.addEventListener("click", function () {
    console.log('click');
    clearDomAndVip();
    message('已解除vip权限')
  })
  console.log('加入a标签');
  
  var bDom = document.createElement("p");
  bDom.innerText = '';
  bDom.style.cssText = 'position:absolute;left:50%;top:100px;color:#fff;border-radius:3px;padding:5px;background:#000;transform:translateX(-50%);display:none';
  bDom.id = 'message';
  document.body.append(bDom);
}

var copyBtn = createDom({
  name: 'a',
  text: '复制',
  css: 'position:absolute;background:#3ea700;color:#fff;border-radius:3px;width:50px;height:25px;z-index:99;text-align:center;',
  className: 'newcopy'
})

function buildAppendAllBtn() {

  var aDom = createDom({
    name: 'a',
    text: '普通素材点击没反应？点我',
    css: 'position:absolute;right:100px;top:140px;background:#345;color:#fff;border-radius:3px;padding:5px;',
  })

  document.body.append(aDom);
  aDom.addEventListener("click", function () {
    window.appendAll = true;
    message('已解除普通素材限制！');
  })
  console.log('加入a标签');
  
  var bDom = createDom({
    name: 'a',
    text: '一键清除',
    css: 'position:absolute;right:100px;top:55px;background:#3ea700;color:#fff;border-radius:3px;padding:5px;',
  })
  document.body.append(bDom);
  bDom.addEventListener("click", function () {
    var $iframeBody = $("iframe").contents().find(".view");
    $iframeBody.html("");
  })
}

function buildCopyBtn() {
  var aDom = createDom({
    name: 'a',
    text: '鼠标悬浮没有复制？点我',
    css: 'position:absolute;right:100px;top:182px;background:#345;color:#fff;border-radius:3px;padding:5px;',
  })
  aDom.addEventListener("click", function () {
    bindCopyBtn();
  })
  document.body.append(aDom);
  bindCopyBtn('._135editor');
}

// selector = 
function bindCopyBtn(selector, isCenterPage) {
    selector = selector || '._135editor';
  message('初始化 section 悬浮生成复制按钮');
  console.log('=selector=', selector);
  var $source = isCenterPage ? $(selector) : $(selector)
  $source.mouseenter(function () {
    // var top = $(this).offset().top;
    // var left = $(this).offset().left;
    // console.log('hover', top, left);
    $(this).css("position", "relative").append(copyBtn);
    copyBtn.style.top = 0;
    copyBtn.style.right = 0;
    copyBtn.style.opacity = 1;
    copyBtn.innerText = '复制';
    // cDom.style.top = top+"px";
    // cDom.style.left = (left + $(this).width() - 50)+"px";
    // document.body.append(cDom);
    var $dom = $(this);
    var dom = $dom[0];
    copyBtn.addEventListener("click", function (e) {
      if (!canClick) return;
      canClick = false;
      setTimeout(() => {
        canClick = true;
      }, 1000);
      $dom = $(e.target).parent();
      $dom.find(".newcopy").text("").css("opacity", "0");
      dom = $dom[0];
      console.log('复制33', dom);
      dom.setAttribute("contenteditable", true);
      copy(dom);
      e.stopPropagation();
    })
  }).mouseleave(function () {
    console.log('移出',);
    $(this).css("position", "relative").find(".newcopy").remove();
  })
}

function copy(dom) {
  var text = dom;
  if (document.body.createTextRange) {
      var range = document.body.createTextRange();
      range.moveToElementText(text);
      range.select();
  } else if (window.getSelection) {
      var selection = window.getSelection();
      var range = document.createRange();
      range.selectNodeContents(text);
      selection.removeAllRanges();
      selection.addRange(range);
  } else {
      alert("none");
  }
  var res = document.execCommand('copy');
  console.log('=res=', res);
  if (res) {
    message('复制成功！');
  }
}


function message(msg) {
  $("#message").css("display", "block").text(msg);
  if (msgTimer) {
    clearTimeout(msgTimer);
    msgTimer = null;
  }
  msgTimer = setTimeout(() => {
    $("#message").css("display", "none");
  }, 1000);
}

// 传入obj的name，text，className，css
function createDom(obj) {
  var dom = document.createElement(obj.name);
  dom.innerText = obj.text;
  dom.className = obj.className;
  dom.style.cssText = obj.css;
  return dom;
}



// document.body.addEventListener("DOMSubtreeModified", function(e) {
//     // console.log("dom发生变动")
//     // console.log(e);
//     if(e.target.className && (e.target.className.includes('style-item') || e.target.className.includes('editor-template-list'))){
//         console.log('有新素材变化',);
//     }
// })

