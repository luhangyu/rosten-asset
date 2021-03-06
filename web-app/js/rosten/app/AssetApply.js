/**
 * @author ercjlo
 */
define([ "dojo/_base/connect", "dojo/_base/lang","dijit/registry", "dojo/_base/kernel","rosten/kernel/behavior" ], function(
		connect, lang,registry,kernel) {
	
	//2014-12-08 增加审批单打印功能--------------------------------------------------------------
	assetApply_print = function(){
		var unids = rosten.getGridUnid("single");
		if (unids == ""){
			rosten.alert("注意：请在列表中选择数据！");
			return;
		}
		rosten.openNewWindow("assetApplyPrint", rosten.webPath + "/applyManage/assetApplyPrint/" + unids);
		rosten.kernel.refreshGrid();
	}
	//------------------------------------------------------------------------------------
	
	mineApply_search = function(){
		var content = {};
		
		var registerNum = registry.byId("s_registerNum");
		if(registerNum.get("value")!=""){
			content.registerNum = registerNum.get("value");
		}
		
		var assetName = registry.byId("s_assetName");
		if(assetName.get("value")!=""){
			content.assetName = assetName.get("value");
		}
		
		var category = registry.byId("s_category");
		if(category.get("value")!=""){
			content.category = category.get("value");
		}
		
		switch(rosten.kernel.navigationEntity) {
		default:
			rosten.kernel.refreshGrid(rosten.kernel.getGrid().defaultUrl, content);
			break;
		}
	};
	mineApply_resetSearch = function(){
		switch(rosten.kernel.navigationEntity) {
		default:
			registry.byId("s_registerNum").set("value","");
			registry.byId("s_assetName").set("value","");
			registry.byId("s_category").set("value","");
			rosten.kernel.refreshGrid();
			break;
		}	
	};
	
	//资产申请
	assetApply_add = function(){//新增资产申请
		var userid = rosten.kernel.getUserInforByKey("idnumber");
        var companyId = rosten.kernel.getUserInforByKey("companyid");
        rosten.openNewWindow("assetApply", rosten.webPath + "/applyManage/assetApplyAdd?companyId=" + companyId + "&userid=" + userid + "&flowCode=assetApply");
	};
	
	assetApply_export = function(){
		var companyId = rosten.kernel.getUserInforByKey("companyid");
		var qregisterNum = "";
		var qassetName = "";
		var qcategory = "";
		
		var registerNum = registry.byId("s_registerNum");
		if(registerNum.get("value")!=""){
			registerNum = registerNum.get("value");
			qregisterNum = "&registerNum="+registerNum;
		}
		
		var assetName = registry.byId("s_assetName");
		if(assetName.get("value")!=""){
			assetName = assetName.get("value");
			qassetName = "&assetName="+assetName;
		}
		
		var category = registry.byId("s_category");
		if(category.get("value")!=""){
			category = category.get("value");
			qcategory = "&category="+category;
		}
		
		rosten.openNewWindow("assetApply", rosten.webPath + "/applyManage/assetApplyExport?companyId="+companyId+qregisterNum+qassetName+qcategory);
	};
	
	assetApply_delete = function(){//删除资产申请
		var _1 = rosten.confirm("删除后将无法恢复，是否继续?");
		_1.callback = function() {
			var unids = rosten.getGridUnid("multi");
			var content = {};
			if (unids == ""){
				rosten.alert("注意：请在列表中选择数据！");
				return;
			}else{
				content.id = unids;
				rosten.readSyncNoTime(rosten.webPath + "/applyManage/assetApplyDelete", content,function(data){
					if(data.result == true || data.result == "true"){
						rosten.alert("成功：资产申请单已删除！");
						rosten.kernel.refreshGrid();
					}else{
						rosten.alert(data.result);
					}
				});
			}
		};
	};
	
	assetApply_docking = function(){
		rosten.alert("此功能暂不提供！");
	}
	//提交功能由列表页面改为视图提交，注销代码
//	assetApply_submit = function(){//提交资产申请
//		var _1 = rosten.confirm("确认提交申请，是否继续?");
//		_1.callback = function() {
//			var unids = rosten.getGridUnid("multi");
//			if (unids == "")
//				return;
//			var content = {applyStatus:"审批中"};
//			content.id = unids;
//			rosten.read(rosten.webPath + "/applyManage/assetApplySubmit", content,rosten.submitCallback);
//		};
//	};
	
	//前台页面取消按钮，注销代码
//	assetApply_agree = function(){
//		var unids = rosten.getGridUnid("multi");
//		if (unids == "")
//			return;
//		var content = {applyStatus:"已审批"};
//		content.id = unids;
//		rosten.read(rosten.webPath + "/applyManage/assetApplyAgree", content,rosten.submitCallback);
//	};
	
	assetCards_create = function(){//生产资产卡片
		var companyId = rosten.kernel.getUserInforByKey("companyid");
		var unids = rosten.getGridUnid("multi");
		if (unids == ""){
			rosten.alert("注意：请在列表中选择数据！")
			return;
		}
		var isCreatedCards = rosten.getGridSelectedValue("getCardsCreatedLabel");
		if(isCreatedCards == "已生成"){
			rosten.alert("注意：某些申请单已生成卡片，请勿重复操作！");
			return;
		}
		var _1 = rosten.confirm("生成卡片需要花费一定时间，请耐心等待！是否继续?");
		_1.callback = function() {
			var content ={};
			content.companyId = companyId;
			content.applyIds = unids;
			rosten.readSyncNoTime(rosten.webPath + "/applyManage/assetCardsCreate",content,rosten.assetApplyCallback);
		}
	};
	
	assetApply_formatTopic = function(value,rowIndex){
		return "<a href=\"javascript:assetApply_onMessageOpen(" + rowIndex + ");\">" + value + "</a>";
	};
	
	assetApply_onMessageOpen = function(rowIndex){
        var unid = rosten.kernel.getGridItemValue(rowIndex,"id");
        var userid = rosten.kernel.getUserInforByKey("idnumber");
		var companyId = rosten.kernel.getUserInforByKey("companyid");
		rosten.openNewWindow("assetApply", rosten.webPath + "/applyManage/assetApplyShow/" + unid + "?userid=" + userid + "&companyId=" + companyId + "&flowCode=assetApply");
		rosten.kernel.getGrid().clearSelected();
	};
	
	/*
	 * 此功能默认必须存在
	 */
	show_assetApplyNaviEntity = function(oString) {
		var companyId = rosten.kernel.getUserInforByKey("companyid");
		var userid = rosten.kernel.getUserInforByKey("idnumber");
		switch (oString) {
			case "mineApply":
	            var naviJson = {
	                identifier : oString,
	                actionBarSrc : rosten.webPath + "/applyManage/mineApplyView?userId=" + userid,
	                searchSrc:rosten.webPath + "/applyManage/mineApplySearchView?companyId=" + companyId,
	                gridSrc : rosten.webPath + "/applyManage/mineApplyGrid?companyId=" + companyId
	            };
	            rosten.kernel.addRightContent(naviJson);
	            break;
			case "applyApproval":
	            var naviJson = {
	                identifier : oString,
	                actionBarSrc : rosten.webPath + "/applyManage/applyApprovalView?userId=" + userid,
	                searchSrc:rosten.webPath + "/applyManage/mineApplySearchView?companyId=" + companyId,
	                gridSrc : rosten.webPath + "/applyManage/assetApplyGrid?companyId=" + companyId
	            };
	            rosten.kernel.addRightContent(naviJson);
	            break;
		}
		
	}
	connect.connect("show_naviEntity", show_assetApplyNaviEntity);
});
