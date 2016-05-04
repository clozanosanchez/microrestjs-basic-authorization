'use strict';

/**
 * Service to provide basic authorization for executing service operations.
 *
 * @author Carlos Lozano Sánchez
 * @license MIT
 * @copyright 2015 Carlos Lozano Sánchez
 */

var checkTypes = require('check-types');

/**
 * Initializes the authorization service.
 *
 * @override
 */
module.exports.onCreateService = function onCreateService() {
    this.authorizationList = {};
};

/**
 * Destroys the authorization service.
 * 
 * @override
 */
module.exports.onDestroyService = function onDestroyService() {
    this.authorizationList = null;
};

/**
 * Authorizes the execution of a service operation.
 *
 * NOTE: Service Operation
 */
module.exports.authorize = function authorize(request, response, sendResponse) {
    var requestBody = request.getBody();

    if (checkTypes.not.object(requestBody) || checkTypes.emptyObject(requestBody)) {
        response.setStatus(400);
        sendResponse();
        return;
    }

    var authorization = requestBody.authorization;
    if (checkTypes.not.object(authorization) || checkTypes.emptyObject(authorization) ||
        checkTypes.not.string(authorization.userId) || checkTypes.not.unemptyString(authorization.userId) ||
        checkTypes.not.string(authorization.service) || checkTypes.not.unemptyString(authorization.service) ||
        checkTypes.not.string(authorization.operation) || checkTypes.not.unemptyString(authorization.operation)) {
        response.setStatus(400);
        sendResponse();
        return;
    }

    var authorized = _checkAuthorization(authorization.userId, authorization.service, authorization.operation, this.authorizationList);
    if (authorized === false) {
        response.setStatus(403);
        sendResponse();
        return;
    }

    response.setStatus(204);
    sendResponse();
};

/**
 * Checks if the user has authorization to execute the service operation.
 *
 * @private
 * @function
 * @param {String} userId - User to be authorized.
 * @param {String} serviceName - Service to be authorized.
 * @param {String} operationName - Operation to be authorized.
 * @param {Object} authorizationList - List of authorized users, services and operations.
 * @returns {Boolean} - true, if the user has authorization; false, otherwise.
 */
function _checkAuthorization(userId, serviceName, operationName, authorizationList) {
    return false;
}
