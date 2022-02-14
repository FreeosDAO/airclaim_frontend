// src/boot/filters.js
export default ({ Vue}) => {
    Vue.filter('capitalize', function (string) {
        return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
    })
  }