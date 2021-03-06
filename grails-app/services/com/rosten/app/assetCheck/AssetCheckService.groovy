package com.rosten.app.assetCheck

import com.rosten.app.util.GridUtil

class AssetCheckService {
	def springSecurityService
	
	//盘点卡片信息-----------------------------------------------------
	def getTaskCardsListLayout ={
		def gridUtil = new GridUtil()
		return gridUtil.buildLayoutJSON(new TaskCards())
	}
	
	def getTaskCardsDataStore ={params->
		Integer offset = (params.offset)?params.offset.toInteger():0
		Integer max = (params.max)?params.max.toInteger():15
		def propertyList = getAllTaskCards(offset,max,params.company,params.myTask)

		def gridUtil = new GridUtil()
		return gridUtil.buildDataList("id","title",propertyList,offset)
	}
	
	def getAllTaskCards ={offset,max,company,myTask->
		def c = TaskCards.createCriteria()
		def pa=[max:max,offset:offset]
		def query = {
			eq("company",company)
			eq("myTask",myTask)
		}
		return c.list(pa,query)
	}
	def getTaskCardsCount ={company,myTask->
		def c = TaskCards.createCriteria()
		def query = {
			eq("company",company)
			eq("myTask",myTask)
		}
		return c.count(query)
	}
	//-------------------------------------------------------------
	
	//盘点任务发布
	def getInventoryTaskListLayout ={
		def gridUtil = new GridUtil()
		return gridUtil.buildLayoutJSON(new InventoryTask())
	}
	
	def getInventoryTaskDataStore ={params->
		Integer offset = (params.offset)?params.offset.toInteger():0
		Integer max = (params.max)?params.max.toInteger():15
		def propertyList = getAllInventoryTask(offset,max,params.company)

		def gridUtil = new GridUtil()
		return gridUtil.buildDataList("id","title",propertyList,offset)
	}
	
	def getAllInventoryTask ={offset,max,company->
		def c = InventoryTask.createCriteria()
		def pa=[max:max,offset:offset]
		def query = {
			eq("company",company)
			order("createDate", "desc")
		}
		return c.list(pa,query)
	}
	
	def getInventoryTaskCount ={company->
		def c = InventoryTask.createCriteria()
		def query = { 
			eq("company",company) 
		}
		return c.count(query)
	}
	//我的盘点任务
	def getMyTaskListLayout ={
		def gridUtil = new GridUtil()
		return gridUtil.buildLayoutJSON(new MyTask())
	}
	
	def getMyTaskDataStore ={params->
		Integer offset = (params.offset)?params.offset.toInteger():0
		Integer max = (params.max)?params.max.toInteger():15
		def propertyList = getAllMyTask(offset,max,params.company)

		def gridUtil = new GridUtil()
		return gridUtil.buildDataList("id","title",propertyList,offset)
	}
	
	def getAllMyTask ={offset,max,company->
		def user = springSecurityService.getCurrentUser()
		def c = MyTask.createCriteria()
		def pa=[max:max,offset:offset]
		def query = {
			eq("company",company)
			
			//匹配盘点任务接收人
			if(!"admin".equals(user.getUserType())){
				eq("user",user)
			}
			order("createDate", "desc")
		}
		return c.list(pa,query)
	}
	
	def getMyTaskCount ={company->
		def user = springSecurityService.getCurrentUser()
		def c = MyTask.createCriteria()
		def query = {
			eq("company",company)
			//匹配盘点任务接收人
			if(!"admin".equals(user.getUserType())){
				eq("user",user)
				
			}
		}
		return c.count(query)
	}
}
