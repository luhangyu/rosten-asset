/**
 * @author ercjlo
 */
define([ "dojo/_base/connect", "dojo/_base/lang","dijit/registry", "dojo/_base/kernel","rosten/kernel/behavior" ], function(
		connect, lang,registry,kernel) {
	//资产报废
	assetScrap_add = function(){
		var userid = rosten.kernel.getUserInforByKey("idnumber");
        var companyId = rosten.kernel.getUserInforByKey("companyid");
        rosten.openNewWindow("assetScrap", rosten.webPath + "/assetScrap/assetScrapAdd?companyId=" + companyId + "&userid=" + userid + "&flowCode=assetScrap");
//      rosten.kernel.setHref(rosten.webPath + "/assetScrap/assetScrapAdd?companyId=" + companyId+ "&userid=" + userid, "test");
	};

	assetScrap_export = function(){
		var companyId = rosten.kernel.getUserInforByKey("companyid");
		var qseriesNo = "";
		var qusedDepart = "";
		var qusedMan = "";
		
		var seriesNo = registry.byId("scrap_seriesNo");
		if(seriesNo.get("value")!=""){
			seriesNo = seriesNo.get("value");
			qseriesNo = "&seriesNo="+seriesNo;
		}
		
		var usedDepart = registry.byId("scrap_usedDepartIds");
		if(usedDepart.get("value")!=""){
			usedDepart = usedDepart.get("value");
			qusedDepart = "&usedDepart="+usedDepart;
		}
		
		var usedMan = registry.byId("scrap_usedMan");
		if(usedMan.get("value")!=""){
			usedMan = usedMan.get("value");
			qusedMan = "&usedMan="+usedMan;
		}
		rosten.openNewWindow("assetScrap", rosten.webPath + "/assetScrap/assetScrapExport?companyId="+companyId+qseriesNo+qusedDepart+qusedMan);
	};
	
	assetScrap_delete = function(){
		var _1 = rosten.confirm("删除后将无法恢复，是否继续?");
		_1.callback = function() {
			var unids = rosten.getGridUnid("multi");
			var content = {};
			if (unids == ""){
				rosten.alert("注意：请在列表中选择数据！");
				return;
			}else{
				content.id = unids;
			}
			rosten.read(rosten.webPath + "/assetScrap/assetScrapDelete", content,rosten.deleteCallback);
		};
	};
	
	assetScrap_formatTopic = function(value,rowIndex){
		return "<a href=\"javascript:assetScrap_onMessageOpen(" + rowIndex + ");\">" + value + "</a>";
	};
	
	assetScrap_onMessageOpen = function(rowIndex){
        var unid = rosten.kernel.getGridItemValue(rowIndex,"id");
        var userid = rosten.kernel.getUserInforByKey("idnumber");
		var companyId = rosten.kernel.getUserInforByKey("companyid");
		rosten.openNewWindow("assetScrap", rosten.webPath + "/assetScrap/assetScrapShow/" + unid + "?userid=" + userid + "&companyId=" + companyId + "&flowCode=assetScrap");
		rosten.kernel.getGrid().clearSelected();
	};
	
	assetScrap_search = function(){
		var content = {};
		
		var seriesNo = registry.byId("scrap_seriesNo");
		if(seriesNo.get("value")!=""){
			content.seriesNo = seriesNo.get("value");
		}
		
		var usedDepart = registry.byId("scrap_usedDepartIds");
		if(usedDepart.get("value")!=""){
			content.usedDepart = usedDepart.get("value");
		}
//		var usedDepart = registry.byId("scrap_usedDepart");
//		if(usedDepart.get("value")!=""){
//			content.usedDepart = usedDepart.get("value");
//		}
		
		var usedMan = registry.byId("scrap_usedMan");
		if(usedMan.get("value")!=""){
			content.usedMan = usedMan.get("value");
		}
		
		switch(rosten.kernel.navigationEntity) {
		default:
			rosten.kernel.refreshGrid(rosten.kernel.getGrid().defaultUrl, content);
			break;
		}
	};
	
	assetScrap_resetSearch = function(){
		switch(rosten.kernel.navigationEntity) {
		default:
			registry.byId("scrap_seriesNo").set("value","");
			registry.byId("scrap_usedDepartIds").set("value","");
			registry.byId("scrap_usedDepart").set("value","");
			registry.byId("scrap_usedMan").set("value","");
			rosten.kernel.refreshGrid();
			break;
		}	
	};
	
	assetScrap_print = function(){
		var unids = rosten.getGridUnid("single");
		if (unids == ""){
			rosten.alert("注意：请在列表中选择数据！");
			return;
		}
		rosten.openNewWindow("assetScrapPrint", rosten.webPath + "/assetScrap/assetScrapPrint/" + unids);
		rosten.kernel.refreshGrid();
	}
	
//	资产调拨
	assetAllocate_add = function(){
		var userid = rosten.kernel.getUserInforByKey("idnumber");
        var companyId = rosten.kernel.getUserInforByKey("companyid");
        rosten.openNewWindow("assetAllocate", rosten.webPath + "/assetAllocate/assetAllocateAdd?companyId=" + companyId + "&userid=" + userid + "&flowCode=assetAllocate");
	};
	
	assetAllocate_export = function(){
		var companyId = rosten.kernel.getUserInforByKey("companyid");
		var qseriesNo = "";
		var qoriginalDepart = "";
		var qnewDepart = "";
		var qnewUser = "";
		
		var seriesNo = registry.byId("allocate_seriesNo");
		if(seriesNo.get("value")!=""){
			seriesNo = seriesNo.get("value");
			qseriesNo = "&seriesNo="+seriesNo;
		}
		
		var originalDepart = registry.byId("allocate_originalDepartIds");
		if(originalDepart.get("value")!=""){
			originalDepart = originalDepart.get("value");
			qoriginalDepart = "&originalDepart="+originalDepart;
		}
		
		var newDepart = registry.byId("allocate_newDepartIds");
		if(newDepart.get("value")!=""){
			newDepart = newDepart.get("value");
			qnewDepart = "&newDepart="+newDepart;
		}
		
		var newUser = registry.byId("allocate_newUser");
		if(newUser.get("value")!=""){
			newUser = newUser.get("value");
			qnewUser = "&newUser="+newUser;
		}
		
		rosten.openNewWindow("assetAllocate", rosten.webPath + "/assetAllocate/assetAllocateExport?companyId="+companyId+qseriesNo+qoriginalDepart+qnewDepart+qnewUser);
	};
	
	assetAllocate_delete = function(){
		var _1 = rosten.confirm("删除后将无法恢复，是否继续?");
		_1.callback = function() {
			var unids = rosten.getGridUnid("multi");
			var content = {};
			if (unids == ""){
				rosten.alert("注意：请在列表中选择数据！");
				return;
			}else{
				content.id = unids;
			}
			rosten.read(rosten.webPath + "/assetAllocate/assetAllocateDelete", content,rosten.deleteCallback);
		};
	};
	
	assetAllocate_formatTopic = function(value,rowIndex){
		return "<a href=\"javascript:assetAllocate_onMessageOpen(" + rowIndex + ");\">" + value + "</a>";
	};
	
	assetAllocate_onMessageOpen = function(rowIndex){
        var unid = rosten.kernel.getGridItemValue(rowIndex,"id");
        var userid = rosten.kernel.getUserInforByKey("idnumber");
		var companyId = rosten.kernel.getUserInforByKey("companyid");
		rosten.openNewWindow("assetAllocate", rosten.webPath + "/assetAllocate/assetAllocateShow/" + unid + "?userid=" + userid + "&companyId=" + companyId + "&flowCode=assetAllocate");
		rosten.kernel.getGrid().clearSelected();
	};
	
	assetAllocate_search = function(){
		var content = {};
		
		var seriesNo = registry.byId("allocate_seriesNo");
		if(seriesNo.get("value")!=""){
			content.seriesNo = seriesNo.get("value");
		}
		
		var originalDepart = registry.byId("allocate_originalDepartIds");
		if(originalDepart.get("value")!=""){
			content.originalDepart = originalDepart.get("value");
		}
//		var originalDepart = registry.byId("allocate_originalDepart");
//		if(originalDepart.get("value")!=""){
//			content.originalDepart = originalDepart.get("value");
//		}
		var newDepart = registry.byId("allocate_newDepartIds");
		if(newDepart.get("value")!=""){
			content.newDepart = newDepart.get("value");
		}
//		var newDepart = registry.byId("allocate_newDepart");
//		if(newDepart.get("value")!=""){
//			content.newDepart = newDepart.get("value");
//		}
		
		var newUser = registry.byId("allocate_newUser");
		if(newUser.get("value")!=""){
			content.newUser = newUser.get("value");
		}
		
		switch(rosten.kernel.navigationEntity) {
		default:
			rosten.kernel.refreshGrid(rosten.kernel.getGrid().defaultUrl, content);
			break;
		}
	};
	
	assetAllocate_resetSearch = function(){
		switch(rosten.kernel.navigationEntity) {
		default:
			registry.byId("allocate_seriesNo").set("value","");
			registry.byId("allocate_originalDepartIds").set("value","");
			registry.byId("allocate_originalDepart").set("value","");
			registry.byId("allocate_newDepartIds").set("value","");
			registry.byId("allocate_newDepart").set("value","");
			registry.byId("allocate_newUser").set("value","");
			rosten.kernel.refreshGrid();
			break;
		}	
	};
	
	assetAllocate_print = function(){
		var unids = rosten.getGridUnid("single");
		if (unids == ""){
			rosten.alert("注意：请在列表中选择数据！");
			return;
		}
		rosten.openNewWindow("assetAllocatePrint", rosten.webPath + "/assetAllocate/assetAllocatePrint/" + unids);
		rosten.kernel.refreshGrid();
	}
	
	//资产报失
	assetLose_add = function(){
		var userid = rosten.kernel.getUserInforByKey("idnumber");
        var companyId = rosten.kernel.getUserInforByKey("companyid");
        rosten.openNewWindow("assetLose", rosten.webPath + "/assetLose/assetLoseAdd?companyId=" + companyId + "&userid=" + userid + "&flowCode=assetLose");
	};
	
	assetLose_export = function(){
		var companyId = rosten.kernel.getUserInforByKey("companyid");
		var qseriesNo = "";
		var qusedDepart = "";
		var qusedMan = "";
		
		var seriesNo = registry.byId("lose_seriesNo");
		if(seriesNo.get("value")!=""){
			seriesNo = seriesNo.get("value");
			qseriesNo = "&seriesNo="+seriesNo;
		}
		
		var usedDepart = registry.byId("lose_usedDepartIds");
		if(usedDepart.get("value")!=""){
			usedDepart = usedDepart.get("value");
			qusedDepart = "&usedDepart="+usedDepart;
		}
		
		var usedMan = registry.byId("lose_usedMan");
		if(usedMan.get("value")!=""){
			usedMan = usedMan.get("value");
			qusedMan = "&usedMan="+usedMan;
		}
		
		rosten.openNewWindow("assetLose", rosten.webPath + "/assetLose/assetLoseExport?companyId="+companyId+qseriesNo+qusedDepart+qusedMan);
	};
	
	assetLose_delete = function(){
		var _1 = rosten.confirm("删除后将无法恢复，是否继续?");
		_1.callback = function() {
			var unids = rosten.getGridUnid("multi");
			var content = {};
			if (unids == ""){
				rosten.alert("注意：请在列表中选择数据！");
				return;
			}else{
				content.id = unids;
			}
			rosten.read(rosten.webPath + "/assetLose/assetLoseDelete", content,rosten.deleteCallback);
		};
	};
	
	assetLose_formatTopic = function(value,rowIndex){
		return "<a href=\"javascript:assetLose_onMessageOpen(" + rowIndex + ");\">" + value + "</a>";
	};
	
	assetLose_onMessageOpen = function(rowIndex){
        var unid = rosten.kernel.getGridItemValue(rowIndex,"id");
        var userid = rosten.kernel.getUserInforByKey("idnumber");
		var companyId = rosten.kernel.getUserInforByKey("companyid");
		rosten.openNewWindow("assetLose", rosten.webPath + "/assetLose/assetLoseShow/" + unid + "?userid=" + userid + "&companyId=" + companyId + "&flowCode=assetLose");
		rosten.kernel.getGrid().clearSelected();
	};
	
	assetLose_search = function(){
		var content = {};
		
		var seriesNo = registry.byId("lose_seriesNo");
		if(seriesNo.get("value")!=""){
			content.seriesNo = seriesNo.get("value");
		}
		
		var usedDepart = registry.byId("lose_usedDepartIds");
		if(usedDepart.get("value")!=""){
			content.usedDepart = usedDepart.get("value");
		}
//		var usedDepart = registry.byId("lose_usedDepart");
//		if(usedDepart.get("value")!=""){
//			content.usedDepart = usedDepart.get("value");
//		}
		
		var usedMan = registry.byId("lose_usedMan");
		if(usedMan.get("value")!=""){
			content.usedMan = usedMan.get("value");
		}
		
		switch(rosten.kernel.navigationEntity) {
		default:
			rosten.kernel.refreshGrid(rosten.kernel.getGrid().defaultUrl, content);
			break;
		}
	};
	
	assetLose_resetSearch = function(){
		switch(rosten.kernel.navigationEntity) {
		default:
			registry.byId("lose_seriesNo").set("value","");
			registry.byId("lose_usedDepartIds").set("value","");
			registry.byId("lose_usedDepart").set("value","");
			registry.byId("lose_usedMan").set("value","");
			rosten.kernel.refreshGrid();
			break;
		}	
	};
	
	//资产报修
	assetRepair_add = function(){
		var userid = rosten.kernel.getUserInforByKey("idnumber");
        var companyId = rosten.kernel.getUserInforByKey("companyid");
        rosten.openNewWindow("assetRepair", rosten.webPath + "/assetRepair/assetRepairAdd?companyId=" + companyId + "&userid=" + userid + "&flowCode=assetRepair");
	};
	
	assetRepair_export = function(){
		var companyId = rosten.kernel.getUserInforByKey("companyid");
		var qseriesNo = "";
		var qusedDepart = "";
		var qusedMan = "";
		
		var seriesNo = registry.byId("repair_seriesNo");
		if(seriesNo.get("value")!=""){
			seriesNo = seriesNo.get("value");
			qseriesNo = "&seriesNo="+seriesNo;
		}
		
		var usedDepart = registry.byId("repair_usedDepartIds");
		if(usedDepart.get("value")!=""){
			usedDepart = usedDepart.get("value");
			qusedDepart = "&usedDepart="+usedDepart;
		}
		
		var usedMan = registry.byId("repair_usedMan");
		if(usedMan.get("value")!=""){
			usedMan = usedMan.get("value");
			qusedMan = "&usedMan="+usedMan;
		}
		
		rosten.openNewWindow("assetRepair", rosten.webPath + "/assetRepair/assetRepairExport?companyId="+companyId+qseriesNo+qusedDepart+qusedMan);
	};
	
	assetRepair_delete = function(){
		var _1 = rosten.confirm("删除后将无法恢复，是否继续?");
		_1.callback = function() {
			var unids = rosten.getGridUnid("multi");
			var content = {};
			if (unids == ""){
				rosten.alert("注意：请在列表中选择数据！");
				return;
			}else{
				content.id = unids;
			}
			rosten.read(rosten.webPath + "/assetRepair/assetRepairDelete", content,rosten.deleteCallback);
		};
	};
	
	assetRepair_formatTopic = function(value,rowIndex){
		return "<a href=\"javascript:assetRepair_onMessageOpen(" + rowIndex + ");\">" + value + "</a>";
	};
	
	assetRepair_onMessageOpen = function(rowIndex){
        var unid = rosten.kernel.getGridItemValue(rowIndex,"id");
        var userid = rosten.kernel.getUserInforByKey("idnumber");
		var companyId = rosten.kernel.getUserInforByKey("companyid");
		rosten.openNewWindow("assetRepair", rosten.webPath + "/assetRepair/assetRepairShow/" + unid + "?userid=" + userid + "&companyId=" + companyId + "&flowCode=assetRepair");
		rosten.kernel.getGrid().clearSelected();
	};
	
	assetRepair_search = function(){
		var content = {};
		
		var seriesNo = registry.byId("repair_seriesNo");
		if(seriesNo.get("value")!=""){
			content.seriesNo = seriesNo.get("value");
		}
		
		var usedDepart = registry.byId("repair_usedDepartIds");
		if(usedDepart.get("value")!=""){
			content.usedDepart = usedDepart.get("value");
		}
//		var usedDepart = registry.byId("repair_usedDepart");
//		if(usedDepart.get("value")!=""){
//			content.usedDepart = usedDepart.get("value");
//		}
		
		var usedMan = registry.byId("repair_usedMan");
		if(usedMan.get("value")!=""){
			content.usedMan = usedMan.get("value");
		}
		
		switch(rosten.kernel.navigationEntity) {
		default:
			rosten.kernel.refreshGrid(rosten.kernel.getGrid().defaultUrl, content);
			break;
		}
	};
	
	assetRepair_resetSearch = function(){
		switch(rosten.kernel.navigationEntity) {
		default:
			registry.byId("repair_seriesNo").set("value","");
			registry.byId("repair_usedDepartIds").set("value","");
			registry.byId("repair_usedDepart").set("value","");
			registry.byId("repair_usedMan").set("value","");
			rosten.kernel.refreshGrid();
			break;
		}	
	};
	
	assetRepair_print = function(){
		return false;
	}
	
	//增值减值
	/**暂不作要求
	assetAddDelete_add = function(){
		var userid = rosten.kernel.getUserInforByKey("idnumber");
        var companyId = rosten.kernel.getUserInforByKey("companyid");
        rosten.openNewWindow("assetAddDelete", rosten.webPath + "/assetAddDelete/assetAddDeleteAdd?companyId=" + companyId + "&userid=" + userid);
	};
	
	assetAddDelete_delete = function(){
		var _1 = rosten.confirm("删除后将无法恢复，是否继续?");
		_1.callback = function() {
			var unids = rosten.getGridUnid("multi");
			var content = {};
			if (unids == ""){
				rosten.alert("注意：请在列表中选择数据！");
				return;
			}else{
				content.id = unids;
			}
			rosten.read(rosten.webPath + "/assetAddDelete/assetAddDeleteDelete", content,rosten.deleteCallback);
		};
	};
	
	assetAddDelete_formatTopic = function(value,rowIndex){
		return "<a href=\"javascript:assetAddDelete_onMessageOpen(" + rowIndex + ");\">" + value + "</a>";
	};
	
	assetAddDelete_onMessageOpen = function(rowIndex){
        var unid = rosten.kernel.getGridItemValue(rowIndex,"id");
        var userid = rosten.kernel.getUserInforByKey("idnumber");
		var companyId = rosten.kernel.getUserInforByKey("companyid");
		rosten.openNewWindow("assetAddDelete", rosten.webPath + "/assetAddDelete/assetAddDeleteShow/" + unid + "?userid=" + userid + "&companyId=" + companyId);
		rosten.kernel.getGrid().clearSelected();
	};
	**/
	/*
	 * 此功能默认必须存在
	 */
	show_assetChangeNaviEntity = function(oString) {
		var companyId = rosten.kernel.getUserInforByKey("companyid");
		var userid = rosten.kernel.getUserInforByKey("idnumber");
		switch (oString) {
			case "assetScrap":
	            var naviJson = {
	                identifier : oString,
	                actionBarSrc : rosten.webPath + "/assetScrap/assetScrapView?userId=" + userid,
	                searchSrc:rosten.webPath + "/assetScrap/assetScrapSearchView?companyId=" + companyId,
	                gridSrc : rosten.webPath + "/assetScrap/assetScrapGrid?companyId=" + companyId
	            };
	            rosten.kernel.addRightContent(naviJson);
	
	            var rostenGrid = rosten.kernel.getGrid();
	            break;
			case "assetAllocate":
	            var naviJson = {
	                identifier : oString,
	                actionBarSrc : rosten.webPath + "/assetAllocate/assetAllocateView?userId=" + userid,
	                searchSrc:rosten.webPath + "/assetAllocate/assetAllocateSearchView?companyId=" + companyId,
	                gridSrc : rosten.webPath + "/assetAllocate/assetAllocateGrid?companyId=" + companyId
	            };
	            rosten.kernel.addRightContent(naviJson);
	
	            var rostenGrid = rosten.kernel.getGrid();
	            break;
			case "assetLose":
	            var naviJson = {
	                identifier : oString,
	                actionBarSrc : rosten.webPath + "/assetLose/assetLoseView?userId=" + userid,
	                searchSrc:rosten.webPath + "/assetLose/assetLoseSearchView?companyId=" + companyId,
	                gridSrc : rosten.webPath + "/assetLose/assetLoseGrid?companyId=" + companyId
	            };
	            rosten.kernel.addRightContent(naviJson);
	
	            var rostenGrid = rosten.kernel.getGrid();
	            break;
			case "assetRepair":
	            var naviJson = {
	                identifier : oString,
	                actionBarSrc : rosten.webPath + "/assetRepair/assetRepairView?userId=" + userid,
	                searchSrc:rosten.webPath + "/assetRepair/assetRepairSearchView?companyId=" + companyId,
	                gridSrc : rosten.webPath + "/assetRepair/assetRepairGrid?companyId=" + companyId
	            };
	            rosten.kernel.addRightContent(naviJson);
	
	            var rostenGrid = rosten.kernel.getGrid();
	            break;
//			case "assetAddDelete":
//	            var naviJson = {
//	                identifier : oString,
//	                actionBarSrc : rosten.webPath + "/assetAddDelete/assetAddDeleteView?userId=" + userid,
//	                gridSrc : rosten.webPath + "/assetAddDelete/assetAddDeleteGrid?companyId=" + companyId
//	            };
//	            rosten.kernel.addRightContent(naviJson);
//	
//	            var rostenGrid = rosten.kernel.getGrid();
//	            break;
			
		}
	}
	connect.connect("show_naviEntity", show_assetChangeNaviEntity);
});
