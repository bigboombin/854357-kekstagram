'use strict';
(function () {
  var SLIDER_WIDTH = 445;
  var PERCENT = 100;
  var MAX_EFFECT = 3;
  var imgUploadPreview = document.querySelector('.img-upload__preview').querySelector('img');
  var effectLevelPin = document.querySelector('.effect-level__pin');
  var effectLevelValue = document.querySelector('.effect-level__value');
  var effectLevelDepth = document.querySelector('.effect-level__depth');
  effectLevelPin.addEventListener('mousedown', function (evt) {
    evt.preventDefault();
    var startCoord = evt.clientX;

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();
      var shift = startCoord - moveEvt.clientX;

      startCoord = moveEvt.clientX;
      var effectLevelPinPosition = effectLevelPin.offsetLeft - shift;
      effectLevelPin.style.left = effectLevelPinPosition + 'px';
      effectLevelDepth.style.width = effectLevelPinPosition + 'px';
      if (effectLevelPinPosition < 0) {
        effectLevelPin.style.left = 0 + 'px';
        effectLevelDepth.style.width = 0 + 'px';
      } else if (effectLevelPinPosition > SLIDER_WIDTH) {
        effectLevelPin.style.left = SLIDER_WIDTH + 'px';
        effectLevelDepth.style.width = SLIDER_WIDTH + 'px';
      }
      var effectLevel = effectLevelPinPosition / SLIDER_WIDTH;
      effectLevelValue.setAttribute('value', String(effectLevel * PERCENT));
      if (imgUploadPreview.classList.contains('effects__preview--chrome')) {
        imgUploadPreview.style.filter = 'grayscale(' + effectLevel + ')';
      } else if (imgUploadPreview.classList.contains('effects__preview--sepia')) {
        imgUploadPreview.style.filter = 'sepia(' + effectLevel + ')';
      } else if (imgUploadPreview.classList.contains('effects__preview--marvin')) {
        imgUploadPreview.style.filter = 'invert(' + effectLevel * PERCENT + '%)';
      } else if (imgUploadPreview.classList.contains('effects__preview--phobos')) {
        imgUploadPreview.style.filter = 'blur(' + effectLevel * MAX_EFFECT + 'px)';
      } else if (imgUploadPreview.classList.contains('effects__preview--heat')) {
        imgUploadPreview.style.filter = 'brightness(' + effectLevel * MAX_EFFECT + ')';
      }
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();
      var shift = startCoord - upEvt.clientX;

      startCoord = upEvt.clientX;
      var effectLevelPinPosition = effectLevelPin.offsetLeft - shift;
      effectLevelPin.style.left = effectLevelPinPosition + 'px';
      effectLevelDepth.style.width = effectLevelPinPosition + 'px';
      if (effectLevelPinPosition < 0) {
        effectLevelPin.style.left = 0 + 'px';
        effectLevelDepth.style.width = 0 + 'px';
      } else if (effectLevelPinPosition > SLIDER_WIDTH) {
        effectLevelPin.style.left = SLIDER_WIDTH + 'px';
        effectLevelDepth.style.width = SLIDER_WIDTH + 'px';
      }
      var effectLevel = effectLevelPinPosition / SLIDER_WIDTH;
      effectLevelValue.value = String(effectLevel * PERCENT);
      if (imgUploadPreview.classList.contains('effects__preview--chrome')) {
        imgUploadPreview.style.filter = 'grayscale(' + effectLevel + ')';
      } else if (imgUploadPreview.classList.contains('effects__preview--sepia')) {
        imgUploadPreview.style.filter = 'sepia(' + effectLevel + ')';
      } else if (imgUploadPreview.classList.contains('effects__preview--marvin')) {
        imgUploadPreview.style.filter = 'invert(' + effectLevel * PERCENT + '%)';
      } else if (imgUploadPreview.classList.contains('effects__preview--phobos')) {
        imgUploadPreview.style.filter = 'blur(' + effectLevel * MAX_EFFECT + 'px)';
      } else if (imgUploadPreview.classList.contains('effects__preview--heat')) {
        imgUploadPreview.style.filter = 'brightness(' + effectLevel * MAX_EFFECT + ')';
      }

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });
})();
