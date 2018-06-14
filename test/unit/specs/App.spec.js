import Vue from 'vue';
import HelloWorld from 'src/App';

describe('App.vue', () => {
  it('should render correct contents', () => {
    const Constructor = Vue.extend(App);
    const vm = new Constructor().$mount();
    expect(vm.$el.querySelector('.app message').textContent)
      .to.equal('Enter your TOML file below');
  });
});
