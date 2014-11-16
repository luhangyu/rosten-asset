<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
<head>
<meta http-equiv="content-type" content="text/html; charset=UTF-8">
<style type="text/css">
	
</style>
<script type="text/javascript">	

</script>
</head>
<body>
	<div class="searchtab">
      <table width="100%" border="0">
        
        <tbody>
          <tr>
            <th width="7%">申请单号</th>
            <td width="12%">
            	<input id="allocate_seriesNo" data-dojo-type="dijit/form/ValidationTextBox" 
                	data-dojo-props='trim:true,style:{width:"120px"}'/>
            </td>
            <th width="7%">申请人</th>
            <td width="12%">
            	<input id="allocate_applyMan"  data-dojo-type="dijit/form/ValidationTextBox" 
                	data-dojo-props='trim:true,style:{width:"120px"}'/>
            </td>
            <th width="7%">调入部门</th>
            <td width="13%">
            	<div id="allocate_callInDept" data-dojo-type="dijit/form/ComboBox"
	                data-dojo-props='trim:true,value:""'>
	            	 <g:each in="${DepartList}" var="item">
	                	<option value="${item.departName }">${item.departName }</option>
	                </g:each>
	            </div>
            </td>
            <th width="7%">调出部门</th>
            <td width="13%">
            	<div id="allocate_callOutDept" data-dojo-type="dijit/form/ComboBox"
	                data-dojo-props='trim:true,value:""'>
	            	 <g:each in="${DepartList}" var="item">
	                	<option value="${item.departName }">${item.departName }</option>
	                </g:each>
	            </div>
            </td>
            <td>
            	<div class="btn">
                	<button data-dojo-type="dijit/form/Button" data-dojo-props='onClick:function(){assetAllocate_search()}'>查询</button>
                	<button data-dojo-type="dijit/form/Button" data-dojo-props='onClick:function(){assetAllocate_resetSearch()}'>重置条件</button>
              	</div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
	
</body>
</html>
