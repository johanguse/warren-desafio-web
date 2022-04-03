import { shallowMount } from "@vue/test-utils";
import '@testing-library/jest-dom';
import TableList from "../../src/components/TableList/TableList.vue";

describe('Header.vue Test', () => {
  const wrapper = shallowMount(TableList);
  it('initializes with filters', () => {
    expect(wrapper.vm.$options.name).toMatch('TableList');
    expect(wrapper.exists()).toBe(true);

    // check input search
    const inputFilter = wrapper.find('input.filter__text');
    expect(inputFilter.exists());

    // check input search
    const selectFilter = wrapper.find('select.filter__status');
    expect(selectFilter.exists());
  });
});
