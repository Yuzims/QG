const uploadImg = document.querySelector('.uploadImg');
const uploadImgInput = document.querySelector('.uploadImgInput');
const upload = document.querySelector('.upload');
const runMessageShade = document.querySelector('.runMessageShade');
const cancelRunMessageShade = document.querySelectorAll('.cancelRunMessageShade');
const addLayer = document.querySelector('.addLayer');
const right = document.querySelector('.right');
const addModel = document.querySelector('.icon-zengjia');
const addModelShade = document.querySelector('.addModelShade')
const cancelAddModelShade = document.querySelector('.cancelAddModelShade');
const sureAddModelShade = document.querySelector('.sureAddModelShade')
const deleteModel = document.querySelector('.deleteModel');
const addMessageShade = document.querySelector('.addMessageShade');
const cancelAddMessage = document.querySelector('.cancelAddMessage');
const sureAddMessage = document.querySelector('.sureAddMessage');
const models = document.querySelector('.models');
const modelNameInput = document.querySelector('.modelNameInput');
const modelUrlInput = document.querySelector('.modelUrlInput');
const modelIntroInput = document.querySelector('.modelIntroInput');
const modelNameErr = document.querySelector('.modelNameErr');
const modelUrlErr = document.querySelector('.modelUrlErr');
const modelIntroErr = document.querySelector('.modelIntroErr');
const addModelForm = document.querySelector('.addModelForm');
const projectNameInput = document.querySelector('.projectNameInput');
const projectQuestionInput = document.querySelector('.projectQuestionInput');
const projectNameErr = document.querySelector('.projectNameErr');
const runProject = document.querySelector('.runProject');
const runMessageForm = document.querySelector('.runMessageForm');
const weight = document.querySelector('.weight');
const weightErr = document.querySelector('.weightErr');
const questionInput = document.querySelector(".question");

//几个弹窗信息
const loaded = document.querySelector('.loaded');
const loadErr = document.querySelector('.loadErr');
const layerEmpty = document.querySelector('.layerEmpty');
const repeatModel = document.querySelector(".repeatModel");
const noModel = document.querySelector(".noModel");
const serverResErr = document.querySelector('.serverResErr');
const overContainer = document.querySelector('.overContainer');


//把模型数据存储到localStorage
let saveModels = (arr)=>{
    localStorage.setItem('models',JSON.stringify(arr));
} 
//从localStorage读取模型数据
let loadModels = ()=>{
    let addedModels = localStorage.getItem('models');
    return addedModels?JSON.parse(addedModels):[];
}
//删除缓存再localStorage的模型数据
let deleteModels = ()=>{
    localStorage.removeItem('models');
}
//把工作台层级数据存到localStorage
let saveModelList = (modelListArr)=>{
    localStorage.setItem('modelList',JSON.stringify(modelListArr));
}
//读取工作台层级数据
let loadModelList = ()=>{
    let addedModelList = localStorage.getItem('modelList');
    return addedModelList?JSON.parse(addedModelList):[];
}
//删除工作台层级数据
let deleteModelList = ()=>{
    localStorage.removeItem('modelList');
}


//压缩图片
function compressImage(base64, maxWidth, maxHeight, quality) {
    return new Promise((resolve) => {
        const img = new Image();
        img.src = base64;
        img.onload = () => {
            let width = img.width;
            let height = img.height;

            // 计算压缩后的宽高比例
            const ratio = Math.min(maxWidth / width, maxHeight / height);
            width *= ratio;
            height *= ratio;

            const canvas = document.createElement('canvas');
            canvas.width = width;
            canvas.height = height;
            const ctx = canvas.getContext('2d');
            ctx.drawImage(img, 0, 0, width, height);

            // 获取压缩后的图片数据
            const compressedBase64 = canvas.toDataURL('image/jpeg', quality);
            resolve(compressedBase64);
        };
    });
}


const maxWidth = 55.5;
const maxHeight = 50;
const quality = 0.8;
// imgBase64.forEach(img=>{
//     let compressedImg =  compressImage(img,maxWidth,maxHeight,quality);
//     compressedBase64.push(compressedImg);
// })


//改变上传图片的样式
uploadImg.addEventListener("click", () => {
    uploadImgInput.click();
})
const imgBox = document.querySelector('.imgBox')
let imgBase64 = [];
uploadImgInput.onchange = ()=>{
    const files = uploadImgInput.files;
    for(let i=0;i<files.length;i++){
        const file = files[i];
        const reader = new FileReader()
        reader.onload = async (e)=>{
                

                
                const compressedBase64 = await compressImage(e.target.result,maxWidth,maxHeight,quality);
                const showImg = document.createElement('img');
                showImg.src = compressedBase64;
                // showImg.src = e.target.result;
                showImg.classList.add('img');
                // console.log(showImg.src);
                imgBox.appendChild(showImg);
                // imgBase64.push(e.target.result);
                console.log("压缩后的base64",compressedBase64);
                imgBase64.push(compressedBase64);
        };
        reader.readAsDataURL(file);
    }
}
// deleteModelList();
let isOriginalModelSaved = false;
//存储原始的三个模型到localStorage
let saveOriginalModels = ()=>{
    let originalModelsArr = []
    const originalModels = [
        {
            modelName:'openai',
            modelUrl:'https://chat.openai.com/',
            modelIntro:'由OpenAI开发，以强⼤的⾃然语⾔处理能⼒著称，⽀持多任务处理，⼴泛应⽤于对话、创作和代码⽣成，代表作为GPT系列模型。'
        },
        {
            modelName:'deepseek',
            modelUrl:'https://chat.deepseek.com/',
            modelIntro:'深度求索公司推出的开源⼤模型，专注⾼效推理与⻓⽂本处理，⽀持128K上下⽂，适合代码、数学及复杂逻辑任务。'
        },
        {
            modelName:'腾讯元宝',
            modelUrl:'https://yuanbao.tencent.com/',
            modelIntro:'腾讯推出的企业级⼤模型，强调安全与落地应⽤，⽀持多模态交互，适⽤于⾦融、医疗等⾏业场景优化。'
        }
    ]
    originalModelsArr.push(...originalModels);
    saveModels(originalModelsArr);
    localStorage.setItem('hasSavedOriginalModels','true');
}
// localStorage.removeItem('hasSavedOriginalModels');
const saveOriginalModelsOK = localStorage.getItem('hasSavedOriginalModels');
console.log("saveOriginalModels",saveOriginalModelsOK);
// console.log("loadModels",loadModels())
if(saveOriginalModelsOK==null){
    console.log("ok")
    saveOriginalModels();
}
// 
// deleteModels();




//点击上传之后出现右边侧边弹窗
let data = {};

console.log(loadModels())
upload.addEventListener('click', () => {
    
    runMessageShade.style.display = "flex";
    
    //确认
    runProject.addEventListener('click',async (e)=>{
        e.preventDefault();
        
        let projectEmpty = false;
        if(projectNameInput.value===""){
            projectNameErr.style.visibility = "visible";
            projectEmpty = true;
        }
        if(!projectEmpty){
            //只需要遍历页面上使用的所有层级（层级数）的模型（到localStorage中去和数组匹配找到对应的信息），结合每个层级的模型数量得出是否串行，还有上传页输入的内容
            let modelListArr = loadModelList();
            let empty = false;
            // console.log("test",modelListArr);
            // console.log(modelListArr[0]+"mdoelListArr[0]")
            // console.log(modelListArr[0].models+"modelListArr[0].models");
            if(modelListArr.length===0||(modelListArr[0]&&modelListArr[0].models&&modelListArr[0].models.length===0)){
                // if(modelListArr[0] && modelListArr[0].models && modelListArr[0].models.length === 0){
                //     showLayer(1);
                // }
                noModel.style.display = "block";
                runMessageShade.style.display = "none";
                setTimeout(()=>{
                    noModel.style.display = "none";
                },1000)
                empty = true;
            }
            if(!empty){
                // console.log("empty",empty)
                modelListArr.forEach(modelList=>{
                    if(modelList.models.length>1){
                        modelList.parallel = 1;
                    }
                })
                // console.log("修改完串行",modelListArr);
                saveModelList(modelListArr);
                // console.log(imgBase64);
                if(imgBase64.length===0){
                    // console.log("here");
                    data.image = "";
                }
                else if(imgBase64.length===1){
                    data.image = imgBase64[0];
                }else{
                    data.image = imgBase64;
                }
                data.content = projectQuestionInput.value;
                data.modelList = loadModelList();
                // console.log("loadModelList.modelList.models",loadModelList()[0].models)//
                // console.log("data.modelList.models",data.modelList[0].models);
                try {
                    //发送post请求
                    const response = await fetch('http://localhost:3000/api',{
                        method:'POST',
                        headers:{
                            'Content-Type':'application/json'
                        },
                        body:JSON.stringify(data)
                    })
                    //解析响应数据
                    // const resData = await response.json();
                    if(response.ok){
                        loaded.style.display = "block"
                        setTimeout(()=>{
                            loaded.style.display = "none";
                        },1000)
                        // console.log("客户端发送数据",)
                        // console.log("服务器响应数据",resData);//这里面的data就是请求体的内容
                    }else{
                        // console.log("服务器响应错误",resData);
                        // alert("服务器相应错误"+resData.message);
                        serverResErr.style.display = "block";
                        setTimeout(() => {
                            serverResErr.style.display = "none";
                        }, 1000);
                    }
                    deleteModelList();
                    // console.log(loadModelList(),"上传")
                } catch (error) {
                    loadErr.style.display = "block";
                    setTimeout(()=>{
                        loadErr.style.display = "none";
                    },1000)
                    // console.log(error)
                    // console.log(loadModelList());
                    deleteModelList();
                }

                imgBase64 = [];
            let allImg = document.querySelectorAll('.img');
            allImg.forEach(img=>{
                img.remove();
            })
            // console.log(data);
            runMessageShade.style.display = "none";
            projectNameErr.style.display = "none";
            runMessageForm.reset();
            right.innerHTML="";
            index=1;

            }
 
        }
    })
})
// deleteModelList();
// console.log(loadModelList())
//取消
cancelRunMessageShade.forEach(cancelRunMessageShadeItem => {
    cancelRunMessageShadeItem.addEventListener('click', () => {
        runMessageShade.style.display = "none";
        projectNameErr.style.visibility = "hidden";
    })
})
// 阻止表单提交

// document.addEventListener('DOMContentLoaded', () => {
//     const forms = document.querySelectorAll('form');
//     forms.forEach(form=>{
//         form.addEventListener('submit', (e) => {
//             e.preventDefault();
//             console.log('Form submission prevented.');
//         });
//     })
// });
//绑定回车提交事件
// let curentForm = null;
document.addEventListener("keypress",(e)=>{
    if(e.key==='Enter'){
        e.preventDefault();
    }
})

//绑定输入框的blur事件函数
let bindBlurEvent = (inputElement,errElement)=>{
    if(inputElement&&errElement){
        inputElement.addEventListener('blur',()=>{
            if(inputElement.value===""){
                errElement.style.visibility = "visible"
            }else{
                errElement.style.visibility = "hidden";
            }
        })
    }
}
//增加一个错误的指示然后再提交那里调用
//模型url信息验证函数
const urlFormatErr = document.querySelector('.urlFormatErr');
const existingModelErr = document.querySelector('.existingModelErr');
let urlCheck = (url)=>{
    const reg = /^(http|https):\/\/[\w]+\.[a-zA-Z]{2,}$/;
    const modelsArr = loadModels();
    modelUrlErr.style.display = "block";
    existingModelErr.style.display = "none";
    urlFormatErr.style.display = "none";
    if(url){
        if(!reg.test(url)){
            modelUrlErr.style.display = "none";
            urlFormatErr.style.display = "block"
            return true;
        }else{
            modelUrlErr.style.display = "block";
            urlFormatErr.style.display = "none";
            const item = modelsArr.find(item=>item.modelUrl === url);
            if(item){
                modelUrlErr.style.display = "none";
                existingModelErr.style.display = "block";
                return true;
            }else{
                modelUrlErr.style.display = "block";
                existingModelErr.style.display = "none";
                return false;
            }
        }
    }
}
//绑定blur（url验证错误）
modelUrlInput.addEventListener('blur',()=>{
    urlCheck(modelUrlInput.value);
})
//点击模型库的加号添加模型


bindBlurEvent(modelNameInput,modelNameErr);
bindBlurEvent(modelUrlInput,modelUrlErr);
bindBlurEvent(modelIntroInput,modelIntroErr);
bindBlurEvent(projectNameInput,projectNameErr);
bindBlurEvent(weight,weightErr);
//显示模型函数
let showModels = (model)=>{
    const newModel = document.createElement('div');
            const newModelName = document.createElement('span');
            const newModelIntro = document.createElement('i');
            newModel.classList.add('dragObj');
            newModel.draggable = "true";
            newModelName.innerHTML = model.modelName;
            newModelIntro.classList.add('displayNone');
            newModelIntro.innerHTML = model.modelIntro;
            newModel.appendChild(newModelName);
            newModel.appendChild(newModelIntro);
            models.appendChild(newModel);
}
addModel.addEventListener("click", () => {
    addModelShade.style.display = "flex";
})
//取消
cancelAddModelShade.addEventListener('click', (e) => {
    e.preventDefault();
    addModelShade.style.display = "none";
    modelNameErr.style.visibility = "hidden";
    modelUrlErr.style.visibility = "hidden";
    modelIntroErr.style.visibility = "hidden";
})

//确认(这里增加判断三个输入不为空),增加成功之后存储到localStorage并显示在页面模型库(记得对新模型添加draggable)
//增加模型函数
const addModelFun = ()=>{
    let isEmpty = false;
    if (modelNameInput.value.trim() === "") {
        modelNameErr.style.visibility = "visible";
        isEmpty = true;
    }
    if (modelUrlInput.value.trim() === "") {
        modelUrlErr.style.visibility = "visible";
        isEmpty = true;
    }
    if (modelIntroInput.value.trim() === "") {
        modelIntroErr.style.visibility = "visible";
        isEmpty = true;
    }
    if (urlCheck(modelUrlInput.value)) {
        isEmpty = true;
    }
    if (!isEmpty) {
        //页面上显示新增的模型
        const newModel = document.createElement('div');
        const newModelName = document.createElement('span');
        const newModelIntro = document.createElement('i');
        newModel.classList.add('dragObj');
        newModel.draggable = "true";
        newModelName.innerHTML = modelNameInput.value;
        newModelIntro.classList.add('displayNone');
        newModelIntro.innerHTML = modelIntroInput.value;
        newModel.appendChild(newModelName);
        newModel.appendChild(newModelIntro);
        models.appendChild(newModel);
        //把数据存储到localStorage
        let modelsArr = loadModels();
        let model = {};
        model.modelName = modelNameInput.value;
        model.modelUrl = modelUrlInput.value;
        model.modelIntro = modelIntroInput.value;
        modelsArr.push(model);
        saveModels(modelsArr);
        console.log(loadModels());
        addModelShade.style.display = "none";
        addModelForm.reset();
    }
}
sureAddModelShade.addEventListener('click', (e) => {
    e.preventDefault();
    addModelFun();
})
const bindAddMedelEvent = (inputElement)=>{
    inputElement.addEventListener("keypress",(e)=>{
        if(e.key==="Enter"){
            addModelFun();
        }
    })
}
bindAddMedelEvent(modelNameInput);
bindAddMedelEvent(modelUrlInput);
bindAddMedelEvent(modelIntroInput);
// deleteModels();
// deleteModelList();
//增加层级
let index = 1;
let over = false;
addLayer.addEventListener('click', () => {
    //超过最大模型容量
    const allLayer = document.querySelectorAll('.layer');
    let height = 0;
    allLayer.forEach(layer=>{
        height+=layer.offsetHeight;
    })
    if(height>=3000){
        overContainer.style.display = "block";
        over = true;
        setTimeout(() => {
            overContainer.style.display = "none";
        }, 1000);
    }else{
        over = false;
    }
    if(!over){
        const exitLayerBox = right.querySelectorAll('.layerBox');
    let hasEmptyLayerBox = false;
    // console.log(exitLayerBox);
    if (exitLayerBox) {
        exitLayerBox.forEach((exitLayerBoxItem) => {
            if (exitLayerBoxItem.innerHTML === '') {
                layerEmpty.style.display = "block";
                setTimeout(() => {
                    layerEmpty.style.display = "none";
                }, 1000);
                hasEmptyLayerBox = true;
                return;//退出当前回调函数
            }
        })
    }
    if (hasEmptyLayerBox) {
        return;
    }
    //将层级数据保存到localStorage
    let modelLayer = {};
    modelLayer.layer = index;
    modelLayer.parallel = 0;
    modelLayer.models = [];//之后添加模型之后往这里加模型
    let modelListArr = loadModelList();
    modelListArr.push(modelLayer);
    saveModelList(modelListArr);
    console.log("添加层级",loadModelList());
    showLayer(index);
    index++;
    }
    
})

//显示层级函数
const showLayer = (index)=>{
    //将层级显示在页面上
    let layer = document.createElement('div');
    let layerHeader = document.createElement("div");
    let layerBox = document.createElement('div');
    let layerTitle = document.createElement('span');
    let deleteIcon = document.createElement('i');
    layer.classList.add('layer');
    layerHeader.classList.add('layerHeader');
    layerTitle.classList.add('layerTitle')
    layerTitle.innerHTML = `层级${index}`;
    
    deleteIcon.classList.add('iconfont');
    deleteIcon.classList.add('icon-shanchu');
    deleteIcon.classList.add('deleteLayer');
    layerBox.classList.add('layerBox');
    // layerBox.innerHTML = ("hellp");
    layerHeader.appendChild(layerTitle);
    layerHeader.appendChild(deleteIcon);
    layer.appendChild(layerHeader);
    layer.appendChild(layerBox);
    right.appendChild(layer);
}

//删除层级
document.addEventListener('click',(e)=>{
    if(e.target.classList.contains("deleteLayer")){
        //更新localStorage层级数据
        let modelListArr = loadModelList();
        let deleteTitle = e.target.previousSibling;
        console.log("deleteTitle",deleteTitle);
        let allLayerTitle = document.querySelectorAll('.layerTitle');
        let deleteIndex = 0;
        allLayerTitle.forEach((title,titleIndex)=>{
            if(title.innerHTML===deleteTitle.innerHTML){
                deleteIndex = titleIndex;
                return;
            }
        })
        // console.log("下标",deleteIndex);
        // console.log('删除前',loadModelList());
        modelListArr.splice(deleteIndex,1);
        // console.log("删除的层级",modelListArr.splice(deleteIndex,1))
        saveModelList(modelListArr);
        // console.log("删除层级后",loadModelList());

        //从页面删除层级
        let layer = e.target.parentNode.parentNode;
        layer.remove();
        index--;
        let layerHeader = document.querySelectorAll('.layerHeader');
        layerHeader.forEach((layerHeaderItem,i)=>{
            layerHeaderItem.querySelector('span').innerHTML = `层级${i+1}`;
        })
    }
})
// deleteModelList();
// console.log(loadModelList())

//封装找出层级内的模型的层级下标以及层级内的模型下标函数

// let findLayerIndex = ((model)=>{
//     //找出所在层级
//     let layerIndex = 0;
//     const title = model.parentNode.previousSibling.children[0];
//     let allLayerTitle = document.querySelectorAll('.layerTitle');
//     allLayerTitle.forEach((layerTitle,titleIndex)=>{
//         if(layerTitle.innerHTML===title.innerHTML){
//             layerIndex = titleIndex;
//             // console.log("层级下标",layerIndex);
//             return layerIndex;
//         }
//     })
// })
// let findModelIndex = (model,arr)=>{
//     //找出操作模型下标
//     const layerIndex = findLayerIndex(model);
//     // let models = arr[layerIndex].models;
//     let operationModel =  arr[layerIndex].models.find(item=>item.modelName===model.children[0].innerHTML)
//     // console.log(deleteDragObj);
//     // console.log(deleteDragObj.children[0]);
//     let modelIndex = arr[layerIndex].models.indexOf(operationModel);
//     return modelIndex;
// }

// const findIndex = ((showDetailMess)=>{
//     const modelListArr = loadModelList();
//         //找出所在层级
//         let layerIndex = 0;
//         const title = showDetailMess.parentNode.previousSibling.children[0];
//         let allLayerTitle = document.querySelectorAll('.layerTitle');
//         allLayerTitle.forEach((layerTitle,titleIndex)=>{
//             if(layerTitle.innerHTML===title.innerHTML){
//                 layerIndex = titleIndex;
//             }
//         })
//         console.log("层级下标",layerIndex);

//         //找出显示信息模型下标
//         let models = modelListArr[layerIndex].models;
//         let showDetailMessModel =  models.find(item=>item.modelName===showDetailMess.children[0].innerHTML);
//         let modelIndex = models.indexOf(showDetailMessModel);
//         return [models,modelIndex];
//     })


// deleteModelList();
window.onload = () => {
    deleteModelList();
    console.log(loadModelList());
    //拖拽功能
    const models = document.querySelector('.models');
    // console.log(layerBox)
    let dragObj = null;
    let dragObjIntro = null;
    // let layerBox = null;
    let currentDragOverTarget = null;
    let deleteDragObj = null;
    let deleteModelItem = null;
    //事件委托为每一个模型绑定dragstart事件
    document.addEventListener('dragstart', (e) => {
        if (e.target.classList.contains('dragObj')) {
            dragObj = e.target;
            dragObjIntro = e.target.querySelector('.displayNone');
            if (dragObjIntro) {
                dragObjIntro.style.display = "none";
            }
            // console.log('dragObj:', dragObj);
            // console.log('dragObjIntro:', dragObjIntro);
        //对于层级里的模型绑定删除操作
        if(e.target.parentNode.classList.contains('layerBox')){
            deleteDragObj = e.target;
            console.log("deleteDragObj",deleteDragObj);
        }
        //对模型库里的模型绑定删除操作
        else if(e.target.parentNode.classList.contains('models')){
            deleteModelItem = e.target;
        }
    }
})
   
    //为每一个层级绑定dragover事件
    document.addEventListener('dragover', (e) => {
        e.preventDefault();
        e.stopPropagation();
        if(e.target.classList.contains('right')){
            currentDragOverTarget = null;
        }
        else if (e.target.classList.contains('layerBox')) {
            // console.log("layerBox", layerBox)
            currentDragOverTarget = e.target;
        }else if(e.target.classList.contains("deleteModel")){
            console.log("deleltModel");
            currentDragOverTarget = e.target;
        }
    })
        // deleteModelList();
        // console.log("层级",loadModelList());
    //为每个层级绑定drop事件
    document.addEventListener('drop', (e) => {
        console.log("dragOver",currentDragOverTarget);
        e.preventDefault();
        e.stopPropagation();
        if (currentDragOverTarget&&dragObj&&currentDragOverTarget.classList.contains('layerBox')) {
            //两种防止添加相同模型到一个层级中的方法（原理类似）
            let existingDragObj = currentDragOverTarget.querySelector('.dragObj');
            while(existingDragObj){
                if(existingDragObj.querySelector('span')?.innerHTML === dragObj.querySelector('span')?.innerHTML){
                    // console.log("same");
                    repeatModel.style.display = "block";
                    setTimeout(()=>{
                        repeatModel.style.display = "none";
                    },1000)
                    return;
                }
                existingDragObj = existingDragObj.nextElementSibling;
            }   
            // let hasTheSameModel = false;
            // if(currentDragOverTarget.querySelector('.dragObj')){
            //     if(currentDragOverTarget.querySelector('.dragObj').querySelector('span')?.innerHTML===dragObj.querySelector('span')?.innerHTML){
            //         hasTheSameModel = true;
            //         return;
            //     }
            // }

            //保存层级中的模型数据到localStorage
            let modelListArr = loadModelList();
            let modelsArr = loadModels();
            //层级下标
            let layerIndex = 0;
            //拖拽模型url
            let url = '';
            //找到层级的下标
            const layerTitle = currentDragOverTarget.parentNode.querySelector('.layerHeader').querySelector('span');
            let allLayerTitle = document.querySelectorAll('.layerTitle');
            allLayerTitle.forEach((title,titleIndex)=>{
                if(title.innerHTML===layerTitle.innerHTML){
                    layerIndex = titleIndex;
                }
            })
            //找到拖拽模型的url
            
            let dragModel = modelsArr.find(model => model.modelName === dragObj.querySelector('span')?.innerHTML);
            if (dragModel) {
                url = dragModel.modelUrl;
            }
            let model = {};
            model.modelName = dragObj.querySelector('span')?.innerHTML || '';
            model.modelUrl = url;
           
            model.weight = 1;
            
            modelListArr[layerIndex].models.push(model);
            saveModelList(modelListArr);
            console.log('添加模型',loadModelList());
            console.log("添加模型的详细信息",modelListArr[layerIndex].models);
            let draggedObj = document.createElement('div');
            let modelName = document.createElement('span');
            let modelIntro = document.createElement('i');
            draggedObj.classList.add('dragObj');
            draggedObj.classList.add('addDetailMess');
            draggedObj.draggable = "true";
            modelName.innerHTML = dragObj.querySelector('span')?.innerHTML || '';//防止找不到span元素
            modelIntro.innerHTML = dragObjIntro?.innerHTML || '';//防止dragObjIntro不存在
            modelIntro.classList.add('displayNone');
            draggedObj.appendChild(modelName);
            draggedObj.appendChild(modelIntro);
            currentDragOverTarget.appendChild(draggedObj);
        }
        //拖拽删除功能
        else if(currentDragOverTarget&&currentDragOverTarget.classList.contains('deleteModel')){
            // console.log(deleteDragObj)
            if(deleteDragObj){
                //从localStorage中删除
                let modelListArr = loadModelList();
                // let layerIndex = findLayerIndex(deleteDragObj);
                // let deleteModelIndex = findModelIndex(deleteDragObj,modelListArr);
                // let allIndex = findIndex();
                //找出所在层级
                let layerIndex = 0;
                const title = deleteDragObj.parentNode.previousSibling.children[0];
                let allLayerTitle = document.querySelectorAll('.layerTitle');
                allLayerTitle.forEach((layerTitle,titleIndex)=>{
                    if(layerTitle.innerHTML===title.innerHTML){
                        layerIndex = titleIndex;
                    }
                })
                console.log("层级下标",layerIndex);

                //找出删除模型下标
                let models = modelListArr[layerIndex].models;
                let deleteModel =  models.find(item=>item.modelName===deleteDragObj.children[0].innerHTML)
                
                // console.log(deleteDragObj);
                // console.log(deleteDragObj.children[0]);
                let deleteModelIndex = models.indexOf(deleteModel);
                console.log("模型下标",deleteModelIndex);
                console.log("删除模型前",loadModelList());
                // console.log("删除模型",models.splice(deleteModelIndex,1))//这里打印会导致splice再执行一次
                models.splice(deleteModelIndex,1);
                // console.log("allIndex",allIndex);
                // allIndex[0].splice[allIndex[1],1]
                saveModelList(modelListArr);
                console.log("删除模型后的层级",models);
                console.log("删除模型后",modelListArr);
                console.log('删除模型后重新获取',loadModelList());
                deleteDragObj.remove();
                deleteDragObj = null;
            }
            else if(deleteModelItem){
                //删除localStorage中的内容
                let modelsArr = loadModels();
                let deleteItem = modelsArr.find(item=>
                    item.modelName === deleteModelItem.querySelector('span').innerText);
                if(deleteItem){
                    //从数组中移除该项
                    let i = modelsArr.indexOf(deleteItem);
                    modelsArr.splice(i,1);
                }
                saveModels(modelsArr);
                // console.log("删除后",loadModels());
                deleteModelItem.remove();
                deleteModelItem = null;
            }
        }
        currentDragOverTarget = null;
    })
    // localStorage.removeItem('hasSavedOriginalModels');
// deleteModelList();
// deleteModels();
    document.addEventListener('dragend',(e)=>{
        e.preventDefault();
        //鼠标悬浮在模型上显示简介
        if(e.target.classList.contains("dragObj")){
            e.target.addEventListener("mouseover",()=>{
                const introElement = e.target.querySelector('.displayNone');
                if(introElement){
                    introElement.style.display = "block"  
                }
            }) 
            e.target.addEventListener("mouseout",()=>{
                const introElement = e.target.querySelector('.displayNone');
                if(introElement){
                    introElement.style.display = "none"  
                }
            }) 
        }
    })



    //为每个层级里的模型绑定点击事件（添加权重等信息）
    // deleteModelList();
    let showDetailMess = null;
    document.addEventListener('click',(e)=>{
        if(e.target.classList.contains('addDetailMess')||e.target.closest('.addDetailMess')){
            // console.log("click");
            addMessageShade.style.display = "flex";
            showDetailMess = e.target;
            //从localStorage读取权重和提示词
            const modelListArr = loadModelList();
            //找出所在层级
            let layerIndex = 0;
            console.log("show",showDetailMess);
            let title = null;
            if(e.target.classList.contains('addDetailMess')){
                title = showDetailMess.parentNode.previousElementSibling.children[0];
            }else if(e.target.closest('.addDetailMess')){
                title = showDetailMess.parentNode.parentNode.previousElementSibling.children[0];
            }
            console.log(title);
            let allLayerTitle = document.querySelectorAll('.layerTitle');
            allLayerTitle.forEach((layerTitle,titleIndex)=>{
                if(layerTitle.innerHTML===title.innerHTML){
                    layerIndex = titleIndex;
                }
            })
            console.log("层级下标",layerIndex);

            //找出显示信息模型下标
            let models = modelListArr[layerIndex].models;
            let showDetailMessModel = null;
            if(e.target.classList.contains('addDetailMess')){
                showDetailMessModel =  models.find(item=>item.modelName===showDetailMess.children[0].innerHTML)
            }else if(e.target.closest('.addDetailMess')){
                showDetailMessModel =  models.find(item=>item.modelName===showDetailMess.innerHTML)
            }
            // console.log(deleteDragObj);
            // console.log(deleteDragObj.children[0]);
            let showDetailMessModelIndex = models.indexOf(showDetailMessModel);
            weight.value = models[showDetailMessModelIndex].weight;
            if(models[showDetailMessModelIndex].question){
                questionInput.value = models[showDetailMessModelIndex].question;
            }

            //确认（添加权重等信息）
            let weightEmpty = false;
            sureAddMessage.addEventListener('click',(event)=>{
                event.preventDefault();
                //这里把信息存储
                if(weight.value===""){
                    weightErr.style.visibility = "visible"
                    weightEmpty = true;
                }else{
                    weightErr.style.visibility = "hidden";
                    weightEmpty = false;
                }
                if(!weightEmpty){
                    //存储数据到localStorage
                    if(weight.value!='1'){
                        models[showDetailMessModelIndex].weight = parseInt(weight.value);//input的值为字符串
                    }
                    if(questionInput.value){
                        
                        models[showDetailMessModelIndex].question = questionInput.value;
                    }
                    saveModelList(modelListArr);
                    addMessageShade.style.display = "none"
                }
                
            })

        }
        
    })
    //取消（添加权重等信息）
    cancelAddMessage.addEventListener('click',(e)=>{
        e.preventDefault();
        addMessageShade.style.display = "none"
    })
    
    //每次页面刷新时显示所有添加的模型
    let modelsArr = loadModels();
    modelsArr.forEach(model=>{
        showModels(model);
    })
}
