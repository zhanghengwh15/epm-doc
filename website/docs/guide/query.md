# 页面查询样式
## 前期准备
### 引入CSS
- 先引入CSS文件
``` css
<link rel="stylesheet" type="text/css" href="/webjars/epm/font/icomoon.css"/>
<link rel="stylesheet" type="text/css" href="/webjars/epm/themes/default/style.css ">
<link rel="stylesheet" type="text/css" href="/webjars/epm/css/custom.css"/>
<link rel="stylesheet" type="text/css" href="/webjars/epm/plugins/nav-menu/NavMenu.min.css">
```
- 再在当前页面引入CSS

``` css
.pull-right {
    float: right!important;
    width: 90%;
}
.grid-table-c .wui-grid-searchBar [ui-control=toolBar] {
    float: none;
}
.jqgrow {
    cursor: pointer;
}
.searchtitle{text-align: right}
.portlet {
    padding: 0;
    overflow: hidden;
}

.portlet-body {
    padding: 10px;
    margin: 0 20px;
}
.wui-tagsinput{
    display: inline-block;
    width:200px;
}
.item-content .item-label{
    color: #999999;
    text-align: right;
    min-height: 10px;
    width: 70px;
    font: 13px/28px "Microsoft Yahei","Helvetica Neue","Helvetica, Arial",sans-serif;
}
.tag-container.wui-input{
    border:none;
}
#emergency,#isReaded{
    display: none;
}
.ui-jqgrid {
    margin-top: 0;
}
.plan{
    padding:0;
}
.portlet-body{
    margin:0 10px;
}
.plan-table tbody {
    border-left: none;
    border-right: none;
}
.search-input-container{
    font-family: Microsoft YaHei;
    font: normal 13px/1.6 'Helvetica Neue', 'Lucida Grande', Helvetica, Arial, sans-serif;
}
.searchName{
    float: left;
    color: #999999;
    font-weight: 700;
    margin-left: 14px;
    margin-top: 5px;
}

```
### 引入JS
- 引入JS文件
``` js
<script type="text/javascript" src="/webjars/epm/plugins/nav-menu/nav-menu.js"></script>
```
## 开发
### HTML
- 以我自己的查询条件为例，可以自行修改，input 标签中的 field 的值要跟实体类对应的字段一直，这样子才能实现查询，还有 dataType 这个可以自定义的，js 中要获取来比较。
``` html
 <div class="nav-toolbar">
      <div class="nav-menu-wraper">
          <div class="search-input-container clearfix">
              <lable class="searchName">系统设备名称:</lable>
              <div class="search-bar">
                  <input type="text" id="equipmentName" class="search-input" placeholder="搜索系统设备" data-searchrule='{"field":"equipmentName","op":"cn","type":"text"}'>
                  <a href="javascript:;" id="refreshgrid" class="fa fa-search"  wui-grid-action="search" ></a>
              </div>
          </div>
          <input type="hidden"  value="" id="projectBelongHidden" data-searchrule='{"field":"projectBelong","op":"eq","type":"text"}'>
          <div id="projectBelong" label="所属项目:" data-key="msgType"
               data-searchrule='{"field":"set_template_id","op":"eq","type":"text"}'
               data-components="1"
               data-components-init='{"type":"selectBox","dataType":"projectBelongSelect","selectType":"data","text":"name","name":"value","dataRow":"rows"}'
          ></div>
          <input type="hidden"  value="" id="equipmentTypeHidden" data-searchrule='{"field":"equipmentType","op":"eq","type":"text"}'>
          <div id="equipmentTypeDiv" label="设备类型:" data-key="equipmentTypeDiv"
               data-searchrule='{"field":"set_template_id","op":"eq","type":"text"}'
               data-components="1"
               data-components-init='{"type":"selectBox","dataType":"equipmentTypeSelect","selectType":"data","text":"name","name":"value","dataRow":"rows"}'
          ></div>
          <input type="hidden"  value="" id="processStateHidden" data-searchrule='{"field":"processState","op":"eq","type":"text"}'>
          <div id="processState" label="进度状态:" data-key="msgType"
               data-searchrule='{"field":"set_template_id","op":"eq","type":"text"}'
               data-components="1"
               data-components-init='{"type":"selectBox","dataType":"processStateSelect","selectType":"data","text":"name","name":"value","dataRow":"rows"}'
          ></div>
          <input type="hidden"  value="" id="businessSegmentHidden" data-searchrule='{"field":"businessSegment","op":"eq","type":"text"}'>
          <div id="businessSegment" label="业务环节:" data-key="msgType"
               data-searchrule='{"field":"set_template_id","op":"eq","type":"text"}'
               data-components="1"
               data-components-init='{"type":"selectBox","dataType":"businessSegmentSelect","selectType":"data","text":"name","name":"value","dataRow":"rows"}'
          ></div>
      </div>
      <span id="nav-show-more" data-status="up" class="fa fa-caret-down"></span>
      <!--<span id="nav-show-all" data-status="up">[收起]</span>-->
  </div>
```

### JS

- 先进行基本初始化
``` js
// 定义用到的数据类型
var dataList = {};
var selectBoxList = {};
var projectBelongSelectArr = [];
// 在 loadPageInfo 函数中添加该函数
// 搜索条件展开和隐藏
  showMore();
```
- 定义 dataList，这里就是用来显示每一项显示的数据，其中 projectBelongSelectArr 是要从后台获取的，自己写了一个同步的 ajax 请求来获取，如果写了要从后台获取数据，那么要在初始化时调用

``` js
// 数据列表
dataList={
    equipmentTypeSelect : projectBelongSelectArr,
    processStateSelect : [{name:'已完成',value:1},{name:'未开始',value:2},{name:'进行中',value:3},{name:'延迟',value:3},{name:'严重逾期',value:3}],
    businessSegmentSelect : [{name:'需求书',value:1},{name:'设计联络',value:2},{name:'样机测试',value:3},
    {name:'生产监造',value:3},{name:'出厂检验',value:3},{name: '设备到货', value: 5}, {name: '安装调试',value:4}]
};
// 获取设备类型
var _getEquipmemntType = function() {
    var success = function(response) {
        if (response != null) {
            for (var i = 0; i < response.length; i++) {
                var tempObj = {};
                tempObj.name = response[i];
                tempObj.value = response[i];
                projectBelongSelectArr.push(tempObj);
            }
        }
    };
    var fail = function(response) {
        wui.errorNotice("获取设备类型出错了，刷新重试")
    };
    elecSystemEquipmentService.getEquipmemntType(success, fail);
};

```
- 定义获取参数函数，不能使用代码生成的方法
``` js
//查询参数封装
var _getQueryParams = function () {
    // 获取搜索条件
    var searchToolValue = wui.getForm(".nav-menu-wraper");
    searchToolValue.contentext = $("#contentext").val()||"";
    var searchRules = [];
    for (var key in searchToolValue) {
        if ($("#" + key).attr("data-searchrule") && searchToolValue[key] && searchToolValue[key].length > 0) {
            if (searchToolValue[key] instanceof Array) {
                if (searchToolValue[key].length === 0) {
                    continue;
                }
                searchToolValue[key] = searchToolValue[key][0];
            }
            var theSearchRule = $("#" + key).attr("data-searchrule");
            var insertResult = theSearchRule.insert(",\"data\":\"" + searchToolValue[key].replace(/\\/g, '\\\\').replace(/\"/g, '\\"') + "\"", (theSearchRule.length - 1));
            searchRules.push(JSON.parse(insertResult));
        }
    }

    //保存查询参数
    var EPMLocalDomain = {
        filters: {"groupOp": "AND", "rules": searchRules}
    };
    return EPMLocalDomain;
};
```
-- 以下是最核心的 js，这里的 dataType 的判断就是前面 HTML 中定义的那个，还有就是 HTML 中 input 标签的 id 会在判断是相同的 dataType 后进行赋值，所以 id 也要保持一致
``` js
var selectBoxInit = function(){
    $("[data-components]").each(function (i) {
        var initParam = JSON.parse($(this).attr("data-components-init"));
        // var sarechRule = JSON.parse($(this).attr("data-searchrule"));
        var selector = $(this).attr("id");
        var dataType = initParam.dataType;
        var data_components=$(this).attr("data-components");
        //组件chush初始化值
        var _initSelectBoxParam = {
            data: dataList[dataType],
            text: initParam.text,
            name: initParam.name,
            // value:dataType=="msgTypeSelect"?returnValue.messagetype:"",
            select:function (data) {
                if(data === 'all'){
                    data='';
                    if(dataType === "receiveTimeSelect"){
                        $("#receiveTimeBegin").val(data);
                        uiGrid.searchGrid(_getQueryParams().filters.rules);
                        return;
                    }
                }
                var selectValue = data;
                if(dataType === "projectBelongSelect"){
                    $("#projectBelongHidden").val(data)
                }else if(dataType === "processStateSelect"){
                    $("#processStateHidden").val(data)
                }else if(dataType === "businessSegmentSelect"){
                    $("#businessSegmentHidden").val(data)
                }else if(dataType === "equipmentTypeSelect"){
                    $("#equipmentTypeHidden").val(data)
                }
                EPMLocalDomain.uiGrid.searchGrid(_getQueryParams().filters.rules);
            }
        }
        //初始化下拉框
        var _selectBox = getNavMenu(selector,_initSelectBoxParam);
        //添加到组件集合里面
        selectBoxList[dataType] = _selectBox;
    })
}
selectBoxInit();
 ```
