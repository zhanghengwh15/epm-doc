import LanguageSelector from './LanguageSelector.vue';
export default {
  name: 'i18n',
  extend: function extend(api) {
    if (api.store.getters.languageOverrides) {
      api.registerComponent('sidebar:start', LanguageSelector);
    }
  }
};