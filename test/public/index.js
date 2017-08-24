'use strict';

var imgInput = new Image();

imgInput.src = $('#imgInput').attr('src');
imgInput.onload = function() {
  $('#outputGray').attr('src', jrImage.gray(imgInput));
  $('#outputBlackAndWhite128').attr('src', jrImage.blackAndWhite(imgInput, 128));
  $('#outputBlackAndWhite156').attr('src', jrImage.blackAndWhite(imgInput, 156));
  $('#outputReverse').attr('src', jrImage.reverse(imgInput));
  $('#outputRgbaR').attr('src', jrImage.rgba(imgInput, {r: 0}));
  $('#outputRgbaG').attr('src', jrImage.rgba(imgInput, {g: 0}));
  $('#outputRgbaB').attr('src', jrImage.rgba(imgInput, {b: 0}));
  $('#outputRgbaA').attr('src', jrImage.rgba(imgInput, {a: 128}));
  $('#outputMosaic').attr('src', jrImage.mosaic(imgInput, 3));
  $('#outputOils').attr('src', jrImage.oils(imgInput, 28));
  $('#outputGaussBlur').attr('src', jrImage.gaussBlur(imgInput));
};
