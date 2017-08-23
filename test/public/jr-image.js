(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["jrImage"] = factory();
	else
		root["jrImage"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = __webpack_require__(1);

/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";


var Filter = __webpack_require__(5);

module.exports = function () {
  var _e = {};

  function log(msg) {
    if (true) {
      console.log(msg);
    }
  }

  /**
   * 灰度变换
   * @param  {Image} image
   */
  _e.gray = function (image) {
    if (!image || !image.src) {
      return;
    }

    var sw = image.width,
        sh = image.height;

    if (!sw || !sh) {
      return false;
    }

    var canvas = document.createElement('canvas');
    canvas.width = sw;
    canvas.height = sh;

    var ctx = canvas.getContext('2d');
    ctx.drawImage(image, 0, 0);

    var imageData = ctx.getImageData(0, 0, sw, sh);

    ctx.clearRect(0, 0, sw, sh);

    imageData = Filter.gray(imageData);
    ctx.putImageData(imageData, 0, 0);

    return new Image().src = canvas.toDataURL('image/png', 1); // base64
  };

  /**
   * 二值图像（黑白图）
   * @param  {Image} image
   * @param {Number} pi 黑白鉴定值（0-255）
   */
  _e.blackAndWhite = function (image, pi) {
    if (!image || !image.src) {
      return;
    }

    var sw = image.width,
        sh = image.height;

    if (!sw || !sh) {
      return false;
    }

    var canvas = document.createElement('canvas');
    canvas.width = sw;
    canvas.height = sh;

    var ctx = canvas.getContext('2d');
    ctx.drawImage(image, 0, 0);

    var imageData = ctx.getImageData(0, 0, sw, sh);

    ctx.clearRect(0, 0, sw, sh);

    imageData = Filter.blackAndWhite(imageData, pi);
    ctx.putImageData(imageData, 0, 0);

    return new Image().src = canvas.toDataURL('image/png', 1); // base64
  };

  /**
   * 图片反色
   * @param  {Image} image
   */
  _e.reverse = function (image) {
    if (!image || !image.src) {
      return;
    }

    var sw = image.width,
        sh = image.height;

    if (!sw || !sh) {
      return false;
    }

    var canvas = document.createElement('canvas');
    canvas.width = sw;
    canvas.height = sh;

    var ctx = canvas.getContext('2d');
    ctx.drawImage(image, 0, 0);

    var imageData = ctx.getImageData(0, 0, sw, sh);

    ctx.clearRect(0, 0, sw, sh);

    imageData = Filter.reverse(imageData);
    ctx.putImageData(imageData, 0, 0);

    return new Image().src = canvas.toDataURL('image/png', 1); // base64
  };

  /**
   * 图片 RGBA 变换
   * @param  {Image} image
   * @param {Object} rgba 颜色替换配置
   *  rgba.r : red(0-255)
   *  rgba.g : green(0-255)
   *  rgba.b : blue(0-255)
   *  rgba.a : 透明度(0-255)
   */
  _e.rgba = function (image, option) {
    if (!image || !image.src) {
      return;
    }

    var sw = image.width,
        sh = image.height;

    if (!sw || !sh) {
      return false;
    }

    log(option);

    var canvas = document.createElement('canvas');
    canvas.width = sw;
    canvas.height = sh;

    var ctx = canvas.getContext('2d');
    ctx.drawImage(image, 0, 0);

    var imageData = ctx.getImageData(0, 0, sw, sh);

    ctx.clearRect(0, 0, sw, sh);

    imageData = Filter.rgba(imageData, option);
    ctx.putImageData(imageData, 0, 0);

    return new Image().src = canvas.toDataURL('image/png', 1); // base64
  };

  /**
   * 图片“马赛克”效果
   * @param  {Image} image
   * @param {Number} size 马赛克大小（默认为5）
   */
  _e.mosaic = function (image, size) {
    if (!image || !image.src) {
      return;
    }

    var sw = image.width,
        sh = image.height;

    if (!sw || !sh) {
      return false;
    }

    var canvas = document.createElement('canvas');
    canvas.width = sw;
    canvas.height = sh;

    var ctx = canvas.getContext('2d');
    ctx.drawImage(image, 0, 0);

    var imageData = ctx.getImageData(0, 0, sw, sh);

    ctx.clearRect(0, 0, sw, sh);

    imageData = Filter.mosaic(imageData, size);
    ctx.putImageData(imageData, 0, 0);

    return new Image().src = canvas.toDataURL('image/png', 1); // base64
  };

  /**
   * 油画
   * @param  {Image} image
   * @param {Number} delta 油画因子（默认28）
   */
  _e.oils = function (image, delta) {
    if (!image || !image.src) {
      return;
    }

    var sw = image.width,
        sh = image.height;

    if (!sw || !sh) {
      return false;
    }

    var canvas = document.createElement('canvas');
    canvas.width = sw;
    canvas.height = sh;

    var ctx = canvas.getContext('2d');
    ctx.drawImage(image, 0, 0);

    var imageData = ctx.getImageData(0, 0, sw, sh);

    ctx.clearRect(0, 0, sw, sh);

    imageData = Filter.oils(imageData, delta);
    ctx.putImageData(imageData, 0, 0);

    return new Image().src = canvas.toDataURL('image/png', 1); // base64
  };

  /**
   * 高斯模糊
   * @param  {Image} image
   * @param {Number} radius 取样区域半径（默认为3.0）
   * @param {Number} sigma 标准方差（默认为 radius/3）
   */
  _e.gaussBlur = function (image, radius, sigma) {
    if (!image || !image.src) {
      return;
    }

    var sw = image.width,
        sh = image.height;

    if (!sw || !sh) {
      return false;
    }

    var canvas = document.createElement('canvas');
    canvas.width = sw;
    canvas.height = sh;

    var ctx = canvas.getContext('2d');
    ctx.drawImage(image, 0, 0);

    var imageData = ctx.getImageData(0, 0, sw, sh);

    ctx.clearRect(0, 0, sw, sh);

    imageData = Filter.gaussBlur(imageData, radius, sigma);
    ctx.putImageData(imageData, 0, 0);

    return new Image().src = canvas.toDataURL('image/png', 1); // base64
  };

  return _e;
}();

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Object.assign的polyfill
 * 解决webview等不支持ES6的浏览器兼容性
 */



(function () {
    if (!Object.assign) {
        Object.defineProperty(Object, 'assign', {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function (target) {
                if (target === undefined || target === null) {
                    throw new TypeError('Cannot convert first argument to object');
                }

                var to = Object(target);
                for (var i = 1; i < arguments.length; i++) {
                    var nextSource = arguments[i];
                    if (nextSource === undefined || nextSource === null) {
                        continue;
                    }
                    nextSource = Object(nextSource);

                    var keysArray = Object.keys(Object(nextSource));
                    for (var nextIndex = 0, len = keysArray.length; nextIndex < len; nextIndex++) {
                        var nextKey = keysArray[nextIndex];
                        var desc = Object.getOwnPropertyDescriptor(nextSource, nextKey);
                        if (desc !== undefined && desc.enumerable) {
                            to[nextKey] = nextSource[nextKey];
                        }
                    }
                }
                return to;
            }
        });
    }
})();

/***/ }),
/* 3 */,
/* 4 */,
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * 滤镜效果
 */



__webpack_require__(2);

module.exports = function () {
  var _e = {};

  /**
   * 灰度变换
   * @param  {ImageData} imgData 图片颜色值数据
   * @return {ImageData} 返回处理后的图片数据
   */
  _e.gray = function (imgData) {
    var data = imgData.data;

    for (var i = 0; i < data.length; i += 4) {
      // RGBA
      var color = (data[i + 0] + data[i + 1] + data[i + 2]) / 3;
      data[i + 0] = data[i + 1] = data[i + 2] = color;
    }

    return imgData;
  };

  /**
   * 二值图像（黑白图）
   * @param  {ImageData} imgData
   * @param {Number} pi 黑白鉴定值（0-255）
   */
  _e.blackAndWhite = function (imgData, pi) {
    var data = imgData.data;

    if (pi === undefined || pi < 0 || pi > 255) {
      pi = 128;
    }

    for (var i = 0; i < data.length; i += 4) {
      // RGBA
      var rbg = data[i + 0] + data[i + 1] + data[i + 2];
      var color = rbg > pi ? 255 : 0;

      data[i + 0] = data[i + 1] = data[i + 2] = color;
    }

    return imgData;
  };

  /**
   * 图片反色
   * @param  {ImageData} imgData
   */
  _e.reverse = function (imgData) {
    var data = imgData.data;

    for (var i = 0; i < data.length; i += 4) {
      // RGBA
      data[i + 0] = 255 - data[i + 0];
      data[i + 1] = 255 - data[i + 1];
      data[i + 2] = 255 - data[i + 2];
      data[i + 3] = data[i + 3];
    }

    return imgData;
  };

  /**
   * 图片RGBA变换
   * @param  {ImageData} imgData
   * @param {Object} rgba 颜色替换配置
   *  rgba.r : red(0-255)
   *  rgba.g : green(0-255)
   *  rgba.b : blue(0-255)
   *  rgba.a : 透明度(0-255)
   */
  _e.rgba = function (imgData, option) {
    option = Object.assign({
      r: -1,
      g: -1,
      b: -1,
      a: -1
    }, option);

    var data = imgData.data;

    for (var i = 0; i < data.length; i += 4) {
      // RGBA
      data[i + 0] = option.r < 0 || option > 255 ? data[i + 0] : option.r;
      data[i + 1] = option.g < 0 || option > 255 ? data[i + 1] : option.g;
      data[i + 2] = option.b < 0 || option > 255 ? data[i + 2] : option.b;
      data[i + 3] = option.a < 0 || option > 255 ? data[i + 3] : option.a;
    }

    return imgData;
  };

  /**
   * 马赛克
   * @param  {ImageData} imgData
   * @param {Number} size 马赛克大小（默认为5）
   */
  _e.mosaic = function (imgData, size) {
    var data = imgData.data,
        sw = imgData.width,
        sh = imgData.height,
        len = parseInt(size) || 5;

    len = len * 2 + 1;

    for (var i = 0; i < Math.floor(sw / len); i++) {
      for (var j = 0; j < Math.floor(sh / len); j++) {
        var average = [],
            sum = [0, 0, 0];

        for (var ii = 0; ii < len; ii++) {
          for (var jj = 0; jj < len; jj++) {
            var index = (j * len + ii) * sw + i * len + jj; // 真实下标

            sum[0] += data[index * 4];
            sum[1] += data[index * 4 + 1];
            sum[2] += data[index * 4 + 1];
          }
        }

        average[0] = sum[0] / (len * len);
        average[1] = sum[1] / (len * len);
        average[2] = sum[2] / (len * len);

        for (var iii = 0; iii < len; iii++) {
          for (var jjj = 0; jjj < len; jjj++) {
            var index = (j * len + iii) * sw + i * len + jjj; // 真实下标

            data[index * 4 + 0] = average[0];
            data[index * 4 + 1] = average[1];
            data[index * 4 + 2] = average[2];
          }
        }
      }
    }

    return imgData;
  };

  /**
   * 油画
   * @param  {ImageData} imgData
   * @param {Number} delta 油画因子（默认28）
   */
  _e.oils = function (imgData, delta) {
    var data = imgData.data;

    delta = parseInt(delta) || 28;

    for (var i = 0; i < data.length; i += 4) {
      data[i + 0] = Math.floor(data[i + 0] / delta) * delta;
      data[i + 1] = Math.floor(data[i + 1] / delta) * delta;
      data[i + 2] = Math.floor(data[i + 2] / delta) * delta;
    }

    return imgData;
  };

  /**
   * 高斯模糊
   * @param  {ImageData} imgData
   * @param {Number} radius 取样区域半径（默认为3.0）
   * @param {Number} sigma 标准方差（默认为 radius/3）
   */
  _e.gaussBlur = function (imgData, radius, sigma) {
    var pixes = imgData.data;
    var width = imgData.width;
    var height = imgData.height;
    var gaussMatrix = [],
        gaussSum = 0,
        x,
        y,
        r,
        g,
        b,
        a,
        i,
        j,
        k,
        len;

    radius = Math.floor(radius) || 3;
    sigma = sigma || radius / 3;

    a = 1 / (Math.sqrt(2 * Math.PI) * sigma);
    b = -1 / (2 * sigma * sigma);

    // 高斯矩阵
    for (i = 0, x = -radius; x <= radius; x++, i++) {
      g = a * Math.exp(b * x * x);
      gaussMatrix[i] = g;
      gaussSum += g;
    }

    // 保证高斯矩阵的值在[0,1]之间
    for (i = 0, len = gaussMatrix.length; i < len; i++) {
      gaussMatrix[i] /= gaussSum;
    }

    // x 方向一维高斯运算
    for (y = 0; y < height; y++) {
      for (x = 0; x < width; x++) {
        r = g = b = a = 0;
        gaussSum = 0;
        for (j = -radius; j <= radius; j++) {
          k = x + j;
          if (k >= 0 && k < width) {
            i = (y * width + k) * 4;
            r += pixes[i] * gaussMatrix[j + radius];
            g += pixes[i + 1] * gaussMatrix[j + radius];
            b += pixes[i + 2] * gaussMatrix[j + radius];
            gaussSum += gaussMatrix[j + radius];
          }
        }
        i = (y * width + x) * 4;
        // 除以 gaussSum 是为了消除处于边缘的像素, 高斯运算不足的问题
        pixes[i] = r / gaussSum;
        pixes[i + 1] = g / gaussSum;
        pixes[i + 2] = b / gaussSum;
      }
    }

    // y 方向一维高斯运算
    for (x = 0; x < width; x++) {
      for (y = 0; y < height; y++) {
        r = g = b = a = 0;
        gaussSum = 0;
        for (j = -radius; j <= radius; j++) {
          k = y + j;
          if (k >= 0 && k < height) {
            i = (k * width + x) * 4;
            r += pixes[i] * gaussMatrix[j + radius];
            g += pixes[i + 1] * gaussMatrix[j + radius];
            b += pixes[i + 2] * gaussMatrix[j + radius];
            gaussSum += gaussMatrix[j + radius];
          }
        }
        i = (y * width + x) * 4;
        pixes[i] = r / gaussSum;
        pixes[i + 1] = g / gaussSum;
        pixes[i + 2] = b / gaussSum;
      }
    }

    return imgData;
  };

  return _e;
}();

/***/ })
/******/ ]);
});