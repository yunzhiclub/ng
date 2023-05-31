/**
 * 对字符串进行简单的加密
 * @param sourceString 字符串
 * @return hash值
 */
export function hash(sourceString: string): number {
  let hashCode = 0;
  let i;
  let chr;
  for (i = 0; i < sourceString.length; i++) {
    chr = sourceString.charCodeAt(i);
    // tslint:disable-next-line:no-bitwise
    hashCode = ((hashCode << 5) - hashCode) + chr;
    // tslint:disable-next-line:no-bitwise
    hashCode |= 0; // Convert to 32bit integer
  }
  return hashCode;
}

export const randomNumber = (range = 1000) => {
  return Math.floor(Math.random() * range);
};

/**
 * 转换为loading字样
 * @param target 目标字符串
 * @param suffix 后缀
 * @param length 长度
 * @example
 * '请稍候' => '请稍候.'
 * '请稍候.' => '请稍候..'
 * '请稍候..' => '请稍候...'
 * '请稍候...' => '请稍候'
 */
export function convertToLoadingFormat(target: string, suffix = '.', length = 3): string {
  const strings = target.split(suffix);
  if (strings.length <= length) {
    target += '.';
  } else {
    target = strings[0];
  }
  return target;
}

/**
 * 当值为undefined或null时返回默认值
 * @param value 传入值
 * @param defaultValue 默认值
 */
export function getDefaultWhenValueIsInValid<T>(value: T, defaultValue: T): T {
  if (value === undefined || value === null || Number.isNaN(value) ) {
    return defaultValue;
  }

  return value;
}



export class Assert {
  /**
   * 断言是数组
   * @param value 断言的值
   * @param message 出错提示
   */
  static isArray(value: any, message: string): void {
    if (!isNotNullOrUndefined(value) || !Array.isArray(value)) {
      throw new Error(message);
    }
  }
  /**
   * 断言被定义
   * undefined 异常
   * null 成功
   * other 成功
   * @param args 多参数
   */
  static isDefined(...args: any[]): void {
    const message = this.validateArgs(args);
    args.forEach(value => {
      if (!isDefined(value)) {
        throw new Error(message);
      }
    });
  }

  /**
   * 断言有整型（不包含NaN)
   * @param args
   */
  static isInteger(...args: any[]): void {
    const message = this.validateArgs(args);
    args.forEach(value => {
      if (!Number.isInteger(value)) {
        throw new Error(message);
      }
    });
  }

  static isObject(...args: any[]): void {
    const message = this.validateArgs(args);
    args.forEach(arg => {
      const type = typeof arg;
      const isObject = type === 'function' || type === 'object' && !!arg;
      if (!isObject) {
        throw new Error(message);
      }
    });
  }

  /**
   * 断言输入的值为字符串
   * @param args 字符串1，字符串2...提示信息
   */
  static isString(...args: any[]): void {
    const message = this.validateArgs(args);
    args.forEach(value => {
      if (typeof value !== 'string') {
        throw new Error(message);
      }
    });
  }

  static isNotNullOrUndefined(...args: any[]): void {
    const message = this.validateArgs(args);
    args.forEach((value, index) => {
      if (!isNotNullOrUndefined(value)) {
        throw new Error(`${message}:${index}`);
      }
    });
  }

  /**
   * 校验参考并返回参数的最后一项做为message提示消息返回
   * @param args 多个参数
   */
  private static validateArgs(args: any[]): string {
    if (args.length < 2) {
      throw new Error('最少输入两个参数');
    }

    if (typeof (args[args.length - 1]) !== 'string') {
      throw new Error('最后一个参数必须为字符串');
    }

    return args.pop();
  }

  static isUndefined(param: any): void {
    if (typeof param !== 'undefined') {
      throw new Error('变量已定义');
    }
  }

  /**
   * 断言为null
   * null 成功
   * undefined 异常
   * other 异常
   * @param param 输入
   */
  static isNull(param: any): void {
    if (typeof param === 'undefined' || param !== null) {
      throw new Error('变量非空');
    }
  }

  /**
   * 断言类型为number
   * @param args 最少输入两个参数，前面的参数为校验值，最后一个提示信息
   */
  static isNumber(...args: any[]): void {
    const message = this.validateArgs(args);
    args.forEach(value => {
      if (typeof value !== 'number') {
        throw new Error(message);
      }
    });
  }

  static isTrue(...args: any[]): void {
    const message = this.validateArgs(args);
    args.forEach(value => {
      if (value !== true) {
        throw new Error(message);
      }
    });
  }
}

/**
 * 是否不为null或undefined
 * undefined -> false
 * null -> false
 * other -> true
 * @param value 值
 */
export function isNotNullOrUndefined<T>(value: T | undefined | null): value is T {
  return value as T !== undefined && value as T !== null;
}

/**
 * 为null或undefined
 * @param value 值
 */
export function isNullOrUndefined<T>(value: T | undefined | null): value is T {
  return !isNotNullOrUndefined(value);
}

/**
 * 是否被定义
 * undefined -> false
 * other -> true
 * @param value 校验值
 */
export function isDefined<T>(value: T | undefined): value is T {
  return value as T !== undefined;
}

export function uniqueId(): string {
  return '_' + Math.random().toString(36).substr(2, 9);
}

/**
 * 只包含属性而不包含方法
 * https://stackoverflow.com/questions/52692606/how-to-declare-a-type-in-typescript-that-only-includes-objects-and-not-functions
 */
export interface UnknownProperty {
  [k: string]: unknown;
}


// 解码
const decodeUnicode = (str: string): string => {
  str = '\\u' + str;
  str = str.replace(/\\/g, '%');

  str = unescape(str);
  str = str.replace(/%/g, '\\');
  return str;
};

export class Random {
  /**
   * 获取随机数据
   * @param width 位宽
   */
  static nextNumber(width = 32): number {
    let range = 1;
    while (width > 0) {
      range = range * 2;
      width--;
    }

    return Math.floor(Math.random() * range);
  }

  /**
   * 获取随机字符串
   * @param prefix 返回字符串的前缀
   * @param length 字符串长度
   */
  static nextString(prefix = '', length = 4): string {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return prefix + result;
  }
}

/*
* 获取取机的中文字符串
*/
export const randomChineseString = (preString = '', length = 3): string => {
  let name = '';
  for (let i = 0; i < length; i++) {
    let unicodeNum = '';
    unicodeNum = randomNumberByRange(0x4e00, 0x9fa5).toString(16);
    name += decodeUnicode(unicodeNum);
  }
  return preString + name;
};

/**
 * 获取指定范围内的随机数
 * @param min 最小值
 * @param max 最大值
 */
const randomNumberByRange = (min = 0, max = 1000): number => {
  return Math.floor(Math.random() * (min - max) + max);
};

/**
 * 随机时间戳
 * @param day 随机生成的时间范围（天）
 * @param baseDate 生成时间范围基于某天
 * @sample
 * randomTimestamp(10, new Date(2020, 7, 12))
 * 返回：2020年7月12日前后10天的随机一天
 */
export const randomTimestamp = (day = 7, baseDate = new Date()) => {
  const range = 1000 * 60 * 60 * 24 * day * 2;
  return baseDate.getTime() + randomNumber(range) - range / 2;
};


export const randomBoolean = () => {
  return randomNumber(10) % 2 === 0;
};

export const randomString = (prefix = '', length = 4) => {
  let result = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return prefix + result;
};
