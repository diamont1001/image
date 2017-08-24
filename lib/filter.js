/**
 * 滤镜效果
 */

'use strict';

require('./assign-polyfill.js');

module.exports = (function() {
  var _e = {};

  /**
   * 灰度变换
   * @param  {ImageData} imgData 图片数据对象
   * @return {ImageData} 返回处理后的图片数据
   */
  _e.gray = function(imgData) {
    var data = imgData.data;

    for (var i = 0; i < data.length; i += 4) { // RGBA
      var color = (data[i + 0] + data[i + 1] + data[i + 2]) / 3;
      data[i + 0] = data[i + 1] = data[i + 2] = color;
    }

    return imgData;
  };

  /**
   * 二值图像（黑白图）
   * @param  {ImageData} imgData 图片数据对象
   * @param {Number} pi 黑白鉴定值（0-255）
   * @return {ImageData} 返回处理后的图片数据
   */
  _e.blackAndWhite = function(imgData, pi) {
    var data = imgData.data;

    if (pi === undefined || pi < 0 || pi > 255) {
      pi = 128;
    }

    for (var i = 0; i < data.length; i += 4) { // RGBA
      var rbg = data[i + 0] + data[i + 1] + data[i + 2];
      var color = (rbg > pi) ? 255 : 0;

      data[i + 0] = data[i + 1] = data[i + 2] = color;
    }

    return imgData;
  };

  /**
   * 图片反色
   * @param  {ImageData} imgData 图片数据对象
   * @return {ImageData} 返回处理后的图片数据
   */
  _e.reverse = function(imgData) {
    var data = imgData.data;

    for (var i = 0; i < data.length; i += 4) { // RGBA
      data[i + 0] = 255 - data[i + 0];
      data[i + 1] = 255 - data[i + 1];
      data[i + 2] = 255 - data[i + 2];
      data[i + 3] = data[i + 3];
    }

    return imgData;
  };

  /**
   * 图片RGBA变换
   * @param  {ImageData} imgData 图片数据对象
   * @param {Object} option 颜色替换配置
   *  option.r : red(0-255)
   *  option.g : green(0-255)
   *  option.b : blue(0-255)
   *  option.a : 透明度(0-255)
   * @return {ImageData} 返回处理后的图片数据
   */
  _e.rgba = function(imgData, option) {
    option = Object.assign({
      r: -1,
      g: -1,
      b: -1,
      a: -1
    }, option);

    var data = imgData.data;

    for (var i = 0; i < data.length; i += 4) { // RGBA
      data[i + 0] = (option.r < 0 || option > 255) ? data[i + 0] : option.r;
      data[i + 1] = (option.g < 0 || option > 255) ? data[i + 1] : option.g;
      data[i + 2] = (option.b < 0 || option > 255) ? data[i + 2] : option.b;
      data[i + 3] = (option.a < 0 || option > 255) ? data[i + 3] : option.a;
    }

    return imgData;
  };

  /**
   * 马赛克
   * @param  {ImageData} imgData 图片数据对象
   * @param {Number} size 马赛克大小（默认为5）
   * @return {ImageData} 返回处理后的图片数据
   */
  _e.mosaic = function(imgData, size) {
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
            var index1 = (j * len + iii) * sw + i * len + jjj; // 真实下标

            data[index1 * 4 + 0] = average[0];
            data[index1 * 4 + 1] = average[1];
            data[index1 * 4 + 2] = average[2];
          }
        }
      }
    }

    return imgData;
  };

  /**
   * 油画
   * @param  {ImageData} imgData 图片数据对象
   * @param {Number} delta 油画因子（默认28）
   * @return {ImageData} 返回处理后的图片数据
   */
  _e.oils = function(imgData, delta) {
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
   * @param  {ImageData} imgData 图片数据对象
   * @param {Number} radius 取样区域半径（默认为3.0）
   * @param {Number} sigma 标准方差（默认为 radius/3）
   * @return {ImageData} 返回处理后的图片数据
   */
  _e.gaussBlur = function(imgData, radius, sigma) {
    var pixes = imgData.data;
    var width = imgData.width;
    var height = imgData.height;
    var gaussMatrix = [],
      gaussSum = 0,
      x, y,
      r, g, b, a,
      i, j, k, len;

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

})();
