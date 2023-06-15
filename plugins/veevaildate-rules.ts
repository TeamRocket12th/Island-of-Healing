import { defineRule, configure } from 'vee-validate'
import { localize, setLocale } from '@vee-validate/i18n'
import zhTW from '@vee-validate/i18n/dist/locale/zh_TW.json'
// import { required, email, min } from '@vee-validate/rules';
import * as rules from '@vee-validate/rules'

export default defineNuxtPlugin((nuxtApp) => {
  // defineRule('required', required);
  // defineRule('email', email);
  // defineRule('min', min);
  Object.keys(rules)
    .filter((k) => k !== 'default')
    .forEach((rule) => {
      defineRule(rule, rules[rule])
      //   console.log(rule);
    })
})

configure({
  generateMessage: localize({
    zh_TW: {
      messages: zhTW.messages
    }
  }),
  validateOnInput: true
})
setLocale('zh_TW')
