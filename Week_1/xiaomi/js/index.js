// var c = () =>{
//     let w = document.documentElement.clientWidth;
//     let n = (20*(w/320)>40?40+"px":(20*(w/320)+"px"));
//     document.documentElement.style.fontSize = n;
// }
// window.addEventListener("load",c);
// window.addEventListener("resize",c);

var search = document.getElementById("search");
var search_button = document.getElementById("search-button");
var search_content = document.getElementById("search-content"); 
// var nav = document.getElementById("nav");
var top_center_ul =document.getElementById("top-center-ul");
const pull_down_trigger = document.querySelectorAll(".pull-down-trigger");
const pull_down = document.querySelectorAll(".pull-down");
var downloadAPP = document.getElementById("downloadAPP");
var QRCode = document.getElementById("QRCode");
var shoppingCar = document.getElementById("shoppingCar");
var shoppingCar_pulldown = document.getElementById("shoppingCar-pulldown");
var shoppingCar_a = document.getElementById("shoppingCar-a");
var shoppingCar_icon = document.getElementById("shoppingCar-icon");
var dot = document.querySelectorAll(".dot");
const carousel = document.querySelectorAll(".carousel");
var flipIcon = document.querySelectorAll(".flipIcon");
var center_left_li = document.querySelectorAll(".center-left-li");
var center_left_li_mouseover = document.querySelectorAll(".center-left-li-mouseover");
var underLine1 = document.querySelectorAll(".underLine1");
var underLine2 = document.querySelectorAll(".underLine2");
var underLine3 = document.querySelectorAll(".underLine3");
var underLine4 = document.querySelectorAll(".underLine4");
var underLine5 = document.querySelectorAll(".underLine5");
var changeImg = document.querySelectorAll(".changeImg");

var change1 = document.querySelectorAll(".change1");
var change2 = document.querySelectorAll(".change2");
// var leftDevide = document.getElementById("leftDevide");
// var rightDevide = document.getElementById("rightDevide");

// 点击搜索框
search.onclick = function(){
    search.style.border = "1px solid rgb(255,106,0)";
    search.style.borderRight = "none";
    search_button.style.border = "1px solid rgb(255,106,0)";
    search_content.style.visibility = "visible";
    search_content.style.height = "25rem"; // 恢复高度
}
search.addEventListener("blur",function(){
    search.style.border = "1px solid #e0e0e0";
    search.style.borderRight = "none";
    search_button.style.border = "1px solid #e0e0e0";
    search.style.transition = "border 0.2s ease";
    search_button.style.transition = "border 0.2s ease";
    // 使用 visibility 和 height 隐藏
    search_content.style.visibility = "hidden";
    search_content.style.height = "0";
})
//搜索框的轮播文本内容
var content = ['厨房焕新季','空调','米家口袋照片打印机1s','小米手环9 Pro','Redmi K80','充电宝','路由器','吹风机','热水器','晾衣架'];
var autoContent = (content)=>{
    let index = 1;
    setInterval(()=>{
        search.placeholder = content[index];
        if(index==content.length-1){
         index=0;   
        }else{
            index++;
        }
    },5000)
}
autoContent(content);
//悬浮在白色导航条
top_center_ul.addEventListener("mouseover",()=>{
    // 为每个 pull_down_trigger 添加鼠标悬停事件
pull_down_trigger.forEach((trigger, index) => {
    // 鼠标悬停时显示对应的 pull_down
    trigger.addEventListener("mouseover", () => {
        // 隐藏所有 pull-down
        pull_down.forEach((pull_down) => {
            pull_down.style.visibility = "hidden";
            pull_down.style.height = "23rem"; // 左右移动时背景的幕布不上下跳动而是保持不动
            // pull_down.style.display = "none";
            pull_down.addEventListener("mouseover",()=>{
                pull_down.style.visibility = "visible";
                // pull_down.style.display = "flex";
            });
            pull_down.addEventListener("mouseout",()=>{
                pull_down.style.visibility = "hidden";
                // pull_down.style.height = "0";
                // pull_down.style.display = "none";
            });
        });

        // 显示当前对应的 pull-down
        pull_down[index].style.height = "0";
        pull_down[index].style.visibility = "visible";
        pull_down[index].style.height = "23rem"; // 设置高度
        // pull_down[index].style.display = "flex";
        
    });

    // 鼠标离开时隐藏对应的 pull-down
    trigger.addEventListener("mouseout", () => {
        pull_down[index].style.visibility = "hidden";
        // pull_down[index].style.height = "23rem";
        // pull_down[index].style.height = "0"; // 隐藏
        // pull_down[index].style.display = "none";
    });
});
})
top_center_ul.addEventListener("mouseout",()=>{
    pull_down.forEach((pull_down,index)=>{
        pull_down.style.height= "0";
    })
})
//悬浮在黑色导航条下载APP
downloadAPP.addEventListener("mouseover",()=>{
    QRCode.style.visibility = "visible";
    QRCode.style.height = "14.5rem";
})
downloadAPP.addEventListener("mouseout",()=>{
    QRCode.style.visibility = "hidden";
    QRCode.style.height = "0";
})
//悬浮在黑色导航条购物车
shoppingCar.addEventListener("mouseover",()=>{
    shoppingCar_pulldown.style.visibility = "visible";
    shoppingCar_pulldown.style.height = "10rem";
    shoppingCar.style.backgroundColor = "white";
    shoppingCar_a.style.color = "rgb(255,106,0)";
    shoppingCar_icon.style.color = "rgb(255,106,0)";
})
shoppingCar.addEventListener("mouseout",()=>{
    shoppingCar_pulldown.style.visibility = "hidden";
    shoppingCar_pulldown.style.height = "0";
    shoppingCar.style.backgroundColor = "rgb(50,50,50)";
    shoppingCar_a.style.color = " rgb(176,176,176)";
    shoppingCar_icon.style.color = " rgb(176,176,176)";
})
//悬浮在左侧黑色导航条
center_left_li.forEach((center_left_liItem,index)=>{
    center_left_liItem.addEventListener("mouseover",()=>{
        center_left_li_mouseover.forEach(center_left_li_mouseoverItem=>{
            center_left_li_mouseoverItem.style.visibility = "hidden";
            center_left_li_mouseoverItem.style.opacity = "0";
        })
        center_left_li_mouseover[index].style.visibility = "visible";
        center_left_li_mouseover[index].style.opacity = "1";
    })
    center_left_liItem.addEventListener("mouseout",()=>{
        center_left_li_mouseover.forEach(center_left_li_mouseoverItem=>{
            center_left_li_mouseoverItem.style.visibility = "hidden";
            center_left_li_mouseoverItem.style.opacity = "0";
        })
    })
})
//轮播图
function autoSlide(){
    let currentIndex=0;
    setInterval(()=>{
        carousel[currentIndex].style.visibility = "hidden";
        carousel[currentIndex].style.opacity = "0.4";
        dot[currentIndex].style.backgroundColor = "rgba(0, 0, 0, .4)";
        // if(currentIndex==carousel.length-1){
        //     currentIndex=0;
        // }else{
        //     currentIndex++;
        // }
        currentIndex = (currentIndex+1)%carousel.length;
        carousel[currentIndex].style.visibility = "visible";
        carousel[currentIndex].style.opacity = "1";
        dot[currentIndex].style.backgroundColor = "#fff";
    },5000);
}
autoSlide();

//点击轮播图右下角小点切换图片
//dotElement是局部变量，每次迭代时都会被重新创建，因此事件处理函数捕获的是每次迭代时的dotElement的值，而不是forEach的最后一个值
dot.forEach((dotElement,index)=>{
        dotElement.addEventListener("click",()=>{
            carousel.forEach((carouselItem)=>{
                carouselItem.style.visibility = "hidden";
                carouselItem.style.opacity = "0.4";
            })
            dot.forEach((alldot)=>{
                alldot.style.backgroundColor = "rgba(0, 0, 0, .4)";
            });
            dotElement.style.backgroundColor = "#fff";
            carousel[index].style.visibility = "visible";
            carousel[index].style.opacity = "1";
            
        })
        dotElement.addEventListener("mouseover",()=>{
            dotElement.style.backgroundColor = "#fff";
        })
        dotElement.addEventListener("mouseout",()=>{
            dotElement.style.backgroundColor = "rgba(0, 0, 0, .4)";
        })
})
//点击轮播图左右切换图片(右键异常)
// flipIcon.forEach((flipIconElement,index)=>{
//     flipIconElement.addEventListener("click",()=>{
//         carousel.forEach((carouselItem,i)=>{
//             const visibility = window.getComputedStyle(carouselItem).visibility;
//             if(visibility=="visible"){
//                 carouselItem.style.visibility = "hidden";
//                 carouselItem.style.opacity = "0.4";
//                 if(index==0){
//                     // if(i==0){
//                     //     carousel[carousel.length-1].style.visibility = "visible";
//                     //     carousel[carousel.length-1].style.opacity = "1";
//                     // }else{
//                     //     carousel[i-1].style.visibility = "visible";
//                     //     carousel[i-1].style.opacity = "1";
//                     // }
//                     const prevIndex = i === 0 ? carousel.length - 1 : i - 1;
//                     carousel[prevIndex].style.visibility = "visible";
//                     carousel[prevIndex].style.opacity = "1";
//                     // return;
//                 }else if(index==1){
//                     // if(i==carousel.length-1){
//                     //     carousel[0].style.visibility = "visible";
//                     //     carousel[0].style.opacity = "1";
//                     // }else{
//                     //     carousel[i+1].style.visibility = "visible";
//                     //     carousel[i+1].style.opacity = "1";
//                     // }
//                     const nextIndex = (i + 1) % carousel.length;
//                     if (carousel[nextIndex]) {
//                         carousel[nextIndex].style.visibility = "visible";
//                         carousel[nextIndex].style.opacity = "1";
//                         console.log("ok");
//                     } else {
//                         console.error("carousel[nextIndex] is undefined:", nextIndex);
//                     }
                
//                     // return;
//                 }
//                 return;
//             }
//         })
//     })
    
// })

// 中间广告图标题栏右侧文字悬浮出现下划线
var underLine = (underLine,change)=>{
    underLine.forEach((underLineItem,index)=>{
        underLineItem.addEventListener("mouseover",()=>{
            underLine.forEach((underLineItem2)=>{
                underLineItem2.style.color = "black";
                underLineItem2.style.borderBottom = "2px solid rgb(245, 245, 245)";
            })
            underLineItem.style.color = "rgb(255,106,0)";
            underLineItem.style.borderBottom ="2px solid rgb(255,106,0)";
            change.forEach(changItem=>{
                changItem.style.display = "none";
            })
            change[index].style.display = "flex";
        })
    })
}
underLine(underLine1,change1);
underLine(underLine2,change2);
underLine(underLine3);
underLine(underLine4);
underLine(underLine5);

//底部网络安全图片轮播
var change = ()=>{
    let index = 1;
    setInterval(() => {
        if(index==0){
            changeImg[0].style.display = "inline-block";
            changeImg[1].style.display = "none";
            index=1;
        }else{
            changeImg[1].style.display = "inline-block";
            changeImg[0].style.display = "none";
            index=0;
        }

    }, 3000);
}
change();
//设置搜索框的下拉框的宽度
window.onload = function(){
    const inputWidth = search.offsetWidth;
    search_content.style.width = `${inputWidth}px`;
}
window.onresize = function() {
    const inputWidth = search.offsetWidth;
    search_content.style.width = `${inputWidth}px`;
};
//设置广告栏左边图片容器的高度
// window.onload = function(){
//     const height = rightDevide.offsetHeight;
//     leftDevide.style.height = `${height}px-1.6rem`;
// }
// window.onresize = function() {
//     const height = rightDevide.offsetHeight;
//     leftDevide.style.height = `${height}px-1.6rem`;
// };