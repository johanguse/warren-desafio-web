import { shallowMount } from "@vue/test-utils";
import Header from "../../src/components/Header/Header.vue";

describe('Header.vue Test', () => {
  const wrapper = shallowMount(Header);
  it('should compoment name has HeaderApp', () => {
    expect(wrapper.vm.$options.name).toMatch('HeaderApp');
  });
  it('should reader Header with class names', () => {
    expect(wrapper.attributes('class')).toBe('header');
  });
});
