//删除本条微博
function del_weibo(id){
    console.log(id);
    var postdata = "mid="+id;
    fetch("https://www.weibo.com/aj/mblog/del?ajwvr=6", 
    {
        "credentials":"include",
        "headers":{
                "content-type":"application/x-www-form-urlencoded",
        },
        "referrer":"https://www.weibo.com",
        "body":postdata,
        "method":"POST","mode":"cors"
    }).then(response => console.log(response) )
    .then(data => console.log(data))
    .catch(error => console.log(error));
}

//删除本页全部微博
function del_page(){
    var wb_list = document.querySelectorAll(".S_txt2");
    if(wb_list.length == 0){
        console.log("暂无可删除微博");
    }
    for(var t of wb_list){
        if(t.name){
            //限制请求速度
            setTimeout(function(t) {
                del_weibo(t.name);
                var pppp_node = t.parentNode.parentNode.parentNode.parentNode;
                pppp_node.parentNode.removeChild(pppp_node);
            }, 1500,t);
        }
    }
}


// 刷新微博页面
function auto_update_page(){
    var pages = document.querySelectorAll(".W_pages > a");
    if(pages.length > 0){
        var next_page = pages[pages.length-1];
        console.log("下一页");//or上一页...
        next_page.click();
    }else{
        console.log(new Date().toLocaleTimeString() + "：加载中，请稍等");
        window.scrollTo(0, 100000);//滚动到最低部（触发自动加载微博）
    }
}

function del_all_weibo(){
    del_page();
    auto_update_page();//尝试自动刷新
}

// 定时执行删除
window.setInterval(del_all_weibo, 5000);
