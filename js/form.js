'use strict';
(function () {
  var MAX_HASHTAGS = 5;
  var MAX_HASHTAG = 20;
  var MAX_COMMENT = 140;
  var hashtagsInput = document.querySelector('.text__hashtags');
  var comments = document.querySelector('.text__description');
  hashtagsInput.addEventListener('change', function () {
    hashtagsInput.setCustomValidity('');
    hashtagsInput.style = '';
    var hashtagsInputStr = hashtagsInput.value;
    var newHashtags = hashtagsInputStr.toLowerCase();
    hashtagsInput.value = newHashtags;
    var hashtags = hashtagsInput.value.split(' ');
    var hashtag;
    var hashtagLetters;
    if (hashtags.length > MAX_HASHTAGS) {
      hashtagsInput.setCustomValidity('нельзя указать больше пяти хэш-тегов');
      hashtagsInput.style = 'border-color: red; outline-color: red;';
    }
    for (var i = 0; i < hashtags.length; i++) {
      hashtag = hashtags[i];
      hashtagLetters = hashtag.split('');
      if (hashtagLetters[0] !== '#' && hashtagLetters.length !== 0) {
        hashtagsInput.setCustomValidity('хэш-тег начинается с символа # (решётка)');
        hashtagsInput.style = 'border-color: red; outline-color: red;';
      } else if (hashtagLetters.length > MAX_HASHTAG) {
        hashtagsInput.setCustomValidity('максимальная длина одного хэш-тега 20 символов, включая решётку');
        hashtagsInput.style = 'border-color: red; outline-color: red;';
      } else if (hashtagLetters.length === 1) {
        hashtagsInput.setCustomValidity('хеш-тег не может состоять только из одной решётки');
        hashtagsInput.style = 'border-color: red; outline-color: red;';
      } else if (hashtagLetters[hashtagLetters.length - 1] === '#') {
        hashtagsInput.setCustomValidity('хэш-теги разделяются пробелами');
        hashtagsInput.style = 'border-color: red; outline-color: red;';
      }
      for (var j = 0; j < hashtags.length; j++) {
        if (hashtag === hashtags[i + 1]) {
          hashtagsInput.setCustomValidity('один и тот же хэш-тег не может быть использован дважды');
          hashtagsInput.style = 'border-color: red; outline-color: red;';
        }
      }
    }
  });
  comments.addEventListener('change', function () {
    comments.setCustomValidity('');
    comments.style = '';
    var commentsLetter = comments.value;
    if (commentsLetter.length > MAX_COMMENT) {
      comments.setCustomValidity('длина комментария не может составлять больше 140 символов');
      comments.style = 'border-color: red; outline-color: red;';
    }
  });
})();
