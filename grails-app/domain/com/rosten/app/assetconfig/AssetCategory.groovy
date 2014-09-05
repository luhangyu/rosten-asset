package com.rosten.app.assetconfig

import java.util.Date;

import com.rosten.app.annotation.GridColumn
import com.rosten.app.system.Company

import java.text.SimpleDateFormat
import java.util.Date
import java.util.List;

class AssetCategory {
	String id
	
	//父资产名称
	String parentName
	 
	//资产分类
	@GridColumn(name="资产分类")
	String categoryName
	
	//分类代码
	@GridColumn(name="分类代码")
	String categoryCode
	
	//总分类
	String allCode
	
	Date createDate = new Date()
	@GridColumn(name="创建日期",width="106px",colIdx=2)
	def getFormattedCreateDate(){
		if(createDate!=null){
			SimpleDateFormat sd = new SimpleDateFormat("yyyy-MM-dd HH:mm")
			return sd.format(createDate)
		}else{
			return ""
		}
	}
	def getFormattedShowCreateDate(){
		if(createDate!=null){
			SimpleDateFormat sd = new SimpleDateFormat("yyyy-MM-dd")
			return sd.format(createDate)
		}else{
			return ""
		}
	}
	
	//描述
	@GridColumn(name="描述")
	String description
	
	List children
	
	//上层分类
	AssetCategory parent
	
	static belongsTo = [company:Company]
	
	static hasMany = [children:AssetCategory]
	
    static constraints = {
		parentName nullable:true,blank:true
		categoryName nullable:false,blank:false
		categoryCode nullable:false,blank:false
		allCode nullable:true,blank:true
		createDate nullable:false,blank:false
		description nullable:true,blank:true
		parent nullable:true
		children(nullable:true)
    }
	
	static mapping = {
		id generator:'uuid.hex',params:[separator:'-']
		table "ROSTEN_ASSET_CATEGORY"
		
		description sqlType:"text"
	}
	
	def beforeDelete(){
	}
	
}
