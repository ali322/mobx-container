function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

import React from 'react';
import { Provider, inject, observer } from 'mobx-react/native';

export var wrapper = function wrapper(stores) {
    return function (Component) {
        return function (props) {
            return React.createElement(
                Provider,
                stores,
                React.createElement(Component, props)
            );
        };
    };
};

export var connected = function connected(mapper) {
    return function (Component) {
        var observerComponent = observer(Component);
        if (typeof mapper === 'string') {
            return inject(mapper)(observerComponent);
        } else if (Array.isArray(mapper)) {
            return inject.apply(undefined, _toConsumableArray(mapper))(observerComponent);
        } else if (typeof mapper === 'function') {
            return inject(mapper)(observerComponent);
        } else if (typeof mapper === 'undefined') {
            return inject(function (stores) {
                return stores;
            })(observerComponent);
        }
    };
};

export default (function (stores, mapper) {
    return function (Component) {
        var connectedComponent = connected(mapper)(Component);
        return wrapper(stores)(connectedComponent);
    };
});