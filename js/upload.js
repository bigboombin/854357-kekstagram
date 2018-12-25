'use strict';
(function () {
  var ESC = 27;
  var EFFECTS = ['none', 'chrome', 'sepia', 'marvin', 'phobos', 'heat'];
  var PERCENT = 100;
  var MAX_EFFECT = 100;
  var ENTER = 13;
  var MIN_EFFECT = 25;
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
  var scaleControlSmaller = document.querySelector('.scale__control--smaller');
  var scaleControlBigger = document.querySelector('.scale__control--bigger');
  var slider = document.querySelector('.img-upload__effect-level');
  var scaleControlValue = document.querySelector('.scale__control--value');

  var changeEffectSlider = function () {
    slider.style.display = '';
    effectLevelPin.style.left = MAX_EFFECT + '%';
    effectLevelDepth.style.width = MAX_EFFECT + '%';
    effectLevelValue.setAttribute('value', MAX_EFFECT);
  };

  var reset = function () {
    var input = document.querySelector('#effect-heat');
    input.setAttribute('checked', true);
    imgUploadOverlay.classList.add('hidden');
    imgUploadPreview.classList.value = '';
    imgUploadPreview.style = '';
    effectLevelValue.setAttribute('value', '100');
    hashtagsInput.value = '';
    comments.value = '';
    uploadFile.value = '';
    effectLevelPin.style.left = MAX_EFFECT + '%';
    effectLevelDepth.style.width = MAX_EFFECT + '%';
  };

  var closeUploadFile = function () {
    var scaleControl = MAX_EFFECT;
    scaleControlValue.value = scaleControl + '%';
    imgUploadPreview.style = 'transform: scale(' + scaleControl / PERCENT + ')';

    var onScaleControlSmallerClick = function () {
      if (scaleControl > MIN_EFFECT) {
        scaleControl = scaleControl - MIN_EFFECT;
        scaleControlValue.value = scaleControl + '%';
        imgUploadPreview.style = 'transform: scale(' + scaleControl / PERCENT + ')';
      }
    };
    var onScaleControlBiggerClick = function () {
      if (scaleControl < MAX_EFFECT) {
        scaleControl = scaleControl + MIN_EFFECT;
        scaleControlValue.value = scaleControl + '%';
        imgUploadPreview.style = 'transform: scale(' + scaleControl / PERCENT + ')';
      }
    };
    scaleControlSmaller.addEventListener('click', onScaleControlSmallerClick);
    scaleControlBigger.addEventListener('click', onScaleControlBiggerClick);
    scaleControlSmaller.addEventListener('keydown', function (evt) {
      if (evt.keyCode === ENTER) {
        onScaleControlSmallerClick();
      }
    });
    scaleControlBigger.addEventListener('keydown', function (evt) {
      if (evt.keyCode === ENTER) {
        onScaleControlBiggerClick();
      }
    });


    uploadFile.addEventListener('change', function () {
      imgUploadOverlay.classList.remove('hidden');
      slider.style.display = 'none';
      var onUploadOverlayKeydown = function (evt) {
        if (evt.keyCode === ESC) {
          imgUploadOverlay.classList.add('hidden');
          reset();
        }
      };
      document.addEventListener('keydown', onUploadOverlayKeydown);
      hashtagsInput.addEventListener('focus', function () {
        document.removeEventListener('keydown', onUploadOverlayKeydown);
      });
      comments.addEventListener('focus', function () {
        document.removeEventListener('keydown', onUploadOverlayKeydown);
      });
    });
    uploadCancel.addEventListener('click', function () {
      imgUploadOverlay.classList.add('hidden');
      reset();
    });
  };
  closeUploadFile();

  var changeEffect = function () {
    var currentEffect;
    var onEffectRadioInput = function (effect) {
      return function () {
        imgUploadPreview.classList.add('effects__preview--' + effect);
        if (currentEffect) {
          imgUploadPreview.classList.remove(currentEffect);
        }
        currentEffect = 'effects__preview--' + effect;
        if (imgUploadPreview.classList.contains('effects__preview--chrome')) {
          imgUploadPreview.style.filter = 'grayscale(1)';
          changeEffectSlider();
        } else if (imgUploadPreview.classList.contains('effects__preview--sepia')) {
          imgUploadPreview.style.filter = 'sepia(1)';
          changeEffectSlider();
        } else if (imgUploadPreview.classList.contains('effects__preview--marvin')) {
          imgUploadPreview.style.filter = 'invert(100%)';
          changeEffectSlider();
        } else if (imgUploadPreview.classList.contains('effects__preview--phobos')) {
          imgUploadPreview.style.filter = 'blur(3px)';
          changeEffectSlider();
        } else if (imgUploadPreview.classList.contains('effects__preview--heat')) {
          imgUploadPreview.style.filter = 'brightness(3)';
          changeEffectSlider();
        } else if (imgUploadPreview.classList.contains('effects__preview--none')) {
          imgUploadPreview.style.filter = '';
          slider.style.display = 'none';
        }
      };
    };
    for (var k = 0; k < EFFECTS.length; k++) {
      var effectRadio = document.querySelector('#effect-' + EFFECTS[k]);
      var effect = EFFECTS[k];
      effectRadio.addEventListener('input', onEffectRadioInput(effect));
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
