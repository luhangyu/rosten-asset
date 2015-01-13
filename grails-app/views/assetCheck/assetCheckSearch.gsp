<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
<head>
<meta http-equiv="content-type" content="text/html; charset=UTF-8">
<style type="text/css">
	
</style>
<script type="text/javascript">
require(["rosten/app/Application"],function(){
	search_selectDepart = function(){
		rosten.selectDepart("${createLink(controller:'system',action:'departTreeDataStore',params:[companyId:company?.id])}",true,"check_userDepart","check_userDepartIds",false);
	};
});
         

	
</script>
</head>
<body>
	<div class="searchtab">
      <table width="100%" border="0">
        
        <tbody>
          <tr>
            <th width="8%">资产编号</th>
            <td width="18%">
            	<input id="check_registerNum" data-dojo-type="dijit/form/ValidationTextBox" 
                	data-dojo-props='trim:true,style:{width:"140px"}
               '/>
            </td>
            <th width="8%">资产分类</th>
            <td width="18%">
            	<div id="check_category" data-dojo-type="dijit/form/ComboBox"
	                data-dojo-props='trim:true,value:"",style:{width:"140px"}'>
	            	<g:each in="${categoryList}" var="item">
	                	<option value="${item}">${item }</option>
	                </g:each>
	            </div>
            </td>
            <th width="8%">资产名称</th>
            <td width="18%">
            	<input id="check_assetName" data-dojo-type="dijit/form/ValidationTextBox" 
                	data-dojo-props='trim:true,style:{width:"140px"}
               '/>
            </td>
            <td>&nbsp;</td>
          </tr>
          <tr>
            <th>归属部门</th>
            <td>
            	<div style="width:145px">
            		<g:hiddenField id="check_userDepartIds" name="check_userDepartIds" data-dojo-type="dijit/form/ValidationTextBox" />
	            	<input id="check_userDepart" data-dojo-type="dijit/form/ValidationTextBox" 
	                	data-dojo-props='trim:true,readOnly:true,style:{width:"123px",float:"left"}
	               '/>
	               <div class="dijitTextBox dijitComboBox" style="width:17px;float:left">
	               		<div role="presentation" class="dijitReset dijitRight dijitButtonNode dijitArrowButton dijitDownArrowButton dijitArrowButtonContainer">
		               		<input type="text" onclick="search_selectDepart()" aria-hidden="true" role="button presentation" readonly="readonly" tabindex="-1" value="▼ " 
		               		class="dijitReset dijitInputField dijitArrowButtonInner">
	               		</div>
	               </div>
               </div>
            </td>
            <th>资产状态</th>
            <td>
            	<div id="check_assetStatus" data-dojo-type="dijit/form/ComboBox"
	                data-dojo-props='trim:true,value:"",style:{width:"140px"}'>
	                <option value="已入库">已入库</option>
	                <option value="已调拨">已调拨</option>
	                <option value="已报修">已报修</option>
	                <option value="已报废">已报废</option>
	                <option value="已报失">已报失</option>
	            </div>
            </td>
            <td colspan="2">&nbsp;</td>
            <td width="12%">
            	<div class="btn">
                	<button data-dojo-type="dijit/form/Button" data-dojo-props='onClick:function(){assetCheck_search()}'>查询</button>
                	<button data-dojo-type="dijit/form/Button" data-dojo-props='onClick:function(){assetCheck_resetSearch()}'>重置</button>
              	</div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
	
</body>
</html>
