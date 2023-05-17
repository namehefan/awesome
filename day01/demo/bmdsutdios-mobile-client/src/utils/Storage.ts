/* src/utils/Storage.ts  
 * 提供WebStorage的数据存储与读取功能的工具模块 */

/** 此处管理项目中所有需要存储的KEY */
export enum KEYS {
  TOKEN
}

/** 将传入的key与data配对，存入sessionStorage */
export const set = (key:string, data:any)=>{
  sessionStorage.setItem(key, JSON.stringify(data))
}

/** 通过Key从sessionStorage找到对应value */
export const get = (key:string)=>{
  const data = sessionStorage.getItem(key)
  if(data) {
    return JSON.parse(data)
  }else {
    return null
  }
}

