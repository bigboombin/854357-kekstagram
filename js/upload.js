'use strict';
(function () {
  var ESC = 27;
  var EFFECTS = ['none', 'chrome', 'sepia', 'marvin', 'phobos', 'heat'];
  var closeUploadFile = function () {
    var uploadFile = document.querySelector('#upload-file');
    var imgUploadOverlay = document.querySelector('.img-upload__overlay');
    var uploadCancel = document.querySelector('#upload-cancel');
    var hashtagsInput = document.querySelector('.text__hashtags');
    var comments = document.querySelector('.text__description');
    uploadFile.addEventListener('change', function () {
      imgUploadOverlay.classList.remove('hidden');
      var imgUploadOverlayEscHidd = function (evt) {
        if (evt.keyCode === ESC) {
          imgUploadOverlay.classList.add('hidden');
          uploadFile.value = '';
        }
      };
      document.addEventListener('keydown', imgUploadOverlayEscHidd);
      hashtagsInput.addEventListener('focus', function () {
        document.removeEventListener('keydown', imgUploadOverlayEscHidd);
      });
      comments.addEventListener('focus', function () {
        document.removeEventListener('keydown', imgUploadOverlayEscHidd);
      });
    });
    uploadCancel.addEventListener('click', function () {
      imgUploadOverlay.classList.add('hidden');
      uploadFile.value = '';
    });
  };
  closeUploadFile();

  var changeEffect = function () {
    var effectLevelDepth = document.querySelector('.effect-level__depth');
    var imgUploadPreview = document.querySelector('.img-upload__preview').querySelector('img');
    var slider = document.querySelector('.img-upload__effect-level');
    var currentEffect;
    var createEffectHandler = function (effect) {
      return function () {
        imgUploadPreview.classList.add('effects__preview--' + effect);
        if (currentEffect) {
          imgUploadPreview.classList.remove(currentEffect);
        }
        currentEffect = 'effects__preview--' + effect;
        if (imgUploadPreview.classList.contains('effects__preview--chrome')) {
          imgUploadPreview.style.filter = 'grayscale(1)';
          slider.style.display = '';
        } else if (imgUploadPreview.classList.contains('effects__preview--sepia')) {
          imgUploadPreview.style.filter = 'sepia(1)';
          slider.style.display = '';
        } else if (imgUploadPreview.classList.contains('effects__preview--marvin')) {
          imgUploadPreview.style.filter = 'invert(100%)';
          slider.style.display = '';
        } else if (imgUploadPreview.classList.contains('effects__preview--phobos')) {
          imgUploadPreview.style.filter = 'blur(3px)';
          slider.style.display = '';
        } else if (imgUploadPreview.classList.contains('effects__preview--heat')) {
          imgUploadPreview.style.filter = 'brightness(3)';
          slider.style.display = '';
        } else if (imgUploadPreview.classList.contains('effects__preview--none')) {
          effectLevelDepth.width = '0px';
          slider.style.display = 'none';
        }
      };
    };
    for (var k = 0; k < EFFECTS.length; k++) {
      var effectRadio = document.querySelector('#effect-' + EFFECTS[k]);
      var effect = EFFECTS[k];
      effectRadio.addEventListener('input', createEffectHandler(effect));
    }
  };
  changeEffect();
})();
