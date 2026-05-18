/*
 * @Author: daidai
 * @Date: 2021-12-23 11:18:37
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-04-28 15:10:45
 * @FilePath: \web-pc\src\api\modules\index.js
 */
import * as API from "../api";

// 可视化大屏查询接口映射（保持与原后端路径一致）
export const paramType = {
  // GDP
  'big1': "/api/findYunNanGDP",
  'big2': "/api/findYunNanGDP",
  'big3': "/api/findYunNanGDP",
  'big4': "/api/findYunNanGDP",
  'big5': '/api/findExpenditureMethodAndIncomeMethod',
  'big6': '/api/findQuarterGDP',
  'big7': '/api/findConsumption',
  'big8': '/api/findNationalGDP',
  'big9': '/api/findCityGDP',
  // 人口
  'big10': '/api/findPopulation',
  'big15': '/api/findRate',
  'big16': '/api/findLife',
  'big12': '/api/findRate',
  'big11': '/api/findRate',
  'big14': '/api/findRate',
  'big17': '/api/findRate',
  'big13': '/api/findNationalPopulation',
}

// ===== 可视化大屏通用查询 =====
export const currentGET = (key, param) => {
  return API.GET(paramType[key], param)
}
export const currentPOST = (key, param) => {
  return API.POST(paramType[key], param)
}

// ===== 后台管理系统 CRUD 接口 =====

// 云南省GDP
export const getYunNanGdpList = () => API.GET('/api/findYunNanGDP')
export const getYunNanGdpById = (id) => API.GET('/api/yunnanGdp/' + id)
export const addYunNanGdp = (data) => API.POST('/api/yunnanGdp', data)
export const updateYunNanGdp = (data) => API.PUT('/api/yunnanGdp', data)
export const deleteYunNanGdp = (id) => API.DELETE('/api/yunnanGdp/' + id)

// 各市GDP
export const getCityGdpList = () => API.GET('/api/findCityGDP')
export const getCityGdpById = (id) => API.GET('/api/cityGdp/' + id)
export const addCityGdp = (data) => API.POST('/api/cityGdp', data)
export const updateCityGdp = (data) => API.PUT('/api/cityGdp', data)
export const deleteCityGdp = (id) => API.DELETE('/api/cityGdp/' + id)

// 全国GDP
export const getNationalGdpList = () => API.GET('/api/findNationalGDP')
export const getNationalGdpById = (id) => API.GET('/api/nationalGdp/' + id)
export const addNationalGdp = (data) => API.POST('/api/nationalGdp', data)
export const updateNationalGdp = (data) => API.PUT('/api/nationalGdp', data)
export const deleteNationalGdp = (id) => API.DELETE('/api/nationalGdp/' + id)

// 季度GDP
export const getQuarterGdpList = () => API.GET('/api/findQuarterGDP')
export const getQuarterGdpById = (id) => API.GET('/api/quarterGdp/' + id)
export const addQuarterGdp = (data) => API.POST('/api/quarterGdp', data)
export const updateQuarterGdp = (data) => API.PUT('/api/quarterGdp', data)
export const deleteQuarterGdp = (id) => API.DELETE('/api/quarterGdp/' + id)

// 居民消费
export const getConsumptionList = () => API.GET('/api/findConsumption')
export const getConsumptionById = (id) => API.GET('/api/consumption/' + id)
export const addConsumption = (data) => API.POST('/api/consumption', data)
export const updateConsumption = (data) => API.PUT('/api/consumption', data)
export const deleteConsumption = (id) => API.DELETE('/api/consumption/' + id)

// 人口
export const getPopulationList = () => API.GET('/api/findPopulation')
export const getPopulationById = (id) => API.GET('/api/population/' + id)
export const addPopulation = (data) => API.POST('/api/population', data)
export const updatePopulation = (data) => API.PUT('/api/population', data)
export const deletePopulation = (id) => API.DELETE('/api/population/' + id)

// 人口出生率/死亡率
export const getRateList = () => API.GET('/api/findRate')
export const getRateById = (id) => API.GET('/api/rate/' + id)
export const addRate = (data) => API.POST('/api/rate', data)
export const updateRate = (data) => API.PUT('/api/rate', data)
export const deleteRate = (id) => API.DELETE('/api/rate/' + id)

// 全国人口
export const getNationalPopulationList = () => API.GET('/api/findNationalPopulation')
export const getNationalPopulationById = (id) => API.GET('/api/nationalPopulation/' + id)
export const addNationalPopulation = (data) => API.POST('/api/nationalPopulation', data)
export const updateNationalPopulation = (data) => API.PUT('/api/nationalPopulation', data)
export const deleteNationalPopulation = (id) => API.DELETE('/api/nationalPopulation/' + id)

// 平均寿命
export const getLifeList = () => API.GET('/api/findLife')
export const getLifeById = (id) => API.GET('/api/life/' + id)
export const addLife = (data) => API.POST('/api/life', data)
export const updateLife = (data) => API.PUT('/api/life', data)
export const deleteLife = (id) => API.DELETE('/api/life/' + id)

// 管理员
export const adminLogin = (data) => API.POST('/api/admin/login', data)
export const adminCheck = () => API.GET('/api/admin/check')
export const adminLogout = () => API.POST('/api/admin/logout')
export const getTableList = () => API.GET('/api/admin/tables')

// 通用接口集合
export const currentApi = {
  currentGET,
  currentPOST
}
