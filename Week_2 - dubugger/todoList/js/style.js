var finishAll = document.querySelector(".finishAll");
var deleteAll = document.querySelector(".deleteAll");
var search = document.querySelector(".icon-sousuo_huaban1");
var searchInput = document.querySelector(".searchInput");
var hideInput = document.querySelector(".icon-icon-line-right");
var urgentButton = document.querySelector(".urgentButton");
var addItem = document.querySelector(".icon-zengjia");
var shade = document.querySelector(".shade");
var add = document.querySelector(".add");
var title = document.querySelector(".title");
var contentText = document.querySelector(".contentText");
var star = document.querySelector(".star");
var successAdd = document.querySelector(".successAdd");
var addItemForm = document.querySelector(".addItem");
var todoList = document.querySelector(".todoList");
var container = document.querySelector(".container");
var menu = document.querySelector(".icon-caidan");
var nav = document.querySelector(".nav");
var goToDoList = document.getElementById("goToDoList");
var goBin = document.getElementById("goBin")
var click = document.querySelectorAll(".click");
var detailContent = document.querySelector(".detailContent");
var closeContent = document.querySelector(".close");
var Title = document.querySelector(".Title");
var Content = document.querySelector(".Content");
var language = document.querySelectorAll(".language");
var main = document.querySelector(".main");
var tips = document.querySelector(".tips");
var pullDown = document.querySelector(".pullDown");
var download = document.querySelector("#download");
const searchContent = document.querySelector('.searchContent');

let lang_flag = 0;

//获取当前时间
var time = document.querySelectorAll(".time");
var Time = ()=>{
    var date = new Date();
    if(lang_flag===1){
        var nowTime = [date.getHours(),date.getMinutes(),date.getSeconds(),date.getDay(),date.getDate(),date.getMonth(),+date.getFullYear()];
        var days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"]
        var months = ["Januray","February","March","April","May","June","July","August","September","October","November","December"]
        nowTime[3] = days[nowTime[3]];
        nowTime[5] = months[nowTime[5]];
        if(date.getHours()<10){
            nowTime[0] = "0"+nowTime[0];
        }
        if(date.getMinutes()<10){
            nowTime[1] = "0"+nowTime[1];
        }
        if(date.getSeconds()<10){
            nowTime[2] = "0"+nowTime[2];
        }
        nowTime = [nowTime[0] + "：", nowTime[1] + "：", nowTime[2] + "，", nowTime[3], "，" + nowTime[4] + "，", nowTime[5] + "，", nowTime[6]];
    }else{
        var days = ["星期日","星期一","星期二","星期三","星期四","星期五","星期六"]
        var nowTime = [
            date.getFullYear() + "年",
            (date.getMonth() + 1) + "月",
            date.getDate() + "日",
            date.getDay(),
            date.getHours()+"：",
            date.getMinutes()+"：",
            date.getSeconds()
        ];
        nowTime[3] = days[nowTime[3]];
        if(nowTime[4]<"10"){
            nowTime[4] = "0"+nowTime[4];
        }
        if(nowTime[5] <"10"){
            nowTime[5] = "0"+nowTime[5];
        }
        if(nowTime[6]<"10"){
            nowTime[6] = "0"+nowTime[6];
        }
        
    }
    return nowTime;
}
//将当前时间更新到页面
var updateTime = ()=>{
    time.forEach((time,index)=>{
        time.innerHTML = Time()[index];
    })
}
//将时间更新到界面
setInterval(updateTime,1000);//第一个参数应该是函数引用而不是函数调用


// 数据保存操作

//保存函数(到首页)
var toDoListSave = (arr) => {
    localStorage.setItem("toDoList", JSON.stringify(arr));
}
//读取函数(首页的待办)
var toDoListLoad = () => {
    var savedList = localStorage.getItem("toDoList");
    return savedList ? JSON.parse(savedList) : [];
}
//清除函数(首页)
var toDoListClear = () => {
    //localStorage.clear();//清空所有
    localStorage.removeItem("toDoList");
}



//保存函数(到回收站)
var BinListSave = (arr) => {
    localStorage.setItem("BinList", JSON.stringify(arr));
}
//读取函数(回收站的待办)
var BinListLoad = () => {
    var savedList = localStorage.getItem("BinList");
    return savedList ? JSON.parse(savedList) : [];
}
//清除函数(回收站)
var BinListClear = () => {
    //localStorage.clear();//清空所有
    localStorage.removeItem("BinList");
}
//出现搜索框函数
let searchInputstate = 0;
console.log(searchInputstate)
const searchInputOut = ()=>{
    search.style.marginLeft = "0";
    search.style.border = "1px solid #935887";
    searchInput.style.display = "block";
    hideInput.style.display = "block";
}
//点击搜索按钮出现输入框以及查询事件
search.addEventListener("click",()=>{
    if(searchInputstate===0){
        searchInputOut();
        searchInputstate = 1;
    }else{
        searchFun();
    }
} 
);
searchInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
        e.preventDefault();
        searchFun()
    }
})
//查询显示函数
const searchFun = ()=>{
    if (searchInput.value === "") {
        searchContent.style.display = "none";
        main.style.display = "flex";
        console.log(main)
    } else {
        main.style.display = "none";
        searchContent.style.display = "flex";
        searchContent.querySelectorAll(".todoItem").forEach(todoItem => { todoItem.remove() });
        searchItem();
    }
}
//查询
    
//关闭搜索框
hideInput.addEventListener("click",()=>{
    search.style.border = "none";
    searchInput.style.display = "none";
    hideInput.style.display = "none";
    // searchInput.value = "";
    search.removeEventListener("click",searchFun)
    searchInputstate = 0;
})

//查询事件
var searchItem = ()=>{
    var result = 0;
    var toDoListArr = toDoListLoad();
    var binListArr = BinListLoad();
        if(main.classList.contains("home")){
            toDoListArr.forEach(todoItem=>{
                if(todoItem.title.includes(searchInput.value)){
                    createToDoItem(todoItem,searchContent);
                    result++;
                }
            })
        }else{
            binListArr.forEach(binItem=>{
                if(binItem.title.includes(searchInput.value)){
                    createToDoItem(binItem,searchContent);
                    result++;
                }
            })
        }
        if(result==0){
            var err = document.createElement("div");
            err.classList.add("todoItem");
            err.style.textAlign = "center";
            // if(nav.style.display==="flex"){
            //     err.innerHTML = "请添加你的第一个待办吧！"
            //     nav.appendChild(err);
            // }else{
                if(lang_flag===1){
                    err.innerHTML = "Without note!"
                }else{
                    err.innerHTML = "查询不到该笔记！"
                }
                searchContent.appendChild(err);
            // }
        }    
}


//点击添加待办事件出现弹窗
addItem.addEventListener("click",()=>{
    shade.style.display = "block";
    shade.addEventListener("click",(e)=>{
        if(e.target == shade){//实际触发事件的DOM元素
            shade.style.display = "none";
        }
    })
})
//创建事件元素
var createToDoItem = (toDoItem,todoList)=>{
    var Item = document.createElement("div");
            var Title = document.createElement("h3");
            var Click = document.createElement("i");
            var Delete = document.createElement("i");
            var Time = document.createElement("i");
    
            Item.classList.add("todoItem");
    
            Title.innerText = toDoItem.title;
            Title.classList.add("newTitle");
            
            Click.style.cssText = "width:2.5rem;height:2.5rem;border-radius:50%;border:2px solid rgb(136, 117, 117)";
            Click.classList.add("click");
            if(toDoItem.finish=="true"){
                Click.innerHTML = "✔";
            }
            Time.innerText = toDoItem.time;
            Time.classList.add("newTime");

            Delete.classList.add("iconfont");
            if(main.classList.contains("home")){
                Delete.classList.add("icon-shanchu");
            }
            else{
                Delete.classList.add("icon-fanhui");
                
                //返回的图标
                // Delete.classList.remove("iconfont");
                // Delete.classList.remove("icon-shanchu");
            }
            Item.appendChild(Click);
            //加急处理
            if(toDoItem.isUrgent === "true"){
                var Urgent = document.createElement("b");
                Urgent.classList.add("Urgent");
                if(lang_flag===1){
                    Urgent.innerText = "U";
                }else{
                    Urgent.innerText = "急";
                }
                Item.appendChild(Urgent);
            }
            Item.appendChild(Title);
            Item.appendChild(Time);
            //内容不为空处理
            if(toDoItem.content!=""){
                var Content = document.createElement("i");
                Content.classList.add("iconfont");
                Content.classList.add("icon-shenglve");
                Item.appendChild(Content);
            }
            Item.appendChild(Delete)
            todoList.appendChild(Item);
}

//添加待办事件函数
var addItem = ()=>{
    star.style.display = "none";
    title.placeholder = "";
    if(title.value==""){
        star.style.display = "inline-block";
        if(lang_flag===1){
            title.placeholder = "Title no null!";
            
        }else{
            title.placeholder = "标题不能为空";
        }
        
    }
    else if(title.value.length>15){
        star.style.display = "inline-block";
        title.value = "";
        title.placeholder = "标题最多15个字";
        if(lang_flag===1){
            title.placeholder = "maxLength:15";
        }
    } 
    else{
        if(todoList.classList.contains("home")){
            var newItem = document.createElement("div");
            var newTitle = document.createElement("h3");
            var newClick = document.createElement("i");
            var newDelete = document.createElement("i");
            var newTime = document.createElement("i");
            
            newTitle.innerText = title.value;
            newTitle.classList.add("newTitle");

            newClick.style.cssText = "width:2.5rem;height:2.5rem;border-radius:50%;border:1px solid black";
            newClick.classList.add("click");

            newTime.innerText = Time().join("");
            newTime.classList.add("newTime");
            newItem.classList.add("todoItem");

            newDelete.classList.add("iconfont");
            newDelete.classList.add("icon-shanchu");
            newItem.appendChild(newClick);
            //加急处理
            if(urgentButton.style.backgroundColor == "rgb(240, 213, 213)"){
                var newUrgent = document.createElement("b");
                newUrgent.classList.add("Urgent");
                if(lang_flag===1){
                    newUrgent.innerText = "U";
                }
                else{
                    newUrgent.innerText = "急";
                }
                newItem.appendChild(newUrgent);
            }
            newItem.appendChild(newTitle);
            newItem.appendChild(newTime);
            //内容不为空处理
            if(contentText.value!=""){
                var newContent = document.createElement("i");
                newContent.classList.add("iconfont");
                newContent.classList.add("icon-shenglve");
                newItem.appendChild(newContent);
            }
            newItem.appendChild(newDelete)
            todoList.appendChild(newItem);
        }
        //添加将输入的内容保存到浏览器的操作（标题、内容、是否加急）
        var toDoListArr = toDoListLoad();
        // console.log("加载待办事项数组：",toDoListArr);//控制台显示数组的当前状态。这里打印完之后增加了数组内容，故打印出来的数组在控制台中的显示不是打印时的状态
        var toDoItem = {};
        toDoItem.title = title.value;
        toDoItem.content = contentText.value;
        toDoItem.time = Time().join("");
        toDoItem.finish = "false";
        if(urgentButton.style.backgroundColor == "rgb(240, 213, 213)"){
            toDoItem.isUrgent = "true";
        }else{
            toDoItem.isUrgent = "false";
        }
        
        toDoListArr.push(toDoItem);
        // console.log("更新后的待办事项数组：",toDoListArr);
        // console.log("第一个待办事项的内容：",toDoListArr[0]?.content);
        toDoListSave(toDoListArr);
        
        successAdd.style.display = "block";//添加成功提醒
        addItemForm.reset();
        urgentButton.style.backgroundColor = "white";
        tips.style.display = "none";
        if(searchContent.style.display === "flex"){
            todoList.style.display = "none";
        }else{
            todoList.style.display = "flex";
        }
        setTimeout(() => {
            successAdd.style.display = "none";
            shade.style.display = "none";
        }, 500);
        urgentFun();
    }
}



//点击添加按钮触发
add.addEventListener("click",(e)=>{
    e.preventDefault();
    addItem();
})
//Enter键提交触发
title.addEventListener("keypress",(e)=>{
    if(e.key=="Enter"){
        e.preventDefault();
        addItem();
    }
})
contentText.addEventListener("keypress",(e)=>{
    if(e.key == "Enter"){
        e.preventDefault();//不可以放在if外面，不然连数字都无法输入
        addItem();
    }
})


//选择“是否加急”效果
urgentButton.addEventListener("click",()=>{
    if(urgentButton.style.backgroundColor == "white"){
        urgentButton.style.backgroundColor = "rgb(240, 213, 213)";
    }else{
        urgentButton.style.backgroundColor = "white"
    }
})
//加急处理，类：Urgent



//点击右上角菜单按钮
menu.addEventListener("click",()=>{
    if(menu.classList.contains("open")){
        nav.style.display = "none";
        menu.classList.remove("open");
    }else{
        nav.style.display = "flex";
        menu.classList.add("open");
    }
    
})


//点击事件前面的圆圈打勾(通过事件委托)
document.body.addEventListener("click",(e)=>{
    var toDoListArr = toDoListLoad();
    var binListArr = BinListLoad();
    // console.log("全部",toDoListArr);
    // console.log("回收站",binListArr);
    if(e.target.classList.contains("click")){
        var children = Array.from(e.target.parentNode.parentNode.children);
        var index = children.indexOf(e.target.parentNode)-1;
        console.log(index);
        if(e.target.innerHTML == ""){
            e.target.innerHTML = "✔";
            if(todoList.classList.contains("home")){
                toDoListArr[index].finish = "true";
            }else{
                binListArr[index].finish = "true";
            }
        }else if(e.target.innerHTML == "✔"){
            e.target.innerHTML = "";
            if(todoList.classList.contains("home")){
                toDoListArr[index].finish = "false";
            }else{
                binListArr[index].finish = "false";
            }
        }
        toDoListSave(toDoListArr);
        BinListSave(binListArr);
    }
})

 //点击有内容事件的省略符号
 document.body.addEventListener("click",(e)=>{
    if(e.target.classList.contains("icon-shenglve")){
        detailContent.style.display = "flex";
        //更新显示的内容
        detailContent.querySelectorAll(".h3").forEach(item=>{
            item.remove();
        })
        detailContent.querySelectorAll(".h4").forEach(item=>{
            item.remove();
        })
        //显示标题和内容
        var title = document.createElement("h3");
        title.classList.add("h3");
        title.classList.add("newTitle");
        var content = document.createElement("h4");
        content.classList.add("h4");
        content.classList.add("newContent");
        //从浏览器本地获取内容
        var children = Array.from(e.target.parentNode.parentNode.children);
        var index = children.indexOf(e.target.parentNode)-1;
        var todoList = toDoListLoad();
        var binList = BinListLoad();
        if(main.classList.contains("home")){
            content.innerHTML = todoList[index].content;
            title.innerText= todoList[index].title;
        }else{
            content.innerHTML = binList[index].content;
            title.innerText = binList[index].title;
        }
        // console.log(content);

        // console.log(e.target.parentNode.children[1].innerText);
        Title.appendChild(title);
        Content.appendChild(content);
    }
    //点击×号关闭详细内容页
    closeContent.addEventListener("click", () => {
        detailContent.style.display = "none";
        title.remove();
        content.remove();
    })
})   


//点击“全部标为已完成”(对于动态添加的元素每次触发事件都要重新获取元素集合)
finishAll.addEventListener("click",()=>{
    const clickItems = document.querySelectorAll(".click");
    let toDoListArr = toDoListLoad();
    let binListArr = BinListLoad();
    clickItems.forEach((clickItem)=>{
        clickItem.innerHTML = "✔";
    })
    if(todoList.classList.contains("home")){
        toDoListArr.forEach(todoItem=>{
            todoItem.finish = "true";
        })
        toDoListSave(toDoListArr);
    }else{
        binListArr.forEach(binItem=>{
            binItem.finish = "true";
        })
        BinListSave(binListArr);
    }
    
})  
    // toDoListClear();
    // BinListClear();
// BinListClear();
// console.log(BinListLoad())
document.body.addEventListener("click",(e)=>{
    var todoList = toDoListLoad();
    var binList = BinListLoad();
    var children = Array.from(e.target.parentNode.parentNode.children);
    var index = children.indexOf(e.target.parentNode)-1;
    //点击垃圾桶符号将数据收到回收站
    if(e.target.classList.contains("icon-shanchu")){
        // console.log("所有事件",todoList);
        
        // console.log(index);
        var bin = todoList.splice(index,1);
        // console.log("删除的事件",bin);
        // console.log("删除完的事件",todoList);
        
        binList.push(...bin);//这里一开始直接向一个数组中再添加了一个数组，导致后面显示的时候赋值错误
        // console.log("回收站事件",binList);

        if(todoList.length==0){
            tips.style.display = "flex";
            main.style.display = "none";
        }
        e.target.parentNode.remove();
    }
    //点击返回符号将数据从回收站返回首页
    else if(e.target.classList.contains("icon-fanhui")){
        var todo = binList.splice(index,1);
        todoList.push(...todo);

        if(binList.length==0){
            tips.style.display = "flex";
            main.style.display = "none";
        }
        e.target.parentNode.remove();
        urgentFun();
    }
    toDoListSave(todoList);
    BinListSave(binList);
})
//点击“清除全部”
deleteAll.addEventListener("click",()=>{
    const todoItems = document.querySelectorAll(".todoItem");
    todoItems.forEach(todoItem=>{
        todoItem.remove();
    })
    //将事件添加到回收站
    var toDoListArr = toDoListLoad();
    var binListArr = BinListLoad();
    toDoListClear();
    binListArr.push(...toDoListArr);
    BinListSave(binListArr);
    tips.style.display = "flex";
    main.style.display = "none";
})




//语言悬浮切换样式
language.forEach((lang)=>{
    lang.addEventListener("click",()=>{
        language.forEach((languageItem)=>{
            languageItem.style.color = "#532a4b";
        })
        lang.style.color = "#d283c3";
    });
});
//加急处理(用数组的find方法)
var urgentFun = () => {
    var todoItems = document.querySelectorAll(".todoItem");
    var toDoListArr = toDoListLoad();

    // 遍历所有待办事项元素
    todoItems.forEach(todo => {
        var urgentElement = todo.querySelector(".Urgent");
        var newTitleElement = todo.querySelector(".newTitle");
        var newTimeElement = todo.querySelector(".newTime");

        // 检查是否为“加急”事项
        if(lang_flag===1){
            if (urgentElement && urgentElement.innerHTML === "U") {
                // console.log(todo);
                // 找到对应的数组项
                let urgentItem = toDoListArr.find(item => 
                    item.title === newTitleElement.innerHTML && 
                    item.time === newTimeElement.innerHTML
                );
    
                // 如果找到了对应的加急项
                if (urgentItem) {
                    // 从数组中移除该加急项
                    let index = toDoListArr.indexOf(urgentItem);
                    toDoListArr.splice(index, 1);
    
                    // 将加急项添加到数组末尾
                    toDoListArr.push(urgentItem);
    
                    // 从 DOM 中移除对应的元素
                    todo.remove();
    
                    // 创建新的待办事项元素并插入到 DOM 中
                    createToDoItem(urgentItem,main);
                }
            }
        }
        else{
            if (urgentElement && urgentElement.innerHTML === "急") {
                // console.log(todo);
                // 找到对应的数组项
                let urgentItem = toDoListArr.find(item => 
                    item.title === newTitleElement.innerHTML && 
                    item.time === newTimeElement.innerHTML
                );
    
                // 如果找到了对应的加急项
                if (urgentItem) {
                    // 从数组中移除该加急项
                    let index = toDoListArr.indexOf(urgentItem);
                    toDoListArr.splice(index, 1);
    
                    // 将加急项添加到数组末尾
                    toDoListArr.push(urgentItem);
    
                    // 从 DOM 中移除对应的元素
                    todo.remove();
    
                    // 创建新的待办事项元素并插入到 DOM 中
                    createToDoItem(urgentItem,todoList);
                }
            }
        }
    });
    // 保存修改后的数组
    toDoListSave(toDoListArr);
};




// console.log("总共",toDoListLoad());
// toDoListClear();
window.onload = ()=>{

    //加载待办事项函数
var loadToDoList = (arr)=>{
    var tips = document.querySelector(".tips");
    var main = document.querySelector(".main");
    main.querySelectorAll(".todoItem").forEach(item => {
        item.remove();
    });
    // main.innerHTML = "";//这句代码导致main里面的元素都被清空（包括detailContent），影响了后续点击省略号的操作
    //如果数组为空
    if(arr.length===0){
        main.style.display = "none";
        tips.style.display = "flex";
    }
    else{
        main.style.display = "flex";
        tips.style.display = "none";
        arr.forEach((toDoItem,index)=>{
            // console.log(toDoItem);
            createToDoItem(toDoItem,main);
        })
        urgentFun();
        
    }

}
    // toDoListClear();
    // BinListClear();
    // console.log(toDoListLoad());
    // console.log(BinListLoad());

    //默认显示待办事件
    var toDoListArr = toDoListLoad();
        loadToDoList(toDoListArr);

    if(main.classList.contains("home")){
        function showDeleteAll() {
            deleteAll.style.display = "block";
        }

        function hideDeleteAll() {
            deleteAll.style.display = "none";
        }
        // finishAll.removeEventListener("mouseover", showDeleteAll);
        finishAll.addEventListener("mouseover", showDeleteAll);
        // pullDown.removeEventListener("mouseover", showDeleteAll);
        deleteAll.addEventListener("mouseover", showDeleteAll);
        // finishAll.removeEventListener("mouseout", hideDeleteAll);
        finishAll.addEventListener("mouseout", hideDeleteAll);
        // pullDown.removeEventListener("mouseout", hideDeleteAll);
        deleteAll.addEventListener("mouseout", hideDeleteAll);
    }



    //点击菜单栏里的快捷键“全部”,显示首页todoList里的事件
    var goToDoListFun = ()=>{
        goToDoList.addEventListener("click", (e) => {
            e.preventDefault();
            searchContent.style.display = "none";
            // main.classList.add("todoList");
            todoList.classList.add("home");
            var toDoListArr = toDoListLoad();
            loadToDoList(toDoListArr);
            pullDown.classList.add("deleteAll");
            // if(lang_flag===1){
            //     pullDown.innerHTML = "deleteAll";
            // }else{
            //     pullDown.innerHTML = "全部清除";
            // }
            
            // console.log(main);
            //点击“清除全部”
            deleteAll.addEventListener("click", () => {
                const todoItems = document.querySelectorAll(".todoItem");
                todoItems.forEach(todoItem => {
                    todoItem.remove();
                })
                //将事件添加到回收站
                var toDoListArr = toDoListLoad();
                var binListArr = BinListLoad();
                toDoListClear();
                binListArr.push(...toDoListArr);
                BinListSave(binListArr);
                tips.style.display = "flex";
                main.style.display = "none";
            })
            
        })
    }
    goToDoListFun();
    //点击菜单栏里的快捷键“回收站”,显示回收站todoList里的事件
    var goBinFun = ()=>{
        goBin.addEventListener("click", (e) => {
            e.preventDefault();//阻止<a>默认行为
            searchContent.style.display = "none";
            // main.classList.remove("todoList");
            //这里添加显示回收站数据操作
            todoList.classList.remove("home");
            var binListArr = BinListLoad();
            // console.log("回收站",binListArr);
            loadToDoList(binListArr);
            pullDown.classList.remove("deleteAll");
            pullDown.classList.add("recoverAll");
            // if(lang_flag===1){
            //     pullDown.innerHTML = "recoverAll";
            // }else{
            //     pullDown.innerHTML = "全部恢复";
            // }
            
            // console.log(main);
    
             //将事件全部恢复到首页(问题是deleteAll会影响)
            var recoverAll = document.querySelector(".recoverAll");
            console.log(recoverAll);
            recoverAll.addEventListener("click",()=>{
                const binItem = document.querySelectorAll(".todoItem");
                // console.log(binItem);
                binItem.forEach(binItem=>{
                    binItem.remove();
                })
                //将事件添加到首页
                var toDoListArr = toDoListLoad();
                var binListArr = BinListLoad();
                toDoListArr.push(...binListArr);
                BinListClear();
                toDoListSave(toDoListArr);
                tips.style.display = "flex";
                main.style.display = "none";
            })
        })
    }
    goBinFun();

    //修改标题和内容
    document.body.addEventListener("dblclick", (e) => {
        var toDoListArr = toDoListLoad();
        var binListArr = BinListLoad();
        //修改标题
        if (e.target.classList.contains("newTitle")) {
            var newInput = document.createElement("input");
            var originalTitle = e.target.innerHTML;
            newInput.value = originalTitle;
            newInput.style.cssText = "height:3rem;border-radius:3px;border:1px solid #935887";
            e.target.innerHTML = "";
            e.target.appendChild(newInput);
            newInput.focus();
            newInput.addEventListener("keypress", (event) => {
                if (event.key === "Enter") {
                    e.target.innerHTML = newInput.value;
                    //保存新内容
                    if (main.classList.contains("home")) {
                        toDoListArr.forEach(todoItem => {
                            //在详细内容页修改标题（验证标题和内容）
                            if (e.target.parentNode.classList.contains("Title") && originalTitle === todoItem.title && e.target.parentNode.parentNode.children[2].querySelector(".newContent").innerText === todoItem.content) {
                                todoItem.title = newInput.value;
                            }
                            //在首页修改标题（验证标题和时间）
                            else if (e.target.parentNode.querySelector(".newTime").innerText === todoItem.time) {
                                todoItem.title = newInput.value;
                            }
                            toDoListSave(toDoListArr);
                        })

                    }
                    else {
                        binListArr.forEach(binItem => {
                            if (binItem.title === originalTitle) {
                                binItem.title = newInput.value;
                                BinListSave(binListArr);
                            }
                        })

                    }
                    newInput.remove();
                    if (e.target.innerHTML == "") {
                        e.target.parentNode.remove();//直接删除，不进入回收站
                    }
                }
                // location.reload();
                if (main.classList.contains("home")) {
                    goToDoListFun();
                } else {
                    goBinFun();
                }
                //在回收站修改完也会刷新跳到首页

            })
        }
        //修改内容
        else if (e.target.classList.contains("newContent")) {
            var newTexteara = document.createElement("textarea");
            var originalContent = e.target.innerHTML;
            newTexteara.value = originalContent;
            newTexteara.style.cssText = "height:5rem;border-radius:3px;border:1px solid #935887";
            e.target.innerHTML = "";
            e.target.appendChild(newTexteara);
            newTexteara.focus();
            newTexteara.addEventListener("keypress", (event) => {
                if (event.key === "Enter") {
                    e.target.innerHTML = newTexteara.value;
                    //保存新内容
                    if (main.classList.contains("home")) {
                        toDoListArr.forEach(todoItem => {
                            if (originalContent === todoItem.content) {
                                todoItem.content = newTexteara.value;
                                toDoListSave(toDoListArr);
                            }
                        })
                    }
                    else {
                        binListArr.forEach(binItem => {
                            //验证内容和标题
                            if (binItem.content === originalContent && e.target.parentNode.parentNode.children[1].querySelector(".newTitle").innerText === binItem.title) {
                                binItem.content = newTexteara.value;
                                BinListSave(binListArr);
                            }
                        })
                    }
                    newTexteara.remove();
                    if (e.target.innerHTML == "") {
                        e.target.parentNode.remove();//直接删除，不进入回收站
                    }
                }
            })
        }
    })
    //一键导出数据
    download.addEventListener("click",()=>{
        const toDoListArr = toDoListLoad();
        const binListArr = BinListLoad();
        console.log(toDoListArr)
        console.log(binListArr);
        if(main.classList.contains("home")){
            const blob = new Blob([JSON.stringify(toDoListArr,null,2)],{type:'text/plain'});
            download.setAttribute("download","toDoList.txt");
            const url = URL.createObjectURL(blob);
            download.href = url;
        }
        else{
            const blob = new Blob([JSON.stringify(binListArr,null,2)],{type:'text/plain'});
            download.setAttribute("download","binList.txt");
            const url = URL.createObjectURL(blob);
            download.href = url;
        }
        
        // var elementA = document.createElement("a");
        // elementA.href = url;
        // elementA.download = "todoList.txt";
        // elementA.click();
        // elementA.remove();
        // download.setAttribute("href",url);
    })
}
var Chinese = document.querySelector(".Chinese");
var English = document.querySelector(".English");
//英文切换
let ChineseWord = ['中','CN'];
let EnglishWord = ['英','EN'];
let finishAllWord = ['全部标为完成','finishAll'];
let deleteAllWord = ['全部清除','deleteAll']
let recoverAllWord = ['全部恢复','recoverAll']
let searchInputPlaceholder = ['请输入笔记标题','Please enter the title'];
let titleWord = ['标题：','Title:'];
let contentWord = ['内容：','Content:'];
let tipsWord = [
    ['首页和回收站页分别可以导出不同的笔记内容','The home page and the recycle bin page can export the notes respectively'],
     ['所有的笔记存储在浏览器本地','All of the notes are stored in the browser locally'],
    ['支持查询功能','Support query function'],
    ['右侧点开菜单栏有快捷操作','Click on the menu bar on the right for a shortcut'],
    ['双击可修改标题，进入详情页可修改内容','Double-click the modified title to enter the details page to modify the content'],
    ['所有提交操作支持Enter回车键提交','All submissions support Enter key missions'],
    ['用户指南','User Guide']
]
let allWord = ['全部','All'];
let binWord = ['回收站','Bin'];
let pleaseAdd = ['请输入待办事件','Please enter the todoItem'];
let downloadWord = ['导出数据','downloadData'];
let isUrgentWord = ['是否加急','isUrgent']
let addWord = ['添加','add'];
const changeLanguage = ()=>{
    Chinese.innerHTML = ChineseWord[lang_flag];
    English.innerHTML = EnglishWord[lang_flag];
    finishAll.innerHTML = finishAllWord[lang_flag];
    deleteAll.innerHTML = deleteAllWord[lang_flag];
    if(document.querySelector('.recoverAll')){
        document.querySelector('.recoverAll').innerHTML = recoverAllWord[lang_flag];
    }
    searchInput.placeholder = searchInputPlaceholder[lang_flag];//不生效噢
    document.querySelectorAll('.boxTitle').forEach(title=>{
        title.innerHTML = titleWord[lang_flag];
    })
    document.querySelectorAll('.boxContent').forEach(content=>{
        content.innerHTML = contentWord[lang_flag];
    })
    document.querySelectorAll(".tip").forEach((tipItem,index)=>{
        tipItem.innerHTML = tipsWord[index][lang_flag];
    })
    goToDoList.innerHTML = allWord[lang_flag];
    goBin.innerHTML = binWord[lang_flag];
    download.innerHTML = downloadWord[lang_flag];
    document.querySelector('.pleaseAdd').innerHTML = pleaseAdd[lang_flag];
    document.querySelector('.isUrgent').innerHTML = isUrgentWord[lang_flag];
    add.innerHTML = addWord[lang_flag];
}
English.addEventListener("click",()=>{
    // window.location.href = "English.html"
    // (lang_flag===0)?(lang_flag=1):(lang_flag=0);
    lang_flag=1
    changeLanguage();
})

Chinese.addEventListener("click",()=>{
    lang_flag=0;
    changeLanguage();
})
//动画效果
var rotate1 = document.querySelectorAll(".rotate1");

var rotateFun = ()=>{
    setInterval(()=>{
        rotate1[0].style.transform = "rotate(-60deg)";
        setTimeout(()=>{
            rotate1[1].style.transform = "rotate(-60deg)";
        },2000)
        setTimeout(()=>{
            rotate1[0].style.transform = "rotate(60deg)";
        },4000)
        setTimeout(()=>{
            rotate1[1].style.transform = "rotate(60deg)";
        },6000)
    },8000)
}

rotateFun();

