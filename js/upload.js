'use strict';
(function () {
  var ESC = 27;
  var EFFECTS = ['none', 'chrome', 'sepia', 'marvin', 'phobos', 'heat'];
  var uploadFile = document.querySelector('#upload-file');
  var imgUploadOverlay = document.querySelector('.img-upload__overlay');
  var form = document.querySelector('#upload-select-image');
  var imgUploadPreview = document.querySelector('.img-upload__preview').querySelector('img');
  var effectLevelValue = document.querySelector('.effect-level__value');
  var hashtagsInput = document.querySelector('.text__hashtags');
  var comments = document.querySelector('.text__description');
  var uploadCancel = document.querySelector('#upload-cancel');
  var effectLevelPin = document.querySelector('.effect-level__pin');
  var effectLevelDepth = document.querySelector('.effect-level__depth');

  var reset = function () {
    var input = document.querySelector('#effect-heat');
    input.setAttribute('checked', true);
    imgUploadOverlay.classList.add('hidden');
    imgUploadPreview.classList.value = '';
    imgUploadPreview.style = '';
    effectLevelValue.setAttribute('value', '20');
    hashtagsInput.value = '';
    comments.value = '';
    uploadFile.value = '';
    effectLevelPin.style.left = 20 + '%';
    effectLevelDepth.style.width = 20 + '%';
  };

  var closeUploadFile = function () {
    uploadFile.addEventListener('change', function () {
      imgUploadOverlay.classList.remove('hidden');
      var slider = document.querySelector('.img-upload__effect-level');
      slider.style.display = 'none';
      var imgUploadOverlayEscHidd = function (evt) {
        if (evt.keyCode === ESC) {
          imgUploadOverlay.classList.add('hidden');
          reset();
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
      reset();
    });
  };
  closeUploadFile();

  var changeEffect = function () {
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
          imgUploadPreview.style.filter = '';
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

  var onLoad = function () {
    reset();
    var template = document.querySelector('#success').content;
    var element = template.cloneNode(true);
    var main = document.querySelector('main');
    main.appendChild(element);
    var sectionSuccess = document.querySelector('.success');
    var successButton = document.querySelector('.success__button');
    successButton.addEventListener('click', function () {
      sectionSuccess.remove();
    });
    document.addEventListener('keydown', function (evt) {
      if (evt.keyCode === ESC) {
        sectionSuccess.remove();
      }
    });
    document.addEventListener('click', function () {
      sectionSuccess.remove();
    });
  };
  var onError = function () {
    var template = document.querySelector('#error').content;
    var element = template.cloneNode(true);
    var main = document.querySelector('main');
    main.appendChild(element);
    imgUploadOverlay.classList.add('hidden');
    var reloadButton = document.querySelector('.error__buttons').firstChild;
    var anotherFileButton = document.querySelector('.error__buttons').lastChild;
    var sectionError = document.querySelector('.error');
    reloadButton.addEventListener('click', function () {
      sectionError.remove();
    });
    anotherFileButton.addEventListener('click', function () {
      sectionError.remove();
      reset();
    });
    document.addEventListener('keydown', function (evt) {
      if (evt.keyCode === ESC) {
        sectionError.remove();
        reset();
      }
    });
    document.addEventListener('click', function () {
      sectionError.remove();
      reset();
    });
  };
  form.addEventListener('submit', function (evt) {
    window.backend.upload(new FormData(form), onLoad, onError);
    evt.preventDefault();
  });
})();
