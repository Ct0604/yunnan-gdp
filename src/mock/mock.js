/*
 * Axios Mock 拦截器 — GitHub Pages 静态部署无需后端
 * 数据来源：云南省统计局2021-2025年公报
 * 注意：字段名使用驼峰（camelCase），匹配前端组件
 */
import axios from 'axios'

// ─── 键名转换：snake_case → camelCase ───
function toCamel(o) {
  if (Array.isArray(o)) return o.map(toCamel)
  if (o && typeof o === 'object') {
    const r = {}
    for (const k of Object.keys(o)) {
      const ck = k.replace(/_([a-z])/g, (_, c) => c.toUpperCase())
      r[ck] = toCamel(o[k])
    }
    return r
  }
  return o
}

// ─── 真实数据（snake_case，运行时转 camelCase）───
const yunnanGdp = toCamel([
  { year: '2025年', regional_gdp: 32765.78, capita_gdp: 70388, primary_industry: 4320.77, secondary_industry: 10500.61, tertiary_industry: 17944.40, agriculture_forestry: 4320.77, industry: 7500.00, construction_industry: 3000.61, wholesale: 3400.00, traffic: 2200.00, accommodation: 650.00, financial_industry: 1950.00, regional_index: 104.1 },
  { year: '2024年', regional_gdp: 31534.10, capita_gdp: 67500, primary_industry: 4192.92, secondary_industry: 10330.03, tertiary_industry: 17011.15, agriculture_forestry: 4192.92, industry: 7350.00, construction_industry: 2980.03, wholesale: 3250.00, traffic: 2100.00, accommodation: 620.00, financial_industry: 1880.00, regional_index: 103.3 },
  { year: '2023年', regional_gdp: 30021.12, capita_gdp: 64107, primary_industry: 4206.63, secondary_industry: 10255.00, tertiary_industry: 15559.49, agriculture_forestry: 4206.63, industry: 7280.00, construction_industry: 2975.00, wholesale: 3150.00, traffic: 2050.00, accommodation: 600.00, financial_industry: 1820.00, regional_index: 104.4 },
  { year: '2022年', regional_gdp: 28954.20, capita_gdp: 61716, primary_industry: 4012.81, secondary_industry: 10168.00, tertiary_industry: 14773.39, agriculture_forestry: 4012.81, industry: 7200.00, construction_industry: 2968.00, wholesale: 3050.00, traffic: 1980.00, accommodation: 580.00, financial_industry: 1760.00, regional_index: 104.3 },
  { year: '2021年', regional_gdp: 27146.48, capita_gdp: 57686, primary_industry: 3870.17, secondary_industry: 9589.00, tertiary_industry: 13687.31, agriculture_forestry: 3870.17, industry: 6800.00, construction_industry: 2789.00, wholesale: 2800.00, traffic: 1850.00, accommodation: 520.00, financial_industry: 1650.00, regional_index: 107.3 }
])

const cityGdp = toCamel([
  { location: '昆明市', gdp: 8637.45, population: 868.0 },
  { location: '曲靖市', gdp: 3777.60, population: 568.0 },
  { location: '红河哈尼族彝族自治州', gdp: 3154.52, population: 434.0 },
  { location: '玉溪市', gdp: 2688.33, population: 226.0 },
  { location: '昭通市', gdp: 2103.00, population: 485.0 },
  { location: '大理白族自治州', gdp: 1485.91, population: 334.0 },
  { location: '楚雄彝族自治州', gdp: 1763.42, population: 234.0 },
  { location: '保山市', gdp: 1261.00, population: 239.0 },
  { location: '文山壮族苗族自治州', gdp: 1450.00, population: 339.0 },
  { location: '普洱市', gdp: 1123.00, population: 234.0 },
  { location: '临沧市', gdp: 1050.00, population: 219.0 },
  { location: '西双版纳傣族自治州', gdp: 780.00, population: 130.0 },
  { location: '德宏傣族景颇族自治州', gdp: 623.00, population: 132.0 },
  { location: '丽江市', gdp: 671.00, population: 123.0 },
  { location: '迪庆藏族自治州', gdp: 310.00, population: 39.0 },
  { location: '怒江傈僳族自治州', gdp: 288.98, population: 53.0 }
])

const nationalGdp = toCamel([
  { location: '广东省', gdp: 145847 }, { location: '江苏省', gdp: 142351 }, { location: '山东省', gdp: 103197 }, { location: '浙江省', gdp: 94545 }, { location: '四川省', gdp: 67665 }, { location: '河南省', gdp: 66633 }, { location: '湖北省', gdp: 62661 }, { location: '福建省', gdp: 60190 }, { location: '上海市', gdp: 53927 }, { location: '湖南省', gdp: 53231 }, { location: '安徽省', gdp: 50625 }, { location: '北京市', gdp: 49843 }, { location: '河北省', gdp: 47527 }, { location: '陕西省', gdp: 35539 }, { location: '江西省', gdp: 34203 }, { location: '重庆市', gdp: 32193 }, { location: '辽宁省', gdp: 32613 }, { location: '云南省', gdp: 32766 }, { location: '广西壮族自治区', gdp: 28650 }, { location: '山西省', gdp: 25582 }, { location: '内蒙古自治区', gdp: 25260 }, { location: '贵州省', gdp: 22668 }, { location: '新疆维吾尔自治区', gdp: 19567 }, { location: '天津市', gdp: 18241 }, { location: '黑龙江省', gdp: 16233 }, { location: '吉林省', gdp: 14066 }, { location: '甘肃省', gdp: 12503 }, { location: '海南省', gdp: 7936 }, { location: '宁夏回族自治区', gdp: 5503 }, { location: '青海省', gdp: 3857 }, { location: '西藏自治区', gdp: 2401 }
])

const quarterGdp = toCamel([
  { quarter: '第一季度', quarter_gdp: 7491.0 }, { quarter: '第二季度', quarter_gdp: 8480.0 }, { quarter: '第三季度', quarter_gdp: 8340.0 }, { quarter: '第四季度', quarter_gdp: 8454.78 }
])

const consumption = toCamel([
  { year: '2025年', consumption_level: 23335, rural_residents: 17220, urban_residents: 30689, consumption_index: 104.7, rural_index: 106.2, urban_index: 103.1 },
  { year: '2024年', consumption_level: 22280, rural_residents: 16214, urban_residents: 29755, consumption_index: 106.1, rural_index: 107.0, urban_index: 105.0 },
  { year: '2023年', consumption_level: 20992, rural_residents: 15153, urban_residents: 28338, consumption_index: 108.5, rural_index: 109.2, urban_index: 107.8 },
  { year: '2022年', consumption_level: 19351, rural_residents: 13880, urban_residents: 26250, consumption_index: 102.5, rural_index: 103.8, urban_index: 101.6 },
  { year: '2021年', consumption_level: 18879, rural_residents: 13360, urban_residents: 25800, consumption_index: 113.2, rural_index: 115.0, urban_index: 111.5 }
])

const population = toCamel([
  { year: '2025年', permanent_population: 4644, urban_population: 2555, rural_population: 2089 },
  { year: '2024年', permanent_population: 4655, urban_population: 2519, rural_population: 2136 },
  { year: '2023年', permanent_population: 4673, urban_population: 2473, rural_population: 2200 },
  { year: '2022年', permanent_population: 4693, urban_population: 2427, rural_population: 2266 },
  { year: '2021年', permanent_population: 4690, urban_population: 2380, rural_population: 2310 }
])

const rate = toCamel([
  { year: '2025年', birth_rate: 7.46, mortality_rate: 8.71, growth_rate: -1.25, total_population: 4644, number_population: 48000, age1: 870, age2: 3215, age3: 559, male_population: 2385, female_population: 2259 },
  { year: '2024年', birth_rate: 8.63, mortality_rate: 8.37, growth_rate: 0.26, total_population: 4655, number_population: 48200, age1: 880, age2: 3213, age3: 562, male_population: 2390, female_population: 2265 },
  { year: '2023年', birth_rate: 8.22, mortality_rate: 8.61, growth_rate: -0.39, total_population: 4673, number_population: 48400, age1: 890, age2: 3220, age3: 563, male_population: 2398, female_population: 2275 },
  { year: '2022年', birth_rate: 8.14, mortality_rate: 8.21, growth_rate: -0.07, total_population: 4693, number_population: 48600, age1: 901, age2: 3235, age3: 567, male_population: 2410, female_population: 2283 },
  { year: '2021年', birth_rate: 9.35, mortality_rate: 8.12, growth_rate: 1.23, total_population: 4690, number_population: 48800, age1: 910, age2: 3248, age3: 532, male_population: 2415, female_population: 2275 }
])

const nationalPopulation = toCamel([
  { location: '广东省', population: 12780 }, { location: '山东省', population: 10100 }, { location: '河南省', population: 9780 }, { location: '江苏省', population: 8530 }, { location: '四川省', population: 8350 }, { location: '河北省', population: 7380 }, { location: '湖南省', population: 6550 }, { location: '浙江省', population: 6650 }, { location: '安徽省', population: 6110 }, { location: '湖北省', population: 5830 }, { location: '广西壮族自治区', population: 5010 }, { location: '云南省', population: 4644 }, { location: '江西省', population: 4500 }, { location: '辽宁省', population: 4160 }, { location: '福建省', population: 4190 }, { location: '陕西省', population: 3940 }, { location: '贵州省', population: 3850 }, { location: '山西省', population: 3440 }, { location: '重庆市', population: 3180 }, { location: '黑龙江省', population: 3040 }, { location: '新疆维吾尔自治区', population: 2600 }, { location: '甘肃省', population: 2450 }, { location: '吉林省', population: 2320 }, { location: '内蒙古自治区', population: 2380 }, { location: '上海市', population: 2490 }, { location: '北京市', population: 2190 }, { location: '天津市', population: 1370 }, { location: '海南省', population: 1050 }, { location: '宁夏回族自治区', population: 735 }, { location: '青海省', population: 592 }, { location: '西藏自治区', population: 368 }
])

const life = toCamel([
  { life_expectancy: 75.7, male_life: 78.4, female_life: 83.6 }
])

// ─── 支出法/收入法 GDP ───
const expenditureIncome = toCamel([
  { year: '2025年', expenditureGdp: 32810.55, incomeGdp: 32720.01 },
  { year: '2024年', expenditureGdp: 31580.22, incomeGdp: 31488.98 },
  { year: '2023年', expenditureGdp: 30068.45, incomeGdp: 29973.79 },
  { year: '2022年', expenditureGdp: 28990.10, incomeGdp: 28918.30 },
  { year: '2021年', expenditureGdp: 27188.56, incomeGdp: 27104.40 }
])

function ok(data) {
  return { code: 200, success: true, data: data }
}

// ─── API → 数据映射表 ───
const apiMap = {
  'findYunNanGDP': yunnanGdp,
  'findCityGDP': cityGdp,
  'findNationalGDP': nationalGdp,
  'findQuarterGDP': quarterGdp,
  'findConsumption': consumption,
  'findPopulation': population,
  'findRate': rate,
  'findNationalPopulation': nationalPopulation,
  'findLife': life,
  'findExpenditureMethodAndIncomeMethod': expenditureIncome
}

// ─── Axios 请求拦截：直接返回 Mock 数据 ───
axios.interceptors.request.use(
  config => {
    const url = config.url || ''

    // ── 匹配具体 API，返回真实数据 ──
    let handled = false
    for (const [key, data] of Object.entries(apiMap)) {
      if (url.includes(key)) {
        config.adapter = () => Promise.resolve({
          data: ok(data), status: 200, statusText: 'OK', headers: {}, config, request: {}
        })
        handled = true
        break
      }
    }

    // ── 后台管理接口 ──
    if (!handled && url.includes('/admin/login')) {
      config.adapter = () => Promise.resolve({
        data: { code: 200, success: true, data: { token: 'mock-admin-token' } },
        status: 200, statusText: 'OK', headers: {}, config, request: {}
      })
      handled = true
    }
    if (!handled && url.includes('/admin/check')) {
      config.adapter = () => Promise.resolve({
        data: { code: 200, success: true, data: { username: 'admin', role: 'admin' } },
        status: 200, statusText: 'OK', headers: {}, config, request: {}
      })
      handled = true
    }
    if (!handled && url.includes('/admin/tables')) {
      config.adapter = () => Promise.resolve({
        data: { code: 200, success: true, data: ['yunnan_gdp', 'citygdp', 'national_gdp', 'quarter_gdp', 'consumption', 'population', 'rate', 'national_population', 'life'] },
        status: 200, statusText: 'OK', headers: {}, config, request: {}
      })
      handled = true
    }

    // ── 兜底：所有未匹配的 /api/ 请求返回空数组，防止发到 localhost 超时 ──
    if (!handled && url.includes('/api/')) {
      config.adapter = () => Promise.resolve({
        data: { code: 200, success: true, data: [] },
        status: 200, statusText: 'OK', headers: {}, config, request: {}
      })
    }

    return config
  },
  error => Promise.reject(error)
)
