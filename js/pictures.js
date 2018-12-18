'use strict';
(function () {
  var PHOTOS_COUNTS = 25;
  var LAST_IMAGE = 6;
  var FIRST_IMAGE = 1;
  var MAX_COMMENTS = 2;
  var ESC = 27;
  var ENTER = 13;
  var randomInteger = function (min, max) {
    var rand = min - 0.5 + Math.random() * (max - min + 1);
    rand = Math.round(rand);
    return rand;
  };


  var addAllPhotos = function (photosDescription) {
    var template = document.querySelector('#picture').content;
    var pictures = document.querySelector('.pictures');
    var fragmentPictures = document.createDocumentFragment();

    for (var i = 0; i < PHOTOS_COUNTS; i++) {
      var element = template.cloneNode(true);
      element.querySelector('img').src = photosDescription[i].url;
      element.querySelector('.picture__likes').TextContent = photosDescription[i].likes;
      element.querySelector('.picture__comments').TextContent = photosDescription[i].comments;
      fragmentPictures.appendChild(element);
    }
    pictures.appendChild(fragmentPictures);
  };

  var addBigPicture = function (photoDescription) {

    var bigPicture = document.querySelector('.big-picture');
    var buttonClose = document.querySelector('#picture-cancel');
    var fragmentBigPicture = document.createDocumentFragment();
    fragmentBigPicture.appendChild(bigPicture);
    bigPicture.classList.remove('hidden');
    bigPicture.querySelector('.big-picture__img').querySelector('img').src = photoDescription.url;
    bigPicture.querySelector('.likes-count').TextContent = photoDescription.likes;
    bigPicture.querySelector('.comments-count').TextContent = photoDescription.comments.length;
    bigPicture.querySelector('.social__caption').TextContent = photoDescription.description;
    document.addEventListener('keydown', function (evt) {
      if (evt.keyCode === ESC) {
        bigPicture.classList.add('hidden');
      }
    });
    buttonClose.addEventListener('click', function () {
      bigPicture.classList.add('hidden');
    });
    var imageList = bigPicture.querySelectorAll('.social__picture');
    var imageD = bigPicture.querySelectorAll('.social__text');
    if (photoDescription.comments.length === MAX_COMMENTS) {
      for (var j = 0; j < photoDescription.comments.length; j++) {
        imageList[j].src = 'img/avatar-' + randomInteger(FIRST_IMAGE, LAST_IMAGE) + '.svg';
        imageD[j].TextContent = photoDescription.comments[j];
      }
    } else {
      imageList[0].src = 'img/avatar-' + randomInteger(FIRST_IMAGE, LAST_IMAGE) + '.svg';
      imageD[0].TextContent = photoDescription.comments[0];
    }

    var main = document.querySelector('main');
    main.appendChild(fragmentBigPicture);
  };
  var openBigPhoto = function (photosDescription) {
    var allPhotos = document.querySelectorAll('.picture__img');
    var createBigPhoto = function (photoDescription) {
      return function () {
        addBigPicture(photoDescription);
      };
    };
    var createBigPhotoEnter = function (photoDescription) {
      return function (evt) {
        if (evt.keyCode === ENTER) {
          addBigPicture(photoDescription);
        }
      };
    };
    for (var i = 0; i < PHOTOS_COUNTS; i++) {
      allPhotos[i].addEventListener('click', createBigPhoto(photosDescription[i]));
      allPhotos[i].setAttribute('tabindex', i);
      allPhotos[i].addEventListener('keydown', createBigPhotoEnter(photosDescription[i]));
    }
  };

  var hideCommentsLoader = function () {
    var socialCommentCount = document.querySelector('.social__comment-count');
    var commentLoader = document.querySelector('.comments-loader');
    socialCommentCount.classList.add('visually-hidden');
    commentLoader.classList.add('visually-hidden');
  };
  hideCommentsLoader();
  var onLoad = function (photoDescription) {
    addAllPhotos(photoDescription);
    openBigPhoto(photoDescription);
  };
  var onError = function (errorMessage) {
    var node = document.createElement('div');
    node.style = 'z-index: 100; margin: 0 auto; text-align: center; background-color: red;';
    node.style.position = 'absolute';
    node.style.left = 0;
    node.style.right = 0;
    node.style.fontSize = '30px';

    node.textContent = errorMessage;
    document.body.insertAdjacentElement('afterbegin', node);
  };
  window.backend.load(onLoad, onError);
})();
