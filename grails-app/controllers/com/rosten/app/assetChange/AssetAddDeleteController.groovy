package com.rosten.app.assetChange

import grails.converters.JSON

import com.rosten.app.bookKeeping.CarRegister
import com.rosten.app.bookKeeping.LandRegister
import com.rosten.app.bookKeeping.HouseRegister
import com.rosten.app.bookKeeping.DeviceRegister
import com.rosten.app.bookKeeping.BookRegister
import com.rosten.app.bookKeeping.FurnitureRegister

import com.rosten.app.util.FieldAcl
import com.rosten.app.system.Company
import com.rosten.app.system.User
import com.rosten.app.util.Util
import com.rosten.app.system.Depart

class AssetAddDeleteController {
    def assetChangeService
	def springSecurityService

	def imgPath ="images/rosten/actionbar/"
	
	def assetAddDeleteForm = {
		def webPath = request.getContextPath() + "/"
		def strname = "assetAddDelete"
		def actionList = []
		
		actionList << createAction("返回",webPath + imgPath + "quit_1.gif","page_quit")
		actionList << createAction("保存",webPath + imgPath + "Save.gif",strname + "_save")
		
		render actionList as JSON
	}
	
	  def assetAddDeleteView = {
		def actionList =[]
		def strname = "assetAddDelete"
		actionList << createAction("退出",imgPath + "quit_1.gif","returnToMain")
		actionList << createAction("新增",imgPath + "add.png",strname + "_add")
		actionList << createAction("删除",imgPath + "read.gif",strname + "_delete")
		actionList << createAction("刷新",imgPath + "fresh.gif","freshGrid")
		
		render actionList as JSON
	}

	private def createAction = {name,img,action->
		def model =[:]
		model["name"] = name
		model["img"] = img
		model["action"] = action
		return model
	}
	
	def assetAddDeleteAdd = {
		redirect(action:"assetAddDeleteShow",params:params)
	}
	
	def assetAddDeleteShow = {
		def model =[:]
		def currentUser = springSecurityService.getCurrentUser()
		
		def user = User.get(params.userid)
		def company = Company.get(params.companyId)
		
		def assetAddDelete = new AssetAddDelete()
		if(params.id){
			assetAddDelete = AssetAddDelete.get(params.id)
		}
		
		model["user"] = user
		model["company"] = company
		model["assetAddDelete"] = assetAddDelete
		
		FieldAcl fa = new FieldAcl()
		if("normal".equals(user.getUserType())){
		}
		model["fieldAcl"] = fa
		
		render(view:'/assetChange/assetAddDelete',model:model)
	}
	
	def assetAddDeleteSave = {
		def json=[:]
		def company = Company.get(params.companyId)
		
		//增值减值申请信息保存-------------------------------
		def assetAddDelete = new AssetAddDelete()
		if(params.id && !"".equals(params.id)){
			assetAddDelete = AssetAddDelete.get(params.id)
		}else{
			assetAddDelete.company = company
		}
		assetAddDelete.properties = params
		assetAddDelete.clearErrors()
		
		//特殊字段信息处理
		assetAddDelete.applyDate = Util.convertToTimestamp(params.applyDate)
		if(params.callOutDeptId && !params.callOutDeptId.equals("")){
			assetAddDelete.callOutDept = Depart.get(params.callOutDeptId)
		}else{
			assetAddDelete.callOutDept = params.callOutDeptName
		}
		if(params.callInDeptId && !params.callInDeptId.equals("")){
			assetAddDelete.callInDept = Depart.get(params.callInDeptId)
		}else{
			assetAddDelete.callInDept = params.callInDeptName
		}
		if(!params.seriesNo_form.equals("")){
			assetAddDelete.seriesNo = params.seriesNo_form
		}
		
		if(assetAddDelete.save(flush:true)){
			json["result"] = "true"
		}else{
			assetAddDelete.errors.each{
				println it
			}
			json["result"] = "false"
		}
		render json as JSON
	}
	
	def assetAddDeleteDelete = {
		/*
		def seriesNo
		
		def carRegister
		def landRegister
		def houseRegister
		def deviceRegister
		def bookRegister
		def furnitureRegister
		
		def assetList_car
		def assetList_land
		def assetList_house
		def assetList_device
		def assetList_book
		def assetList_furniture
		*/
		
		def ids = params.id.split(",")
		def json
		try{
			ids.each{
				def assetAddDelete = AssetAddDelete.get(it)
				if(assetAddDelete){
					assetAddDelete.delete(flush: true)
					/*
					//获取当前资产变更申请单号，用以重置资产建账中的值
					seriesNo = assetAddDelete.seriesNo
					//重置车辆资产建账的资产变更申请单号
					assetList_car = CarRegister.findAllBySeriesNo(seriesNo)
					if(assetList_car.size()>0){
						assetList_car.each{
							def assetId = it.id
							carRegister = CarRegister.get(assetId)
							if(carRegister){
								carRegister.seriesNo = null
							}
						}
					}
					//重置土地资产建账的资产变更申请单号
					assetList_land = LandRegister.findAllBySeriesNo(seriesNo)
					if(assetList_land.size()>0){
						assetList_land.each{
							def assetId = it.id
							landRegister = LandRegister.get(assetId)
							if(landRegister){
								landRegister.seriesNo = null
							}
						}
					}
					//重置房屋资产建账的资产变更申请单号
					assetList_house = HouseRegister.findAllBySeriesNo(seriesNo)
					if(assetList_house.size()>0){
						assetList_house.each{
							def assetId = it.id
							houseRegister = HouseRegister.get(assetId)
							if(houseRegister){
								houseRegister.seriesNo = null
							}
						}
					}
					//重置设备资产建账的资产变更申请单号
					assetList_device = DeviceRegister.findAllBySeriesNo(seriesNo)
					if(assetList_device.size()>0){
						assetList_device.each{
							def assetId = it.id
							deviceRegister = DeviceRegister.get(assetId)
							if(deviceRegister){
								deviceRegister.seriesNo = null
							}
						}
					}
					//重置图书资产建账的资产变更申请单号
					assetList_book = BookRegister.findAllBySeriesNo(seriesNo)
					if(assetList_book.size()>0){
						assetList_book.each{
							def assetId = it.id
							bookRegister = BookRegister.get(assetId)
							if(bookRegister){
								bookRegister.seriesNo = null
							}
						}
					}
					//重置家具资产建账的资产变更申请单号
					assetList_furniture = FurnitureRegister.findAllBySeriesNo(seriesNo)
					if(assetList_furniture.size()>0){
						assetList_furniture.each{
							def assetId = it.id
							furnitureRegister = FurnitureRegister.get(assetId)
							if(furnitureRegister){
								furnitureRegister.seriesNo = null
							}
						}
					}
					*/
				}
			}
			json = [result:'true']
		}catch(Exception e){
			json = [result:'error']
		}
		render json as JSON
	}
	
	def assetAddDeleteGrid = {
		def json=[:]
		def company = Company.get(params.companyId)
		if(params.refreshHeader){
			json["gridHeader"] = assetChangeService.getAssetAddDeleteListLayout()
		}
		if(params.refreshData){
			def args =[:]
			int perPageNum = Util.str2int(params.perPageNum)
			int nowPage =  Util.str2int(params.showPageNum)
			
			args["offset"] = (nowPage-1) * perPageNum
			args["max"] = perPageNum
			args["company"] = company
			json["gridData"] = assetChangeService.getAssetAddDeleteDataStore(args)
		}
		if(params.refreshPageControl){
			def total = assetChangeService.getAssetAddDeleteCount(company)
			json["pageControl"] = ["total":total.toString()]
		}
		render json as JSON
	}
	
	def assetAddDeleteListDataStore = {
		def json=[:]
		
		def car = CarRegister.createCriteria()
		def land = LandRegister.createCriteria()
		def house = HouseRegister.createCriteria()
		def device = DeviceRegister.createCriteria()
		def book = BookRegister.createCriteria()
		def furniture = FurnitureRegister.createCriteria()
		
		def seriesNo
		if(params.seriesNo && params.seriesNo!="" && params.seriesNo!=null){
			seriesNo = params.seriesNo
		}
		
		def freshType
		if(params.freshType && params.freshType!="" && params.freshType!=null){
			freshType = params.freshType
		}
		
		def assetType
		if(params.assetType && params.assetType!="" && params.assetType!=null){
			assetType = params.assetType
		}
		
		def companyId
		if(params.companyId && params.companyId!="" && params.companyId!=null){
			companyId = params.companyId
		}
		def companyEntity = Company.get(companyId)

		def _gridHeader =[]
		_gridHeader << ["name":"序号","width":"40px","colIdx":0,"field":"rowIndex"]
		_gridHeader << ["name":"资产编号","width":"100px","colIdx":1,"field":"registerNum"]
		_gridHeader << ["name":"资产分类","width":"100px","colIdx":2,"field":"assetCategory"]
		_gridHeader << ["name":"资产名称","width":"auto","colIdx":3,"field":"assetName"]
		_gridHeader << ["name":"使用状况","width":"80px","colIdx":4,"field":"userStatus"]
		_gridHeader << ["name":"金额","width":"80px","colIdx":5,"field":"totalPrice"]
		_gridHeader << ["name":"使用部门","width":"100px","colIdx":6,"field":"userDepart"]
		_gridHeader << ["name":"购买日期","width":"80px","colIdx":7,"field":"buyDate"]
		json["gridHeader"] = _gridHeader
		
		int totalNum = 0
		
		def _json = [identifier:'id',label:'name',items:[]]
		int perPageNum = Util.str2int(params.perPageNum)
		int nowPage =  Util.str2int(params.showPageNum)

		def offset = (nowPage-1) * perPageNum
		def max  = perPageNum
		
		def pa=[max:max,offset:offset]
		
		def query = {
			and{
				if(companyId!=null && companyId!=""){
					eq("company",companyEntity)
					eq("seriesNo",seriesNo)
				}
			}
		}
		
		def assetList
		if(params.refreshData){
			if(!(assetType.equals("") || assetType==null)){
				if(assetType.equals("car")){
					assetList = car.list(pa,query)
					totalNum = assetList.size()
				}else if(assetType.equals("land")){
					assetList = land.list(pa,query)
					totalNum = assetList.size()
				}else if(assetType.equals("house")){
					assetList = house.list(pa,query)
					totalNum = assetList.size()
				}else if(assetType.equals("device")){
					assetList = device.list(pa,query)
					totalNum = assetList.size()
				}else if(assetType.equals("book")){
					assetList = book.list(pa,query)
					totalNum = assetList.size()
				}else if(assetType.equals("furniture")){
					assetList = furniture.list(pa,query)
					totalNum = assetList.size()
				}
			}else{
				assetList = car.list(pa,query)
				assetList += land.list(pa,query)
				assetList += house.list(pa,query)
				assetList += device.list(pa,query)
				assetList += book.list(pa,query)
				assetList += furniture.list(pa,query)
				totalNum = assetList.size()
			}
			
			def idx = 0
			assetList.each{
				def sMap =[:]
				sMap["rowIndex"] = idx+1
				sMap["id"] = it.id
				sMap["registerNum"] = it.registerNum
				sMap["assetCategory"] = it.assetCategory
				sMap["assetName"] = it.assetName
				sMap["userStatus"] = it.userStatus
				sMap["totalPrice"] = it.totalPrice
				sMap["userDepart"] = it.getDepartName()
				sMap["buyDate"] = it.getFormattedShowBuyDate()
				
				_json.items+=sMap
				idx += 1
			}
			json["gridData"] = _json
		}
			
		if(params.refreshPageControl){
			json["pageControl"] = ["total":totalNum.toString()]
		}
		render json as JSON
	}
	
	def assetChooseListDataStore = {
		def car = CarRegister.createCriteria()
		def land = LandRegister.createCriteria()
		def house = HouseRegister.createCriteria()
		def device = DeviceRegister.createCriteria()
		def book = BookRegister.createCriteria()
		def furniture = FurnitureRegister.createCriteria()
		
		def json=[:]
		
		def seriesNo
		if(params.seriesNo && params.seriesNo!="" && params.seriesNo!=null){
			seriesNo = params.seriesNo
		}
		
		def freshType
		if(params.freshType && params.freshType!="" && params.freshType!=null){
			freshType = params.freshType
		}
		
		def assetType = "car"
		if(params.assetType && params.assetType!="" && params.assetType!=null){
			assetType = params.assetType
		}
		
		def companyId
		if(params.companyId && params.companyId!="" && params.companyId!=null){
			companyId = params.companyId
		}
		def companyEntity = Company.get(companyId)

		def _gridHeader =[]
		_gridHeader << ["name":"序号","width":"40px","colIdx":0,"field":"rowIndex"]
		_gridHeader << ["name":"资产编号","width":"100px","colIdx":1,"field":"registerNum"]
		_gridHeader << ["name":"资产分类","width":"100px","colIdx":2,"field":"assetCategory"]
		_gridHeader << ["name":"资产名称","width":"auto","colIdx":3,"field":"assetName"]
		_gridHeader << ["name":"使用状况","width":"80px","colIdx":4,"field":"userStatus"]
		_gridHeader << ["name":"金额","width":"80px","colIdx":5,"field":"totalPrice"]
		_gridHeader << ["name":"使用部门","width":"100px","colIdx":6,"field":"userDepart"]
		_gridHeader << ["name":"购买日期","width":"80px","colIdx":7,"field":"buyDate"]
		json["gridHeader"] = _gridHeader
		
		int totalNum = 0
		
		def _json = [identifier:'id',label:'name',items:[]]
		int perPageNum = Util.str2int(params.perPageNum)
		int nowPage =  Util.str2int(params.showPageNum)

		def offset = (nowPage-1) * perPageNum
		def max  = perPageNum
		
		def pa=[max:max,offset:offset]
		
		def query = {
			and{
				if(companyId!=null && companyId!=""){
					eq("company",companyEntity)
					eq("assetStatus","已入库")
				}
			}
		}
		
		def assetList
		if(params.refreshData){
			if(!(assetType.equals("") || assetType==null)){
				if(assetType.equals("car")){
					assetList = car.list(pa,query)
					totalNum = assetList.size()
				}else if(assetType.equals("land")){
					assetList = land.list(pa,query)
					totalNum = assetList.size()
				}else if(assetType.equals("house")){
					assetList = house.list(pa,query)
					totalNum = assetList.size()
				}else if(assetType.equals("device")){
					assetList = device.list(pa,query)
					totalNum = assetList.size()
				}else if(assetType.equals("book")){
					assetList = book.list(pa,query)
					totalNum = assetList.size()
				}else if(assetType.equals("furniture")){
					assetList = furniture.list(pa,query)
					totalNum = assetList.size()
				}
			}
			
			def idx = 0
			assetList.each{
				def sMap =[:]
				sMap["rowIndex"] = idx+1
				sMap["id"] = it.id
				sMap["registerNum"] = it.registerNum
				sMap["assetCategory"] = it.assetCategory
				sMap["assetName"] = it.assetName
				sMap["userStatus"] = it.userStatus
				sMap["totalPrice"] = it.totalPrice
				sMap["userDepart"] = it.getDepartName()
				sMap["buyDate"] = it.getFormattedShowBuyDate()
				
				_json.items+=sMap
				idx += 1
			}
			json["gridData"] = _json
		}
			
		if(params.refreshPageControl){
			json["pageControl"] = ["total":totalNum.toString()]
		}
		render json as JSON
	}
	
	def assetChooseOperate = {
		def json,message
		
		def seriesNo
		if(params.seriesNo && params.seriesNo!=""){
			seriesNo = params.seriesNo
		}
		
		def assetType
		if(params.assetType && params.assetType!=""){
			assetType = params.assetType
		}
		
		def assetId
		def assetIds
		if(params.assetId && params.assetId!="" && params.assetId!=null){
			assetId = params.assetId
			assetIds = assetId.split(",")
		}
		
		def nowTotalPrice
		double assetTotal = 0
		if(params.assetTotal && params.assetTotal!=""){
			nowTotalPrice = params.assetTotal.replace("-",".").toDouble()
			assetTotal = nowTotalPrice
			
		}
		double totalPrice = 0
		
		def carRegister
		def landRegister
		def houseRegister
		def deviceRegister
		def bookRegister
		def furnitureRegister
		
		if(assetIds.size()>0){
			assetIds.each{
				//将申请单号和资产变更类型写入资产建账信息中，同时计算总金额
				if(assetType.equals("car")){
					carRegister = CarRegister.get(it)
					if(carRegister){
						carRegister.assetStatus = "调拨待审批"
						carRegister.seriesNo = seriesNo
						totalPrice = carRegister.totalPrice
					}
				}else if(assetType.equals("land")){
					landRegister = LandRegister.get(it)
					if(landRegister){
						landRegister.assetStatus = "调拨待审批"
						landRegister.seriesNo = seriesNo
						totalPrice = landRegister.totalPrice
					}
				}else if(assetType.equals("house")){
					houseRegister = HouseRegister.get(it)
					if(houseRegister){
						houseRegister.assetStatus = "调拨待审批"
						houseRegister.seriesNo = seriesNo
						totalPrice = houseRegister.totalPrice
					}
				}else if(assetType.equals("device")){
					deviceRegister = DeviceRegister.get(it)
					if(deviceRegister){
						deviceRegister.assetStatus = "调拨待审批"
						deviceRegister.seriesNo = seriesNo
						totalPrice = deviceRegister.totalPrice
					}
				}else if(assetType.equals("book")){
					bookRegister = BookRegister.get(it)
					if(bookRegister){
						bookRegister.assetStatus = "调拨待审批"
						bookRegister.seriesNo = seriesNo
						totalPrice = bookRegister.totalPrice
					}
				}else if(assetType.equals("furniture")){
					furnitureRegister = FurnitureRegister.get(it)
					if(furnitureRegister){
						furnitureRegister.assetStatus = "调拨待审批"
						furnitureRegister.seriesNo = seriesNo
						totalPrice = furnitureRegister.totalPrice
					}
				}
				assetTotal += totalPrice
			}
			message = "操作成功！"
			json = [result:'true',assetTotal:assetTotal,message:message]
		}else{
			message = "操作失败！"
			json = [result:'error',assetTotal:assetTotal,message:message]
		}
		render json as JSON
	}
	
	def assetChooseDelete = {
		def json,message
		def assetAddDelete = new AssetAddDelete()
		
		def carRegister
		def landRegister
		def houseRegister
		def deviceRegister
		def bookRegister
		def furnitureRegister
		
		double totalPrice = 0
		double assetTotal = 0
		
		if(params.addDeleteId && !"".equals(params.addDeleteId)){
			assetAddDelete = AssetAddDelete.get(params.addDeleteId)
			assetTotal = assetAddDelete.assetTotal
		}
		
		def assetId
		def assetIds
		if(params.assetId && params.assetId!="" && params.assetId!=null){
			assetId = params.assetId
			assetIds = assetId.split(",")
		}
		if(assetIds.size()>0){
			assetIds.each{
				//变更资产建账信息中的申请单号和资产变更类型，同时计算总金额
				carRegister = CarRegister.get(it)
				if(carRegister){
					carRegister.assetStatus = "已入库"
					carRegister.seriesNo = null
					totalPrice = carRegister.totalPrice
				}
				landRegister = LandRegister.get(it)
				if(landRegister){
					landRegister.assetStatus = "已入库"
					landRegister.seriesNo = null
					totalPrice = landRegister.totalPrice
				}
				houseRegister = HouseRegister.get(it)
				if(houseRegister){
					houseRegister.assetStatus = "已入库"
					houseRegister.seriesNo = null
					totalPrice = houseRegister.totalPrice
				}
				deviceRegister = DeviceRegister.get(it)
				if(deviceRegister){
					deviceRegister.assetStatus = "已入库"
					deviceRegister.seriesNo = null
					totalPrice = deviceRegister.totalPrice
				}
				bookRegister = BookRegister.get(it)
				if(bookRegister){
					bookRegister.assetStatus = "已入库"
					bookRegister.seriesNo = null
					totalPrice = bookRegister.totalPrice
				}
				furnitureRegister = FurnitureRegister.get(it)
				if(furnitureRegister){
					furnitureRegister.assetStatus = "已入库"
					furnitureRegister.seriesNo = null
					totalPrice = furnitureRegister.totalPrice
				}
				assetTotal -= totalPrice
			}
			message = "操作成功！"
			json = [result:'true',assetTotal:assetTotal,message:message]
		}else{
			message = "操作失败！"
			json = [result:'error',assetTotal:assetTotal,message:message]
		}
		render json as JSON
	}
}
