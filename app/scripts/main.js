// jshint devel:true
document.addEventListener('DOMContentLoaded', function () {
  'use strict';
  // This is the host will will post to to create the database. This should be the root server in the federation.
  var host = 'my.geotab.com';

  // local - helps create local options based on selected time zone. See app/scripts/local.js.
  var local = geotab.local;
  // call - helps make calls to MyGeotab API
  var call = geotab.api.post;

  // DOM Elements
  var elError = document.querySelector('#error');
  var elErrorContent = document.querySelector('#error > span');
  var elErrorClose = document.querySelector('#error-close');
  var elLoading = document.querySelector('#loading');
  var elWaiting = document.querySelector('#waiting');

  var elCompanyName = document.querySelector('#companyName');
  var elDatabaseName = document.querySelector('#databaseName');
  var elPhoneNumber = document.querySelector('#phoneNumber');
  var elFleetSize = document.querySelector('#fleetSize');
  var elTimeZone = document.querySelector('#timeZone');

  var elFirstName = document.querySelector('#firstName');
  var elLastName = document.querySelector('#lastName');
  var elEmail = document.querySelector('#email');
  var elPassword = document.querySelector('#password');
  var elConfirmPassword = document.querySelector('#confirmPassword');
  var elUpdates = document.querySelector('#updates');
  var elCaptchaImage = document.querySelector('#captchaImage');
  var elCaptchaAnswer = document.querySelector('#captchaAnswer');

  var elSubmit = document.querySelector('#submit');

  var elRequiredInputs = document.querySelectorAll('input[required]');

  // Dom helpers
  /**
   * Validation states
   * @type {{none: string, success: string, warning: string, error: string}}
   */
  var validationState = {
    none: '',
    success: 'has-success',
    warning: 'has-warning',
    error: 'has-error'
  };

  /**
   * Change the validation state of a for input
   * @param el - The element
   * @param state - The validation state
   */
  var changeValidationState = function (el, state) {
    Object.keys(validationState).forEach(function (key) {
      if (validationState[key]) {
        el.classList.remove(validationState[key]);
      }
    });
    if (state) {
      el.classList.add(state);
    }
  };

  // Loading
  /**
   * Show loading spinner (locks UI)
   */
  var showLoading = function () {
    elLoading.style.display = 'block';
  };

  /**
   * Hide loading spinner
   */
  var hideLoading = function () {
    elLoading.style.display = 'none';
  };

  // Errors
  /**
   * Show error message
   * @param err - The error object
   */
  var showError = function (err) {
    var errorString = 'Error';
    if (err && (err.name || err.message)) {
      errorString = (err.name ? err.name + ': ' : +'') + (err.message || '');
    }
    elErrorContent.textContent = errorString;
    elError.style.display = 'block';
  };

  /**
   * Hide error message
   */
  var hideError = function () {
    elError.style.display = 'none';
  };

  /**
   * Create a short database name from a company name
   * @param companyName {string} - the name of the company
   * @returns {string} - the short database name
   */
  var createDatabaseNameFromCompany = function (companyName) {
    var underscore_char = 95,
      companyNameCharacters = new Array(companyName.length),
      i = 0,
      num, num1, num2, c,
      chrArray = companyName.split('').map(function (c) {
        return c.charCodeAt(0);
      }),
      length = chrArray.length;

    for (num = 0; num < length; num++) {
      c = chrArray[num];
      if ((/\w|\d/.test(String.fromCharCode(c)) ? 1 : 0) !== 0) {
        num1 = i;
        i++;
        companyNameCharacters[num1] = c;
      } else if (i > 0 && companyNameCharacters[i - 1] !== underscore_char) {
        num2 = i;
        i++;
        companyNameCharacters[num2] = underscore_char;
      }
    }

    if (i > 0 && companyNameCharacters[i - 1] === underscore_char) {
      i = i + -1;
    }

    return String.fromCharCode.apply(String.fromCharCode, companyNameCharacters).substr(0, i);
  };

  // So we can clear the timeout if user is still typing
  var checkAvailabilityTimeout;

  /**
   * Check to see if the database name exists
   * @param databaseName {string} - the database name
   */
  var checkAvailability = function (databaseName) {
    elDatabaseName.parentNode.querySelector('.help-block').style.display = 'none';
    changeValidationState(elDatabaseName.parentNode, validationState.none);
    if (!databaseName) {
      elWaiting.style.display = 'none';
      return;
    }
    elWaiting.style.display = 'block';
    if (checkAvailabilityTimeout) {
      clearTimeout(checkAvailabilityTimeout);
    }
    checkAvailabilityTimeout = setTimeout(function () {
      call(host, 'FindServer', {
        database: databaseName,
        server: host
      })
        .then(function (result) {
          changeValidationState(elDatabaseName.parentNode, result ? validationState.error : validationState.success);
          elDatabaseName.parentNode.querySelector('.help-block').style.display = result ? 'block' : 'none';
          elWaiting.style.display = 'none';
        }, function (err) {
          elWaiting.style.display = 'none';
          showError(err);
      });
    }, 600);
  };

  /**
   * Update the displayed short database name and check if it's availability
   * @param companyName
   */
  var updateShortDatabase = function (companyName) {
    var databaseName = createDatabaseNameFromCompany(companyName);
    elDatabaseName.value = databaseName;
    checkAvailability(databaseName);
  };

  // Setup
  /**
   * Get a list of IANA time zones form the server and add to time zone select input
   */
  var renderTimeZones = function () {
    call(host, 'GetTimeZones')
      .then(function (timeZones) {
        elTimeZone.innerHTML = timeZones
          .sort(function (a, b) {
            var textA = a.id.toLowerCase();
            var textB = b.id.toLowerCase();
            return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
          }).map(function (timeZone) {
            return '<option value="' + timeZone.id + '">' + timeZone.id + '</option>';
          });
      }, showError);
  };

  // store the captcha id in scope so we can use it when we create the database
  var captchaId;

  /**
   * Render a new CAPTCHA image with a random captcha id (uuid)
   */
  var renderCaptcha = function () {
    captchaId = uuid.v4();
    elCaptchaImage.setAttribute('src', 'https://' + host + '/apiv1/GenerateCaptcha?id=' + captchaId);
    elCaptchaAnswer.value = '';
  };

  /**
   * Get the form values from the DOM
   * @returns {{captchaAnswer: {id: *, answer: *}, databaseName: *, userName: *, password: *, companyDetails: {companyName: *, firstName: *, lastName: *, phoneNumber: *, resellerName: string, fleetSize: (Number|number), comments: string, signUpForNews: *}}}
   */
  var getFormValues = function () {
    return {
      captchaAnswer: {
        id: captchaId,
        answer: elCaptchaAnswer.value
      },
      databaseName: elDatabaseName.value,
      userName: elEmail.value,
      password: elPassword.value,
      companyDetails: {
        companyName: elCompanyName.value,
        firstName: elFirstName.value,
        lastName: elLastName.value,
        phoneNumber: elPhoneNumber.value,
        resellerName: 'ABC Fleets',
        fleetSize: parseInt(elFleetSize.value, 10) || 0,
        comments: '',
        signUpForNews: elUpdates.checked
      }
    };
  };

  // Validation
  /**
   * Validate an email address
   * @param email {string} - the email address
   * @returns {boolean} - is the email address vailid
   */
  var isValidEmail = function (email) {
    var re = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
    return re.test(email);
  };

  var validatePasswordTimeout;
  /**
   * Validate the entered password
   */
  var validatePassword = function () {
    if (validatePasswordTimeout) {
      clearTimeout(validatePasswordTimeout);
    }
    validatePasswordTimeout = setTimeout(function () {
      var isValid = elPassword.value === elConfirmPassword.value;
      var elParent = elConfirmPassword.parentNode;
      changeValidationState(elParent, isValid ? validationState.success : validationState.error);
      elParent.querySelector('.help-block').style.display = isValid ? 'none' : 'block';
    }, 600);
  };

  /**
   * Validate form values
   * @param values {object} - the for values as retrieved by getFormValues
   * @returns {boolean}
   */
  var isFormValid = function (values) {
    var isValid = true;
    if (!values.companyDetails.companyName) {
      isValid = false;
      changeValidationState(elCompanyName.parentNode, validationState.error);
    }
    if (!values.databaseName) {
      isValid = false;
      changeValidationState(elDatabaseName.parentNode, validationState.error);
    }
    if (!values.userName || !isValidEmail(values.userName)) {
      isValid = false;
      changeValidationState(elEmail.parentNode, validationState.error);
    }
    if (!values.companyDetails.firstName) {
      isValid = false;
      changeValidationState(elFirstName.parentNode, validationState.error);
    }
    if (!values.companyDetails.lastName) {
      isValid = false;
      changeValidationState(elLastName.parentNode, validationState.error);
    }
    if (!values.password) {
      isValid = false;
      changeValidationState(elPassword.parentNode, validationState.error);
    }
    if (!values.captchaAnswer.answer) {
      isValid = false;
      changeValidationState(elCaptchaAnswer.parentNode, validationState.error);
    }
    return isValid;
  };

  // Registration process
  /**
   * Create a database in the federation
   * @param params {object} - the create database parameters
   * @returns {object} - the database, user and password
   */
  var createDatabase = function (params) {
    var processResult = function (results) {
      var parts = results.split('/');

      return {
        server: parts[0],
        database: parts[1],
        userName: params.userName,
        password: params.password
      };
    };
    return call(host, 'CreateDatabase', params).then(processResult);
  };

  /**
   * Authenticate the user against the new database
   * @param options {object}
   * @returns {object} - options with credentials
   */
  var authenticate = function (options) {
    return call(options.server, 'Authenticate', {
      userName: options.userName,
      password: options.password,
      database: options.database
    }).then(function (results) {
      return {
        server: options.server,
        credentials: results.credentials
      };
    });
  };

  /**
   * Get the administrator user from the new database
   * @param options {object}
   * @returns {object} - options with user
   */
  var getUser = function (options) {
    return call(options.server, 'Get', {
      credentials: options.credentials,
      typeName: 'User',
      search: {
        name: options.credentials.userName
      }
    }).then(function (results) {
      options.user = results[0];
      return options;
    });
  };

  /**
   *  Set up the administrator with localized settings based on the selected time zone
   * @param options {object}
   * @returns {object} - options
   */
  var setUserDefaults = function (options) {
    var timeZone = elTimeZone.value;
    var continent = local.getContinentByTimeZone(timeZone);
    var user = options.user;

    user.timeZoneId = timeZone;
    user.isMetric = local.getIsMetricByTimeZone(timeZone);
    user.fuelEconomyUnit = local.getFuelEconomyUnitByTimeZone(timeZone);
    user.dateFormat = local.getDateTimeFormatByTimeZone(timeZone);
    user.mapViews = local.getMapViewsByTimeZone(continent);
    user.firstName = elFirstName.value;
    user.lastName = elLastName.value;
    // Could also set the user's language here (en,fr,es,de,ja): user.language = 'en';

    return call(options.server, 'Set', {
      credentials: options.credentials,
      typeName: 'User',
      entity: user
    }).then(function () {
      // pass on the options to the next promise
      return options;
    });
  };

  /**
   * Send the administrator a success email
   * @param options {object}
   * @returns {*} - send email results (nothing)
   */
  var sendSuccessEmail = function (options) {
    var credentials = options.credentials,
      user = options.user,
      welcomeMessage = 'Welcome to MyGeotab, you can login to your database via this url: https://' + host + '/' + credentials.database;

    return call(options.server, 'SendEmail', {
      credentials: credentials,
      email: user.name,
      subject: 'Registration Success',
      body: welcomeMessage,
      bodyHtml: '<p>' + welcomeMessage + '<p>'
    }).then(function () {
      // pass on the options to the next promise
      return options;
    });
  };

  /**
   * Redirect browser to database logged in with credentials
   * @param options {object} - with server and credentials
   */
  var redirect = function (options) {
    // use rison to encode token and add to url
    var token = rison.encode_object({"token": options.credentials});
    window.location = 'https://' + options.server + '/' + options.credentials.database + '#' + token;
  };

  // Wire up events
  /**
   * Watch the company name, generate the short database name from it and check it's availability
   */
  elCompanyName.addEventListener('keyup', function () {
    var splitCompanyName = elCompanyName.value.split(/\s+/);
    var databaseName = splitCompanyName.length ? splitCompanyName[0] : '';
    elDatabaseName.value = databaseName;
    updateShortDatabase(databaseName);
  }, false);

  /**
   * Watch the database name and check it's availability
   */
  elDatabaseName.addEventListener('keyup', function () {
    updateShortDatabase(elDatabaseName.value);
  });

  /**
   * Watch the password and check it's validity
   */
  elPassword.addEventListener('keyup', function () {
    if (elConfirmPassword.value) {
      validatePassword();
    }
  });

  /**
   * Watch the password conformation and check it's validity
   */
  elConfirmPassword.addEventListener('keyup', function () {
    if (elConfirmPassword.value) {
      validatePassword();
    }
  });

  /**
   * Watch required fields and remove field error when no longer empty
   */
  for (var i = 0; i < elRequiredInputs.length; i++) {
    elRequiredInputs[i].addEventListener('keyup', function (evt) {
      if (evt.target.value) {
        changeValidationState(evt.target.parentNode, validationState.none);
      }
    });
  }

  /**
   * Hide error message on click
   */
  elErrorClose.addEventListener('click', hideError);

  /**
   * Handel form submit
   */
  elSubmit.addEventListener('click', function (evt) {
    var formValues;

    var error = function (error) {
      hideLoading();

      renderCaptcha();
      elSubmit.removeAttribute('disabled');

      showError(error);
      if (error.name === 'CaptchaException') {
        elCaptchaAnswer.focus();
      }
    };

    evt.preventDefault();

    elSubmit.setAttribute('disabled', 'disabled');

    hideError();
    formValues = getFormValues();

    if (!isFormValid(formValues)) {
      elSubmit.removeAttribute('disabled');
      return;
    }

    showLoading();

    createDatabase(formValues)
      .then(authenticate)
      .then(getUser)
      .then(setUserDefaults)
      .then(sendSuccessEmail)
      .then(redirect, error);
  });

  // Setup the form fields that need to request data from the API
  renderCaptcha();
  renderTimeZones();
});
