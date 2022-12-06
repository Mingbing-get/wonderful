function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }
var MARROW_ID_NAME = 'data-marrow-id';
var OUTER_ID = 'outer';

// 根据位置获取处于当前位置上的所有marrow的id
function getMarrowIdsByLocation(x, y) {
  var elements = document.elementsFromPoint(x, y);
  return elements.reduce(function (total, item) {
    if (isElementButNotBodyOrHtml(item) && item.style.opacity !== '0') {
      var narrowId = item.getAttribute(MARROW_ID_NAME);
      if (narrowId) {
        total.push(narrowId);
      }
    }
    return total;
  }, []);
}
// 判断当前element是不是body以内的元素
function isElementButNotBodyOrHtml(element) {
  return !!element.tagName && !['BODY', 'HTML'].includes(element.tagName);
}
// 遍历marrow
function eachMarrow(data, fn) {
  var stack = _toConsumableArray(data);
  var item = stack.pop();
  while (item) {
    if (fn(item)) break;
    if ((item === null || item === void 0 ? void 0 : item.type) === 'container' && item.children) {
      stack.push.apply(stack, _toConsumableArray(item.children));
    }
    item = stack.pop();
  }
}
// 遍历marrow只暴露有孩子的节点
function eachMarrowByHasChildren(data, fn) {
  var hasChildrenStack = [];
  for (var i = 0; i < data.length; i++) {
    if (fn(data[i], i)) return;
    if (hasChildren(data[i])) {
      hasChildrenStack.push(data[i]);
    }
  }
  while (hasChildrenStack.length > 0) {
    var item = hasChildrenStack.pop();
    if ((item === null || item === void 0 ? void 0 : item.type) !== 'container' || !item.children) continue;
    for (var _i = 0; _i < item.children.length; _i++) {
      if (fn(item.children[_i], _i, item)) return;
      if (hasChildren(item.children[_i])) {
        hasChildrenStack.push(item.children[_i]);
      }
    }
  }
}
// 根据id获取当前的marrow
function getMarrowById(data, id) {
  var res = undefined;
  eachMarrow(data, function (marrow) {
    if (marrow.id === id) {
      res = marrow;
      return true;
    }
  });
  return res;
}
// 根据ids获取所有的marrow
function getMarrowsByIds(data, ids) {
  var res = [];
  if (ids.length === 0) {
    return res;
  }
  eachMarrow(data, function (marrow) {
    if (ids.includes(marrow.id)) {
      res.push(marrow);
      if (res.length === ids.length) return true;
    }
  });
  return res;
}
// 获取所有可以包含children的容器
function getAllIncludeChildren(data) {
  var res = [{
    id: OUTER_ID,
    name: '最外层容器',
    type: 'container',
    elementName: '容器'
  }];
  eachMarrow(data, function (marrow) {
    if (['container'].includes(marrow.type)) {
      res.push(marrow);
    }
  });
  return res;
}
function getCurrentMarrowParentId(data, curMarrowId) {
  var parentId = '';
  eachMarrowByHasChildren(data, function (item, i, parent) {
    if (item.id === curMarrowId) {
      if (parent) {
        parentId = parent.id;
      } else {
        parentId = OUTER_ID;
      }
      return true;
    }
  });
  return parentId;
}
// 替换当前id的marrow
function replaceMarrow(data, id, newMarrow) {
  var replaceMarrow = [];
  if (newMarrow) {
    replaceMarrow.push(newMarrow);
  }
  var flag = false;
  eachMarrowByHasChildren(data, function (item, i, parent) {
    var _a;
    if (item.id === id) {
      if (parent) {
        var _a2;
        (_a = parent.children) === null || _a === void 0 ? void 0 : (_a2 = _a).splice.apply(_a2, [i, 1].concat(replaceMarrow));
      } else {
        data.splice.apply(data, [i, 1].concat(replaceMarrow));
      }
      flag = true;
      return true;
    }
  });
  return flag;
}
// 插入节点
function appendChildren(marrow, willAppendMarrow) {
  if (marrow.type !== 'container') return false;
  marrow.children = [].concat(_toConsumableArray(marrow.children || []), [willAppendMarrow]);
  return true;
}
// 获取当前marrow的name
function getMarrowName(marrow) {
  return marrow.name || "".concat(marrow.elementName, "-").concat(marrow.id);
}
// 获取最大的zIndex
function getMaxZIndex(data) {
  var zIndex = 0;
  eachMarrow(data, function (marrow) {
    var _a;
    if (((_a = marrow.startStyle) === null || _a === void 0 ? void 0 : _a.zIndex) && marrow.startStyle.zIndex > zIndex) {
      zIndex = marrow.startStyle.zIndex;
    }
  });
  return zIndex;
}
// 获取最小的zIndex
function getMinZIndex(data) {
  var zIndex = -1;
  eachMarrow(data, function (marrow) {
    var _a;
    if (((_a = marrow.startStyle) === null || _a === void 0 ? void 0 : _a.zIndex) && marrow.startStyle.zIndex < zIndex) {
      zIndex = marrow.startStyle.zIndex;
    }
  });
  return zIndex;
}
// 根据path修改值
function changeObjectByPath(object, path, value) {
  if (path.length === 1) {
    return Object.assign(Object.assign({}, object), _defineProperty({}, path[0], value));
  }
  var parent;
  var cur = object;
  path.forEach(function (key, index) {
    if (index === path.length - 1) {
      parent[path[path.length - 2]] = Object.assign(Object.assign({}, cur), _defineProperty({}, key, value));
    } else {
      var curType = Object.prototype.toString.call(cur);
      if (curType === '[object Object]') {
        cur = Object.assign({}, cur);
      } else if (curType === '[object Array]') {
        cur = _toConsumableArray(cur);
      } else {
        return object;
      }
      if (index === 0) {
        object = cur;
      } else {
        parent[path[index - 1]] = cur;
      }
      parent = cur;
      cur = cur[key];
    }
  });
  return object;
}
// 去掉单位(最后面的非数字)
function replaceUnit(str) {
  return str.replace(/[^\d]*$/, '');
}
// 合并transform
function mergeTransform(style) {
  // 'translateX' | 'translateY' | 'translateZ' | 'scaleX' | 'scaleY' | 'rotateX' | 'rotateY' | 'rotateZ'
  if (!style || style.transform) {
    return style;
  }
  var copyStyle = Object.assign({}, style);
  var updateMap = {
    translateX: ['translate', 0],
    translateY: ['translate', 1],
    translateZ: ['translate', 2],
    scaleX: ['scale', 0],
    scaleY: ['scale', 1],
    rotateX: ['rotate', 0],
    rotateY: ['rotate', 1],
    rotateZ: ['rotate', 2]
  };
  var transform = {
    translate: [0, 0, 0],
    scale: [1, 1, 1],
    rotate: [0, 0, 0]
  };
  for (var _key in updateMap) {
    var key = _key;
    if (copyStyle[key]) {
      var _updateMap$key = _slicedToArray(updateMap[key], 2),
        type = _updateMap$key[0],
        index = _updateMap$key[1];
      transform[type][index] = copyStyle[key] || transform[type][index];
      delete copyStyle[key];
    }
  }
  var transformStr = '';
  for (var _key2 in transform) {
    var _key3 = _key2;
    transformStr += "".concat(_key3, "X(").concat(transform[_key3][0], ") ").concat(_key3, "Y(").concat(transform[_key3][1], ") ").concat(_key3, "Z(").concat(transform[_key3][2], ") ");
  }
  copyStyle.transform = transformStr;
  return copyStyle;
}
// 生成style字符串
function createStyle(style) {
  if (!style) return '';
  var _style = mergeTransform(style);
  var styleArr = [];
  for (var key in _style) {
    styleArr.push("".concat(upperToMiddleLine(key), ": ").concat(_style[key]));
  }
  return styleArr.join(';');
}
// 将驼峰转中划线
function upperToMiddleLine(str) {
  return str.replace(/([A-Z])/g, '-$1').toLowerCase();
}
// 阻止冒泡
function stopPropagation(e, handle) {
  handle === null || handle === void 0 ? void 0 : handle(e);
  e.stopPropagation();
  return false;
}
// 判断是否有children
function hasChildren(marrow) {
  return marrow.type === 'container' && !!marrow.children;
}
// 生成随机ID
function generateId() {
  return "".concat(new Date().getTime(), "-").concat(Math.floor(Math.random() * 100000000));
}
// 获取最外层容器
function getBuildContainer() {
  return document.querySelector('.marrow-build-wrapper');
}
export { MARROW_ID_NAME, OUTER_ID, appendChildren, changeObjectByPath, createStyle, eachMarrow, eachMarrowByHasChildren, generateId, getAllIncludeChildren, getBuildContainer, getCurrentMarrowParentId, getMarrowById, getMarrowIdsByLocation, getMarrowName, getMarrowsByIds, getMaxZIndex, getMinZIndex, hasChildren, isElementButNotBodyOrHtml, mergeTransform, replaceMarrow, replaceUnit, stopPropagation, upperToMiddleLine };
//# sourceMappingURL=utils.esm.js.map
