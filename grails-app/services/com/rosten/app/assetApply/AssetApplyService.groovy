package com.rosten.app.assetApply

import com.rosten.app.util.GridUtil
import com.rosten.app.system.UserGroup

class AssetApplyService {

	def springSecurityService
	
	def getMineApplyDataStore ={params,searchArgs->
		Integer offset = (params.offset)?params.offset.toInteger():0
		Integer max = (params.max)?params.max.toInteger():15
		def propertyList = getAllMineApply(offset,max,params.company,searchArgs)

		def gridUtil = new GridUtil()
		return gridUtil.buildDataList("id","title",propertyList,offset)
	}
	
	def getAllMineApply ={offset,max,company,searchArgs->
		def user = springSecurityService.getCurrentUser()
		def userGroups = UserGroup.findAllByUser(user).collect { elem ->
			elem.group.groupName
		}
		def c = ApplyNotes.createCriteria()
		def pa=[max:max,offset:offset]
		def query = {
			if("xhzcgly" in userGroups || "zcgly" in userGroups || "协会资产管理员" in userGroups || "资产管理员" in userGroups || user.getAllRolesValue().contains("资产管理员")){
				eq("company",company)
			}else{
				eq("company",company)
				or{
					eq("currentUser",user)
					eq("applyUser",user)
				}
			}
			searchArgs.each{k,v->
				if(k.equals("userCategory")){
					eq(k,v)
				}else{
					like(k,"%" + v + "%")
				}
			}
			order("createDate", "desc")
		}
		return c.list(pa,query)
	}
	
	def getMineApplyCount ={company,searchArgs->
		def user = springSecurityService.getCurrentUser()
		def userGroups = UserGroup.findAllByUser(user).collect { elem ->
			elem.group.groupName
		}
		def c = ApplyNotes.createCriteria()
		def query = {
			if("xhzcgly" in userGroups || "zcgly" in userGroups || "协会资产管理员" in userGroups || "资产管理员" in userGroups || user.getAllRolesValue().contains("资产管理员")){
				eq("company",company)
			}else{
				eq("company",company)
				or{
					eq("currentUser",user)
					eq("applyUser",user)
				}
			}
			searchArgs.each{k,v->
				if(k.equals("userCategory")){
					eq(k,v)
				}else{
					like(k,"%" + v + "%")
				}
			}
		}
		return c.count(query)
	}
	
    def getAssetApplyListLayout ={
		def gridUtil = new GridUtil()
		return gridUtil.buildLayoutJSON(new ApplyNotes())
	}
	
	def getAssetApplyDataStore ={params,searchArgs->
		Integer offset = (params.offset)?params.offset.toInteger():0
		Integer max = (params.max)?params.max.toInteger():15
		def propertyList = getAllAssetApply(offset,max,params.company,searchArgs)

		def gridUtil = new GridUtil()
		return gridUtil.buildDataList("id","title",propertyList,offset)
	}
	
	def getAllAssetApply ={offset,max,company,searchArgs->
		def user = springSecurityService.getCurrentUser()
		def c = ApplyNotes.createCriteria()
		def pa=[max:max,offset:offset]
		def query = {
			eq("company",company)
			eq("applyStatus","已结束")
			searchArgs.each{k,v->
				if(k.equals("userCategory")){
					eq(k,v)
				}else{
					like(k,"%" + v + "%")
				}
			}
			order("createDate", "desc")
		}
		return c.list(pa,query)
	}
	
	def getAssetApplyCount ={company,searchArgs->
		def user = springSecurityService.getCurrentUser()
		def c = ApplyNotes.createCriteria()
		def query = { 
			eq("company",company) 
			eq("applyStatus","已结束")
			searchArgs.each{k,v->
				if(k.equals("userCategory")){
					eq(k,v)
				}else{
					like(k,"%" + v + "%")
				}
			}
		}
		return c.count(query)
	}
	
    def serviceMethod() {

    }
}
