'use strict';

var Filter = require('./filter.js');

module.exports = (function() {
  var _e = {};

  function log(msg) {
    if (__DEV__) {
      console.log(msg); // eslint-disable-line
    }
  }

  /**
   * 灰度变换
   * @param  {Image} image 图片对象
   * @return {Image} 返回处理后的图片对象
   */
  _e.gray = function(image) {
    if (!image || !image.src) {
      return;
    }

    var sw = image.width, sh = image.height;

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
   * @param  {Image} image 图片对象
   * @param {Number} pi 黑白鉴定值（0-255）
   * @return {Image} 返回处理后的图片对象
   */
  _e.blackAndWhite = function(image, pi) {
    if (!image || !image.src) {
      return;
    }

    var sw = image.width, sh = image.height;

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
   * @param  {Image} image 图片对象
   * @return {Image} 返回处理后的图片对象
   */
  _e.reverse = function(image) {
    if (!image || !image.src) {
      return;
    }

    var sw = image.width, sh = image.height;

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
   * @param  {Image} image 图片对象
   * @param {Object} option 颜色替换配置
   *  option.r : red(0-255)
   *  option.g : green(0-255)
   *  option.b : blue(0-255)
   *  option.a : 透明度(0-255)
   * @return {Image} 返回处理后的图片对象
   */
  _e.rgba = function(image, option) {
    if (!image || !image.src) {
      return;
    }

    var sw = image.width, sh = image.height;

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
   * @param  {Image} image 图片对象
   * @param {Number} size 马赛克大小（默认为5）
   * @return {Image} 返回处理后的图片对象
   */
  _e.mosaic = function(image, size) {
    if (!image || !image.src) {
      return;
    }

    var sw = image.width, sh = image.height;

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
   * @param  {Image} image 图片对象
   * @param {Number} delta 油画因子（默认28）
   * @return {Image} 返回处理后的图片对象
   */
  _e.oils = function(image, delta) {
    if (!image || !image.src) {
      return;
    }

    var sw = image.width, sh = image.height;

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
   * @param  {Image} image 图片对象
   * @param {Number} radius 取样区域半径（默认为3.0）
   * @param {Number} sigma 标准方差（默认为 radius/3）
   * @return {Image} 返回处理后的图片对象
   */
  _e.gaussBlur = function(image, radius, sigma) {
    if (!image || !image.src) {
      return;
    }

    var sw = image.width, sh = image.height;

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

})();
