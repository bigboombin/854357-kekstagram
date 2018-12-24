'use strict';
(function () {
  var ESC = 27;
  var ENTER = 13;


  var addAllPhotos = function (photosDescription) {
    var deletePhoto = document.querySelectorAll('.picture');
    deletePhoto.forEach(function (photo) {
      photo.remove();
    });
    var template = document.querySelector('#picture').content;
    var pictures = document.querySelector('.pictures');
    var fragmentPictures = document.createDocumentFragment();

    for (var i = 0; i < photosDescription.length; i++) {
      var element = template.cloneNode(true);
      element.querySelector('img').src = photosDescription[i].url;
      element.querySelector('.picture__likes').textContent = String(photosDescription[i].likes);
      element.querySelector('.picture__comments').textContent = String(photosDescription[i].comments.length);
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

    var main = document.querySelector('main');
    main.appendChild(fragmentBigPicture);
    var commentCreate = function (comments) {
      var socialComments = document.querySelector('.social__comments');
      var socialComment = document.querySelector('.social__comment');
      var socialCommentsAll = document.querySelectorAll('.social__comment');
      for (var i = 0; i < socialCommentsAll.length; i++) {
        socialCommentsAll[i].remove();
      }
      for (var k = 0; k < comments.length; k++) {
        var socialCommentClone = socialComment.cloneNode(true);
        socialComments.appendChild(socialCommentClone);
        socialCommentClone.querySelector('.social__picture').src = comments[k].avatar;
        socialCommentClone.querySelector('.social__text').textContent = comments[k].message;
      }
    };
    commentCreate(photoDescription.comments.slice(0, 5));


  };
  var openBigPhoto = function (photosDescription) {
    var allPhotos = document.querySelectorAll('.picture__img');
    var onPhotoClick = function (photoDescription) {
      return function () {
        addBigPicture(photoDescription);
      };
    };
    var onPhotoEnter = function (photoDescription) {
      return function (evt) {
        if (evt.keyCode === ENTER) {
          addBigPicture(photoDescription);
        }
      };
    };
    for (var i = 0; i < photosDescription.length; i++) {
      allPhotos[i].addEventListener('click', onPhotoClick(photosDescription[i]));
      allPhotos[i].setAttribute('tabindex', i);
      allPhotos[i].addEventListener('keydown', onPhotoEnter(photosDescription[i]));
    }
  };

  var onLoad = function (photosDescription) {
    var imgFilters = document.querySelector('.img-filters');
    imgFilters.classList.remove('img-filters--inactive');


    var filterPopularButton = document.querySelector('#filter-popular');
    var filterNewButton = document.querySelector('#filter-new');
    var filterDiscussedButton = document.querySelector('#filter-discussed');
    var photoDescription = photosDescription;


    var onFilterPopularClick = function () {
      filterNewButton.classList.remove('img-filters__button--active');
      filterDiscussedButton.classList.remove('img-filters__button--active');
      filterPopularButton.classList.remove('img-filters__button--active');
      filterPopularButton.classList.add('img-filters__button--active');

      photoDescription = photosDescription;
      addAllPhotos(photoDescription);
      openBigPhoto(photoDescription);
    };

    var onFilterNewClick = function () {
      filterNewButton.classList.remove('img-filters__button--active');
      filterDiscussedButton.classList.remove('img-filters__button--active');
      filterPopularButton.classList.remove('img-filters__button--active');
      filterNewButton.classList.add('img-filters__button--active');
      var photoDescriptionNew = photosDescription.slice(5, 15);
      addAllPhotos(photoDescriptionNew);
      openBigPhoto(photoDescriptionNew);
    };

    var onFilterDiscussedClick = function () {
      filterNewButton.classList.remove('img-filters__button--active');
      filterDiscussedButton.classList.remove('img-filters__button--active');
      filterPopularButton.classList.remove('img-filters__button--active');
      filterDiscussedButton.classList.add('img-filters__button--active');
      var photoDescriptionNew = photosDescription.slice();
      photoDescriptionNew.sort(function (first, second) {
        if (first.comments.length > second.comments.length) {
          return -1;
        } else if (first.comments.length < second.comments.length) {
          return 1;
        } else {
          return 0;
        }
      });
      addAllPhotos(photoDescriptionNew);
      openBigPhoto(photoDescriptionNew);
    };


    filterPopularButton.addEventListener('click', onFilterPopularClick);
    filterNewButton.addEventListener('click', onFilterNewClick);
    filterDiscussedButton.addEventListener('click', onFilterDiscussedClick);

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
